function setMonitoringStatus({ reusableElementCtx, getValue }) {
  const status =  getValue(reusableElementCtx, "/dataContext/agent");
  return !!status;
}

function onMonitoringStatusChange({ discriminator, reusableElementCtx, getValue }) {
  const status = getValue(discriminator, "/monitoringEnabledStatus");
  const {functionCallbacks} = reusableElementCtx || {};
  const {updateAgentValue} = functionCallbacks || {};
  updateAgentValue(status);
}

function showMonitoringSection({ discriminator, getValue, watchDependency}) {
  watchDependency("discriminator#/monitoringEnabledStatus");
  return !!getValue(discriminator, "/monitoringEnabledStatus");
}

return {
  setMonitoringStatus,
  showMonitoringSection,
  onMonitoringStatusChange,
}