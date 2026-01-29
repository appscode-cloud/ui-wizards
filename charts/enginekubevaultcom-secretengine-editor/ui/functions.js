const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  function isConsole() {
    const owner = storeGet('/route/params/user')
    const path = storeGet('/route/path')
    const prefix = `/${owner}/kubernetes`
    if (path.startsWith(prefix)) return true
    return false
  }

  async function getDatabases(group, version, resource) {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    if (isConsole()) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
          {
            params: {
              convertToTable: true,
              labelSelector: 'k8s.io/group=kubedb.com',
            },
          },
        )

        const resources = (resp && resp.data && resp.data.rows) || []

        resources.map((item) => {
          const name = (item.cells && item.cells[0].data) || ''
          const namespace = (item.cells?.length > 0 && item.cells[1].data) || ''
          const resource = (item.cells?.length > 1 && item.cells[2].data) || ''
          item.text = name
          item.value = {
            name: name,
            namespace: namespace,
            resource: resource,
          }
          return true
        })
        return resources
      } catch (e) {
        console.log(e)
        return []
      }
    }
  }

  function isDbSelected() {
    if (!isConsole()) return true
    // watchDependency('discriminator#/database')
    const val = getValue(discriminator, '/database') || {}
    return val && val.name ? true : false
  }

  function getDbName() {
    if (isConsole()) {
      // watchDependency('discriminator#/database')
      const data = getValue(discriminator, '/database') || {}
      return (data && data.name) || ''
    } else {
      const name = storeGet('/route/params/name') || ''
      return name
    }
  }

  function getEngineName() {
    // watchDependency('model#/spec/vaultRef/name')
    const val = getValue(model, '/spec/vaultRef/name') || ''
    const dbName = getDbName()
    return val && dbName ? `${dbName}-${val}` : dbName
  }

  function getDbNamespace() {
    if (isConsole()) {
      // watchDependency('discriminator#/database')
      const data = getValue(discriminator, '/database') || {}
      return (data && data.namespace) || ''
    } else {
      const namespace = storeGet('/route/query/namespace') || ''
      return namespace
    }
  }

  function isVaultSelected() {
    // watchDependency('discriminator#/vaultserver')
    const vault = getValue(discriminator, '/vaultserver') || {}
    return vault && vault.name ? true : false
  }

  async function getVaultservers(group, version, resource) {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
        {
          params: {
            filter: { items: { metadata: { name: null, namespace: null } } },
          },
        },
      )

      const resources = (resp && resp.data && resp.data.items) || []
      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        const namespace = (item.metadata && item.metadata.namespace) || ''
        item.text = `${namespace}/${name}`
        item.value = {
          name: name,
          namespace: namespace,
        }
        return true
      })
      return resources
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function vaultRefName() {
    const vault = getValue(discriminator, '/vaultserver') || {}

    let refName = ''
    if (vault && vault.name) {
      refName = vault.name
    }
    return refName
  }

  function vaultRefNamespace() {
    const vault = getValue(discriminator, '/vaultserver') || {}
    let refNamespace = ''
    if (vault && vault.namespace) {
      refNamespace = vault.namespace
    }
    return refNamespace
  }

  function getSingularResource(resource) {
    if (resource === 'elasticsearches') return 'elasticsearch'
    else if (resource === 'mariadbs') return 'mariadb'
    else if (resource === 'mongodbs') return 'mongodb'
    else if (resource === 'mysqls') return 'mysql'
    else if (resource === 'postgreses') return 'postgres'
    else if (resource === 'redises') return 'redis'
  }

  function getPluginName() {
    // watchDependency('discriminator#/database')
    const database = getValue(discriminator, '/database') || {}
    const resource = storeGet('/route/params/resource') || ''
    let singularResource = getSingularResource(resource) || ''
    if (singularResource === 'postgres') singularResource = 'postgresql'
    if (database && database.resource) {
      const databaseResource = database.resource
      singularResource = databaseResource.toLowerCase()
    }
    let plugin = ''
    if (singularResource) plugin = `${singularResource}-database-plugin`
    return plugin
  }

  function getSpecRef() {
    // watchDependency('discriminator#/database')
    const database = getValue(discriminator, '/database') || {}
    const paramResource = storeGet('/route/params/resource') || ''
    let databaseRefName = getSingularResource(paramResource) || ''
    if (database && database.resource) databaseRefName = database.resource.toLowerCase()

    const dbValue = getValue(discriminator, '/database') || {}
    const dbName = storeGet('/route/params/name') || dbValue?.name || ''
    const dbNamespace = storeGet('/route/query/namespace') || dbValue?.namespace || ''

    const val = {
      databaseRef: {
        name: dbName,
        namespace: dbNamespace,
      },
      pluginName: getPluginName(),
    }

    let spec = getValue(model, '/spec') || {}

    const temp = Object.keys(spec).filter((key) => key === 'vaultRef')
    const tempSpec = {}
    temp.forEach((key) => {
      tempSpec[key] = spec[key]
    })
    spec = tempSpec

    spec[databaseRefName] = val
    if (spec && databaseRefName) {
      commit('wizard/model$update', {
        path: `/spec`,
        value: spec,
        force: true,
      })
    }
  }

  return {
    isConsole,
    getDatabases,
    isDbSelected,
    getDbName,
    getEngineName,
    getDbNamespace,
    isVaultSelected,
    getVaultservers,
    vaultRefName,
    vaultRefNamespace,
    getSingularResource,
    getPluginName,
    getSpecRef,
  }
}
