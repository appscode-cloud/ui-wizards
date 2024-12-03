// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
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
  const namespace = getValue(model, '/metadata/release/namespace')
  watchDependency('model#/metadata/release/namespace')

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

function returnTrue() {
  return true
}

function returnStringYes() {
  return 'yes'
}
function setAddressType({ model, getValue }) {
  const value = getValue(model, '/resources/kubedbComMySQL/spec/useAddressType')

  if (!value) {
    return 'DNS'
  }

  return value
}

// ************************* Basic Info **********************************************
async function getMySqlVersions({ axios, storeGet }, group, version, resource) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  }

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: queryParams,
      },
    )

    const resources = (resp && resp.data && resp.data.items) || []

    // keep only non deprecated versions
    const filteredMongoDbVersions = resources.filter((item) => item.spec && !item.spec.deprecated)

    filteredMongoDbVersions.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const specVersion = (item.spec && item.spec.version) || ''
      item.text = `${name} (${specVersion})`
      item.value = name
      return true
    })
    return filteredMongoDbVersions
  } catch (e) {
    console.log(e)
    return []
  }
}

// ********************* Database Mode ***********************
function setDatabaseMode({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, '/resources/kubedbComMySQL/spec/topology')
  watchDependency('model#/resources/kubedbComMySQL/spec/topology')

  if (modelPathValue?.mode) {
    return modelPathValue.mode
  } else {
    return 'Standalone'
  }
}

let storageClassList = []
async function getStorageClassNames({ axios, storeGet, commit, model, getValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
    {
      params: {
        filter: { items: { metadata: { name: null, annotations: null } } },
      },
    },
  )

  const resources = (resp && resp.data && resp.data.items) || []

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    item.text = name
    item.value = name
    return true
  })

  storageClassList = resources
  const initialStorageClass = getValue(
    model,
    '/resources/kubedbComMySQL/spec/storage/storageClassName',
  )
  if (!initialStorageClass) setStorageClass({ model, getValue, commit })
  return resources
}

function setStorageClass({ model, getValue, commit }) {
  const deletionPolicy = getValue(model, '/resources/kubedbComMySQL/spec/deletionPolicy') || ''
  let storageClass =
    getValue(model, '/resources/kubedbComMySQL/spec/storage/storageClassName') || ''
  const suffix = '-retain'

  const simpleClassList = storageClassList.filter((item) => {
    return !item.metadata?.name?.endsWith(suffix)
  })

  const retainClassList = storageClassList.filter((item) => {
    return item.metadata?.name?.endsWith(suffix)
  })

  const defaultSimpleList = simpleClassList.filter((item) => {
    return (
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations['storageclass.kubernetes.io/is-default-class']
    )
  })

  const defaultRetainList = retainClassList.filter((item) => {
    return (
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations['storageclass.kubernetes.io/is-default-class']
    )
  })

  if (deletionPolicy === 'WipeOut' || deletionPolicy === 'Delete') {
    if (simpleClassList.length > 1) {
      const found = defaultSimpleList.length ? defaultSimpleList[0] : simpleClassList[0]
      storageClass = found.value
    } else if (simpleClassList.length === 1) {
      storageClass = simpleClassList[0]?.value
    } else {
      const found = defaultRetainList.length
        ? defaultRetainList[0].value
        : storageClassList.length
        ? storageClassList[0].value
        : ''
      storageClass = found
    }
  } else {
    if (retainClassList.length > 1) {
      const found = defaultRetainList.length ? defaultRetainList[0] : retainClassList[0]
      storageClass = found.value
    } else if (retainClassList.length === 1) {
      storageClass = retainClassList[0]?.value
    } else {
      const found = defaultSimpleList.length
        ? defaultSimpleList[0].value
        : storageClassList.length
        ? storageClassList[0].value
        : ''
      storageClass = found
    }
  }

  if (storageClass) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/storage/storageClassName',
      value: storageClass,
      force: true,
    })
  }
}

function deleteDatabaseModePath({ discriminator, getValue, commit, model }) {
  const mode = getValue(discriminator, '/activeDatabaseMode')
  if (mode === 'GroupReplication' || mode === 'InnoDBCluster') {
    replicas = getValue(model, '/resources/kubedbComMySQL/spec/replicas')
    if (!replicas) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/spec/replicas',
        value: 3,
        force: true,
      })
    }
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/topology/mode',
      value: mode,
      force: true,
    })
    if (mode === 'GroupReplication')
      commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/topology/innoDBCluster')
    else commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/topology/group')
  } else if (mode === 'Standalone') {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/replicas',
      value: 1,
      force: true,
    })
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/topology')
  }
}

function isEqualToDatabaseMode({ getValue, watchDependency, discriminator }, value) {
  watchDependency('discriminator#/activeDatabaseMode')
  const mode = getValue(discriminator, '/activeDatabaseMode')
  return mode === value
}

function isNotEqualToDatabaseMode({ getValue, watchDependency, discriminator }, value) {
  watchDependency('discriminator#/activeDatabaseMode')
  const mode = getValue(discriminator, '/activeDatabaseMode')
  return mode !== value
}

// ************************** TLS ******************************88

function setApiGroup() {
  return 'cert-manager.io'
}

async function getIssuerRefsName({ axios, storeGet, getValue, model, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  watchDependency('model#/resources/kubedbComMySQL/spec/tls/issuerRef/apiGroup')
  watchDependency('model#/resources/kubedbComMySQL/spec/tls/issuerRef/kind')
  watchDependency('model#/metadata/release/namespace')
  const apiGroup = getValue(model, '/resources/kubedbComMySQL/spec/tls/issuerRef/apiGroup')
  const kind = getValue(model, '/resources/kubedbComMySQL/spec/tls/issuerRef/kind')
  const namespace = getValue(model, '/metadata/release/namespace')

  let url
  if (kind === 'Issuer') {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/namespaces/${namespace}/issuers`
  } else if (kind === 'ClusterIssuer') {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/clusterissuers`
  }

  if (!url) return []

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

async function hasIssuerRefName({ axios, storeGet, getValue, model, watchDependency }) {
  const resp = await getIssuerRefsName({
    axios,
    storeGet,
    getValue,
    model,
    watchDependency,
  })

  return !!(resp && resp.length)
}

async function hasNoIssuerRefName({ axios, storeGet, getValue, model, watchDependency }) {
  const resp = await hasIssuerRefName({
    axios,
    storeGet,
    getValue,
    model,
    watchDependency,
  })

  return !resp
}

function setSSLMode({ model, getValue }) {
  const val = getValue(model, '/resources/kubedbComMySQL/spec/sslMode')
  return val || 'require'
}

function showTlsConfigureSection({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/configureTLS')
  const configureStatus = getValue(discriminator, '/configureTLS')
  return configureStatus
}

function onTlsConfigureChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, '/configureTLS')
  if (configureStatus) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/tls',
      value: { issuerRef: {}, certificates: [] },
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/tls')
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/sslMode')
  }
}

