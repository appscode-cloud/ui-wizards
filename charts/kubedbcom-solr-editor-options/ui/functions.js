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
  'custom',
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

const modeDetails = {
  Standalone: {
    description: 'Single node Solr without high availability and sharding.',
    text: 'Standalone',
  },
  Replicaset: {
    description: 'Solr ReplicaSet for high availability.',
    text: 'Replicated Cluster',
  },
  Topology: {
    description: 'Solr Topology cluster for high performance and high availability.',
    text: 'Topology Cluster',
  },
}

function showAuthPasswordField({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/createAuthSecret')
  watchDependency('discriminator#/createAuthSecret')
  return !!modelPathValue
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, value, modelPath) {
  const modelPathValue = getValue(model, modelPath)
  watchDependency('model#' + modelPath)
  return value.includes(modelPathValue)
}

function showAuthSecretField({ discriminator, getValue, watchDependency }) {
  return !showAuthPasswordField({
    discriminator,
    getValue,
    watchDependency,
  })
}

function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  const validType = ['Standalone', 'Replicaset']
  return validType.includes(modelPathValue)
}

async function getResources({ axios, storeGet }, group, version, resource) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    },
  )

  const resources = (resp && resp.data && resp.data.items) || []

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    item.text = name
    item.value = name
    return true
  })
  return resources
}

async function getMongoDbVersions({ axios, storeGet }, group, version, resource) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  }

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
    {
      params: queryParams,
    },
  )

  const resources = (resp && resp.data && resp.data.items) || []

  // keep only non deprecated versions
  const filteredMongoDbVersions = resources.filter((item) => item.spec && !item.spec.deprecated)

  filteredMongoDbVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    const specVersion = (item.spec && item.spec.version) || ''
    item.text = `${name} (${specVersion})`
    item.value = name
    return true
  })
  return filteredMongoDbVersions
}

function onCreateAuthSecretChange({ discriminator, getValue, commit }) {
  const createAuthSecret = getValue(discriminator, '/createAuthSecret')
  if (createAuthSecret) {
    commit('wizard/model$delete', '/spec/authSecret/name')
  } else if (createAuthSecret === false) {
    commit('wizard/model$delete', '/spec/authSecret/password')
  }
}

async function getSecrets({ storeGet, axios, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/release/namespace')
  watchDependency('model#/metadata/release/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    },
  )

  const secrets = (resp && resp.data && resp.data.items) || []

  const filteredSecrets = secrets.filter((item) => {
    const validType = ['kubernetes.io/service-account-token', 'Opaque']
    return validType.includes(item.type)
  })

  filteredSecrets.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    item.text = name
    item.value = name
    return true
  })
  return filteredSecrets
}

function getMachineListForOptions() {
  const array = machineList.map((item) => {
    return { text: item, value: item }
  })
  return array
}

function onMachineChange({ commit, model, getValue }, type) {
  const path = type ? `/spec/${type}/podResources/machine` : '/spec/podResources/machine'
  let selectedMachine = getValue(model, path)
  if (selectedMachine && selectedMachine !== 'custom') {
    const commitPathPrefix = type
      ? `/spec/${type}/podResources/resources`
      : '/spec/podResources/resources'
    commit('wizard/model$update', {
      path: `${commitPathPrefix}/requests/cpu`,
      value: machines[selectedMachine]?.resources.limits.cpu,
      force: true,
    })
    commit('wizard/model$update', {
      path: `${commitPathPrefix}/requests/memory`,
      value: machines[selectedMachine]?.resources.limits.memory,
      force: true,
    })
  }
}

function setLimits({ model, getValue, commit }, resource, type) {
  const path = type ? `/spec/${type}/podResources/machine` : '/spec/podResources/machine'
  const selectedMachine = getValue(model, path)
  const reqCommitPath = type
    ? `/spec/${type}/podResources/resources/limits/${resource}`
    : `/spec/podResources/resources/limits/${resource}`
  if (selectedMachine && selectedMachine !== 'custom') {
    if (resource === 'memory') {
      commit('wizard/model$update', {
        path: reqCommitPath,
        value: machines[selectedMachine]?.resources?.limits?.memory,
        force: true,
      })
      return machines[selectedMachine]?.resources?.limits?.memory
    }
  } else {
    const modelPath = type
      ? `/spec/${type}/podResources/resources/requests/${resource}`
      : `/spec/podResources/resources/requests/${resource}`
    const val = getValue(model, modelPath)
    if (resource === 'memory') {
      commit('wizard/model$update', {
        path: reqCommitPath,
        value: val,
        force: true,
      })
    }
    if (resource === 'cpu') return val || '250m'
    else return val || '500Mi'
  }
}

