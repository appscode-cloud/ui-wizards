const modes = {
  ClickHouse: {
    availableModes: ['Standalone', 'Topology'],
    default: 'Topology',
  },
  Druid: {
    availableModes: ['Topology'],
    default: 'Topology',
  },
  Elasticsearch: {
    availableModes: ['Combined', 'Topology'],
    default: 'Topology',
  },
  FerretDB: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  Kafka: {
    availableModes: ['Combined', 'Topology'],
    default: 'Topology',
  },
  MSSQLServer: {
    availableModes: ['Standalone', 'Topology'],
    default: 'Topology',
  },
  MariaDB: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  Memcached: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  MongoDB: {
    availableModes: ['Standalone', 'Replicaset', 'Sharded'],
    default: 'Replicaset',
  },
  MySQL: {
    availableModes: ['Standalone', 'GroupReplication', 'InnoDBCluster'],
    default: 'GroupReplication',
  },
  PerconaXtraDB: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  PgBouncer: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  Pgpool: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  Postgres: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  ProxySQL: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  RabbitMQ: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
  Redis: {
    availableModes: ['Standalone', 'Cluster', 'Sentinel'],
    default: 'Cluster',
  },
  Singlestore: {
    availableModes: ['Standalone', 'Topology'],
    default: 'Topology',
  },
  Solr: {
    availableModes: ['Standalone', 'Replicaset', 'Topology'],
    default: 'Topology',
  },
  ZooKeeper: {
    availableModes: ['Standalone', 'Replicaset'],
    default: 'Replicaset',
  },
}

function setTool({ commit }) {
  commit('wizard/model$update', {
    path: '/spec/backup/tool',
    value: 'KubeStash',
    force: true,
  })
  return 'KubeStash'
}

function returnFalse() {
  return false
}

function returnTrue() {
  return true
}

async function fetchJsons({ axios, itemCtx }) {
  let ui = {}
  let language = {}
  let functions = {}
  const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
    )
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || '')
    functions = evalFunc()
  } catch (e) {
    console.log(e)
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  }
}

function presetNameEqualsTo({ storeGet }, value) {
  const presetName = storeGet('/route/params/presetName') || ''
  return presetName === value
}

function getOptions({ getValue, model, watchDependency }, type) {
  watchDependency(`model#/spec/admin/${type}/available`)
  const options = getValue(model, `/spec/admin/${type}/available`)
  return options
}

async function FetchAllDbVersions({ storeGet, axios, setDiscriminatorValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/all-available`

  const resp = await axios.get(url)

  setDiscriminatorValue(`/allDbVersions`, resp.data)
  return resp.data
}

function isConfigureDb({ getValue, discriminator, watchDependency }, value) {
  watchDependency(`discriminator#/${value}/isConfigure`)
  const resp = getValue(discriminator, `/${value}/isConfigure`)
  return resp
}

async function FetchDbVersions({ watchDependency, getValue, discriminator }, db) {
  watchDependency(`discriminator#/allDbVersions`)
  data = getValue(discriminator, `allDbVersions/${db}Version`)
  return data
}

function clearDefaultVersion({ commit }, db) {
  commit('wizard/model$update', {
    path: `/spec/admin/databases/${db}/versions/default`,
    value: '',
    force: true,
  })
}

function availableVersions({ getValue, model, watchDependency }, db) {
  watchDependency(`model#/spec/admin/databases/${db}/versions/available`)
  return getValue(model, `/spec/admin/databases/${db}/versions/available`)
}

function availableModes({ getValue, model, watchDependency }, db) {
  watchDependency(`model#/spec/admin/databases/${db}/mode/available`)
  return getValue(model, `/spec/admin/databases/${db}/mode/available`)
}

function isKubedbPresetEnable(storeGet) {
  const featureSets = storeGet('/cluster/featureSets/result') || []
  const featureSetName = storeGet('/route/params/featureset') || ''
  const featureSet = featureSets.find((item) => item?.metadata?.name === featureSetName)

  const features = featureSet?.status?.features || []
  const isKubedbPresetEnable = features.some((feature) => {
    if (feature.name === 'kubedb-ui-presets') return true
  })
  return isKubedbPresetEnable
}

async function FetchDbBundle({ axios, storeGet, setDiscriminatorValue, discriminator }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/db-bundle?type=common&deployment=all`
  try {
    const resp = await axios.get(url)
    setDiscriminatorValue('/bundle', resp.data)
  } catch (e) {
    console.log(e)
    return []
  }
}

function getPlacements({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/bundle')
  const placements = getValue(discriminator, '/bundle/placementpolicies')

  return placements
}

function getNodeTopology({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/bundle')
  const shared = getValue(discriminator, '/bundle/shared')
  const dedicated = getValue(discriminator, '/bundle/dedicated')

  const nodeTopology = []

  shared?.map((item) => {
    nodeTopology.push(item + ' (shared)')
  })
  dedicated?.map((item) => {
    nodeTopology.push(item + ' (dedicated)')
  })

  return nodeTopology
}

function getStorageClass({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/bundle')
  const storageClasses = getValue(discriminator, '/bundle/storageclasses')

  return storageClasses
}

function getClusterIssuers({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/bundle')
  const clusterIssuers = getValue(discriminator, '/bundle/clusterissuers')

  return clusterIssuers
}

async function getNamespaces({ axios, storeGet }) {
  const params = storeGet('/route/params')
  const { user, cluster, group, version, resource } = params
  try {
    const resp = await axios.post(
      `/clusters/${user}/${cluster}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`,
      {
        apiVersion: 'identity.k8s.appscode.com/v1alpha1',
        kind: 'SelfSubjectNamespaceAccessReview',
        spec: {
          resourceAttributes: [
            {
              verb: 'create',
              group: group,
              version: version,
              resource: resource,
            },
          ],
        },
      },
    )
    const namespaces = resp?.data?.status?.namespaces || []
    return namespaces
  } catch (e) {
    console.log(e)
    return []
  }
}

function setTool({ commit }) {
  commit('wizard/model$update', {
    path: '/spec/backup/tool',
    value: 'KubeStash',
    force: true,
  })
  return 'KubeStash'
}

async function fetchJsons({ axios, itemCtx }) {
  let ui = {}
  let language = {}
  let functions = {}
  const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
    )
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || '')
    functions = evalFunc()
  } catch (e) {
    console.log(e)
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  }
}

function isKubedbUiPreset({ getValue, watchDependency, discriminator, storeGet }) {
  const presetName = storeGet('/route/params/presetName') || ''
  if (presetName === 'kubedb-ui-presets') return true
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  watchDependency('discriminator#/enabledFeatures')
  if (enabledFeatures?.includes('kubedb-ui-presets')) {
    return true
  } else return false
}

function fetchModes({ commit }, db) {
  const arr = modes[db]?.availableModes || []
  commit('wizard/model$update', {
    path: `/spec/admin/databases/${db}/mode/available`,
    value: arr,
    force: true,
  })
  return arr
}

function setDefaultMode({}, db) {
  const def = modes[db]?.default || ''
  return def
}

return {
  getOptions,
  getNodeTopology,
  FetchAllDbVersions,
  isConfigureDb,
  FetchDbVersions,
  availableVersions,
  clearDefaultVersion,
  getPlacements,
  getStorageClass,
  getClusterIssuers,
  getNamespaces,
  isKubedbUiPreset,
  FetchDbBundle,
  setTool,
  returnFalse,
  returnTrue,
  fetchJsons,
  presetNameEqualsTo,
  fetchModes,
  availableModes,
  setDefaultMode,
}
