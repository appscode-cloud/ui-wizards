const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator, watchDependency } =
    useOperator(model, store.state)

  // Initialize discriminators
  setDiscriminatorValue('activeDatabaseMode', setDatabaseMode())
  setDiscriminatorValue('configureTLS', !!getValue(model, '/resources/kubedbComPostgres/spec/tls'))
  setDiscriminatorValue(
    'enableMonitoring',
    !!getValue(model, '/resources/kubedbComPostgres/spec/monitor'),
  )
  setDiscriminatorValue(
    'customizeExporter',
    !!getValue(model, '/resources/kubedbComPostgres/spec/monitor/prometheus/exporter'),
  )
  setDiscriminatorValue('prePopulateDatabase', initPrePopulateDatabase())
  setDiscriminatorValue('dataSource', initDataSource())
  setDiscriminatorValue('sourceVolumeType', initVolumeType())
  setDiscriminatorValue('repositoryChoise', setInitialRestoreSessionRepo())
  setDiscriminatorValue(
    'customizeRestoreJobRuntimeSettings',
    initCustomizeRestoreJobRuntimeSettings(),
  )
  setDiscriminatorValue('scheduleBackup', initScheduleBackup())
  setDiscriminatorValue('repositoryChoise', initRepositoryChoise())
  setDiscriminatorValue(
    'customizeRestoreJobRuntimeSettings',
    initCustomizeRestoreJobRuntimeSettingsForBackup(),
  )
  setDiscriminatorValue('backupInvoker', initBackupInvoker())
  setDiscriminatorValue('createAuthSecret', getCreateAuthSecret())
  setDiscriminatorValue('password', setAuthSecretPassword())
  setDiscriminatorValue('configurationSource', setConfigurationSource())
  setDiscriminatorValue('configuration', setConfiguration())
  setDiscriminatorValue('setCustomConfig', 'no')
  setDiscriminatorValue('backupType', 'BackupConfig')
  setDiscriminatorValue('isBackupDataLoaded', false)
  setDiscriminatorValue('backupConfigContext', 'Create')
  setDiscriminatorValue('blueprintEnabled', setBlueprintSwitch())
  setDiscriminatorValue('archiverEnabled', setArchiverSwitch())
  setDiscriminatorValue('blueprintOptions', initBlueprint())
  setDiscriminatorValue('usagePolicy', initUsagePolicy())
  setDiscriminatorValue('autoscalingType', '')
  setDiscriminatorValue('dbDetails', false)
  setDiscriminatorValue('topologyMachines', [])
  setDiscriminatorValue('allowedMachine-min', setAllowedMachine('min'))
  setDiscriminatorValue('allowedMachine-max', setAllowedMachine('max'))
  setDiscriminatorValue('binding', isBindingAlreadyOn())

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name')
    // watchDependency('discriminator#/autoscalingType')
    return (
      !!getValue(model, '/resources/autoscalingKubedbComPostgresAutoscaler/spec/databaseRef/name') &&
      !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setTrigger(path) {
    console.log('setTrigger called')
    let value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  function setApplyToIfReady() {
    console.log('setApplyToIfReady called')
    return 'IfReady'
  }

  function handleUnit(path, type = 'bound') {
    console.log('handleUnit called')
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
    isKubedb,
    setTrigger,
    setApplyToIfReady,
    showOpsRequestOptions,
  }
}