function setRequests({ getValue, model, commit }, resource, type) {
  const modelPath = type
    ? `/spec/${type}/podResources/resources/requests/${resource}`
    : `/spec/podResources/resources/requests/${resource}`
  const val = getValue(model, modelPath)
  commitPath = type
    ? `/spec/${type}/podResources/resources/limits/${resource}`
    : `/spec/podResources/resources/limits/${resource}`
  commit('wizard/model$update', {
    path: commitPath,
    value: val,
    force: true,
  })
}

function setMachineToCustom() {
  return 'custom'
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

function updateAgentValue({ commit }, val) {
  commit('wizard/model$update', {
    path: '/spec/monitoring/agent',
    value: val ? 'prometheus.io/operator' : '',
    force: true,
  })

  // update alert value depend on monitoring profile
  commit('wizard/model$update', {
    path: '/form/alert/enabled',
    value: val ? 'warning' : 'none',
    force: true,
  })
}

function getCreateNameSpaceUrl({ model, getValue, storeGet }) {
  const user = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const domain = storeGet('/domain') || ''
  if (domain.includes('bb.test')) {
    return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  } else {
    const editedDomain = domain.replace('kubedb', 'console')
    return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  }
}

const ifCapiProviderIsNotEmpty = ({ model, getValue, watchDependency }) => {
  watchDependency('model#/form/capi/provider')
  const val = getValue(model, '/form/capi/provider')
  if (val) return true
}

const showMultiselectZone = ({ model, getValue, watchDependency }) => {
  watchDependency('model#/form/capi/dedicated')
  const val = getValue(model, '/form/capi/provider')

  if (val === 'capz' && ifDedicated({ model, getValue })) return true
}

const showSelectZone = ({ model, getValue, watchDependency }) => {
  watchDependency('model#/form/capi/dedicated')
  const val = getValue(model, '/form/capi/provider')
  if (val !== 'capz' && ifDedicated({ model, getValue })) return true
}

const ifDedicated = ({ model, getValue }) => {
  const val = getValue(model, 'form/capi/dedicated')
  if (val) return true
}

const dedicatedOnChange = ({ model, getValue, commit }) => {
  const val = getValue(model, 'form/capi/dedicated')
  if (!val) {
    commit('wizard/model$delete', 'form/capi/zones')
    commit('wizard/model$delete', 'form/capi/sku')
  }
}

const ifZones = ({ model, getValue, watchDependency }) => {
  watchDependency('model#/form/capi/zones')
  watchDependency('model#/form/capi/dedicated')
  const zones = getValue(model, 'form/capi/zones') || []
  const isDedicated = getValue(model, 'form/capi/dedicated')
  if (zones.length && isDedicated) return true
}

const zonesOnChange = ({ model, getValue, commit }) => {
  const zones = getValue(model, 'form/capi/zones') || []
  if (!zones.length) commit('wizard/model$delete', 'form/capi/sku')
}

async function getZones({ storeGet, axios, model, getValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const isDedicated = getValue(model, 'form/capi/dedicated')
  if (isDedicated) {
    try {
      const resp = await axios.get(`clustersv2/${owner}/${cluster}/zones`)
      const val = resp.data.map((item) => {
        return { value: item, text: item }
      })
      return val
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

async function getSKU({ storeGet, axios, model, getValue, watchDependency }) {
  watchDependency('model#/form/capi/zones')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const zones = getValue(model, 'form/capi/zones') || []
  if (zones.length) {
    try {
      let url = `clustersv2/${owner}/${cluster}/vms?`
      if (typeof zones === 'string') {
        url += `zones=${encodeURIComponent(zones)}`
      } else {
        zones.forEach((item) => {
          url += `zones=${encodeURIComponent(item)}&`
        })
        url = url.slice(0, -1)
      }
      const resp = await axios.get(url)
      const val = resp.data.map((item) => {
        return {
          value: item.name,
          text: `${item.name} [CPU: ${item.cpu}] [Memory: ${item.memory}mb] `,
        }
      })
      return val
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

function isVariantAvailable({ storeGet }) {
  const variant = storeGet('/route/query/variant')
  return variant ? true : false
}

function setStorageClass({ model, getValue, commit, watchDependency, discriminator }) {
  const deletionPolicy = getValue(model, '/spec/deletionPolicy') || ''
  let storageClass = getValue(model, '/spec/admin/storageClasses/default') || ''
  const storageClassList = getValue(model, '/spec/admin/storageClasses/available') || []
  const suffix = '-retain'

  const simpleClassList = storageClassList.filter((item) => {
    return !item.endsWith(suffix)
  })
  const retainClassList = storageClassList.filter((item) => {
    return item.endsWith(suffix)
  })
  if (deletionPolicy === 'WipeOut' || deletionPolicy === 'Delete') {
    storageClass = simpleClassList.length ? simpleClassList[0] : retainClassList[0]
  } else {
    storageClass = retainClassList.length ? retainClassList[0] : simpleClassList[0]
  }

  const isChangeable = isToggleOn(
    { getValue, model, watchDependency, discriminator },
    'storageClasses',
  )
  if (isChangeable && storageClass) {
    commit('wizard/model$update', {
      path: '/spec/admin/storageClasses/default',
      value: storageClass,
      force: true,
    })
  }
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

let placement = []
let versions = []
let storageClass = []
let clusterIssuers = []
let nodetopologiesShared = []
let nodetopologiesDedicated = []
let features = []
async function initBundle({ commit, model, getValue, axios, storeGet, setDiscriminatorValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  let db = getValue(model, '/metadata/resource/kind')
  db = db.toLowerCase()
  let url = `clusters/${owner}/${cluster}/db-bundle?type=features,common,versions&db-singular=${db}`
  try {
    const resp = await axios.get(url)
    features = resp.data.features || []
    placement = resp.data.placementpolicies || []
    versions = resp.data.versions || []
    storageClass = resp.data.storageclasses || []
    clusterIssuers = resp.data.clusterissuers || []
    nodetopologiesDedicated = resp.data.dedicated || []
    nodetopologiesShared = resp.data.shared || []
  } catch (e) {
    console.log(e)
  }

  commit('wizard/model$update', {
    path: '/spec/deletionPolicy',
    value: getDefault({ getValue, model }, 'deletionPolicy'),
    force: true,
  })

  if (!getValue(model, `/spec/admin/databases/Solr/mode/toggle`)) {
    let defMode = getDefault({ getValue, model }, 'databases/Solr/mode') || ''
    if (defMode === '') {
      const arr = getValue(model, '/spec/databases/Solr/mode/available') || []
      if (arr.length) defMode = arr[0]
    }
    commit('wizard/model$update', {
      path: '/spec/mode',
      value: defMode,
      force: true,
    })
  }

  if (!features.includes('tls')) {
    commit('wizard/model$update', {
      path: '/spec/admin/tls/default',
      value: false,
      force: true,
    })
  }
  if (!features.includes('binding')) {
    commit('wizard/model$update', {
      path: '/spec/admin/expose/default',
      value: false,
      force: true,
    })
  }
  if (!features.includes('monitoring')) {
    commit('wizard/model$update', {
      path: '/spec/admin/monitoring/agent',
      value: '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: 'none',
      force: true,
    })
  }
  if (!features.includes('backup')) {
    commit('wizard/model$update', {
      path: '/spec/admin/archiver/default',
      value: false,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/backup/tool',
      value: '',
      force: true,
    })
  }

  setDiscriminatorValue('/bundleApiLoaded', true)
}

function fetchOptions({ model, getValue }, type) {
  let kind = getValue(model, '/metadata/resource/kind')

  if (type === 'clusterTier/placement') {
    return placement
  } else if (type === `databases/${kind}/versions`) {
    return versions
  } else if (type === 'storageClasses') {
    return storageClass
  } else if (type === 'clusterIssuers') {
    return clusterIssuers
  }

  return []
}

function getAdminOptions({ getValue, model, watchDependency }, type) {
  watchDependency('discriminator#/bundleApiLoaded')

  const options = getValue(model, `/spec/admin/${type}/available`) || []

  if (options.length === 0) {
    return fetchOptions({ model, getValue }, type)
  }
  if (type.endsWith('/mode')) {
    return (
      options?.map((item) => ({
        description: modeDetails[item]?.description || '',
        text: modeDetails[item]?.text || '',
        value: item,
      })) || []
    )
  }
  return options
}

function checkIfFeatureOn({ getValue, model }, type) {
  let val = getValue(model, `/spec/admin/${type}/toggle`)
  const backupVal = getValue(model, '/spec/backup/tool')

  if (type === 'backup') {
    return features.includes('backup') && backupVal === 'KubeStash' && val
  } else if (type === 'tls') {
    return features.includes('tls') && val
  } else if (type === 'expose') {
    return features.includes('binding') && val
  } else if (type === 'monitoring') {
    return features.includes('monitoring') && val
  } else if (type === 'archiver') {
    return features.includes('backup') && backupVal === 'KubeStash' && val
  }
}

function isToggleOn({ getValue, model, discriminator, watchDependency }, type) {
  watchDependency('discriminator#/bundleApiLoaded')
  watchDependency('model#/spec/admin/deployment/default')
  const bundleApiLoaded = getValue(discriminator, '/bundleApiLoaded')
  let deploymentType = getValue(model, `/spec/admin/deployment/default`)
  if (
    type === 'tls' ||
    type === 'backup' ||
    type === 'expose' ||
    type === 'monitoring' ||
    type === 'archiver'
  ) {
    return checkIfFeatureOn({ getValue, model }, type)
  } else if (
    type === 'clusterTier' ||
    type === 'clusterTier/placement' ||
    type === 'clusterTier/nodeTopology'
  ) {
    if (deploymentType === 'Dedicated' && bundleApiLoaded) return true
    else return false
  } else if (type === 'deployment') {
    const deploymentType = getValue(model, '/spec/admin/deployment/default')
    if (!nodetopologiesDedicated.length && deploymentType === 'Dedicated') {
      commit('wizard/model$update', {
        path: '/spec/admin/deployment/default',
        value: 'Shared',
        force: true,
      })
    }
    return (
      getValue(model, `/spec/admin/${type}/toggle`) &&
      nodetopologiesDedicated.length &&
      bundleApiLoaded
    )
  } else return getValue(model, `/spec/admin/${type}/toggle`) && bundleApiLoaded
}

async function getNodeTopology({ model, getValue, axios, storeGet, watchDependency }) {
  watchDependency('model#/spec/admin/deployment/default')
  watchDependency('model#/spec/admin/clusterTier/default')
  const deploymentType = getValue(model, '/spec/admin/deployment/default') || ''
  const clusterTier = getValue(model, '/spec/admin/clusterTier/default') || ''
  let nodeTopologyList = getValue(model, `/spec/admin/clusterTier/nodeTopology/available`) || []

  const provider = storeGet('/cluster/clusterDefinition/result/provider') || ''

  if (deploymentType === 'Shared') nodeTopologyList = nodetopologiesShared
  else if (deploymentType === 'Dedicated') nodeTopologyList = nodetopologiesDedicated

  const filteredList = filterNodeTopology(nodeTopologyList, clusterTier, provider)
  return filteredList
}

function filterNodeTopology(list, tier, provider) {
  // first filter the list from value that exists from the filtered list got from API
  const filteredlist = list

  // filter the list based on clusterTier
  if (provider === 'EKS') {
    return filteredlist.filter((item) => {
      if (tier === 'CPUOptimized') return item.startsWith('c')
      else if (tier === 'MemoryOptimized') return item.startsWith('r')
      else return !item.startsWith('c') && !item.startsWith('r')
    })
  } else if (provider === 'AKS') {
    return filteredlist.filter((item) => {
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
    return filteredlist.filter((item) => {
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
  } else return filteredlist
}

function returnFalse() {
  return false
}

function isMachineNotCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path ? `/spec/${path}/podResources/machine` : '/spec/podResources/machine'
  const modelPathValue = getValue(model, fullpath)
  watchDependency(`model#${fullpath}`)
  return modelPathValue !== 'custom' && !!modelPathValue
}

function onAuthChange({ getValue, discriminator, commit }) {
  const isAuthOn = getValue(discriminator, '/createAuthSecret')
  if (!isAuthOn) {
    commit('wizard/model$update', {
      path: '/spec/authSecret/name',
      value: '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/authSecret/password',
      value: '',
      force: true,
    })
  }
}

function clearConfiguration({ discriminator, getValue, commit }) {
  const configOn = getValue(discriminator, '/configDatabase')

  if (!configOn) {
    commit('wizard/model$delete', '/spec/configuration')
  }
}

function isConfigDatabaseOn({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/configDatabase')
  return getValue(discriminator, '/configDatabase')
}

function showIssuer({ model, getValue, watchDependency, discriminator }) {
  watchDependency('model#/spec/admin/tls/default')
  const isTlsEnabled = getValue(model, '/spec/admin/tls/default')
  const isIssuerToggleEnabled = isToggleOn(
    { getValue, model, watchDependency, discriminator },
    'clusterIssuers',
  )
  return isTlsEnabled && isIssuerToggleEnabled
}

function setMonitoring({ getValue, model }) {
  const agent = getValue(model, '/spec/admin/monitoring/agent') || ''
  return !!agent
}

function updateAlertValue({ commit, model, discriminator, getValue }) {
  const isMonitorEnabled = getValue(discriminator, '/monitoring')
  const alert = isMonitorEnabled ? 'warning' : 'none'
  // update alert value depend on monitoring profile
  commit('wizard/model$update', {
    path: '/form/alert/enabled',
    value: alert,
    force: true,
  })
  const agent = isMonitorEnabled ? 'prometheus.io/operator' : ''
  commit('wizard/model$update', {
    path: '/spec/admin/monitoring/agent',
    value: agent,
    force: true,
  })
}

function showAlerts({ watchDependency, model, getValue, discriminator }) {
  watchDependency('discriminator#/monitoring')
  const isMonitorEnabled = getValue(discriminator, '/monitoring')
  return (
    isMonitorEnabled && isToggleOn({ getValue, model, watchDependency, discriminator }, 'alert')
  )
}

function onBackupSwitch({ discriminator, getValue, commit }) {
  const isBackupOn = getValue(discriminator, '/backup')
  commit('wizard/model$update', {
    path: '/spec/backup/tool',
    value: isBackupOn ? 'KubeStash' : '',
    force: true,
  })
}

function setBackup({ model, getValue }) {
  const backup = getValue(model, '/spec/backup/tool')
  const val = getValue(model, '/spec/admin/backup/default')
  return backup === 'KubeStash' && features.includes('backup') && val
}

async function getAppBindings({ commit, axios, storeGet, model, getValue }) {
  const namespace = getValue(model, '/metadata/release/namespace')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { type: null },
      },
    },
  }
  setNamespace({ commit, model, getValue })
  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/appcatalog.appscode.com/v1alpha1/appbindings`,
      {
        params: queryParams,
      },
    )

    const resources = (resp && resp.data && resp.data.items) || []

    const fileredResources = resources
      .filter((item) => item.spec?.type === 'kubedb.com/zookeeper')
      .map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return {
          text: `${namespace}/${name}`,
          value: name,
        }
      })
    return fileredResources
  } catch (e) {
    console.log(e)
    return []
  }
}

function setNamespace({ commit, model, getValue }) {
  let modelPathValue = getValue(model, '/metadata/release/namespace')
  if (modelPathValue) {
    commit('wizard/model$update', {
      path: '/spec/zookeeperRef/namespace',
      value: modelPathValue,
      force: true,
    })
  }
}

function showAdditionalSettings({ watchDependency }) {
  watchDependency('discriminator#/bundleApiLoaded')
  return features.length
}

function getDefault({ getValue, model }, type) {
  const val = getValue(model, `/spec/admin/${type}/default`) || ''
  return val
}

return {
  initBundle,
  returnFalse,
  setLimits,
  setRequests,
  onMachineChange,
  setNamespace,
  getAppBindings,
  isVariantAvailable,
  fetchJsons,
  showAuthPasswordField,
  isEqualToModelPathValue,
  showAuthSecretField,
  showStorageSizeField,
  getResources,
  getMongoDbVersions,
  onCreateAuthSecretChange,
  getSecrets,
  getMachineListForOptions,
  setMachineToCustom,
  updateAgentValue,
  getCreateNameSpaceUrl,
  ifCapiProviderIsNotEmpty,
  ifDedicated,
  dedicatedOnChange,
  ifZones,
  zonesOnChange,
  getZones,
  getSKU,
  showMultiselectZone,
  showSelectZone,
  setStorageClass,
  getNamespaces,
  isToggleOn,
  getAdminOptions,
  getNodeTopology,
  filterNodeTopology,
  isMachineNotCustom,
  onAuthChange,
  clearConfiguration,
  isConfigDatabaseOn,
  showIssuer,
  setMonitoring,
  updateAlertValue,
  showAlerts,
  onBackupSwitch,
  setBackup,
  getDefault,
  showAdditionalSettings,
}
