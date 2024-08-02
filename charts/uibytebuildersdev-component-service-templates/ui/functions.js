function isEqualToServiceMonitorType({ rootModel, watchDependency }, value) {
  watchDependency('rootModel#/spec/type')
  return rootModel && rootModel.spec && rootModel.spec.type === value
}

return {
  isEqualToServiceMonitorType,
}
