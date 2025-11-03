const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
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

  // Autoscaler Discriminators
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

  /****** Backup Configuration *********/

  function initScheduleBackupForEdit() {
    const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
      getValue,
      model,
    )

    initRepositoryChoiseForEdit()

    if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
    else return 'no'
  }

  function initScheduleBackup() {
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
      // delete annotation from kubedbComPostgres annotation
      deleteKubeDbComPostgresDbAnnotation()
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
    const kubedbComPostgresAnnotations =
      getValue(model, '/resources/kubedbComPostgres/metadata/annotations') || {}

    const isBluePrint = Object.keys(kubedbComPostgresAnnotations).some(
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

  function deleteKubeDbComPostgresDbAnnotation() {
    const annotations = getValue(model, '/resources/kubedbComPostgres/metadata/annotations') || {}
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
      path: '/resources/kubedbComPostgres/metadata/annotations',
      value: filteredAnnotations,
    })
  }

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
    dbResource = getValue(model, '/resources/kubedbComPostgres')
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
      path: '/resources/kubedbComPostgres',
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
    const path = 'resources/kubedbComPostgres/spec/archiver'
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
      path: `/resources/kubedbComPostgres/metadata/${type}`,
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
      path: `/resources/kubedbComPostgres/metadata/${type}`,
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

  function addOrRemoveBinding() {
    const value = getValue(discriminator, `/binding`)
    const dbName = getValue(model, '/metadata/release/name')
    const dbNamespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComPostgres/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'PostgresBinding',
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
        path: '/resources/catalogAppscodeComPostgresBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComPostgresBinding')
    }
  }

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComPostgresBinding')
    return isExposeBinding
  }

  function objectCopy(obj) {
    const temp = JSON.stringify(obj)
    return JSON.parse(temp)
  }

  /****** Compute Autoscaller *********/

  let autoscaleType = ''
  let dbDetails = {}

  async function getDbDetails() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''

    const namespace =
      storeGet('/route/query/namespace') ||
      getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/namespace') ||
      ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/postgreses/${name}`,
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
      path: `/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComPostgresAutoscaler/metadata/labels`,
      value: dbDetails.metadata.labels,
      force: true,
    })
  }

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function isConsole() {
    const isKube = isKubedb()

    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name',
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
        path: '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }

    return !isKube
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
      return {
        text: name,
        value: name,
      }
    })
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  // function onNamespaceChange() {
  //   const namespace = getValue(model, '/metadata/release/namespace')
  //   const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')
  //   if (agent === 'prometheus.io') {
  //     commit('wizard/model$update', {
  //       path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
  //       value: [namespace],
  //       force: true,
  //     })
  //   }
  // }

  async function getPostgresDbs() {
    // watchDependency('model#/resources/autoscalingKubedbComPostgresAutoscaler/metadata/namespace')
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/namespace',
    )
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/postgreses`,
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

  function initMetadata() {
    const dbName =
      getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name') ||
      ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })

    // delete the other type object from vuex wizard model
    if (type === 'compute')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComPostgresAutoscaler/spec/storage',
      )
    if (type === 'storage')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComPostgresAutoscaler/spec/compute',
      )
  }

  async function fetchTopologyMachines() {
    const instance = hasAnnotations()

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

  function setTrigger(path) {
    let value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/annotations') ||
      {}
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function setAllowedMachine(minmax) {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/annotations') ||
      {}
    const instance = annotations['kubernetes.io/instance-type']
    const mx = instance?.includes(',') ? instance.split(',')[1] : ''
    const mn = instance?.includes(',') ? instance.split(',')[0] : ''

    if (minmax === 'min') return mn
    else return mx
  }

  async function getMachines(minmax) {
    // watchDependency('discriminator#/topologyMachines')
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${depends}`

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

  function onMachineChange(type) {
    const annoPath = '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const instance = annotations['kubernetes.io/instance-type']

    const minMachine = getValue(discriminator, '/allowedMachine-min')
    const maxMachine = getValue(discriminator, '/allowedMachine-max')
    const minMaxMachine = `${minMachine},${maxMachine}`
    annotations['kubernetes.io/instance-type'] = minMaxMachine

    const machines = getValue(discriminator, `/topologyMachines`) || []
    const minMachineObj = machines.find((item) => item.topologyValue === minMachine)
    const maxMachineObj = machines.find((item) => item.topologyValue === maxMachine)
    const minMachineAllocatable = minMachineObj?.allocatable
    const maxMachineAllocatable = maxMachineObj?.allocatable
    const allowedPath = `/resources/autoscalingKubedbComPostgresAutoscaler/spec/compute/${type}`

    if (minMachine && maxMachine && instance !== minMaxMachine) {
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
        value: { ...annotations },
        force: true,
      })
    }
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComPostgresAutoscaler/spec/compute/${type}/controlledResources`
    commit('wizard/model$update', {
      path: path,
      value: list,
      force: true,
    })
    return list
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
    //   'model#/resources/autoscalingKubedbComPostgresAutoscaler/spec/compute/nodeTopology/name',
    // )
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComPostgresAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name')
    // watchDependency('discriminator#/autoscalingType')
    return (
      !!getValue(
        model,
        '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name',
      ) && !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
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
        path: '/resources/kubedbComPostgres/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComPostgres/spec/monitor')
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
        path: '/resources/kubedbComPostgres/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComPostgres/spec/monitor/prometheus/exporter')
    }
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path)
    return !!modelValue
  }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComPostgres/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')

    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
        value: [],
        force: true,
      })

      onNamespaceChange()
      onLabelChange()
    } else {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
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
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/postgresopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  function onNamespaceChange() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComPostgresAutoscaler/metadata/namespace',
    )
    if (!namespace) {
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name',
      )
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

  function isConfigMapTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.configMapKeyRef)
  }

  function isSecretTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.secretKeyRef)
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

  function isEqualToValueFromType(value) {
    //watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
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

  async function getConfigMapKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      '/resources/kubedbComPostgres/spec/monitor/prometheus/exporter/env/items/valueFrom/configMapKeyRef/name',
    )

    console.log({ configMapName })

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

  async function getSecretKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      '/resources/kubedbComPostgres/spec/monitor/prometheus/exporter/env/items/valueFrom/secretKeyRef/name',
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

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComPostgresBinding')
    return isExposeBinding
  }

  function addOrRemoveBinding() {
    const value = getValue(discriminator, `/binding`)
    const dbName = getValue(model, '/metadata/release/name')
    const dbNamespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComPostgres/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'PostgresBinding',
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
        path: '/resources/catalogAppscodeComPostgresBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComPostgresBinding')
    }
  }

  function returnFalse() {
    return false
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

  return {
    initScheduleBackup,
    initScheduleBackupForEdit,
    onScheduleBackupChange,
    deleteKubeDbComPostgresDbAnnotation,
    getBackupConfigsAndAnnotations,
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
    initRepositoryChoiseForEdit,
    addLabelAnnotation,
    deleteLabelAnnotation,
    onInputChangeSchedule,
    objectCopy,
    valueExists,

    getDbDetails,
    isKubedb,
    isConsole,
    getNamespaces,
    isRancherManaged,
    onNamespaceChange,
    getPostgresDbs,
    initMetadata,
    fetchTopologyMachines,
    setTrigger,
    hasAnnotations,
    setAllowedMachine,
    getMachines,
    onMachineChange,
    hasNoAnnotations,
    setControlledResources,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,

    handleUnit,

    getOpsRequestUrl,
    isValueExistInModel,
    onEnableMonitoringChange,
    showMonitoringSection,
    onAgentChange,
    getResources,
    isEqualToModelPathValue,
    onCustomizeExporterChange,
    showCustomizeExporterSection,
    onLabelChange,
    setValueFrom,
    onValueFromChange,
    isEqualToValueFromType,
    resourceNames,
    getConfigMapKeys,
    getSecrets,
    getSecretKeys,
    isConfigMapTypeValueFrom,
    isSecretTypeValueFrom,
    getNamespacedResourceList,
    returnFalse,

    isBindingAlreadyOn,
    addOrRemoveBinding,
  }
}
