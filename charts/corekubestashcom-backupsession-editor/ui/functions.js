let options = []
let backups = []

async function init({ storeGet, axios, setDiscriminatorValue, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = storeGet('/route/query/namespace')
  const name = storeGet('/route/query/name')
  const url = `/clusters/${owner}/${cluster}/proxy/core.kubestash.com/v1alpha1/namespaces/${namespace}/backupconfigurations`
  try {
    const resp = await axios.get(url)
    const items = resp.data.items
    backups = items
    items.forEach((ele) => {
      if (ele.spec?.target.name === name && ele.spec?.target.namespace === namespace) {
        const name = `${ele.metadata.namespace}/${ele.metadata.name}`
        options.push({ text: name, value: ele.metadata.name })
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

function returnFalse() {
  return false
}

function isApiResolved({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/initApi')
  const initApi = getValue(discriminator, '/initApi')
  return initApi
}

function buildObject({ getValue, discriminator, commit }) {
  const backup = getValue(discriminator, '/backup')
  let sessions = []
  let backupName = ''
  let backupNamespace = ''
  backups.forEach((ele) => {
    if (ele.metadata.name === backup) {
      backupName = ele.metadata.name
      backupNamespace = ele.metadata.namespace
      sessions = ele.spec.sessions
    }
  })
  const generatedObjects = sessions.map((ele) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '')
    return {
      apiVersion: 'core.kubestash.com/v1alpha1',
      kind: 'BackupSession',
      metadata: {
        labels: {
          'kubestash.com/invoker-name': backupName,
        },
        name: `${backupName}-${ele.name}-${timestamp}`,
        namespace: backupNamespace,
      },
      spec: {
        invoker: {
          apiGroup: 'core.kubestash.com',
          kind: 'BackupConfiguration',
          name: backupName,
        },
        session: ele.name,
      },
    }
  })

  commit('wizard/model$update', {
    path: '/resources/coreKubestashComBackupSession/',
    value: generatedObjects,
    force: true,
  })
}

return {
  buildObject,
  isApiResolved,
  getOptions,
  init,
  returnFalse,
}
