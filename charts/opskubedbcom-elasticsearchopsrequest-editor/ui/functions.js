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

function returnFalse() {
  return false
}

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

async function getNamespaces({ axios, storeGet }) {
  if (storeGet('/route/query/operation')) return []
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`, {
    params: { filter: { items: { metadata: { name: null } } } },
  })

  const resources = (resp && resp.data && resp.data.items) || []

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  if (storeGet('/route/query/operation')) return []
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/elasticsearches`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    },
  )

  const resources = (resp && resp.data && resp.data.items) || []

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

let elasticVersions = []

async function getDbDetails({ axios, storeGet, model, getValue, setDiscriminatorValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/namespace')
  const name = getValue(model, '/spec/databaseRef/name')

  if (namespace && name) {
    const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/elasticsearches/${name}`
    const resp = await axios.get(url)

    const { version } = resp?.data?.spec || {}
    const selectedVersion = elasticVersions?.find((item) => item?.metadata?.name === version)

    if (resp?.data?.spec) {
      resp.data.spec.authPlugin = selectedVersion?.spec?.authPlugin || ''
    }

    setDiscriminatorValue('/dbDetails', resp.data || {})

    return resp.data || {}
  } else return {}
}

async function getDbVersions({ axios, storeGet, getValue, discriminator }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/charts.x-helm.dev/v1alpha1/clusterchartpresets/kubedb-ui-presets`

  let presets = storeGet('/kubedbuiPresets') || {}
  if (!storeGet('/route/query/operation')) {
    try {
      const presetResp = await axios.get(url)
      presets = presetResp.data?.spec?.values?.spec
    } catch (e) {
      console.log(e)
      presets.status = String(e.status)
    }
  }

  try {
    const presetVersions = presets.admin?.databases?.Elasticsearch?.versions?.available || []
    const queryParams = {
      filter: {
        items: {
          metadata: { name: null },
          spec: { version: null, deprecated: null, updateConstraints: null },
        },
      },
    }

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/elasticsearchversions`,
      {
        params: queryParams,
      },
    )

    const resources = (resp && resp.data && resp.data.items) || []

    const sortedVersions = resources.sort((a, b) => versionCompare(a.spec.version, b.spec.version))

    let ver = getValue(discriminator, '/dbDetails/spec/version') || '0'
    const found = sortedVersions.find((item) => item.metadata.name === ver)

    if (found) ver = found.spec?.version
    const allowed = found?.spec?.updateConstraints?.allowlist || []
    const limit = allowed.length ? allowed[0] : '0.0'

    // keep only non deprecated & kubedb-ui-presets & within constraints of current version
    // if presets.status is 404, it means no presets available, no need to filter with presets
    const filteredElasticsearchVersions = sortedVersions.filter((item) => {
      // default limit 0.0 means no restrictions, show all higher versions
      if (limit === '0.0')
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          versionCompare(item.spec?.version, ver) >= 0
        )
      // if limit doesn't have any operator, it's a single version
      else if (!limit.match(/^(>=|<=|>|<)/))
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          item.spec?.version === limit
        )
      // if limit has operator, check version with constraints
      else
        return (
          !item.spec?.deprecated &&
          (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
          isVersionWithinConstraints(item.spec?.version, limit)
        )
    })

    return filteredElasticsearchVersions.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const specVersion = (item.spec && item.spec.version) || ''
      return {
        text: `${name} (${specVersion})`,
        value: name,
      }
    })
  } catch (e) {
    console.log(e)
    return []
  }
}

function versionCompare(v1, v2) {
  const arr1 = v1.split('.').map(Number)
  const arr2 = v2.split('.').map(Number)

  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    const num1 = arr1[i] || 0
    const num2 = arr2[i] || 0

    if (num1 > num2) return 1 // v1 is higher
    if (num1 < num2) return -1 // v2 is higher
  }
  return 0 // versions are equal
}

function isVersionWithinConstraints(version, constraints) {
  let constraintsArr = []
  if (constraints.includes(',')) constraintsArr = constraints?.split(',')?.map((c) => c.trim())
  else constraintsArr = [constraints]

  for (let constraint of constraintsArr) {
    let match = constraint.match(/^(>=|<=|>|<)/)
    let operator = match ? match[0] : ''
    let constraintVersion = constraint.replace(/^(>=|<=|>|<)/, '').trim()

    let comparison = versionCompare(version, constraintVersion)
    if (
      (operator === '>=' && comparison < 0) ||
      (operator === '<=' && comparison > 0) ||
      (operator === '>' && comparison <= 0) ||
      (operator === '<' && comparison >= 0)
    )
      return false
  }
  return true
}

function ifRequestTypeEqualsTo({ model, getValue, watchDependency }, type) {
  const selectedType = getValue(model, '/spec/type')
  watchDependency('model#/spec/type')

  return selectedType === type
}

function onApplyconfigChange({ discriminator, getValue, commit }) {
  const applyconfig = getValue(discriminator, '/applyConfig')

  const configObj = {}
  if (applyconfig) {
    applyconfig.forEach((item) => {
      const { key, value } = item
      configObj[key] = value
    })
  }

  commit('wizard/model$update', {
    path: '/spec/configuration/applyConfig',
    value: configObj,
    force: true,
  })
}

function onRequestTypeChange({ model, getValue, commit }) {
  const selectedType = getValue(model, '/spec/type')
  const reqTypeMapping = {
    Upgrade: 'updateVersion',
    UpdateVersion: 'updateVersion',
    HorizontalScaling: 'horizontalScaling',
    VerticalScaling: 'verticalScaling',
    VolumeExpansion: 'volumeExpansion',
    Restart: 'restart',
    Reconfigure: 'configuration',
    ReconfigureTLS: 'tls',
  }

  Object.keys(reqTypeMapping).forEach((key) => {
    if (key !== selectedType) commit('wizard/model$delete', `/spec/${reqTypeMapping[key]}`)
  })
}

function getDbTls({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')

  const { spec } = dbDetails || {}
  return (spec && spec.tls) || undefined
}

function getDbType({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')

  const { spec } = dbDetails || {}
  const { topology } = spec || {}
  let verd = ''
  if (topology) {
    verd = 'topology'
  } else {
    verd = 'combined'
  }

  return verd
}

function initNamespace({ route }) {
  const { namespace } = route.query || {}
  return namespace || null
}

function initDatabaseRef({ route, watchDependency }) {
  watchDependency('model#/metadata/namespace')
  const { name } = route.query || {}
  return name
}

function clearOpsReqSpec(verd, opsReqType, commit) {
  if (
    opsReqType === 'verticalScaling' ||
    opsReqType === 'horizontalScaling' ||
    opsReqType === 'volumeExpansion' ||
    opsReqType === 'configuration'
  ) {
    if (verd === 'combined') {
      commit('wizard/model$delete', `/spec/${opsReqType}/topology`)
    } else {
      commit('wizard/model$delete', `/spec/${opsReqType}/node`)
    }
  }
}

function asDatabaseOperation(route) {
  return !!route.query.operation
}

function generateOpsRequestNameForClusterUI(getValue, model, route) {
  const dbName = getValue(model, '/spec/databaseRef/name')

  const selectedType = getValue(model, '/spec/type')
  const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

  const resources = route.params.resource || ''
  const resource = resources.slice(0, -1)

  const opsName = dbName ? dbName : resource
  return `${opsName}-${Math.floor(Date.now() / 1000)}${lowerType ? '-' + lowerType : ''}`
}

function showAndInitName({ route, commit, getValue, model, watchDependency }) {
  watchDependency('model#/spec/type')
  watchDependency('model#/spec/databaseRef/name')
  const ver = asDatabaseOperation(route)

  const selectedType = getValue(model, '/spec/type')
  const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

  if (ver) {
    // For kubedb-ui
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: `${route.query.name}-${Math.floor(Date.now() / 1000)}-${lowerType}`,
      force: true,
    })
  } else {
    // For cluster-ui
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: generateOpsRequestNameForClusterUI(getValue, model, route),
      force: true,
    })
  }
  return !ver
}
function showAndInitNamespace({ route, commit }) {
  const ver = asDatabaseOperation(route)
  if (ver) {
    commit('wizard/model$update', {
      path: '/metadata/namespace',
      value: `${route.query.namespace}`,
      force: true,
    })
  }

  return !ver
}
function showAndInitDatabaseRef({ route, commit }) {
  const ver = asDatabaseOperation(route)
  if (ver) {
    commit('wizard/model$update', {
      path: '/spec/databaseRef/name',
      value: `${route.query.name}`,
      force: true,
    })
  }

  return !ver
}
function showConfigureOpsrequestLabel({ route }) {
  return !asDatabaseOperation(route)
}
function showAndInitOpsRequestType({ route, commit }) {
  const ver = asDatabaseOperation(route)
  const opMap = {
    upgrade: 'UpdateVersion',
    updateVersion: 'UpdateVersion',
    horizontalscaling: 'HorizontalScaling',
    verticalscaling: 'VerticalScaling',
    volumeexpansion: 'VolumeExpansion',
    restart: 'Restart',
    reconfiguretls: 'ReconfigureTLS',
    reconfigure: 'Reconfigure',
  }
  if (ver) {
    const operation = route.query.operation
    const match = /^(.*)-opsrequest-(.*)$/.exec(operation)
    const opstype = match[2]
    commit('wizard/model$update', {
      path: '/spec/type',
      value: opMap[opstype],
      force: true,
    })
  }

  return !ver
}

// vertical scaling
function ifDbTypeEqualsTo({ discriminator, getValue, watchDependency, commit }, value, opsReqType) {
  const verd = getDbType({
    discriminator,
    getValue,
    watchDependency,
  })

  clearOpsReqSpec(verd, opsReqType, commit)
  return value === verd
}

// machine profile stuffs
let machinesFromPreset = []
function hasMachine({ getValue, discriminator }) {
  const dbDetails = getValue(discriminator, '/dbDetails')
  const annotations = dbDetails?.metadata?.annotations || {}
  return !!annotations['kubernetes.io/instance-type']
}

function getMachines({ storeGet }) {
  const presets = storeGet('/kubedbuiPresets') || {}
  const avlMachines = presets.admin?.machineProfiles?.available || []
  let arr = []
  if (avlMachines.length) {
    arr = avlMachines.map((machine) => {
      if (machine === 'custom') return { text: machine, value: machine }
      else {
        const machineData = machinesFromPreset.find((val) => val.id === machine)
        if (machineData) {
          const subText = `CPU: ${machineData.limits.cpu}, Memory: ${machineData.limits.memory}`
          const text = machineData.name ? machineData.name : machineData.id
          return { text, subText, value: machine }
        } else return { text: machine, value: machine }
      }
    })
  } else {
    arr = machineList
      .map((machine) => {
        if (machine === 'custom') return { text: machine, value: machine }
        const subText = `CPU: ${machines[machine].resources.limits.cpu}, Memory: ${machines[machine].resources.limits.memory}`
        const text = machine
        return { text, subText, value: machine }
      })
      .filter((val) => !!val)
  }
  return arr
}

function setMachine({ getValue, discriminator, storeGet }, type) {
  const dbDetails = getValue(discriminator, '/dbDetails')
  const annotations = dbDetails?.metadata?.annotations || {}
  const instance = annotations['kubernetes.io/instance-type']
  let parsedInstance = {}
  try {
    if (instance) parsedInstance = JSON.parse(instance)
  } catch (e) {
    console.log(e)
    parsedInstance = {}
  }
  const machine = parsedInstance[type] || 'custom'

  machinesFromPreset = storeGet('/kubedbuiPresets')?.admin?.machineProfiles?.machines || []

  const machinePresets = machinesFromPreset.find((item) => item.id === machine)
  if (machinePresets) return machine
  else return 'custom'
}

function onMachineChange({ getValue, discriminator, commit, model }, type, valPath) {
  let selectedMachine = ''
  selectedMachine = getValue(discriminator, `/machine-${type}`)
  const machine = machinesFromPreset.find((item) => item.id === selectedMachine)

  let obj = {}
  if (selectedMachine !== 'custom') {
    if (machine) obj = { limits: { ...machine?.limits }, requests: { ...machine?.limits } }
    else obj = machines[selectedMachine]?.resources
  } else {
    const val = getValue(discriminator, `/dbDetails${valPath}`) || {}
    obj = Array.isArray(val) ? val[0]?.resources : { ...val }
  }

  const path = `/spec/verticalScaling/${type === 'combined' ? 'node' : type}/resources`

  if (obj && Object.keys(obj).length)
    commit('wizard/model$update', {
      path: path,
      value: obj,
      force: true,
    })

  // update metadata.annotations
  const annotations = getValue(model, '/metadata/annotations') || {}
  const instance = annotations['kubernetes.io/instance-type']
  let parsedInstance = {}
  try {
    if (instance) parsedInstance = JSON.parse(instance)
  } catch (e) {
    console.log(e)
    parsedInstance = {}
  }
  if (selectedMachine === 'custom') delete parsedInstance[type]
  else parsedInstance[type] = selectedMachine
  annotations['kubernetes.io/instance-type'] = JSON.stringify(parsedInstance)

  if (machinesFromPreset.length)
    commit('wizard/model$update', {
      path: '/metadata/annotations',
      value: annotations,
      force: true,
    })

  if (parsedInstance && Object.keys(parsedInstance).length === 0)
    commit('wizard/model$delete', '/metadata/annotations')
}

function isMachineCustom({ watchDependency, getValue, discriminator }, path) {
  watchDependency(`discriminator#${path}`)
  const machine = getValue(discriminator, `${path}`)
  return machine === 'custom'
}

function isAuthPluginNotEqualTo({ discriminator, getValue, watchDependency }, value) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')

  const authPlugin = dbDetails?.spec?.authPlugin || ''

  return authPlugin && authPlugin !== value
}

function isAuthPluginEqualTo({ discriminator, getValue, watchDependency }, value) {
  watchDependency('discriminator#/dbDetails')
  const dbDetails = getValue(discriminator, '/dbDetails')

  const authPlugin = dbDetails?.spec?.authPlugin || ''

  return authPlugin === value
}

// for config secret
async function getConfigSecrets({ storeGet, axios, model, getValue, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    },
  )

  const secrets = (resp && resp.data && resp.data.items) || []

  const filteredSecrets = secrets

  filteredSecrets.map((item) => {
    const name = (item.metadata && item.metadata.name) || ''
    item.text = name
    item.value = name
    return true
  })
  return filteredSecrets
}

async function getNamespacedResourceList(axios, storeGet, { namespace, group, version, resource }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`

  let ans = []
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    })

    const items = (resp && resp.data && resp.data.items) || []
    ans = items
  } catch (e) {
    console.log(e)
  }

  return ans
}
async function getResourceList(axios, storeGet, { group, version, resource }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`

  let ans = []
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    })

    const items = (resp && resp.data && resp.data.items) || []
    ans = items
  } catch (e) {
    console.log(e)
  }

  return ans
}
async function resourceNames(
  { axios, getValue, model, watchDependency, storeGet },
  group,
  version,
  resource,
) {
  const namespace = getValue(model, '/metadata/namespace')
  watchDependency('model#/metadata/namespace')

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group,
    version,
    resource,
  })

  if (resource === 'secrets') {
    resources = resources.filter((item) => {
      const validType = ['kubernetes.io/service-account-token', 'Opaque']
      return validType.includes(item.type)
    })
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}
async function unNamespacedResourceNames({ axios, storeGet }, group, version, resource) {
  let resources = await getResourceList(axios, storeGet, {
    group,
    version,
    resource,
  })

  if (resource === 'secrets') {
    resources = resources.filter((item) => {
      const validType = ['kubernetes.io/service-account-token', 'Opaque']
      return validType.includes(item.type)
    })
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || ''
    return {
      text: name,
      value: name,
    }
  })
}

