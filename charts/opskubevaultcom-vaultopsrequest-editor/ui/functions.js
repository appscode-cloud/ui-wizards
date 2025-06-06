async function fetchJsons({ axios, itemCtx }) {
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

function returnFalse() {
  return false
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

async function getNamespaces({ axios, storeGet }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`, {
    params: { filter: { items: { metadata: { name: null } } } },
  })

  const resources = (resp && resp.data && resp.data.items) || []

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

async function getVaults({ axios, storeGet, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubevault.com/v1alpha2/namespaces/${namespace}/vaultservers`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    },
  )

  const resources = (resp && resp.data && resp.data.items) || []

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

async function getVaultDetails({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')
  const name = getValue(model, '/spec/vaultRef/name')
  watchDependency('model#/spec/vaultRef/name')

  if (namespace && name) {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubevault.com/v1alpha2/namespaces/${namespace}/vaultservers/${name}`,
    )

    setDiscriminatorValue('/vaultDetails', resp.data || {})

    return resp.data || {}
  } else return {}
}

function ifRequestTypeEqualsTo({ model, getValue, watchDependency }, type) {
  const selectedType = getValue(model, '/spec/type')
  watchDependency('model#/spec/type')

  return selectedType === type
}

function onRequestTypeChange({ model, getValue, commit }) {
  const selectedType = getValue(model, '/spec/type')
  const reqTypeMapping = {
    Restart: 'restart',
    ReconfigureTLS: 'tls',
  }

  Object.keys(reqTypeMapping).forEach((key) => {
    if (key !== selectedType) commit('wizard/model$delete', `/spec/${reqTypeMapping[key]}`)
  })
}

function getVaultTls({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/vaultDetails')
  const vaultDetails = getValue(discriminator, '/vaultDetails')

  const { spec } = vaultDetails || {}
  return spec?.tls || undefined
}

function initNamespace({ route }) {
  const { namespace } = route.query || {}
  return namespace || null
}

function initVaultRef({ route, watchDependency }) {
  watchDependency('model#/metadata/namespace')
  const { name } = route.params || {}
  return name
}

function isEqualToValueFromType({ discriminator, getValue, watchDependency }, value) {
  watchDependency('discriminator#/valueFromType')
  const valueFrom = getValue(discriminator, '/valueFromType')
  return valueFrom === value
}

async function getNamespacedResourceList(axios, storeGet, { namespace, group, version, resource }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`

  let ans = []
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    })

    const items = (resp && resp.data && resp.data.items) || []
    ans = items
  } catch (e) {
    console.log(e)
  }

  return ans
}
async function getResourceList(axios, storeGet, { group, version, resource }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`

  let ans = []
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    })

    const items = (resp && resp.data && resp.data.items) || []
    ans = items
  } catch (e) {
    console.log(e)
  }

  return ans
}
async function resourceNames(
  { axios, getValue, model, watchDependency, storeGet },
  group,
  version,
  resource,
) {
  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group,
    version,
    resource,
  })

  if (resource === 'secrets') {
    resources = resources.filter((item) => {
      const validType = ['kubernetes.io/service-account-token', 'Opaque']
      return validType.includes(item.type)
    })
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}
async function unNamespacedResourceNames({ axios, storeGet }, group, version, resource) {
  let resources = await getResourceList(axios, storeGet, {
    group,
    version,
    resource,
  })

  if (resource === 'secrets') {
    resources = resources.filter((item) => {
      const validType = ['kubernetes.io/service-account-token', 'Opaque']
      return validType.includes(item.type)
    })
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

// for tls
function hasTlsField({ discriminator, getValue, watchDependency }) {
  const tls = getVaultTls({
    discriminator,
    getValue,
    watchDependency,
  })

  return !!tls
}

function initIssuerRefApiGroup({ getValue, model, watchDependency, discriminator }) {
  const kind = getValue(model, '/spec/tls/issuerRef/kind')
  watchDependency('model#/spec/tls/issuerRef/kind')

  if (kind) {
    const apiGroup = getValue(discriminator, '/vaultDetails/spec/tls/issuerRef/apiGroup')
    if (apiGroup) return apiGroup
    return 'cert-manager.io'
  } else return undefined
}

async function getIssuerRefsName({ axios, storeGet, getValue, model, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  watchDependency('model#/spec/tls/issuerRef/apiGroup')
  watchDependency('model#/spec/tls/issuerRef/kind')
  watchDependency('model#/metadata/namespace')
  const apiGroup = getValue(model, '/spec/tls/issuerRef/apiGroup')
  const kind = getValue(model, '/spec/tls/issuerRef/kind')
  const namespace = getValue(model, '/metadata/namespace')

  let url
  if (kind === 'Issuer') {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/namespaces/${namespace}/issuers`
  } else if (kind === 'ClusterIssuer') {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/clusterissuers`
  }

  if (!url) return []

  if (url && apiGroup && namespace) {
    try {
      const resp = await axios.get(url)

      const resources = (resp && resp.data && resp.data.items) || []

      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        item.text = name
        item.value = name
        return true
      })
      return resources
    } catch (e) {
      console.log(e)
      return []
    }
  } else {
    return []
  }
}

function initTlsOperation() {
  return 'update'
}
function onTlsOperationChange({ discriminator, getValue, commit }) {
  const tlsOperation = getValue(discriminator, '/tlsOperation')

  commit('wizard/model$delete', '/spec/tls')

  if (tlsOperation === 'rotate') {
    commit('wizard/model$update', {
      path: '/spec/tls/rotateCertificates',
      value: true,
      force: true,
    })
    commit('wizard/model$delete', '/spec/tls/certificates')
    commit('wizard/model$delete', '/spec/tls/remove')
  } else if (tlsOperation === 'remove') {
    commit('wizard/model$update', {
      path: '/spec/tls/remove',
      value: true,
      force: true,
    })
    commit('wizard/model$delete', '/spec/tls/certificates')
    commit('wizard/model$delete', '/spec/tls/rotateCertificates')
  }
}

function showIssuerRefAndCertificates({ discriminator, getValue, watchDependency }) {
  const tlsOperation = getValue(discriminator, '/tlsOperation')
  watchDependency('discriminator#/tlsOperation')
  const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'

  return verd
}

function isIssuerRefRequired({ discriminator, getValue, watchDependency }) {
  const hasTls = hasTlsField({
    discriminator,
    getValue,
    watchDependency,
  })

  return !hasTls
}

function getRequestTypeFromRoute({ route, model, discriminator, getValue, watchDependency }) {
  const isDbloading = isVaultDetailsLoading({ discriminator, model, getValue, watchDependency })
  const { query } = route || {}
  const { requestType } = query || {}
  return isDbloading ? '' : requestType || ''
}

// ************************************** Set db details *****************************************

function isVaultDetailsLoading({ discriminator, model, getValue, watchDependency }) {
  watchDependency('discriminator#/vaultDetails')
  watchDependency('model#/spec/vaultRef/name')
  const vaultDetails = getValue(discriminator, '/vaultDetails')
  const dbName = getValue(model, '/spec/vaultRef/name')

  return !vaultDetails || !dbName
}

function setValueFromVaultDetails(
  { discriminator, getValue, watchDependency, commit },
  path,
  commitPath,
) {
  watchDependency('discriminator#/vaultDetails')

  const retValue = getValue(discriminator, `/vaultDetails${path}`)

  if (commitPath && retValue) {
    const tlsOperation = getValue(discriminator, '/tlsOperation')

    // computed called when tls fields is not visible
    if (commitPath.includes('/spec/tls') && tlsOperation !== 'update') return undefined

    // direct model update required for reusable element.
    // computed property is not applicable for reusable element
    commit('wizard/model$update', {
      path: commitPath,
      value: retValue,
      force: true,
    })
  }

  return retValue || undefined
}

function getAliasOptions() {
  return ['server', 'client', 'storage']
}

function isNamespaceDisabled({ route }) {
  const { namespace } = route.query || {}
  return !!namespace
}

function isVaultRefDisabled({ route }) {
  const { name } = route.params || {}
  return !!name
}

function onNamespaceChange({ commit }) {
  commit('wizard/model$delete', '/spec/type')
}

function onVaultChange({ commit }) {
  commit('wizard/model$delete', '/spec/type')
}

return {
  isRancherManaged,
  fetchJsons,
  returnFalse,
  getNamespaces,
  getVaults,
  getVaultDetails,
  ifRequestTypeEqualsTo,
  onRequestTypeChange,
  getVaultTls,
  initNamespace,
  initVaultRef,
  isEqualToValueFromType,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  hasTlsField,
  initIssuerRefApiGroup,
  getIssuerRefsName,
  initTlsOperation,
  onTlsOperationChange,
  showIssuerRefAndCertificates,
  isIssuerRefRequired,
  getRequestTypeFromRoute,
  isVaultDetailsLoading,
  setValueFromVaultDetails,
  getAliasOptions,
  isNamespaceDisabled,
  isVaultRefDisabled,
  onNamespaceChange,
  onVaultChange,
}
