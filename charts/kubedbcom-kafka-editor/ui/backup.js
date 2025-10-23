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

  // Compute Autoscaler Discriminators
  setDiscriminatorValue('/dbDetails', false)
  setDiscriminatorValue('/topologyMachines', [])

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
      // delete annotation from kubedbComKafka annotation
      deleteKubeDbComKafkaDbAnnotation(getValue, model, commit)
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
    dbResource = getValue(model, '/resources/kubedbComKafka')
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
      path: '/resources/kubedbComKafka',
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
    const path = 'resources/kubedbComKafka/spec/archiver'
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
      path: `/resources/kubedbComKafka/metadata/${type}`,
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
      path: `/resources/kubedbComKafka/metadata/${type}`,
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
    const labels = getValue(model, '/resources/kubedbComKafka/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'KafkaBinding',
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
        path: '/resources/catalogAppscodeComKafkaBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComKafkaBinding')
    }
  }

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComKafkaBinding')
    return isExposeBinding
  }

  function objectCopy(obj) {
    const temp = JSON.stringify(obj)
    return JSON.parse(temp)
  }

  return {
    initScheduleBackup,
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
    addOrRemoveBinding,
    isBindingAlreadyOn,
  }
}
