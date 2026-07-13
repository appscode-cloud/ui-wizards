const { axios, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enableMonitoring', false)
  setDiscriminatorValue('/customizeExporter', true)

  function returnFalse() {
    return false
  }

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  function isVariantAvailable() {
    const variant = storeGet('/route/query/variant')
    return !!variant
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

  function getCreateNameSpaceUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    if (domain.includes('bb.test')) {
      return `http://console.bb.test:5990/console/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    } else {
      const editedDomain = domain.replace('kubedb', 'console')
      return `${editedDomain}/console/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    }
  }

  async function getMilvusVersions() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/milvusversions`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getStorageClassNames() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
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

  async function getIssuerRefsName() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const kind = getValue(model, '/resources/kubedbComMilvus/spec/tls/issuerRef/kind')
    const namespace = getValue(model, '/metadata/release/namespace')

    if (kind === 'Issuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/namespaces/${namespace}/issuers`
      return getIssuer(url)
    } else if (kind === 'ClusterIssuer') {
      const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
      return getIssuer(url)
    } else {
      return []
    }

    async function getIssuer(url) {
      try {
        const resp = await axios.get(url)
        const resources = (resp && resp.data && resp.data.items) || []
        return resources.map((item) => {
          const name = (item.metadata && item.metadata.name) || ''
          return { text: name, value: name }
        })
      } catch (e) {
        console.log(e)
        return []
      }
    }
  }

  function setApiGroup() {
    return 'cert-manager.io'
  }

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
  }

  function onNameChange() {
    const dbName = getValue(model, '/metadata/release/name')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/name',
      value: dbName,
      force: true,
    })
  }

  function onNamespaceChange() {
    const namespace = getValue(model, '/metadata/release/namespace')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/namespace',
      value: namespace,
      force: true,
    })
  }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComMilvus/metadata/labels')
    commit('wizard/model$update', {
      path: '/resources/kubedbComMilvus/metadata/labels',
      value: labels,
      force: true,
    })
  }

  function disableLableChecker({ itemCtx }) {
    const key = itemCtx?.key || ''
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  function isEqualToModelPathValue(value, path) {
    const modelValue = getValue(model, path)
    return modelValue === value
  }

  function returnTrue() {
    return true
  }

  function returnStringYes() {
    return 'yes'
  }

  function getCreateAuthSecret() {
    const secret = getValue(model, '/resources/kubedbComMilvus/spec/authSecret/name')
    return !secret
  }

  function onCreateAuthSecretChange({ getValue, discriminator, commit }) {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    if (!createAuthSecret) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/authSecret')
    }
  }

  function showExistingSecretSection() {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    return !createAuthSecret
  }

  function showPasswordSection() {
    const createAuthSecret = getValue(discriminator, '/createAuthSecret')
    return !!createAuthSecret
  }

  function setAuthSecretPassword() {
    return ''
  }

  function onAuthSecretPasswordChange({ getValue, discriminator, commit, model }) {
    const password = getValue(discriminator, '/password')
    if (password) {
      commit('wizard/model$update', {
        path: '/resources/secret_auth/stringData/password',
        value: password,
        force: true,
      })
    }
  }

  function onTlsConfigureChange() {
    const configureTLS = getValue(discriminator, '/configureTLS')
    if (!configureTLS) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/tls')
    }
  }

  function showTlsConfigureSection() {
    const configureTLS = getValue(discriminator, '/configureTLS')
    return !!configureTLS
  }

  function setStorageClass() {
    const deletionPolicy = getValue(model, '/resources/kubedbComMilvus/spec/deletionPolicy')
    if (deletionPolicy === 'WipeOut' || deletionPolicy === 'Delete') {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMilvus/spec/storageType',
        value: 'Durable',
        force: true,
      })
    }
  }

  function onEnableMonitoringChange() {
    const enableMonitoring = getValue(discriminator, '/enableMonitoring')
    if (!enableMonitoring) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/monitor')
    }
  }

  function showMonitoringSection() {
    const enableMonitoring = getValue(discriminator, '/enableMonitoring')
    return !!enableMonitoring
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComMilvus/spec/monitor/agent')
    if (agent !== 'prometheus.io') {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  function onCustomizeExporterChange() {
    const customize = getValue(discriminator, '/customizeExporter')
    if (!customize) {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/monitor/prometheus/exporter')
    }
  }

  function showCustomizeExporterSection() {
    const customize = getValue(discriminator, '/customizeExporter')
    return !!customize
  }

  function onSetCustomConfigChange() {
    const setCustomConfig = getValue(discriminator, '/setCustomConfig')
    if (setCustomConfig !== 'yes') {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration')
    }
  }

  function setConfigurationSource() {
    return 'use-existing-config'
  }

  function onConfigurationSourceChange() {
    const source = getValue(discriminator, '/configurationSource')
    if (source === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration/inline')
    } else {
      commit('wizard/model$delete', '/resources/kubedbComMilvus/spec/configuration/secretName')
    }
  }

  function setConfiguration() {
    return ''
  }

  function onConfigurationChange() {
    const config = getValue(discriminator, '/configuration')
    if (config) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComMilvus/spec/configuration/inline',
        value: { 'milvus.yaml': config },
        force: true,
      })
    }
  }

  function isEqualToDiscriminatorPath(value, path) {
    const discriminatorValue = getValue(discriminator, path)
    return discriminatorValue === value
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path) || null
    return !!modelValue
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
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/milvusopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
  }

  function initMonitoring() {
    const exporter = getValue(model, '/resources/kubedbComMilvus/spec/monitor/prometheus/exporter')
    if (!exporter) {
      setDiscriminatorValue('/customizeExporter', false)
    }
  }

  // ── Autoscaling ────────────────────────────────────────────────────────────

  let autoscaleType = ''
  let dbDetails = {}
  let instance = {}

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function isConsole() {
    const isKube = isKubedb()
    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name',
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
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
      const namespace = storeGet('/route/query/namespace') || ''
      if (namespace) {
        commit('wizard/model$update', {
          path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/namespace',
          value: namespace,
          force: true,
        })
      }
    }
    return !isKube
  }

  async function getMilvusDbs() {
    const namespace = getValue(
      model,
      '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/namespace',
    )
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/milvuses`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const resources = (resp && resp.data && resp.data.items) || []
      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return { text: name, value: name }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function initAutoscalerMetadata() {
    const dbName =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') || ''
    const type = getValue(discriminator, '/autoscalingType') || ''
    const date = Math.floor(Date.now() / 1000)
    const resource = storeGet('/route/params/resource')
    const scalingName = dbName ? dbName : resource
    const modifiedName = `${scalingName}-${date}-autoscaling-${type || ''}`
    if (modifiedName)
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/name',
        value: modifiedName,
        force: true,
      })
    if (type === 'compute')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComMilvusAutoscaler/spec/storage')
    if (type === 'storage')
      commit('wizard/model$delete', '/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute')
  }

  async function getMilvusDbDetails() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    instance = annotations?.['kubernetes.io/instance-type']
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') || getValue(model, '/metadata/release/namespace') || ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/milvuses/${name}`,
        )
        dbDetails = resp.data || {}
        setDiscriminatorValue('/dbDetails', true)
      } catch (e) {
        console.log(e)
      }
    }

    commit('wizard/model$update', { path: '/metadata/release/name', value: name, force: true })
    commit('wizard/model$update', {
      path: '/metadata/release/namespace',
      value: namespace,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name',
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/labels',
      value: dbDetails.metadata?.labels,
      force: true,
    })

    await fetchTopologyMachines()
  }

  function isMilvusStandalone() {
    const loaded = getValue(discriminator, '/dbDetails')
    if (!loaded) return false
    return !dbDetails?.spec?.topology?.distributed
  }

  function isMilvusDistributed() {
    const loaded = getValue(discriminator, '/dbDetails')
    if (!loaded) return false
    return !!dbDetails?.spec?.topology?.distributed
  }

  function setTrigger(path) {
    const value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  async function fetchTopologyMachines() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    instance = annotations['kubernetes.io/instance-type']
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (instance) {
      try {
        const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
        const resp = await axios.get(url)
        const nodeGroups = resp.data?.spec?.nodeGroups || []
        setDiscriminatorValue('/topologyMachines', nodeGroups)
      } catch (e) {
        console.log(e)
        setDiscriminatorValue('/topologyMachines', [])
      }
    }
  }

  function getMachines(type, minmax) {
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${type}-${depends}`
    const dependantMachineObj = getValue(discriminator, dependantPath)
    const dependantMachine = dependantMachineObj?.machine || ''

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

    const machines = nodeGroups?.map((item) => ({
      text: item.topologyValue,
      subtext: `CPU: ${item.allocatable?.cpu}, Memory: ${item.allocatable?.memory}`,
      value: {
        machine: item.topologyValue,
        cpu: item.allocatable?.cpu,
        memory: item.allocatable?.memory,
      },
    }))

    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )

    return dependantIndex === -1 ? machines : filteredMachine
  }

  function setAllowedMachine(type, minmax) {
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      parsedInstance = {}
    }

    const machine = parsedInstance[type] || ''
    const mx = machine?.includes(',') ? machine.split(',')[1] : ''
    const mn = machine?.includes(',') ? machine.split(',')[0] : ''
    const machineName = minmax === 'min' ? mn : mx

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const machineData = nodeGroups.find((item) => item.topologyValue === machineName)

    if (machineData) {
      return {
        machine: machineName,
        cpu: machineData.allocatable?.cpu,
        memory: machineData.allocatable?.memory,
      }
    }
    return { machine: machineName || '', cpu: '', memory: '' }
  }

  function onMachineChange(nodeType) {
    const annoPath = '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const inst = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (inst) parsedInstance = JSON.parse(inst)
    } catch (e) {
      parsedInstance = {}
    }

    const minMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-min`)
    const maxMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-max`)
    const minMachine = minMachineObj?.machine || ''
    const maxMachine = maxMachineObj?.machine || ''
    const minMaxMachine = `${minMachine},${maxMachine}`

    parsedInstance[nodeType] = minMaxMachine
    const instanceString = JSON.stringify(parsedInstance)
    annotations['kubernetes.io/instance-type'] = instanceString

    const minMachineAllocatable = minMachineObj
      ? { cpu: minMachineObj.cpu, memory: minMachineObj.memory }
      : null
    const maxMachineAllocatable = maxMachineObj
      ? { cpu: maxMachineObj.cpu, memory: maxMachineObj.memory }
      : null
    const allowedPath = `/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute/${nodeType}`

    if (minMachine && maxMachine && inst !== instanceString) {
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
      commit('wizard/model$update', { path: annoPath, value: annotations, force: true })
    }
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComMilvusAutoscaler/spec/${type}/controlledResources`
    commit('wizard/model$update', { path, value: list, force: true })
    return list
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/metadata/annotations') || {}
    return !!annotations['kubernetes.io/instance-type']
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`,
      )
      const list = (resp && resp.data?.items) || []
      return list.map((item) => (item.metadata && item.metadata.name) || '')
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isNodeTopologySelected() {
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComMilvusAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb()) return true
    return (
      !!getValue(model, '/resources/autoscalingKubedbComMilvusAutoscaler/spec/databaseRef/name') &&
      !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function handleUnit(path, type = 'bound') {
    let value = getValue(model, `/resources/${path}`)
    if (type === 'scalingRules') {
      const updatedValue = []
      value?.forEach((ele) => {
        let appliesUpto = ele['appliesUpto']
        let threshold = ele['threshold']
        if (appliesUpto && !isNaN(appliesUpto)) appliesUpto += 'Gi'
        if (!isNaN(threshold)) threshold += 'pc'
        updatedValue.push({ threshold, appliesUpto })
      })
      if (JSON.stringify(updatedValue) !== JSON.stringify(value)) {
        commit('wizard/model$update', {
          path: `/resources/${path}`,
          value: updatedValue,
          force: true,
        })
      }
    } else {
      if (!isNaN(value)) {
        value += 'Gi'
        commit('wizard/model$update', { path: `/resources/${path}`, value, force: true })
      }
    }
  }

  function setValueFromDbDetails(path) {
    return getValue(model, path)
  }

  // ── End Autoscaling ────────────────────────────────────────────────────────

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

  function fetchJsons({ axios, itemCtx }) {
    let ui = {}
    let language = {}
    let functions = {}
    const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

    try {
      ui = axios.get(
        `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      language = axios.get(
        `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      const functionString = axios.get(
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

  function isBindingAlreadyOn() {
    const value = getValue(model, '/resources')
    const keys = Object.keys(value)
    const isExposeBinding = !!keys.find((str) => str === 'catalogAppscodeComMilvusBinding')
    return isExposeBinding
  }

  function addOrRemoveBinding() {
    const value = getValue(discriminator, `/binding`)
    const dbName = getValue(model, '/metadata/release/name')
    const dbNamespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComMilvus/metadata/labels')
    const bindingValues = {
      apiVersion: 'catalog.appscode.com/v1alpha1',
      kind: 'MilvusBinding',
      metadata: {
        labels,
        name: dbName,
        namespace: dbNamespace,
      },
      spec: {
        sourceRef: {
          name: dbName,
          namespace: dbNamespace,
        },
      },
    }

    if (value) {
      commit('wizard/model$update', {
        path: '/resources/catalogAppscodeComMilvusBinding',
        value: bindingValues,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/catalogAppscodeComMilvusBinding')
    }
  }

  return {
    returnFalse,
    returnTrue,
    returnStringYes,
    isRancherManaged,
    isVariantAvailable,
    getNamespaces,
    getCreateNameSpaceUrl,
    getMilvusVersions,
    getStorageClassNames,
    getSecrets,
    getIssuerRefsName,
    setApiGroup,
    getAliasOptions,
    onNameChange,
    onNamespaceChange,
    onLabelChange,
    disableLableChecker,
    isEqualToModelPathValue,
    isEqualToDiscriminatorPath,
    isValueExistInModel,
    getOpsRequestUrl,
    initMonitoring,
    getCreateAuthSecret,
    onCreateAuthSecretChange,
    showExistingSecretSection,
    showPasswordSection,
    setAuthSecretPassword,
    onAuthSecretPasswordChange,
    onTlsConfigureChange,
    showTlsConfigureSection,
    setStorageClass,
    onEnableMonitoringChange,
    showMonitoringSection,
    onAgentChange,
    onCustomizeExporterChange,
    showCustomizeExporterSection,
    onSetCustomConfigChange,
    setConfigurationSource,
    onConfigurationSourceChange,
    setConfiguration,
    onConfigurationChange,
    resourceNames,
    fetchJsons,
    // Autoscaling
    isKubedb,
    isConsole,
    getMilvusDbs,
    initAutoscalerMetadata,
    getMilvusDbDetails,
    isMilvusStandalone,
    isMilvusDistributed,
    setTrigger,
    fetchTopologyMachines,
    getMachines,
    setAllowedMachine,
    onMachineChange,
    setControlledResources,
    hasAnnotations,
    hasNoAnnotations,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,
    handleUnit,
    setValueFromDbDetails,

    addOrRemoveBinding,
    isBindingAlreadyOn,
  }
}
