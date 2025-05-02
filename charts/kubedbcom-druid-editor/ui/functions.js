// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
async function fetchJsons({ axios, itemCtx, setDiscriminatorValue }, discriminatorPath) {
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

  if (discriminatorPath) {
    setDiscriminatorValue(discriminatorPath, {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    })
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  }
}

function disableLableChecker({ itemCtx }) {
  const { key } = itemCtx
  if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
  else return false
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, value, modelPath) {
  const modelPathValue = getValue(model, modelPath)
  watchDependency('model#' + modelPath)
  return modelPathValue === value
}

async function getResources({ axios, storeGet }, group, version, resource) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: { filter: { items: { metadata: { name: null } } } },
      },
    )

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

function isEqualToDiscriminatorPath(
  { discriminator, getValue, watchDependency },
  value,
  discriminatorPath,
) {
  watchDependency('discriminator#' + discriminatorPath)
  const discriminatorValue = getValue(discriminator, discriminatorPath)
  return discriminatorValue === value
}

function setValueFromModel({ getValue, model }, path) {
  return getValue(model, path)
}

function returnTrue() {
  return true
}

function returnStringYes() {
  return 'yes'
}

// ************************* Basic Info **********************************************

function removeCertificatesOfAliases({ model, getValue, commit }, aliasesToRemove) {
  const certificates = getValue(model, '/resources/kubedbComDruid/spec/tls/certificates') || []
  const updatedCertificates = certificates.filter((item) => !aliasesToRemove.includes(item.alias))
  commit('wizard/model$update', {
    path: '/resources/kubedbComDruid/spec/tls/certificates',
    value: updatedCertificates,
    force: true,
  })
}

/*************************************  Database Secret Section ********************************************/

function getCreateAuthSecret({ model, getValue }) {
  const authSecret = getValue(model, '/resources/kubedbComDruid/spec/authSecret')

  return !authSecret
}

function showExistingSecretSection({ getValue, watchDependency, discriminator }) {
  watchDependency('discriminator#/createAuthSecret')

  const hasAuthSecretName = getValue(discriminator, '/createAuthSecret')
  return !hasAuthSecretName
}

function showPasswordSection({ getValue, watchDependency, discriminator }) {
  return !showExistingSecretSection({
    getValue,
    watchDependency,
    discriminator,
  })
}

function setAuthSecretPassword({ model, getValue, watchDependency, discriminator, commit }) {
  watchDependency('discriminator#/selectedVersionAuthPlugin')

  const dist = getValue(discriminator, '/selectedVersionAuthPlugin')
  if (dist) {
    if (dist === 'X-Pack') {
      const encodedPassword = getValue(model, '/resources/secret_elastic_cred/data/password')
      commit('wizard/model$delete', '/resources/secret_admin_cred')
      return encodedPassword ? decodePassword({}, encodedPassword) : ''
    } else {
      const encodedPassword = getValue(model, '/resources/secret_admin_cred/data/password')
      commit('wizard/model$delete', '/resources/secret_elastic_cred')
      return encodedPassword ? decodePassword({}, encodedPassword) : ''
    }
  }
}

function onAuthSecretPasswordChange({ getValue, discriminator, commit }) {
  const stringPassword = getValue(discriminator, '/password')
  const dist = getValue(discriminator, '/selectedVersionAuthPlugin')

  if (dist) {
    if (stringPassword) {
      if (dist === 'X-Pack') {
        commit('wizard/model$update', {
          path: '/resources/secret_elastic_cred/data/password',
          value: encodePassword({}, stringPassword),
          force: true,
        })
        commit('wizard/model$update', {
          path: '/resources/secret_elastic_cred/data/username',
          value: encodePassword({}, 'elastic'),
          force: true,
        })
        commit('wizard/model$delete', '/resources/secret_admin_cred')
      } else {
        commit('wizard/model$update', {
          path: '/resources/secret_admin_cred/data/password',
          value: encodePassword({}, stringPassword),
          force: true,
        })
        commit('wizard/model$update', {
          path: '/resources/secret_admin_cred/data/username',
          value: encodePassword({}, 'admin'),
          force: true,
        })
        commit('wizard/model$delete', '/resources/secret_elastic_cred')
      }
    } else {
      commit('wizard/model$delete', '/resources/secret_admin_cred')
      commit('wizard/model$delete', '/resources/secret_elastic_cred')
    }
  }
}

