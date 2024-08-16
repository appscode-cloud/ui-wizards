// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

const backendMap = {
  azure: {
    spec: { container: '', maxConnections: 0, prefix: '' },
    auth: { AZURE_ACCOUNT_KEY: '', AZURE_ACCOUNT_NAME: '' },
  },
  b2: {
    spec: { bucket: '', prefix: '', maxConnections: 0 },
    auth: { B2_ACCOUNT_ID: '', B2_ACCOUNT_KEY: '' },
  },
  gcs: {
    spec: { bucket: '', prefix: '', maxConnections: 0 },
    auth: { GOOGLE_PROJECT_ID: '', GOOGLE_SERVICE_ACCOUNT_JSON_KEY: '' },
  },
  s3: {
    spec: { endpoint: '', bucket: '', prefix: '', region: '' },
    auth: {
      AWS_ACCESS_KEY_ID: '',
      AWS_SECRET_ACCESS_KEY: '',
      CA_CERT_DATA: '',
    },
  },
  swift: {
    spec: { container: '', prefix: '' },
    auth: {
      OS_AUTH_TOKEN: '',
      OS_AUTH_URL: '',
      OS_PASSWORD: '',
      OS_PROJECT_DOMAIN_NAME: '',
      OS_PROJECT_NAME: '',
      OS_REGION_NAME: '',
      OS_STORAGE_URL: '',
      OS_TENANT_ID: '',
      OS_TENANT_NAME: '',
      OS_USERNAME: '',
      OS_USER_DOMAIN_NAME: '',
      ST_AUTH: '',
      ST_KEY: '',
      ST_USER: '',
    },
  },
}

// get specific feature details
function getFeatureSetDetails(storeGet) {
  const featureSets = storeGet('/cluster/featureSets/result') || []
  const featureSetName = storeGet('/route/params/featureset') || ''
  const featureSet = featureSets.find((item) => item?.metadata?.name === featureSetName)
  return featureSet
}

// get specific attribute's value of a feature
function getFeatureSetPropertyValue(storeGet, getValue, path) {
  const featureSet = getFeatureSetDetails(storeGet)
  const value = getValue(featureSet, path)
  return value
}

function getFeatureSetDescription({ storeGet, getValue }) {
  const description = getFeatureSetPropertyValue(storeGet, getValue, '/spec/description')
  return description
}

// get specific feature details
function getFeatureDetails(storeGet, name) {
  const features = storeGet('/cluster/features/result') || []
  const feature = features.find((item) => item?.metadata?.name === name)
  return feature
}

// get specific attribute's value of a feature
function getFeaturePropertyValue(storeGet, name, getValue, path) {
  const feature = getFeatureDetails(storeGet, name)
  const value = getValue(feature, path)
  return value
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, path, value) {
  watchDependency(`model#${path}`)

  const modelValue = getValue(model, path)
  return modelValue === value
}

function isFeatureRequired(storeGet, featureName) {
  const featureSet = getFeatureSetDetails(storeGet)
  const requiredFeatures = featureSet?.spec?.requiredFeatures || []
  const isRequired = requiredFeatures.includes(featureName)
  return isRequired
}

function getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, isBlockLevel, storeGet) {
  const featureBlock = storeGet('/route/query/activeBlock') || ''
  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name
    return (
      item?.status?.enabled ||
      isFeatureRequired(storeGet, featureName) ||
      (isBlockLevel && item?.spec?.featureBlock === featureBlock && item?.spec?.recommended)
    )
  })
  const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []
  return enabledFeatureNames
}

function getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, isBlockLevel, storeGet) {
  // filter only (enabled + required + feature block feature)
  const featureBlock = storeGet('/route/query/activeBlock') || ''

  // for OCM

  const getRoute = storeGet('/route')
  const FeatureList = storeGet('/ocm/featureSet/')
  const FeatureSet = storeGet('/route/params/featureset')

  if (getRoute.fullPath.includes('/hubs/')) {
    const selectedFeatureSet =
      FeatureList.result?.filter((item) => {
        return item.name === FeatureSet
      }) || []
    const checkedFeatures =
      selectedFeatureSet[0].features.filter((item) => {
        return item.installed || item.recommended || item.featureBlock === featureBlock
      }) || []
    const checkedFeatureName =
      checkedFeatures.map((item) => {
        return item.name
      }) || []
    checkedFeatureName.push(featureBlock)
    return checkedFeatureName
  }

  const isRecommendedFeatureAvailable = allFeatureSetFeature.some((item) => {
    return item?.spec?.featureBlock === featureBlock && item?.spec?.recommended
  })
  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name

    if (isBlockLevel) {
      if (isRecommendedFeatureAvailable) {
        return (
          item?.status?.enabled ||
          isFeatureRequired(storeGet, featureName) ||
          (item?.spec?.featureBlock === featureBlock && item?.spec?.recommended === true)
        )
      } else {
        return (
          item?.status?.enabled ||
          isFeatureRequired(storeGet, featureName) ||
          item?.spec?.featureBlock === featureBlock
        )
      }
    } else {
      return (
        item?.status?.enabled || item?.spec?.recommended || isFeatureRequired(storeGet, featureName)
      )
    }
  })
  const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []
  return enabledFeatureNames
}