function getAliasOptions() {
  return ['server', 'client', 'metrics-exporter']
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
      path: '/resources/kubedbComMySQL/spec/monitor',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/monitor')
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
      path: '/resources/kubedbComMySQL/spec/monitor/prometheus/exporter',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/monitor/prometheus/exporter')
  }
}

// ********************************* Initialization & Backup *************************************
const stashAppscodeComRestoreSession_init = {
  spec: {
    repository: {
      name: '',
    },
    rules: [
      {
        snapshots: ['latest'],
      },
    ],
    target: {
      ref: {
        apiVersion: 'appcatalog.appscode.com/v1alpha1',
        kind: 'AppBinding',
        name: '',
      },
    },
  },
}
const initScript = {
  scriptPath: '',
  secret: {
    secretName: '',
  },
}
const stashAppscodeComRepository_init_repo = {
  spec: {
    backend: {
      gcs: {
        bucket: '',
        prefix: '',
      },
      storageSecretName: '',
    },
  },
}
const stashAppscodeComRepository_repo = {
  spec: {
    backend: {
      gcs: {
        bucket: '',
        prefix: '',
      },
      storageSecretName: '',
    },
  },
}
const restoreSessionInitRunTimeSettings = {
  container: {
    resources: {
      requests: {
        cpu: '',
        memory: '',
      },
      limits: {
        cpu: '',
        memory: '',
      },
    },
    nice: {
      adjustment: null,
    },
    ionice: {
      class: null,
      classData: null,
    },
    securityContext: {
      privileged: false,
      runAsNonRoot: false,
      runAsUser: null,
      runAsGroup: null,
      seLinuxOptions: {
        level: '',
        role: '',
        type: '',
        user: '',
      },
    },
    env: [],
    envFrom: [],
  },
  pod: {
    serviceAccountName: '',
    imagePullSecrets: [],
    securityContext: {
      fsGroup: null,
      runAsNonRoot: false,
      runAsUser: null,
      runAsGroup: null,
      seLinuxOptions: {
        level: '',
        role: '',
        type: '',
        user: '',
      },
    },
  },
}

const stashAppscodeComBackupConfiguration = {
  spec: {
    repository: {
      name: '',
    },
    retentionPolicy: {
      keepLast: 5,
      name: 'keep-last-5',
      prune: true,
    },
    schedule: '*/5 * * * *',
    target: {
      ref: {
        apiVersion: 'appcatalog.appscode.com/v1alpha1',
        kind: 'AppBinding',
        name: '',
      },
    },
  },
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path)
  if (val) return true
  else return false
}

function initPrePopulateDatabase({ getValue, model }) {
  const waitForInitialRestore = getValue(
    model,
    '/resources/kubedbComMySQL/spec/init/waitForInitialRestore',
  )
  const stashAppscodeComRestoreSession_init = getValue(
    model,
    '/resources/stashAppscodeComRestoreSession_init',
  )
  const script = getValue(model, '/resources/kubedbComMySQL/spec/init/script')

  return waitForInitialRestore || !!stashAppscodeComRestoreSession_init || !!script ? 'yes' : 'no'
}

function onPrePopulateDatabaseChange({ commit, getValue, discriminator, model }) {
  const prePopulateDatabase = getValue(discriminator, '/prePopulateDatabase')
  if (prePopulateDatabase === 'no') {
    // delete related properties
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/init/waitForInitialRestore',
      value: false,
    })
    commit('wizard/model$delete', '/resources/stashAppscodeComRestoreSession_init')
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/init/script')
    commit('wizard/model$delete', '/resources/stashAppscodeComRepository_init_repo')
  } else {
    const dbName = getValue(model, '/metadata/release/name')
    // set stashAppscodeComRestoreSession_init if it doesn't exist
    if (!valueExists(model, getValue, '/resources/stashAppscodeComRestoreSession_init')) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init',
        value: stashAppscodeComRestoreSession_init,
        force: true,
      })

      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name',
        value: dbName,
        force: true,
      })
    }
  }
}

function initDataSource({ getValue, model }) {
  const script = getValue(model, '/resources/kubedbComMySQL/spec/init/script')
  const stashAppscodeComRestoreSession_init = getValue(
    model,
    '/resources/stashAppscodeComRestoreSession_init',
  )

  if (script) return 'script'
  else if (stashAppscodeComRestoreSession_init) return 'stashBackup'
  else return undefined
}

function onDataSourceChange({ commit, getValue, discriminator, model }) {
  const dataSource = getValue(discriminator, '/dataSource')

  commit('wizard/model$update', {
    path: '/resources/kubedbComMySQL/spec/init/waitForInitialRestore',
    value: dataSource === 'stashBackup',
    force: true,
  })

  if (dataSource === 'script') {
    commit('wizard/model$delete', '/resources/stashAppscodeComRestoreSession_init')

    // create a new script if there is no script property
    if (!valueExists(model, getValue, '/resources/kubedbComMySQL/spec/init/script'))
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/spec/init/script',
        value: initScript,
      })
  } else if (dataSource === 'stashBackup') {
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/init/script')

    // create a new stashAppscodeComRestoreSession_init if there is no stashAppscodeComRestoreSession_init property
    if (!valueExists(model, getValue, '/resources/stashAppscodeComRestoreSession_init')) {
      const dbName = getValue(model, '/metadata/release/name')

      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init',
        value: stashAppscodeComRestoreSession_init,
      })

      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name',
        value: dbName,
        force: true,
      })
    }
  }
}

// // for script
function initVolumeType({ getValue, model }) {
  const configMap = getValue(model, '/resources/kubedbComMySQL/spec/init/script/configMap/name')
  const secret = getValue(model, '/resources/kubedbComMySQL/spec/init/script/secret/secretName')

  if (configMap) return 'configMap'
  else if (secret) return 'secret'
  else return undefined
}

