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

async function fetchNames({ getValue, axios, storeGet, watchDependency, model }, type) {
  watchDependency(`model#/${type}/namespace`)
  const username = storeGet('/route/params/user')
  const clusterName = storeGet('/route/params/cluster')
  const namespace = getValue(model, `/${type}/namespace`)
  const suffix =
    type === 'encryptionSecret'
      ? 'secrets'
      : type === 'retentionPolicy'
      ? 'retentionpolicies'
      : 'backupstorages'
  const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
  const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'
  const url = `http://bb.test:3003/api/v1/clusters/${username}/${clusterName}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`
  try {
    if (namespace) {
      const resp = await axios.get(url)
      let names = resp?.data?.items
      names = names.map((ele) => ele?.metadata?.name)
      return names
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

return {
  getNamespaces,
  fetchNames,
}
