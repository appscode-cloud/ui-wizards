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

let elasticVersions = []
let machinesFromPreset = []
let getAliasOptions = null

export const useFunc = (model) => {
  const route = store.state?.route
  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  getDbDetails()
  showAndInitOpsRequestType()

  async function getDbs() {
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency('model#/metadata/namespace')

    if (storeGet('/route/params/actions')) return []

    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await store.state.$axios.get(
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
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getDbDetails() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace')
    const name = storeGet('/route/params/name') || getValue(model, '/spec/databaseRef/name')

    if (namespace && name) {
      const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/elasticsearches/${name}`

      try {
        const resp = await store.state.$axios.get(url)

        const { version } = resp?.data?.spec || {}
        const selectedVersion = elasticVersions?.find((item) => item?.metadata?.name === version)

        if (resp?.data?.spec) {
          resp.data.spec.authPlugin = selectedVersion?.spec?.authPlugin || ''
        }

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
        const presetResp = await store.state.$axios.get(url)
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

      const resp = await store.state.$axios.get(
        `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/elasticsearchversions`,
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

  function getRequestTypeFromRoute() {
    if (route.params?.actions) {
      const operation = route.params.actions
      const match = /^(.*)-opsrequest-(.*)$/.exec(operation)
      const opstype = match?.[2]
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
      return opMap[opstype] || ''
    }
    return ''
  }

  function showAndInitOpsRequestType() {
    const ver = asDatabaseOperation()
    if (ver) {
      const operation = route.params.actions
      const match = /^(.*)-opsrequest-(.*)$/.exec(operation)
      const opstype = match?.[2]
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
      commit('wizard/model$update', {
        path: '/spec/type',
        value: opMap[opstype],
        force: true,
      })
    }
    return !ver
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

  function showConfigureOpsrequestLabel() {
    return !asDatabaseOperation()
  }

  function isDbDetailsLoading() {
    // watchDependency('discriminator#/dbDetails')
    // watchDependency('model#/spec/databaseRef/name')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const dbName = getValue(model, '/spec/databaseRef/name')

    return !dbDetails || !dbName
  }

  function getNamespaces() {
    if (storeGet('/route/params/actions')) return []

    const namespaces = storeGet('/cluster/namespaces') || []
    return namespaces.map((item) => {
      return {
        text: item,
        value: item,
      }
    })
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

  function isNamespaceDisabled() {
    const { namespace } = route.query || {}
    return !!namespace
  }

  function isDatabaseRefDisabled() {
    const { name } = route.params || {}
    return !!name
  }

  function ifRequestTypeEqualsTo(value) {
    const selectedType = getValue(model, '/spec/type')
    // watchDependency('model#/spec/type')

    return selectedType === value
  }

  function setValueFromDbDetails(path, commitPath) {
    // watchDependency('discriminator#/dbDetails')
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

  function getDbType() {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const { spec } = dbDetails || {}
    const { topology } = spec || {}
    let verd = ''
    if (topology) {
      verd = 'Topology'
    } else {
      verd = 'Combined'
    }

    return verd
  }

  function ifDbTypeEqualsTo(value, opsReqType) {
    const verd = getDbType()

    clearOpsReqSpec(verd, opsReqType)
    return value === verd
  }

  function clearOpsReqSpec(verd, opsReqType) {
    if (
      opsReqType === 'verticalScaling' ||
      opsReqType === 'horizontalScaling' ||
      opsReqType === 'VolumeExpansion' ||
      opsReqType === 'configuration'
    ) {
      if (verd === 'Combined') {
        commit('wizard/model$delete', `/spec/${opsReqType}/topology`)
      } else {
        commit('wizard/model$delete', `/spec/${opsReqType}/node`)
      }
    }
  }

  function isAuthPluginNotEqualTo(value) {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const authPlugin = dbDetails?.spec?.authPlugin || ''

    return authPlugin && authPlugin !== value
  }

  function isAuthPluginEqualTo(value) {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const authPlugin = dbDetails?.spec?.authPlugin || ''

    return authPlugin === value
  }

  function hasResourceValue(node) {
    // watchDependency('discriminator#/dbDetails')
    const nodeResource = getValue(discriminator, `/dbDetails/spec/topology/${node}/resources`)
    return !!nodeResource
  }

  function getMachines() {
    const presets = storeGet('/kubedbuiPresets') || {}
    const dbDetails = getValue(discriminator, '/dbDetails')
    const limits = dbDetails?.spec?.podTemplate?.spec?.resources?.limits || {}

    const avlMachines = presets.admin?.machineProfiles?.available || []
    let arr = []
    if (avlMachines.length) {
      arr = avlMachines.map((machine) => {
        if (machine === 'custom')
          return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
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
          if (machine === 'custom')
            return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
          const subText = `CPU: ${machines[machine].resources.limits.cpu}, Memory: ${machines[machine].resources.limits.memory}`
          const text = machine
          return { text, subText, value: machine }
        })
        .filter((val) => !!val)
    }
    return arr
  }

  function setMachine(type) {
    const dbDetails = getValue(discriminator, '/dbDetails')
    const limits = dbDetails?.spec?.podTemplate?.spec?.resources?.limits || {}
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
      return { isInvalid: false }
    } else {
      commit('wizard/model$delete', path)
      return { isInvalid: false }
    }
  }

  function hasVolumeExpansion(node) {
    // watchDependency('discriminator#/dbDetails')
    const nodeStorage = getValue(
      discriminator,
      `/dbDetails/spec/topology/${node}/storage/resources/requests/storage`,
    )
    return !!nodeStorage
  }

  function checkVolume(initpath, path) {
    const volume = getValue(discriminator, `/dbDetails${initpath}`)
    const input = getValue(model, path)

    try {
      const sizeInBytes = parseSize(volume)
      const inputSizeInBytes = parseSize(input)

      if (inputSizeInBytes >= sizeInBytes) return
      else return { isInvalid: true, message: 'Cannot expand to lower volume!' }
    } catch (err) {
      return { isInvalid: true, message: err.message || 'Invalid' }
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

  function hasTlsField() {
    const tls = getDbTls()
    return !!tls
  }

  function getDbTls() {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const { spec } = dbDetails || {}
    return (spec && spec.tls) || undefined
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

  function showIssuerRefAndCertificates() {
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    // watchDependency('discriminator#/tlsOperation')
    const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'

    return verd
  }

  function returnTrue() {
    return true
  }

  function initIssuerRefApiGroup() {
    const kind = getValue(model, '/spec/tls/issuerRef/kind')
    // watchDependency('model#/spec/tls/issuerRef/kind')

    if (kind) {
      const apiGroup = getValue(discriminator, '/dbDetails/spec/tls/issuerRef/apiGroup')
      if (apiGroup) return apiGroup
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
          const presetResp = await store.state.$axios.get(url)
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
        const resp = await store.state.$axios.get(url)
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

  function isIssuerRefRequired() {
    const hasTls = hasTlsField()
    return !hasTls
  }

  // Certificate functions
  function fetchAliasOptions() {
    return getAliasOptions ? getAliasOptions() : []
  }

  function validateNewCertificates({ itemCtx }) {
    const addedAliases = (model && model.map((item) => item.alias)) || []
    if (addedAliases.includes(itemCtx.alias) && itemCtx.isCreate) {
      return { isInvalid: true, message: 'Alias already exists' }
    }
    return {}
  }

  function disableAlias() {
    return !!(model && model.alias)
  }

  getAliasOptions = () => {
    // watchDependency('discriminator#/dbDetails')

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

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function returnFalse() {
    return false
  }

  return {
    returnFalse,
    getNamespaces,
    getDbs,
    getDbDetails,
    getDbVersions,
    ifRequestTypeEqualsTo,
    getDbTls,
    getDbType,
    initNamespace,
    initDatabaseRef,
    showAndInitName,
    showAndInitNamespace,
    showAndInitDatabaseRef,
    showConfigureOpsrequestLabel,
    showAndInitOpsRequestType,
    ifDbTypeEqualsTo,
    isAuthPluginEqualTo,
    isAuthPluginNotEqualTo,
    isDbDetailsLoading,
    setValueFromDbDetails,
    hasResourceValue,
    hasVolumeExpansion,
    isNamespaceDisabled,
    isDatabaseRefDisabled,
    setApplyToIfReady,
    isVerticalScaleTopologyRequired,
    getMachines,
    setMachine,
    checkVolume,
    getRequestTypeFromRoute,
    hasTlsField,
    initTlsOperation,
    onTlsOperationChange,
    showIssuerRefAndCertificates,
    returnTrue,
    initIssuerRefApiGroup,
    getIssuerRefsName,
    isIssuerRefRequired,
    fetchAliasOptions,
    validateNewCertificates,
    disableAlias,
  }
}