function onVolumeTypeChange({ commit, getValue, discriminator, model }) {
  const sourceVolumeType = getValue(discriminator, '/sourceVolumeType')
  if (sourceVolumeType === 'configMap') {
    // add configMap object and delete secret object
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/init/script/secret')

    if (!valueExists(model, getValue, '/resources/kubedbComMySQL/spec/init/script/configMap')) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/spec/init/script/configMap',
        value: {
          name: '',
        },
      })
    }
  } else if (sourceVolumeType === 'secret') {
    // delete configMap object and add secret object
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/init/script/configMap')

    if (!valueExists(model, getValue, '/resources/kubedbComMySQL/spec/init/script/secret')) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/spec/init/script/secret',
        value: {
          secretName: '',
        },
      })
    }
  }
}

function showInitializationForm({ getValue, discriminator, watchDependency }) {
  const prePopulateDatabase = getValue(discriminator, '/prePopulateDatabase')
  watchDependency('discriminator#/prePopulateDatabase')
  return prePopulateDatabase === 'yes'
}

function showScriptOrStashForm({ getValue, discriminator, watchDependency }, value) {
  const dataSource = getValue(discriminator, '/dataSource')
  watchDependency('discriminator#/dataSource')
  return dataSource === value
}

function showConfigMapOrSecretName({ getValue, discriminator, watchDependency }, value) {
  const sourceVolumeType = getValue(discriminator, '/sourceVolumeType')
  watchDependency('discriminator#/sourceVolumeType')
  return sourceVolumeType === value
}

// for stash backup
function initializeNamespace({ getValue, model }) {
  const namespace = getValue(model, '/metadata/release/namespace')
  return namespace
}

function showRepositorySelectOrCreate({ getValue, discriminator, watchDependency }, value) {
  const repositoryChoise = getValue(discriminator, '/repositoryChoise')
  watchDependency('discriminator#/repositoryChoise')

  return repositoryChoise === value
}

function onInitRepositoryChoiseChange({ getValue, discriminator, commit, model }) {
  const repositoryChoise = getValue(discriminator, '/repositoryChoise')
  if (repositoryChoise === 'select') {
    // delete stashAppscodeComRepository_init_repo from model
    commit('wizard/model$delete', '/resources/stashAppscodeComRepository_init_repo')
  } else if (repositoryChoise === 'create') {
    // add stashAppscodeComRepository_init_repo to model
    commit('wizard/model$update', {
      path: 'resources/stashAppscodeComRepository_init_repo',
      value: stashAppscodeComRepository_init_repo,
    })

    const repositoryName = `${getValue(model, '/metadata/release/name')}-init-repo`
    // set this name in stashAppscodeComRestoreSession_init
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComRestoreSession_init/spec/repository/name',
      value: repositoryName,
    })
  }
}

function initCustomizeRestoreJobRuntimeSettings({ getValue, model }) {
  const runtimeSettings = getValue(
    model,
    '/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings',
  )
  if (runtimeSettings) return 'yes'
  else return 'no'
}

function initCustomizeRestoreJobRuntimeSettingsForBackup({ getValue, model }) {
  const runtimeSettings = getValue(
    model,
    '/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings',
  )
  if (runtimeSettings) return 'yes'
  else return 'no'
}

function onCustomizeRestoreJobRuntimeSettingsChange({ commit, getValue, discriminator, model }) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    '/customizeRestoreJobRuntimeSettings',
  )
  if (customizeRestoreJobRuntimeSettings === 'no') {
    commit(
      'wizard/model$delete',
      '/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings',
    )
  } else if (customizeRestoreJobRuntimeSettings === 'yes') {
    if (
      !valueExists(
        model,
        getValue,
        '/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings',
      )
    ) {
      // set new value
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings',
        value: restoreSessionInitRunTimeSettings,
      })
    }
  }
}

function onCustomizeRestoreJobRuntimeSettingsChangeForBackup({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    '/customizeRestoreJobRuntimeSettings',
  )
  if (customizeRestoreJobRuntimeSettings === 'no') {
    commit(
      'wizard/model$delete',
      '/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings',
    )
  } else if (customizeRestoreJobRuntimeSettings === 'yes') {
    if (
      !valueExists(
        model,
        getValue,
        '/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings',
      )
    ) {
      // set new value
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings',
        value: {},
        force: true,
      })
    }
  }
}

function showRuntimeForm({ discriminator, getValue, watchDependency }, value) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    '/customizeRestoreJobRuntimeSettings',
  )
  watchDependency('discriminator#/customizeRestoreJobRuntimeSettings')
  return customizeRestoreJobRuntimeSettings === value
}

async function getImagePullSecrets({ getValue, model, watchDependency, axios, storeGet }) {
  const namespace = getValue(model, '/metadata/release/namespace')
  watchDependency('model#/metadata/release/namespace')

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group: 'core',
    version: 'v1',
    resource: 'secrets',
  })

  resources = resources.filter((item) => {
    const validType = ['kubernetes.io/dockerconfigjson']
    return validType.includes(item.type)
  })

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || ''
    return {
      text: name,
      value: { name: name },
    }
  })
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR Backup Configuration

// schedule bakcup

function getBackupConfigsAndAnnotations(getValue, model) {
  const stashAppscodeComBackupConfiguration = getValue(
    model,
    '/resources/stashAppscodeComBackupConfiguration',
  )
  const kubedbComMySQLAnnotations =
    getValue(model, '/resources/kubedbComMySQL/metadata/annotations') || {}

  const isBluePrint = Object.keys(kubedbComMySQLAnnotations).some(
    (k) =>
      k === 'stash.appscode.com/backup-blueprint' ||
      k === 'stash.appscode.com/schedule' ||
      k.startsWith('params.stash.appscode.com/'),
  )

  return {
    stashAppscodeComBackupConfiguration,
    isBluePrint,
  }
}

function deleteKubeDbComMySqlDbAnnotation(getValue, model, commit) {
  const annotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations') || {}
  const filteredKeyList =
    Object.keys(annotations).filter(
      (k) =>
        k !== 'stash.appscode.com/backup-blueprint' &&
        k !== 'stash.appscode.com/schedule' &&
        !k.startsWith('params.stash.appscode.com/'),
    ) || []
  const filteredAnnotations = {}
  filteredKeyList.forEach((k) => {
    filteredAnnotations[k] = annotations[k]
  })
  commit('wizard/model$update', {
    path: '/resources/kubedbComMySQL/metadata/annotations',
    value: filteredAnnotations,
  })
}

