const { axios, useOperator, store, useToast } = window.vueHelpers || {}
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

const configSecretKeys = ['kubedb-user.cnf']
let machinesFromPreset = []
let secretArray = []

export const useFunc = (model) => {
  const route = store.state?.route
  const toast = useToast()

  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  showAndInitOpsRequestType()
  function isTlsEnabled() {
    const dbDetails = getValue(discriminator, '/dbDetails')
    return (
      (dbDetails?.spec?.sslMode &&
        dbDetails?.spec?.sslMode !== 'disabled' &&
        dbDetails?.spec?.sslMode !== 'disable') ||
      dbDetails?.spec?.tls
    )
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
    // watchDependency('model#/metadata/namespace')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/perconaxtradbs`,
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
    machinesFromPreset = storeGet('/kubedbuiPresets')?.admin?.machineProfiles?.machines || []

    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace')
    const name = storeGet('/route/params/name') || getValue(model, '/spec/databaseRef/name')
    const version = storeGet('/route/params/version')
    if (namespace && name) {
      const url = `/clusters/${owner}/${cluster}/proxy/kubedb.com/${version}/namespaces/${namespace}/perconaxtradbs/${name}`
      const resp = await axios.get(url)

      setDiscriminatorValue('/dbDetails', resp.data || {})

      return resp.data || {}
    } else return {}
  }

  function ifRequestTypeEqualsTo(type) {
    const selectedType = getValue(model, '/spec/type')
    // watchDependency('model#/spec/type')

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

  function getDbTls() {
    // watchDependency('discriminator#/dbDetails')
    const dbDetails = getValue(discriminator, '/dbDetails')

    const { spec } = dbDetails || {}
    return spec?.tls || undefined
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

  function asDatabaseOperation() {
    return !!route.params.actions
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
        value: generateOpsRequestNameForClusterUI(getValue, model, route),
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
      if (match) {
        const opstype = match[2]
        commit('wizard/model$update', {
          path: '/spec/type',
          value: opMap[opstype],
          force: true,
        })
      }
    }

    return !ver
  }

  // // vertical scaling
  // // machine profile stuffs
  // let machinesFromPreset = []

  function getMachines() {
    const presets = storeGet('/kubedbuiPresets') || {}
    const limits = getLimits()

    const avlMachines = presets.admin?.machineProfiles?.available || []
    let arr = []
    if (avlMachines.length) {
      arr = avlMachines.map((machine) => {
        if (machine === 'custom')
          return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
        else {
          const machineData = machinesFromPreset.find((val) => val.id === machine)
          if (machineData) {
            const subtext = `CPU: ${machineData.limits.cpu}, Memory: ${machineData.limits.memory}`
            const text = machineData.name ? machineData.name : machineData.id
            return {
              text,
              subtext,
              value: {
                machine: text,
                cpu: machineData.limits.cpu,
                memory: machineData.limits.memory,
              },
            }
          } else
            return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
        }
      })
    } else {
      arr = machineList
        .map((machine) => {
          if (machine === 'custom')
            return { text: machine, value: { machine, cpu: limits.cpu, memory: limits.memory } }
          const subtext = `CPU: ${machines[machine].resources.limits.cpu}, Memory: ${machines[machine].resources.limits.memory}`
          const text = machine
          return {
            text,
            subtext,
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
    const limits = getLimits()
    const annotations = dbDetails?.metadata?.annotations || {}
    const instance = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      console.log(e)
      parsedInstance = instance || {}
    }
    const machine = parsedInstance || 'custom'

    const machinePresets = machinesFromPreset.find((item) => item.id === machine)
    if (machinePresets) {
      return {
        machine: machine,
        cpu: machinePresets.limits.cpu,
        memory: machinePresets.limits.memory,
      }
    } else return { machine: 'custom', cpu: limits.cpu, memory: limits.memory }
  }

  function onMachineChange(type) {
    const selectedMachine = getValue(discriminator, `/machine`) || {}
    const machine = machinesFromPreset.find((item) => item.id === selectedMachine.machine)

    let obj = {}
    if (selectedMachine.machine !== 'custom') {
      if (machine) obj = { limits: { ...machine?.limits }, requests: { ...machine?.limits } }
      else obj = machines[selectedMachine.machine]?.resources
    } else {
      const cpu = selectedMachine.cpu || ''
      const memory = selectedMachine.memory || ''
      obj = {
        limits: { cpu: cpu, memory: memory },
        requests: { cpu: cpu, memory: memory },
      }
    }

    const path = `/spec/verticalScaling/${type}/resources`

    if (obj && Object.keys(obj).length) {
      commit('wizard/model$update', {
        path: path,
        value: obj,
      })
    } else {
      commit('wizard/model$delete', `/spec/verticalScaling/${type}`)
    }

    // update metadata.annotations
    const annotations = getValue(model, '/metadata/annotations') || {}
    const instance = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = instance
    } catch (e) {
      console.log(e)
      parsedInstance = {}
    }

    parsedInstance = selectedMachine.machine
    annotations['kubernetes.io/instance-type'] = JSON.stringify(parsedInstance)

    if (machinesFromPreset.length)
      commit('wizard/model$update', {
        path: '/metadata/annotations',
        value: annotations,
        force: true,
      })

    if (!parsedInstance || (parsedInstance && Object.keys(parsedInstance).length === 0))
      commit('wizard/model$delete', '/metadata/annotations')
  }

  // Fetch and store database Infos
  // for secret configurations in reconfigure
  let configSecrets = []
  let secretConfigData = []
  let existingSecrets = []
  let databaseInfoResponse = {}

  async function fetchConfigSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/namespace')
    // watchDependency('model#/metadata/namespace')

    const name = getValue(model, '/spec/databaseRef/name')
    const dbGroup = getValue(model, '/route/params/group')
    const dbKind = getValue(store.state, '/resource/definition/result/kind')
    const dbResource = getValue(model, '/route/params/resource')
    const dbVersion = getValue(model, '/route/params/version')

    try {
      const resp = await axios.post(
        `/clusters/${owner}/${cluster}/proxy/ui.kubedb.com/v1alpha1/databaseconfigurations`,
        {
          apiVersion: 'ui.kubedb.com/v1alpha1',
          kind: 'DatabaseConfiguration',
          request: {
            source: {
              ref: {
                name: name,
                namespace: namespace,
              },
              resource: {
                group: dbGroup,
                kind: dbKind,
                name: dbResource,
                version: dbVersion,
              },
            },
            keys: ['kubedb-user.cnf'],
          },
        },
      )
      databaseInfoResponse = resp?.data?.response || {}
      configSecrets = resp?.data?.response?.availableSecrets || []
      secretConfigData = resp?.data?.response?.configurations || []
    } catch (e) {
      console.log(e)
    }

    // Fetching all existing secrets
    try {
      const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/secrets`)
      resp.data?.items.forEach((item) => {
        if (item.metadata?.name) {
          existingSecrets.push(item.metadata.name)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  function getCurrentConfig() {
    const currentConfig = databaseInfoResponse?.appliedConfig ?? ''
    return currentConfig
  }

  async function getConfigSecrets(type) {
    type = type ? type + '/' : ''
    const secretStatus = getValue(discriminator, `${type}createSecret/status`)
    if (secretStatus === 'success') {
      await fetchConfigSecrets()
    }
    const mappedSecrets = configSecrets.map((item) => {
      return { text: item, value: item }
    })
    mappedSecrets.push({ text: '+ Create a new Secret', value: 'Create' })
    return mappedSecrets
  }

  async function getConfigSecretsforAppyConfig() {
    const secrets = secretConfigData.map((item) => {
      return { text: item.componentName, value: item.componentName }
    })
    return secrets
  }

  async function createNewConfigSecret(type) {
    type = type ? type + '/' : ''
    const { user, cluster } = route.params
    const url = `/clusters/${user}/${cluster}/resources`
    const namespace = storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace')
    const secretName = getValue(discriminator, `${type}createSecret/name`)
    const secretData = getValue(discriminator, `${type}createSecret/data`)
    const secretDataObj = Object.fromEntries(secretData.map((item) => [item.key, item.value]))

    // Check uniqueness of secret name
    if (existingSecrets.includes(secretName)) {
      toast.error('A secret with this name already exists. Please choose another name.', {
        timeout: 8000,
      })
      return false
    }

    try {
      const res = await axios.post(url, {
        apiVersion: 'v1',
        stringData: secretDataObj,
        kind: 'Secret',
        metadata: {
          name: secretName,
          namespace: namespace,
        },
        type: 'Opaque',
      })
      commit('wizard/temp$update', {
        path: `${type}createSecret/status`,
        value: 'success',
      })
      commit('wizard/temp$update', {
        path: `${type}createSecret/lastCreatedSecret`,
        value: secretName,
      })
      toast.success('Secret created successfully')
    } catch (error) {
      const errMsg = decodeError(error, 'Failed to create secret')
      toast.error(errMsg, { timeout: 5000 })
      cancelCreateSecret()
    }
    return true
  }

  function decodeError(msg, defaultMsg) {
    if (typeof msg === 'string') {
      return msg || defaultMsg
    }
    return (
      (msg.response && msg.response.data && msg.response.data.message) ||
      (msg.response && msg.response.data) ||
      (msg.status && msg.status.status) ||
      defaultMsg
    )
  }

  function isCreateSecret(type) {
    type = type ? type + '/' : ''
    const selectedSecret = getValue(model, `spec/configuration/${type}configSecret/name`)
    const res = selectedSecret === 'Create'

    if (res === true) {
      commit('wizard/temp$update', {
        path: `${type}createSecret/status`,
        value: 'pending',
      })
    }
    return res
  }

  function isNotCreateSecret(type) {
    return !isCreateSecret(type)
  }

  function onCreateSecretChange(type) {
    type = type ? type + '/' : ''
    const secretStatus = getValue(discriminator, `${type}createSecret/status`)
    if (secretStatus === 'cancelled') return ''
    else if (secretStatus === 'success') {
      const name = getValue(discriminator, `${type}createSecret/lastCreatedSecret`)

      const configFound = configSecrets.find((item) => item === name)
      return configFound ? { text: name, value: name } : ''
    }
  }

  function cancelCreateSecret(type) {
    type = type ? type + '/' : ''
    commit('wizard/temp$delete', `${type}createSecret/name`)
    commit('wizard/temp$delete', `${type}createSecret/data`)
    commit('wizard/temp$update', {
      path: `${type}createSecret/status`,
      value: 'cancelled',
    })
  }

  async function onApplyconfigChange(type) {
    type = type ? type + '/' : ''
    const configValue = getValue(discriminator, `${type}applyConfig`)

    if (!configValue) {
      commit('wizard/model$delete', `/spec/configuration/${type}applyConfig`)
      return
    }
    const tempConfigObj = {}
    configValue.forEach((item) => {
      if (item.name && item.content) {
        tempConfigObj[item.name] = item.content
      }
    })
    if (Object.keys(tempConfigObj).length === 0) {
      commit('wizard/model$delete', `/spec/configuration/${type}applyConfig`)
      return
    }
    commit('wizard/model$update', {
      path: `/spec/configuration/${type}applyConfig`,
      value: tempConfigObj,
    })
  }

  function setApplyConfig(type) {
    type = type ? type + '/' : ''
    const configPath = `/${type}selectedConfiguration`
    const selectedConfig = getValue(discriminator, configPath)
    if (!selectedConfig) {
      return [{ name: '', content: '' }]
    }
    const applyconfigData = secretConfigData.find((item) => {
      if (item.componentName === selectedConfig) {
        return item
      }
    })
    const { applyConfig } = applyconfigData
    const configObj = []

    if (applyConfig) {
      Object.keys(applyConfig).forEach((fileName) => {
        configObj.push({
          name: fileName,
          content: applyConfig[fileName],
        })
      })
    }
    configSecretKeys.forEach((key) => {
      if (!configObj.find((item) => item.name === key)) {
        configObj.push({ name: key, content: '' })
      }
    })
    return configObj
  }

  function onRemoveConfigChange(type) {
    type = type ? type + '/' : ''
    const configPath = `/${type}selectedConfigurationRemove`
    const selectedConfig = getValue(discriminator, configPath)

    if (!selectedConfig) {
      commit('wizard/model$delete', `/spec/configuration/${type}removeCustomConfig`)
      return
    }
    commit('wizard/model$update', {
      path: `/spec/configuration/${type}removeCustomConfig`,
      value: true,
    })
  }

  async function onNewConfigSecretChange(type) {
    type = type ? type + '/' : ''
    const path = `/spec/configuration/${type}configSecret/name`
    const selectedSecret = getValue(model, path)

    if (!selectedSecret) {
      commit('wizard/model$delete', `/spec/configuration/${type}configSecret`)
      return [{ name: '', content: '' }]
    }
    if (selectedSecret === 'Create') return [{ name: '', content: '' }]

    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace')

    try {
      // Fetch the secret data from API
      const secretResp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${selectedSecret}`,
      )

      const secretData = secretResp.data?.data || {}
      const configObj = []

      // Decode base64 and format as array of objects with name and content
      Object.keys(secretData).forEach((fileName) => {
        try {
          // Decode base64 string
          const decodedString = atob(secretData[fileName])
          configObj.push({
            name: fileName,
            content: decodedString,
          })
        } catch (e) {
          console.error(`Error decoding ${fileName}:`, e)
          configObj.push({
            name: fileName,
            content: secretData[fileName], // Fallback to original if decode fails
          })
        }
      })

      return configObj
    } catch (e) {
      console.error('Error fetching secret:', e)
      return [{ name: '', content: '' }]
    }
  }

  function onSelectedSecretChange(index) {
    const secretData = getValue(discriminator, 'createSecret/data') || []
    const selfSecrets = secretData.map((item) => item.key)

    const remainingSecrets = configSecretKeys.filter((item) => !selfSecrets.includes(item))

    const selfKey = getValue(discriminator, `createSecret/data/${index}/key`)
    if (selfKey) {
      remainingSecrets.push(selfKey)
    }
    const resSecret = remainingSecrets.map((item) => {
      return { text: item, value: item }
    })
    return resSecret
  }

  // reconfiguration type
  function ifReconfigurationTypeEqualsTo(value) {
    const reconfigurationType = getValue(discriminator, '/reconfigurationType')

    const watchPath = `discriminator#/reconfigurationType`
    // watchDependency(watchPath)
    return reconfigurationType === value
  }

  // for tls
  function hasTlsField() {
    const tls = getDbTls()

    return !!tls
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
    } else if (!kind) {
      commit('wizard/model$delete', '/spec/tls/issuerRef/name')
      return []
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

  function showIssuerRefAndCertificates() {
    const tlsOperation = getValue(discriminator, '/tlsOperation')
    // watchDependency('discriminator#/tlsOperation')
    const verd = tlsOperation !== 'remove' && tlsOperation !== 'rotate'

    return verd
  }

  function isIssuerRefRequired() {
    const hasTls = hasTlsField()
    return hasTls ? false : ''
  }

  function getRequestTypeFromRoute() {
    const isDbloading = isDbDetailsLoading()
    const { query } = route || {}
    const { requestType } = query || {}
    return isDbloading ? '' : requestType || ''
  }

  function isDbDetailsLoading() {
    // watchDependency('discriminator#/dbDetails')
    // watchDependency('model#/spec/databaseRef/name')
    const dbDetails = getValue(discriminator, '/dbDetails')
    const dbName = getValue(model, '/spec/databaseRef/name')

    return !dbDetails || !dbName
  }

  function setValueFromDbDetails(path, commitPath) {
    const retValue = getValue(discriminator, `/dbDetails${path}`)

    if (commitPath) {
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

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
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
    getDbDetails()
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function isVerticalScaleTopologyRequired(type, mode) {
    // watchDependency(`discriminator#/topologyKey`)
    // watchDependency(`discriminator#/topologyValue`)
    const path = `/spec/verticalScaling/${type}/topology`

    const key = String(getValue(model, `${path}/key`) ?? '').trim()
    const value = String(getValue(model, `${path}/value`) ?? '').trim()

    if (!key && !value) {
      commit('wizard/model$delete', path)
    }
    const missingPair = mode === 'key' ? !key && value : key && !value
    if (missingPair) {
      return mode === 'key'
        ? 'Key is required when Value is provided'
        : 'Value is required when Key is provided'
    }
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

  function fetchAliasOptions() {
    return getAliasOptions ? getAliasOptions() : []
  }

  function disableAlias() {
    return !!(model && model.alias)
  }

  function setExporter(type) {
    let path = `/dbDetails/spec/monitor/prometheus/exporter/resources/limits/${type}`
    const limitVal = getValue(discriminator, path)

    if (!limitVal) {
      path = `/dbDetails/spec/monitor/prometheus/exporter/resources/requests/${type}`
      const reqVal = getValue(discriminator, path)

      if (reqVal) return reqVal
    }
    return limitVal
  }

  function onExporterResourceChange(type) {
    const commitPath = `/spec/verticalScaling/exporter/resources/requests/${type}`
    const valPath = `/spec/verticalScaling/exporter/resources/limits/${type}`
    const val = getValue(model, valPath)
    if (val)
      commit('wizard/model$update', {
        path: commitPath,
        value: val,
        force: true,
      })
  }

  function getLimits() {
    const dbDetails = getValue(discriminator, '/dbDetails')
    let limits = {}
    const containers = dbDetails?.spec?.podTemplate?.spec?.containers || []
    if (containers.length === 0)
      limits = dbDetails?.spec?.podTemplate?.spec?.resources?.requests || {}
    else {
      const kind = dbDetails?.kind
      const resource = containers.filter((ele) => ele.name === kind?.toLowerCase())
      limits = resource[0]?.resources?.requests || {}
    }

    return limits
  }

  function isReplicasValid(type) {
    const modelPath = type ? `/spec/horizontalScaling/${type}` : '/spec/horizontalScaling/member'

    const currentReplicas = getValue(discriminator, '/dbDetails/spec/replicas')
    const newReplicas = getValue(model, modelPath)

    if (currentReplicas === newReplicas) {
      return 'New replica count must be different from the current replica count.'
    }
    return false
  }

  function isMachineValid() {
    const limits = getLimits()

    const selectedMachine = getValue(discriminator, '/machine')
    const selectedLimits = { cpu: selectedMachine?.cpu, memory: selectedMachine?.memory }

    if (JSON.stringify(limits) === JSON.stringify(selectedLimits)) {
      return 'Resource limits are same as current machine configuration. Please select different resources or machine preset.'
    }
    return false
  }

  return {
    isReplicasValid,
    isMachineValid,
    setExporter,
    onExporterResourceChange,
    fetchAliasOptions,
    disableAlias,
    isRancherManaged,
    getNamespaces,
    getDbs,
    getDbDetails,
    ifRequestTypeEqualsTo,
    onRequestTypeChange,
    getDbTls,
    initNamespace,
    initDatabaseRef,
    showAndInitName,
    showAndInitNamespace,
    showAndInitDatabaseRef,
    showConfigureOpsrequestLabel,
    showAndInitOpsRequestType,
    getConfigSecrets,
    ifReconfigurationTypeEqualsTo,
    onApplyconfigChange,
    hasTlsField,
    initIssuerRefApiGroup,
    getIssuerRefsName,
    initTlsOperation,
    onTlsOperationChange,
    showIssuerRefAndCertificates,
    isIssuerRefRequired,
    getRequestTypeFromRoute,
    isDbDetailsLoading,
    setValueFromDbDetails,
    getAliasOptions,
    isNamespaceDisabled,
    isDatabaseRefDisabled,
    onDbChange,
    onNamespaceChange,
    setApplyToIfReady,
    isVerticalScaleTopologyRequired,
    getMachines,
    setMachine,
    onMachineChange,
    checkVolume,
    fetchConfigSecrets,
    getConfigSecretsforAppyConfig,
    createNewConfigSecret,
    decodeError,
    isCreateSecret,
    isNotCreateSecret,
    onCreateSecretChange,
    cancelCreateSecret,
    setApplyConfig,
    onRemoveConfigChange,
    onNewConfigSecretChange,
    onSelectedSecretChange,
    isTlsEnabled,
    getCurrentConfig,
  }
}
