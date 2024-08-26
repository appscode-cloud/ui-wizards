function getOptions({ getValue, model, watchDependency }, type) {
  watchDependency(`model#/${type}/available`)
  const options = getValue(model, `/${type}/available`)
  return options
}

async function getNodeTopology({ axios, storeGet, commit, route }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')

  try {
    const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
    const resp = await axios.get(url)
    const nodeTopologyListFromApi = resp.data?.items

    const mappedResp = nodeTopologyListFromApi?.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })
    commit('wizard/model$update', {
      path: '/spec/kubeDB/clusterTier/nodeTopology/available',
      value: mappedResp,
      force: true,
    })

    if (route.path.includes('featuresets/opscenter-datastore') && !isKubedbPresetEnable(storeGet)) {
      commit('wizard/model$update', {
        path: `/clusterTier/nodeTopology/available`,
        value: mappedResp,
        force: true,
      })
    }

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function FetchAllDbVersions({ storeGet, axios, setDiscriminatorValue }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/all-available`

  const resp = await axios.get(url)

  setDiscriminatorValue(`/allDbVersions`, resp.data)
  return resp.data
}

function isConfigureDb({ getValue, discriminator, watchDependency }, value) {
  watchDependency(`discriminator#/${value}/isConfigure`)
  const resp = getValue(discriminator, `/${value}/isConfigure`)
  return resp
}

async function FetchDbVersions({ watchDependency, getValue, discriminator }, db) {
  watchDependency(`discriminator#/allDbVersions`)
  data = getValue(discriminator, `allDbVersions/${db}Version`)
  return data
}

function clearDefaultVersion({ commit }, db) {
  commit('wizard/model$update', {
    path: `/databases/${db}/versions/default`,
    value: '',
    force: true,
  })
}

function availableVersions({ getValue, model, watchDependency }, db) {
  watchDependency(`model#/databases/${db}/versions/available`)
  return getValue(model, `/databases/${db}/versions/available`)
}

function isKubedbPresetEnable(storeGet) {
  const featureSets = storeGet('/cluster/featureSets/result') || []
  const featureSetName = storeGet('/route/params/featureset') || ''
  const featureSet = featureSets.find((item) => item?.metadata?.name === featureSetName)

  const features = featureSet?.status?.features || []
  const isKubedbPresetEnable = features.some((feature) => {
    if (feature.name === 'kubedb-ui-presets') return true
  })
  return isKubedbPresetEnable
}

async function getPlacements({ axios, storeGet, route, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/apps.k8s.appscode.com/v1/placementpolicies`
  try {
    const resp = await axios.get(url)

    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    if (route.path.includes('featuresets/opscenter-datastore') && !isKubedbPresetEnable(storeGet)) {
      commit('wizard/model$update', {
        path: `/clusterTier/placement/available`,
        value: mappedResp,
        force: true,
      })
    }

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getStorageClass({ axios, storeGet, route, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`
  try {
    const resp = await axios.get(url)
    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    if (route.path.includes('featuresets/opscenter-datastore') && !isKubedbPresetEnable(storeGet)) {
      commit('wizard/model$update', {
        path: `/storageClasses/available`,
        value: mappedResp,
        force: true,
      })
    }

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getClusterIssuers({ axios, storeGet, route, commit }) {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/clusterissuers`
  try {
    const resp = await axios.get(url)
    const mappedResp = resp?.data?.items.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return name
    })

    if (route.path.includes('featuresets/opscenter-datastore') && !isKubedbPresetEnable(storeGet)) {
      commit('wizard/model$update', {
        path: `/clusterIssuers/available`,
        value: mappedResp,
        force: true,
      })
    }

    return mappedResp
  } catch (e) {
    console.log(e)
    return []
  }
}

async function getNamespaces({ axios, storeGet }) {
  const params = storeGet('/route/params')
  const { user, cluster, group, version, resource } = params
  try {
    const resp = await axios.post(
      `/clusters/${user}/${cluster}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`,
      {
        apiVersion: 'identity.k8s.appscode.com/v1alpha1',
        kind: 'SelfSubjectNamespaceAccessReview',
        spec: {
          resourceAttributes: [
            {
              verb: 'create',
              group: group,
              version: version,
              resource: resource,
            },
          ],
        },
      },
    )
    const namespaces = resp?.data?.status?.namespaces || []
    return namespaces
  } catch (e) {
    console.log(e)
    return []
  }
}

function setTool({ commit }) {
  commit('wizard/model$update', {
    path: '/spec/backup/tool',
    value: 'KubeStash',
    force: true,
  })
  return 'KubeStash'
}

function returnFalse() {
  return false
}

async function fetchJsons({ axios, itemCtx }) {
  let ui = {}
  let language = {}
  let functions = {}
  const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart

  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
    )
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
    )
    // declare evaluate the functionString to get the functions Object
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

function presetNameEqualsTo({ storeGet }, value) {
  const presetName = storeGet('/route/params/presetName') || ''
  return presetName === value
}

function isKubedbUiPreset({ getValue, watchDependency, discriminator, storeGet }) {
  const presetName = storeGet('/route/params/presetName') || ''
  if (presetName === 'kubedb-ui-presets') return true
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  watchDependency('discriminator#/enabledFeatures')
  if (enabledFeatures?.includes('kubedb-ui-presets')) {
    return true
  } else return false
}

return {
  getOptions,
  getNodeTopology,
  FetchAllDbVersions,
  isConfigureDb,
  FetchDbVersions,
  availableVersions,
  clearDefaultVersion,
  getPlacements,
  getStorageClass,
  getClusterIssuers,
  getNamespaces,
  returnFalse,
  presetNameEqualsTo,
  isKubedbUiPreset,
}