function addKubeDbComMySqlDbAnnotation(getValue, model, commit, key, value, force) {
  const annotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations') || {}

  if (annotations[key] === undefined) {
    annotations[key] = value
  } else if (force) {
    annotations[key] = value
  }

  commit('wizard/model$update', {
    path: '/resources/kubedbComMySQL/metadata/annotations',
    value: annotations,
    force: true,
  })
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

function initScheduleBackup({ getValue, model }) {
  const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
    getValue,
    model,
  )

  if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
  else return 'no'
}

function onScheduleBackupChange({ commit, getValue, discriminator, model }) {
  const scheduleBackup = getValue(discriminator, '/scheduleBackup')

  if (scheduleBackup === 'no') {
    // delete stashAppscodeComBackupConfiguration
    commit('wizard/model$delete', '/resources/stashAppscodeComBackupConfiguration')
    commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
    // delete annotation from kubedbComMySQL annotation
    deleteKubeDbComMySqlDbAnnotation(getValue, model, commit)
  } else {
    const { isBluePrint } = getBackupConfigsAndAnnotations(getValue, model)

    // create stashAppscodeComBackupConfiguration and initialize it if not exists

    const dbName = getValue(model, '/metadata/release/name')

    if (
      !valueExists(model, getValue, '/resources/stashAppscodeComBackupConfiguration') &&
      !isBluePrint
    ) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration',
        value: stashAppscodeComBackupConfiguration,
      })
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name',
        value: dbName,
        force: true,
      })
    }
  }
}

// backup form
let initialModel = {}
let isBackupOn = false
let dbResource = {}
let namespaceList = []

function showBackupForm({ getValue, discriminator, watchDependency }) {
  const scheduleBackup = getValue(discriminator, '/scheduleBackup')
  watchDependency('discriminator#/scheduleBackup')

  if (scheduleBackup === 'yes') return true
  else return false
}

function onBackupChange({ discriminator, getValue, commit, model }) {
  const isBackupToggled = getValue(discriminator, '/backupEnabled')
  if (!isBackupToggled) {
    commit('wizard/model$delete', '/resources/coreKubestashComBackupConfiguration')
    commit('wizard/model$delete', '/resources/coreKubestashComBackupBlueprint')

    const annotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations') || {}
    if (
      annotations['blueprint.kubestash.com/name'] &&
      annotations['blueprint.kubestash.com/namespace']
    ) {
      delete annotations['blueprint.kubestash.com/name']
      delete annotations['blueprint.kubestash.com/namespace']
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/metadata/annotations',
        value: annotations,
        force: true,
      })
    }
  }
}

function isBackupToggled({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/backupEnabled')
  return (isBackupToggled = getValue(discriminator, '/backupEnabled'))
}

async function setBackupSwitch({ commit, storeGet, axios, getValue, model }) {
  // set initial model for further usage
  initialModel = getValue(model, '/resources/coreKubestashComBackupConfiguration')

  // check db backup is enabled or not
  const backupConfigurationsFromStore = storeGet('/backup/backupConfigurations')
  const { name, cluster, user, group } = storeGet('/route/params')
  const namespace = storeGet('/route/query/namespace')
  const kind = storeGet('/resource/layout/result/resource/kind')

  // check config with metadata name first
  let config = backupConfigurationsFromStore?.find(
    (item) =>
      item.metadata.name === name &&
      item.spec?.target?.name === name &&
      item.spec?.target?.namespace === namespace &&
      item.spec?.target?.kind === kind &&
      item.spec?.target?.apiGroup === group,
  )

  // check config without metadata name if not found with metadata name
  if (!config)
    config = backupConfigurationsFromStore?.find(
      (item) =>
        item.spec?.target?.name === name &&
        item.spec?.target?.namespace === namespace &&
        item.spec?.target?.kind === kind &&
        item.spec?.target?.apiGroup === group,
    )
  if (config) initialModel = config

  // set backup switch here
  isBackupOn = !!config

  // call model to get the model when backup is disabled
  if (!isBackupOn) {
    commit('wizard/model$delete', '/resources/coreKubestashComBackupConfiguration')
    commit('wizard/model$delete', '/resources/coreKubestashComBackupBlueprint')
    commit('wizard/model$update', {
      path: '/metadata/release',
      value: { name, namespace },
      force: true,
    })

    try {
      const resource = storeGet('/resource/layout/result/resource')
      const resp = await axios.put(`/clusters/${user}/${cluster}/helm/editor/model`, {
        metadata: {
          release: {
            name,
            namespace,
          },
          resource,
        },
      })
      dbResource = resp.data?.resources?.kubedbComMySQL
    } catch (e) {
      console.log(e)
    }
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL',
      value: dbResource,
      force: true,
    })

    // set initial data from stash-presets when backup is disabled
    const stashPreset = storeGet('/backup/stashPresets')
    if (stashPreset) {
      const { retentionPolicy, encryptionSecret, schedule, storageRef } = stashPreset

      const tempBackends = initialModel.spec?.backends
      tempBackends[0]['storageRef'] = storageRef
      tempBackends[0]['retentionPolicy'] = retentionPolicy
      initialModel.spec['backends'] = tempBackends

      const tempSessions = initialModel.spec?.sessions
      const tempRepositories = initialModel.spec?.sessions[0]?.repositories
      tempRepositories[0]['encryptionSecret'] = encryptionSecret
      tempRepositories[0].name = name
      tempRepositories[0]['directory'] = `${namespace}/${name}`

      tempSessions[0]['repositories'] = tempRepositories
      tempSessions[0]['scheduler']['schedule'] = schedule
      initialModel.spec['sessions'] = tempSessions
    }

    const apiGroup = storeGet('/route/params/group')
    initialModel.spec['target'] = { name, namespace, apiGroup, kind }
    const labels = dbResource.metadata?.labels
    initialModel['metadata'] = { name, namespace, labels }
  } else dbResource = getValue(model, '/resources/kubedbComMySQL')

  // call namespace for optimization
  namespaceList = await fetchNamespaces({ axios, storeGet })
  return !!isBackupOn
}

