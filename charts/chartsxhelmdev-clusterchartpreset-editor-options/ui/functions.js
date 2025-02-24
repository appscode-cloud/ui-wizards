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
    availableModes: ['Replicaset'],
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

function checkModeToggle({ getValue, model }, db) {
  const toggle = getValue(model, `/spec/admin/databases/${db}/mode/toggle`)
  if (toggle === undefined) return true
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

function clearDefaultMode({ commit }, db) {
  commit('wizard/model$update', {
    path: `/spec/admin/databases/${db}/mode/default`,
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
    if (resp.data?.status?.projects) {
      const projects = resp.data?.status?.projects
      let projectsNamespace = []
      projectsNamespace = Object.keys(projects).map((project) => ({
        project: project,
        namespaces: projects[project].map((namespace) => ({
          text: namespace,
          value: namespace,
        })),
      }))
      return projectsNamespace
    } else {
      return resp.data?.status?.namespaces || []
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
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

function fetchModes({ model, getValue, commit }, db) {
  const arr = modes[db]?.availableModes || []
  const val = getValue(model, `/spec/admin/databases/${db}/mode/available`)
  if (!val)
    commit('wizard/model$update', {
      path: `/spec/admin/databases/${db}/mode/available`,
      value: arr,
      force: true,
    })
  return arr
}

function setDefaultMode({ getValue, model }, db) {
  const modelDef = getValue(model, `/spec/admin/databases/${db}/mode/default`)
  const def = modes[db]?.default || ''
  if (modelDef === undefined) return def
}

function setStorageClass({ getValue, model, watchDependency, commit }) {
  watchDependency('model#/spec/admin/storageClasses/available')
  const classes = getValue(model, '/spec/admin/storageClasses/available')
  if (classes.length === 1)
    commit('wizard/model$update', {
      path: '/spec/admin/storageClasses/default',
      value: classes[0],
      force: true,
    })
}

function preSelectClusterIssuer({ getValue, model, watchDependency, commit, discriminator }) {
  const val = getValue(model, '/spec/admin/tls/default')
  const clusterIssuers = getClusterIssuers({ watchDependency, getValue, discriminator })
  if (val) {
    if (clusterIssuers.length) {
      commit('wizard/model$update', {
        path: '/spec/admin/clusterIssuers/available',
        value: [clusterIssuers[0]],
        force: true,
      })
    }
  } else {
    commit('wizard/model$update', {
      path: '/spec/admin/clusterIssuers/available',
      value: '',
      force: true,
    })
  }
}

function hasMachineProfiles({ getValue, model }) {
  const val = getValue(model, '/spec/admin/machineProfiles/machines')
  return !!val
}

function isEnableProfiles({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/enableProfiles')
  return getValue(discriminator, '/enableProfiles') || false
}

function onMachineProfilesToggle({ getValue, model, commit, discriminator }) {
  const toggle = getValue(discriminator, '/enableProfiles') || false

  if (!toggle) {
    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles',
      value: { available: [], default: '', machines: [] },
      force: true,
    })
  }
}

function getMachines({ watchDependency, getValue, model }, type) {
  watchDependency(`model#/spec/admin/machineProfiles/${type}`)
  const machines = getValue(model, `/spec/admin/machineProfiles/${type}`) || []

  machines?.map((machine) => {
    machine.value = machine.id
    machine.text = machine.id
    return true
  })

  return machines
}

return {
  preSelectClusterIssuer,
  isRancherManaged,
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
  checkModeToggle,
  fetchJsons,
  presetNameEqualsTo,
  fetchModes,
  availableModes,
  setDefaultMode,
  clearDefaultMode,
  setStorageClass,
  hasMachineProfiles,
  isEnableProfiles,
  getMachines,
  onMachineProfilesToggle,
}
