let invokerData = []
async function fetchNamespaces({ axios, storeGet }) {
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

async function fetchInvokerName({ getValue, model, watchDependency, axios, storeGet }) {
  watchDependency('model#/spec/invoker/kind')
  watchDependency('model#/metadata/release/namespace')
  const namespace = getValue(model, '/metadata/release/namespace')
  const kind = getValue(model, '/spec/invoker/kind')
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const core = 'core.kubestash.com'
  const version = 'v1alpha1'

  try {
    if (namespace && kind) {
      const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/${kind}`
      console.log(url)
      const resp = await axios.get(url)
      console.log(resp.data)
      invokerData = resp.data.items
      const names = resp.data.items.map((item) => {
        const name = item.metadata?.name
        return name
      })
      return names
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

function fetchSessions({ getValue, model, watchDependency }) {
  watchDependency('model#/spec/invoker/name')
  const invokerName = getValue(model, '/spec/invoker/name')
  const found = invokerData.find((item) => item.metadata.name === invokerName)
  if (found) return found.spec?.sessions.map((item) => item.name)
  return []
}

return {
  fetchNamespaces,
  fetchInvokerName,
  fetchSessions,
}