// reconfiguration type
function ifReconfigurationTypeEqualsTo({ discriminator, getValue, watchDependency }, value) {
  const reconfigurationType = getValue(discriminator, '/reconfigurationType')
  watchDependency('discriminator#/reconfigurationType')

  return reconfigurationType === value
}
function onReconfigurationTypeChange({ commit, discriminator, getValue }) {
  const reconfigurationType = getValue(discriminator, '/reconfigurationType')
  if (reconfigurationType === 'remove') {
    commit('wizard/model$delete', `/spec/configuration`)

    commit('wizard/model$update', {
      path: `/spec/configuration/removeCustomConfig`,
      value: true,
      force: true,
    })
  } else {
    commit('wizard/model$delete', `/spec/configuration/configSecret`)
    commit('wizard/model$delete', `/spec/configuration/inlineConfig`)
    commit('wizard/model$delete', `/spec/configuration/removeCustomConfig`)
  }
}

// for tls
function hasTlsField({ discriminator, getValue, watchDependency }) {
  const tls = getDbTls({
    discriminator,
    getValue,
    watchDependency,
  })

  return !!tls
}

function initIssuerRefApiGroup({ getValue, model, watchDependency, discriminator }) {
  const kind = getValue(model, '/spec/tls/issuerRef/kind')
  watchDependency('model#/spec/tls/issuerRef/kind')

  if (kind) {
    const apiGroup = getValue(discriminator, '/dbDetails/spec/tls/issuerRef/apiGroup')
    if (apiGroup) return apiGroup
    return 'cert-manager.io'
  } else return undefined
}

