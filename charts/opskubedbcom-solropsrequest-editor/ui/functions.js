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
  if (storeGet('/route/query/operation')) return []
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

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  if (storeGet('/route/query/operation')) return []
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/solrs`,
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

async function getDbDetails({ axios, storeGet, model, getValue, setDiscriminatorValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/namespace')
  const name = getValue(model, '/spec/databaseRef/name')

  if (namespace && name) {
    const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/solrs/${name}`
    const resp = await axios.get(url)

    setDiscriminatorValue('/dbDetails', resp.data || {})

    return resp.data || {}
  } else return {}
}

async function getDbVersions({ axios, storeGet, getValue, discriminator }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/charts.x-helm.dev/v1alpha1/clusterchartpresets/kubedb-ui-presets`

  let presets = storeGet('/kubedbuiPresets') || {}
  if (!storeGet('/route/query/operation')) {
    try {
      const presetResp = await axios.get(url)
      presets = presetResp.data?.spec?.values?.spec
    } catch (e) {
      console.log(e)
      presets.status = String(e.status)
    }
  }

  try {
    const presetVersions = presets.admin?.databases?.Solr?.versions?.available || []
    const queryParams = {
      filter: {
        items: {
          metadata: { name: null },
          spec: { version: null, deprecated: null, updateConstraints: null },
        },
      },
    }

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/solrversions`,
      {
        params: queryParams,
      },
    )

    const resources = (resp && resp.data && resp.data.items) || []

    const sortedVersions = resources.sort((a, b) => versionCompare(a.spec.version, b.spec.version))

    let ver = getValue(discriminator, '/dbDetails/spec/version') || '0'
    const found = sortedVersions.find((item) => item.metadata.name === ver)

    if (found) ver = found.spec?.version
    const allowed = found?.spec?.updateConstraints?.allowlist || []
    const limit = allowed.length ? allowed[0] : '0.0'

    // keep only non deprecated & kubedb-ui-presets & within constraints of current version
    // if presets.status is 404, it means no presets available, no need to filter with presets
    const filteredSolrVersions = sortedVersions.filter((item) => {
      // default limit 0.0 means no restrictions, show all higher versions
      if (limit === '0.0')
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          versionCompare(item.spec?.version, ver) >= 0
        )
      // if limit doesn't have any operator, it's a single version
      else if (!limit.match(/^(>=|<=|>|<)/))
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          item.spec?.version === limit
        )
      // if limit has operator, check version with constraints
      else
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          isVersionWithinConstraints(item.spec?.version, limit)
        )
    })

    return filteredSolrVersions.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const specVersion = (item.spec && item.spec.version) || ''
      return {
        text: `${name} (${specVersion})`,
        value: name,
      }
    })
  } catch (e) {
    console.log(e)
    return []
  }
}

function versionCompare(v1, v2) {
  const arr1 = v1.split('.').map(Number)
  const arr2 = v2.split('.').map(Number)

  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    const num1 = arr1[i] || 0
    const num2 = arr2[i] || 0

    if (num1 > num2) return 1 // v1 is higher
    if (num1 < num2) return -1 // v2 is higher
  }
  return 0 // versions are equal
}

function isVersionWithinConstraints(version, constraints) {
  let constraintsArr = []
  if (constraints.includes(',')) constraintsArr = constraints?.split(',')?.map((c) => c.trim())
  else constraintsArr = [constraints]

  for (let constraint of constraintsArr) {
    let match = constraint.match(/^(>=|<=|>|<)/)
    let operator = match ? match[0] : ''
    let constraintVersion = constraint.replace(/^(>=|<=|>|<)/, '').trim()

    let comparison = versionCompare(version, constraintVersion)
    if (
      (operator === '>=' && comparison < 0) ||
      (operator === '<=' && comparison > 0) ||
      (operator === '>' && comparison <= 0) ||
      (operator === '<' && comparison >= 0)
    )
      return false
  }
  return true
}

function ifRequestTypeEqualsTo({ model, getValue, watchDependency }, type) {
  const selectedType = getValue(model, '/spec/type')
  watchDependency('model#/spec/type')

  return selectedType === type
}

function onRequestTypeChange({ model, getValue, commit }) {
  const selectedType = getValue(model, '/spec/type')
  const reqTypeMapping = {
    Upgrade: 'updateVersion',
    UpdateVersion: 'updateVersion',
    HorizontalScaling: 'horizontalScaling',
    VerticalScaling: 'verticalScaling',
    VolumeExpansion: 'volumeExpansion',
    Restart: 'restart',
    Reconfigure: 'configuration',
    ReconfigureTLS: 'tls',
  }

  Object.keys(reqTypeMapping).forEach((key) => {
    if (key !== selectedType) commit('wizard/model$delete', `/spec/${reqTypeMapping[key]}`)
  })
}

function disableOpsRequest({ itemCtx, discriminator, getValue, watchDependency }) {
  if (itemCtx.value === 'HorizontalScaling') {
    const dbType = getDbType({
      discriminator,
      getValue,
      watchDependency,
    })

    if (dbType === 'Standalone') return true
    else return false
  } else return false
}

