function setMonitoringStatus({ reusableElementCtx, getValue }) {
  const status = getValue(reusableElementCtx, '/dataContext/agent')
  return !!status
}

function onMonitoringStatusChange({ discriminator, reusableElementCtx, getValue }) {
  const status = getValue(discriminator, '/monitoringEnabledStatus')
  const { functionCallbacks } = reusableElementCtx || {}
  const { updateAgentValue } = functionCallbacks || {}
  updateAgentValue(status)
}

return {
  setMonitoringStatus,
  onMonitoringStatusChange,
}
