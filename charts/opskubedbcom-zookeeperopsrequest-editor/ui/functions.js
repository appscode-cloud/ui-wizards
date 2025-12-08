const { axios, useOperator, store } = window.vueHelpers || {}

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

let machinesFromPreset = []

export const useFunc = (model) => {
  const route = store.state?.route

  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  getDbDetails()
  showAndInitOpsRequestType()

  function returnFalse() {
    return false
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

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
    // watchDependency'model#/metadata/namespace')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/zookeepers`,
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
      const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/zookeepers/${name}`
      const resp = await axios.get(url)

      setDiscriminatorValue('/dbDetails', resp.data || {})

      return resp.data || {}
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
      const presetVersions = presets.admin?.databases?.ZooKeeper?.versions?.available || []
      const queryParams = {
        filter: {
          items: {
            metadata: { name: null },
            spec: { version: null, deprecated: null, updateConstraints: null },
          },
        },
      }

      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/zookeeperversions`,
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

      // keep only non deprecated & kubedb-ui-presets & within constraints of current version
      // if presets.status is 404, it means no presets available, no need to filter with presets
      const filteredZooKeeperVersions = sortedVersions.filter((item) => {
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

      return filteredZooKeeperVersions.map((item) => {
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

  function ifRequestTypeEqualsTo(type) {
    const selectedType = getValue(model, '/spec/type')
    // watchDependency'model#/spec/type')

    return selectedType === type
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

  function disableOpsRequest() {
    if (itemCtx.value === 'HorizontalScaling') {
      const dbType = getDbType({
        discriminator,
        getValue,
      })

      if (dbType === 'Standalone') return true
      else return false
    } else return false
  }

  function getDbTls() {
    // watchDependency'discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const { spec } = dbDetails || {}
    return spec?.tls || undefined
  }

  function getDbType() {
    // watchDependency'discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const { spec } = dbDetails || {}
    const { mode } = spec || {}

    return mode || 'Standalone'
  }

  function initNamespace() {
    const { namespace } = route.query || {}
    return namespace || null
  }

  function initDatabaseRef() {
    // watchDependency'model#/metadata/namespace')
    const { name } = route.params || {}
    return name
  }

  function asDatabaseOperation(route) {
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
    // watchDependency'model#/spec/type')
    // watchDependency'model#/spec/databaseRef/name')
    const ver = asDatabaseOperation(route)

    const selectedType = getValue(model, '/spec/type')
    const lowerType = selectedType ? String(selectedType).toLowerCase() : ''

    if (ver) {
      // For kubedb-ui
      commit('wizard/model$update', {
        path: '/metadata/name',
        value: `${route.params.name}-${Math.floor(Date.now() / 1000)}-${lowerType}`,
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
  function showAndInitNamespace() {
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
  function showAndInitDatabaseRef() {
    const ver = asDatabaseOperation(route)
    if (ver) {
      commit('wizard/model$update', {
        path: '/spec/databaseRef/name',
        value: `${route.params.name}`,
        force: true,
      })
    }

    return !ver
  }
  function showConfigureOpsrequestLabel() {
    return !asDatabaseOperation(route)
  }
  function showAndInitOpsRequestType() {
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
      const operation = route.params.actions
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

  // for config secret
  let secretArray = []
  
  async function getConfigSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency'model#/metadata/namespace')

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
    
    secretArray = filteredSecrets
    return filteredSecrets
  }

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

  function getSelectedConfigSecret() {
    const path = '/spec/configuration/configSecret/name'
    const selectedSecret = getValue(model, path)
    // watchDependency(`model#${path}`)
    return `You have selected ${selectedSecret} secret` || 'No secret selected'
  }

  function getSelectedConfigSecretValue() {
    const path = '/spec/configuration/configSecret/name'
    const selectedSecret = getValue(model, path)
    let data
    secretArray.forEach((item) => {
      if (item.value === selectedSecret) {
        data = objectToYaml(item.data).trim() || 'No Data Found'
      }
    })
    return data || 'No Data Found'
  }


  function createSecretUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const domain = storeGet('/domain') || ''
    if (domain.includes('bb.test')) {
      return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/secrets/create`
    } else {
      const editedDomain = domain.replace('kubedb', 'console')
      return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/secrets/create`
    }
  }

  function isEqualToValueFromType(value) {
    // watchDependency'discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
  }

  async function getNamespacedResourceList(
    axios,
    storeGet,
    { namespace, group, version, resource },
  ) {
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

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency'model#/metadata/namespace')

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

  async function unNamespacedResourceNames(group, version, resource) {
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
  function ifReconfigurationTypeEqualsTo(value) {
    const reconfigurationType = getValue(discriminator, '/reconfigurationType')
    // watchDependency'discriminator#/reconfigurationType')

    return reconfigurationType === value
  }

  function onApplyconfigChange() {
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

  function onReconfigurationTypeChange() {
    const reconfigurationType = getValue(discriminator, '/reconfigurationType')
    setDiscriminatorValue('/applyConfig', [])
    if (reconfigurationType === 'remove') {
      commit('wizard/model$delete', `/spec/configuration`)

      commit('wizard/model$update', {
        path: `/spec/configuration/removeCustomConfig`,
        value: true,
        force: true,
      })
    } else {
      commit('wizard/model$delete', `/spec/configuration/configSecret`)
      commit('wizard/model$delete', `/spec/configuration/applyConfig`)
      commit('wizard/model$delete', `/spec/configuration/removeCustomConfig`)
    }
  }

  function getRequestTypeFromRoute() {
    const isDbloading = isDbDetailsLoading({ discriminator, model, getValue })
    const { query } = route || {}
    const { requestType } = query || {}
    return isDbloading ? '' : requestType || ''
  }

  // ************************************** Set db details *****************************************

  function isDbDetailsLoading() {
    // watchDependency'discriminator#/dbDetails')
    // watchDependency'model#/spec/databaseRef/name')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const dbName = getValue(model, '/spec/databaseRef/name')

    return !dbDetails || !dbName
  }

  function setValueFromDbDetails(path, commitPath) {
    // watchDependency'discriminator#/dbDetails')

    const retValue = getValue(discriminator, `/dbDetails${path}`)
    console.log(retValue)

    if (commitPath && retValue) {
      const tlsOperation = getValue(discriminator, '/tlsOperation')

      // computed called when tls fields is not visible
      if (commitPath.includes('/spec/tls') && tlsOperation !== 'update') return undefined

      // direct model update required for reusable element.
      // computed property is not applicable for reusable element
      commit('wizard/model$update', {
        path: commitPath,
        value: retValue,
        force: true,
      })
    }

    return retValue || undefined
  }

  function setResource(path) {
    // watchDependency'discriminator#/dbDetails')
    const containers = getValue(discriminator, `/dbDetails${path}`) || []
    const kind = getValue(discriminator, '/dbDetails/kind')
    const resource = containers.filter((ele) => ele.name === kind.toLowerCase())
    return resource[0].resources
  }

  function isNamespaceDisabled() {
    const { namespace } = route.query || {}
    return !!namespace
  }

  function isDatabaseRefDisabled() {
    const { name } = route.params || {}
    return !!name
  }

  function onNamespaceChange() {
    commit('wizard/model$delete', '/spec/type')
  }

  function onDbChange() {
    commit('wizard/model$delete', '/spec/type')
    getDbDetails({ axios, storeGet, model, getValue, setDiscriminatorValue })
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function isVerticalScaleTopologyRequired() {
    // watchDependency'discriminator#/topologyKey')
    // watchDependency'discriminator#/topologyValue')

    const key = getValue(discriminator, '/topologyKey')
    const value = getValue(discriminator, '/topologyValue')
    const path = `/spec/verticalScaling/zookeeper/topology`

    if (key || value) {
      commit('wizard/model$update', {
        path: path,
        value: { key, value },
        force: true,
      })
      return
    } else {
      commit('wizard/model$delete', path)
      return false
    }
  }

  // machine profile stuffs
  function getMachines() {
    const presets = storeGet('/kubedbuiPresets') || {}
    const dbDetails = getValue(discriminator, '/dbDetails')
    // const limits = dbDetails?.spec?.podTemplate?.spec?.resources?.limits || {}
    const limits = dbDetails?.spec?.podTemplate?.spec?.containers?.[0]?.resources?.requests
    const avlMachines = presets.admin?.machineProfiles?.available || []
    let arr = []
    if (avlMachines.length) {
      arr = avlMachines.map((machine) => {
        if (machine === 'custom')
          return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
        else {
          const machineData = machinesFromPreset.find((val) => val.id === machine)
          if (machineData) {
            // const subText = `CPU: ${machineData.limits.cpu}, Memory: ${machineData.limits.memory}`
            const text = machineData.name ? machineData.name : machineData.id
            return {
              text,
              // subText,
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
          // const subText = `CPU: ${machines[machine].resources.limits.cpu}, Memory: ${machines[machine].resources.limits.memory}`
          const text = machine
          return {
            text,
            // subText,
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

  function setMachine() {
    const dbDetails = getValue(discriminator, '/dbDetails')
    // const limits = dbDetails?.spec?.podTemplate?.spec?.resources?.limits || {}
    const limits = dbDetails?.spec?.podTemplate?.spec?.containers?.[0]?.resources?.requests
    const annotations = dbDetails?.metadata?.annotations || {}
    const machine = annotations['kubernetes.io/instance-type'] || 'custom'

    machinesFromPreset = storeGet('/kubedbuiPresets')?.admin?.machineProfiles?.machines || []

    const machinePresets = machinesFromPreset.find((item) => item.id === machine)
    if (machinePresets) return machine
    else return { machine: 'custom', cpu: limits.cpu, memory: limits.memory }
  }

  function onMachineChange(type, valPath) {
    let selectedMachine = ''
    selectedMachine = getValue(discriminator, '/machine')
    const machine = machinesFromPreset.find((item) => item.id === selectedMachine)

    let obj = {}
    if (selectedMachine !== 'custom') {
      if (machine) obj = { limits: { ...machine?.limits }, requests: { ...machine?.limits } }
      else obj = machines[selectedMachine]?.resources
    } else {
      const val = getValue(discriminator, `/dbDetails${valPath}`) || {}
      obj = Array.isArray(val) ? val[0]?.resources : { ...val }
    }

    const path = `/spec/verticalScaling/${type}/resources`

    if (obj && Object.keys(obj).length)
      commit('wizard/model$update', {
        path: path,
        value: obj,
        force: true,
      })

    // update metadata.annotations
    const annotations = getValue(model, '/metadata/annotations') || {}
    if (selectedMachine === 'custom') commit('wizard/model$delete', '/metadata/annotations')
    else {
      annotations['kubernetes.io/instance-type'] = selectedMachine
      if (machinesFromPreset.length)
        commit('wizard/model$update', {
          path: '/metadata/annotations',
          value: annotations,
          force: true,
        })
    }
  }

  function isMachineCustom() {
    // watchDependency'discriminator#/machine')
    const machine = getValue(discriminator, '/machine')
    return machine === 'custom'
  }

  function checkVolume(initpath, path) {
    const volume = getValue(discriminator, `/dbDetails${initpath}`)
    const input = getValue(model, path)

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

  return {
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
    isRancherManaged,
    showAndInitName,
    showAndInitNamespace,
    showAndInitDatabaseRef,
    showConfigureOpsrequestLabel,
    showAndInitOpsRequestType,
    getConfigSecrets,
    objectToYaml,
    getSelectedConfigSecret,
    getSelectedConfigSecretValue,
    createSecretUrl,
    isEqualToValueFromType,
    disableOpsRequest,
    getNamespacedResourceList,
    getResourceList,
    resourceNames,
    unNamespacedResourceNames,
    ifReconfigurationTypeEqualsTo,
    onReconfigurationTypeChange,
    onApplyconfigChange,
    getRequestTypeFromRoute,
    isDbDetailsLoading,
    setValueFromDbDetails,
    setResource,
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
    checkVolume,
  }
}
