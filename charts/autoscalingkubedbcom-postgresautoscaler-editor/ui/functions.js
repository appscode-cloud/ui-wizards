const { useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, storeGet, discriminator, commit } = useOperator(model, store.state)

  let autoscaleType = ''

  function isConsole() {
    const isKube = isKubedb()

    if (isKube) {
      const dbName = storeGet('/route/params/name') || ''
      commit('wizard/model$update', {
        path: '/spec/databaseRef/name',
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

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    return (
      !!getValue(model, '/spec/databaseRef/name') && !!getValue(discriminator, '/autoscalingType')
    )
  }

  async function getNamespaces() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'core',
      version: 'v1',
      resource: 'namespaces',
      filter: { items: { metadata: { name: null } } },
    })

    const resources = resp?.items || []

    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  async function getPostgresDbs() {
    const namespace = getValue(model, '/metadata/namespace')
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    if (!namespace) return []

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'kubedb.com',
      version: 'v1alpha2',
      resource: 'postgreses',
      namespace,
      filter: { items: { metadata: { name: null } } },
    })

    const resources = resp?.items || []

    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  function initMetadata() {
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

    if (type === 'compute') commit('wizard/model$delete', '/spec/storage')
    if (type === 'storage') commit('wizard/model$delete', '/spec/compute')
  }

  function onNamespaceChange() {
    const namespace = getValue(model, '/metadata/namespace')
    if (!namespace) {
      commit('wizard/model$delete', '/spec/databaseRef/name')
    }
  }

  function ifScalingTypeEqualsTo(type) {
    const operation = storeGet('/route/params/actions') || ''
    if (operation.length) {
      const splitOp = operation.split('-')
      if (splitOp.length > 2) autoscaleType = splitOp[2]
    } else autoscaleType = getValue(discriminator, '/autoscalingType') || ''
    const isDatabaseSelected = !!getValue(model, '/spec/databaseRef/name')
    return autoscaleType === type && isDatabaseSelected
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: 'node.k8s.appscode.com',
        version: 'v1alpha1',
        resource: 'nodetopologies',
      })
      const list = resp?.items || []
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
    const nodeTopologyName = getValue(model, '/spec/compute/nodeTopology/name') || ''
    return !!nodeTopologyName.length
  }

  function setControlledResources(type) {
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
    isKubedb,
    showOpsRequestOptions,
    getNamespaces,
    getPostgresDbs,
    initMetadata,
    onNamespaceChange,
    ifScalingTypeEqualsTo,
    fetchNodeTopology,
    isNodeTopologySelected,
    setControlledResources,
    setTrigger,
    setApplyToIfReady,
  }
}