function getDbTls({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')

  const { spec } = dbDetails || {}
  return spec?.tls || undefined
}

function getDbType({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')
  const { spec } = dbDetails || {}
  const { topology } = spec || {}
  if (topology) return 'Topology'
  else return 'Combined'
}

function initNamespace({ route }) {
  const { namespace } = route.query || {}
  return namespace || null
}

function initDatabaseRef({ route, watchDependency }) {
  watchDependency('model#/metadata/namespace')
  const { name } = route.query || {}
  return name
}

function asDatabaseOperation(route) {
  return !!route.query.operation
}

function generateOpsRequestNameForClusterUI(getValue, model, route) {
  const dbName = getValue(model, '/spec/databaseRef/name')

  const selectedType = getValue(model, '/spec/type')
  const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

  const resources = route.params.resource || ''
  const resource = resources.slice(0, -1)

  const opsName = dbName ? dbName : resource
  return `${opsName}-${Math.floor(Date.now() / 1000)}${lowerType ? '-' + lowerType : ''}`
}

function showAndInitName({ route, commit, getValue, model, watchDependency }) {
  watchDependency('model#/spec/type')
  watchDependency('model#/spec/databaseRef/name')
  const ver = asDatabaseOperation(route)

  const selectedType = getValue(model, '/spec/type')
  const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

  if (ver) {
    // For kubedb-ui
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: `${route.query.name}-${Math.floor(Date.now() / 1000)}-${lowerType}`,
      force: true,
    })
  } else {
    // For cluster-ui
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: generateOpsRequestNameForClusterUI(getValue, model, route),
      force: true,
    })
  }
  return !ver
}
function showAndInitNamespace({ route, commit }) {
  const ver = asDatabaseOperation(route)
  if (ver) {
    commit('wizard/model$update', {
      path: '/metadata/namespace',
      value: `${route.query.namespace}`,
      force: true,
    })
  }

  return !ver
}
function showAndInitDatabaseRef({ route, commit }) {
  const ver = asDatabaseOperation(route)
  if (ver) {
    commit('wizard/model$update', {
      path: '/spec/databaseRef/name',
      value: `${route.query.name}`,
      force: true,
    })
  }

  return !ver
}
function showConfigureOpsrequestLabel({ route }) {
  return !asDatabaseOperation(route)
}
function showAndInitOpsRequestType({ route, commit }) {
  const ver = asDatabaseOperation(route)
  const opMap = {
    upgrade: 'UpdateVersion',
    updateVersion: 'UpdateVersion',
    horizontalscaling: 'HorizontalScaling',
    verticalscaling: 'VerticalScaling',
    volumeexpansion: 'VolumeExpansion',
    restart: 'Restart',
    reconfiguretls: 'ReconfigureTLS',
    reconfigure: 'Reconfigure',
  }
  if (ver) {
    const operation = route.query.operation
    const match = /^(.*)-opsrequest-(.*)$/.exec(operation)
    const opstype = match[2]
    commit('wizard/model$update', {
      path: '/spec/type',
      value: opMap[opstype],
      force: true,
    })
  }

  return !ver
}

// vertical scaling
function ifDbTypeEqualsTo({ discriminator, getValue, watchDependency, commit }, value, opsReqType) {
  const verd = getDbType({
    discriminator,
    getValue,
    watchDependency,
  })
  return value === verd
}

// for config secret
async function getConfigSecrets({ storeGet, axios, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    },
  )

  const secrets = (resp && resp.data && resp.data.items) || []

  const filteredSecrets = secrets

  filteredSecrets.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    item.text = name
    item.value = name
    return true
  })
  return filteredSecrets
}

