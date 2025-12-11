const { axios, useOperator, store } = window.vueHelpers || {}

// ============================================================
// MACHINE PROFILES - Predefined Resource Configurations
// ============================================================
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

// ============================================================
// DRUID NODE TYPES
// ============================================================
const druidNodeTypes = [
  'coordinators',
  'overlords',
  'brokers',
  'routers',
  'historicals',
  'middleManagers',
]

let machinesFromPreset = []
let secretArray = []

export const useFunc = (model) => {
  const route = store.state?.route

  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  // Initialize on load
  getDbDetails()
  showAndInitOpsRequestType()

  // ============================================================
  // CORE UTILITY FUNCTIONS
  // ============================================================

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

  function isEqualToModelPathValue(value, path) {
    const modelValue = getValue(model, path)
    // watchDependency(`model#${path}`)
    return modelValue === value
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  // ============================================================
  // NAMESPACE & DATABASE RESOURCE FUNCTIONS
  // ============================================================

  async function getNamespaces() {
    if (storeGet('/route/params/actions')) return []
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

  async function getDbs() {
    if (storeGet('/route/params/actions')) return []
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const namespace = getValue(model, '/metadata/namespace')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/druids`,
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

  async function getDbDetails() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace')
    const name = storeGet('/route/params/name') || getValue(model, '/spec/databaseRef/name')

    if (namespace && name) {
      const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/druids/${name}`
      try {
        const resp = await axios.get(url)
        setDiscriminatorValue('/dbDetails', resp.data || {})
        return resp.data || {}
      } catch (e) {
        console.log(e)
        return {}
      }
    } else return {}
  }

  async function getDbVersions() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const url = `/clusters/${owner}/${cluster}/proxy/charts.x-helm.dev/v1alpha1/clusterchartpresets/kubedb-ui-presets`
    let presets = storeGet('/kubedbuiPresets') || {}
    if (!storeGet('/route/params/actions')) {
      try {
        const presetResp = await axios.get(url)
        presets = presetResp.data?.spec?.values?.spec
      } catch (e) {
        console.log(e)
        presets.status = String(e.status)
      }
    }
    try {
      const presetVersions = presets.admin?.databases?.Druid?.versions?.available || []
      const queryParams = {
        filter: {
          items: {
            metadata: { name: null },
            spec: { version: null, deprecated: null, updateConstraints: null },
          },
        },
      }
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/druidversions`,
        {
          params: queryParams,
        },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      const sortedVersions = resources.sort((a, b) =>
        versionCompare(a.spec.version, b.spec.version),
      )
      let ver = getValue(discriminator, '/dbDetails/spec/version') || '0'
      const found = sortedVersions.find((item) => item.metadata.name === ver)
      if (found) ver = found.spec?.version
      const allowed = found?.spec?.updateConstraints?.allowlist || []
      const limit = allowed.length ? allowed[0] : '0.0'

      const filteredDruidVersions = sortedVersions.filter((item) => {
        if (limit === '0.0')
          return (
            !item.spec?.deprecated &&
            (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
            versionCompare(item.spec?.version, ver) >= 0
          )
        else if (!limit.match(/^(>=|<=|>|<)/))
          return (
            !item.spec?.deprecated &&
            (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
            item.spec?.version === limit
          )
        else
          return (
            !item.spec?.deprecated &&
            (presets.status === '404' || presetVersions.includes(item.metadata?.name)) &&
            isVersionWithinConstraints(item.spec?.version, limit)
          )
      })
      return filteredDruidVersions.map((item) => {
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

      if (num1 > num2) return 1
      if (num1 < num2) return -1
    }
    return 0
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

  function initNamespace() {
    const { namespace } = route.query || {}
    return namespace || null
  }

  function initDatabaseRef() {
    // watchDependency('model#/metadata/namespace')
    const { name } = route.params || {}
    return name
  }

  function onNamespaceChange() {
    commit('wizard/model$delete', '/spec/type')
  }

  function onDbChange() {
    commit('wizard/model$delete', '/spec/type')
    getDbDetails()
  }

  // ============================================================
  // OPSREQUEST TYPE FUNCTIONS
  // ============================================================

  function getRequestTypeFromRoute() {
    const isDbloading = isDbDetailsLoading()
    const { query } = route || {}
    const { requestType } = query || {}
    return isDbloading ? '' : requestType || ''
  }

  function onRequestTypeChange() {
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

  function ifRequestTypeEqualsTo(type) {
    const selectedType = getValue(model, '/spec/type')
    // watchDependency('model#/spec/type')
    return selectedType === type
  }

  function asDatabaseOperation() {
    return !!route.params.actions
  }

  function generateOpsRequestNameForClusterUI() {
    const dbName = getValue(model, '/spec/databaseRef/name')
    const selectedType = getValue(model, '/spec/type')
    const lowerType = selectedType ? String(selectedType).toLowerCase() : ''
    const resources = route.params.resource || ''
    const resource = resources.slice(0, -1)
    const opsName = dbName ? dbName : resource
    return `${opsName}-${Math.floor(Date.now() / 1000)}${lowerType ? '-' + lowerType : ''}`
  }

  function showAndInitName() {
    // watchDependency('model#/spec/type')
    // watchDependency('model#/spec/databaseRef/name')
    const ver = asDatabaseOperation()
    const selectedType = getValue(model, '/spec/type')
    const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

    if (ver) {
      commit('wizard/model$update', {
        path: '/metadata/name',
        value: `${route.params.name}-${Math.floor(Date.now() / 1000)}-${lowerType}`,
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: '/metadata/name',
        value: generateOpsRequestNameForClusterUI(),
        force: true,
      })
    }
    return !ver
  }

  function showAndInitNamespace() {
    const ver = asDatabaseOperation()
    if (ver) {
      commit('wizard/model$update', {
        path: '/metadata/namespace',
        value: `${route.query.namespace}`,
        force: true,
      })
    }
    return !ver
  }

  function showAndInitDatabaseRef() {
    const ver = asDatabaseOperation()
    if (ver) {
      commit('wizard/model$update', {
        path: '/spec/databaseRef/name',
        value: `${route.params.name}`,
        force: true,
      })
    }
    return !ver
  }

  function showAndInitOpsRequestType() {
    const ver = asDatabaseOperation()
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
      const operation = storeGet('/resource/activeActionItem/result/operationId') || ''
      const match = /^(.*)-opsrequest-(.*)$/.exec(operation)
      const opstype = match ? match[2] : ''
      commit('wizard/model$update', {
        path: '/spec/type',
        value: opMap[opstype],
        force: true,
      })
    }
    return !ver
  }

  function showConfigureOpsrequestLabel() {
    return !asDatabaseOperation()
  }

  function isNamespaceDisabled() {
    const { namespace } = route.query || {}
    return !!namespace
  }

  function isDatabaseRefDisabled() {
    const { name } = route.params || {}
    return !!name
  }

  function isDbDetailsLoading() {
    // watchDependency('discriminator#/dbDetails')
    // watchDependency('model#/spec/databaseRef/name')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const dbName = getValue(model, '/spec/databaseRef/name')
    return !dbDetails || !dbName
  }

  // ============================================================
  // DATABASE TYPE FUNCTIONS (Druid-specific)
  // ============================================================

  function getDbType() {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const { spec } = dbDetails || {}
    const { topology } = spec || {}

    if (topology) {
      return 'topology'
    } else {
      return 'combined'
    }
  }

  function ifDbTypeEqualsTo(type, mode, section) {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const { spec } = dbDetails || {}
    const { topology } = spec || {}

    if (mode === 'combined') {
      // For combined mode, check if topology doesn't exist
      const isCombined = !topology

      // Clear unused topology configurations when in combined mode
      if (isCombined && section) {
        clearOpsReqSpec(getValue, commit, 'combined', section)
      }

      return isCombined
    } else if (mode === 'topology') {
      // For topology mode, check if the specific node type exists
      const hasTopology = !!(topology && topology[type])

      // Clear unused combined configurations when in topology mode
      if (hasTopology && section) {
        clearOpsReqSpec(getValue, commit, type, section)
      }

      return hasTopology
    }

    return false
  }

  function clearOpsReqSpec(getValue, commit, type, opsReqType) {
    if (
      opsReqType === 'verticalScaling' ||
      opsReqType === 'horizontalScaling' ||
      opsReqType === 'volumeExpansion' ||
      opsReqType === 'configuration'
    ) {
      const dbType = getDbType()

      if (dbType === 'topology') {
        // Clear combined mode configurations
        commit('wizard/model$delete', `/spec/${opsReqType}/node`)

        // Clear other topology node types except the current one
        druidNodeTypes.forEach((nodeType) => {
          if (nodeType !== type) {
            commit('wizard/model$delete', `/spec/${opsReqType}/${nodeType}`)
          }
        })
      } else if (dbType === 'combined') {
        // Clear all topology-specific configurations
        druidNodeTypes.forEach((nodeType) => {
          commit('wizard/model$delete', `/spec/${opsReqType}/${nodeType}`)
        })
      }
    }
  }

  // ============================================================
  // MACHINE PROFILE FUNCTIONS
  // ============================================================

  function getMachines(type) {
    const presets = storeGet('/kubedbuiPresets') || {}
    const dbDetails = getValue(discriminator, '/dbDetails')

    let limits = {}

    if (type === 'node' || !type) {
      // Combined mode
      limits = dbDetails?.spec?.podTemplate?.spec?.resources?.requests || { cpu: '', memory: '' }
    } else {
      // Topology mode - specific node type
      limits = dbDetails?.spec?.topology?.[type]?.podTemplate?.spec?.resources?.requests || { cpu: '', memory: '' }
    }

    const avlMachines = presets.admin?.machineProfiles?.available || []
    let arr = []

    if (avlMachines.length) {
      arr = avlMachines.map((machine) => {
        if (machine === 'custom')
          return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
        else {
          const machineData = machinesFromPreset.find((val) => val.id === machine)
          if (machineData) {
            const text = machineData.name ? machineData.name : machineData.id
            return {
              text,
              value: {
                machine: text,
                cpu: machineData.limits.cpu,
                memory: machineData.limits.memory,
              },
            }
          } else return { text: machine, value: { machine } }
        }
      })
    } else {
      arr = machineList
        .map((machine) => {
          if (machine === 'custom')
            return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
          const text = machine
          return {
            text,
            value: {
              machine: text,
              cpu: machines[machine].resources.limits.cpu,
              memory: machines[machine].resources.limits.memory,
            },
          }
        })
        .filter((val) => !!val)
    }
    return arr
  }

  function setMachine(type) {
    const dbDetails = getValue(discriminator, '/dbDetails')

    let limits = {}

    if (type === 'node' || !type) {
      // Combined mode
      limits = dbDetails?.spec?.podTemplate?.spec?.resources?.requests || { cpu: '', memory: '' }
    } else {
      // Topology mode - specific node type
      limits = dbDetails?.spec?.topology?.[type]?.podTemplate?.spec?.resources?.requests || { cpu: '', memory: '' }
    }

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
    else return { machine: 'custom', cpu: limits.cpu, memory: limits.memory }
  }

  function onMachineChange(type, path) {
    let selectedMachine = ''
    selectedMachine = getValue(discriminator, `/machine-${type}`)
    const machine = machinesFromPreset.find((item) => item.id === selectedMachine)

    let obj = {}
    if (selectedMachine !== 'custom') {
      if (machine) obj = { limits: { ...machine?.limits }, requests: { ...machine?.limits } }
      else obj = machines[selectedMachine]?.resources
    } else {
      const val = getValue(discriminator, `/dbDetails${path}`) || {}
      obj = Array.isArray(val) ? val[0]?.resources : { ...val }
    }

    const specPath = `/spec/verticalScaling/${type}/resources`

    if (obj && Object.keys(obj).length)
      commit('wizard/model$update', {
        path: specPath,
        value: obj,
        force: true,
      })

    // Update metadata.annotations
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

  function isMachineCustom(path) {
    // watchDependency(`discriminator#${path}`)
    const machine = getValue(discriminator, `${path}`)
    return machine === 'custom'
  }

  function setValueFromDbDetails(watchPath, commitPath) {
    // watchDependency(`discriminator#${watchPath}`)
    const retValue = getValue(discriminator, `/dbDetails${watchPath}`)

    if (commitPath) {
      const tlsOperation = getValue(discriminator, '/tlsOperation')
      if (commitPath.includes('/spec/tls') && tlsOperation !== 'update') return undefined

      commit('wizard/model$update', {
        path: commitPath,
        value: retValue,
        force: true,
      })
    }
    return retValue || undefined
  }

  // ============================================================
  // VERTICAL SCALING FUNCTIONS
  // ============================================================

  function isVerticalScaleTopologyRequired(type) {
    // watchDependency(`discriminator#/topologyKey-${type}`)
    // watchDependency(`discriminator#/topologyValue-${type}`)

    const key = getValue(discriminator, `/topologyKey-${type}`)
    const value = getValue(discriminator, `/topologyValue-${type}`)
    const path = `/spec/verticalScaling/${type}/topology`

    if (key || value) {
      commit('wizard/model$update', {
        path: path,
        value: { key, value },
        force: true,
      })
      return ''
    } else {
      commit('wizard/model$delete', path)
      return false
    }
  }

  // ============================================================
  // VOLUME EXPANSION FUNCTIONS
  // ============================================================

  function checkVolume(currentVolPath, newVolPath) {
    // watchDependency(`discriminator#${currentVolPath}`)
    // watchDependency(`model#${newVolPath}`)

    const volume = getValue(discriminator, `/dbDetails${currentVolPath}`)
    const input = getValue(model, newVolPath)

    try {
      const sizeInBytes = parseSize(volume)
      const inputSizeInBytes = parseSize(input)

      if (inputSizeInBytes >= sizeInBytes) return
      else return 'Cannot expand to lower volume!'
    } catch (err) {
      return err.message || 'Invalid'
    }
  }

  function parseSize(sizeStr) {
    const units = {
      '': 1,
      K: 1e3,
      M: 1e6,
      G: 1e9,
      T: 1e12,
      P: 1e15,
      E: 1e18,
      Ki: 1024,
      Mi: 1024 ** 2,
      Gi: 1024 ** 3,
      Ti: 1024 ** 4,
      Pi: 1024 ** 5,
      Ei: 1024 ** 6,
    }

    const match = String(sizeStr).match(/^([0-9]+(?:\.[0-9]*)?)\s*([A-Za-z]*)$/)
    if (!match) throw new Error('Invalid size format')

    const value = parseFloat(match[1])
    const unit = match[2]

    if (!(unit in units))
      throw new Error('Unrecognized unit. Available units are K, Ki, M, Mi, G, Gi etc')

    return value * units[unit]
  }

  // ============================================================
  // CONFIGURATION FUNCTIONS
  // ============================================================

  /**
   * Fetch all secrets from the current namespace for configuration
   * Populates the global secretArray for later use in config secret value display
   * @returns {Array} List of secrets with text/value properties
   */
  async function getConfigSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency('model#/metadata/namespace')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    )

    const secrets = (resp && resp.data && resp.data.items) || []
    secretArray = secrets

    const filteredSecrets = secrets

    filteredSecrets.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      item.text = name
      item.value = name
      return true
    })
    return filteredSecrets
  }

  /**
   * Generate URL for creating a new secret in the console
   * @returns {String} URL to secret creation page
   */
  function createSecretUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const domain = storeGet('/domain') || ''
    if (domain.includes('bb.test')) {
      return `http://console.bb.test:5990/console/${user}/kubernetes/${cluster}/core/v1/secrets/create`
    } else {
      const editedDomain = domain.replace('kubedb', 'console')
      return `${editedDomain}/console/${user}/kubernetes/${cluster}/core/v1/secrets/create`
    }
  }

  /**
   * Display the name of the currently selected config secret
   * @param {Object} params - Function parameters
   * @param {String} type - Node type (optional, Druid doesn't use it)
   * @returns {String} Message indicating selected secret
   */
  function getSelectedConfigSecret(type) {
    // Druid doesn't use type-specific paths, just /spec/configuration/configSecret/name
    const path = type ? `/spec/configuration/${type}/configSecret/name` : `/spec/configuration/configSecret/name`
    const selectedSecret = getValue(model, path)
    // watchDependency(`model#${path}`)
    return `You have selected ${selectedSecret} secret` || 'No secret selected'
  }

  /**
   * Get the YAML representation of the selected config secret's data
   * @param {Object} params - Function parameters
   * @param {String} type - Node type (optional, Druid doesn't use it)
   * @returns {String} YAML formatted secret data
   */
  function getSelectedConfigSecretValue(type) {
    // Druid doesn't use type-specific paths, just /spec/configuration/configSecret/name
    const path = type ? `/spec/configuration/${type}/configSecret/name` : `/spec/configuration/configSecret/name`
    // watchDependency(`model#${path}`)
    const selectedSecret = getValue(model, path)
    let data
    secretArray.forEach((item) => {
      if (item.value === selectedSecret) {
        data = objectToYaml(item.data).trim() || 'No Data Found'
      }
    })
    return data || 'No Data Found'
  }

  /**
   * Convert a JavaScript object to YAML format string
   * @param {Object|Array|*} obj - Object to convert
   * @param {Number} indent - Current indentation level
   * @returns {String} YAML formatted string
   */
  function objectToYaml(obj, indent = 0) {
    if (obj === null || obj === undefined) return 'null'
    if (typeof obj !== 'object') return JSON.stringify(obj)

    const spaces = '  '.repeat(indent)

    if (Array.isArray(obj)) {
      return obj
        .map((item) => `${spaces}- ${objectToYaml(item, indent + 1).trimStart()}`)
        .join('\n')
    }

    return Object.keys(obj)
      .map((key) => {
        const value = obj[key]
        const keyLine = `${spaces}${key}:`

        if (value === null || value === undefined) {
          return `${keyLine} null`
        }

        if (typeof value === 'object') {
          const nested = objectToYaml(value, indent + 1)
          return `${keyLine}\n${nested}`
        }

        if (typeof value === 'string') {
          return `${keyLine} "${value}"`
        }

        return `${keyLine} ${value}`
      })
      .join('\n')
  }

  /**
   * Set the selected config secret name in the model
   * @param {Object} params - Function parameters
   * @param {String} value - Secret name to set
   * @param {String} type - Node type (e.g., 'brokers', 'historicals')
   */
  function setSelectedConfigSecret(value, type) {
    const path = `/spec/configuration/${type}/configSecret/name`
    commit('wizard/model$update', {
      path: path,
      value: value,
      force: true,
    })
  }

  /**
   * Alternative function to get config secret data (MongoDB pattern)
   * Similar to getSelectedConfigSecretValue but with different naming
   * @param {Object} params - Function parameters
   * @param {String} type - Node type
   * @returns {String} YAML formatted secret data
   */
  function getSelectedConfigSecretData(type) {
    const path = `/spec/configuration/${type}/configSecret/name`
    // watchDependency(`model#${path}`)
    const selectedSecret = getValue(model, path)
    let data
    secretArray.forEach((item) => {
      if (item.value === selectedSecret) {
        data = objectToYaml(item.data).trim() || 'No Data Found'
      }
    })
    return data || 'No Data Found'
  }

  function onApplyconfigChange(type) {
    const configPath = `/${type}/applyConfig`
    const applyconfig = getValue(discriminator, configPath)

    const configObj = {}

    if (applyconfig) {
      applyconfig.forEach((item) => {
        const { key, value } = item
        configObj[key] = value
      })
    }

    commit('wizard/model$update', {
      path: `/spec/configuration/${type}/applyConfig`,
      value: configObj,
      force: true,
    })
  }

  // ============================================================
  // RECONFIGURATION FUNCTIONS
  // ============================================================

  function ifReconfigurationTypeEqualsTo(value, property) {
    let path = '/reconfigurationType'
    if (property) path += `-${property}`
    const reconfigurationType = getValue(discriminator, path)
    const watchPath = `discriminator#${path}`
    // watchDependency(watchPath)
    return reconfigurationType === value
  }

  function onReconfigurationTypeChange(property) {
    setDiscriminatorValue(`/${property}/applyConfig`, [])
    let path = '/reconfigurationType'
    if (property) path += `-${property}`
    const reconfigurationType = getValue(discriminator, path)

    if (reconfigurationType === 'remove') {
      commit('wizard/model$delete', `/spec/configuration/${property}`)
      commit('wizard/model$update', {
        path: `/spec/configuration/${property}/removeCustomConfig`,
        value: true,
        force: true,
      })
    } else {
      commit('wizard/model$delete', `/spec/configuration/${property}/configSecret`)
      commit('wizard/model$delete', `/spec/configuration/${property}/applyConfig`)
      commit('wizard/model$delete', `/spec/configuration/${property}/removeCustomConfig`)
    }
  }

  // ============================================================
  // TLS FUNCTIONS
  // ============================================================

  function getDbTls() {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const { spec } = dbDetails || {}
    return spec?.tls || undefined
  }

  function hasTlsField() {
    const tls = getDbTls()
    return !!tls
  }

  function setApiGroup() {
    return commit('wizard/model$update', {
      path: '/spec/tls/issuerRef/apiGroup',
      value: 'cert-manager.io',
      force: true,
    })
  }

  function onSetAliasChange() {
    const alias = itemCtx.alias
    if (alias) {
      commit('wizard/model$update', {
        path: '/alias',
        value: alias,
        force: true,
      })
    }
  }

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
  }

  function showIssuerRefAndCertificates() {
    // watchDependency('discriminator#/tlsOperation')
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'
    return verd
  }

  function onIssuerRefChange() {
    setApiGroup()
  }

  function hasIssuerRefName() {
    // watchDependency('model#/spec/tls/issuerRef/name')
    const name = getValue(model, '/spec/tls/issuerRef/name')
    return !!name
  }

  function hasNoIssuerRefName() {
    // watchDependency('model#/spec/tls/issuerRef/name')
    const name = getValue(model, '/spec/tls/issuerRef/name')
    return !name
  }

  function showTlsConfigureSection() {
    // watchDependency('discriminator#/tlsOperation')
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    return tlsOperation === 'update'
  }

  function initIssuerRefApiGroup() {
    const kind = getValue(model, '/spec/tls/issuerRef/kind')
    // watchDependency('model#/spec/tls/issuerRef/kind')
    if (kind) {
      return 'cert-manager.io'
    } else return undefined
  }

  async function getIssuerRefsName() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // watchDependency('model#/spec/tls/issuerRef/kind')
    // watchDependency('model#/metadata/namespace')
    const kind = getValue(model, '/spec/tls/issuerRef/kind')
    const namespace = getValue(model, '/metadata/namespace')

    if (kind === 'Issuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/namespaces/${namespace}/issuers`
      return getIssuer(url)
    } else if (kind === 'ClusterIssuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/charts.x-helm.dev/v1alpha1/clusterchartpresets/kubedb-ui-presets`

      let presets = storeGet('/kubedbuiPresets') || {}
      if (!storeGet('/route/params/actions')) {
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

  function onTlsOperationChange() {
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    commit('wizard/model$delete', '/spec/tls')

    if (tlsOperation === 'rotate') {
      commit('wizard/model$update', {
        path: '/spec/tls/rotateCertificates',
        value: true,
        force: true,
      })
    } else if (tlsOperation === 'remove') {
      commit('wizard/model$update', {
        path: '/spec/tls/remove',
        value: true,
        force: true,
      })
    }
  }

  function isIssuerRefRequired() {
    const hasTls = hasTlsField()
    return hasTls ? false : ''
  }

  function fetchAliasOptions() {
    return getAliasOptions ? getAliasOptions() : []
  }

  function validateNewCertificates() {
    const addedAliases = (model && model.map((item) => item.alias)) || []

    if (addedAliases.includes(itemCtx.alias) && itemCtx.isCreate) {
      return { isInvalid: true, message: 'Alias already exists' }
    }
    return {}
  }

  function disableAlias() {
    return !!(model && model.alias)
  }

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  // ============================================================
  // RESOURCE MANAGEMENT FUNCTIONS
  // ============================================================

  function isToggleOn(path) {
    // watchDependency(`discriminator#${path}`)
    const val = getValue(discriminator, path)
    return !!val
  }

  async function getResources(group, version, resource) {
    const namespace = getValue(model, '/metadata/namespace')

    let resources = await getNamespacedResourceList({
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

  async function getNamespacedResourceList({ namespace, group, version, resource }) {
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

  async function getResourceList({ group, version, resource }) {
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

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency('model#/metadata/namespace')

    let resources = await getNamespacedResourceList({
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

  async function unNamespacedResourceNames(group, version, resource) {
    let resources = await getResourceList({
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

  function unsets(path) {
    const val = getValue(discriminator, path)
    if (val) {
      commit('wizard/model$delete', path)
    }
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function isEqualToValueFromType(value) {
    // watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
  }

  function disableOpsRequest() {
    return false
  }

  // ============================================================
  // ADDITIONAL HELPER FUNCTIONS (from MongoDB patterns)
  // ============================================================

  /**
   * Utility function to safely get nested values from objects
   * @param {Object} obj - The object to traverse
   * @param {String} path - Dot notation path (e.g., 'spec.topology.brokers')
   * @param {*} defaultValue - Default value if path not found
   * @returns {*} The value at the path or default value
   */
  function getNestedValue(obj, path, defaultValue = undefined) {
    if (!obj || !path) return defaultValue
    const keys = path.split('.')
    let result = obj
    for (const key of keys) {
      if (result === null || result === undefined) return defaultValue
      result = result[key]
    }
    return result !== undefined ? result : defaultValue
  }

  /**
   * Check if the current database has specific topology configuration
   * @param {String} topologyType - The topology type to check
   * @returns {Boolean} Whether the topology exists
   */
  function hasTopologyType(topologyType) {
    const dbDetails = getValue(discriminator, '/dbDetails')
    return !!(dbDetails?.spec?.topology?.[topologyType])
  }

  /**
   * Get resource limits or requests from database details
   * @param {String} type - Node type (e.g., 'brokers', 'historicals')
   * @param {String} resourceType - 'limits' or 'requests'
   * @returns {Object} Resource configuration
   */
  function getResourceConfig(type, resourceType = 'requests') {
    const dbDetails = getValue(discriminator, '/dbDetails')
    if (type === 'node' || !type) {
      return dbDetails?.spec?.podTemplate?.spec?.resources?.[resourceType] || { cpu: '', memory: '' }
    } else {
      return dbDetails?.spec?.topology?.[type]?.podTemplate?.spec?.resources?.[resourceType] || { cpu: '', memory: '' }
    }
  }

  // ============================================================
  // RETURN ALL EXPORTED FUNCTIONS
  // ============================================================

  return {
    // Core utility functions
    fetchJsons,
    returnFalse,
    isEqualToModelPathValue,
    isRancherManaged,

    // Namespace & database resource functions
    getNamespaces,
    getDbs,
    getDbDetails,
    getDbVersions,
    initNamespace,
    initDatabaseRef,
    onNamespaceChange,
    onDbChange,

    // OpsRequest type functions
    getRequestTypeFromRoute,
    onRequestTypeChange,
    ifRequestTypeEqualsTo,
    showAndInitName,
    showAndInitNamespace,
    showAndInitDatabaseRef,
    showAndInitOpsRequestType,
    showConfigureOpsrequestLabel,
    isNamespaceDisabled,
    isDatabaseRefDisabled,
    isDbDetailsLoading,

    // Database type functions
    getDbType,
    getDbTls,
    ifDbTypeEqualsTo,
    clearOpsReqSpec,
    disableOpsRequest,

    // Machine profile functions
    getMachines,
    setMachine,
    onMachineChange,
    isMachineCustom,
    setValueFromDbDetails,

    // Vertical scaling functions
    isVerticalScaleTopologyRequired,

    // Volume expansion functions
    checkVolume,
    parseSize,

    // Configuration functions
    getConfigSecrets,
    createSecretUrl,
    getSelectedConfigSecret,
    getSelectedConfigSecretValue,
    getSelectedConfigSecretData,
    setSelectedConfigSecret,
    onApplyconfigChange,

    // Reconfiguration functions
    ifReconfigurationTypeEqualsTo,
    onReconfigurationTypeChange,

    // TLS functions
    hasTlsField,
    setApiGroup,
    onSetAliasChange,
    getAliasOptions,
    showIssuerRefAndCertificates,
    onIssuerRefChange,
    hasIssuerRefName,
    hasNoIssuerRefName,
    showTlsConfigureSection,
    initIssuerRefApiGroup,
    getIssuerRefsName,
    initTlsOperation,
    onTlsOperationChange,
    isIssuerRefRequired,
    fetchAliasOptions,
    validateNewCertificates,
    disableAlias,

    // Helper functions
    isToggleOn,
    getResources,
    resourceNames,
    unNamespacedResourceNames,
    getNamespacedResourceList,
    getResourceList,
    unsets,
    setApplyToIfReady,
    isEqualToValueFromType,
    objectToYaml,

    // Additional helper functions
    getNestedValue,
    hasTopologyType,
    getResourceConfig,
  }
}
