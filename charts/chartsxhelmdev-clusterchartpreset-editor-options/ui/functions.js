function getOptions({ getValue, model }, type) {
  const options = getValue(model, `/spec/kubeDB/${type}/available`) || []
  return options
}

let nodeTopologyListFromApi = []
let nodeTopologyApiCalled = false
let provider = ''

async function getNodeTopology({ model, getValue, axios, storeGet, watchDependency }) {
  watchDependency('model#/spec/kubeDB/deployment/default')
  watchDependency('model#/spec/kubeDB/clusterTier/default')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const deploymentType = getValue(model, '/spec/kubeDB/deployment/default') || ''
  const clusterTier = getValue(model, '/spec/kubeDB/clusterTier/default') || ''
  const nodeTopologyList = getValue(model, `/spec/kubeDB/clusterTier/nodeTopology/available`) || []
  let mappedResp = []

  if (!nodeTopologyApiCalled) {
    console.log('')
    try {
      const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
      const resp = await axios.get(url)
      nodeTopologyListFromApi = resp.data?.items
      nodeTopologyApiCalled = true
      const filteredResp = resp.data?.items.filter(
        (item) =>
          item.metadata.labels?.['node.k8s.appscode.com/tenancy'] === deploymentType.toLowerCase(),
      )
      mappedResp = filteredResp?.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return name
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    const filteredResp = nodeTopologyListFromApi.filter(
      (item) =>
        item.metadata.labels?.['node.k8s.appscode.com/tenancy'] === deploymentType.toLowerCase(),
    )
    mappedResp = filteredResp?.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })
  }

  const statusUrl = `/clustersv2/${owner}/${cluster}/status`
  if (provider.length === 0) {
    try {
      const resp = await axios.get(statusUrl)
      provider = resp.data?.provider
    } catch (e) {
      console.log(e)
    }
  }

  const filteredList = filterNodeTopology(nodeTopologyList, clusterTier, provider, mappedResp)
  console.log(nodeTopologyList)
  console.log(filteredList)
  return filteredList
}

function filterNodeTopology(list, tier, provider, mappedList) {
  // first filter the list from value that exists from the filtered list got from API
  const filteredList = list.filter((item) => {
    return mappedList.includes(item)
  })

  // filter the list based on clusterTier
  if (provider === 'EKS') {
    return filteredList.filter((item) => {
      if (tier === 'CPUOptimized') return item.startsWith('c')
      else if (tier === 'MemoryOptimized') return item.startsWith('r')
      else return !item.startsWith('c') && !item.startsWith('r')
    })
  } else if (provider === 'AKS') {
    return filteredList.filter((item) => {
      if (tier === 'CPUOptimized') return item.startsWith('f') || item.startsWith('fx')
      else if (tier === 'MemoryOptimized')
        return (
          item.startsWith('e') ||
          item.startsWith('eb') ||
          item.startsWith('ec') ||
          item.startsWith('m') ||
          item.startsWith('d')
        )
      else
        return (
          !(item.startsWith('f') || item.startsWith('fx')) &&
          !(
            item.startsWith('e') ||
            item.startsWith('eb') ||
            item.startsWith('ec') ||
            item.startsWith('m') ||
            item.startsWith('d')
          )
        )
    })
  } else if (provider === 'GKE') {
    return filteredList.filter((item) => {
      if (tier === 'CPUOptimized')
        return item.startsWith('h3') || item.startsWith('c2') || item.startsWith('c2d')
      else if (tier === 'MemoryOptimized')
        return (
          item.startsWith('x4') ||
          item.startsWith('m1') ||
          item.startsWith('m2') ||
          item.startsWith('m3')
        )
      else
        return (
          !(item.startsWith('h3') || item.startsWith('c2') || item.startsWith('c2d')) &&
          !(
            item.startsWith('x4') ||
            item.startsWith('m1') ||
            item.startsWith('m2') ||
            item.startsWith('m3')
          )
        )
    })
  }
}

function isConfigureDb({ getValue, discriminator, watchDependency }, value) {
  watchDependency(`discriminator#/${value}`)
  const resp = getValue(discriminator, `/${value}`)
  return resp
}

const isApiCalled = {
  clickhouse: false,
  configureDruid: false,
  configureElasticsearch: false,
  configureFerretDB: false,
  configureKafka: false,
  configureMSSQLServer: false,
  configureMariaDB: false,
  configureMemcached: false,
  configureMongoDB: false,
  configureMySQL: false,
  configurePerconaXtraDB: false,
  configurePgBouncer: false,
  configurePgpool: false,
  configurePostgres: false,
  configureProxySQL: false,
  configureRabbitMQ: false,
  configureRedis: false,
  configureSinglestore: false,
  configureSolr: false,
  configureZooKeeper: false,
}

const apiData = {
  clickhouse: [],
  configureDruid: [],
  configureElasticsearch: [],
  configureFerretDB: [],
  configureKafka: [],
  configureMSSQLServer: [],
  configureMariaDB: [],
  configureMemcached: [],
  configureMongoDB: [],
  configureMySQL: [],
  configurePerconaXtraDB: [],
  configurePgBouncer: [],
  configurePgpool: [],
  configurePostgres: [],
  configureProxySQL: [],
  configureRabbitMQ: [],
  configureRedis: [],
  configureSinglestore: [],
  configureSolr: [],
  configureZooKeeper: [],
}

async function FetchDbVersions({ storeGet, axios }, db) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/${db}versions`
  if (!isApiCalled[db]) {
    const resp = await axios.get(url)
    apiData[db] = resp.data.items.map((item) => {
      return {
        text: item.spec.version,
        value: item.spec.version,
      }
    })
    isApiCalled[db] = true
  }
  return apiData[db]
}

function clearDefaultVersion({ commit }, db) {
  console.log('changed')
  commit('wizard/model$update', {
    path: `/spec/kubeDB/databases/${db}/versions/default`,
    value: '',
    force: true,
  })
}

function availableVersions({ getValue, model, watchDependency }, db) {
  watchDependency(
    `schema#/properties/spec/properties/kubeDB/properties/databases/properties/${db}/properties/versions/properties/available`,
  )
  console.log(getValue(model, `/spec/kubeDB/databases/${db}/versions/available`))
  return getValue(model, `/spec/kubeDB/databases/${db}/versions/available`)
}

return {
  getOptions,
  getNodeTopology,
  isConfigureDb,
  FetchDbVersions,
  availableVersions,
  clearDefaultVersion,
}
