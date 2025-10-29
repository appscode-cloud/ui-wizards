// Global variables
let autoscaleType = ''
let dbDetails = {}

// Helper function that needs parameters
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
    e
  }

  return ans
}

function isKubedb() {
  return !!storeGet('/route/params/actions')
}

function showOpsRequestOptions() {
  ;('showOpsRequestOptions called')
  if (isKubedb() === true) return true
  // watchDependency('model#/spec/databaseRef/name')
  return (
    !!getValue(model, '/spec/databaseRef/name') && !!getValue(discriminator, '/autoscalingType')
  )
}

function setTrigger(path) {
  ;('setTrigger called')
  let value = getValue(model, `/resources/${path}`)
  if (value) return value
  return 'On'
}

function setApplyToIfReady() {
  ;('setApplyToIfReady called')
  return 'IfReady'
}

function handleUnit(path, type = 'bound') {
  ;('handleUnit called')
  let value = getValue(model, `/resources/${path}`)
  if (type === 'scalingRules') {
    const updatedValue = []
    value?.forEach((ele) => {
      let appliesUpto = ele['appliesUpto']
      let threshold = ele['threshold']
      if (appliesUpto && !isNaN(appliesUpto)) {
        appliesUpto += 'Gi'
      }
      if (!isNaN(threshold)) {
        threshold += 'pc'
      }
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
      commit('wizard/model$update', {
        path: `/resources/${path}`,
        value: value,
        force: true,
      })
    }
  }
}

function isConsole() {
  const isKube = isKubedb()

  if (isKube) {
    const dbName = storeGet('/route/params/name') || ''
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComKafkaAutoscaler/spec/databaseRef/name',
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
      path: '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/name',
      value: modifiedName,
      force: true,
    })
    const namespace = storeGet('/route/query/namespace') || ''
    if (namespace) {
      commit('wizard/model$update', {
        path: '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/namespace',
        value: namespace,
        force: true,
      })
    }
  }

  return !isKube
}

function dbTypeEqualsTo(dbType) {
  autoscaleType = 'storage'
  const dbDetailsSuccess = getValue(discriminator, '/dbDetails')

  if (!dbDetailsSuccess) return false

  const { spec } = dbDetails || {}
  const { topology } = spec || {}

  if (topology && dbType === 'topology') return true
  if (!topology && dbType === 'combined') return true
  return false
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
    '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/namespace',
  )
  if (!namespace) {
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComKafkaAutoscaler/spec/databaseRef/name',
    )
  }
}

async function getDbs() {
  const namespace = getValue(
    model,
    '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/namespace',
  )
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/kafkas`,
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
    getValue(model, '/resources/autoscalingKubedbComKafkaAutoscaler/spec/databaseRef/name') || ''
  const type = getValue(discriminator, '/autoscalingType') || ''
  const date = Math.floor(Date.now() / 1000)
  const resource = storeGet('/route/params/resource')
  const scalingName = dbName ? dbName : resource
  const modifiedName = `${scalingName}-${date}-autoscaling-${type ? type : ''}`
  if (modifiedName)
    commit('wizard/model$update', {
      path: '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/name',
      value: modifiedName,
      force: true,
    })

  // delete the other type object from model
  if (type === 'compute')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComKafkaAutoscaler/spec/storage')
  if (type === 'storage')
    commit('wizard/model$delete', '/resources/autoscalingKubedbComKafkaAutoscaler/spec/compute')
}

async function getDbDetails() {
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace =
    storeGet('/route/query/namespace') ||
    getValue(model, '/resources/autoscalingKubedbComKafkaAutoscaler/metadata/namespace') ||
    ''
  const name =
    storeGet('/route/params/name') ||
    getValue(model, '/resources/autoscalingKubedbComKafkaAutoscaler/spec/databaseRef/name') ||
    ''

  if (namespace && name) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/kafkas/${name}`,
      )
      dbDetails = resp.data || {}
      setDiscriminatorValue('/dbDetails', true)
    } catch (e) {
      e
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
    path: `/resources/autoscalingKubedbComKafkaAutoscaler/spec/databaseRef/name`,
    value: name,
    force: true,
  })
  commit('wizard/model$update', {
    path: `/resources/autoscalingKubedbComKafkaAutoscaler/metadata/labels`,
    value: dbDetails.metadata?.labels,
    force: true,
  })
}
