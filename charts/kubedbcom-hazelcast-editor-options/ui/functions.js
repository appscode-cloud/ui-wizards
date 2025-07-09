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
  Combined: {
    description: 'Hazelcast cluster with all node-role enabled.',
    text: 'Combined Cluster',
  },
  Topology: {
    description: 'Hazelcast cluster with dedicated node-role.',
    text: 'Topology Cluster',
  },
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, value, modelPath) {
  const modelPathValue = getValue(model, modelPath)
  watchDependency('model#' + modelPath)
  return modelPathValue === value
}

function showAuthSecretField({ discriminator, getValue, watchDependency }) {
  return !showAuthPasswordField({
    discriminator,
    getValue,
    watchDependency,
  })
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

async function getMySqlVersions({ axios, storeGet }, group, version, resource) {
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
  const filteredMySqlVersions = resources.filter((item) => item.spec && !item.spec.deprecated)

  filteredMySqlVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    const specVersion = (item.spec && item.spec.version) || ''
    item.text = `${name} (${specVersion})`
    item.value = name
    return true
  })
  return filteredMySqlVersions
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

  if (owner && cluster && namespace) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        {
          params: {
            filter: {
              items: {
                data: { username: null, password: null },
                metadata: { name: null },
                type: null,
              },
            },
          },
        },
      )

      const secrets = (resp && resp.data && resp.data.items) || []

      const filteredSecrets = secrets.filter((item) => {
        const validType = [
          'kubernetes.io/service-account-token',
          'Opaque',
          'kubernetes.io/basic-auth',
        ]
        return validType.includes(item.type)
      })

      filteredSecrets.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        item.text = name
        item.value = name
        return true
      })
      return filteredSecrets
    } catch (e) {
      console.log(e)
    }
  }
  return []
}

function getMachineListForOptions({ model, getValue }) {
  const machinesFromPreset = getValue(model, '/spec/admin/machineProfiles/machines')
  const available = getValue(model, '/spec/admin/machineProfiles/available')
  let array = []

  if (available.length) {
    array = available.map((machine) => {
      if (machine === 'custom') return { text: machine, value: machine }
      else {
        let subText = '',
          text = ''
        const machineData = machinesFromPreset.find((val) => val.id === machine)
        if (machineData) {
          subText = `CPU: ${machineData.limits.cpu}, Memory: ${machineData.limits.memory}`
          text = machineData.name ? machineData.name : machineData.id
        }
        return { text, subText, value: machine }
      }
    })
  } else {
    array = machineList
      .map((machine) => {
        if (machine === 'custom') return { text: machine, value: machine }
        const subText = `CPU: ${machines[machine].resources.limits.cpu}, Memory: ${machines[machine].resources.limits.memory}`
        const text = machine
        return { text, subText, value: machine }
      })
      .filter((val) => !!val)
  }
  return array
}

