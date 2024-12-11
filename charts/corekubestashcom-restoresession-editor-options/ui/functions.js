let addonList = []
function isConsole({ storeGet }) {
  isKube = storeGet('/route/query/operation')
  return !isKube
}

function initMetadata({ storeGet, commit }) {
  const resource = storeGet('/resource') || {}
  const { group, kind } = resource?.layout?.result?.resource
  const name = storeGet('/route/query/name') || ''
  const namespace = storeGet('route/query/namespace') || ''
  if (!isConsole({ storeGet })) {
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
  }
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

async function fetchNamespacesApi({ axios, storeGet }) {
  const params = storeGet('/route/params')
  const { user, cluster, group, version, resource } = params
  try {
    const resp = await axios.post(
      `/clusters/${user}/${cluster}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`,
      {
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
    )
    if (resp.data?.status?.projects) {
      const projects = resp.data?.status?.projects
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
      return resp.data?.status?.namespaces || []
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

function setNamespace({ storeGet, model, getValue }) {
  const namespaceFromModel = getValue(model, '/metadata/release/namespace')
  const namespace = storeGet('/route/query/namespace') || namespaceFromModel || ''
  return namespace
}

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  watchDependency('model#/metadata/release/namespace')
  const namespace = getValue(model, '/metadata/release/namespace')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core.k8s.appscode.com/v1alpha1/namespaces/${namespace}/genericresources`,
    {
      params: {
        convertToTable: true,
        labelSelector: 'k8s.io/group=kubedb.com',
      },
    },
  )

  const resources = (resp && resp.data && resp.data.rows) || []

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

function initTarget({ getValue, discriminator, commit }) {
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

async function fetchNames({ getValue, model, storeGet, watchDependency, axios }, type) {
  watchDependency(`model#/spec/dataSource/${type}/namespace`) || ''
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace = getValue(model, `/spec/dataSource/${type}/namespace`) || ''
  let suffix = type
  if (type === 'encryptionSecret') suffix = 'secrets'
  else if (type === 'repository') suffix = 'repositories'
  const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
  const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'
  const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`

  try {
    if (namespace) {
      const resp = await axios.get(url)
      let names = resp?.data?.items
      names.map((item) => {
        item.value = item?.metadata?.name || ''
        item.text = item?.metadata?.name || ''
        return true
      })

      if (type === 'repository') {
        const resource = storeGet('/resource/layout/result/resource') || {}
        let group = resource?.group || ''
        let kind = resource?.kind || ''

        if (isConsole({ storeGet })) {
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
      }
      return names
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

async function getSnapshots({ watchDependency, model, storeGet, getValue, axios }) {
  watchDependency('model#/spec/dataSource/repository/namespace')
  watchDependency('model#/spec/dataSource/repository/name')
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const core = 'storage.kubestash.com'
  const version = 'v1alpha1'
  const namespace = getValue(model, '/spec/dataSource/repository/namespace') || ''
  const repository = getValue(model, '/spec/dataSource/repository/name') || ''
  const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/snapshots`

  try {
    if (namespace) {
      const resp = await axios.get(url)
      let snapshots = resp?.data?.items
      snapshots.map((item) => {
        const name = item?.metadata?.name
        item.value = name
        item.text = name
        return true
      })
      const filteredSnapshots = snapshots.filter((item) => {
        const owners = item?.metadata?.ownerReferences
        if (owners.length) return owners[0].name === repository && owners[0].kind === 'Repository'
      })

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
  const now = new Date()
  const timeConvert = new Date(time)
  diffInMs = now - timeConvert

  // const diffInSeconds = Math.floor(diffInMs / 1000) % 60
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)) % 60
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)) % 24
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  let timeDiff = ''
  if (diffInDays) timeDiff += `${diffInDays} ${diffInDays > 0 ? 'days' : 'day'} `
  if (diffInHours) timeDiff += `${diffInHours} ${diffInHours > 0 ? 'hours' : 'hour'} `
  if (diffInMinutes) timeDiff += `${diffInMinutes} ${diffInMinutes > 0 ? 'minutes' : 'minute'}`
  return ` ${timeDiff} ago`
}

async function getAddons({ storeGet, axios, commit }) {
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const url = `/clusters/${user}/${cluster}/proxy/addons.kubestash.com/v1alpha1/addons`

  try {
    const resp = await axios.get(url)
    let addons = resp?.data?.items
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
    return addons
  } catch (e) {
    console.log(e)
  }
  return []
}

function getTasks({ watchDependency, model, getValue }) {
  watchDependency('model#/spec/addon/name')
  const addon = getValue(model, '/spec/addon/name')
  const addonDetails = addonList?.find((item) => item?.metadata?.name === addon)
  let tasks = addonDetails?.spec?.restoreTasks
  tasks = tasks?.map((item) => item?.name)
  return tasks
}

function databaseSelected({ storeGet, watchDependency, getValue, discriminator }) {
  isKube = storeGet('/route/query/operation')
  if (isKube) return true
  watchDependency('discriminator#/database')
  const target = getValue(discriminator, '/database') || {}
  return !!target.name
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

function init({ watchDependency, model, getValue, storeGet, axios }) {
  getKindsApi({ watchDependency, model, getValue, storeGet, axios })
  namespaces = fetchNamespacesApi({ axios, storeGet })
}

function fetchNamespaces({ watchDependency }) {
  watchDependency('discriminator#/nameSpaceApi')
  return namespaces
}

function setVersion({ getValue, model, watchDependency }) {
  watchDependency('model#/spec/target/apiGroup')
  watchDependency('model#/spec/target/kind')
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

async function getKindsApi({ storeGet, axios }) {
  const params = storeGet('/route/params')
  const { user, cluster } = params
  let url = `/clusters/${user}/${cluster}/available-types?groups=core,apps,kubedb.com`
  try {
    const resp = await axios.get(url)

    kindToResourceMap['kubedb.com'] = {}
    kindToResourceMap['apps'] = {}
    kindToResourceMap['core'] = {}

    availableKinds = resp.data

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

function getKinds({ watchDependency, getValue, model }) {
  watchDependency(`model#/spec/target/apiGroup`)
  const apiGroup = getValue(model, `/spec/target/apiGroup`)

  if (apiGroup === 'core') return coreKind
  else if (apiGroup === 'apps') return appKind
  else return kubedbKind
}

function getApiGroup() {
  return ['core', 'apps', 'kubedb.com']
}

async function getTargetName({ watchDependency, getValue, model, axios, storeGet }) {
  watchDependency('model#/spec/target/apiGroup')
  watchDependency('model#/spec/target/namespace')
  watchDependency('model#/spec/target/kind')
  const apiGroup = getValue(model, `/spec/target/apiGroup`)
  const namespace = getValue(model, `/spec/target/namespace`)
  const resource = getResourceName({ getValue, model })
  const params = storeGet('/route/params')
  const { user, cluster } = params

  const url = `/clusters/${user}/${cluster}/proxy/${apiGroup}/${version}/namespaces/${namespace}/${resource}`
  if (apiGroup && version && resource && namespace) {
    try {
      const resp = await axios.get(url)
      const items = resp.data?.items
      const options = items.map((ele) => {
        return ele.metadata.name
      })
      return options
    } catch (e) {
      console.log(e)
    }
  }
}

function getResourceName({ getValue, model }) {
  const apiGroup = getValue(model, `/spec/target/apiGroup`)
  const kind = getValue(model, `/spec/target/kind`)
  return kindToResourceMap[apiGroup][kind]
}

function onParameterChange({ getValue, model, discriminator, commit }) {
  const tasks = getValue(model, '/spec/addon/tasks') || []
  const params = getValue(discriminator, '/params')
  tasks[0]['params'] = params
  commit('wizard/model$update', {
    path: '/spec/addon/tasks',
    value: tasks,
    force: true,
  })
}

return {
  fetchNamespaces,
  setVersion,
  init,
  getTargetName,
  getKinds,
  getApiGroup,
  isConsole,
  initMetadata,
  isRancherManaged,
  fetchNamespacesApi,
  setNamespace,
  getDbs,
  initTarget,
  fetchNames,
  getSnapshots,
  getAddons,
  getTasks,
  databaseSelected,
  returnFalse,
  onParameterChange,
}