// eslint-disable-next-line no-empty-pattern
function encodePassword({}, value) {
  return btoa(value)
}

// eslint-disable-next-line no-empty-pattern
function decodePassword({}, value) {
  return atob(value)
}

function onCreateAuthSecretChange({ discriminator, getValue, commit }) {
  const createAuthSecret = getValue(discriminator, '/createAuthSecret')
  if (createAuthSecret) {
    commit('wizard/model$delete', '/resources/kubedbComDruid/spec/authSecret')
  } else if (createAuthSecret === false) {
    commit('wizard/model$delete', '/resources/secret_admin_cred')
    commit('wizard/model$delete', '/resources/secret_elastic_cred')
  }
}

async function getSecrets({ storeGet, axios, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/release/namespace')
  watchDependency('model#/metadata/release/namespace')

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
      {
        params: {
          filter: { items: { metadata: { name: null }, type: null } },
        },
      },
    )

    const secrets = (resp && resp.data && resp.data.items) || []

    const filteredSecrets = secrets.filter((item) => {
      const validType = ['kubernetes.io/service-account-token', 'Opaque']
      return validType.includes(item.type)
    })

    filteredSecrets.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      item.text = name
      item.value = name
      return true
    })
    return filteredSecrets
  } catch (e) {
    console.log(e)
    return []
  }
}

/****** Monitoring *********/

function showMonitoringSection({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/enableMonitoring')
  const configureStatus = getValue(discriminator, '/enableMonitoring')
  return configureStatus
}

function onEnableMonitoringChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, '/enableMonitoring')
  if (configureStatus) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComDruid/spec/monitor',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComDruid/spec/monitor')
  }

  // update alert value depend on monitoring profile
  commit('wizard/model$update', {
    path: '/form/alert/enabled',
    value: configureStatus ? 'warning' : 'none',
    force: true,
  })
}

function showCustomizeExporterSection({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/customizeExporter')
  const configureStatus = getValue(discriminator, '/customizeExporter')
  return configureStatus
}

function onCustomizeExporterChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, '/customizeExporter')
  if (configureStatus) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComDruid/spec/monitor/prometheus/exporter',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComDruid/spec/monitor/prometheus/exporter')
  }
}

function isValueExistInModel({ model, getValue }, path) {
  const modelValue = getValue(model, path)
  return !!modelValue
}

function onNamespaceChange({ commit, model, getValue }) {
  const namespace = getValue(model, '/metadata/release/namespace')
  const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')
  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
      value: [namespace],
      force: true,
    })
  }
}

function onLabelChange({ commit, model, getValue }) {
  const labels = getValue(model, '/resources/kubedbComDruid/spec/metadata/labels')

  const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')

  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
      value: labels,
      force: true,
    })
  }
}

function onAgentChange({ commit, model, getValue }) {
  const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')

  if (!agent) {
    removeCertificatesOfAliases({ model, getValue, commit }, ['metrics-exporter'])
  }

  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
      value: [],
      force: true,
    })

    onNamespaceChange({ commit, model, getValue })
    onLabelChange({ commit, model, getValue })
  } else {
    commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
  }
}

// backup form
function showBackupForm({ getValue, discriminator, watchDependency }) {
  const scheduleBackup = getValue(discriminator, '/scheduleBackup')
  watchDependency('discriminator#/scheduleBackup')

  if (scheduleBackup === 'yes') return true
  else return false
}

function returnFalse() {
  return false
}

