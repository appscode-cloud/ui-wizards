let options = []
let backups = []
let backupName = ''
let backupNamespace = ''

async function init({ storeGet, axios, setDiscriminatorValue, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = storeGet('/route/query/namespace')
  const name = storeGet('/route/params/name')
  const url = `/clusters/${owner}/${cluster}/proxy/core.kubestash.com/v1alpha1/namespaces/${namespace}/backupconfigurations`

  try {
    const resp = await axios.get(url)
    const items = resp.data.items

    backups = items
    items.forEach((ele) => {
      if (ele.spec?.target?.name === name && ele.spec?.target?.namespace === namespace) {
        const tx = `${ele.metadata.namespace}/${ele.metadata.name}`
        options.push({ text: tx, value: ele.metadata.name })
      }
    })
  } catch (e) {
    console.log(e)
  }
  setDiscriminatorValue('/initApi', true)
}

function getOptions() {
  return options
}

function getSessionOptions({ getValue, discriminator, watchDependency }) {
  watchDependency('discriminator#/backup')
  const backup = getValue(discriminator, '/backup')
  let sessions = []
  backups?.forEach((ele) => {
    if (ele.metadata.name === backup) {
      backupName = ele.metadata.name
      backupNamespace = ele.metadata.namespace
      sessions = ele.spec.sessions
    }
  })
  const optionsArray = sessions?.map((ele) => ele.name)
  return optionsArray
}

function returnFalse() {
  return false
}

function isApiResolved({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/initApi')
  const initApi = getValue(discriminator, '/initApi')
  return initApi
}

function isBackupSelected({ getValue, discriminator, watchDependency }) {
  watchDependency('discriminator#/backup')
  const backup = getValue(discriminator, '/backup')
  return backup
}

function buildCommand({ getValue, discriminator, commit }) {
  const sessions = getValue(discriminator, '/selectedSessions')
  let generatedCommand = `trigger ${backupName} -n ${backupNamespace}`
  sessions?.forEach((ele) => {
    generatedCommand += ` --sessions ${ele}`
  })

  commit('wizard/model$update', {
    path: '/resources/coreKubestashComBackupSession/',
    value: generatedCommand,
    force: true,
  })
}

function clearModel({ commit, setDiscriminatorValue }) {
  commit('wizard/model$update', {
    path: '/resources/coreKubestashComBackupSession/',
    value: '',
    force: true,
  })
  setDiscriminatorValue('/selectedSessions', [])
}

return {
  clearModel,
  getSessionOptions,
  isBackupSelected,
  buildCommand,
  isApiResolved,
  getOptions,
  init,
  returnFalse,
}
