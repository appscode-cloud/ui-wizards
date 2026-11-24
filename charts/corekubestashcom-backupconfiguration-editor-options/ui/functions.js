const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

let namespaces = []
let appKind = []
let coreKind = []
let kubedbKind = []
let availableKinds = {}
let kindToResourceMap = {}
let version = ''

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/nameSpaceApi', false)

  async function initBundle() {
    namespaces = await getNamespacesApi()
    await getKindsApi()
    setDiscriminatorValue('/nameSpaceApi', true)
  }

  async function getNamespacesApi() {
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

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  function getNamespaces() {
    // watchDependency('discriminator#/nameSpaceApi')
    return namespaces
  }

  async function getAddon() {
    const params = storeGet('/route/params')

    const { user, cluster } = params
    try {
      const resp = await akp.resources.list({
        owner: user,
        cluster,
        group: 'addons.kubestash.com',
        version: 'v1alpha1',
        resource: 'addons',
      })
      let addons = []
      resp?.items.forEach((item) => {
        addons.push(item.metadata.name)
      })
      return addons
    } catch (e) {
      console.log(e)
    }
    return []
  }

  async function getTaskNames(index) {
    // watchDependency('temporaryModel#/session/addon/name')
    const session = getValue(model, `/spec/sessions`)
    const addon = session[index]?.addon?.name

    const params = storeGet('/route/params')
    const { user, cluster } = params
    if (addon) {
      try {
        const resp = await akp.resources.get({
          owner: user,
          cluster,
          group: 'addons.kubestash.com',
          version: 'v1alpha1',
          resource: 'addons',
          name: addon,
        })

        const backupTasks = resp?.spec?.backupTasks?.map((task) => task.name) || []
        return backupTasks
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }

  function clearTasks() {
    commit('wizard/temporaryModel$update', {
      path: '/session/addon/tasks',
      value: [],
      force: true,
    })
  }

  async function getEncryptionSecretNames(index) {
    // watchDependency('temporaryModel#/session/encryptionSecret/namespace')
    const session = getValue(model, `/spec/sessions`)
    const namespace = session[index]?.encryptionSecret?.namespace
    const params = storeGet('/route/params')
    const { user, cluster } = params
    if (namespace) {
      try {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: 'core',
          version: 'v1',
          resource: 'secrets',
          namespace,
        })
        const name = resp?.items?.map((item) => item.metadata?.name) || []
        return name
      } catch (e) {
        console.log(e)
      }
    }
    return []
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

      // Same shape as the AKP v1 API answered: { [group]: { [version]: [{ Kind, Resource }] } }, '' being core.
      availableKinds = {}
      types.forEach(({ group, version, resources }) => {
        availableKinds[group] ??= {}
        availableKinds[group][version] = resources.map((r) => ({
          Kind: r.kind,
          Resource: r.resource,
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

  function setVersion() {
    let apiGroup = getValue(model, `/spec/target/apiGroup`)
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
    return []
  }

  function getResourceName() {
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const kind = getValue(model, `/spec/target/kind`)
    if (!kind || !apiGroup) return ''
    return kindToResourceMap[apiGroup][kind]
  }

  async function fetchJsons() {
    let ui = {}
    let language = {}
    let functions = {}
    const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

    try {
      ui = await axios.get(
        `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      language = await axios.get(
        `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      const functionString = await axios.get(
        `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
      )
      // declare evaluate the functionString to get the functions Object
      const evalFunc = new Function(functionString.data || '')
      functions = evalFunc()
    } catch (e) {
      console.log(e)
    }

    return {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    }
  }

  async function getData(ctx, type) {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace =
      getValue(model, '/metadata/release/namespace') || storeGet('/route/query/namespace') || ''
    const activeOrg = storeGet('/activeOrganization') || ''
    const orgList = storeGet('/organizations') || []
    const orgType = orgList.find((item) => item.username === activeOrg)?.orgType

    const resource = type === 'retentionPolicy' ? 'retentionpolicies' : 'backupstorages'
    try {
      const data = await akp.resources.list({
        owner: user,
        cluster,
        group: 'storage.kubestash.com',
        version: 'v1alpha1',
        resource,
        namespace: orgType === 3 && namespace ? namespace : undefined,
      })
      const items = data?.items || []
      const options = items.map((item) => {
        return {
          text: `${item.metadata.namespace}/${item.metadata.name}`,
          value: { name: item.metadata.name, namespace: item.metadata.namespace },
        }
      })
      return options || []
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function showTarget() {
    const params = storeGet('/route/params') || {}
    const { group, name } = params
    const namespace = storeGet('/route/query/namespace') || ''
    const kind = storeGet('/resource/layout/result/resource/kind') || ''

    if (group === 'kubedb.com') {
      const target = {
        apiGroup: 'kubedb.com',
        kind: kind,
        namespace: namespace,
        name: name,
      }
      commit('wizard/model$update', {
        path: '/spec/target',
        value: target,
        force: true,
      })
    }
    return group !== 'kubedb.com'
  }

  function returnFalse() {
    return false
  }

  return {
    clearTasks,
    fetchJsons,
    getAddon,
    getApiGroup,
    getData,
    getEncryptionSecretNames,
    getKinds,
    getNamespaces,
    getTargetName,
    getTaskNames,
    initBundle,
    isRancherManaged,
    returnFalse,
    setVersion,
    showTarget,
  }
}