function getNamespaceArray() {
  return namespaceList
}

// invoker form
function initBackupInvoker() {
  return 'backupConfiguration'
}

function onBackupInvokerChange({ getValue, discriminator, commit, model, storeGet }) {
  const kind = storeGet('/resource/layout/result/resource/kind')
  const backupInvoker = getValue(discriminator, '/backupInvoker')
  const annotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations')

  // get name namespace labels to set in db resource when backup is not enabled initially

  if (backupInvoker === 'backupConfiguration') {
    commit('wizard/model$update', {
      path: '/resources/coreKubestashComBackupConfiguration',
      value: initialModel,
      force: true,
    })

    if (
      !dbResource.metadata?.annotations?.['blueprint.kubestash.com/name'] &&
      !dbResource.metadata?.annotations?.['blueprint.kubestash.com/namespace']
    ) {
      delete annotations['blueprint.kubestash.com/name']
      delete annotations['blueprint.kubestash.com/namespace']
      commit('wizard/model$update', {
        path: '/resources/kubedbComMySQL/metadata/annotations',
        value: annotations,
        force: true,
      })
    }
  } else if (backupInvoker === 'backupBlueprint') {
    if (!isBackupOn) {
      commit('wizard/model$delete', '/resources/coreKubestashComBackupConfiguration')
    }
    annotations['blueprint.kubestash.com/name'] = `${kind.toLowerCase()}-blueprint`
    annotations['blueprint.kubestash.com/namespace'] = 'kubedb'
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/metadata/annotations',
      value: annotations,
      force: true,
    })
  }
}

function showInvokerForm({ getValue, discriminator, watchDependency }, value) {
  const backupInvoker = getValue(discriminator, '/backupInvoker')
  watchDependency('discriminator#/backupInvoker')

  return backupInvoker === value
}

// backup configuration form
function initalizeTargetReferenceName({ getValue, model, watchDependency }) {
  const databaseName = getValue(model, '/metadata/release/name')
  watchDependency('model#/metadata/release/name')

  return databaseName
}

// restore session repository
function setInitialRestoreSessionRepo({ getValue, model }) {
  const value = getValue(model, 'resources/stashAppscodeComRepository_init_repo')
  return value ? 'create' : 'select'
}

// backup config repository
function initRepositoryChoise({ getValue, model }) {
  const stashAppscodeComRepository_repo = getValue(
    model,
    '/resources/stashAppscodeComRepository_repo',
  )

  if (stashAppscodeComRepository_repo) return 'create'
  else return 'select'
}

function initRepositoryChoiseForEdit({ getValue, model, setDiscriminatorValue }) {
  const stashAppscodeComRepository_repo = getValue(
    model,
    '/resources/stashAppscodeComRepository_repo',
  )
  const repoInitialSelectionStatus = stashAppscodeComRepository_repo ? 'yes' : 'no'
  setDiscriminatorValue('/repoInitialSelectionStatus', repoInitialSelectionStatus)

  return repoInitialSelectionStatus
}

function onRepositoryChoiseChange({ getValue, discriminator, watchDependency, commit, model }) {
  const repositoryChoise = getValue(discriminator, '/repositoryChoise')
  watchDependency('discriminator#/repositoryChoise')

  if (repositoryChoise === 'select') {
    // delete the stashAppscodeComRepository_repo
    commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
  } else if (repositoryChoise === 'create') {
    // create new stashAppscodeComRepository_repo
    if (!valueExists(model, getValue, '/resources/stashAppscodeComRepository_repo')) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRepository_repo',
        value: stashAppscodeComRepository_repo,
      })
      const repositoryName = `${getValue(model, '/metadata/release/name')}-repo`
      // set this name in stashAppscodeComRestoreSession_init
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
        value: repositoryName,
      })
    }
  }
}

function onRepositoryNameChange({ getValue, model, commit }) {
  const repositoryName = getValue(model, 'resources/stashAppscodeComRepository_repo/metadata/name')
  // set this name in stashAppscodeComRestoreSession_init
  commit('wizard/model$update', {
    path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
    value: repositoryName,
  })
}

// backup blueprint form
function getMongoAnnotations(getValue, model) {
  const annotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations')
  return { ...annotations } || {}
}

function initFromAnnotationValue({ getValue, model }, key) {
  const annotations = getMongoAnnotations(getValue, model)
  return annotations[key]
}

function onBackupBlueprintNameChange({ getValue, discriminator, commit, model }) {
  const backupBlueprintName = getValue(discriminator, '/backupBlueprintName')
  addKubeDbComMySqlDbAnnotation(
    getValue,
    model,
    commit,
    'stash.appscode.com/backup-blueprint',
    backupBlueprintName,
    true,
  )
}

function onBackupBlueprintScheduleChange({ getValue, discriminator, commit, model }) {
  const backupBlueprintSchedule = getValue(discriminator, '/schedule')
  addKubeDbComMySqlDbAnnotation(
    getValue,
    model,
    commit,
    'stash.appscode.com/schedule',
    backupBlueprintSchedule,
    true,
  )
}

function initFromAnnotationKeyValue({ getValue, model }, prefix) {
  const annotations = getMongoAnnotations(getValue, model)
  const newOb = {}
  Object.keys(annotations).forEach((key) => {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, '')
      newOb[newKey] = annotations[key]
    }
  })
  return newOb
}

function onTaskParametersChange({ getValue, discriminator, model, commit }) {
  const taskParameters = getValue(discriminator, '/taskParameters')

  const taskParamterKeys = Object.keys(taskParameters).map(
    (tp) => `params.stash.appscode.com/${tp}`,
  )
  const oldAnnotations = getValue(model, '/resources/kubedbComMySQL/metadata/annotations') || {}
  const newAnnotations = {}

  const filteredAnnotationKeys = Object.keys(oldAnnotations).filter(
    (key) => !taskParamterKeys.includes(key) && !key.startsWith('params.stash.appscode.com/'),
  )

  filteredAnnotationKeys.forEach((key) => {
    newAnnotations[key] = oldAnnotations[key]
  })

  Object.keys(taskParameters).forEach((tpk) => {
    newAnnotations[`params.stash.appscode.com/${tpk}`] = taskParameters[tpk]
  })

  commit('wizard/model$update', {
    path: '/resources/kubedbComMySQL/metadata/annotations',
    value: newAnnotations,
  })
}