function createSecretUrl({ storeGet }) {
  const user = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const domain = storeGet('/domain') || ''
  if (domain.includes('bb.test')) {
    return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/secrets/create`
  } else {
    const editedDomain = domain.replace('kubedb', 'console')
    return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/secrets/create`
  }
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

// reconfiguration type
function ifReconfigurationTypeEqualsTo({ discriminator, getValue, watchDependency }, value) {
  const reconfigurationType = getValue(discriminator, '/reconfigurationType')
  watchDependency('discriminator#/reconfigurationType')

  return reconfigurationType === value
}

function onApplyconfigChange({ discriminator, getValue, commit }) {
  const applyconfig = getValue(discriminator, '/applyConfig')

  const configObj = {}
  if (applyconfig) {
    applyconfig.forEach((item) => {
      const { key, value } = item
      configObj[key] = value
    })
  }

  commit('wizard/model$update', {
    path: '/spec/configuration/applyConfig',
    value: configObj,
    force: true,
  })
}

function onReconfigurationTypeChange({ commit, discriminator, getValue, setDiscriminatorValue }) {
  const reconfigurationType = getValue(discriminator, '/reconfigurationType')
  setDiscriminatorValue('/applyConfig', [])
  if (reconfigurationType === 'remove') {
    commit('wizard/model$delete', `/spec/configuration`)

    commit('wizard/model$update', {
      path: `/spec/configuration/removeCustomConfig`,
      value: true,
      force: true,
    })
  } else {
    commit('wizard/model$delete', `/spec/configuration/configSecret`)
    commit('wizard/model$delete', `/spec/configuration/applyConfig`)
    commit('wizard/model$delete', `/spec/configuration/removeCustomConfig`)
  }
}

// for tls
function hasTlsField({ discriminator, getValue, watchDependency }) {
  const tls = getDbTls({
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
    const apiGroup = getValue(discriminator, '/dbDetails/spec/tls/issuerRef/apiGroup')
    if (apiGroup) return apiGroup
    return 'cert-manager.io'
  } else return undefined
}

async function getIssuerRefsName({ axios, storeGet, getValue, model, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  watchDependency('model#/spec/tls/issuerRef/kind')
  watchDependency('model#/metadata/namespace')
  const kind = getValue(model, '/spec/tls/issuerRef/kind')
  const namespace = getValue(model, '/metadata/namespace')

  if (kind === 'Issuer') {
    const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/namespaces/${namespace}/issuers`
    return getIssuer(url)
  } else if (kind === 'ClusterIssuer') {
    const presets = storeGet('/kubedbuiPresets')
    let clusterIssuers = presets.admin?.clusterIssuers?.available || []
    if (presets.status === '404') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
      return getIssuer(url)
    }
    return clusterIssuers
  }

  async function getIssuer(url) {
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
  const isDbloading = isDbDetailsLoading({ discriminator, model, getValue, watchDependency })
  const { query } = route || {}
  const { requestType } = query || {}
  return isDbloading ? '' : requestType || ''
}

// ************************************** Set db details *****************************************

function isDbDetailsLoading({ discriminator, model, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  watchDependency('model#/spec/databaseRef/name')
  const dbDetails = getValue(discriminator, '/dbDetails')
  const dbName = getValue(model, '/spec/databaseRef/name')

  return !dbDetails || !dbName
}

function setValueFromDbDetails(
  { discriminator, getValue, watchDependency, commit },
  path,
  commitPath,
) {
  watchDependency('discriminator#/dbDetails')

  const retValue = getValue(discriminator, `/dbDetails${path}`)

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

function setResource({ discriminator, getValue, watchDependency, storeGet }, path) {
  watchDependency('discriminator#/dbDetails')
  const containers = getValue(discriminator, `/dbDetails${path}`) || []
  const kind = storeGet('/resource/layout/result/resource/kind')
  const resource = containers.filter((ele) => ele.name === kind.toLowerCase())
  return resource[0].resources
}

function getAliasOptions() {
  return ['server', 'client', 'metrics-exporter']
}

function isNamespaceDisabled({ route }) {
  const { namespace } = route.query || {}
  return !!namespace
}

function isDatabaseRefDisabled({ route }) {
  const { name } = route.query || {}
  return !!name
}

function onNamespaceChange({ commit }) {
  commit('wizard/model$delete', '/spec/type')
}

function onDbChange({ commit, axios, storeGet, model, getValue, setDiscriminatorValue }) {
  commit('wizard/model$delete', '/spec/type')
  getDbDetails({ axios, storeGet, model, getValue, setDiscriminatorValue })
}

function setApplyToIfReady() {
  return 'IfReady'
}

function isVerticalScaleTopologyRequired({ watchDependency, getValue, discriminator, commit }) {
  watchDependency('discriminator#/topologyKey')
  watchDependency('discriminator#/topologyValue')

  const key = getValue(discriminator, '/topologyKey')
  const value = getValue(discriminator, '/topologyValue')
  const path = `/spec/verticalScaling/solr/topology`

  if (key || value) {
    commit('wizard/model$update', {
      path: path,
      value: { key, value },
      force: true,
    })
    return true
  } else {
    commit('wizard/model$delete', path)
    return false
  }
}

return {
  setResource,
  fetchJsons,
  returnFalse,
  getNamespaces,
  getDbs,
  getDbDetails,
  getDbVersions,
  ifRequestTypeEqualsTo,
  onRequestTypeChange,
  getDbTls,
  getDbType,
  initNamespace,
  initDatabaseRef,
  isRancherManaged,
  showAndInitName,
  showAndInitNamespace,
  showAndInitDatabaseRef,
  showConfigureOpsrequestLabel,
  showAndInitOpsRequestType,

  ifDbTypeEqualsTo,
  getConfigSecrets,
  createSecretUrl,
  isEqualToValueFromType,
  disableOpsRequest,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  ifReconfigurationTypeEqualsTo,
  onReconfigurationTypeChange,
  onApplyconfigChange,
  hasTlsField,
  initIssuerRefApiGroup,
  getIssuerRefsName,
  initTlsOperation,
  onTlsOperationChange,
  showIssuerRefAndCertificates,
  isIssuerRefRequired,
  getRequestTypeFromRoute,
  isDbDetailsLoading,
  setValueFromDbDetails,
  getAliasOptions,
  isNamespaceDisabled,
  isDatabaseRefDisabled,
  onNamespaceChange,
  onDbChange,
  setApplyToIfReady,
  isVerticalScaleTopologyRequired,
}
