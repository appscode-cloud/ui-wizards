let addonList = []

function setTarget({ storeGet, commit }) {
  const resource = storeGet('/resource')
  const { group, kind } = resource.layout?.result?.resource
  const name = storeGet('/route/query/name') || ''
  const namespace = storeGet('route/query/namespace') || ''
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
      names = names.map((item) => item?.metadata?.name)
      return names
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

async function getSnapshots({ watchDependency, model, storeGet, getValue, axios }) {
  watchDependency('model#/spec/dataSource/repository/namespace')
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const core = 'storage.kubestash.com'
  const version = 'v1alpha1'
  const namespace = getValue(model, '/spec/dataSource/repository/namespace') || ''
  const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/snapshots`

  try {
    if (namespace) {
      const resp = await axios.get(url)
      let snapshots = resp?.data?.items
      snapshots.map((item, idx) => {
        const name = item?.metadata?.name
        item.value = name
        item.text = idx === 0 ? name + ' (Latest)' : name
        return true
      })
      console.log(snapshots)

      return snapshots
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
  console.log(url)

  try {
    const resp = await axios.get(url)
    let addons = resp?.data?.items
    addonList = addons
    console.log(addonList)

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
  console.log(tasks)
  tasks = tasks?.map((item) => item?.name)
  return tasks
}

function returnFalse() {
  return false
}

return {
  setTarget,
  getNamespaces,
  setNamespace,
  fetchNames,
  getSnapshots,
  getAddons,
  getTasks,
  returnFalse,
}
