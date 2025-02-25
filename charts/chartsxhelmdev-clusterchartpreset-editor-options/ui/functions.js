const machines = {
  'db.t.micro': {
    resources: {
      requests: {
        cpu: '250m',
        memory: '512Mi',
      },
      limits: {
        cpu: '500m',
        memory: '1Gi',
      },
    },
  },
  'db.t.small': {
    resources: {
      requests: {
        cpu: '1',
        memory: '1Gi',
      },
      limits: {
        cpu: '2',
        memory: '2Gi',
      },
    },
  },
  'db.t.medium': {
    resources: {
      requests: {
        cpu: '1',
        memory: '2Gi',
      },
      limits: {
        cpu: '2',
        memory: '4Gi',
      },
    },
  },
  'db.t.large': {
    resources: {
      requests: {
        cpu: '1',
        memory: '4Gi',
      },
      limits: {
        cpu: '2',
        memory: '8Gi',
      },
    },
  },
  'db.t.xlarge': {
    resources: {
      requests: {
        cpu: '2',
        memory: '8Gi',
      },
      limits: {
        cpu: '4',
        memory: '16Gi',
      },
    },
  },
  'db.t.2xlarge': {
    resources: {
      requests: {
        cpu: '4',
        memory: '16Gi',
      },
      limits: {
        cpu: '8',
        memory: '32Gi',
      },
    },
  },
  'db.m.small': {
    resources: {
      requests: {
        cpu: '500m',
        memory: '912680550',
      },
      limits: {
        cpu: '1',
        memory: '1825361100',
      },
    },
  },
  'db.m.large': {
    resources: {
      requests: {
        cpu: '1',
        memory: '4Gi',
      },
      limits: {
        cpu: '2',
        memory: '8Gi',
      },
    },
  },
  'db.m.xlarge': {
    resources: {
      requests: {
        cpu: '2',
        memory: '8Gi',
      },
      limits: {
        cpu: '4',
        memory: '16Gi',
      },
    },
  },
  'db.m.2xlarge': {
    resources: {
      requests: {
        cpu: '4',
        memory: '16Gi',
      },
      limits: {
        cpu: '8',
        memory: '32Gi',
      },
    },
  },
  'db.m.4xlarge': {
    resources: {
      requests: {
        cpu: '8',
        memory: '32Gi',
      },
      limits: {
        cpu: '16',
        memory: '64Gi',
      },
    },
  },
  'db.m.8xlarge': {
    resources: {
      requests: {
        cpu: '16',
        memory: '64Gi',
      },
      limits: {
        cpu: '32',
        memory: '128Gi',
      },
    },
  },
  'db.m.12xlarge': {
    resources: {
      requests: {
        cpu: '24',
        memory: '96Gi',
      },
      limits: {
        cpu: '48',
        memory: '192Gi',
      },
    },
  },
  'db.m.16xlarge': {
    resources: {
      requests: {
        cpu: '32',
        memory: '128Gi',
      },
      limits: {
        cpu: '64',
        memory: '256Gi',
      },
    },
  },
  'db.m.24xlarge': {
    resources: {
      requests: {
        cpu: '48',
        memory: '192Gi',
      },
      limits: {
        cpu: '96',
        memory: '384Gi',
      },
    },
  },
  'db.r.large': {
    resources: {
      requests: {
        cpu: '1',
        memory: '8Gi',
      },
      limits: {
        cpu: '2',
        memory: '16Gi',
      },
    },
  },
  'db.r.xlarge': {
    resources: {
      requests: {
        cpu: '2',
        memory: '16Gi',
      },
      limits: {
        cpu: '4',
        memory: '32Gi',
      },
    },
  },
  'db.r.2xlarge': {
    resources: {
      requests: {
        cpu: '4',
        memory: '32Gi',
      },
      limits: {
        cpu: '8',
        memory: '64Gi',
      },
    },
  },
  'db.r.4xlarge': {
    resources: {
      requests: {
        cpu: '8',
        memory: '96Gi',
      },
      limits: {
        cpu: '16',
        memory: '192Gi',
      },
    },
  },
  'db.r.8xlarge': {
    resources: {
      requests: {
        cpu: '16',
        memory: '128Gi',
      },
      limits: {
        cpu: '32',
        memory: '256Gi',
      },
    },
  },
  'db.r.12xlarge': {
    resources: {
      requests: {
        cpu: '24',
        memory: '192Gi',
      },
      limits: {
        cpu: '48',
        memory: '384Gi',
      },
    },
  },
  'db.r.16xlarge': {
    resources: {
      requests: {
        cpu: '32',
        memory: '256Gi',
      },
      limits: {
        cpu: '64',
        memory: '512Gi',
      },
    },
  },
  'db.r.24xlarge': {
    resources: {
      requests: {
        cpu: '24',
        memory: '384Gi',
      },
      limits: {
        cpu: '96',
        memory: '768Gi',
      },
    },
  },
}

