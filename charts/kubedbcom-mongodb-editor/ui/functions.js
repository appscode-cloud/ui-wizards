const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('repoInitialSelectionStatus', '')
  setDiscriminatorValue('scheduleBackup', 'yes')
  setDiscriminatorValue('backupType', '')
  setDiscriminatorValue('isBackupDataLoaded', false)
  setDiscriminatorValue('backupConfigContext', '')
  setDiscriminatorValue('config', '')
  setDiscriminatorValue('paused', false)
  setDiscriminatorValue('schedule', '')
  setDiscriminatorValue('blueprintEnabled', false)
  setDiscriminatorValue('archiverEnabled', false)

  setDiscriminatorValue('binding', false)
  setDiscriminatorValue('hidePreviewFromWizard', undefined)

  setDiscriminatorValue('/enableMonitoring', true)
  setDiscriminatorValue('/customizeExporter', true)
  setDiscriminatorValue('/valueFromType', 'input')

  // Compute Autoscaler Discriminators
  setDiscriminatorValue('/dbDetails', false)
  setDiscriminatorValue('/topologyMachines', [])
  setDiscriminatorValue('/allowedMachine-standalone-min', '')
  setDiscriminatorValue('/allowedMachine-standalone-max', '')
  setDiscriminatorValue('/allowedMachine-replicaSet-min', '')
  setDiscriminatorValue('/allowedMachine-replicaSet-max', '')
  setDiscriminatorValue('/allowedMachine-shard-min', '')
  setDiscriminatorValue('/allowedMachine-shard-max', '')
  setDiscriminatorValue('/allowedMachine-configServer-min', '')
  setDiscriminatorValue('/allowedMachine-configServer-max', '')
  setDiscriminatorValue('/allowedMachine-mongos-min', '')
  setDiscriminatorValue('/allowedMachine-mongos-max', '')

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

  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    // watchDependency('model#' + modelPath)
    return modelPathValue === value
  }

  async function getResources(group, version, resource) {
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

  function isConfigMapTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.configMapKeyRef)
  }

  function isSecretTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.secretKeyRef)
  }

  function isInputTypeValueFrom() {
    return !isConfigMapTypeValueFrom() && !isSecretTypeValueFrom()
  }

  function onValueFromChange() {
    const valueFrom = getValue(discriminator, '/valueFromType')
    if (valueFrom === 'input') {
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
    } else if (valueFrom === 'secret') {
      if (!isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: false,
        })
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
    } else if (valueFrom === 'configMap') {
      if (!isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: false,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
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

  function isEqualToValueFromType(value) {
    //watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
  }

  // function isEqualToValueFromType(index, value) {
  //   //watchDependency('discriminator#/valueFromType')
  //   // const valueFrom = getValue(discriminator, '/valueFromType')
  //   const valueFrom = getValue(
  //     model,
  //     '/resources/kubedbComMongoDB/spec/monitor/prometheus/exporter/env',
  //   )
  //   return valueFrom[index].valueFromType === value
  // }

  function isNotShardModeSelected({ model, getValue, watchDependency }) {
    watchDependency('model#/resources/kubedbComMongoDB/spec')
    const hasShardTopology = getValue(model, '/resources/kubedbComMongoDB/spec/shardTopology')
    return !hasShardTopology
  }

  function isShardModeSelected({ model, getValue, watchDependency, commit }) {
    const resp = !isNotShardModeSelected({ model, getValue, watchDependency })
    if (resp) {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/configSecret')
      commit('wizard/model$delete', '/resources/secret_config')
    }
    return resp
  }

  async function getNamespacedResourceList(
    axios,
    storeGet,
    { namespace, group, version, resource },
  ) {
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

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

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

  // ************************* Basic Info **********************************************
  async function getMongoDbVersions({ axios, storeGet }, group, version, resource) {
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

  // ************************* Auth Secret Field ******************************************
  function showAuthPasswordField({ model, getValue, watchDependency }) {
    watchDependency('model#/resources')
    const modelPathValue = getValue(model, '/resources')
    return !!(
      modelPathValue &&
      modelPathValue.secret &&
      modelPathValue.secret.metadata &&
      modelPathValue.secret.metadata.name &&
      !showAuthSecretField({ model, getValue, watchDependency })
    )
  }

  function showAuthSecretField({ model, getValue, watchDependency }) {
    watchDependency('model#/resources/kubedbComMongoDB/spec')
    const modelPathValue = getValue(model, '/resources/kubedbComMongoDB/spec')
    return !!(modelPathValue && modelPathValue.authSecret && modelPathValue.authSecret.name)
  }

  function showNewSecretCreateField({ model, getValue, watchDependency, commit }) {
    const resp =
      !showAuthSecretField({ model, getValue, watchDependency }) &&
      !showAuthPasswordField({ model, getValue, watchDependency })
    const secret = getValue(model, '/resources/secret_auth')
    if (resp && !secret) {
      commit('wizard/model$update', {
        path: '/resources/secret_auth',
        value: {
          data: {
            password: '',
          },
        },
        force: true,
      })
    }
    return resp
  }

  // ********************* Database Mode ***********************
  function isNotStandaloneMode({ discriminator, getValue, watchDependency }) {
    watchDependency('discriminator#/activeDatabaseMode')
    const mode = getValue(discriminator, '/activeDatabaseMode')
    return mode !== 'Standalone'
  }

  function showCommonStorageClassAndSizeField({ discriminator, getValue, watchDependency }) {
    watchDependency('discriminator#/activeDatabaseMode')
    const mode = getValue(discriminator, '/activeDatabaseMode')
    const validType = ['Standalone', 'Replicaset']
    return validType.includes(mode)
  }
  function setDatabaseMode({ model, getValue, watchDependency }) {
    const modelPathValue = getValue(model, '/resources/kubedbComMongoDB/spec')

    watchDependency('model#/resources/kubedbComMongoDB/spec')
    if (modelPathValue.shardTopology) {
      return 'Sharded'
    } else if (modelPathValue.replicaSet) {
      return 'Replicaset'
    } else {
      return 'Standalone'
    }
  }

  let storageClassList = []
  async function getStorageClassNames(
    { axios, storeGet, commit, model, getValue, watchDependency, discriminator },
    mode,
  ) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const databaseModeShard = getValue(discriminator, '/activeDatabaseMode') === 'Sharded'

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
    const path =
      mode === 'shard'
        ? '/resources/kubedbComMongoDB/spec/shardTopology/shard/storage/storageClassName'
        : '/resources/kubedbComMongoDB/spec/storage/storageClassName'
    const initialStorageClass = getValue(model, path)
    if (!initialStorageClass) setStorageClass({ getValue, commit, model, discriminator })
    return resources
  }

  function setStorageClass({ getValue, commit, model, discriminator }) {
    const deletionPolicy = getValue(model, 'resources/kubedbComMongoDB/spec/deletionPolicy') || ''
    const suffix = '-retain'
    let storageClass = ''

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

    const mode = getValue(discriminator, '/activeDatabaseMode')

    if (mode === 'Sharded') {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/shard/storage/storageClassName',
        value: storageClass,
        force: true,
      })
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/configServer/storage/storageClassName',
        value: storageClass,
        force: true,
      })
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/storage')
    } else {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/storage/storageClassName',
        value: storageClass,
        force: true,
      })
    }
  }

  function updateConfigServerStorageClass({ getValue, model, commit }) {
    const storageClass =
      getValue(
        model,
        '/resources/kubedbComMongoDB/spec/shardTopology/shard/storage/storageClassName',
      ) || ''
    commit('wizard/model$update', {
      path: '/resources/kubedbComMongoDB/spec/shardTopology/configServer/storage/storageClassName',
      value: storageClass,
      force: true,
    })
  }

  function deleteDatabaseModePath({ discriminator, getValue, commit, model }) {
    const mode = getValue(discriminator, '/activeDatabaseMode')
    const modelSpec = getValue(model, '/resources/kubedbComMongoDB/spec')
    if (mode === 'Sharded') {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/replicaSet')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/replicas')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/storage')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/podTemplate')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/configSecret')

      commit('wizard/model$delete', '/resources/secret_config')

      if (!modelSpec.shardTopology) {
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/shardTopology',
          value: {
            configServer: {
              replicas: 3,
              storage: {
                resources: {
                  requests: {
                    storage: '',
                  },
                },
              },
            },
            mongos: {
              replicas: 2,
            },
            shard: {
              replicas: 3,
              shards: 3,
              storage: {
                resources: {
                  requests: {
                    storage: '',
                  },
                },
              },
            },
          },
          force: true,
        })
      }
    } else if (mode === 'Replicaset') {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/shardTopology')

      commit('wizard/model$delete', '/resources/secret_shard_config')
      commit('wizard/model$delete', '/resources/secret_configserver_config')
      commit('wizard/model$delete', '/resources/secret_mongos_config')

      if (!modelSpec.replicaSet) {
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/replicaSet',
          value: { name: '' },
          force: true,
        })
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/replicas',
          value: 3,
          force: true,
        })
      }
    } else if (mode === 'Standalone') {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/shardTopology')

      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/replicaSet')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/replicas')

      commit('wizard/model$delete', '/resources/secret_shard_config')
      commit('wizard/model$delete', '/resources/secret_configserver_config')
      commit('wizard/model$delete', '/resources/secret_mongos_config')
    }
  }

  function isEqualToDatabaseMode({ getValue, watchDependency, discriminator }, value) {
    watchDependency('discriminator#/activeDatabaseMode')
    const mode = getValue(discriminator, '/activeDatabaseMode')
    return mode === value
  }

  // ************************** TLS ******************************88

  function setApiGroup() {
    return 'cert-manager.io'
  }

  async function getIssuerRefsName({ axios, storeGet, getValue, model, watchDependency }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    watchDependency('model#/resources/kubedbComMongoDB/spec/tls/issuerRef/apiGroup')
    watchDependency('model#/resources/kubedbComMongoDB/spec/tls/issuerRef/kind')
    watchDependency('model#/metadata/release/namespace')
    const apiGroup = getValue(model, '/resources/kubedbComMongoDB/spec/tls/issuerRef/apiGroup')
    const kind = getValue(model, '/resources/kubedbComMongoDB/spec/tls/issuerRef/kind')
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

  function setClusterAuthMode({ model, getValue }) {
    const val = getValue(model, '/resources/kubedbComMongoDB/spec/clusterAuthMode')
    return val || 'x509'
  }

  function setSSLMode({ model, getValue }) {
    const val = getValue(model, '/resources/kubedbComMongoDB/spec/sslMode')
    return val || 'requireSSL'
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
        path: '/resources/kubedbComMongoDB/spec/tls',
        value: { issuerRef: {}, certificates: [] },
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/tls')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/clusterAuthMode')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/sslMode')
    }
  }

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
  }

  /****** Monitoring *********/

  function showMonitoringSection() {
    // watchDependency('discriminator#/enableMonitoring')
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/monitor')
    }

    // update alert value depend on monitoring profile
    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: configureStatus ? 'warning' : 'none',
      force: true,
    })
  }

  function showCustomizeExporterSection() {
    // watchDependency('discriminator#/customizeExporter')
    const configureStatus = getValue(discriminator, '/customizeExporter')
    return configureStatus
  }

  function onCustomizeExporterChange() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/monitor/prometheus/exporter')
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

  function disableInitializationSection({ model, getValue, watchDependency }) {
    const initialized = getValue(model, '/resources/kubedbComMongoDB/spec/init/initialized')
    watchDependency('model#/resources/kubedbComMongoDB/spec/init/initialized')
    return !!initialized
  }

  function valueExists(value, getValue, path) {
    const val = getValue(value, path)
    if (val) return true
    else return false
  }

  function initPrePopulateDatabase({ getValue, model }) {
    const waitForInitialRestore = getValue(
      model,
      '/resources/kubedbComMongoDB/spec/init/waitForInitialRestore',
    )
    const stashAppscodeComRestoreSession_init = getValue(
      model,
      '/resources/stashAppscodeComRestoreSession_init',
    )
    const script = getValue(model, '/resources/kubedbComMongoDB/spec/init/script')

    return waitForInitialRestore || !!stashAppscodeComRestoreSession_init || !!script ? 'yes' : 'no'
  }

  function onPrePopulateDatabaseChange({ commit, getValue, discriminator, model }) {
    const prePopulateDatabase = getValue(discriminator, '/prePopulateDatabase')
    if (prePopulateDatabase === 'no') {
      // delete related properties
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/init/waitForInitialRestore',
        value: false,
      })
      commit('wizard/model$delete', '/resources/stashAppscodeComRestoreSession_init')
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/init/script')
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
    const script = getValue(model, '/resources/kubedbComMongoDB/spec/init/script')
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
      path: '/resources/kubedbComMongoDB/spec/init/waitForInitialRestore',
      value: dataSource === 'stashBackup',
      force: true,
    })

    if (dataSource === 'script') {
      commit('wizard/model$delete', '/resources/stashAppscodeComRestoreSession_init')

      // create a new script if there is no script property
      if (!valueExists(model, getValue, '/resources/kubedbComMongoDB/spec/init/script'))
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/init/script',
          value: initScript,
        })
    } else if (dataSource === 'stashBackup') {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/init/script')

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
    const configMap = getValue(model, '/resources/kubedbComMongoDB/spec/init/script/configMap/name')
    const secret = getValue(model, '/resources/kubedbComMongoDB/spec/init/script/secret/secretName')

    if (configMap) return 'configMap'
    else if (secret) return 'secret'
    else return undefined
  }

  function onVolumeTypeChange({ commit, getValue, discriminator, model }) {
    const sourceVolumeType = getValue(discriminator, '/sourceVolumeType')
    if (sourceVolumeType === 'configMap') {
      // add configMap object and delete secret object
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/init/script/secret')

      if (!valueExists(model, getValue, '/resources/kubedbComMongoDB/spec/init/script/configMap')) {
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/init/script/configMap',
          value: {
            name: '',
          },
        })
      }
    } else if (sourceVolumeType === 'secret') {
      // delete configMap object and add secret object
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/init/script/configMap')

      if (!valueExists(model, getValue, '/resources/kubedbComMongoDB/spec/init/script/secret')) {
        commit('wizard/model$update', {
          path: '/resources/kubedbComMongoDB/spec/init/script/secret',
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

  async function getBlueprints(
    { getValue, model, setDiscriminatorValue, axios, storeGet },
    backup,
  ) {
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

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // FOR Backup Configuration

  // schedule backup

  function getBackupConfigsAndAnnotations(getValue, model) {
    const stashAppscodeComBackupConfiguration = getValue(
      model,
      '/resources/stashAppscodeComBackupConfiguration',
    )

    const coreKubestashComBackupConfiguration = getValue(
      model,
      '/resources/coreKubestashComBackupConfiguration',
    )
    const kubeStashTarget = coreKubestashComBackupConfiguration?.spec?.target

    const mongoDB = getValue(model, '/resources/kubedbComMongoDB')
    const mongoDbKind = mongoDB?.apiVersion?.split('/')?.at(0)

    let isKubeStash = false
    if (
      mongoDB?.kind === kubeStashTarget?.kind &&
      mongoDB?.metadata?.name === kubeStashTarget?.name &&
      mongoDB?.metadata?.namespace === kubeStashTarget?.namespace &&
      mongoDbKind === kubeStashTarget?.apiGroup
    ) {
      isKubeStash = true
    }

    const kubedbComMongoDBAnnotations =
      getValue(model, '/resources/kubedbComMongoDB/metadata/annotations') || {}

    const isBluePrint = Object.keys(kubedbComMongoDBAnnotations).some(
      (k) =>
        k === 'stash.appscode.com/backup-blueprint' ||
        k === 'stash.appscode.com/schedule' ||
        k.startsWith('params.stash.appscode.com/'),
    )

    return {
      stashAppscodeComBackupConfiguration,
      isBluePrint,
      isKubeStash,
    }
  }

  function deleteKubeDbComMongDbAnnotation(getValue, model, commit) {
    const annotations = getValue(model, '/resources/kubedbComMongoDB/metadata/annotations') || {}
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
      path: '/resources/kubedbComMongoDB/metadata/annotations',
      value: filteredAnnotations,
    })
  }

  function addKubeDbComMongDbAnnotation(getValue, model, commit, key, value, force) {
    const annotations = getValue(model, '/resources/kubedbComMongoDB/metadata/annotations') || {}

    if (annotations[key] === undefined) {
      annotations[key] = value
    } else if (force) {
      annotations[key] = value
    }

    commit('wizard/model$update', {
      path: '/resources/kubedbComMongoDB/metadata/annotations',
      value: annotations,
      force: true,
    })
  }

  function initScheduleBackupForEdit() {
    const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
      getValue,
      model,
    )

    initRepositoryChoiseForEdit()

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

  function onScheduleBackupChange() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')

    if (scheduleBackup === 'no') {
      // delete stashAppscodeComBackupConfiguration
      commit('wizard/model$delete', '/resources/stashAppscodeComBackupConfiguration')
      commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
      // delete annotation from KubeDBComMongoDB annotation
      deleteKubeDbComMongDbAnnotation(getValue, model, commit)
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
  function showBackupForm() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')
    // watchDependency('discriminator#/scheduleBackup')
    if (scheduleBackup === 'yes') return true
    else return false
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

  function initRepositoryChoiseForEdit() {
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
    const repositoryName = getValue(
      model,
      'resources/stashAppscodeComRepository_repo/metadata/name',
    )
    // set this name in stashAppscodeComRestoreSession_init
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
      value: repositoryName,
    })
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

  function onInputChangeSchedule(modelPath, discriminatorName) {
    const value = getValue(discriminator, `/${discriminatorName}`)
    const session = getValue(model, modelPath) || []
    if (session.length) {
      session[0].scheduler.schedule = value
      commit('wizard/model$update', {
        path: modelPath,
        value: session,
        force: true,
      })
    }
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

  function getDefaultSchedule(modelPath) {
    // watchDependency('discriminator#/config')
    const config = getValue(discriminator, '/config') // only for computed behaviour
    const session = getValue(model, modelPath)
    return session?.length ? session[0]?.scheduler.schedule : ''
  }

  // restructure backup modal

  let initialModel = {}
  let isBackupOn = false
  let isBackupOnModel = false
  let dbResource = {}
  let initialDbMetadata = {}
  let namespaceList = []
  let backupConfigurationsFromStore = {}
  let valuesFromWizard = {}
  let initialArchiver = {}
  let isArchiverAvailable = false
  let archiverObjectToCommit = {}

  async function initBackupData() {
    // set initial model for further usage
    initialModel = getValue(model, '/resources/coreKubestashComBackupConfiguration')
    isBackupOnModel = !!initialModel

    // check db backup is enabled or not
    backupConfigurationsFromStore = storeGet('/backup/backupConfigurations')
    const configs = objectCopy(backupConfigurationsFromStore)
    const { name, cluster, user, group, resource, spoke } = storeGet('/route/params')
    const namespace = storeGet('/route/query/namespace')
    const kind = storeGet('/resource/layout/result/resource/kind')
    dbResource = getValue(model, '/resources/kubedbComMongoDB')
    initialDbMetadata = objectCopy(dbResource.metadata)
    initialArchiver = dbResource.spec?.archiver ? objectCopy(dbResource.spec?.archiver) : undefined

    // get values.yaml to populate data when backup-config is being created
    try {
      const actionArray = storeGet('/resource/actions/result')
      const editorDetails = actionArray[0]?.items[0]?.editor
      const chartName = editorDetails?.name
      const sourceApiGroup = editorDetails?.sourceRef?.apiGroup
      const sourceKind = editorDetails?.sourceRef?.kind
      const sourceNamespace = editorDetails?.sourceRef?.namespace
      const sourceName = editorDetails?.sourceRef?.name
      const chartVersion = editorDetails?.version

      let url = `/clusters/${user}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceApiGroup}&sourceKind=${sourceKind}&sourceNamespace=${sourceNamespace}&sourceName=${sourceName}&version=${chartVersion}&format=json`

      if (spoke)
        url = `/clusters/${user}/${spoke}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceApiGroup}&sourceKind=${sourceKind}&sourceNamespace=${sourceNamespace}&sourceName=${sourceName}&version=${chartVersion}&format=json`

      const resp = await axios.get(url)

      valuesFromWizard = objectCopy(resp.data?.resources?.coreKubestashComBackupConfiguration) || {}
    } catch (e) {
      console.log(e)
    }

    // check storageclass archiver annotation
    if (initialArchiver) {
      isArchiverAvailable = true
    } else {
      const storageClassName = dbResource?.spec?.storage?.storageClassName
      const url = `/clusters/${user}/${cluster}/proxy/storage.k8s.io/v1/storageclasses/${storageClassName}`
      try {
        const resp = await axios.get(url)
        const archAnnotation = resp.data?.metadata?.annotations
        const annotationKeyToFind = `${resource}.${group}/archiver`
        if (archAnnotation[annotationKeyToFind]) {
          isArchiverAvailable = true
          archiverObjectToCommit = {
            ref: {
              name: archAnnotation[annotationKeyToFind],
              namespace: 'kubedb',
            },
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    // check config with metadata name first
    let config = configs?.find(
      (item) =>
        item.metadata?.name === name &&
        item.spec?.target?.name === name &&
        item.spec?.target?.namespace === namespace &&
        item.spec?.target?.kind === kind &&
        item.spec?.target?.apiGroup === group,
    )

    // check config without metadata name if not found with metadata name
    if (!config)
      config = configs?.find(
        (item) =>
          item.spec?.target?.name === name &&
          item.spec?.target?.namespace === namespace &&
          item.spec?.target?.kind === kind &&
          item.spec?.target?.apiGroup === group,
      )

    // set backup switch here
    isBackupOn = !!config

    // set initial data from stash-presets
    const stashPreset = storeGet('/backup/stashPresets')
    if (stashPreset) {
      const { retentionPolicy, encryptionSecret, schedule, storageRef } = stashPreset

      const tempBackends = valuesFromWizard.spec?.backends
      tempBackends[0]['storageRef'] = storageRef
      tempBackends[0]['retentionPolicy'] = retentionPolicy
      valuesFromWizard.spec['backends'] = tempBackends

      const tempSessions = valuesFromWizard.spec?.sessions
      const tempRepositories = valuesFromWizard.spec?.sessions[0]?.repositories
      tempRepositories[0]['encryptionSecret'] = encryptionSecret
      tempRepositories[0].name = name
      tempRepositories[0]['directory'] = `${namespace}/${name}`

      tempSessions[0]['repositories'] = tempRepositories
      tempSessions[0]['scheduler']['schedule'] = schedule
      valuesFromWizard.spec['sessions'] = tempSessions
    }

    const apiGroup = storeGet('/route/params/group')
    valuesFromWizard.spec['target'] = { name, namespace, apiGroup, kind }
    const labels = dbResource.metadata?.labels
    valuesFromWizard['metadata'] = {
      name: `${name}-${Math.floor(Date.now() / 1000)}`,
      namespace,
      labels,
    }

    setDiscriminatorValue('isBackupDataLoaded', true)
  }

  function isBackupDataLoadedTrue() {
    // watchDependency('discriminator#/isBackupDataLoaded')
    return !!getValue(discriminator, '/isBackupDataLoaded')
  }

  function setBackupType() {
    return 'BackupConfig'
  }

  function getTypes() {
    const arr = [
      {
        description: 'Create, Delete or Modify BackupConfig',
        text: 'BackupConfig',
        value: 'BackupConfig',
      },
      {
        description: 'Enable/Disable BackupBlueprint',
        text: 'BackupBlueprint',
        value: 'BackupBlueprint',
      },
    ]

    if ((dbResource?.spec?.replicaSet || dbResource?.spec?.shardTopology) && isArchiverAvailable) {
      arr.push({
        description: 'Enable/Disable Archiver',
        text: 'Archiver',
        value: 'Archiver',
      })
    }
    return arr
  }

  function onBackupTypeChange() {
    const type = getValue(discriminator, '/backupType')
    commit('wizard/model$update', {
      path: '/backupType',
      value: type,
      force: true,
    })
    if (!isBackupOnModel) {
      commit('wizard/model$delete', '/resources/coreKubestashComBackupConfiguration')
    } else {
      commit('wizard/model$update', {
        path: '/resources/coreKubestashComBackupConfiguration',
        value: objectCopy(initialModel),
        force: true,
      })
    }
    commit('wizard/model$delete', '/context')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMongoDB',
      value: objectCopy(dbResource),
      force: true,
    })
  }

  function isBackupType(type) {
    // watchDependency('discriminator#/backupType')
    const selectedType = getValue(discriminator, '/backupType')

    return selectedType === type
  }

  function setBlueprintSwitch() {
    const annotations = initialDbMetadata?.annotations

    return !!(
      annotations['blueprint.kubestash.com/name'] &&
      annotations['blueprint.kubestash.com/namespace']
    )
  }

  function onBlueprintChange() {
    const blueprintSwitch = getValue(discriminator, '/blueprintEnabled')
    if (blueprintSwitch) addLabelAnnotation(commit, storeGet, 'annotations')
    else deleteLabelAnnotation(commit, 'annotations')
  }

  function setArchiverSwitch() {
    const archiver = dbResource?.spec?.archiver
    return !!archiver
  }

  function onArchiverChange() {
    const archiverSwitch = getValue(discriminator, '/archiverEnabled')
    const path = 'resources/kubedbComMongoDB/spec/archiver'
    if (archiverSwitch) {
      commit('wizard/model$update', {
        path: path,
        value: initialArchiver ? initialArchiver : archiverObjectToCommit,
      })
    } else {
      commit('wizard/model$delete', path)
    }
  }

  function addLabelAnnotation(commit, storeGet, type) {
    const obj = objectCopy(initialDbMetadata[type])

    if (type === 'annotations') {
      const kind = storeGet('/resource/layout/result/resource/kind')
      obj['blueprint.kubestash.com/name'] = 'kubedb'
      obj['blueprint.kubestash.com/namespace'] = `${kind.toLowerCase()}-blueprint`
    } else {
      obj['kubedb.com/archiver'] = 'true'
    }

    commit('wizard/model$update', {
      path: `/resources/kubedbComMongoDB/metadata/${type}`,
      value: obj,
      force: true,
    })
  }

  function deleteLabelAnnotation(commit, type) {
    const obj = initialDbMetadata[type]

    if (type === 'annotations') {
      delete obj['blueprint.kubestash.com/name']
      delete obj['blueprint.kubestash.com/namespace']
    } else delete obj['kubedb.com/archiver']

    commit('wizard/model$update', {
      path: `/resources/kubedbComMongoDB/metadata/${type}`,
      value: obj,
      force: true,
    })
  }

  function getContext() {
    if (isBackupOn) return ['Create', 'Delete', 'Modify']
    return ['Create']
  }

  function onContextChange() {
    const context = getValue(discriminator, '/backupConfigContext')
    commit('wizard/model$update', {
      path: '/context',
      value: context,
      force: true,
    })
    if (context === 'Create') {
      commit('wizard/model$update', {
        path: '/resources/coreKubestashComBackupConfiguration',
        value: valuesFromWizard,
        force: true,
      })
    }
    if (context === 'Delete') setDiscriminatorValue('hidePreviewFromWizard', true)
    else setDiscriminatorValue('hidePreviewFromWizard', undefined)
  }

  function getConfigList() {
    const configs = objectCopy(backupConfigurationsFromStore)
    const { name, group } = storeGet('/route/params')
    const namespace = storeGet('/route/query/namespace')
    const kind = storeGet('/resource/layout/result/resource/kind')
    const filteredList = configs?.filter(
      (item) =>
        item.spec?.target?.name === name &&
        item.spec?.target?.namespace === namespace &&
        item.spec?.target?.kind === kind &&
        item.spec?.target?.apiGroup === group,
    )
    const list = filteredList?.map((ele) => ele.metadata.name)
    return list
  }

  function onConfigChange() {
    const configName = getValue(discriminator, '/config')
    const configs = objectCopy(backupConfigurationsFromStore)
    const configDetails = configs?.find((item) => item?.metadata?.name === configName)

    commit('wizard/model$update', {
      path: '/resources/coreKubestashComBackupConfiguration',
      value: configDetails,
      force: true,
    })
  }

  function showPause() {
    // watchDependency('discriminator#/backupConfigContext')
    // watchDependency('discriminator#/config')
    const contex = getValue(discriminator, '/backupConfigContext')
    const configName = getValue(discriminator, '/config')
    return !!configName && contex === 'Modify'
  }

  function showConfigList() {
    // watchDependency('discriminator#/backupConfigContext')
    const contex = getValue(discriminator, '/backupConfigContext')
    return contex === 'Modify' || contex === 'Delete'
  }

  function showSchedule() {
    // watchDependency('discriminator#/backupConfigContext')
    // watchDependency('discriminator#/config')
    const configName = getValue(discriminator, '/config')
    const contex = getValue(discriminator, '/backupConfigContext')
    if (contex === 'Create') return true
    else if (contex === 'Delete') return false
    else return !!configName
  }

  function getNamespaceArray() {
    return namespaceList
  }

  // backup blueprint form
  function getMongoAnnotations(getValue, model) {
    const annotations = getValue(model, '/resources/kubedbComMongoDB/metadata/annotations')
    return { ...annotations } || {}
  }

  function initFromAnnotationValue({ getValue, model }, key) {
    const annotations = getMongoAnnotations(getValue, model)
    return annotations[key]
  }

  function onBackupBlueprintNameChange({ getValue, discriminator, commit, model }) {
    const backupBlueprintName = getValue(discriminator, '/backupBlueprintName')
    addKubeDbComMongDbAnnotation(
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
    addKubeDbComMongDbAnnotation(
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
    const oldAnnotations = getValue(model, '/resources/kubedbComMongoDB/metadata/annotations') || {}
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
      path: '/resources/kubedbComMongoDB/metadata/annotations',
      value: newAnnotations,
    })
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path)
    return !!modelValue
  }

  function onNamespaceChange({ commit, model, getValue }) {
    const namespace = getValue(model, '/metadata/release/namespace')
    const agent = getValue(model, '/resources/kubedbComMongoDB/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
        value: [namespace],
        force: true,
      })
    }
  }

  function onLabelChange({ commit, model, getValue }) {
    const labels = getValue(model, '/resources/kubedbComMongoDB/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComMongoDB/spec/monitor/agent')

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

    const agent = getValue(model, '/resources/kubedbComMongoDB/spec/monitor/agent')

    const labels = getValue(model, '/resources/kubedbComMongoDB/spec/metadata/labels')

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
        path: '/resources/kubedbComMongoDB/spec/configSecret/name',
        value: `${dbName}-config`,
        force: true,
      })
    }

    // to reset shard configSecret name field
    const hasSecretShardConfig = getValue(model, '/resources/secret_shard_config')
    if (hasSecretShardConfig) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/shard/configSecret/name',
        value: `${dbName}-shard-config`,
        force: true,
      })
    }

    // to reset shard configSecret name field
    const hasSecretConfigServerConfig = getValue(model, '/resources/secret_configserver_config')
    if (hasSecretConfigServerConfig) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/configServer/configSecret/name',
        value: `${dbName}-configserver-config`,
        force: true,
      })
    }

    // to reset mongos configSecret name field
    const hasSecretMongosConfig = getValue(model, '/resources/secret_mongos_config')
    if (hasSecretMongosConfig) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/mongos/configSecret/name',
        value: `${dbName}-mongos-config`,
        force: true,
      })
    }
  }

  function returnFalse() {
    return false
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComMongoDB/spec/monitor/agent')
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
    const authSecret = getValue(model, '/resources/kubedbComMongoDB/spec/authSecret')

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
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/authSecret')
    } else if (createAuthSecret === false) {
      commit('wizard/model$delete', '/resources/secret_auth')
    }
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

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

  async function getSecretKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      '/resources/kubedbComMongoDB/spec/monitor/prometheus/exporter/env/items/valueFrom/secretKeyRef/name',
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/secretKeyRef/name')

    if (!secretName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`,
      )

      const secret = (resp && resp.data && resp.data.data) || {}

      const secretKeys = Object.keys(secret).map((item) => ({
        text: item,
        value: item,
      }))

      return secretKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }

  //////////////////////////////////////// Service Monitor //////////////////////////////////////////////////////

  //////////////////// service monitor ///////////////////

  function isEqualToServiceMonitorType({ rootModel, watchDependency }, value) {
    watchDependency('rootModel#/spec/type')
    return rootModel && rootModel.spec && rootModel.spec.type === value
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
        path: '/resources/kubedbComMongoDB/spec/configSecret/name',
        value: configSecretName,
        force: true,
      })
    }
  }

  function onConfigurationChange({ getValue, commit, discriminator, model }) {
    const value = getValue(discriminator, '/configuration')
    commit('wizard/model$update', {
      path: '/resources/secret_config/stringData/mongod.conf',
      value: value,
      force: true,
    })
    const configSecretName = `${getValue(model, '/metadata/release/name')}-config`
    commit('wizard/model$update', {
      path: '/resources/kubedbComMongoDB/spec/configSecret/name',
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

  //////////////////// custom config for sharded topology /////////////////

  function setConfigurationSourceShard({ model, getValue, discriminator }) {
    const src = getValue(discriminator, '/configurationSourceShard')
    if (src) return src
    const value = getValue(model, '/resources/secret_shard_config')
    return value ? 'create-new-config' : 'use-existing-config'
  }

  function setConfigurationSourceConfigServer({ model, getValue, discriminator }) {
    const src = getValue(discriminator, '/configurationSourceConfigServer')
    if (src) return src
    const value = getValue(model, '/resources/secret_configserver_config')
    return value ? 'create-new-config' : 'use-existing-config'
  }

  function setConfigurationSourceMongos({ model, getValue, discriminator }) {
    const src = getValue(discriminator, '/configurationSourceMongos')
    if (src) return src
    const value = getValue(model, '/resources/secret_mongos_config')
    return value ? 'create-new-config' : 'use-existing-config'
  }

  function isSchemaOf(schema) {
    if (schema === 'discriminator#/configurationSourceShard') {
      return 'shard'
    } else if (schema === 'discriminator#/configurationSourceConfigServer') {
      return 'configserver'
    } else {
      return 'mongos'
    }
  }

  function disableConfigSourceOption({
    itemCtx,
    discriminator,
    getValue,
    watchDependency,
    elementUi,
  }) {
    watchDependency('discriminator#/configurationSourceShard')
    watchDependency('discriminator#/configurationSourceConfigServer')
    watchDependency('discriminator#/configurationSourceMongos')
    const configSrcShard = getValue(discriminator, '/configurationSourceShard')
    const configSrcConfigServer = getValue(discriminator, '/configurationSourceConfigServer')
    const configSrcMongos = getValue(discriminator, '/configurationSourceMongos')
    if (
      itemCtx.value !== 'use-existing-config' &&
      itemCtx.value !== 'create-new-config' &&
      (configSrcShard === `same-as-${isSchemaOf(elementUi.schema.$ref)}-config-secret` ||
        configSrcConfigServer === `same-as-${isSchemaOf(elementUi.schema.$ref)}-config-secret` ||
        configSrcMongos === `same-as-${isSchemaOf(elementUi.schema.$ref)}-config-secret`)
    ) {
      return true
    }
    if (
      itemCtx.value === 'same-as-shard-config-secret' &&
      configSrcShard !== 'use-existing-config' &&
      configSrcShard !== 'create-new-config'
    ) {
      return true
    }
    if (
      itemCtx.value === 'same-as-configserver-config-secret' &&
      configSrcConfigServer !== 'use-existing-config' &&
      configSrcConfigServer !== 'create-new-config'
    ) {
      return true
    }
    if (
      itemCtx.value === 'same-as-mongos-config-secret' &&
      configSrcMongos !== 'use-existing-config' &&
      configSrcMongos !== 'create-new-config'
    ) {
      return true
    }
    return false
  }

  function onConfigurationSourceMongosChange({ getValue, discriminator, commit, model }) {
    const configurationSource = getValue(discriminator, '/configurationSourceMongos')
    const configSecretName = `${getValue(model, '/metadata/release/name')}-mongos-config`
    if (configurationSource === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/secret_mongos_config')
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'mongos',
        configurationSource,
        '/configurationMongos',
      )
    } else if (configurationSource === 'create-new-config') {
      const value = getValue(model, '/resources/secret_mongos_config')
      if (!value) {
        commit('wizard/model$update', {
          path: '/resources/secret_mongos_config',
          value: {},
          force: true,
        })
      }
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/mongos/configSecret/name',
        value: configSecretName,
        force: true,
      })
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'mongos',
        configurationSource,
        '/configurationMongos',
      )
    } else if (configurationSource === 'same-as-shard-config-secret') {
      transferConfigSecret({ commit, model, getValue }, 'shard', 'mongos')
    } else if (configurationSource === 'same-as-configserver-config-secret') {
      transferConfigSecret({ commit, model, getValue }, 'configserver', 'mongos')
    }
  }

  function onConfigurationSourceShardChange({ getValue, discriminator, commit, model }) {
    const configurationSource = getValue(discriminator, '/configurationSourceShard')
    const configSecretName = `${getValue(model, '/metadata/release/name')}-shard-config`
    if (configurationSource === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/secret_shard_config')
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'shard',
        configurationSource,
        '/configurationShard',
      )
    } else if (configurationSource === 'create-new-config') {
      const value = getValue(model, '/resources/secret_shard_config')
      if (!value) {
        commit('wizard/model$update', {
          path: '/resources/secret_shard_config',
          value: {},
          force: true,
        })
      }
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/shard/configSecret/name',
        value: configSecretName,
        force: true,
      })
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'shard',
        configurationSource,
        '/configurationShard',
      )
    } else if (configurationSource === 'same-as-configserver-config-secret') {
      transferConfigSecret({ commit, model, getValue }, 'configserver', 'shard')
    } else if (configurationSource === 'same-as-mongos-config-secret') {
      transferConfigSecret({ commit, model, getValue }, 'mongos', 'shard')
    }
  }

  function onConfigurationSourceConfigServerChange({ getValue, discriminator, commit, model }) {
    const configurationSource = getValue(discriminator, '/configurationSourceConfigServer')
    const configSecretName = `${getValue(model, '/metadata/release/name')}-configserver-config`
    if (configurationSource === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/secret_configserver_config')
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'configserver',
        configurationSource,
        '/configurationConfigServer',
      )
    } else if (configurationSource === 'create-new-config') {
      const value = getValue(model, '/resources/secret_configserver_config')
      if (!value) {
        commit('wizard/model$update', {
          path: '/resources/secret_configserver_config',
          value: {},
          force: true,
        })
      }
      commit('wizard/model$update', {
        path: '/resources/kubedbComMongoDB/spec/shardTopology/configServer/configSecret/name',
        value: configSecretName,
        force: true,
      })
      onConfigSecretModelChange(
        { commit, model, getValue, discriminator },
        'configserver',
        configurationSource,
        '/configurationConfigServer',
      )
    } else if (configurationSource === 'same-as-shard-config-secret') {
      const configurationSourceReference = getValue(discriminator, '/configurationSourceShard')
      transferConfigSecret(
        { commit, model, getValue },
        'shard',
        'configserver',
        configurationSourceReference,
      )
    } else if (configurationSource === 'same-as-mongos-config-secret') {
      const configurationSourceReference = getValue(discriminator, '/configurationSourceMongos')
      transferConfigSecret(
        { commit, model, getValue },
        'mongos',
        'configserver',
        configurationSourceReference,
      )
    }
  }

  function transferConfigSecret({ commit, model, getValue }, src, des) {
    const isShardedMode = getValue(model, '/resources/kubedbComMongoDB/spec/shardTopology')
    if (isShardedMode) {
      commit('wizard/model$update', {
        path: `/resources/kubedbComMongoDB/spec/shardTopology/${
          des === 'configserver' ? 'configServer' : des
        }/configSecret/name`,
        value: getValue(
          model,
          `/resources/kubedbComMongoDB/spec/shardTopology/${
            src === 'configserver' ? 'configServer' : src
          }/configSecret/name`,
        ),
        force: true,
      })

      commit('wizard/model$delete', `/resources/secret_${des}_config`)
    }
  }

  function onConfigSecretModelChange(
    { commit, model, getValue, discriminator },
    configType,
    configSrc,
    discriminatorPath,
  ) {
    if (configSrc === 'create-new-config') {
      const value = getValue(discriminator, discriminatorPath)
      commit('wizard/model$update', {
        path: `/resources/secret_${configType}_config/stringData/mongod.conf`,
        value: value,
        force: true,
      })
    }
    const configSrcShard = getValue(discriminator, '/configurationSourceShard')
    const configSrcConfigServer = getValue(discriminator, '/configurationSourceConfigServer')
    const configSrcMongos = getValue(discriminator, '/configurationSourceMongos')

    if (configSrcShard === `same-as-${configType}-config-secret`) {
      transferConfigSecret({ commit, model, getValue }, configType, 'shard')
    }
    if (configSrcConfigServer === `same-as-${configType}-config-secret`) {
      transferConfigSecret({ commit, model, getValue }, configType, 'configserver')
    }
    if (configSrcMongos === `same-as-${configType}-config-secret`) {
      transferConfigSecret({ commit, model, getValue }, configType, 'mongos')
    }
  }

  function setConfiguration({ model, getValue }) {
    return getValue(model, '/resources/secret_config/stringData/mongod.conf')
  }

  function setConfigurationShard({ model, getValue }) {
    const value = getValue(model, '/resources/secret_shard_config/stringData/mongod.conf')
    return value
  }

  function setConfigurationConfigServer({ model, getValue }) {
    const value = getValue(model, '/resources/secret_configserver_config/stringData/mongod.conf')
    return value
  }

  function setConfigurationMongos({ model, getValue }) {
    const value = getValue(model, '/resources/secret_mongos_config/stringData/mongod.conf')
    return value
  }

  function setConfigurationFiles({ model, getValue }) {
    const value = getValue(model, '/resources/secret_config/data/mongod.conf')
    return atob(value)
  }

  function setConfigurationFilesShard({ model, getValue }) {
    const value = getValue(model, '/resources/secret_shard_config/data/mongod.conf')
    return atob(value)
  }

  function setConfigurationFilesConfigServer({ model, getValue }) {
    const value = getValue(model, '/resources/secret_configserver_config/data/mongod.conf')
    return atob(value)
  }

  function setConfigurationFilesMongos({ model, getValue }) {
    const value = getValue(model, '/resources/secret_mongos_config/data/mongod.conf')
    return atob(value)
  }

  function onSetCustomConfigChange({ discriminator, getValue, commit }) {
    const value = getValue(discriminator, '/setCustomConfig')

    if (value === 'no') {
      commit('wizard/model$delete', '/resources/kubedbComMongoDB/spec/configSecret')
      commit(
        'wizard/model$delete',
        '/resources/kubedbComMongoDB/spec/shardTopology/shard/configSecret',
      )
      commit(
        'wizard/model$delete',
        '/resources/kubedbComMongoDB/spec/shardTopology/configServer/configSecret',
      )
      commit(
        'wizard/model$delete',
        '/resources/kubedbComMongoDB/spec/shardTopology/mongos/configSecret',
      )
      commit('wizard/model$delete', '/resources/secret_config')
      commit('wizard/model$delete', '/resources/secret_shard_config')
      commit('wizard/model$delete', '/resources/secret_configserver_config')
      commit('wizard/model$delete', '/resources/secret_mongos_config')
    }
  }

  function getCreateNameSpaceUrl({ storeGet }) {
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

  function showScheduleBackup() {
    const operationQuery = storeGet('/route/params/actions') || ''
    const isBackupOperation = operationQuery === 'edit-self-backupconfiguration' ? true : false
    return !isBackupOperation
  }

  //////////////////// Autoscaler /////////////////

  let autoscaleType = ''
  let dbDetails = {}
  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/spec/databaseRef/name')
    return (
      !!getValue(model, '/spec/databaseRef/name') && !!getValue(discriminator, '/autoscalingType')
    )
  }

  async function getDbDetails() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''

    const namespace =
      storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
    const name = storeGet('/route/params/name') || getValue(model, '/spec/databaseRef/name') || ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mongodbs/${name}`,
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
      path: `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/databaseRef/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComMongoDBAutoscaler/metadata/labels`,
      value: dbDetails.metadata.labels,
      force: true,
    })
  }

  function mongoTypeEqualsTo(mongoType, type) {
    // watchDependency('discriminator#/dbDetails')
    autoscaleType = type
    const dbDetailsSuccess = getValue(discriminator, '/dbDetails')

    if (!dbDetailsSuccess) return false

    const { spec } = dbDetails || {}
    const { shardTopology, replicaSet } = spec || {}
    let verd = ''
    if (shardTopology) verd = 'sharded'
    else {
      if (replicaSet) verd = 'replicaSet'
      else verd = 'standalone'
    }
    clearSpecModel(verd)
    return mongoType === verd
  }

  function clearSpecModel(dbtype) {
    if (dbtype === 'standalone') {
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/replicaSet`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/shard`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/mongos`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/configServer`,
      )
    } else if (dbtype === 'replicaSet') {
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/standalone`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/shard`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/mongos`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/configServer`,
      )
    } else if (dbtype === 'sharded') {
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/standalone`,
      )
      commit(
        'wizard/model$delete',
        `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${autoscaleType}/replicaSet`,
      )
    }
  }
  async function getConfigMapKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      '/resources/kubedbComMongoDB/spec/monitor/prometheus/exporter/env/items/valueFrom/configMapKeyRef/name',
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/configMapKeyRef/name')

    if (!configMapName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`,
      )

      const configMaps = (resp && resp.data && resp.data.data) || {}

      const configMapKeys = Object.keys(configMaps).map((item) => ({
        text: item,
        value: item,
      }))

      return configMapKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }
  async function fetchNodeTopology() {
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

  function isNodeTopologySelected() {
    // watchDependency(
    //   'model#/resources/autoscalingKubedbComMongoDBAutoscaler/spec/compute/nodeTopology/name',
    // )
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComMongoDBAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/${type}/controlledResources`
    commit('wizard/model$update', {
      path: path,
      value: list,
      force: true,
    })
    return list
  }

  function setTrigger(path) {
    let value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function setMetadata() {
    const dbname = storeGet('/route/params/name') || ''
    const namespace = storeGet('/route/query/namespace') || ''
    const isKube = !!storeGet('/route/params/actions')
    if (isKube) {
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

  function handleUnit(path, type = 'bound') {
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

  function objectCopy(obj) {
    const temp = JSON.stringify(obj)
    return JSON.parse(temp)
  }

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComMongoDBBinding')
    return isExposeBinding
  }

  function addOrRemoveBinding() {
    const value = getValue(discriminator, `/binding`)
    const dbName = getValue(model, '/metadata/release/name')
    const dbNamespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComMongoDB/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'MongoDBBinding',
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
      commit('wizard/model$update', {
        path: '/resources/catalogAppscodeComMongoDBBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComMongoDBBinding')
    }
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
    const pathConstructedForKubedb =
      pathSplit + `/create-opsrequest-${reqType.toLowerCase()}?namespace=${namespace}`

    const isKube = !!storeGet('/route/params/actions')

    if (isKube) return pathConstructedForKubedb
    else
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/mongodbopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  async function fetchTopologyMachines() {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComMongoDBAutoscaler/metadata/annotations',
    )
    const instance = annotations['kubernetes.io/instance-type']

    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (instance) {
      try {
        const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
        const resp = await axios.get(url)

        const nodeGroups = resp.data?.spec?.nodeGroups || []
        setDiscriminatorValue('/topologyMachines', nodeGroups)
        // return nodeGroups
      } catch (e) {
        console.log(e)
        // return []
        setDiscriminatorValue('/topologyMachines', [])
      }
    }
  }

  function setAllowedMachine(type, minmax) {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComMongoDBAutoscaler/metadata/annotations',
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

  function getMachines(type, minmax) {
    // watchDependency('discriminator#/topologyMachines')
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${type}-${depends}`

    // watchDependency(`discriminator#${dependantPath}`)
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

  function hasAnnotations() {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComMongoDBAutoscaler/metadata/annotations',
    )
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  function onMachineChange(type) {
    const annoPath = '/resources/autoscalingKubedbComMongoDBAutoscaler/metadata/annotations'
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
    const allowedPath = `/resources/autoscalingKubedbComMongoDBAutoscaler/spec/compute/${type}`

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

  function setValueFrom() {
    if (isConfigMapTypeValueFrom()) {
      return 'configMap'
    } else if (isSecretTypeValueFrom()) {
      return 'secret'
    } else {
      return 'input'
    }
  }

  return {
    getOpsRequestUrl,
    handleUnit,
    setMetadata,
    isKubedb,
    getDbDetails,
    mongoTypeEqualsTo,
    clearSpecModel,
    fetchNodeTopology,
    isNodeTopologySelected,
    setControlledResources,
    setTrigger,
    setApplyToIfReady,
    showOpsRequestOptions,
    setInitSchedule,
    fetchNames,
    isRancherManaged,
    fetchNamespaces,
    onInputChangeSchedule,
    getDefaultSchedule,
    getBlueprints,
    ifUsagePolicy,
    isBlueprintOption,
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
    isNotShardModeSelected,
    isShardModeSelected,
    getNamespacedResourceList,
    getResourceList,
    resourceNames,
    unNamespacedResourceNames,
    returnTrue,
    returnStringYes,
    getMongoDbVersions,
    showAuthPasswordField,
    showAuthSecretField,
    showNewSecretCreateField,
    isNotStandaloneMode,
    showCommonStorageClassAndSizeField,
    setDatabaseMode,
    getStorageClassNames,
    setStorageClass,
    deleteDatabaseModePath,
    isEqualToDatabaseMode,
    setApiGroup,
    getIssuerRefsName,
    hasIssuerRefName,
    hasNoIssuerRefName,
    setClusterAuthMode,
    setSSLMode,
    showTlsConfigureSection,
    onTlsConfigureChange,
    getAliasOptions,
    showMonitoringSection,
    onEnableMonitoringChange,
    showCustomizeExporterSection,
    onCustomizeExporterChange,
    disableInitializationSection,
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
    deleteKubeDbComMongDbAnnotation,
    addKubeDbComMongDbAnnotation,
    initScheduleBackup,
    initScheduleBackupForEdit,
    onScheduleBackupChange,
    showBackupForm,
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
    encodePassword,
    decodePassword,
    onCreateAuthSecretChange,
    getSecrets,
    isEqualToServiceMonitorType,
    onConfigurationSourceChange,
    onConfigurationChange,
    setConfigurationSource,
    setSecretConfigNamespace,
    setConfigurationSourceShard,
    setConfigurationSourceConfigServer,
    setConfigurationSourceMongos,
    isSchemaOf,
    disableConfigSourceOption,
    onConfigurationSourceMongosChange,
    onConfigurationSourceShardChange,
    onConfigurationSourceConfigServerChange,
    transferConfigSecret,
    onConfigSecretModelChange,
    setConfiguration,
    setConfigurationShard,
    setConfigurationConfigServer,
    setConfigurationMongos,
    setConfigurationFiles,
    setConfigurationFilesShard,
    setConfigurationFilesConfigServer,
    setConfigurationFilesMongos,
    onSetCustomConfigChange,
    getCreateNameSpaceUrl,
    updateConfigServerStorageClass,
    initBackupData,
    isBackupDataLoadedTrue,
    setBackupType,
    getTypes,
    getNamespaceArray,
    isBackupType,
    getContext,
    onContextChange,
    getConfigList,
    onConfigChange,
    showPause,
    showSchedule,
    showConfigList,
    setBlueprintSwitch,
    onBlueprintChange,
    setArchiverSwitch,
    onArchiverChange,
    onBackupTypeChange,
    isBindingAlreadyOn,
    addOrRemoveBinding,
    getMachines,
    setAllowedMachine,
    hasAnnotations,
    hasNoAnnotations,
    fetchTopologyMachines,
    onMachineChange,
    isEqualToValueFromType,
    onValueFromChange,
    getConfigMapKeys,
    setValueFrom,
    isInputTypeValueFrom,
    getSecretKeys,
  }
}
