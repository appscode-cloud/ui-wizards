function getOptions({ getValue, model, watchDependency }, type) {
  watchDependency(`model#/spec/kubeDB/${type}/available`)
  const options = getValue(model, `/spec/kubeDB/${type}/available`)
  return options
}

async function getNodeTopology({ axios, storeGet, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  try {
    const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
    const resp = await axios.get(url)
    const nodeTopologyListFromApi = resp.data?.items

    const mappedResp = nodeTopologyListFromApi?.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })
    commit('wizard/model$update', {
      path: '/spec/kubeDB/clusterTier/nodeTopology/available',
      value: mappedResp,
      force: true,
    })
    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

function isConfigureDb({ getValue, discriminator, watchDependency }, value) {
  watchDependency(`discriminator#/${value}/isConfigure`)
  const resp = getValue(discriminator, `/${value}/isConfigure`)
  return resp
}

async function FetchDbVersions(
  { storeGet, axios, getValue, setDiscriminatorValue, discriminator },
  db,
) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const isApiCalled = getValue(discriminator, `/${db}/isApiCalled`)
  const url = `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/${db}versions`
  let data = []
  if (!isApiCalled) {
    const resp = await axios.get(url)
    data = resp.data.items.map((item) => {
      return {
        text: item.spec.version,
        value: item.spec.version,
      }
    })
    setDiscriminatorValue(`/${db}/isApiCalled`, true)
    setDiscriminatorValue(`/${db}/versions`, data)
  } else {
    data = getValue(discriminator, `/${db}/versions`)
  }
  return data
}

function clearDefaultVersion({ commit }, db) {
  commit('wizard/model$update', {
    path: `/spec/kubeDB/databases/${db}/versions/default`,
    value: '',
    force: true,
  })
}

function availableVersions({ getValue, model, watchDependency }, db) {
  watchDependency(`model#/spec/kubeDB/databases/${db}/versions/available`)
  return getValue(model, `/spec/kubeDB/databases/${db}/versions/available`)
}

async function getPlacements({ axios, storeGet, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
  try {
    const resp = await axios.get(url)

    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getStorageClass({ axios, storeGet, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`
  try {
    const resp = await axios.get(url)
    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getClusterIssuers({ axios, storeGet }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
  try {
    const resp = await axios.get(url)
    console.log(resp)
    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
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

return {
  getOptions,
  getNodeTopology,
  isConfigureDb,
  FetchDbVersions,
  availableVersions,
  clearDefaultVersion,
  getPlacements,
  getStorageClass,
  getClusterIssuers,
  getNamespaces,
}