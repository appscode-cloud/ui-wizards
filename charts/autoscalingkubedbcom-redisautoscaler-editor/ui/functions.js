let autoscaleType = ''
let dbDetails = {}

function isConsole({ storeGet, commit }) {
  const isKube = isKubedb({ storeGet })

  if (isKube) {
    const dbName = storeGet('/route/query/name') || ''
    commit('wizard/model$update', {
      path: '/spec/databaseRef/name',
      value: dbName,
      force: true,
    })
    const operation = storeGet('/route/query/operation') || ''
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

function isKubedb({ storeGet }) {
  return !!storeGet('/route/query/operation')
}

function showOpsRequestOptions({ model, getValue, watchDependency, storeGet, discriminator }) {
  if (isKubedb({ storeGet }) === true) return true
  watchDependency('model#/spec/databaseRef/name')
  watchDependency('discriminator#/autoscalingType')
  return (
    !!getValue(model, '/spec/databaseRef/name') && !!getValue(discriminator, '/autoscalingType')
  )
}

async function getNamespaces({ axios, storeGet }) {
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

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  watchDependency('model#/metadata/namespace')
  const namespace = getValue(model, '/metadata/namespace')
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

async function getDbDetails({ axios, storeGet, getValue, model }) {
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace =
    storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
  const name = storeGet('/route/query/name') || getValue(model, '/spec/databaseRef/name') || ''

  if (namespace && name) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/redises/${name}`,
      )
      dbDetails = resp.data || {}
    } catch (e) {
      console.log(e)
    }
  }
}

async function dbTypeEqualsTo({ axios, storeGet, watchDependency, model, getValue, commit }, type) {
  watchDependency('model#/spec/databaseRef/name')

  const dbName = getValue(model, '/spec/databaseRef/name')
  if (dbName !== dbDetails?.metadata?.name)
    await getDbDetails({ axios, storeGet, getValue, model, watchDependency })

  const { spec } = dbDetails || {}
  const { cluster, sentinelRef } = spec || {}
  let verd = ''
  if (cluster) verd = 'cluster'
  else {
    if (sentinelRef) verd = 'sentinel'
    else verd = 'standalone'
  }
  clearSpecModel({ commit }, verd)
  return type === verd
}

function clearSpecModel({ commit }, dbtype) {
  if (dbtype === 'standalone') {
    commit('wizard/model$delete', `/spec/${autoscaleType}/cluster`)
    commit('wizard/model$delete', `/spec/${autoscaleType}/sentinel`)
  } else if (dbtype === 'cluster') {
    commit('wizard/model$delete', `/spec/${autoscaleType}/standalone`)
    commit('wizard/model$delete', `/spec/${autoscaleType}/sentinel`)
  } else if (dbtype === 'sentinel') {
    commit('wizard/model$delete', `/spec/${autoscaleType}/standalone`)
    commit('wizard/model$delete', `/spec/${autoscaleType}/cluster`)
  }
}

function initMetadata({ getValue, discriminator, model, commit, storeGet }) {
  const dbName = getValue(model, '/spec/databaseRef/name') || ''
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
  if (type === 'compute') commit('wizard/model$delete', '/spec/storage')
  if (type === 'storage') commit('wizard/model$delete', '/spec/compute')
}

function onNamespaceChange({ model, getValue, commit }) {
  const namespace = getValue(model, '/metadata/namespace')
  if (!namespace) {
    commit('wizard/model$delete', '/spec/databaseRef/name')
  }
}

function ifScalingTypeEqualsTo(
  { storeGet, watchDependency, getValue, discriminator, model },
  type,
) {
  watchDependency('discriminator#/autoscalingType')
  watchDependency('model#/spec/databaseRef/name')

  const operation = storeGet('/route/query/operation') || ''
  if (operation.length) {
    const splitOp = operation.split('-')
    if (splitOp.length > 2) autoscaleType = splitOp[2]
  } else autoscaleType = getValue(discriminator, '/autoscalingType') || ''
  const isDatabaseSelected = !!getValue(model, '/spec/databaseRef/name')
  return autoscaleType === type && isDatabaseSelected
}

async function fetchNodeTopology({ axios, storeGet }) {
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

function isNodeTopologySelected({ watchDependency, model, getValue }) {
  watchDependency('model#/spec/compute/nodeTopology/name')
  const nodeTopologyName = getValue(model, '/spec/compute/nodeTopology/name') || ''
  return !!nodeTopologyName.length
}

function setControlledResources({ commit }, type) {
  const list = ['cpu', 'memory']
  const path = `/spec/compute/${type}/controlledResources`
  commit('wizard/model$update', {
    path: path,
    value: list,
    force: true,
  })
  return list
}

function setTrigger() {
  return 'On'
}

function setApplyToIfReady() {
  return 'IfReady'
}

return {
  isConsole,
  getNamespaces,
  getDbs,
  isKubedb,
  getDbDetails,
  dbTypeEqualsTo,
  clearSpecModel,
  initMetadata,
  onNamespaceChange,
  ifScalingTypeEqualsTo,
  fetchNodeTopology,
  isNodeTopologySelected,
  setControlledResources,
  setTrigger,
  setApplyToIfReady,
  showOpsRequestOptions,
}