function setMachineToCustom({ getValue, model }) {
  const machine = getValue(model, '/spec/admin/machineProfiles/default')
  return machine || 'custom'
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

function setReplicaNumber({ model, getValue }) {
  const modelPathValue = getValue(model, '/spec/mode')
  if (modelPathValue === 'Topology') {
    return 2
  } else return 1
}
function setRouterNumber({ model, getValue }) {
  const modelPathValue = getValue(model, '/spec/mode')
  if (modelPathValue === 'Topology') {
    return 3
  } else return 1
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

function setStorageClass({ model, getValue, commit, discriminator, watchDependency }) {
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
    { getValue, model, discriminator, watchDependency },
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

function showAlerts({ watchDependency, model, getValue, discriminator }) {
  watchDependency('discriminator#/monitoring')
  const isMonitorEnabled = getValue(discriminator, '/monitoring')
  return (
    isMonitorEnabled && isToggleOn({ getValue, model, discriminator, watchDependency }, 'alert')
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

function clearArbiterHidden({ commit }) {
  commit('wizard/model$update', {
    path: `/spec/arbiter/enabled`,
    value: false,
    force: true,
  })

  commit('wizard/model$update', {
    path: `/spec/hidden/enabled`,
    value: false,
    force: true,
  })
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
  const namespace = getValue(model, '/metadata/release/namespace')

  let db = getValue(model, '/metadata/resource/kind')
  db = db.toLowerCase()
  let url = `clusters/${owner}/${cluster}/db-bundle?type=features,common,versions&db-singular=${db}`
  const annotationUrl = `clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}`

  try {
    const resp = await axios.get(url)
    features = resp.data.features || []
    placement = resp.data.placementpolicies || []
    versions = resp.data.versions || []
    storageClass = resp.data.storageclasses || []
    clusterIssuers = resp.data.clusterissuers || []
    nodetopologiesDedicated = resp.data.dedicated || []
    nodetopologiesShared = resp.data.shared || []

    const response = await axios.get(annotationUrl)
    const annotations = response.data?.metadata?.annotations || {}
    const uidRange = annotations['openshift.io/sa.scc.uid-range']
    if (uidRange) {
      const val = uidRange.split('/')[0]
      commit('wizard/model$update', {
        path: '/spec/openshift/securityContext/runAsUser',
        value: val,
        force: true,
      })
    }
  } catch (e) {
    console.log(e)
  }

  commit('wizard/model$update', {
    path: '/spec/deletionPolicy',
    value: getDefault({ getValue, model }, 'deletionPolicy'),
    force: true,
  })

  if (!getValue(model, `/spec/admin/databases/Hazelcast/mode/toggle`)) {
    let defMode = getDefault({ getValue, model }, 'databases/Hazelcast/mode') || ''
    if (defMode === '') {
      const arr = getValue(model, '/spec/databases/Hazelcast/mode/available') || []
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
      path: '/spec/admin/archiver/enable/default',
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

function fetchOptions({ model, getValue, commit }, type) {
  let kind = getValue(model, '/metadata/resource/kind')

  let returnArray = []
  if (type === 'clusterTier/placement') {
    returnArray = placement
  } else if (type === `databases/${kind}/versions`) {
    returnArray = versions
  } else if (type === 'storageClasses') {
    returnArray = storageClass
  } else if (type === 'clusterIssuers') {
    returnArray = clusterIssuers
  }

  if (returnArray.length === 1) {
    const path = `/spec/admin/${type}/default`
    commit('wizard/model$update', {
      path: path,
      value: returnArray[0],
      force: true,
    })
  }

  return returnArray
}

let archiverMap = []
let archiverCalled = false

function getAdminOptions({ getValue, axios, model, watchDependency, storeGet, commit }, type) {
  watchDependency('discriminator#/bundleApiLoaded')

  if (type === 'storageClasses' && !archiverCalled) {
    getArchiverName({ axios, storeGet })
  }

  const options = getValue(model, `/spec/admin/${type}/available`) || []

  if (options.length === 0) {
    return fetchOptions({ model, getValue, commit }, type)
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
  if (type === 'backup' || type === 'archiver') {
    val = getValue(model, `/spec/admin/${type}/enable/toggle`)
  }
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

function isConfigDatabaseOn({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/configDatabase')
  return getValue(discriminator, '/configDatabase')
}
function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  return modelPathValue && modelPathValue !== mode
}
function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  const validType = []
  return !validType.includes(modelPathValue)
}
function showHidden({ watchDependency, model, getValue }) {
  watchDependency('model#/spec/hidden/enabled')
  const isHiddenOn = getValue(model, '/spec/hidden/enabled') || ''
  const notStandalone = notEqualToDatabaseMode({ model, getValue, watchDependency }, 'Standalone')
  return isHiddenOn && notStandalone
}
function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  return modelPathValue && modelPathValue !== mode
}
function showArbiter({ watchDependency, model, getValue }) {
  watchDependency('model#/spec/arbiter/enabled')
  const isArbiterOn = getValue(model, '/spec/arbiter/enabled') || ''
  const notStandalone = notEqualToDatabaseMode({ model, getValue, watchDependency }, 'Standalone')
  return isArbiterOn && notStandalone
}
function clearConfiguration({ discriminator, getValue, commit }) {
  const configOn = getValue(discriminator, '/configDatabase')

  if (!configOn) {
    commit('wizard/model$delete', '/spec/configuration')
  }
}

function showIssuer({ model, getValue, watchDependency, discriminator }) {
  watchDependency('model#/spec/admin/tls/default')
  const isTlsEnabled = getValue(model, '/spec/admin/tls/default')
  const isIssuerToggleEnabled = isToggleOn(
    { getValue, model, discriminator, watchDependency },
    'clusterIssuers',
  )
  return isTlsEnabled && isIssuerToggleEnabled
}
function onAuthChange({ commit }) {
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
function setMonitoring({ getValue, model }) {
  const agent = getValue(model, '/spec/admin/monitoring/agent') || ''
  return !!agent
}

function setBackup({ model, getValue }) {
  const backup = getValue(model, '/spec/backup/tool')
  const val = getValue(model, '/spec/admin/backup/enable/default')
  return backup === 'KubeStash' && features.includes('backup') && val
}

function isMachineCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path ? `/spec/${path}/podResources/machine` : '/spec/podResources/machine'
  const modelPathValue = getValue(model, fullpath)
  watchDependency(`model#${fullpath}`)
  return modelPathValue === 'custom'
}

function isMachineNotCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path ? `/spec/${path}/podResources/machine` : '/spec/podResources/machine'
  const modelPathValue = getValue(model, fullpath)
  watchDependency(`model#${fullpath}`)
  return modelPathValue !== 'custom' && !!modelPathValue
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

function setLimits({ model, getValue, commit, watchDependency }, resource, type) {
  const path = type ? `/spec/${type}/podResources/machine` : '/spec/podResources/machine'
  watchDependency(`model#${path}`)
  const selectedMachine = getValue(model, path) || 'custom'
  const reqCommitPath = type
    ? `/spec/${type}/podResources/resources/limits/${resource}`
    : `/spec/podResources/resources/limits/${resource}`
  const comparePath = type
    ? `/spec/${type}/podResources/resources/requests/${resource}`
    : `/spec/podResources/resources/requests/${resource}`

  const resourceValue = getValue(model, comparePath)
  const machinesFromPreset = getValue(model, '/spec/admin/machineProfiles/machines')
  const available = getValue(model, '/spec/admin/machineProfiles/available')

  let cpu = '',
    memory = ''
  if (available.length && selectedMachine !== 'custom') {
    const machineData = machinesFromPreset.find((val) => val.id === selectedMachine)
    if (machineData) {
      cpu = machineData.limits.cpu
      memory = machineData.limits.memory
    }
  } else {
    if (selectedMachine === 'custom') {
      cpu = resourceValue
      memory = resourceValue
    } else {
      cpu = machines[selectedMachine].resources.limits.cpu
      memory = machines[selectedMachine].resources.limits.memory
    }
  }

  if (resource === 'memory') {
    commit('wizard/model$update', {
      path: reqCommitPath,
      value: memory,
      force: true,
    })
    commit('wizard/model$update', {
      path: comparePath,
      value: memory,
      force: true,
    })
    return memory
  } else {
    commit('wizard/model$update', {
      path: reqCommitPath,
      value: cpu,
      force: true,
    })
    commit('wizard/model$update', {
      path: comparePath,
      value: cpu,
      force: true,
    })
    return cpu
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

function toggleTls({ commit, model, getValue }) {
  let modelPathValue = getValue(model, '/spec/mode')
  commit('wizard/model$update', {
    path: '/spec/admin/tls/default',
    value: modelPathValue !== 'Standalone',
    force: true,
  })
  commit('wizard/model$update', {
    path: '/spec/admin/tls/toggle',
    value: modelPathValue !== 'Standalone',
    force: true,
  })
}

function showAdditionalSettings({ watchDependency }) {
  watchDependency('discriminator#/bundleApiLoaded')
  return features.length
}

function getDefault({ getValue, model }, type) {
  const val = getValue(model, `/spec/admin/${type}/default`) || ''
  return val
}

function isConfigAvailable({ getValue, model }) {
  const val = getValue(model, '/spec/configuration')
  return val !== ''
}

async function getReferSecrets({ getValue, model, storeGet, axios, discriminator }) {
  const referSecret = getValue(discriminator, '/referSecret')
  if (!referSecret) {
    return []
  }

  const params = storeGet('/route/params')
  const { user, cluster } = params
  const namespace = getValue(model, `/metadata/release/namespace`)
  let url = `/clusters/${user}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`

  const options = []
  try {
    const resp = await axios.get(url)
    const items = resp.data?.items
    items.forEach((ele) => {
      options.push(ele.metadata?.name)
    })
  } catch (e) {
    console.log(e)
  }
  return options
}

function showAuthPasswordField({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/referSecret')
  watchDependency('discriminator#/referSecret')
  return !modelPathValue && showReferSecret({ discriminator, getValue, watchDependency })
}

function showSecretDropdown({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/referSecret')
  watchDependency('discriminator#/referSecret')
  return !!modelPathValue && showReferSecret({ discriminator, getValue, watchDependency })
}

function showReferSecret({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/createAuthSecret')
  watchDependency('discriminator#/createAuthSecret')
  return !!modelPathValue
}

function getDefaultValue({ getValue, model }, path) {
  const val = getValue(model, `/${path}`) || ''
  return val
}

function showReferSecretSwitch({ model, getValue, watchDependency, discriminator }) {
  const modelPathValue = getValue(model, '/spec/admin/authCredential/referExisting')
  watchDependency('discriminator#/createAuthSecret')
  return !!modelPathValue && showReferSecret({ discriminator, getValue, watchDependency })
}

function onReferSecretChange({ commit }) {
  commit('wizard/model$update', {
    path: '/spec/authSecret/name',
    value: '',
    force: true,
  })
}

function showArchiverAlert({ watchDependency, model, getValue, commit }) {
  watchDependency('model#/spec/admin/storageClasses/default')

  const mode = getValue(model, '/spec/mode')
  if (mode === 'Standalone') return false

  const stClass = getValue(model, '/spec/admin/storageClasses/default')
  const found = archiverMap.find((item) => item.storageClass === stClass)
  const show = !found?.annotation

  // toggle archiver to false when storageClass annotation not found
  if (show)
    commit('wizard/model$update', {
      path: '/spec/admin/archiver/enable/default',
      value: false,
      force: true,
    })
  else onArchiverChange({ model, getValue, commit })

  return show
}

function showArchiver({ watchDependency, getValue, model, commit }) {
  watchDependency('model#/spec/mode')
  const dbmode = getValue(model, '/spec/mode')

  if (dbmode === 'Standalone') {
    commit('wizard/model$update', {
      path: '/spec/admin/archiver/enable/default',
      value: false,
      force: true,
    })
    return false
  }
  return checkIfFeatureOn({ getValue, model }, 'archiver')
}

async function checkHostnameOrIP({ commit, model, getValue }) {
  const tls = getValue(model, '/spec/admin/tls/default')
  const expose = getValue(model, '/spec/admin/expose/default')
  if (tls && expose) {
    if (hostName) {
      commit('wizard/model$update', {
        path: '/spec/hostName',
        value: hostName,
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: '/spec/ip',
        value: ip,
        force: true,
      })
    }
  } else {
    commit('wizard/model$update', {
      path: '/spec/hostName',
      value: '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/ip',
      value: '',
      force: true,
    })
  }
}

function onArchiverChange({ model, getValue, commit }) {
  const isArchiverOn = getValue(model, '/spec/admin/archiver/enable/default')
  const stClass = getValue(model, '/spec/admin/storageClasses/default')
  const found = archiverMap.find((item) => item.storageClass === stClass)

  if (isArchiverOn && found?.annotation)
    commit('wizard/model$update', {
      path: '/spec/archiverName',
      value: found.annotation,
      force: true,
    })
  else
    commit('wizard/model$update', {
      path: '/spec/archiverName',
      value: '',
      force: true,
    })
}

async function getArchiverName({ axios, storeGet }) {
  try {
    archiverCalled = true
    const params = storeGet('/route/params')
    const { user, cluster, group, resource } = params
    const url = `/clusters/${user}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`
    const resp = await axios.get(url)

    resp.data?.items?.forEach((item) => {
      const annotations = item.metadata?.annotations
      const classname = item.metadata?.name
      const annotationKeyToFind = `${resource}.${group}/archiver`
      archiverMap.push({ storageClass: classname, annotation: annotations[annotationKeyToFind] })
      return resp.data
    })
  } catch (e) {
    console.log(e)
  }
}

return {
  getArchiverName,
  onArchiverChange,
  checkHostnameOrIP,
  showArchiver,
  showArchiverAlert,
  showReferSecretSwitch,
  onReferSecretChange,
  getDefaultValue,
  isRancherManaged,
  showSecretDropdown,
  showReferSecret,
  getReferSecrets,
  isConfigAvailable,
  initBundle,
  returnFalse,
  setLimits,
  setRequests,
  toggleTls,
  getNamespaces,
  updateAlertValue,
  getAdminOptions,
  isToggleOn,
  showAlerts,
  getNodeTopology,
  clearArbiterHidden,
  returnFalse,
  showHidden,
  isConfigDatabaseOn,
  notEqualToDatabaseMode,
  filterNodeTopology,
  onAuthChange,
  setMonitoring,
  isMachineNotCustom,
  isMachineCustom,
  showIssuer,
  showArbiter,
  clearConfiguration,
  showStorageSizeField,
  onBackupSwitch,
  isVariantAvailable,
  fetchJsons,
  showAuthPasswordField,
  isEqualToModelPathValue,
  showAuthSecretField,
  getResources,
  getMySqlVersions,
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
  setReplicaNumber,
  setRouterNumber,
  setBackup,
  showAdditionalSettings,
  getDefault,
}
