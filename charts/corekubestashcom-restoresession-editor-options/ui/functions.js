const { ref, computed, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('database', {})
  setDiscriminatorValue('nameSpaceApi', false)
  setDiscriminatorValue('repository', '')
  setDiscriminatorValue('params', '')

  let addonList = []
  function isConsole() {
    const group = storeGet('/route/params/group') || ''
    return group !== 'kubedb.com'
  }

  async function initMetadata() {
    const resource = storeGet('/resource') || {}
    const { group, kind } = resource?.layout?.result?.resource
    const name = storeGet('/route/params/name') || ''
    const namespace = storeGet('route/query/namespace') || ''
    if (!isConsole()) {
      // set metadata name namespace
      commit('wizard/model$update', {
        path: '/metadata/release/name',
        value: `${name}-${Math.floor(Date.now() / 1000)}-restore`,
        force: true,
      })
      commit('wizard/model$update', {
        path: '/metadata/release/namespace',
        value: namespace,
        force: true,
      })

      const target = {
        apiGroup: group,
        kind: kind,
        name: name,
        namespace: namespace,
      }
      commit('wizard/model$update', {
        path: '/spec/target',
        value: target,
        force: true,
      })

      // set addon name
      commit('wizard/model$update', {
        path: '/spec/addon/name',
        value: `${kind.toLowerCase()}-addon`,
      })
    }

    // get encryptionSecret from stash-preset
    await getPreset()
    setSecurityContext()
    setNeo4jParams()
  }

  async function getPreset() {
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    try {
      const resp = await akp.resources.get({
        owner: user,
        cluster,
        group: 'charts.x-helm.dev',
        version: 'v1alpha1',
        resource: 'clusterchartpresets',
        name: 'stash-presets',
      })
      const encryptionSecret = resp?.spec?.values?.spec?.backup?.kubestash?.encryptionSecret
      commit('wizard/model$update', {
        path: '/spec/dataSource/encryptionSecret',
        value: encryptionSecret,
        force: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  async function fetchNamespacesApi() {
    const params = storeGet('/route/params')
    const { user, cluster, group, version, resource } = params
    try {
      const resp = await akp.resources.create({
        owner: user,
        cluster,
        group: 'identity.k8s.appscode.com',
        version: 'v1alpha1',
        resource: 'selfsubjectnamespaceaccessreviews',
        object: {
          apiVersion: 'identity.k8s.appscode.com/v1alpha1',
          kind: 'SelfSubjectNamespaceAccessReview',
          spec: {
            resourceAttributes: [
              {
                verb: 'create',
                group: group,
                version: version,
                resource: resource,
              },
            ],
          },
        },
      })
      if (resp?.status?.projects) {
        const projects = resp?.status?.projects
        let projectsNamespace = []
        projectsNamespace = Object.keys(projects).map((project) => ({
          project: project,
          namespaces: projects[project].map((namespace) => ({
            text: namespace,
            value: namespace,
          })),
        }))
        return projectsNamespace
      } else {
        return resp?.status?.namespaces || []
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function setNamespace() {
    const namespaceFromModel = getValue(model, '/metadata/release/namespace')
    const namespace = storeGet('/route/query/namespace') || namespaceFromModel || ''
    return namespace
  }

  function isNamespaceScopedOrg() {
    const activeOrg = storeGet('/activeOrganization') || ''
    const orgList = storeGet('/organizations') || []
    return orgList.find((item) => item.username === activeOrg)?.orgType === 3
  }

  function flattenNamespaces(list) {
    return list.flatMap((item) =>
      item?.namespaces ? item.namespaces.map((ns) => ns?.value ?? ns) : (item?.value ?? item),
    )
  }

  // a namespace-scoped org reaches exactly one namespace, and the /restoresessions/create
  // route carries no ?namespace=, so fall back to what the access review grants
  async function resolveNamespace() {
    const namespace = setNamespace()
    if (namespace) return namespace

    if (!namespaces.length) namespaces = await fetchNamespacesApi()
    const accessible = flattenNamespaces(namespaces)
    return accessible.length === 1 ? accessible[0] : ''
  }

  async function getDbs() {
    // watchDependency('model#/metadata/release/namespace')
    const namespace = getValue(model, '/metadata/release/namespace')
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'core.k8s.appscode.com',
      version: 'v1alpha1',
      resource: 'genericresources',
      namespace,
      convertToTable: true,
      labelSelector: 'k8s.io/group=kubedb.com',
    })

    const resources = (resp && resp.rows) || []

    return resources.map((item) => {
      const name = (item.cells?.length > 0 && item.cells[0].data) || ''
      const kind = (item.cells?.length > 2 && item.cells[2].data) || ''
      const dbObject = {
        apiGroup: 'kubedb.com',
        kind: kind,
        name: name,
        namespace: namespace,
      }
      return {
        text: name,
        value: dbObject,
      }
    })
  }

  function initTarget() {
    const target = getValue(discriminator, '/database') || {}
    commit('wizard/model$update', {
      path: '/metadata/release/name',
      value: `${target.name}-${Math.floor(Date.now() / 1000)}-restore` || '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/target',
      value: target,
      force: true,
    })
  }

  async function getRepositories() {
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    let namespace
    if (isNamespaceScopedOrg()) {
      namespace = await resolveNamespace()
      if (!namespace) return []
    }

    try {
      const resp = await akp.resources.list({
        owner: user,
        cluster,
        group: 'storage.kubestash.com',
        version: 'v1alpha1',
        resource: 'repositories',
        namespace,
      })
      let names = resp?.items
      names.map((item) => {
        item.value = { name: item?.metadata?.name, namespace: item?.metadata?.namespace } || {}
        item.text = `${item?.metadata?.namespace}/${item?.metadata?.name}` || ''
        return true
      })

      const resource = storeGet('/resource/layout/result/resource') || {}
      let group = resource?.group || ''
      let kind = resource?.kind || ''

      if (isConsole()) {
        group = getValue(model, '/spec/target/apiGroup') || ''
        kind = getValue(model, '/spec/target/kind') || ''
      }
      if (kind && group) {
        const filteredRepo = names.filter((item) => {
          const appRef = item?.spec?.appRef || {}
          return appRef?.apiGroup === group && appRef?.kind === kind
        })
        return filteredRepo
      } else {
        return names
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function onRepoChange() {
    const repo = getValue(discriminator, '/repository')
    commit('wizard/model$update', {
      path: '/spec/dataSource/repository',
      value: repo,
      force: true,
    })
  }

  let snapshotObj = {}
  let snapshotList = []
  let snapshotGroup = ''
  let snapshotKind = ''

  function onSnapChange() {
    const snapshot = getValue(model, '/spec/dataSource/snapshot') || ''
    snapshotObj = snapshotList.find((item) => item.metadata?.name === snapshot) || {}
    snapshotKind = snapshotObj?.spec?.appRef?.kind || ''
    snapshotGroup = snapshotObj?.spec?.appRef?.apiGroup || ''
  }

  async function getSnapshots() {
    // watchDependency('discriminator#/repository')
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const core = 'storage.kubestash.com'
    const version = 'v1alpha1'
    const repo = getValue(discriminator, '/repository') || {}
    const namespace = repo.namespace || ''
    const repository = repo.name || ''

    try {
      if (namespace) {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: core,
          version,
          resource: 'snapshots',
          namespace,
        })
        let snapshots = resp?.items
        snapshotList = snapshots
        snapshots.map((item) => {
          const name = item?.metadata?.name
          item.value = name
          item.text = name
          return true
        })
        const filteredSnapshots =
          snapshots.filter((item) => {
            const owners = item?.metadata?.ownerReferences || []
            if (owners.length)
              return owners[0].name === repository && owners[0].kind === 'Repository'
          }) || []

        filteredSnapshots.forEach((item) => {
          const time = item.status?.snapshotTime || ''
          // get the time difference and add it to subtext
          item.subText = getTimeDiffs(time)
        })
        if (filteredSnapshots.length)
          filteredSnapshots[0].subText = '(Latest) ' + filteredSnapshots[0].subText

        return filteredSnapshots
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function getTimeDiffs(time) {
    if (time === '') return ''

    const now = new Date()
    const timeConvert = new Date(time)
    const diffInMs = now - timeConvert

    // const diffInSeconds = Math.floor(diffInMs / 1000) % 60
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)) % 60
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)) % 24
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    let timeDiff = ''
    if (diffInDays) timeDiff += `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} `
    if (diffInHours) timeDiff += `${diffInHours} ${diffInHours > 1 ? 'hours' : 'hour'} `
    if (diffInMinutes) timeDiff += `${diffInMinutes} ${diffInMinutes > 1 ? 'minutes' : 'minute'}`
    if (!diffInMinutes) return 'Just now'
    return ` ${timeDiff} ago`
  }

  function showGroupKind() {
    const snapshot = getValue(model, '/spec/dataSource/snapshot') || ''
    snapshotObj = snapshotList.find((item) => item.metadata?.name === snapshot) || {}
    snapshotGroup = snapshotObj?.spec?.appRef?.apiGroup || ''
    snapshotKind = snapshotObj?.spec?.appRef?.kind || ''
    return !(snapshotGroup === 'kubedb.com')
  }

  async function getAddons() {
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    if (isConsole()) {
      try {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: 'addons.kubestash.com',
          version: 'v1alpha1',
          resource: 'addons',
        })
        let addons = resp?.items
        addonList = addons

        addons = addons.map((item) => item?.metadata?.name)

        const kind = storeGet('/resource/layout/result/resource/kind')
        if (kind) {
          const found = addons.find((item) => item.startsWith(kind.toLowerCase()))
          commit('wizard/model$update', {
            path: '/spec/addon/name',
            value: found,
            force: true,
          })
        }
        if (Object.keys(snapshotObj).length) {
          const filteredAddon = addons.find((item) => {
            return item.includes(snapshotKind.toLowerCase())
          })

          if (snapshotGroup === 'kubedb.com') {
            commit('wizard/model$update', {
              path: '/spec/target/kind',
              value: snapshotKind,
              force: true,
            })
            commit('wizard/model$update', {
              path: '/spec/target/apiGroup',
              value: snapshotGroup,
              force: true,
            })
            setVersion()
          }

          if (filteredAddon) return [filteredAddon]
        }

        return addons
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }

  function getTasks() {
    // watchDependency('model#/spec/addon/name')
    const addon = getValue(model, '/spec/addon/name')
    const addonDetails = addonList?.find((item) => item?.metadata?.name === addon)
    let tasks = addonDetails?.spec?.restoreTasks
    tasks = tasks?.map((item) => item?.name)
    return tasks
  }

  function databaseSelected() {
    isKube = storeGet('/route/params/actions')
    if (isKube) return true
    // watchDependency('discriminator#/database')
    const target = getValue(discriminator, '/database') || {}
    return !!target.name
  }

  // the per-kind default lives in the chart helper; only the OpenShift uid-range overrides it
  async function setSecurityContext() {
    const namespace = await resolveNamespace()
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    if (namespace) {
      try {
        const resp = await akp.resources.get({
          owner: user,
          cluster,
          group: 'core',
          version: 'v1',
          resource: 'namespaces',
          name: namespace,
        })
        const annotations = resp?.metadata?.annotations || {}
        const uidRange = annotations['openshift.io/sa.scc.uid-range']
        if (uidRange) {
          const val = uidRange.split('/')[0]
          commit('wizard/model$update', {
            path: '/spec/addon/jobTemplate/securityContext',
            value: val,
            force: true,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  function returnFalse() {
    return false
  }

  let appKind = []
  let coreKind = []
  let kubedbKind = []
  let availableKinds = {}
  let kindToResourceMap = {}
  let namespaces = []
  let version = ''

  async function init() {
    await getKindsApi()
    namespaces = await fetchNamespacesApi()
  }

  function fetchNamespaces() {
    // watchDependency('discriminator#/nameSpaceApi')
    return namespaces
  }

  function setVersion() {
    // watchDependency('model#/spec/target/apiGroup')
    // watchDependency('model#/spec/target/kind')
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const kind = getValue(model, `/spec/target/kind`)
    if (apiGroup === 'core') apiGroup = ''
    Object.keys(availableKinds[apiGroup]).forEach((vs) => {
      availableKinds[apiGroup][vs].forEach((ele) => {
        if (ele.Kind === kind) {
          version = vs
        }
      })
    })
  }

  async function getKindsApi() {
    const params = storeGet('/route/params')
    const { user, cluster } = params
    try {
      const clusters = await akp.client('akp.cluster.v2.ClusterService')
      const { types } = await clusters.listAvailableTypes({
        cluster: { owner: user, name: cluster },
        groups: ['core', 'apps', 'kubedb.com'],
      })

      kindToResourceMap['kubedb.com'] = {}
      kindToResourceMap['apps'] = {}
      kindToResourceMap['core'] = {}

      // Shaped as the AKP v1 API answered it: group -> version -> [{ Kind, Resource }].
      availableKinds = {}
      types.forEach(({ group, version, resources }) => {
        availableKinds[group] ??= {}
        availableKinds[group][version] = resources.map(({ kind, resource }) => ({
          Kind: kind,
          Resource: resource,
        }))
      })

      appKind = Object.values(availableKinds['apps'])
        .flat()
        .map((ele) => {
          kindToResourceMap['apps'][ele.Kind] = ele.Resource
          return ele.Kind
        })
      kubedbKind = Object.values(availableKinds['kubedb.com'])
        .flat()
        .map((ele) => {
          kindToResourceMap['kubedb.com'][ele.Kind] = ele.Resource
          return ele.Kind
        })
      coreKind = Object.values(availableKinds[''])
        .flat()
        .map((ele) => {
          kindToResourceMap['core'][ele.Kind] = ele.Resource
          return ele.Kind
        })
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function getKinds() {
    // watchDependency(`model#/spec/target/apiGroup`)
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    if (apiGroup === 'core') return coreKind
    else if (apiGroup === 'apps') return appKind
    else return kubedbKind
  }

  function getApiGroup() {
    return ['core', 'apps', 'kubedb.com']
  }

  async function getTargetName() {
    // watchDependency('model#/spec/target/apiGroup')
    // watchDependency('model#/spec/target/namespace')
    // watchDependency('model#/spec/target/kind')
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const namespace = getValue(model, `/spec/target/namespace`)
    const resource = getResourceName()
    const params = storeGet('/route/params')
    const { user, cluster } = params

    if (apiGroup && version && resource && namespace) {
      try {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: apiGroup,
          version,
          resource,
          namespace,
        })
        const items = resp?.items
        const options = items.map((ele) => {
          return ele.metadata.name
        })
        return options
      } catch (e) {
        console.log(e)
      }
    }
  }

  function getResourceName() {
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const kind = getValue(model, `/spec/target/kind`)
    if (!kind || !apiGroup) return ''
    return kindToResourceMap[apiGroup][kind]
  }

  function onParameterChange() {
    const tasks = getValue(model, '/spec/addon/tasks') || []
    const params = getValue(discriminator, '/params')
    tasks[0]['params'] = params
    commit('wizard/model$update', {
      path: '/spec/addon/tasks',
      value: tasks,
      force: true,
    })
  }

  // neo4j restore needs the pod to seed from; it is always the first pod of the target
  function setNeo4jParams() {
    if (getValue(model, '/spec/target/kind') !== 'Neo4j') return
    const name = getValue(model, '/spec/target/name') || ''
    if (!name) return

    const params = `{seedServerName: "${name}-0"}`
    setDiscriminatorValue('params', params)

    const tasks = getValue(model, '/spec/addon/tasks') || []
    if (!tasks.length) return
    tasks[0]['params'] = params
    commit('wizard/model$update', {
      path: '/spec/addon/tasks',
      value: tasks,
      force: true,
    })
  }

  function clearAddon() {
    return ''
  }

  return {
    isRancherManaged,
    fetchNamespaces,
    setVersion,
    init,
    getTargetName,
    getKinds,
    getApiGroup,
    isConsole,
    initMetadata,
    getPreset,
    fetchNamespacesApi,
    setNamespace,
    getDbs,
    initTarget,
    getRepositories,
    onRepoChange,
    getSnapshots,
    onSnapChange,
    getAddons,
    getTasks,
    databaseSelected,
    returnFalse,
    onParameterChange,
    setSecurityContext,
    showGroupKind,
    clearAddon,
    setNeo4jParams,
  }
}