function isValueExistInModel({ model, getValue }, path) {
  const modelValue = getValue(model, path)
  return !!modelValue
}

function onNamespaceChange({ commit, model, getValue }) {
  const namespace = getValue(model, '/metadata/release/namespace')
  const agent = getValue(model, '/resources/kubedbComMySQL/spec/monitor/agent')
  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
      value: [namespace],
      force: true,
    })
  }
}

function onLabelChange({ commit, model, getValue }) {
  const labels = getValue(model, '/resources/kubedbComMySQL/spec/metadata/labels')

  const agent = getValue(model, '/resources/kubedbComMySQL/spec/monitor/agent')

  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
      value: labels,
      force: true,
    })
  }
}

function onNameChange({ commit, model, getValue }) {
  const dbName = getValue(model, '/metadata/release/name')

  const agent = getValue(model, '/resources/kubedbComMySQL/spec/monitor/agent')

  const labels = getValue(model, '/resources/kubedbComMySQL/spec/metadata/labels')

  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
      value: labels,
      force: true,
    })
  }

  const scheduleBackup = getValue(model, '/resources/stashAppscodeComBackupConfiguration')

  if (scheduleBackup) {
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name',
      value: dbName,
      force: true,
    })
    const creatingNewRepo = getValue(model, '/resources/stashAppscodeComRepository_repo')
    if (creatingNewRepo) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
        value: `${dbName}-repo`,
        force: true,
      })
    }
  }

  const prePopulateDatabase = getValue(model, '/resources/stashAppscodeComRestoreSession_init')

  if (prePopulateDatabase) {
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name',
      value: dbName,
      force: true,
    })
    const creatingNewRepo = getValue(model, '/resources/stashAppscodeComRepository_init_repo')
    if (creatingNewRepo) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init/spec/repository/name',
        value: `${dbName}-init-repo`,
        force: true,
      })
    }
  }

  // to reset configSecret name field
  const hasSecretConfig = getValue(model, '/resources/secret_config')
  if (hasSecretConfig) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/configSecret/name',
      value: `${dbName}-config`,
      force: true,
    })
  }
}

function returnFalse() {
  return false
}

