const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

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

  async function getMongoDbs() {
    const namespace = getValue(model, '/metadata/namespace')
    if (!namespace) return []
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'kubedb.com',
      version: 'v1alpha2',
      resource: 'mongodbs',
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

  async function getDbDetails() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
    const name = storeGet('/route/params/name') || getValue(model, '/spec/databaseRef/name') || ''

    if (namespace && name) {
      try {
        const resp = await akp.resources.get({
          owner,
          cluster,
          group: 'kubedb.com',
          version: 'v1alpha2',
          resource: 'mongodbs',
          namespace,
          name,
        })
        setDiscriminatorValue('/dbDetails', resp || {})
      } catch (e) {
        console.log(e)
      }
    }
  }

  // `if` is evaluated synchronously, so the database comes from getDbDetails (block loader)
  function mongoTypeEqualsTo(mongoType) {
    const dbName = getValue(model, '/spec/databaseRef/name')
    const dbDetails = getValue(discriminator, '/dbDetails') || {}
    if (!dbName || dbName !== dbDetails.metadata?.name) return false

    const { shardTopology, replicaSet } = dbDetails.spec || {}
    let verd = ''
    if (shardTopology) verd = 'sharded'
    else {
      if (replicaSet) verd = 'replicaSet'
      else verd = 'standalone'
    }
    clearSpecModel(verd)
    return mongoType === verd
  }

  function clearSpecModel(dbtype) {
    if (dbtype === 'standalone') {
      commit('wizard/model$delete', `/spec/${autoscaleType}/replicaSet`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/shard`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/mongos`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/configServer`)
    } else if (dbtype === 'replicaSet') {
      commit('wizard/model$delete', `/spec/${autoscaleType}/standalone`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/shard`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/mongos`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/configServer`)
    } else if (dbtype === 'sharded') {
      commit('wizard/model$delete', `/spec/${autoscaleType}/standalone`)
      commit('wizard/model$delete', `/spec/${autoscaleType}/replicaSet`)
    }
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

    // delete the other type object from model
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
      return list.map((item) => (item.metadata && item.metadata.name) || '')
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
    getNamespaces,
    getMongoDbs,
    getDbDetails,
    mongoTypeEqualsTo,
    clearSpecModel,
    isKubedb,
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
}
