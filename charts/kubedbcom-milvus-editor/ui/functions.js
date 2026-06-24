const { axios, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enableMonitoring', false)
  setDiscriminatorValue('/customizeExporter', true)

  function returnFalse() {
    return false
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  function isVariantAvailable() {
    const variant = storeGet('/route/query/variant')
    return !!variant
  }

  async function getNamespaces() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`, {
      params: { filter: { items: { metadata: { name: null } } } },
    })

    const resources = (resp && resp.data && resp.data.items) || []
    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return { text: name, value: name }
    })
  }

  function getCreateNameSpaceUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    if (domain.includes('bb.test')) {
      return `http://console.bb.test:5990/console/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    } else {
      const editedDomain = domain.replace('kubedb', 'console')
      return `${editedDomain}/console/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    }
  }

  async function getMilvusVersions() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/milvusversions`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getStorageClassNames() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        { params: { filter: { items: { metadata: { name: null }, type: null } } } },
      )
      const items = (resp && resp.data && resp.data.items) || []
      return items
        .filter((item) => ['kubernetes.io/service-account-token', 'Opaque'].includes(item.type))
        .map((item) => {
          const name = (item.metadata && item.metadata.name) || ''
          return { text: name, value: name }
        })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getIssuerRefsName() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const kind = getValue(
      model,
      '/resources/kubedbComMilvus/spec/tls/issuerRef/kind',
    )
    const namespace = getValue(model, '/metadata/release/namespace')

    if (kind === 'Issuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/namespaces/${namespace}/issuers`
      return getIssuer(url)
    } else if (kind === 'ClusterIssuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
      return getIssuer(url)
    } else {
      return []
    }

    async function getIssuer(url) {
      try {
        const resp = await axios.get(url)
        const resources = (resp && resp.data && resp.data.items) || []
        return resources.map((item) => {
          const name = (item.metadata && item.metadata.name) || ''
          return { text: name, value: name }
        })
      } catch (e) {
        console.log(e)
        return []
      }
    }
  }

  function setApiGroup() {
    return 'cert-manager.io'
  }

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
  }

  function onNameChange() {
    const dbName = getValue(model, '/metadata/release/name')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/name',
      value: dbName,
      force: true,
    })
  }

  function onNamespaceChange() {
    const namespace = getValue(model, '/metadata/release/namespace')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/namespace',
      value: namespace,
      force: true,
    })
  }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComMilvus/metadata/labels')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/labels',
      value: labels,
      force: true,
    })
  }

  function disableLableChecker({ itemCtx }) {
    const key = itemCtx?.key || ''
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  function isEqualToModelPathValue(value, path) {
    const modelValue = getValue(model, path)
    return modelValue === value
  }

  function returnTrue() {
    return true
  }

  function returnStringYes() {
    return 'yes'
  }

  function getCreateAuthSecret() {
    const secret = getValue(model, '/resources/kubedbComMilvus/spec/authSecret/name')
    return !secret
  }

  function onCreateAuthSecretChange({ getValue, discriminator, commit }) {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    if (!createAuthSecret) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/authSecret')
    }
  }

  function showExistingSecretSection() {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    return !createAuthSecret
  }

  function showPasswordSection() {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    return !!createAuthSecret
  }

  function setAuthSecretPassword() {
    return ''
  }

  function onAuthSecretPasswordChange({ getValue, discriminator, commit, model }) {
    const password = getValue(discriminator, '/password')
    if (password) {
      commit('wizard/model$update', {
        path: '/resources/secret_auth/stringData/password',
        value: password,
        force: true,
      })
    }
  }

  function onTlsConfigureChange() {
    const configureTLS = getValue(discriminator, '/configureTLS')
    if (!configureTLS) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/tls')
    }
  }

  function showTlsConfigureSection() {
    const configureTLS = getValue(discriminator, '/configureTLS')
    return !!configureTLS
  }

  function setStorageClass() {
    const deletionPolicy = getValue(model, '/resources/kubedbComMilvus/spec/deletionPolicy')
    if (deletionPolicy === 'WipeOut' || deletionPolicy === 'Delete') {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMilvus/spec/storageType',
        value: 'Durable',
        force: true,
      })
    }
  }

  function onEnableMonitoringChange() {
    const enableMonitoring = getValue(discriminator, '/enableMonitoring')
    if (!enableMonitoring) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/monitor')
    }
  }

  function showMonitoringSection() {
    const enableMonitoring = getValue(discriminator, '/enableMonitoring')
    return !!enableMonitoring
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComMilvus/spec/monitor/agent')
    if (agent !== 'prometheus.io') {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  function onCustomizeExporterChange() {
    const customize = getValue(discriminator, '/customizeExporter')
    if (!customize) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/monitor/prometheus/exporter')
    }
  }

  function showCustomizeExporterSection() {
    const customize = getValue(discriminator, '/customizeExporter')
    return !!customize
  }

  function onSetCustomConfigChange() {
    const setCustomConfig = getValue(discriminator, '/setCustomConfig')
    if (setCustomConfig !== 'yes') {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration')
    }
  }

  function setConfigurationSource() {
    return 'use-existing-config'
  }

  function onConfigurationSourceChange() {
    const source = getValue(discriminator, '/configurationSource')
    if (source === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration/inline')
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration/secretName')
    }
  }

  function setConfiguration() {
    return ''
  }

  function onConfigurationChange() {
    const config = getValue(discriminator, '/configuration')
    if (config) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMilvus/spec/configuration/inline',
        value: { 'milvus.yaml': config },
        force: true,
      })
    }
  }

  function isEqualToDiscriminatorPath(value, path) {
    const discriminatorValue = getValue(discriminator, path)
    return discriminatorValue === value
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path) || null
    return !!modelValue
  }

  function getOpsRequestUrl(reqType) {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    const owner = storeGet('/route/params/user')
    const dbname = getValue(model, '/metadata/release/name')
    const group = getValue(model, '/metadata/resource/group')
    const kind = getValue(model, '/metadata/resource/kind')
    const namespace = getValue(model, '/metadata/release/namespace')
    const resource = getValue(model, '/metadata/resource/name')
    const version = getValue(model, '/metadata/resource/version')
    const routeRootPath = storeGet('/route/path')
    const pathPrefix = `${domain}/db${routeRootPath}`
    const pathSplit = pathPrefix.split('/').slice(0, -1).join('/')
    const pathConstructedForKubedb = pathSplit + `/${reqType.toLowerCase()}?namespace=${namespace}`
    const isKube = !!storeGet('/route/params/actions')
    if (isKube) return pathConstructedForKubedb
    else
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/milvusopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  function initMonitoring() {
    const exporter = getValue(model, '/resources/kubedbComMilvus/spec/monitor/prometheus/exporter')
    if (!exporter) {
      setDiscriminatorValue('/customizeExporter', false)
    }
  }

  async function resourceNames(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`,
        { params: { filter: { items: { metadata: { name: null }, type: null } } } },
      )
      let items = (resp && resp.data && resp.data.items) || []
      if (resource === 'secrets') {
        items = items.filter((item) => {
          const validType = ['kubernetes.io/service-account-token', 'Opaque']
          return validType.includes(item.type)
        })
      }
      return items.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function fetchJsons({ axios, itemCtx }) {
    let ui = {}
    let language = {}
    let functions = {}
    const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

    try {
      ui = axios.get(
        `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      language = axios.get(
        `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      const functionString = axios.get(
        `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
      )
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

  return {
    returnFalse,
    returnTrue,
    returnStringYes,
    isRancherManaged,
    isVariantAvailable,
    getNamespaces,
    getCreateNameSpaceUrl,
    getMilvusVersions,
    getStorageClassNames,
    getSecrets,
    getIssuerRefsName,
    setApiGroup,
    getAliasOptions,
    onNameChange,
    onNamespaceChange,
    onLabelChange,
    disableLableChecker,
    isEqualToModelPathValue,
    isEqualToDiscriminatorPath,
    isValueExistInModel,
    getOpsRequestUrl,
    initMonitoring,
    getCreateAuthSecret,
    onCreateAuthSecretChange,
    showExistingSecretSection,
    showPasswordSection,
    setAuthSecretPassword,
    onAuthSecretPasswordChange,
    onTlsConfigureChange,
    showTlsConfigureSection,
    setStorageClass,
    onEnableMonitoringChange,
    showMonitoringSection,
    onAgentChange,
    onCustomizeExporterChange,
    showCustomizeExporterSection,
    onSetCustomConfigChange,
    setConfigurationSource,
    onConfigurationSourceChange,
    setConfiguration,
    onConfigurationChange,
    resourceNames,
    fetchJsons,
  }
}
