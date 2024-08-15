function providerType({ getValue, watchDependency, model }, value) {
  watchDependency('model#/backend/provider')
  const provider = getValue(model, '/backend/provider')
  return provider === value
}

function isSwitchOn({ watchDependency, getValue, discriminator, model }, type) {
  watchDependency(`discriminator#/${type}`)
  const val = getValue(discriminator, `/${type}`) || false
  return val
}

function setStorageSecret({ getValue, model }) {
  const secret = getValue(model, '/storageSecret/create')
  return secret
}

function onAuthChange({ getValue, discriminator, commit }, type) {
  const auth = getValue(discriminator, `/${type}`) || false
  commit('wizard/model$update', {
    path: '/storageSecret/create',
    value: auth,
    force: true,
  })
}

function setProvider() {
  return 's3'
}

function returnFalse() {
  return false
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
  providerType,
  isSwitchOn,
  setStorageSecret,
  onAuthChange,
  setProvider,
  returnFalse,
  getNamespaces,
}