function getEnabledFeaturesFromActiveFeature(allFeatureSetFeature, storeGet) {
  const activeFeature = storeGet('/route/query/activeFeature') || ''

  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name
    return (
      item?.status?.enabled ||
      isFeatureRequired(storeGet, featureName) ||
      item?.spec?.recommended ||
      featureName === activeFeature
    )
  })
  const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []

  return enabledFeatureNames
}

function getEnabledFeatures({ storeGet }) {
  const allFeatures = storeGet('/cluster/features/result') || []
  const featureSet = storeGet('/route/params/featureset') || []
  const featureBlock = storeGet('/route/query/activeBlock') || ''
  const configureMode = storeGet('/route/query/mode') || ''
  const activeFeature = storeGet('/route/query/activeFeature') || ''

  const allFeatureSetFeature =
    allFeatures.filter((item) => {
      return item?.spec?.featureSet === featureSet
    }) || []

  if (activeFeature) {
    return getEnabledFeaturesFromActiveFeature(allFeatureSetFeature, storeGet)
  }

  if (featureBlock) {
    //feature block level
    if (configureMode) {
      // configure btn
      return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, true, storeGet)
    } else {
      // enable btn
      return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, true, storeGet)
    }
  } else {
    // feature set level
    if (configureMode) {
      // configure btn
      return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, false, storeGet)
    } else {
      // enable btn
      return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, false, storeGet)
    }
  }
}

function disableFeatures({ getValue, storeGet, itemCtx, discriminator, watchDependency }) {
  watchDependency('discriminator#/isResourceLoaded')

  const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
  if (!isResourceLoaded) return true

  const featureName = itemCtx.value
  const featureSet = getFeatureSetDetails(storeGet)
  const requiredFeatures = featureSet?.spec?.requiredFeatures || []

  if (requiredFeatures.includes(featureName)) return true
  else return false
}

function getResourceValuePathFromFeature(feature) {
  const featureName = feature?.metadata?.name || ''
  const underscoredFeatureName = featureName.toLowerCase().replaceAll('-', '_')
  const resourceValuePath = `helmToolkitFluxcdIoHelmRelease_${underscoredFeatureName}`
  return resourceValuePath
}

function onEnabledFeaturesChange({ discriminator, getValue, commit, storeGet }) {
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []

  const allFeatures = storeGet('/cluster/features/result') || []

  allFeatures.forEach((item) => {
    const featureName = item?.metadata?.name || ''
    const resourceValuePath = getResourceValuePathFromFeature(item)

    if (enabledFeatures.includes(featureName)) {
      const featureSet = storeGet('/route/params/featureset') || ''
      const chart = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/name')
      const targetNamespace = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        '/spec/chart/namespace',
      )
      const sourceRef = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        '/spec/chart/sourceRef',
      )
      const version = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        '/spec/chart/version',
      )

      const isEnabled = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/enabled')
      const isManaged = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/managed')

      if (isEnabled && !isManaged) {
        commit('wizard/model$delete', `/resources/${resourceValuePath}`)
      } else {
        commit('wizard/model$update', {
          path: `/resources/${resourceValuePath}`,
          value: {
            ...resources?.[resourceValuePath],
            metadata: {
              ...resources?.[resourceValuePath]?.metadata,
              labels: {
                ...resources?.[resourceValuePath]?.metadata?.labels,
                'app.kubernetes.io/component': featureName,
                'app.kubernetes.io/part-of': featureSet,
              },
            },
            spec: {
              ...resources?.[resourceValuePath]?.spec,
              chart: {
                spec: {
                  chart,
                  sourceRef,
                  version,
                },
              },
              targetNamespace,
            },
          },
          force: true,
        })
      }
    } else {
      commit('wizard/model$delete', `/resources/${resourceValuePath}`)
    }
  })
}
let resources = {}

function returnFalse() {
  return false
}

async function setReleaseNameAndNamespaceAndInitializeValues({
  commit,
  storeGet,
  model,
  getValue,
  axios,
  setDiscriminatorValue,
}) {
  const modelResources = getValue(model, '/resources')
  resources = { ...modelResources }

  const isFeatureSetInstalled = getFeatureSetPropertyValue(storeGet, getValue, '/status/enabled')

  if (isFeatureSetInstalled) {
    // get resources default values when featureset is installed
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const {
      name: chartName,
      sourceRef,
      version: chartVersion,
    } = getFeatureSetPropertyValue(storeGet, getValue, '/spec/chart')
    const { data } = await axios.get(
      `/clusters/${owner}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${chartVersion}&format=json`,
    )
    const { resources: resourcesDefaultValues } = data || {}

    Object.keys(resourcesDefaultValues || {}).forEach((key) => {
      if (!resources[key]) {
        resources[key] = resourcesDefaultValues[key]
      }
    })
  }
  const featureSet = storeGet('/route/params/featureset')
  commit('wizard/model$update', {
    path: '/metadata/release',
    value: {
      name: featureSet,
      namespace: 'kubeops',
    },
    force: true,
  })

  // delete extra values from model if the feature does not exist
  const allFeatures = storeGet('/cluster/features/result') || []
  const allFeatureResourceValuePathNames = allFeatures.map((feature) =>
    getResourceValuePathFromFeature(feature),
  )
  Object.keys(modelResources).forEach((modelResourcePath) => {
    if (!allFeatureResourceValuePathNames.includes(modelResourcePath)) {
      // model path does not exist in feature values
      // remove the model path
      commit('wizard/model$delete', `/resources/${modelResourcePath}`)
    }
  })

  setDiscriminatorValue('/isResourceLoaded', true)
}

