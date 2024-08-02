function fetchAliasOptions({ reusableElementCtx }) {
  const { functionCallbacks } = reusableElementCtx || {}
  const { getAliasOptions } = functionCallbacks || {}

  return getAliasOptions ? getAliasOptions() : []
}

function validateNewCertificates({ model, itemCtx }) {
  const addedAliases = (model && model.map((item) => item.alias)) || []

  if (addedAliases.includes(itemCtx.alias) && itemCtx.isCreate) {
    return { isInvalid: true, message: 'Alias already exists' }
  }
  return {}
}

function disableAlias({ rootModel }) {
  return !!(rootModel && rootModel.alias)
}

return {
  fetchAliasOptions,
  validateNewCertificates,
  disableAlias,
}
