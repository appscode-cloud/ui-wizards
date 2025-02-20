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
    description: 'Single node ProxySQL without high availability',
    text: 'Standalone',
  },
  Replicaset: {
    description: 'ProxySQL Replicaset for high availability.',
    text: 'Replicaset',
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

async function getProxysqlVersions({ axios, storeGet }, group, version, resource) {
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
  const filteredProxysqlVersions = resources.filter((item) => item.spec && !item.spec.deprecated)

  filteredProxysqlVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    const specVersion = (item.spec && item.spec.version) || ''
    item.text = `${name} (${specVersion})`
    item.value = name
    return true
  })
  return filteredProxysqlVersions
}

async function getAppBindings({ axios, storeGet }) {
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

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/appcatalog.appscode.com/v1alpha1/appbindings`,
      {
        params: queryParams,
      },
    )

    const resources = (resp && resp.data && resp.data.items) || []

    const fileredResources = resources
      .filter((item) => item.spec?.type === 'kubedb.com/mysql')
      .map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return {
          text: name,
          value: name,
        }
      })
    return fileredResources
  } catch (e) {
    console.log(e)
    return []
  }
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

function getMachineListForOptions({ model, getValue }) {
  const machines = getValue(model, '/spec/admin/machineProfiles/machines')
  let array = machines.map((machine) => {
    const text = `${machine.name} (cpu: ${machine.limits.cpu} memory: ${machine.limits.memoty})`
    return { text, value: machine.id }
  })
  array = [{ text: 'custom', value: 'custom' }, ...array]
  return array
}

function setLimits({ model, getValue, commit }, resource) {
  const path = '/spec/podResources/machine'
  const selectedMachine = getValue(model, path) || 'custom'
  const reqCommitPath = `/spec/podResources/resources/limits/${resource}`
  const comparePath = `/spec/podResources/resources/requests/${resource}`

  if (selectedMachine === 'custom') {
    const val2 = getValue(model, comparePath)
    if (resource === 'memory') {
      commit('wizard/model$update', {
        path: reqCommitPath,
        value: val2,
        force: true,
      })
      return val2
    } else {
      commit('wizard/model$update', {
        path: reqCommitPath,
        value: val2,
        force: true,
      })
      return val2
    }
  }
  if (resource === 'memory') {
    commit('wizard/model$update', {
      path: reqCommitPath,
      value: machines[selectedMachine]?.resources?.limits?.memory,
      force: true,
    })
    return machines[selectedMachine]?.resources?.limits?.memory
  } else {
    commit('wizard/model$update', {
      path: reqCommitPath,
      value: machines[selectedMachine]?.resources?.limits?.cpu,
      force: true,
    })
    return machines[selectedMachine]?.resources?.limits?.cpu
  }
}

function setRequests({ getValue, model, commit }, resource) {
  const modelPath = `/spec/podResources/resources/requests/${resource}`
  const val = getValue(model, modelPath)
  commitPath = `/spec/podResources/resources/limits/${resource}`
  commit('wizard/model$update', {
    path: commitPath,
    value: val,
    force: true,
  })
}

function setMachineToCustom({ getValue, model }) {
  const machine = getValue(model, '/spec/podResources/machine')
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

function isConfigDatabaseOn({ watchDependency, discriminator, getValue }) {
  watchDependency('discriminator#/configDatabase')
  return getValue(discriminator, '/configDatabase')
}
function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  return modelPathValue && modelPathValue !== mode
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

  if (!getValue(model, `/spec/admin/databases/ProxySQL/mode/toggle`)) {
    let defMode = getDefault({ getValue, model }, 'databases/ProxySQL/mode') || ''
    if (defMode === '') {
      const arr = getValue(model, '/spec/databases/ProxySQL/mode/available') || []
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

function getAdminOptions({ getValue, model, watchDependency, commit }, type) {
  watchDependency('discriminator#/bundleApiLoaded')

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

function showIssuer({ model, getValue, watchDependency, discriminator }) {
  watchDependency('model#/spec/admin/tls/default')
  const isTlsEnabled = getValue(model, '/spec/admin/tls/default')
  const isIssuerToggleEnabled = isToggleOn(
    { getValue, model, watchDependency, discriminator },
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

function EqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, '/spec/mode')
  watchDependency('model#/spec/mode')
  return modelPathValue && modelPathValue === mode
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

return {
  isRancherManaged,
  showSecretDropdown,
  showReferSecret,
  getReferSecrets,
  isConfigAvailable,
  initBundle,
  returnFalse,
  EqualToDatabaseMode,
  getNamespaces,
  updateAlertValue,
  setStorageClass,
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
  onBackupSwitch,
  isVariantAvailable,
  fetchJsons,
  showAuthPasswordField,
  isEqualToModelPathValue,
  showAuthSecretField,
  getResources,
  getProxysqlVersions,
  getAppBindings,
  onCreateAuthSecretChange,
  getSecrets,
  getMachineListForOptions,
  setLimits,
  setRequests,
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
  setBackup,
  showAdditionalSettings,
  getDefault,
}
