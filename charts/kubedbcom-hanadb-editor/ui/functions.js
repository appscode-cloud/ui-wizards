const { axios, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enableMonitoring', false)
  setDiscriminatorValue('/customizeExporter', true)
  setDiscriminatorValue('/valueFromType', 'input')
  setDiscriminatorValue('/env', [])

  let autoscaleType = 'compute'
  let instance = ''
  let showStoragememory = false

  // ************************* Autoscaler *************************

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function isConsole() {
    const isKube = isKubedb()
    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/databaseRef/name',
        value: dbName,
        force: true,
      })
      const operation = storeGet('/route/params/actions') || ''
      if (operation.length) {
        const splitOp = operation.split('-')
        if (splitOp.length > 2) autoscaleType = splitOp[2]
      }
      const date = Math.floor(Date.now() / 1000)
      const modifiedName = `${dbName}-${date}-autoscaling-${autoscaleType}`
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }
    return !isKube
  }

  async function getHanaDBDbs() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/namespace',
    )
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/hanadbs`,
      { params: { filter: { items: { metadata: { name: null } } } } },
    )
    const resources = (resp && resp.data && resp.data.items) || []
    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return { text: name, value: name }
    })
  }

  function initMetadata() {
    const dbName =
      getValue(model, '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/databaseRef/name') || ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
    if (type === 'compute')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/storage')
    if (type === 'storage')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/compute')
  }

  async function fetchTopologyMachines() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/annotations') || {}
    instance = annotations['kubernetes.io/instance-type']
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (instance) {
      try {
        const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
        const resp = await axios.get(url)
        const nodeGroups = resp.data?.spec?.nodeGroups || []
        setDiscriminatorValue('/topologyMachines', nodeGroups)
        return nodeGroups
      } catch (e) {
        console.log(e)
        return []
      }
    }
  }

  function setTrigger(path) {
    let value = getValue(model, `/resources/${path}`)
    return value === 'On'
  }

  function onTriggerChange(type) {
    const trigger = getValue(discriminator, `/${type}/trigger`)
    const commitPath = `/resources/autoscalingKubedbComHanaDBAutoscaler/spec/${type}/trigger`
    commit('wizard/model$update', { path: commitPath, value: trigger ? 'On' : 'Off', force: true })
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/annotations') || {}
    const inst = annotations['kubernetes.io/instance-type']
    return !!inst
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  function setAllowedMachine(minmax) {
    const mx = instance?.includes(',') ? instance.split(',')[1] : ''
    const mn = instance?.includes(',') ? instance.split(',')[0] : ''
    const machineName = minmax === 'min' ? mn : mx
    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const machineData = nodeGroups.find((item) => item.topologyValue === machineName)
    if (machineData) {
      return { machine: machineName, cpu: machineData.allocatable?.cpu, memory: machineData.allocatable?.memory }
    }
    return { machine: machineName || '', cpu: '', memory: '' }
  }

  function getMachines(minmax) {
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantMachineObj = getValue(discriminator, `/allowedMachine-${depends}`)
    const dependantMachine = dependantMachineObj?.machine || ''
    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)
    const machines = nodeGroups?.map((item) => ({
      text: item.topologyValue,
      subtext: `CPU: ${item.allocatable?.cpu}, Memory: ${item.allocatable?.memory}`,
      value: { machine: item.topologyValue, cpu: item.allocatable?.cpu, memory: item.allocatable?.memory },
    }))
    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )
    return dependantIndex === -1 ? machines : filteredMachine
  }

  function onMachineChange(type) {
    const annoPath = '/resources/autoscalingKubedbComHanaDBAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const inst = annotations['kubernetes.io/instance-type']
    const minMachineObj = getValue(discriminator, '/allowedMachine-min')
    const maxMachineObj = getValue(discriminator, '/allowedMachine-max')
    const minMachine = minMachineObj?.machine || ''
    const maxMachine = maxMachineObj?.machine || ''
    const minMaxMachine = `${minMachine},${maxMachine}`
    annotations['kubernetes.io/instance-type'] = minMaxMachine
    const minMachineAllocatable = minMachineObj ? { cpu: minMachineObj.cpu, memory: minMachineObj.memory } : null
    const maxMachineAllocatable = maxMachineObj ? { cpu: maxMachineObj.cpu, memory: maxMachineObj.memory } : null
    const allowedPath = `/resources/autoscalingKubedbComHanaDBAutoscaler/spec/compute/${type}`
    if (minMachine && maxMachine && inst !== minMaxMachine) {
      commit('wizard/model$update', { path: `${allowedPath}/maxAllowed`, value: maxMachineAllocatable, force: true })
      commit('wizard/model$update', { path: `${allowedPath}/minAllowed`, value: minMachineAllocatable, force: true })
      commit('wizard/model$update', { path: annoPath, value: { ...annotations }, force: true })
    }
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComHanaDBAutoscaler/spec/compute/${type}/controlledResources`
    commit('wizard/model$update', { path, value: list, force: true })
    return list
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
    try {
      const resp = await axios.get(url)
      const list = (resp && resp.data?.items) || []
      return list.map((item) => (item.metadata && item.metadata.name) || '')
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isNodeTopologySelected() {
    const nodeTopologyName =
      getValue(model, '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/compute/nodeTopology/name') || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    return (
      !!getValue(model, '/resources/autoscalingKubedbComHanaDBAutoscaler/spec/databaseRef/name') &&
      !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function showStorageMemoryOption() {
    return showStoragememory
  }

  // ************************* Monitoring *************************

  function showMonitoringSection() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComHanaDB/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComHanaDB/spec/monitor')
    }

    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: configureStatus ? 'warning' : 'none',
      force: true,
    })
  }

  function showCustomizeExporterSection() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    return configureStatus
  }

  function onCustomizeExporterChange() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter')
    }
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path) || null
    return !!modelValue
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComHanaDB/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
        value: [],
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    return modelPathValue === value
  }

  function initMonitoring() {
    const env =
      getValue(model, '/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter/env') || []
    setDiscriminatorValue('/env', env)
    let tempEnv = []
    env.forEach((item) => {
      let radio = ''
      if (item.value) radio = 'input'
      else if (item.valueFrom && item.valueFrom.configMapKeyRef) radio = 'configMap'
      else if (item.valueFrom && item.valueFrom.secretKeyRef) radio = 'secret'
      tempEnv.push({ ...item, temp: { valueFromType: radio } })
    })
    setDiscriminatorValue('/env', tempEnv)
  }

  function onEnvArrayChange() {
    const env = getValue(discriminator, '/env') || []
    let ret = {}
    const filteredEnv = env?.map((item) => {
      const { temp, ...rest } = item
      if (temp?.valueFromType === 'input') {
        const { name, value } = rest
        ret = { name, value }
      } else if (temp?.valueFromType === 'configMap') {
        const { name } = rest
        const { configMapKeyRef } = rest?.valueFrom || {}
        ret = { name, valueFrom: { configMapKeyRef } }
      } else if (temp?.valueFromType === 'secret') {
        const { name } = rest
        const { secretKeyRef } = rest?.valueFrom || {}
        ret = { name, valueFrom: { secretKeyRef } }
      }
      return ret
    })

    if (filteredEnv.length)
      commit('wizard/model$update', {
        path: '/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter/env',
        value: filteredEnv,
        force: true,
      })
  }

  function initEnvArray() {
    const env = getValue(
      model,
      '/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter/env',
    )
    return env || []
  }

  function isEqualToTemp(value, index) {
    const valueFrom = getValue(discriminator, `/env/${index}/temp/valueFromType`)
    return valueFrom === value
  }

  function setValueFrom() {
    if (isConfigMapTypeValueFrom()) return 'configMap'
    else if (isSecretTypeValueFrom()) return 'secret'
    else return 'input'
  }

  function isConfigMapTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.configMapKeyRef)
  }

  function isSecretTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.secretKeyRef)
  }

  function onValueFromChange() {
    const valueFrom = getValue(discriminator, '/valueFromType')
    if (valueFrom === 'input') {
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/configMapKeyRef', value: true })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/secretKeyRef', value: true })
    } else if (valueFrom === 'secret') {
      if (!isSecretTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/secretKeyRef', value: false })
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/configMapKeyRef', value: true })
    } else if (valueFrom === 'configMap') {
      if (!isConfigMapTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/configMapKeyRef', value: false })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', { path: 'temp/valueFrom/secretKeyRef', value: true })
    }
  }

  // ************************* Utilities *************************

  function returnFalse() {
    return false
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  async function getNamespaces() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`, {
      params: { filter: { items: { metadata: { name: null } } } },
    })

    const resources = (resp && resp.data && resp.data.items) || []
    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return { text: name, value: name }
    })
  }

  async function resourceNames(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`,
        { params: { filter: { items: { metadata: { name: null }, type: null } } } },
      )
      let items = (resp && resp.data && resp.data.items) || []
      if (resource === 'secrets') {
        items = items.filter((item) => {
          const validType = ['kubernetes.io/service-account-token', 'Opaque']
          return validType.includes(item.type)
        })
      }
      return items.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getConfigMapKeys(index) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      `/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter/env/${index}/valueFrom/configMapKeyRef/name`,
    )
    if (!configMapName) return []
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`,
      )
      const configMaps = (resp && resp.data && resp.data.data) || {}
      return Object.keys(configMaps).map((item) => ({ text: item, value: item }))
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        { params: { filter: { items: { metadata: { name: null }, type: null } } } },
      )
      const items = (resp && resp.data && resp.data.items) || []
      return items
        .filter((item) => ['kubernetes.io/service-account-token', 'Opaque'].includes(item.type))
        .map((item) => {
          const name = (item.metadata && item.metadata.name) || ''
          return { text: name, value: name }
        })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecretKeys(index) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      `/resources/kubedbComHanaDB/spec/monitor/prometheus/exporter/env/${index}/valueFrom/secretKeyRef/name`,
    )
    if (!secretName) return []
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`,
      )
      const secret = (resp && resp.data && resp.data.data) || {}
      return Object.keys(secret).map((item) => ({ text: item, value: item }))
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function getOpsRequestUrl(reqType) {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    const owner = storeGet('/route/params/user')
    const dbname = getValue(model, '/metadata/release/name')
    const group = getValue(model, '/metadata/resource/group')
    const kind = getValue(model, '/metadata/resource/kind')
    const namespace = getValue(model, '/metadata/release/namespace')
    const resource = getValue(model, '/metadata/resource/name')
    const version = getValue(model, '/metadata/resource/version')
    const routeRootPath = storeGet('/route/path')
    const pathPrefix = `${domain}/db${routeRootPath}`
    const pathSplit = pathPrefix.split('/').slice(0, -1).join('/')
    const pathConstructedForKubedb = pathSplit + `/${reqType.toLowerCase()}?namespace=${namespace}`

    const isKube = !!storeGet('/route/params/actions')

    if (isKube) return pathConstructedForKubedb
    else
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/hanadbopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  return {
    returnFalse,
    isKubedb,
    isConsole,
    isRancherManaged,
    getNamespaces,
    getHanaDBDbs,
    initMetadata,
    fetchTopologyMachines,
    setTrigger,
    onTriggerChange,
    hasAnnotations,
    hasNoAnnotations,
    setAllowedMachine,
    getMachines,
    onMachineChange,
    setControlledResources,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,
    showStorageMemoryOption,
    resourceNames,
    getConfigMapKeys,
    getSecrets,
    getSecretKeys,
    getOpsRequestUrl,
    isValueExistInModel,
    isEqualToModelPathValue,
    onEnableMonitoringChange,
    showMonitoringSection,
    onAgentChange,
    onCustomizeExporterChange,
    showCustomizeExporterSection,
    initMonitoring,
    onEnvArrayChange,
    initEnvArray,
    isEqualToTemp,
    setValueFrom,
    isConfigMapTypeValueFrom,
    isSecretTypeValueFrom,
    onValueFromChange,
  }
}
