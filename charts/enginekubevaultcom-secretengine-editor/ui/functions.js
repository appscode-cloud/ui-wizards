function getDbName({storeGet}) {
  const path =  storeGet("/route/fullPath")
  const splitedPath = path.split('/')
  return splitedPath[6]
}


function getDbVault({ storeGet, getValue, watchDependency, model }) {
  watchDependency("model#/spec/vaultRef/name")
  const val = getValue(model, "/spec/vaultRef/name") || ''
  const dbName = getDbName({storeGet})
  return val.length ? `${dbName}-${val}` : dbName
}


function getDbNamespace({storeGet}) {
  const path =  storeGet("/route/fullPath")
  const splitedPath = path.split('/')
  const segment = splitedPath[splitedPath.length-1]
  const namespace = segment.split('=')
  return namespace[1] || ''
}


function isVaultSelected({ getValue, watchDependency, discriminator }) {
  watchDependency("discriminator#/vaultserver")
  const val = getValue(discriminator, "/vaultserver")
  if(val && val.length > 0) return true
  else return false
};


async function getResources({ axios, storeGet }) {
  const owner = storeGet("/route/params/user")
  const cluster = storeGet("/route/params/cluster")

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubevault.com/v1alpha2/vaultservers`
  )

  const resources = (resp && resp.data && resp.data.items) || []

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ""
    const namespace = (item.metadata && item.metadata.namespace) || ""
    item.text = `${namespace}/${name}`
    item.value = `${namespace}/${name}`
    return true
  })
  return resources
}


function vaultRefName({ getValue, discriminator }) {
  const val = getValue(discriminator, "/vaultserver")
  let refName = ''
  if(val && val.length > 0) {
    refName = val.split('/')[1]
  }
  return refName
}


function vaultRefNamespace({ getValue, discriminator }) {
  const val = getValue(discriminator, "/vaultserver")
  let refName = ''
  if(val && val.length > 0) {
    refName = val.split('/')[0]
  }
  return refName
}


function getPluginName({storeGet}) {
  const resource = storeGet("/route/params/resource") || ''
  let plugin = ''
  if (resource === 'elasticsearches') plugin = 'elasticsearch-database-plugin'
  else if (resource === 'mariadbs') plugin = 'mysql-database-plugin'
  else if (resource === 'mongodbs') plugin = 'mongodb-database-plugin'
  else if (resource === 'mysqls') plugin = 'mysql-database-plugin'
  else if (resource === 'postgreses') plugin = 'postgresql-database-plugin'
  else if (resource === 'redises') plugin = 'redis-database-plugin'
  return plugin
}


function specRef({ model, getValue, storeGet, commit}) {
  const resource = storeGet("/route/params/resource") || ''
  let databaseRefName = ''
  if(resource === 'elasticsearches') databaseRefName='elasticsearch'
  else if (resource === 'mariadbs')  databaseRefName = 'mariadb'
  else if (resource === 'mongodbs') databaseRefName = 'mongodb'
  else if (resource === 'mysqls') databaseRefName = 'mysql'
  else if (resource === 'postgreses') databaseRefName = 'postgres'
  else if (resource === 'redises') databaseRefName = 'redis'

  const val = {
    'databaseRef': {
      'name': getDbName({storeGet}),
      'namespace': getDbNamespace({storeGet}),
    },
    'pluginName': getPluginName({storeGet}),
  }
  let spec = getValue(model, "/spec") || {}
  spec[databaseRefName] = val
  if(spec){    
    commit("wizard/model$update",  {
      path: `/spec`,
      value: spec,
      force: true,
    })
  }
}


return {
  getDbName,
  getDbVault,
  getDbNamespace,
	getResources,
  isVaultSelected,
  getPluginName,
  vaultRefName,
  vaultRefNamespace,
  specRef,
}