function getOpsRequestUrl({ storeGet, model, getValue, mode }, reqType) {
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
  const pathConstructedForKubedb =
    pathSplit + `/create-opsrequest-${reqType.toLowerCase()}?namespace=${namespace}`

  if (mode === 'standalone-step') return pathConstructedForKubedb
  else
    return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/druidopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=${reqType}`
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

function showScheduleBackup({ storeGet }) {
  const operationQuery = storeGet('/route/params/actions') || ''
  const isBackupOperation = operationQuery === 'edit-self-backupconfiguration' ? true : false
  return !isBackupOperation
}

function initScheduleBackupForEdit({ getValue, model, setDiscriminatorValue }) {
  const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
    getValue,
    model,
  )

  initRepositoryChoiseForEdit({ getValue, model, setDiscriminatorValue })

  if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
  else return 'no'
}

function initBlueprint() {
  return 'create'
}
function initUsagePolicy() {
  return 'Same'
}

function onInputChange(
  { getValue, discriminator, commit, model },
  modelPath,
  field,
  subfield,
  discriminatorName,
) {
  const value = getValue(discriminator, `/${discriminatorName}`)
  const backends = getValue(model, modelPath)
  if (field !== 'encryptionSecret') backends[0][field][subfield] = value
  else backends[0]['repositories'][0][field][subfield] = value
  commit('wizard/model$update', {
    path: modelPath,
    value: backends,
  })
}

function onInputChangeSchedule(
  { getValue, discriminator, watchDependency, commit, model },
  modelPath,
  discriminatorName,
) {
  watchDependency(`discriminator#/${discriminatorName}`)
  const value = getValue(discriminator, `/${discriminatorName}`)
  const session = getValue(model, modelPath)
  session[0].scheduler.schedule = value
  commit('wizard/model$update', {
    path: modelPath,
    value: session,
  })
}

function setInitSchedule(
  { getValue, discriminator, watchDependency, commit, model },
  modelPath,
  value,
) {
  const session = getValue(model, modelPath)
  session[0].scheduler.schedule = value
  commit('wizard/model$update', {
    path: modelPath,
    value: session,
  })
}

function getDefault({ getValue, model }, modelPath, field, subfield) {
  const backends = getValue(model, modelPath)
  if (field !== 'encryptionSecret') return backends[0][field][subfield]
  else {
    return backends[0]['repositories'][0][field][subfield]
  }
}

function getDefaultSchedule(
  { getValue, discriminator, watchDependency, commit, model },
  modelPath,
  discriminatorName,
) {
  watchDependency(`model#/${modelPath}`)
  const session = getValue(model, modelPath)
  return session[0].scheduler.schedule
}

////////////////// auto scaler //////////////
let autoscaleType = ''
let dbDetails = {}

function isConsole({ storeGet, commit }) {
  const isKube = isKubedb({ storeGet })

  if (isKube) {
    const dbName = storeGet('/route/params/name') || ''
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name',
      value: dbName,
      force: true,
    })
    const operation = storeGet('/route/params/actions') || ''
    if (operation.length) {
      const splitOp = operation.split('-')
      if (splitOp.length > 2) autoscaleType = splitOp[2]
    }
    const date = Math.floor(Date.now() / 1000)
    const modifiedName = `${dbName}-${date}-autoscaling-${autoscaleType}`
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: modifiedName,
      force: true,
    })
    const namespace = storeGet('/route/query/namespace') || ''
    if (namespace) {
      commit('wizard/model$update', {
        path: '/metadata/namespace',
        value: namespace,
        force: true,
      })
    }
  }

  return !isKube
}

function isKubedb({ storeGet }) {
  return !!storeGet('/route/params/actions')
}

function showOpsRequestOptions({ model, getValue, watchDependency, storeGet, discriminator }) {
  if (isKubedb({ storeGet }) === true) return true
  watchDependency('model#/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name')
  watchDependency('discriminator#/autoscalingType')
  return (
    !!getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name') &&
    !!getValue(discriminator, '/autoscalingType')
  )
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

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  watchDependency('model#/metadata/namespace')
  const namespace = getValue(model, '/metadata/namespace')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/druids`,
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

async function getDbDetails({ setDiscriminatorValue, commit, axios, storeGet, getValue, model }) {
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace =
    storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
  const name =
    storeGet('/route/params/name') ||
    getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name') ||
    ''

  if (namespace && name) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/druids/${name}`,
      )
      dbDetails = resp.data || {}
      setDiscriminatorValue('/dbDetails', true)
    } catch (e) {
      console.log(e)
    }
  }

  commit('wizard/model$update', {
    path: `/metadata/release/name`,
    value: name,
    force: true,
  })
  commit('wizard/model$update', {
    path: `/metadata/release/namespace`,
    value: namespace,
    force: true,
  })
  commit('wizard/model$update', {
    path: `/resources/autoscalingKubedbComRedisAutoscaler/spec/databaseRef/name`,
    value: name,
    force: true,
  })
  commit('wizard/model$update', {
    path: `/resources/autoscalingKubedbComRedisAutoscaler/metadata/labels`,
    value: dbDetails.metadata.labels,
    force: true,
  })
}

