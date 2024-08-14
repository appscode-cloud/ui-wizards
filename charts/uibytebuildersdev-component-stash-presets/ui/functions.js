let storageSecretSwitch = false

function providerType({ getValue, watchDependency, model }, value) {
  watchDependency('model#/kubestash/backend/provider')
  const provider = getValue(model, '/kubestash/backend/provider')
  return provider === value
}

function isSwitchOn({ watchDependency, getValue, discriminator, model }, type) {
  watchDependency(`discriminator#/${type}`)
  const val = getValue(discriminator, `/${type}`) || false
  return val
}

function setStorageSecret() {
  return storageSecretSwitch
}

function onAuthChange({ getValue, discriminator, commit }, type) {
  const auth = getValue(discriminator, `/${type}`) || false
  storageSecretSwitch = auth
  commit('wizard/model$update', {
    path: '/kubestash/storageSecret/create',
    value: auth,
    force: true,
  })
}

function setProvider() {
  return 's3'
}

function setTool({ commit }) {
  commit('wizard/model$update', {
    path: '/tool',
    value: 'KubeStash',
    force: true,
  })
  return 'KubeStash'
}

function returnFalse() {
  return false
}

return {
  providerType,
  isSwitchOn,
  setStorageSecret,
  onAuthChange,
  setProvider,
  setTool,
  returnFalse,
}
