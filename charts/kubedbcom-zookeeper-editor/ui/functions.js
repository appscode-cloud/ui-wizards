// backup form
function showBackupForm({ getValue, discriminator, watchDependency }) {
  const scheduleBackup = getValue(discriminator, '/scheduleBackup')
  watchDependency('discriminator#/scheduleBackup')

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

async function initBackupData({ storeGet, axios, getValue, model, setDiscriminatorValue }) {
  // set initial model for further usage
  initialModel = getValue(model, '/resources/coreKubestashComBackupConfiguration')
  isBackupOnModel = !!initialModel

  // check db backup is enabled or not
  backupConfigurationsFromStore = storeGet('/backup/backupConfigurations')
  const configs = objectCopy(backupConfigurationsFromStore)
  const { name, cluster, user, group, resource } = storeGet('/route/params')
  const namespace = storeGet('/route/query/namespace')
  const kind = storeGet('/resource/layout/result/resource/kind')
  dbResource = getValue(model, '/resources/kubedbComZooKeeper')
  initialDbMetadata = objectCopy(dbResource.metadata)

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

    const url = `/clusters/${user}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceApiGroup}&sourceKind=${sourceKind}&sourceNamespace=${sourceNamespace}&sourceName=${sourceName}&version=${chartVersion}&format=json`

    const resp = await axios.get(url)

    valuesFromWizard = objectCopy(resp.data?.resources?.coreKubestashComBackupConfiguration) || {}
  } catch (e) {
    console.log(e)
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

function isBackupDataLoadedTrue({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/isBackupDataLoaded')
  return !!getValue(discriminator, '/isBackupDataLoaded')
}

async function setBackupType() {
  return 'BackupConfig'
}

async function getTypes() {
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

  return arr
}

function onBackupTypeChange({ commit, getValue, discriminator }) {
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
    path: '/resources/kubedbComZooKeeper',
    value: objectCopy(dbResource),
    force: true,
  })
}

function isBackupType({ watchDependency, getValue, discriminator }, type) {
  watchDependency('discriminator#/backupType')
  const selectedType = getValue(discriminator, '/backupType')

  return selectedType === type
}

function setBlueprintSwitch() {
  const annotations = initialDbMetadata?.annotations

  return !!(
    annotations['blueprint.kubestash.com/name'] && annotations['blueprint.kubestash.com/namespace']
  )
}

function onBlueprintChange({ getValue, discriminator, commit, model, storeGet }) {
  const blueprintSwitch = getValue(discriminator, '/blueprintEnabled')
  if (blueprintSwitch) addLabelAnnotation(commit, storeGet, 'annotations')
  else deleteLabelAnnotation(commit, 'annotations')
}

function setArchiverSwitch() {
  const archiver = dbResource?.spec?.archiver
  return !!archiver
}

function onArchiverChange({ getValue, discriminator, commit }) {
  const archiverSwitch = getValue(discriminator, '/archiverEnabled')
  const path = 'resources/kubedbComZooKeeper/spec/archiver'
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
    path: `/resources/kubedbComZooKeeper/metadata/${type}`,
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
    path: `/resources/kubedbComZooKeeper/metadata/${type}`,
    value: obj,
    force: true,
  })
}

function getContext() {
  if (isBackupOn) return ['Create', 'Delete', 'Modify']
  return ['Create']
}

function onContextChange({ getValue, discriminator, commit, model }) {
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
}

function getConfigList({ storeGet }) {
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

function onConfigChange({ getValue, discriminator, commit, storeGet, model }) {
  const configName = getValue(discriminator, '/config')
  const configs = objectCopy(backupConfigurationsFromStore)
  const configDetails = configs?.find((item) => item?.metadata?.name === configName)

  commit('wizard/model$update', {
    path: '/resources/coreKubestashComBackupConfiguration',
    value: configDetails,
    force: true,
  })
}

function showPause({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/backupConfigContext')
  watchDependency('discriminator#/config')
  const contex = getValue(discriminator, '/backupConfigContext')
  const configName = getValue(discriminator, '/config')
  return !!configName && contex === 'Modify'
}

function showConfigList({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/backupConfigContext')
  const contex = getValue(discriminator, '/backupConfigContext')
  return contex === 'Modify' || contex === 'Delete'
}

function showSchedule({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/backupConfigContext')
  watchDependency('discriminator#/config')
  const configName = getValue(discriminator, '/config')
  const contex = getValue(discriminator, '/backupConfigContext')
  if (contex === 'Create') return true
  else if (contex === 'Delete') return false
  else return !!configName
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

function getDefaultSchedule({ getValue, model, watchDependency }, modelPath) {
  watchDependency('discriminator#/config')
  const session = getValue(model, modelPath)
  return session?.length ? session[0]?.scheduler.schedule : ''
}

function objectCopy(obj) {
  const temp = JSON.stringify(obj)
  return JSON.parse(temp)
}

function returnFalse() {
  return false
}

return {
  initBackupData,
  isBackupDataLoadedTrue,
  setBackupType,
  getTypes,
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
  returnFalse,
  onInputChangeSchedule,
  getDefaultSchedule,
}