async function dbTypeEqualsTo({ axios, storeGet, watchDependency, model, getValue, commit }, type) {
  watchDependency('discriminator#/dbDetails')

  const { spec } = dbDetails || {}
  const { topology } = spec || {}
  let verd = ''
  if (topology) verd = 'topology'
  else verd = 'standalone'
  clearSpecModel({ commit }, verd)
  return type === verd && spec
}

function clearSpecModel({ commit }, dbtype) {
  if (dbtype === 'node') {
    commit(
      'wizard/model$delete',
      `/resources/autoscalingKubedbComDruidAutoscaler/spec/${autoscaleType}/data`,
    )
    commit(
      'wizard/model$delete',
      `/resources/autoscalingKubedbComDruidAutoscaler/spec/${autoscaleType}/ingest`,
    )
    commit(
      'wizard/model$delete',
      `/resources/autoscalingKubedbComDruidAutoscaler/spec/${autoscaleType}/master`,
    )
  } else if (dbtype === 'topology') {
    commit(
      'wizard/model$delete',
      `/resources/autoscalingKubedbComDruidAutoscaler/spec/${autoscaleType}/node`,
    )
  }
}

function initMetadata({ getValue, discriminator, model, commit, storeGet }) {
  const dbName =
    getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name') || ''
  const type = getValue(discriminator, '/autoscalingType') || ''
  const date = Math.floor(Date.now() / 1000)
  const resource = storeGet('/route/params/resource')
  const scalingName = dbName ? dbName : resource
  const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
  if (modifiedName)
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: modifiedName,
      force: true,
    })

  // delete the other type object from model
  if (type === 'compute')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComDruidAutoscaler/spec/storage')
  if (type === 'storage')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComDruidAutoscaler/spec/compute')
}

function onNamespaceChange({ model, getValue, commit }) {
  const namespace = getValue(model, '/metadata/namespace')
  if (!namespace) {
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name',
    )
  }
}

function ifScalingTypeEqualsTo(
  { storeGet, watchDependency, getValue, discriminator, model },
  type,
) {
  watchDependency('discriminator#/autoscalingType')
  watchDependency('model#/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name')

  const operation = storeGet('/route/params/actions') || ''
  if (operation.length) {
    const splitOp = operation.split('-')
    if (splitOp.length > 2) autoscaleType = splitOp[2]
  } else autoscaleType = getValue(discriminator, '/autoscalingType') || ''
  const isDatabaseSelected = !!getValue(
    model,
    '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name',
  )
  return autoscaleType === type && isDatabaseSelected
}

async function fetchNodeTopology({ axios, storeGet }) {
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
  try {
    const resp = await axios.get(url)
    const list = (resp && resp.data?.items) || []
    const mappedList = list.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })
    return mappedList
  } catch (e) {
    console.log(e)
  }
  return []
}

function isNodeTopologySelected({ watchDependency, model, getValue }) {
  watchDependency(
    'model#/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/nodeTopology/name',
  )
  const nodeTopologyName =
    getValue(
      model,
      '/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/nodeTopology/name',
    ) || ''
  return !!nodeTopologyName.length
}

function setControlledResources({ commit }, type) {
  const list = ['cpu', 'memory']
  const path = `/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/${type}/controlledResources`
  commit('wizard/model$update', {
    path: path,
    value: list,
    force: true,
  })
  return list
}

function setTrigger({ model, getValue }, path) {
  let value = getValue(model, `/resources/${path}`)
  if (value) return value
  return 'On'
}

