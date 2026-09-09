const { axios, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enableMonitoring', false)
  setDiscriminatorValue('/customizeExporter', true)

  setDiscriminatorValue('/allowedMachine-node-min', '')
  setDiscriminatorValue('/allowedMachine-node-max', '')
  setDiscriminatorValue('/allowedMachine-datanode-min', '')
  setDiscriminatorValue('/allowedMachine-datanode-max', '')
  setDiscriminatorValue('/allowedMachine-mixcoord-min', '')
  setDiscriminatorValue('/allowedMachine-mixcoord-max', '')
  setDiscriminatorValue('/allowedMachine-proxy-min', '')
  setDiscriminatorValue('/allowedMachine-proxy-max', '')
  setDiscriminatorValue('/allowedMachine-querynode-min', '')
  setDiscriminatorValue('/allowedMachine-querynode-max', '')
  setDiscriminatorValue('/allowedMachine-streamingnode-min', '')
  setDiscriminatorValue('/allowedMachine-streamingnode-max', '')

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
  setDiscriminatorValue('hidePreviewFromWizard', undefined)

  function initScheduleBackupForEdit() {
    const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
      getValue,
      model,
    )

    initRepositoryChoiseForEdit()

    if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
    else return 'no'
  }

  function onScheduleBackupChange() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')

    if (scheduleBackup === 'no') {
      // delete stashAppscodeComBackupConfiguration
      commit('wizard/model$delete', '/resources/stashAppscodeComBackupConfiguration')
      commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
      // delete annotation from kubedbComMilvus annotation
      deleteKubeDbComMilvusAnnotation(getValue, model, commit)
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

  function valueExists(value, getValue, path) {
    const val = getValue(value, path)
    if (val) return true
    else return false
  }

  function getBackupConfigsAndAnnotations(getValue, model) {
    const stashAppscodeComBackupConfiguration = getValue(
      model,
      '/resources/stashAppscodeComBackupConfiguration',
    )
    const kubedbComMilvusAnnotations =
      getValue(model, '/resources/kubedbComMilvus/metadata/annotations') || {}

    const isBluePrint = Object.keys(kubedbComMilvusAnnotations).some(
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

  function deleteKubeDbComMilvusAnnotation(getValue, model, commit) {
    const annotations = getValue(model, '/resources/kubedbComMilvus/metadata/annotations') || {}
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
      path: '/resources/kubedbComMilvus/metadata/annotations',
      value: filteredAnnotations,
    })
  }

  // backup form
  function showBackupForm() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')
    // watchDependency('discriminator#/scheduleBackup')
    if (scheduleBackup === 'yes') return true
    else return false
  }

  let initialModel = {}
  let isBackupOn = false
  let isBackupOnModel = false
  let dbResource = {}
  let initialDbMetadata = {}
  let backupConfigurationsFromStore = {}
  let valuesFromWizard = {
    apiVersion: 'core.kubestash.com/v1alpha1',
    kind: 'BackupConfiguration',
    metadata: {
      name: 'milvus',
      namespace: 'demo',
    },
    spec: {
      backends: [
        {
          name: 'milvus-backend',
          retentionPolicy: {
            name: 'milvus-retention-policy',
            namespace: 'demo',
          },
          storageRef: {
            name: 'milvus-storage',
            namespace: 'demo',
          },
        },
      ],
      sessions: [
        {
          addon: {
            jobTemplate: {
              spec: {
                containerSecurityContext: {
                  allowPrivilegeEscalation: false,
                  capabilities: {
                    drop: ['ALL'],
                  },
                  runAsGroup: 0,
                  runAsNonRoot: true,
                  runAsUser: 999,
                  seccompProfile: {
                    type: 'RuntimeDefault',
                  },
                },
                nodeSelector: {
                  'kubernetes.io/os': 'linux',
                },
              },
            },
            name: 'milvus-addon',
            tasks: [
              {
                name: 'logical-backup',
              },
            ],
          },
          name: 'milvus-frequent-backup',
          repositories: [
            {
              backend: 'milvus-backend',
              directory: '/milvus-repo',
              encryptionSecret: {
                name: 'milvus-encryption-secret',
                namespace: 'demo',
              },
              name: 'milvus-repo',
            },
          ],
          scheduler: {
            failedJobsHistoryLimit: 4,
            jobTemplate: {
              backoffLimit: 2,
              template: {
                spec: {
                  containerSecurityContext: {
                    allowPrivilegeEscalation: false,
                    capabilities: {
                      drop: ['ALL'],
                    },
                    runAsGroup: 0,
                    runAsNonRoot: true,
                    runAsUser: 999,
                    seccompProfile: {
                      type: 'RuntimeDefault',
                    },
                  },
                  nodeSelector: {
                    'kubernetes.io/os': 'linux',
                  },
                },
              },
            },
            schedule: '0 */2 * * *',
            successfulJobsHistoryLimit: 2,
          },
          sessionHistoryLimit: 3,
        },
      ],
      target: {
        apiGroup: 'kubedb.com',
        kind: 'Milvus',
        name: 'milvus',
        namespace: 'demo',
      },
    },
  }
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
    dbResource = getValue(model, '/resources/kubedbComMilvus')
    initialDbMetadata = objectCopy(dbResource.metadata)
    initialArchiver = dbResource.spec?.archiver ? objectCopy(dbResource.spec?.archiver) : undefined

    // get values.yaml to populate data when backup-config is being created

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

    if (dbResource?.spec?.topology && isArchiverAvailable) {
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
      path: '/resources/kubedbComMilvus',
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
    if (blueprintSwitch) addLabelAnnotation('annotations')
    else deleteLabelAnnotation('annotations')
  }

  function setArchiverSwitch() {
    const archiver = dbResource?.spec?.archiver
    return !!archiver
  }

  function onArchiverChange() {
    const archiverSwitch = getValue(discriminator, '/archiverEnabled')
    const path = 'resources/kubedbComMilvus/spec/archiver'
    if (archiverSwitch) {
      commit('wizard/model$update', {
        path: path,
        value: initialArchiver ? initialArchiver : archiverObjectToCommit,
      })
    } else {
      commit('wizard/model$delete', path)
    }
  }

  function addLabelAnnotation(type) {
    const obj = objectCopy(initialDbMetadata[type])

    if (type === 'annotations') {
      const kind = storeGet('/resource/layout/result/resource/kind')
      obj['blueprint.kubestash.com/name'] = 'kubedb'
      obj['blueprint.kubestash.com/namespace'] = `${kind.toLowerCase()}-blueprint`
    } else {
      obj['kubedb.com/archiver'] = 'true'
    }

    commit('wizard/model$update', {
      path: `/resources/kubedbComMilvus/metadata/${type}`,
      value: obj,
      force: true,
    })
  }

  function deleteLabelAnnotation(type) {
    const obj = initialDbMetadata[type]

    if (type === 'annotations') {
      delete obj['blueprint.kubestash.com/name']
      delete obj['blueprint.kubestash.com/namespace']
    } else delete obj['kubedb.com/archiver']

    commit('wizard/model$update', {
      path: `/resources/kubedbComMilvus/metadata/${type}`,
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

  function setPausedValue() {
    const backupConfig = storeGet('backup/backupConfigurations') || []
    const selectedConfigName = getValue(discriminator, '/config')
    const namespace = storeGet('/route/query/namespace')
    const selectedConfig = backupConfig.find(
      (item) => item.metadata.name === selectedConfigName && item.metadata.namespace === namespace,
    )
    return !!selectedConfig?.spec?.paused
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

  function showScheduleBackup() {
    const operationQuery = storeGet('/route/params/actions') || ''
    const isBackupOperation = operationQuery === 'edit-self-backupconfiguration' ? true : false
    return !isBackupOperation
  }

  function getDefaultSchedule(modelPath) {
    // watchDependency('discriminator#/config')
    const config = getValue(discriminator, '/config') // only for computed behaviour
    const session = getValue(model, modelPath)
    return session?.length ? session[0]?.scheduler.schedule : ''
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

  function onInputChangeSchedule(modelPath, discriminatorName) {
    const value = getValue(discriminator, `/${discriminatorName}`)
    const session = getValue(model, modelPath) || []
    if (session.length) {
      session[0].scheduler.schedule = value
      commit('wizard/model$update', {
        path: modelPath,
        value: session,
      })
    }
  }

  function objectCopy(obj) {
    const temp = JSON.stringify(obj)
    return JSON.parse(temp)
  }

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
        .filter((item) => ['Opaque'].includes(item.type))
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
    const kind = getValue(model, '/resources/kubedbComMilvus/spec/tls/issuerRef/kind')
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
    } else {
      setServiceMonitorDefaults()
    }
  }

  function getServiceMonitorInterval() {
    const path = '/resources/kubedbComMilvus/spec/monitor/prometheus/serviceMonitor/interval'
    return getValue(model, path) || '30s'
  }

  // The operator only reconciles a ServiceMonitor when spec.monitor.prometheus.serviceMonitor
  // exists, so seed an interval to keep the subtree in the generated yaml.
  function setServiceMonitorDefaults() {
    const agent = getValue(model, '/resources/kubedbComMilvus/spec/monitor/agent')
    if (agent !== 'prometheus.io/operator') return
    const path = '/resources/kubedbComMilvus/spec/monitor/prometheus/serviceMonitor/interval'
    if (!getValue(model, path)) {
      commit('wizard/model$update', { path, value: '30s', force: true })
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
    if (agent === 'prometheus.io/operator') {
      setServiceMonitorDefaults()
    } else {
      commit(
        'wizard/model$delete',
        '/resources/kubedbComMilvus/spec/monitor/prometheus/serviceMonitor',
      )
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
    setServiceMonitorDefaults()
  }

  // ── Autoscaling ────────────────────────────────────────────────────────────

  let autoscaleType = ''
  let dbDetails = {}
  let instance = {}

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function isConsole() {
    const isKube = isKubedb()
    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name',
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
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }
    return !isKube
  }

  async function getMilvusDbs() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/namespace',
    )
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/milvuses`,
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

  function initAutoscalerMetadata() {
    const dbName =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') || ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type || ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
    if (type === 'compute')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComMilvusAutoscaler/spec/storage')
    if (type === 'storage')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute')
  }

  async function getMilvusDbDetails() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    instance = annotations?.['kubernetes.io/instance-type']
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') || getValue(model, '/metadata/release/namespace') || ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/milvuses/${name}`,
        )
        dbDetails = resp.data || {}
        setDiscriminatorValue('/dbDetails', true)
      } catch (e) {
        console.log(e)
      }
    }

    commit('wizard/model$update', { path: '/metadata/release/name', value: name, force: true })
    commit('wizard/model$update', {
      path: '/metadata/release/namespace',
      value: namespace,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name',
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/labels',
      value: dbDetails.metadata?.labels,
      force: true,
    })

    await fetchTopologyMachines()
  }

  function isMilvusStandalone() {
    const loaded = getValue(discriminator, '/dbDetails')
    if (!loaded) return false
    return !dbDetails?.spec?.topology?.distributed
  }

  function isMilvusDistributed() {
    const loaded = getValue(discriminator, '/dbDetails')
    if (!loaded) return false
    return !!dbDetails?.spec?.topology?.distributed
  }

  function setTrigger(path) {
    const value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  async function fetchTopologyMachines() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    instance = annotations['kubernetes.io/instance-type']
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (instance) {
      try {
        const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
        const resp = await axios.get(url)
        const nodeGroups = resp.data?.spec?.nodeGroups || []
        setDiscriminatorValue('/topologyMachines', nodeGroups)
      } catch (e) {
        console.log(e)
        setDiscriminatorValue('/topologyMachines', [])
      }
    }
  }

  function getMachines(type, minmax) {
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${type}-${depends}`
    const dependantMachineObj = getValue(discriminator, dependantPath)
    const dependantMachine = dependantMachineObj?.machine || ''

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

    const machines = nodeGroups?.map((item) => ({
      text: item.topologyValue,
      subtext: `CPU: ${item.allocatable?.cpu}, Memory: ${item.allocatable?.memory}`,
      value: {
        machine: item.topologyValue,
        cpu: item.allocatable?.cpu,
        memory: item.allocatable?.memory,
      },
    }))

    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )

    return dependantIndex === -1 ? machines : filteredMachine
  }

  function setAllowedMachine(type, minmax) {
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      parsedInstance = {}
    }

    const machine = parsedInstance[type] || ''
    const mx = machine?.includes(',') ? machine.split(',')[1] : ''
    const mn = machine?.includes(',') ? machine.split(',')[0] : ''
    const machineName = minmax === 'min' ? mn : mx

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const machineData = nodeGroups.find((item) => item.topologyValue === machineName)

    if (machineData) {
      return {
        machine: machineName,
        cpu: machineData.allocatable?.cpu,
        memory: machineData.allocatable?.memory,
      }
    }
    return { machine: machineName || '', cpu: '', memory: '' }
  }

  function onMachineChange(nodeType) {
    const annoPath = '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const inst = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (inst) parsedInstance = JSON.parse(inst)
    } catch (e) {
      parsedInstance = {}
    }

    const minMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-min`)
    const maxMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-max`)
    const minMachine = minMachineObj?.machine || ''
    const maxMachine = maxMachineObj?.machine || ''
    const minMaxMachine = `${minMachine},${maxMachine}`

    parsedInstance[nodeType] = minMaxMachine
    const instanceString = JSON.stringify(parsedInstance)
    annotations['kubernetes.io/instance-type'] = instanceString

    const minMachineAllocatable = minMachineObj
      ? { cpu: minMachineObj.cpu, memory: minMachineObj.memory }
      : null
    const maxMachineAllocatable = maxMachineObj
      ? { cpu: maxMachineObj.cpu, memory: maxMachineObj.memory }
      : null
    const allowedPath = `/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute/${nodeType}`

    if (minMachine && maxMachine && inst !== instanceString) {
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
      commit('wizard/model$update', { path: annoPath, value: annotations, force: true })
    }
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComMilvusAutoscaler/spec/${type}/controlledResources`
    commit('wizard/model$update', { path, value: list, force: true })
    return list
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    return !!annotations['kubernetes.io/instance-type']
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`,
      )
      const list = (resp && resp.data?.items) || []
      return list.map((item) => (item.metadata && item.metadata.name) || '')
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isNodeTopologySelected() {
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb()) return true
    return (
      !!getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') &&
      !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function handleUnit(path, type = 'bound') {
    let value = getValue(model, `/resources/${path}`)
    if (type === 'scalingRules') {
      const updatedValue = []
      value?.forEach((ele) => {
        let appliesUpto = ele['appliesUpto']
        let threshold = ele['threshold']
        if (appliesUpto && !isNaN(appliesUpto)) appliesUpto += 'Gi'
        if (!isNaN(threshold)) threshold += 'pc'
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
        commit('wizard/model$update', { path: `/resources/${path}`, value, force: true })
      }
    }
  }

  function setValueFromDbDetails(path) {
    return getValue(model, path)
  }

  // ── End Autoscaling ────────────────────────────────────────────────────────

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

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComMilvusBinding')
    return isExposeBinding
  }

  function addOrRemoveBinding() {
    const value = getValue(discriminator, `/binding`)
    const dbName = getValue(model, '/metadata/release/name')
    const dbNamespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComMilvus/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'MilvusBinding',
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
        path: '/resources/catalogAppscodeComMilvusBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComMilvusBinding')
    }
  }

  return {
    initScheduleBackupForEdit,
    onScheduleBackupChange,
    showBackupForm,
    initBackupData,
    isBackupDataLoadedTrue,
    setBackupType,
    getTypes,
    onBackupTypeChange,
    isBackupType,
    setBlueprintSwitch,
    onBlueprintChange,
    setArchiverSwitch,
    onArchiverChange,
    getContext,
    onContextChange,
    getConfigList,
    onConfigChange,
    showPause,
    showConfigList,
    showSchedule,
    showScheduleBackup,
    getDefaultSchedule,
    onInputChangeSchedule,
    setPausedValue,

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
    getServiceMonitorInterval,
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
    fetchJsons,
    // Autoscaling
    isKubedb,
    isConsole,
    getMilvusDbs,
    initAutoscalerMetadata,
    getMilvusDbDetails,
    isMilvusStandalone,
    isMilvusDistributed,
    setTrigger,
    fetchTopologyMachines,
    getMachines,
    setAllowedMachine,
    onMachineChange,
    setControlledResources,
    hasAnnotations,
    hasNoAnnotations,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,
    handleUnit,
    setValueFromDbDetails,

    addOrRemoveBinding,
    isBindingAlreadyOn,
  }
}