async function getIssuerRefsName({ axios, storeGet, getValue, model, watchDependency }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  watchDependency('model#/spec/tls/issuerRef/kind')
  watchDependency('model#/metadata/namespace')
  const kind = getValue(model, '/spec/tls/issuerRef/kind')
  const namespace = getValue(model, '/metadata/namespace')

  if (kind === 'Issuer') {
    const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/namespaces/${namespace}/issuers`
    return getIssuer(url)
  } else if (kind === 'ClusterIssuer') {
    const url = `/clusters/${owner}/${cluster}/proxy/charts.x-helm.dev/v1alpha1/clusterchartpresets/kubedb-ui-presets`

    let presets = storeGet('/kubedbuiPresets') || {}
    if (!storeGet('/route/query/operation')) {
      try {
        const presetResp = await axios.get(url)
        presets = presetResp.data?.spec?.values?.spec
      } catch (e) {
        console.log(e)
        presets.status = String(e.status)
      }
    }
    let clusterIssuers = presets.admin?.clusterIssuers?.available || []
    if (presets.status === '404') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
      return getIssuer(url)
    }
    return clusterIssuers
  }

  async function getIssuer(url) {
    try {
      const resp = await axios.get(url)
      const resources = (resp && resp.data && resp.data.items) || []

      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        item.text = name
        item.value = name
        return true
      })
      return resources
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

function initTlsOperation() {
  return 'update'
}
function onTlsOperationChange({ discriminator, getValue, commit }) {
  const tlsOperation = getValue(discriminator, '/tlsOperation')

  commit('wizard/model$delete', '/spec/tls')

  if (tlsOperation === 'rotate') {
    commit('wizard/model$update', {
      path: '/spec/tls/rotateCertificates',
      value: true,
      force: true,
    })
    commit('wizard/model$delete', '/spec/tls/certificates')
    commit('wizard/model$delete', '/spec/tls/remove')
  } else if (tlsOperation === 'remove') {
    commit('wizard/model$update', {
      path: '/spec/tls/remove',
      value: true,
      force: true,
    })
    commit('wizard/model$delete', '/spec/tls/certificates')
    commit('wizard/model$delete', '/spec/tls/rotateCertificates')
  }
}

function showIssuerRefAndCertificates({ discriminator, getValue, watchDependency }) {
  const tlsOperation = getValue(discriminator, '/tlsOperation')
  watchDependency('discriminator#/tlsOperation')
  const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'

  return verd
}

function isIssuerRefRequired({ discriminator, getValue, watchDependency }) {
  const hasTls = hasTlsField({
    discriminator,
    getValue,
    watchDependency,
  })

  return !hasTls
}

// ************************************** Set db details *****************************************

function isDbDetailsLoading({ discriminator, model, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  watchDependency('model#/spec/databaseRef/name')
  const dbDetails = getValue(discriminator, '/dbDetails')
  const dbName = getValue(model, '/spec/databaseRef/name')

  return !dbDetails || !dbName
}

function setValueFromDbDetails(
  { discriminator, getValue, watchDependency, commit },
  path,
  commitPath,
) {
  watchDependency('discriminator#/dbDetails')
  const retValue = getValue(discriminator, `/dbDetails${path}`)

  if (commitPath) {
    const tlsOperation = getValue(discriminator, '/tlsOperation')

    if (commitPath.includes('/spec/tls') && tlsOperation !== 'update') return undefined

    // direct model update required for reusable element.
    // computed property is not applicable for reusable element
    if (retValue) {
      commit('wizard/model$update', {
        path: commitPath,
        value: retValue,
        force: true,
      })
    }
  }

  return retValue || undefined
}

function disableOpsRequest({ itemCtx, discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')
  if (itemCtx.value === 'ReconfigureTLS') {
    const dbDetails = getValue(discriminator, '/dbDetails')
    const { issuerRef } = dbDetails?.spec?.tls || {}
    return !issuerRef
  }
  return false
}

function hasResourceValue({ discriminator, getValue, watchDependency }, node) {
  watchDependency('discriminator#/dbDetails')
  const nodeResource = getValue(discriminator, `/dbDetails/spec/topology/${node}/resources`)
  return !!nodeResource
}

function hasVolumeExpansion({ discriminator, getValue, watchDependency }, node) {
  watchDependency('discriminator#/dbDetails')
  const nodeStorage = getValue(
    discriminator,
    `/dbDetails/spec/topology/${node}/storage/resources/requests/storage`,
  )
  return !!nodeStorage
}

function getAliasOptions({ discriminator, getValue, watchDependency }) {
  watchDependency('discriminator#/dbDetails')

  const enableSSL = getValue(discriminator, '/dbDetails/spec/enableSSL')
  const authPlugin = getValue(discriminator, '/dbDetails/spec/authPlugin')
  const monitor = getValue(discriminator, '/dbDetails/spec/monitor')

  // always include transport cert alias
  const aliases = ['transport']

  if (authPlugin !== 'X-Pack') {
    aliases.push('admin')
  }

  if (enableSSL) {
    aliases.push('http')
    aliases.push('archiver')
    if (monitor) {
      aliases.push('metrics-exporter')
    }
  }

  return aliases
}

function isNamespaceDisabled({ route }) {
  const { namespace } = route.query || {}
  return !!namespace
}

function isDatabaseRefDisabled({ route }) {
  const { name } = route.query || {}
  return !!name
}

function onNamespaceChange({ commit, route }) {
  const { operation } = route.query
  // if operation query parameter is present
  // then the type is set by showAndInitOpsRequestType and can not be changed or deleted
  // otherwise delete the type
  if (!operation) {
    // delete type
    commit('wizard/model$delete', '/spec/type')
  }
}

function onDbChange({ commit, axios, storeGet, model, getValue, setDiscriminatorValue }) {
  // delete type
  commit('wizard/model$delete', '/spec/type')
  getDbDetails({ axios, storeGet, model, getValue, setDiscriminatorValue })
}

function setApplyToIfReady() {
  return 'IfReady'
}

function isVerticalScaleTopologyRequired(
  { watchDependency, getValue, discriminator, commit },
  type,
) {
  watchDependency(`discriminator#/topologyKey-${type}`)
  watchDependency(`discriminator#/topologyValue-${type}`)

  const key = getValue(discriminator, `/topologyKey-${type}`)
  const value = getValue(discriminator, `/topologyValue-${type}`)
  const path = `/spec/verticalScaling/${type}/topology`

  if (key || value) {
    commit('wizard/model$update', {
      path: path,
      value: { key, value },
      force: true,
    })
    return true
  } else {
    commit('wizard/model$delete', path)
    return false
  }
}

return {
  fetchJsons,
  returnFalse,
  getNamespaces,
  getDbs,
  getDbDetails,
  getDbVersions,
  ifRequestTypeEqualsTo,
  onRequestTypeChange,
  getDbTls,
  getDbType,
  initNamespace,
  initDatabaseRef,
  clearOpsReqSpec,
  isRancherManaged,
  showAndInitName,
  showAndInitNamespace,
  showAndInitDatabaseRef,
  showConfigureOpsrequestLabel,
  showAndInitOpsRequestType,

  ifDbTypeEqualsTo,
  isAuthPluginEqualTo,
  isAuthPluginNotEqualTo,
  getConfigSecrets,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  ifReconfigurationTypeEqualsTo,
  onApplyconfigChange,
  onReconfigurationTypeChange,
  hasTlsField,
  initIssuerRefApiGroup,
  getIssuerRefsName,
  initTlsOperation,
  onTlsOperationChange,
  showIssuerRefAndCertificates,
  isIssuerRefRequired,
  isDbDetailsLoading,
  setValueFromDbDetails,
  disableOpsRequest,
  hasResourceValue,
  hasVolumeExpansion,
  getAliasOptions,
  isNamespaceDisabled,
  isDatabaseRefDisabled,
  onNamespaceChange,
  onDbChange,
  setApplyToIfReady,
  isVerticalScaleTopologyRequired,
  getMachines,
  setMachine,
  onMachineChange,
  isMachineCustom,
}