function setApplyToIfReady() {
  return 'IfReady'
}

function handleUnit({ commit, model, getValue }, path, type = 'bound') {
  let value = getValue(model, `/resources/${path}`)
  if (type === 'scalingRules') {
    const updatedValue = []
    value?.forEach((ele) => {
      let appliesUpto = ele['appliesUpto']
      let threshold = ele['threshold']
      if (appliesUpto && !isNaN(appliesUpto)) {
        appliesUpto += 'Gi'
      }
      if (!isNaN(threshold)) {
        threshold += 'pc'
      }
      updatedValue.push({ threshold, appliesUpto })
    })
    if (JSON.stringify(updatedValue) !== JSON.stringify(value)) {
      commit('wizard/model$update', {
        path: `/resources/${path}`,
        value: updatedValue,
        force: true,
      })
    }
  } else {
    if (!isNaN(value)) {
      value += 'Gi'
      commit('wizard/model$update', {
        path: `/resources/${path}`,
        value: value,
        force: true,
      })
    }
  }
}

function isBindingAlreadyOn({ model, getValue }) {
  const value = getValue(model, '/resources')
  const keys = Object.keys(value)
  isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComDruidBinding')
  return isExposeBinding
}

async function addOrRemoveBinding({ commit, model, getValue, discriminator }) {
  const value = getValue(discriminator, `/binding`)
  const dbName = getValue(model, '/metadata/release/name')
  const dbNamespace = getValue(model, '/metadata/release/namespace')
  const labels = getValue(model, '/resources/kubedbComDruid/metadata/labels')
  const bindingValues = {
    apiVersion: 'catalog.appscode.com/v1alpha1',
    kind: 'DruidBinding',
    metadata: {
      labels,
      name: dbName,
      namespace: dbNamespace,
    },
    spec: {
      sourceRef: {
        name: dbName,
        namespace: dbNamespace,
      },
    },
  }

  if (value) {
    await commit('wizard/model$update', {
      path: '/resources/catalogAppscodeComDruidBinding',
      value: bindingValues,
      force: true,
    })
  } else {
    await commit('wizard/model$delete', '/resources/catalogAppscodeComDruidBinding')
  }
}

function setMetadata({ storeGet, mode, commit }) {
  const dbname = storeGet('/route/params/name') || ''
  const namespace = storeGet('/route/query/namespace') || ''
  if (mode === 'standalone-step') {
    commit('wizard/model$update', {
      path: '/metadata/release/name',
      value: dbname,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/metadata/release/namespace',
      value: namespace,
      force: true,
    })
  }
}