function fetchFeatureSetOptions({ storeGet }) {
  const features = storeGet('/cluster/features/result') || []
  const featureSetName = storeGet('/route/params/featureset')
  const filteredFeatures = features.filter((item) => item?.spec?.featureSet === featureSetName)
  const options = filteredFeatures.map((item) => {
    const { spec, metadata } = item || {}
    const { title, description, required } = spec || {}
    const { name } = metadata || {}
    return {
      text: title,
      value: name,
      description: description,
      statusTag: {
        text: required ? 'Required' : '',
      },
    }
  })

  return options || []
}

// this element is is used only to catch discriminator value
// It is not used in create-ui to get or store value
function hideThisElement() {
  return false
}

// this computed's main purpose is to watch isResourceLoaded flag
// and fire the onEnabledFeatureChange function when it's true
function checkIsResourceLoaded({ commit, storeGet, watchDependency, getValue, discriminator }) {
  watchDependency('discriminator#/isResourceLoaded')
  const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
  if (isResourceLoaded) {
    onEnabledFeaturesChange({ discriminator, getValue, commit, storeGet })
  }
}

function isStashPreset({ getValue, watchDependency, discriminator, commit }) {
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  watchDependency('discriminator#/enabledFeatures')
  if (enabledFeatures?.includes('stash-presets') && enabledFeatures?.includes('kubestash')) {
    return true
  } else {
    commit('wizard/model$update', {
      path: '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool',
      value: '',
      force: true,
    })
    return false
  }
}

function getProviderList({ getValue, watchDependency, discriminator }) {
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  watchDependency('discriminator#/enabledFeatures')
  const filteredList = enabledFeatures.filter((item) => {
    if (item === 'stash-opscenter' || item === 'stash-presets') return false
    return true
  })
  const finalList = filteredList.map((item) => {
    if (item === 'kubestash') return 'KubeStash'
    else return 'Stash'
  })
  return finalList
}

function presetType({ getValue, watchDependency, model, discriminator }, value) {
  watchDependency('model#/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool')
  const presetType = getValue(
    model,
    '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool',
  )
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  if (!enabledFeatures?.includes(value)) {
    return false
  }
  if (presetType?.toLowerCase() === value) return true
}

function providerType({ getValue, watchDependency, model }, value) {
  const presetType = getValue(
    model,
    '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool',
  )?.toLowerCase()
  watchDependency(
    `model#/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/${presetType}/backend/provider`,
  )
  const provider = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/${presetType}/backend/provider`,
  )
  return provider === value
}

function authEnabled({ getValue, watchDependency, model }) {
  const presetType = getValue(
    model,
    '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool',
  )?.toLowerCase()
  watchDependency(
    `model#/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/${presetType}/storageSecret/create`,
  )
  const isEnabled = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/${presetType}/storageSecret/create`,
  )
  return isEnabled
}

function initPrune({ getValue, model }) {
  const prune = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/retentionPolicy/prune`,
  )
  return prune ? prune : false
}

function setTool({ commit }) {
  commit('wizard/model$update', {
    path: '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/tool',
    value: 'KubeStash',
    force: true,
  })
  return 'KubeStash'
}

function setProvider() {
  return 's3'
}

function setStorageSecret({ getValue, model }) {
  const secret = getValue(
    model,
    '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/kubestash/storageSecret/create',
  )
  return secret
}

function onAuthChange({ getValue, discriminator, commit }, type) {
  const auth = getValue(discriminator, `/${type}`) || false
  commit('wizard/model$update', {
    path: '/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/kubestash/storageSecret/create',
    value: auth,
    force: true,
  })
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

return {
  hideThisElement,
  checkIsResourceLoaded,
  getFeatureSetDetails,
  getFeatureSetPropertyValue,
  getFeatureSetDescription,
  isEqualToModelPathValue,
  getEnabledFeatures,
  disableFeatures,
  onEnabledFeaturesChange,
  returnFalse,
  setReleaseNameAndNamespaceAndInitializeValues,
  fetchFeatureSetOptions,
  isStashPreset,
  getProviderList,
  presetType,
  providerType,
  authEnabled,
  initPrune,
  fetchJsons,
  setTool,
  setProvider,
  setStorageSecret,
  onAuthChange,
}