const machineList = [
  'db.t.micro',
  'db.t.small',
  'db.t.medium',
  'db.t.large',
  'db.t.xlarge',
  'db.t.2xlarge',
  'db.m.small',
  'db.m.large',
  'db.m.xlarge',
  'db.m.2xlarge',
  'db.m.4xlarge',
  'db.m.8xlarge',
  'db.m.12xlarge',
  'db.m.16xlarge',
  'db.m.24xlarge',
  'db.r.large',
  'db.r.xlarge',
  'db.r.2xlarge',
  'db.r.4xlarge',
  'db.r.8xlarge',
  'db.r.12xlarge',
  'db.r.16xlarge',
  'db.r.24xlarge',
]

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

function hasMachineProfiles({ getValue, model, commit }) {
  const val = getValue(model, '/spec/admin/machineProfiles/machines')
  commit('wizard/model$update', {
    path: '/spec/admin/machineProfiles/machines',
    value: sortMachines(val),
    force: true,
  })

  return !!val
}

function isEnableProfiles({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/enableProfiles')
  return getValue(discriminator, '/enableProfiles') || false
}

function onMachineProfilesToggle({ getValue, commit, discriminator }) {
  const toggle = getValue(discriminator, '/enableProfiles') || false

  if (!toggle) {
    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles',
      value: { available: [], default: '', machines: [] },
      force: true,
    })
  }
}

function getMachines({ watchDependency, getValue, model, commit }, type) {
  watchDependency(`model#/spec/admin/machineProfiles/${type}`)
  const machines = getValue(model, `/spec/admin/machineProfiles/${type}`) || []

  if (type === 'machines')
    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: sortMachines(machines),
      force: true,
    })

  machines?.map((machine) => {
    machine.value = machine.id
    machine.text = machine.id
    return true
  })

  return machines
}

function isKnownProfileChosen({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/profileChoseSwitch')
  const val = getValue(discriminator, '/profileChoseSwitch')
  return val
}

function getKnownProfile({ getValue, model }) {
  const machineProfiles = getValue(model, '/spec/admin/machineProfiles/machines')

  // filtering machine list, if it's already in the model we don't need to show it
  const filteredMachines = machineList.filter(
    (machine) => !machineProfiles.some((m) => m.id === machine),
  )
  return filteredMachines
}

function setLimits({ getValue, discriminator, watchDependency }, type) {
  watchDependency('discriminator#/profile')
  const pro = getValue(discriminator, '/profile') || ''
  const profileDetails = machines[pro] || {}
  const limits = profileDetails.resources?.limits || {}
  return limits[type] || ''
}

function getProfileName({ watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/profile')
  const pro = getValue(discriminator, '/profile') || ''
  return pro
}

function parseMemory(memory) {
  const units = {
    K: 1, // Base unit (KiB)
    M: 1024, // 1 M = 1024 K
    MB: 1024, // 1 MB = 1024 K
    Mi: 1000, // 1 Mi = 1000 K
    G: 1024 * 1024, // 1 G = 1024 M
    GB: 1024 * 1024, // 1 GB = 1024 M
    Gi: 1000 * 1000, // 1 Gi = 1000 M
    T: 1024 * 1024 * 1024, // 1 T = 1024 G
    TB: 1024 * 1024 * 1024, // 1 TB = 1024 G
    Ti: 1000 * 1000 * 1000, // 1 Ti = 1000 G
    P: 1024 * 1024 * 1024 * 1024, // 1 P = 1024 T
    PB: 1024 * 1024 * 1024 * 1024, // 1 PB = 1024 T
    Pi: 1000 * 1000 * 1000 * 1000, // 1 Pi = 1000 T
  }

  const match = memory.match(/^(\d+)(K|M|MB|Mi|G|GB|Gi|T|TB|Ti|P|PB|Pi)$/)
  if (match) {
    return parseInt(match[1]) * (units[match[2]] || 1)
  }
  return 0 // Default fallback for unexpected formats
}

function sortMachines(arr) {
  return arr.sort((a, b) => {
    const memA = parseMemory(a.limits.memory)
    const memB = parseMemory(b.limits.memory)

    if (memA !== memB) {
      return memA - memB
    }
    return a.limits.cpu - b.limits.cpu
  })
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
  isKnownProfileChosen,
  getKnownProfile,
  setLimits,
  getProfileName,
}
