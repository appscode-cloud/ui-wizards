const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('binding', false)
  setDiscriminatorValue('hidePreviewFromWizard', undefined)

  setDiscriminatorValue('/enableMonitoring', false)
  setDiscriminatorValue('/customizeExporter', true)
  setDiscriminatorValue('/valueFromType', 'input')
  setDiscriminatorValue('/env', [])

  // Autoscaler Discriminators
  setDiscriminatorValue('/dbDetails', false)
  setDiscriminatorValue('/topologyMachines', [])
  setDiscriminatorValue('/allowedMachine-standalone-min', '')
  setDiscriminatorValue('/allowedMachine-standalone-max', '')
  setDiscriminatorValue('/allowedMachine-replicaSet-min', '')
  setDiscriminatorValue('/allowedMachine-replicaSet-max', '')
  setDiscriminatorValue('/allowedMachine-shard-min', '')
  setDiscriminatorValue('/allowedMachine-shard-max', '')
  setDiscriminatorValue('/allowedMachine-configServer-min', '')
  setDiscriminatorValue('/allowedMachine-configServer-max', '')
  setDiscriminatorValue('/allowedMachine-mongos-min', '')
  setDiscriminatorValue('/allowedMachine-mongos-max', '')

  let autoscaleType = ''
  let dbDetails = {}
  let instance = {}

  function isConsole() {
    const isKube = isKubedb()

    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name',
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
        path: '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }

    return !isKube
  }

  async function getDbDetails() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/annotations') ||
      {}
    instance = annotations['kubernetes.io/instance-type']
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') ||
      getValue(model, '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/namespace') ||
      ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/ferretdbs/${name}`,
        )
        dbDetails = resp.data || {}
        setDiscriminatorValue('/dbDetails', true)
      } catch (e) {
        console.log(e)
      }
    }

    commit('wizard/model$update', {
      path: `/metadata/release/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/metadata/release/namespace`,
      value: namespace,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/labels`,
      value: dbDetails.metadata.labels,
      force: true,
    })
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
      return {
        text: name,
        value: name,
      }
    })
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  async function getDbs() {
    // watchDependency('model#/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/namespace')
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/namespace',
    )
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/redises`,
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

  function initMetadata() {
    const dbName =
      getValue(model, '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name') ||
      ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })

    // delete the other type object from model
    if (type === 'compute')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/storage',
      )
    if (type === 'storage')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/compute',
      )
  }

  async function fetchTopologyMachines() {
    const instance = hasAnnotations()

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
    if (value) return value
    return 'On'
  }

  function onTriggerChange(type) {
    const trigger = getValue(discriminator, `/${type}/trigger`)
    const commitPath = `/resources/autoscalingKubedbComFerretDBAutoscaler/spec/${type}/trigger`

    commit('wizard/model$update', {
      path: commitPath,
      value: trigger ? 'On' : 'Off',
      force: true,
    })
  }

  function hasAnnotations(type) {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/annotations') ||
      {}
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function setAllowedMachine(type, minmax) {
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      console.log(e)
      parsedInstance = {}
    }

    const machine = parsedInstance[type] || ''
    const mx = machine?.includes(',') ? machine.split(',')[1] : ''
    const mn = machine?.includes(',') ? machine.split(',')[0] : ''
    const machineName = minmax === 'min' ? mn : mx

    // Find the machine details from topologyMachines
    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const machineData = nodeGroups.find((item) => item.topologyValue === machineName)

    // Return object with machine, cpu, memory (expected format for machine-compare init)
    if (machineData) {
      return {
        machine: machineName,
        cpu: machineData.allocatable?.cpu,
        memory: machineData.allocatable?.memory,
      }
    }
    // Return empty object if no machine found
    return {
      machine: machineName || '',
      cpu: '',
      memory: '',
    }
  }

  function getMachines(type, minmax) {
    // watchDependency('discriminator#/topologyMachines')
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${type}-${depends}`

    // watchDependency(`discriminator#${dependantPath}`)
    const dependantMachineObj = getValue(discriminator, dependantPath)
    const dependantMachine = dependantMachineObj?.machine || ''

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []

    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

    // Return array with text and value object (expected format for machine-compare loader)
    const machines = nodeGroups?.map((item) => {
      const text = item.topologyValue
      return {
        text,
        value: {
          machine: item.topologyValue,
          cpu: item.allocatable?.cpu,
          memory: item.allocatable?.memory,
        },
      }
    })

    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )

    return dependantIndex === -1 ? machines : filteredMachine
  }

  function onMachineChange(type) {
    const annoPath = '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const instance = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      console.log(e)
      parsedInstance = {}
    }

    // Now discriminator values are objects with { machine, cpu, memory }
    const minMachineObj = getValue(discriminator, `/allowedMachine-${type}-min`)
    const maxMachineObj = getValue(discriminator, `/allowedMachine-${type}-max`)
    const minMachine = minMachineObj?.machine || ''
    const maxMachine = maxMachineObj?.machine || ''
    const minMaxMachine = `${minMachine},${maxMachine}`

    parsedInstance[type] = minMaxMachine
    const instanceString = JSON.stringify(parsedInstance)
    annotations['kubernetes.io/instance-type'] = instanceString

    // Use cpu/memory directly from the machine objects
    const minMachineAllocatable = minMachineObj
      ? { cpu: minMachineObj.cpu, memory: minMachineObj.memory }
      : null
    const maxMachineAllocatable = maxMachineObj
      ? { cpu: maxMachineObj.cpu, memory: maxMachineObj.memory }
      : null
    const allowedPath = `/resources/autoscalingKubedbComFerretDBAutoscaler/spec/compute/${type}`

    if (minMachine && maxMachine && instance !== instanceString) {
      commit('wizard/model$update', {
        path: `${allowedPath}/maxAllowed`,
        value: maxMachineAllocatable,
        force: true,
      })
      commit('wizard/model$update', {
        path: `${allowedPath}/minAllowed`,
        value: minMachineAllocatable,
        force: true,
      })
      commit('wizard/model$update', {
        path: annoPath,
        value: annotations,
        force: true,
      })
    }
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComFerretDBAutoscaler/spec/compute/${type}/controlledResources`
    commit('wizard/model$update', {
      path: path,
      value: list,
      force: true,
    })
    return list
  }

  function ferretTypeEqualsTo(param) {
    const dbDetails = getValue(model, '/resources/kubedbComFerretDB')
    const type = dbDetails.spec?.server?.secondary ? 'secondary' : 'primary'
    return param === type
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
    try {
      const resp = await axios.get(url)
      const list = (resp && resp.data?.items) || []
      const mappedList = list.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return name
      })
      return mappedList
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isNodeTopologySelected() {
    // watchDependency(
    //   'model#/resources/autoscalingKubedbComFerretDBAutoscaler/spec/compute/nodeTopology/name',
    // )
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name')
    // watchDependency('discriminator#/autoscalingType')
    return (
      !!getValue(
        model,
        '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name',
      ) && !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  /********** Monitoring ***********/

  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    // watchDependency('model#' + modelPath)
    return modelPathValue === value
  }

  async function getResources(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
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
    } catch (e) {
      console.log(e)
      return []
    }
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

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

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

  function showMonitoringSection() {
    // watchDependency('discriminator#/enableMonitoring')
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComFerretDB/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComFerretDB/spec/monitor')
    }

    // update alert value depend on monitoring profile
    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: configureStatus ? 'warning' : 'none',
      force: true,
    })
  }

  function showCustomizeExporterSection() {
    // watchDependency('discriminator#/customizeExporter')
    const configureStatus = getValue(discriminator, '/customizeExporter')
    return configureStatus
  }

  function onCustomizeExporterChange() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter')
    }
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path) || null
    return !!modelValue
  }

  // function onNamespaceChange() {
  //   const namespace = getValue(model, '/metadata/release/namespace')
  //   const agent = getValue(model, '/resources/kubedbComFerretDB/spec/monitor/agent')
  //   if (agent === 'prometheus.io') {
  //     commit('wizard/model$update', {
  //       path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
  //       value: [namespace],
  //       force: true,
  //     })
  //   }
  // }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComFerretDB/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComFerretDB/spec/monitor/agent')

    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComFerretDB/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
        value: [],
        force: true,
      })

      onNamespaceChange()
      onLabelChange()
    } else {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

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

  function getOpsRequestUrl(reqType) {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain')
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
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/ferretdbopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  function onNamespaceChange() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComFerretDBAutoscaler/metadata/namespace',
    )
    if (!namespace) {
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComFerretDBAutoscaler/spec/databaseRef/name',
      )
    }
  }

  function setValueFrom() {
    if (isConfigMapTypeValueFrom()) {
      return 'configMap'
    } else if (isSecretTypeValueFrom()) {
      return 'secret'
    } else {
      return 'input'
    }
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
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
    } else if (valueFrom === 'secret') {
      if (!isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: false,
        })
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
    } else if (valueFrom === 'configMap') {
      if (!isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: false,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
    }
  }

  // function isEqualToValueFromType(value) {
  //   //watchDependency('discriminator#/valueFromType')
  //   const valueFrom = getValue(discriminator, '/valueFromType')
  //   return valueFrom === value
  // }

  async function getConfigMapKeys(index) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      `/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter/env/${index}/valueFrom/configMapKeyRef/name`,
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/configMapKeyRef/name')

    if (!configMapName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`,
      )

      const configMaps = (resp && resp.data && resp.data.data) || {}

      const configMapKeys = Object.keys(configMaps).map((item) => ({
        text: item,
        value: item,
      }))

      return configMapKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecretKeys(index) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      `/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter/env/${index}/valueFrom/secretKeyRef/name`,
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/secretKeyRef/name')

    if (!secretName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`,
      )

      const secret = (resp && resp.data && resp.data.data) || {}

      const secretKeys = Object.keys(secret).map((item) => ({
        text: item,
        value: item,
      }))

      return secretKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function returnFalse() {
    return false
  }

  function onEnvArrayChange() {
    const env = getValue(discriminator, '/env') || []
    let ret = {}
    // filter out temp values
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
        path: '/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter/env',
        value: filteredEnv,
        force: true,
      })
  }

  function initEnvArray() {
    const env = getValue(model, '/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter/env')

    return env || []
  }

  function isEqualToTemp(value, index) {
    //watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, `/env/${index}/temp/valueFromType`)
    return valueFrom === value
  }

  function initMonitoring() {
    const env =
      getValue(model, '/resources/kubedbComFerretDB/spec/monitor/prometheus/exporter/env') || []
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

  return {
    isConsole,
    getDbDetails,
    getNamespaces,
    isRancherManaged,
    onNamespaceChange,
    getDbs,
    initMetadata,
    fetchTopologyMachines,
    setTrigger,
    onTriggerChange,
    hasAnnotations,
    setAllowedMachine,
    getMachines,
    onMachineChange,
    hasNoAnnotations,
    setControlledResources,
    ferretTypeEqualsTo,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,

    getOpsRequestUrl,
    isValueExistInModel,
    onEnableMonitoringChange,
    showMonitoringSection,
    onAgentChange,
    getResources,
    isEqualToModelPathValue,
    onCustomizeExporterChange,
    showCustomizeExporterSection,
    onLabelChange,
    setValueFrom,
    onValueFromChange,
    resourceNames,
    getConfigMapKeys,
    getSecrets,
    getSecretKeys,
    isConfigMapTypeValueFrom,
    isSecretTypeValueFrom,
    getNamespacedResourceList,
    returnFalse,
    onEnvArrayChange,
    initEnvArray,
    isEqualToTemp,
    initMonitoring,
  }
}
