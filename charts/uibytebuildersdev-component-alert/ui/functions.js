function getFinalPathFromSchema(path) {
  const pathWithoutSchema = path?.replace(/^schema#\//, '') || ''
  const pathWithoutProperties = pathWithoutSchema?.replaceAll(/properties\//gi, '') || ''

  const pathWithoutFormAlert = pathWithoutProperties?.replace('form/alert/', '') || ''
  const finalPath = pathWithoutFormAlert + '/enabled'

  return finalPath
}

function onGroupStatusChange({ elementSchema, commit }, status) {
  const path = elementSchema?.$ref || ''
  const finalPath = getFinalPathFromSchema(path)

  commit('wizard/model$update', {
    path: finalPath,
    value: status === 'true' ? 'warning' : 'none',
    force: true,
  })
}

function setInitialValueOfToggleBtn(context) {
  const { model, getValue, elementSchema } = context

  const path = elementSchema?.$ref || ''
  const finalPath = getFinalPathFromSchema(path)

  const value = getValue(model, finalPath)

  if (value === 'none') return true
  else return false
}

function showValField({ schemaRef }) {
  return schemaRef && Object.keys(schemaRef).length
}

function showAlertSection({ model, getValue, watchDependency }) {
  watchDependency('model#/enabled')
  const status = getValue(model, '/enabled')
  return status !== 'none'
}

return {
  onGroupStatusChange,
  setInitialValueOfToggleBtn,
  showValField,
  showAlertSection,
}