function onAgentChange({ commit, model, getValue }) {
  const agent = getValue(model, '/resources/kubedbComMySQL/spec/monitor/agent')
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

/*************************************  Database Secret Section ********************************************/

function getCreateAuthSecret({ model, getValue }) {
  const authSecret = getValue(model, '/resources/kubedbComMySQL/spec/authSecret')

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

function setAuthSecretPassword({ model, getValue }) {
  const encodedPassword = getValue(model, '/resources/secret_auth/data/password')
  return encodedPassword ? decodePassword({}, encodedPassword) : ''
}

function onAuthSecretPasswordChange({ getValue, discriminator, commit }) {
  const stringPassword = getValue(discriminator, '/password')

  if (stringPassword) {
    commit('wizard/model$update', {
      path: '/resources/secret_auth/data/password',
      value: encodePassword({}, stringPassword),
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/secret_auth/data/username',
      value: encodePassword({}, 'root'),
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/secret_auth')
  }
}

function disableInitializationSection({ model, getValue, watchDependency }) {
  const initialized = getValue(model, '/resources/kubedbComMySQL/spec/init/initialized')
  watchDependency('model#/resources/kubedbComMySQL/spec/init/initialized')
  return !!initialized
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
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/authSecret')
  } else if (createAuthSecret === false) {
    commit('wizard/model$delete', '/resources/secret_auth')
  }
}

async function getSecrets({ storeGet, axios, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/release/namespace')
  watchDependency('model#/metadata/release/namespace')

  if (owner && cluster && namespace) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        {
          params: {
            filter: {
              items: {
                data: { username: null, password: null },
                metadata: { name: null },
                type: null,
              },
            },
          },
        },
      )

      const secrets = (resp && resp.data && resp.data.items) || []

      const filteredSecrets = secrets.filter((item) => {
        const validType = [
          'kubernetes.io/service-account-token',
          'Opaque',
          'kubernetes.io/basic-auth',
        ]
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
    }
  }
  return []
}

//////////////////// custom config /////////////////
function onConfigurationSourceChange({ getValue, discriminator, commit, model }) {
  const configurationSource = getValue(discriminator, '/configurationSource')
  if (configurationSource === 'use-existing-config') {
    commit('wizard/model$delete', '/resources/secret_config')
  } else {
    const value = getValue(model, '/resources/secret_config')
    if (!value) {
      commit('wizard/model$update', {
        path: '/resources/secret_config',
        value: {},
        force: true,
      })
    }
    const configSecretName = `${getValue(model, '/metadata/release/name')}-config`
    commit('wizard/model$update', {
      path: '/resources/kubedbComMySQL/spec/configSecret/name',
      value: configSecretName,
      force: true,
    })
  }
}

function onConfigurationChange({ getValue, commit, discriminator, model }) {
  const value = getValue(discriminator, '/configuration')
  commit('wizard/model$update', {
    path: '/resources/secret_config/stringData/my-config.cnf',
    value: value,
    force: true,
  })
  const configSecretName = `${getValue(model, '/metadata/release/name')}-config`
  commit('wizard/model$update', {
    path: '/resources/kubedbComMySQL/spec/configSecret/name',
    value: configSecretName,
    force: true,
  })
}

function setConfigurationSource({ model, getValue }) {
  const modelValue = getValue(model, '/resources/secret_config')
  if (modelValue) {
    return 'create-new-config'
  }
  return 'use-existing-config'
}

function setSecretConfigNamespace({ getValue, model, watchDependency }) {
  watchDependency('model#/metadata/release/namespace')
  const namespace = getValue(model, '/metadata/release/namespace')
  return namespace
}

function setConfiguration({ model, getValue }) {
  return getValue(model, '/resources/secret_config/stringData/my-config.cnf')
}

function setConfigurationFiles({ model, getValue }) {
  const value = getValue(model, '/resources/secret_config/data/my-config.cnf')
  return atob(value)
}

function onSetCustomConfigChange({ discriminator, getValue, commit }) {
  const value = getValue(discriminator, '/setCustomConfig')

  if (value === 'no') {
    commit('wizard/model$delete', '/resources/kubedbComMySQL/spec/configSecret')
    commit('wizard/model$delete', '/resources/secret_config')
  }
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
  const pathPrefix = `${domain}${routeRootPath}`

  if (mode === 'standalone-step')
    return `${pathPrefix}?namespace=${namespace}&applyAction=create-opsrequest-${reqType.toLowerCase()}`
  else
    return `${domain}/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/mysqlopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
}

function getCreateNameSpaceUrl({ model, getValue, storeGet }) {
  const user = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const domain = storeGet('/domain') || ''
  if (domain.includes('bb.test')) {
    return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  } else {
    const editedDomain = domain.replace('kubedb', 'console')
    return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  }
}

function isVariantAvailable({ storeGet }) {
  const variant = storeGet('/route/query/variant')
  return variant ? true : false
}

function showScheduleBackup({ storeGet }) {
  const operationQuery = storeGet('/route/query/operation') || ''
  const isBackupOperation = operationQuery === 'edit-self-backupconfiguration' ? true : false
  return !isBackupOperation
}

function showBackupOptions({ discriminator, getValue, watchDependency }, backup) {
  const backupEnabled = getValue(discriminator, '/backupEnabled')
  if (backupEnabled) {
    if (backup === 'alert') return true
    else return false
  } else {
    if (backup === 'alert') return false
    else return true
  }
}

function isBlueprintOption({ discriminator, getValue, watchDependency }, value) {
  watchDependency('discriminator#/blueprintOptions')
  const blueprintOptions = getValue(discriminator, '/blueprintOptions')
  return blueprintOptions === value
}

function ifUsagePolicy({ discriminator, getValue, watchDependency, model }, value) {
  watchDependency(
    'model#/resources/coreKubestashComBackupBlueprint/spec/usagePolicy/allowedNamespaces/from/default',
  )
  const usagePolicy = getValue(
    model,
    '/resources/coreKubestashComBackupBlueprint/spec/usagePolicy/allowedNamespaces/from/default',
  )
  return usagePolicy === value
}

async function getBlueprints({ getValue, model, setDiscriminatorValue, axios, storeGet }, backup) {
  const username = storeGet('/route/params/user')
  const clusterName = storeGet('/route/params/cluster')
  const url = `clusters/${username}/${clusterName}/proxy/core.kubestash.com/v1alpha1/backupblueprints`

  try {
    const resp = await axios.get(url)
    let data = resp.data.items
    return data
  } catch (e) {
    console.log(e)
  }
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

async function fetchNamespaces({ axios, storeGet }) {
  const username = storeGet('/route/params/user')
  const clusterName = storeGet('/route/params/cluster')
  const group = storeGet('/route/params/group')
  const version = storeGet('/route/params/version')
  const resource = storeGet('/route/params/resource')

  const url = `clusters/${username}/${clusterName}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`

  try {
    const resp = await axios.post(url, {
      _recurringCall: false,
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
    })
    if (resp.data?.status?.projects) {
      const projects = resp.data?.status?.projects
      let projectsNamespace = []
      projectsNamespace = Object.keys(projects).map((project) => ({
        project: project,
        namespaces: projects[project].map((namespace) => ({
          text: namespace,
          value: namespace,
        })),
      }))
      return projectsNamespace
    } else {
      return resp.data?.status?.namespaces || []
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

async function fetchNames(
  { getValue, axios, storeGet, watchDependency, discriminator },
  version,
  type,
  discriminatorName,
) {
  watchDependency(`discriminator#/${discriminatorName}`)
  const username = storeGet('/route/params/user')
  const clusterName = storeGet('/route/params/cluster')
  const namespace = getValue(discriminator, `${discriminatorName}`)
  const url =
    type !== 'secrets'
      ? `clusters/${username}/${clusterName}/proxy/storage.kubestash.com/${version}/namespaces/${namespace}/${type}`
      : `clusters/${username}/${clusterName}/proxy/core/${version}/namespaces/${namespace}/${type}`
  try {
    if (namespace) {
      const resp = await axios.get(url)
      let data = resp.data.items
      if (type === 'secrets') data = data.filter((ele) => !!ele.data['RESTIC_PASSWORD'])
      data = data.map((ele) => ele.metadata.name)
      return data
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

function initBlueprint() {
  return 'create'
}

function initUsagePolicy() {
  return 'Same'
}

function onInputChange(
  { getValue, discriminator, watchDependency, commit, model },
  modelPath,
  field,
  subfield,
  discriminatorName,
) {
  const value = getValue(discriminator, `/${discriminatorName}`)
  const backends = getValue(model, modelPath) || []
  if (field !== 'encryptionSecret') backends[0][field][subfield] = value
  else backends[0]['repositories'][0][field][subfield] = value
  commit('wizard/model$update', {
    path: modelPath,
    value: backends,
  })
}
function setFileValueFromStash({ getValue, commit, model }, modelPath, field, subfield, value) {
  const backends = getValue(model, modelPath)
  if (field !== 'encryptionSecret') backends[0][field][subfield] = value
  else backends[0]['repositories'][0][field][subfield] = value
  commit('wizard/model$update', {
    path: modelPath,
    value: backends,
  })
}

function onInputChangeSchedule(
  { getValue, discriminator, commit, model },
  modelPath,
  discriminatorName,
) {
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

function getDefaultSchedule({ getValue, model }, modelPath) {
  const session = getValue(model, modelPath)
  return session[0].scheduler.schedule
}

//////////////////// Auto Scaler /////////////////
let autoscaleType = ''
let dbDetails = {}

function isConsole({ storeGet, commit }) {
  const isKube = isKubedb({ storeGet })

  if (isKube) {
    const dbName = storeGet('/route/query/name') || ''
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name',
      value: dbName,
      force: true,
    })
    const operation = storeGet('/route/query/operation') || ''
    if (operation.length) {
      const splitOp = operation.split('-')
      if (splitOp.length > 2) autoscaleType = splitOp[2]
    }
    const date = Math.floor(Date.now() / 1000)
    const modifiedName = `${dbName}-${date}-autoscaling-${autoscaleType}`
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMySQLAutoscaler/metadata/name',
      value: modifiedName,
      force: true,
    })
    const namespace = storeGet('/route/query/namespace') || ''
    if (namespace) {
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMySQLAutoscaler/metadata/namespace',
        value: namespace,
        force: true,
      })
    }
  }

  return !isKube
}

function isKubedb({ storeGet }) {
  return !!storeGet('/route/query/operation')
}

function showOpsRequestOptions({ model, getValue, watchDependency, storeGet, discriminator }) {
  if (isKubedb({ storeGet }) === true) return true
  watchDependency('model#/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name')
  watchDependency('discriminator#/autoscalingType')
  return (
    !!getValue(model, '/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name') &&
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

async function getMysqlDbs({ axios, storeGet, model, getValue, watchDependency }) {
  watchDependency('model#/resources/autoscalingKubedbComMySQLAutoscaler/metadata/namespace')
  const namespace = getValue(
    model,
    '/resources/autoscalingKubedbComMySQLAutoscaler/metadata/namespace',
  )
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mysqls`,
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

function initMetadata({ getValue, discriminator, model, commit, storeGet }) {
  const dbName =
    getValue(model, '/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name') || ''
  const type = getValue(discriminator, '/autoscalingType') || ''
  const date = Math.floor(Date.now() / 1000)
  const resource = storeGet('/route/params/resource')
  const scalingName = dbName ? dbName : resource
  const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
  if (modifiedName)
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMySQLAutoscaler/metadata/name',
      value: modifiedName,
      force: true,
    })

  // delete the other type object from vuex wizard model
  if (type === 'compute')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComMySQLAutoscaler/spec/storage')
  if (type === 'storage')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComMySQLAutoscaler/spec/compute')
}

function onNamespaceChange({ model, getValue, commit }) {
  const namespace = getValue(
    model,
    '/resources/autoscalingKubedbComMySQLAutoscaler/metadata/namespace',
  )
  if (!namespace) {
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name',
    )
  }
}

function ifScalingTypeEqualsTo(
  { storeGet, watchDependency, getValue, discriminator, model },
  type,
) {
  watchDependency('discriminator#/autoscalingType')
  watchDependency('model#/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name')

  const operation = storeGet('/route/query/operation') || ''
  if (operation.length) {
    const splitOp = operation.split('-')
    if (splitOp.length > 2) autoscaleType = splitOp[2]
  } else autoscaleType = getValue(discriminator, '/autoscalingType') || ''
  const isDatabaseSelected = !!getValue(
    model,
    '/resources/autoscalingKubedbComMySQLAutoscaler/spec/databaseRef/name',
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
    'model#/resources/autoscalingKubedbComMySQLAutoscaler/spec/compute/nodeTopology/name',
  )
  const nodeTopologyName =
    getValue(
      model,
      '/resources/autoscalingKubedbComMySQLAutoscaler/spec/compute/nodeTopology/name',
    ) || ''
  return !!nodeTopologyName.length
}

function setControlledResources({ commit }, type) {
  const list = ['cpu', 'memory']
  const path = `/resources/autoscalingKubedbComMySQLAutoscaler/spec/compute/${type}/controlledResources`
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

return {
  handleUnit,
  isConsole,
  getNamespaces,
  getMysqlDbs,
  isKubedb,
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
  fetchNames,
  fetchNamespaces,
  isRancherManaged,
  onInputChangeSchedule,
  getDefaultSchedule,
  getBlueprints,
  ifUsagePolicy,
  initUsagePolicy,
  isBlueprintOption,
  initBlueprint,
  getDefault,
  onInputChange,
  showBackupOptions,
  showScheduleBackup,
  isVariantAvailable,
  fetchJsons,
  disableLableChecker,
  isEqualToModelPathValue,
  getResources,
  isEqualToDiscriminatorPath,
  setValueFromModel,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  returnTrue,
  returnStringYes,
  setAddressType,
  getMySqlVersions,
  setDatabaseMode,
  getStorageClassNames,
  deleteDatabaseModePath,
  isEqualToDatabaseMode,
  isNotEqualToDatabaseMode,
  setApiGroup,
  getIssuerRefsName,
  hasIssuerRefName,
  hasNoIssuerRefName,
  setSSLMode,
  showTlsConfigureSection,
  onTlsConfigureChange,
  getAliasOptions,
  showMonitoringSection,
  onEnableMonitoringChange,
  showCustomizeExporterSection,
  onCustomizeExporterChange,
  valueExists,
  initPrePopulateDatabase,
  onPrePopulateDatabaseChange,
  initDataSource,
  onDataSourceChange,
  initVolumeType,
  onVolumeTypeChange,
  showInitializationForm,
  showScriptOrStashForm,
  showConfigMapOrSecretName,
  initializeNamespace,
  showRepositorySelectOrCreate,
  onInitRepositoryChoiseChange,
  initCustomizeRestoreJobRuntimeSettings,
  initCustomizeRestoreJobRuntimeSettingsForBackup,
  onCustomizeRestoreJobRuntimeSettingsChange,
  onCustomizeRestoreJobRuntimeSettingsChangeForBackup,
  showRuntimeForm,
  getImagePullSecrets,
  getBackupConfigsAndAnnotations,
  deleteKubeDbComMySqlDbAnnotation,
  addKubeDbComMySqlDbAnnotation,
  initScheduleBackup,
  initScheduleBackupForEdit,
  onScheduleBackupChange,
  showBackupForm,
  initBackupInvoker,
  onBackupInvokerChange,
  showInvokerForm,
  initalizeTargetReferenceName,
  setInitialRestoreSessionRepo,
  initRepositoryChoise,
  initRepositoryChoiseForEdit,
  onRepositoryChoiseChange,
  onRepositoryNameChange,
  getMongoAnnotations,
  initFromAnnotationValue,
  onBackupBlueprintNameChange,
  onBackupBlueprintScheduleChange,
  initFromAnnotationKeyValue,
  onTaskParametersChange,
  isValueExistInModel,
  onNamespaceChange,
  onLabelChange,
  onNameChange,
  returnFalse,
  onAgentChange,
  getCreateAuthSecret,
  showExistingSecretSection,
  showPasswordSection,
  setAuthSecretPassword,
  onAuthSecretPasswordChange,
  disableInitializationSection,
  encodePassword,
  decodePassword,
  onCreateAuthSecretChange,
  getSecrets,
  onConfigurationSourceChange,
  onConfigurationChange,
  setConfigurationSource,
  setSecretConfigNamespace,
  setConfiguration,
  setConfigurationFiles,
  onSetCustomConfigChange,
  getOpsRequestUrl,
  getCreateNameSpaceUrl,
  setStorageClass,

  isBackupToggled,
  onBackupChange,
  setBackupSwitch,
  getNamespaceArray,
}
