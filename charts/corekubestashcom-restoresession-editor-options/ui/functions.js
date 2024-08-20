let addonList = []

function initMetadata({ storeGet, commit }) {
  const resource = storeGet('/resource') || {}
  const { group, kind } = resource?.layout?.result?.resource
  const name = storeGet('/route/query/name') || ''
  const namespace = storeGet('route/query/namespace') || ''

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

async function getNamespaces({ axios, storeGet }) {
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
    const namespaces = resp?.data?.status?.namespaces || []
    return namespaces
  } catch (e) {
    console.log(e)
    return []
  }
}

function setNamespace({ storeGet }) {
  const namespace = storeGet('/route/query/namespace') || ''
  return namespace
}

async function fetchNames({ getValue, model, storeGet, watchDependency, axios }, type) {
  watchDependency(`model#/spec/dataSource/${type}/namespace`) || ''
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace = getValue(model, `/spec/dataSource/${type}/namespace`) || ''
  const suffix =
    type === 'encryptionSecret' ? 'secrets' : type === 'repository' ? 'repositories' : type
  const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
  const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'
  const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`

  try {
    if (namespace) {
      const resp = await axios.get(url)
      let names = resp?.data?.items
      names.map((item) => {
        item.value = item?.metadata?.name
        item.text = item?.metadata?.name
        return true
      })

      if (type === 'repository') {
        const resource = storeGet('/resource') || {}
        const { group, kind } = resource?.layout?.result?.resource
        const filteredRepo = names.filter((item) => {
          return item?.spec?.appRef?.apiGroup === group && item?.spec?.appRef?.kind === kind
        })
        return filteredRepo
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

function returnFalse() {
  return false
}

return {
  initMetadata,
  getNamespaces,
  setNamespace,
  fetchNames,
  getSnapshots,
  getAddons,
  getTasks,
  returnFalse,
}