async function fetchTopologyMachines({ axios, getValue, storeGet, model, setDiscriminatorValue }) {
  const instance = hasAnnotations({ model, getValue })

  const user = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  if (instance) {
    try {
      const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
      const resp = await axios.get(url)

      const nodeGroups = resp.data?.spec?.nodeGroups || []
      setDiscriminatorValue('/topologyMachines', nodeGroups)
      return nodeGroups
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

function setAllowedMachine({ model, getValue }, type, minmax) {
  const annotations = getValue(
    model,
    '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations',
  )
  const instance = annotations['kubernetes.io/instance-type']
  let parsedInstance = {}
  try {
    if (instance) parsedInstance = JSON.parse(instance)
  } catch (e) {
    console.log(e)
    parsedInstance = {}
  }

  const machine = parsedInstance[type] || ''
  const mx = machine?.includes(',') ? machine.split(',')[1] : ''
  const mn = machine?.includes(',') ? machine.split(',')[0] : ''

  if (minmax === 'min') return mn
  else return mx
}

async function getMachines({ getValue, watchDependency, discriminator }, type, minmax) {
  watchDependency('discriminator#/topologyMachines')
  const depends = minmax === 'min' ? 'max' : 'min'
  const dependantPath = `/allowedMachine-${type}-${depends}`

  watchDependency(`discriminator#${dependantPath}`)
  const dependantMachine = getValue(discriminator, dependantPath)

  const nodeGroups = getValue(discriminator, '/topologyMachines') || []

  const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

  const machines = nodeGroups?.map((item) => {
    const subText = `CPU: ${item.allocatable.cpu}, Memory: ${item.allocatable.memory}`
    const text = item.topologyValue
    return { text, subText, value: item.topologyValue }
  })

  const filteredMachine = machines?.filter((item, ind) =>
    minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
  )

  return dependantIndex === -1 ? machines : filteredMachine
}

function hasAnnotations({ model, getValue }, type) {
  const annotations = getValue(
    model,
    '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations',
  )
  const instance = annotations['kubernetes.io/instance-type']

  return !!instance
}

function hasNoAnnotations({ model, getValue }) {
  return !hasAnnotations({ model, getValue })
}

function onMachineChange({ model, getValue, discriminator, commit }, type) {
  const annoPath = '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations'
  const annotations = getValue(model, annoPath)
  const instance = annotations['kubernetes.io/instance-type']
  let parsedInstance = {}
  try {
    if (instance) parsedInstance = JSON.parse(instance)
  } catch (e) {
    console.log(e)
    parsedInstance = {}
  }

  const minMachine = getValue(discriminator, `/allowedMachine-${type}-min`)
  const maxMachine = getValue(discriminator, `/allowedMachine-${type}-max`)
  const minMaxMachine = `${minMachine},${maxMachine}`

  parsedInstance[type] = minMaxMachine
  const instanceString = JSON.stringify(parsedInstance)
  annotations['kubernetes.io/instance-type'] = instanceString

  const machines = getValue(discriminator, `/topologyMachines`) || []
  const minMachineObj = machines.find((item) => item.topologyValue === minMachine)
  const maxMachineObj = machines.find((item) => item.topologyValue === maxMachine)
  const minMachineAllocatable = minMachineObj?.allocatable
  const maxMachineAllocatable = maxMachineObj?.allocatable
  const allowedPath = `/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/${type}`

  if (minMachine && maxMachine && instance !== instanceString) {
    commit('wizard/model$update', {
      path: `${allowedPath}/maxAllowed`,
      value: maxMachineAllocatable,
      force: true,
    })
    commit('wizard/model$update', {
      path: `${allowedPath}/minAllowed`,
      value: minMachineAllocatable,
      force: true,
    })
    commit('wizard/model$update', {
      path: annoPath,
      value: annotations,
      force: true,
    })
  }
}

return {
  setMetadata,
  handleUnit,
  isConsole,
  getNamespaces,
  getDbs,
  isKubedb,
  getDbDetails,
  dbTypeEqualsTo,
  clearSpecModel,
  initMetadata,
  onNamespaceChange,
  ifScalingTypeEqualsTo,
  fetchNodeTopology,
  isNodeTopologySelected,
  setControlledResources,
  setTrigger,
  setApplyToIfReady,
  showOpsRequestOptions,
  setInitSchedule,
  showBackupForm,
  showScheduleBackup,
  initScheduleBackupForEdit,
  isRancherManaged,
  onInputChangeSchedule,
  getDefaultSchedule,
  initUsagePolicy,
  initBlueprint,
  getDefault,
  onInputChange,
  fetchJsons,
  disableLableChecker,
  isEqualToModelPathValue,
  getResources,
  isEqualToDiscriminatorPath,
  setValueFromModel,
  returnTrue,
  returnStringYes,
  removeCertificatesOfAliases,
  showMonitoringSection,
  onEnableMonitoringChange,
  showCustomizeExporterSection,
  onCustomizeExporterChange,
  isValueExistInModel,
  onNamespaceChange,
  onLabelChange,
  returnFalse,
  onAgentChange,
  getCreateAuthSecret,
  showExistingSecretSection,
  showPasswordSection,
  encodePassword,
  decodePassword,
  onCreateAuthSecretChange,
  setAuthSecretPassword,
  onAuthSecretPasswordChange,
  getSecrets,
  getOpsRequestUrl,
  isBindingAlreadyOn,
  addOrRemoveBinding,
  getMachines,
  setAllowedMachine,
  hasAnnotations,
  hasNoAnnotations,
  fetchTopologyMachines,
  onMachineChange,
}
