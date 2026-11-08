const { useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  async function getNamespaces() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'core',
      version: 'v1',
      resource: 'namespaces',
      filter: { items: { metadata: { name: null } } },
    })

    const resources = resp?.items || []

    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  async function getVaults() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const namespace = getValue(model, '/metadata/namespace')
    if (!namespace) return []

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'kubevault.com',
      version: 'v1alpha2',
      resource: 'vaultservers',
      namespace,
      filter: { items: { metadata: { name: null } } },
    })

    const resources = resp?.items || []

    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  async function getVaultDetails() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const namespace = getValue(model, '/metadata/namespace')
    const name = getValue(model, '/spec/vaultRef/name')

    if (namespace && name) {
      const resp = await akp.resources.get({
        owner,
        cluster,
        group: 'kubevault.com',
        version: 'v1alpha2',
        resource: 'vaultservers',
        namespace,
        name,
      })

      setDiscriminatorValue('/vaultDetails', resp || {})

      return resp || {}
    } else return {}
  }

  function ifRequestTypeEqualsTo(type) {
    const selectedType = getValue(model, '/spec/type')

    return selectedType === type
  }

  function onRequestTypeChange() {
    const selectedType = getValue(model, '/spec/type')
    const reqTypeMapping = {
      Restart: 'restart',
      ReconfigureTLS: 'tls',
    }

    Object.keys(reqTypeMapping).forEach((key) => {
      if (key !== selectedType) commit('wizard/model$delete', `/spec/${reqTypeMapping[key]}`)
    })
  }

  function getVaultTls() {
    const vaultDetails = getValue(discriminator, '/vaultDetails')

    const { spec } = vaultDetails || {}
    return spec?.tls || undefined
  }

  function initNamespace() {
    return storeGet('/route/query/namespace') || null
  }

  function initVaultRef() {
    return storeGet('/route/params/name')
  }

  async function getNamespacedResourceList({ namespace, group, version, resource }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (!namespace) return []

    let ans = []
    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        namespace,
        filter: { items: { metadata: { name: null }, type: null } },
      })

      ans = resp?.items || []
    } catch (e) {
      console.log(e)
    }

    return ans
  }
  async function getResourceList({ group, version, resource }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    let ans = []
    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        filter: { items: { metadata: { name: null }, type: null } },
      })

      ans = resp?.items || []
    } catch (e) {
      console.log(e)
    }

    return ans
  }
  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/namespace')

    let resources = await getNamespacedResourceList({
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
  async function unNamespacedResourceNames(group, version, resource) {
    let resources = await getResourceList({
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
  function hasTlsField() {
    const tls = getVaultTls()

    return !!tls
  }

  function initIssuerRefApiGroup() {
    const kind = getValue(model, '/spec/tls/issuerRef/kind')

    if (kind) {
      const apiGroup = getValue(discriminator, '/vaultDetails/spec/tls/issuerRef/apiGroup')
      if (apiGroup) return apiGroup
      return 'cert-manager.io'
    } else return undefined
  }

  async function getIssuerRefsName() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const apiGroup = getValue(model, '/spec/tls/issuerRef/apiGroup')
    const kind = getValue(model, '/spec/tls/issuerRef/kind')
    const namespace = getValue(model, '/metadata/namespace')

    let ref
    if (kind === 'Issuer') {
      ref = { resource: 'issuers', namespace }
    } else if (kind === 'ClusterIssuer') {
      ref = { resource: 'clusterissuers' }
    }

    if (!ref || !apiGroup || !namespace) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: apiGroup,
        version: 'v1',
        ...ref,
      })

      const resources = resp?.items || []

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
  }

  function initTlsOperation() {
    return 'update'
  }
  function onTlsOperationChange() {
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

  function showIssuerRefAndCertificates() {
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'

    return verd
  }

  function isIssuerRefRequired(value) {
    const hasTls = hasTlsField()
    return !hasTls && !value ? 'This field is required' : false
  }

  function getRequestTypeFromRoute() {
    const isDbloading = isVaultDetailsLoading()
    const requestType = storeGet('/route/query/requestType')
    return isDbloading ? '' : requestType || ''
  }

  // ************************************** Set db details *****************************************

  function isVaultDetailsLoading() {
    const vaultDetails = getValue(discriminator, '/vaultDetails')
    const dbName = getValue(model, '/spec/vaultRef/name')

    return !vaultDetails || !dbName
  }

  function setValueFromVaultDetails(path, commitPath) {
    const retValue = getValue(discriminator, `/vaultDetails${path}`)

    if (commitPath && retValue) {
      const tlsOperation = getValue(discriminator, '/tlsOperation')

      // computed called when tls fields is not visible
      if (commitPath.includes('/spec/tls') && tlsOperation !== 'update') return undefined

      // A layout loader has no field to return the value to
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

  function fetchAliasOptions() {
    return getAliasOptions()
  }

  // Rows that already have an alias keep it
  function disableAlias(index) {
    return !!getValue(model, `/spec/tls/certificates/${index}/alias`)
  }

  function isNamespaceDisabled() {
    return !!storeGet('/route/query/namespace')
  }

  function isVaultRefDisabled() {
    return !!storeGet('/route/params/name')
  }

  function onNamespaceChange() {
    commit('wizard/model$delete', '/spec/type')
  }

  function onVaultChange() {
    commit('wizard/model$delete', '/spec/type')
  }

  return {
    isRancherManaged,
    getNamespaces,
    getVaults,
    getVaultDetails,
    ifRequestTypeEqualsTo,
    onRequestTypeChange,
    getVaultTls,
    initNamespace,
    initVaultRef,
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
    fetchAliasOptions,
    disableAlias,
    isNamespaceDisabled,
    isVaultRefDisabled,
    onNamespaceChange,
    onVaultChange,
  }
}
