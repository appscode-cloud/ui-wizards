let nodeTopologyListFromApi = []
let provider = ''

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

function showAuthPasswordField({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, '/createAuthSecret')
  watchDependency('discriminator#/createAuthSecret')
  return !!modelPathValue
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, value, modelPath) {
  const modelPathValue = getValue(model, modelPath)
  watchDependency('model#' + modelPath)
  return modelPathValue === value
}

function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  const validType = ['Standalone', 'Replicaset']
  return validType.includes(modelPathValue)
}

function disableLimit({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, '/spec/machine')
  watchDependency('model#/spec/machine')
  return modelPathValue !== 'custom' && !!modelPathValue
}

function getMachineListForOptions() {
  const array = machineList.map((item) => {
    return { text: item, value: item }
  })
  return array
}

function onDeploymentChange({ commit, model, getValue, watchDependency }) {
  setResourceLimit({ commit, model, getValue, watchDependency })
  setResourceLimitTopology({ commit, model, getValue, watchDependency }, 'broker')
  setResourceLimitTopology({ commit, model, getValue, watchDependency }, 'controller')
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

function setResourceLimitTopology({ commit, model, getValue, watchDependency }, topology) {
  let modelPathValue = getValue(model, `/spec/topology/${topology}/podResources/machine`)
  const deploymentType = getValue(model, '/spec/admin/deployment/default')

  if (modelPathValue && modelPathValue !== 'custom') {
    // to avoiding set value by reference, cpu and memory set separately
    if (deploymentType === 'Dedicated') {
      commit('wizard/model$update', {
        path: `/spec/topology/${topology}/podResources/resources/requests`,
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      })
      commit('wizard/model$update', {
        path: `/spec/topology/${topology}/podResources/resources/limits`,
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: `/spec/topology/${topology}/podResources/resources`,
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

function isVariantAvailable({ storeGet }) {
  const variant = storeGet('/route/query/variant')
  return variant ? true : false
}

function setStorageClass({ model, getValue, commit }) {
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

  const isChangeable = isToggleOn({ getValue, model }, 'storageClasses')
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

function isToggleOn({ getValue, model }, type) {
  return getValue(model, `/spec/admin/${type}/toggle`)
}

function getAdminOptions({ getValue, model }, type) {
  const options = getValue(model, `/spec/admin/${type}/available`) || []
  return options
}

async function getNodeTopology({ model, getValue, axios, storeGet, watchDependency }) {
  watchDependency('model#/spec/admin/deployment/default')
  watchDependency('model#/spec/admin/clusterTier/default')
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const deploymentType = getValue(model, '/spec/admin/deployment/default') || ''
  const clusterTier = getValue(model, '/spec/admin/clusterTier/default') || ''
  const nodeTopologyList = getValue(model, `/spec/admin/clusterTier/nodeTopology/available`) || []
  let mappedResp = []
  let apiCalled = false

  if (nodeTopologyListFromApi.length === 0 && !apiCalled) {
    try {
      apiCalled = true
      const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
      const resp = await axios.get(url)
      nodeTopologyListFromApi = resp.data?.items
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

  return filteredList
}

function filterNodeTopology(list, tier, provider, mappedResp) {
  // first filter the list from value that exists from the filtered list got from API
  const filteredlist = list.filter((item) => {
    return mappedResp.includes(item)
  })

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
  }
}

function isMachineNotCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path ? `/spec/${path}/podResources/machine` : '/spec/podResources/machine'
  const modelPathValue = getValue(model, fullpath)
  watchDependency(`model#${fullpath}`)
  return modelPathValue !== 'custom' && !!modelPathValue
}

function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  return modelPathValue && modelPathValue !== mode
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

function showIssuer({ model, getValue, watchDependency }) {
  watchDependency('model#/spec/admin/tls/default')
  const isTlsEnabled = getValue(model, '/spec/admin/tls/default')
  const isIssuerToggleEnabled = isToggleOn({ getValue, model }, 'clusterIssuers')
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
  return isMonitorEnabled && isToggleOn({ getValue, model }, 'alerts')
}

async function isBackupCluster({ axios, storeGet, commit }) {
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
  commit('wizard/model$update', {
    path: '/spec/admin/backup/tool',
    value: isStashEnabled ? 'KubeStash' : '',
    force: true,
  })
  return isStashEnabled
}

function onBackupSwitch({ discriminator, getValue, commit }) {
  const isBackupOn = getValue(discriminator, '/backup')
  commit('wizard/model$update', {
    path: '/spec/admin/backup/tool',
    value: isBackupOn ? 'KubeStash' : '',
    force: true,
  })
}

return {
  onDeploymentChange,
  setResourceLimitTopology,
  isVariantAvailable,
  showAuthPasswordField,
  isEqualToModelPathValue,
  showStorageSizeField,
  disableLimit,
  getMachineListForOptions,
  setResourceLimit,
  setLimitsCpuOrMem,
  setMachineToCustom,
  getCreateNameSpaceUrl,
  setStorageClass,
  getNamespaces,
  isToggleOn,
  getAdminOptions,
  getNodeTopology,
  filterNodeTopology,
  isMachineNotCustom,
  notEqualToDatabaseMode,
  onAuthChange,
  clearConfiguration,
  isConfigDatabaseOn,
  showIssuer,
  setMonitoring,
  updateAlertValue,
  showAlerts,
  isBackupCluster,
  onBackupSwitch,
}
