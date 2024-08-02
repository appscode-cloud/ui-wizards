function isWriteCheckEnabled({ model, getValue, watchDependency }) {
  watchDependency('model#/disableWriteCheck')
  const disableWriteCheckStatus = getValue(model, '/disableWriteCheck')

  return !disableWriteCheckStatus
}

return {
  isWriteCheckEnabled,
}
