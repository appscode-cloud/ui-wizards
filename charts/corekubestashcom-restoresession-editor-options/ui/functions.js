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

function isNotRancherManaged({ storeGet }) {
  return !isRancherManaged({ storeGet })
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
      if (filteredSnapshots.length)
        filteredSnapshots[0].text = filteredSnapshots[0].text + ' (Latest)'
      return filteredSnapshots
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

async function getAddons({ storeGet, axios, setDiscriminatorValue }) {
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const url = `/clusters/${user}/${cluster}/proxy/addons.kubestash.com/v1alpha1/addons`

  try {
    const resp = await axios.get(url)
    let addons = resp?.data?.items
    addonList = addons

    addons = addons.map((item) => item?.metadata?.name)
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

function init({ watchDependency, model, getValue, storeGet, axios, setDiscriminatorValue }) {
  getKindsApi({ watchDependency, model, getValue, storeGet, axios })
}

async function getKindsApi({ storeGet, axios }) {
  const params = storeGet('/route/params')
  const { user, cluster } = params
  let url = `/clusters/${user}/${cluster}/available-types?groups=core,apps,kubedb.com`
  try {
    const resp = await axios.get(url)
    appKind = Object.values(resp.data['apps']).flat()
    kubedbKind = Object.values(resp.data['kubedb.com']).flat()
    coreKind = Object.values(resp.data['']).flat()
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

async function getTargetName({ watchDependency, storeGet, getValue, model, axios }) {
  watchDependency(`model#/spec/target/apiGroup`)
  watchDependency(`model#/spec/target/kind`)
  watchDependency(`model#/spec/target/namespace`)
  const apiGroup = getValue(model, `/spec/target/apiGroup`)
  const kind = getValue(model, `/spec/target/kind`)
  const namespace = getValue(model, `/spec/target/namespace`)
  const params = storeGet('/route/params')
  const { user, cluster } = params

  const url = `/clusters/${user}/${cluster}/proxy/meta.k8s.appscode.com/v1alpha1/usermenus/kubedb-accordion/available`
  try {
    const resp = await axios.get(url)
    console.log(resp)
  } catch (e) {
    console.log(e)
  }
}

return {
  init,
  getTargetName,
  getKinds,
  getApiGroup,
  isConsole,
  initMetadata,
  isRancherManaged,
  isNotRancherManaged,
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
}
