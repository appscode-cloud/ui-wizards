function showAlertSection({ model, getValue, watchDependency}) {
  watchDependency("model#/enabled");
  return !!getValue(model, "/enabled");
}

return {
  showAlertSection,
}