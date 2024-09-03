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

async function getAppBindings({ axios, storeGet }, type) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const queryParams = {
    filter: {
      items: {
        metadata: { name: null, namespace: null },
        spec: { type: null },
      },
    },
  }
  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/appcatalog.appscode.com/v1alpha1/appbindings`,
      queryParams,
    )
    const resources = (resp && resp.data && resp.data.items) || []

    const fileredResources = resources
      .filter((item) => item.spec?.type === `kubedb.com/${type}`)
      .map((item) => {
        const name = item.metadata?.name || ''
        const namespace = item.metadata?.namespace || ''
        return {
          text: `${namespace}/${name}`,
          value: {
            name: name,
            namespace: namespace,
          },
        }
      })
    return fileredResources
  } catch (e) {
    console.log(e)
    return []
  }
}

function onRefChange({ discriminator, getValue, commit }) {
  const ref = getValue(discriminator, '/pgRef') || {}
  commit('wizard/model$update', {
    path: `/spec/database/databaseRef/name`,
    value: ref.name || '',
    force: true,
  })
  commit('wizard/model$update', {
    path: `/spec/database/databaseRef/namespace`,
    value: ref.namespace || '',
    force: true,
  })
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, value, modelPath) {
  const modelPathValue = getValue(model, modelPath)
  watchDependency('model#' + modelPath)
  return modelPathValue === value
}

const onDatabaseModeChange = ({ model, getValue, commit }) => {
  const databaseMode = getValue(model, '/spec/mode')
  commit('wizard/model$update', {
    path: '/spec/replicas',
    value: databaseMode === 'Standalone' ? 1 : 3,
    force: true,
  })
}

function showAuthPasswordField({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/createAuthSecret')
  watchDependency('discriminator#/createAuthSecret')
  return !!modelPathValue
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

function getMachineListForOptions() {
  const array = machineList.map((item) => {
    return { text: item, value: item }
  })
  return array
}

function setResourceLimit({ commit, model, getValue, watchDependency }) {
  let modelPathValue = getValue(model, '/spec/podResources/machine')
  const deploymentType = getValue(model, '/spec/admin/deployment/default')
  if (modelPathValue && modelPathValue !== 'custom') {
    // to avoiding set value by reference, cpu and memory set separately
    if (deploymentType === 'Dedicated') {
      commit('wizard/model$update', {
        path: '/spec/podResources/resources/requests',
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      })
      commit('wizard/model$update', {
        path: '/spec/podResources/resources/limits',
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: '/spec/podResources/resources',
        value: machines[modelPathValue]?.resources,
        force: true,
      })
    }
  }
}

function setLimitsCpuOrMem({ model, getValue }, type) {
  const deploymentType = getValue(model, '/spec/admin/deployment/default')
  const path = type ? `/spec/${type}/podResources/machine` : '/spec/podResources/machine'
  const selectedMachine = getValue(model, path)
  const cpu = getValue(
    model,
    type
      ? `/spec/${type}/podResources/resources/limits/cpu`
      : `/spec/podResources/resources/limits/cpu`,
  )
  const memory = getValue(
    model,
    type
      ? `/spec/${type}/podResources/resources/limits/memory`
      : `/spec/podResources/resources/limits/memory`,
  )
  if (selectedMachine && selectedMachine !== 'custom') {
    return machines[selectedMachine] && machines[selectedMachine].resources
  } else {
    if (deploymentType === 'Dedicated') {
      return {
        limits: {
          cpu: cpu,
          memory: memory,
        },
        requests: {
          cpu: cpu,
          memory: memory,
        },
      }
    } else {
      return {
        limits: {
          cpu: cpu,
          memory: memory,
        },
        requests: {
          cpu: '250m',
          memory: '500Mi',
        },
      }
    }
  }
}

function setMachineToCustom() {
  return 'custom'
}

function isMachineNotCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path ? `/spec/${path}/podResources/machine` : '/spec/podResources/machine'
  const modelPathValue = getValue(model, fullpath)
  watchDependency(`model#${fullpath}`)
  return modelPathValue !== 'custom' && !!modelPathValue
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

function isVariantAvailable({ storeGet }) {
  const variant = storeGet('/route/query/variant')
  return variant ? true : false
}

let placement = []
let versions = []
let storageClass = []
let clusterIssuers = []
let nodetopologiesShared = []
let nodetopologiesDedicated = []
let features = []
async function initBundle({ model, getValue, axios, storeGet, setDiscriminatorValue }) {
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

  return options
}

function checkIfFeatureOn({ getValue, model }, type) {
  let val = getValue(model, `/spec/admin/${type}/toggle`)
  const backupVal = getValue(model, '/spec/backup/tool')

  if (type === 'backup') {
    return features.includes('backup') && backupVal === 'KubeStash'
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

function showAlerts({ watchDependency, model, getValue, discriminator }) {
  watchDependency('discriminator#/monitoring')
  const isMonitorEnabled = getValue(discriminator, '/monitoring')
  const isAlertToggleEnabled = isToggleOn(
    { getValue, model, watchDependency, discriminator },
    'alert',
  )
  return isMonitorEnabled && isAlertToggleEnabled
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

function onBackupSwitch({ discriminator, getValue, commit }) {
  const isBackupOn = getValue(discriminator, '/backup')
  commit('wizard/model$update', {
    path: '/spec/backup/tool',
    value: isBackupOn ? 'KubeStash' : '',
    force: true,
  })
}

function setMonitoring({ getValue, model }) {
  const agent = getValue(model, '/spec/admin/monitoring/agent') || ''
  return !!agent
}

async function isNotBackupCluster({ axios, storeGet, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/ui.k8s.appscode.com/v1alpha1/features`
  let isStashEnabled = false

  try {
    const resp = await axios.get(url)
    const stashPreset = resp.data?.items?.find((item) => item.metadata?.name === 'stash-presets')
    isStashEnabled = !!(stashPreset?.status?.enabled && stashPreset?.status?.ready)
  } catch (e) {
    console.log(e)
  }
  return !isStashEnabled
}

function setBackup({ model, getValue }) {
  const backup = getValue(model, '/spec/backup/tool')
  return backup === 'KubeStash' && features.includes('backup')
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

function isConfigDatabaseOn({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/configDatabase')
  return getValue(discriminator, '/configDatabase')
}

function clearConfiguration({ discriminator, getValue, commit }) {
  const configOn = getValue(discriminator, '/configDatabase')

  if (!configOn) {
    commit('wizard/model$delete', '/spec/configuration')
  }
}

return {
  initBundle,
  returnFalse,
  getAppBindings,
  onRefChange,
  isVariantAvailable,
  isEqualToModelPathValue,
  showAuthPasswordField,
  getNamespaces,
  getMachineListForOptions,
  setResourceLimit,
  setLimitsCpuOrMem,
  setMachineToCustom,
  isMachineNotCustom,
  updateAlertValue,
  onDatabaseModeChange,
  getNodeTopology,
  filterNodeTopology,
  getAdminOptions,
  isToggleOn,
  showAlerts,
  showIssuer,
  onBackupSwitch,
  setMonitoring,
  isNotBackupCluster,
  onAuthChange,
  isConfigDatabaseOn,
  clearConfiguration,
  setBackup,
}
