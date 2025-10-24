let autoscaleType = ''
let dbDetails = {}

async function getDbDetails() {
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace =
    storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
  const name =
    storeGet('/route/params/name') ||
    getValue(
      model,
      '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/databaseRef/name',
    ) ||
    ''

  if (namespace && name) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/elasticsearches/${name}`,
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
    path: `/resources/autoscalingkubedbComElasticsearchAutoscaler/spec/databaseRef/name`,
    value: name,
    force: true,
  })
  commit('wizard/model$update', {
    path: `/resources/autoscalingkubedbComElasticsearchAutoscaler/metadata/labels`,
    value: dbDetails.metadata.labels,
    force: true,
  })
}

function isConsole() {
  const isKube = isKubedb()

  if (isKube) {
    const dbName = storeGet('/route/params/name') || ''
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/databaseRef/name',
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
      path: '/metadata/name',
      value: modifiedName,
      force: true,
    })
    const namespace = storeGet('/route/query/namespace') || ''
    if (namespace) {
      commit('wizard/model$update', {
        path: '/metadata/namespace',
        value: namespace,
        force: true,
      })
    }
  }

  return !isKube
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
  const namespace = getValue(model, '/metadata/namespace')
  if (!namespace) {
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/databaseRef/name',
    )
  }
}

function initMetadata() {
  const dbName =
    getValue(
      model,
      '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/databaseRef/name',
    ) || ''
  const type = getValue(discriminator, '/autoscalingType') || ''
  const date = Math.floor(Date.now() / 1000)
  const resource = storeGet('/route/params/resource')
  const scalingName = dbName ? dbName : resource
  const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
  if (modifiedName)
    commit('wizard/model$update', {
      path: '/metadata/name',
      value: modifiedName,
      force: true,
    })

  // delete the other type object from model
  if (type === 'compute')
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/storage',
    )
  if (type === 'storage')
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/compute',
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

function hasAnnotations(type) {
  const annotations = getValue(
    model,
    '/resources/autoscalingKubedbComElasticsearchAutoscaler/metadata/annotations',
  )
  const instance = annotations['kubernetes.io/instance-type']

  return !!instance
}

function setAllowedMachine(type, minmax) {
  const annotations = getValue(
    model,
    '/resources/autoscalingKubedbComElasticsearchAutoscaler/metadata/annotations',
  )
  const instance = annotations['kubernetes.io/instance-type']
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

  if (minmax === 'min') return mn
  else return mx
}

async function getMachines(type, minmax) {
  // watchDependency('discriminator#/topologyMachines')
  const depends = minmax === 'min' ? 'max' : 'min'
  const dependantPath = `/allowedMachine-${type}-${depends}`

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
  const annoPath = '/resources/autoscalingKubedbComElasticsearchAutoscaler/metadata/annotations'
  const annotations = getValue(model, annoPath)
  const instance = annotations['kubernetes.io/instance-type']
  let parsedInstance = {}
  try {
    if (instance) parsedInstance = JSON.parse(instance)
  } catch (e) {
    console.log(e)
    parsedInstance = {}
  }

  const minMachine = getValue(discriminator, `/allowedMachine-${type}-min`)
  const maxMachine = getValue(discriminator, `/allowedMachine-${type}-max`)
  const minMaxMachine = `${minMachine},${maxMachine}`

  parsedInstance[type] = minMaxMachine
  const instanceString = JSON.stringify(parsedInstance)
  annotations['kubernetes.io/instance-type'] = instanceString

  const machines = getValue(discriminator, `/topologyMachines`) || []
  const minMachineObj = machines.find((item) => item.topologyValue === minMachine)
  const maxMachineObj = machines.find((item) => item.topologyValue === maxMachine)
  const minMachineAllocatable = minMachineObj?.allocatable
  const maxMachineAllocatable = maxMachineObj?.allocatable
  const allowedPath = `/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/compute/${type}`

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

function setAllowedMachine(type, minmax) {
  const annotations = getValue(
    model,
    '/resources/autoscalingKubedbComElasticsearchAutoscaler/metadata/annotations',
  )
  const instance = annotations['kubernetes.io/instance-type']
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

  if (minmax === 'min') return mn
  else return mx
}

async function getMachines(type, minmax) {
  // watchDependency('discriminator#/topologyMachines')
  const depends = minmax === 'min' ? 'max' : 'min'
  const dependantPath = `/allowedMachine-${type}-${depends}`

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

function hasNoAnnotations() {
  return !hasAnnotations()
}

function setControlledResources(type) {
  const list = ['cpu', 'memory']
  const path = `/resources/autoscalingKubedbComElasticsearchAutoscaler/spec/compute/${type}/controlledResources`
  commit('wizard/model$update', {
    path: path,
    value: list,
    force: true,
  })
  return list
}

async function dbTypeEqualsTo(type) {
  // watchDependency('discriminator#/dbDetails')

  const { spec } = dbDetails || {}
  const { topology } = spec || {}
  let verd = ''
  if (topology) verd = 'topology'
  else verd = 'node'
  clearSpecModel({ commit }, verd)
  return type === verd && spec
}
