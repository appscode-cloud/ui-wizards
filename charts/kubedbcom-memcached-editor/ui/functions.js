const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enableMonitoring', false)

  async function getDbDetails() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') ||
      getValue(model, '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace') ||
      ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/memcacheds/${name}`,
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
      path: `/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/labels`,
      value: dbDetails.metadata.labels,
      force: true,
    })
  }

  let autoscaleType = ''
  let dbDetails = {}

  function isConsole() {
    const isKube = isKubedb()

    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name',
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
        path: '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }

    return !isKube
  }

  function isKubedb() {
    return !!storeGet('/route/params/actions')
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

  function onNamespaceChange() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace',
    )
    if (!namespace) {
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name',
      )
    }
  }
  async function getDbs() {
    // watchDependency('model#/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace')
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace',
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
      getValue(model, '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name') ||
      ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })

    // delete the other type object from model
    if (type === 'compute')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/storage',
      )
    if (type === 'storage')
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/compute',
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

  function hasAnnotations() {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/annotations',
    )
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function setAllowedMachine(minmax) {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/annotations',
    )
    const instance = annotations['kubernetes.io/instance-type']
    const mx = instance?.includes(',') ? instance.split(',')[1] : ''
    const mn = instance?.includes(',') ? instance.split(',')[0] : ''

    if (minmax === 'min') return mn
    else return mx
  }

  async function getMachines(minmax) {
    // watchDependency('discriminator#/topologyMachines')
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${depends}`

    // watchDependency(`discriminator#${dependantPath}`)
    const dependantMachine = getValue(discriminator, dependantPath)

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []

    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

    const machines = nodeGroups?.map((item) => {
      const subText = `CPU: ${item.allocatable.cpu}, Memory: ${item.allocatable.memory}`
      const text = item.topologyValue
      return { text, subText, value: item.topologyValue }
    })

    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )

    return dependantIndex === -1 ? machines : filteredMachine
  }

  function onMachineChange(type) {
    const annoPath = '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath)
    const instance = annotations['kubernetes.io/instance-type']

    const minMachine = getValue(discriminator, '/allowedMachine-min')
    const maxMachine = getValue(discriminator, '/allowedMachine-max')
    const minMaxMachine = `${minMachine},${maxMachine}`
    annotations['kubernetes.io/instance-type'] = minMaxMachine

    const machines = getValue(discriminator, `/topologyMachines`) || []
    const minMachineObj = machines.find((item) => item.topologyValue === minMachine)
    const maxMachineObj = machines.find((item) => item.topologyValue === maxMachine)
    const minMachineAllocatable = minMachineObj?.allocatable
    const maxMachineAllocatable = maxMachineObj?.allocatable
    const allowedPath = `/resources/autoscalingKubedbComMemcachedAutoscaler/spec/compute/${type}`

    if (minMachine && maxMachine && instance !== minMaxMachine) {
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
        value: { ...annotations },
        force: true,
      })
    }
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/annotations') ||
      {}
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  function isNodeTopologySelected() {
    // watchDependency(
    //   'model#/resources/autoscalingKubedbComMemcachedAutoscaler/spec/compute/nodeTopology/name',
    // )
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComMemcachedAutoscaler/spec/compute/${type}/controlledResources`
    commit('wizard/model$update', {
      path: path,
      value: list,
      force: true,
    })
    return list
  }

  function setTrigger(path) {
    let value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  function setApplyToIfReady() {
    return 'IfReady'
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

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name')
    // watchDependency('discriminator#/autoscalingType')
    return (
      !!getValue(
        model,
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name',
      ) && !!getValue(discriminator, '/autoscalingType')
    )
  }

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

  /****** Monitoring *********/

  function showMonitoringSection() {
    // watchDependency('discriminator#/enableMonitoring')
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMemcached/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMemcached/spec/monitor')
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
        path: '/resources/kubedbComMemcached/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit(
        'wizard/model$delete',
        '/resources/kubedbComMemcached/spec/monitor/prometheus/exporter',
      )
    }
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path) || null
    return !!modelValue
  }

  // function onNamespaceChange() {
  //   const namespace = getValue(model, '/metadata/release/namespace')
  //   const agent = getValue(model, '/resources/kubedbComMemcached/spec/monitor/agent')
  //   if (agent === 'prometheus.io') {
  //     commit('wizard/model$update', {
  //       path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
  //       value: [namespace],
  //       force: true,
  //     })
  //   }
  // }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComMemcached/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComMemcached/spec/monitor/agent')

    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComMemcached/spec/monitor/agent')
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
    const pathConstructedForKubedb =
      pathSplit + `/create-opsrequest-${reqType.toLowerCase()}?namespace=${namespace}`

    const isKube = !!storeGet('/route/params/actions')

    if (isKube) return pathConstructedForKubedb
    else
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/memcachedopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  function onNamespaceChange() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComMemcachedAutoscaler/metadata/namespace',
    )
    if (!namespace) {
      commit(
        'wizard/model$delete',
        '/resources/autoscalingKubedbComMemcachedAutoscaler/spec/databaseRef/name',
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

  function isEqualToValueFromType(value) {
    //watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
  }

  async function getConfigMapKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      '/resources/kubedbComMemcached/spec/monitor/prometheus/exporter/env/items/valueFrom/configMapKeyRef/name',
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

  async function getSecretKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      '/resources/kubedbComMemcached/spec/monitor/prometheus/exporter/env/items/valueFrom/secretKeyRef/name',
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

  return {
    returnFalse,
    getDbDetails,
    isConsole,
    isKubedb,
    getNamespaces,
    onNamespaceChange,
    getDbs,
    initMetadata,
    fetchTopologyMachines,
    hasAnnotations,
    setAllowedMachine,
    getMachines,
    onMachineChange,
    hasNoAnnotations,
    isNodeTopologySelected,
    setControlledResources,
    setTrigger,
    setApplyToIfReady,
    fetchNodeTopology,
    showOpsRequestOptions,
    isEqualToModelPathValue,
    getResources,
    resourceNames,
    // Monitoring
    showMonitoringSection,
    onEnableMonitoringChange,
    showCustomizeExporterSection,
    onCustomizeExporterChange,
    isValueExistInModel,
    // onNamespaceChange,
    onLabelChange,
    onAgentChange,
    getSecrets,
    getOpsRequestUrl,
    setValueFrom,
    isConfigMapTypeValueFrom,
    isSecretTypeValueFrom,
    onValueFromChange,
    isEqualToValueFromType,
    getConfigMapKeys,
    getSecretKeys,
  }
}
