// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

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

let resources = {}

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
        return item.installed || item.recommended
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

function generatePresetValued(featureName, featureSet, storeGet) {
  const featureDetails = getFeatureDetails(storeGet, featureName)
  const resourceValuePath = getResourceValuePathFromFeature(featureDetails)
  const chart = featureDetails?.spec?.chart?.name || ''
  const targetNamespace = featureDetails?.spec?.chart?.namespace || ''
  const sourceRef = featureDetails?.spec?.chart?.sourceRef
  const version = featureDetails?.spec?.chart?.version

  return {
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
  }
}

function onEnabledFeaturesChange({ discriminator, getValue, commit, storeGet }) {
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []

  const allFeatures = storeGet('/cluster/features/result') || []

  allFeatures.forEach((item) => {
    const featureName = item?.metadata?.name || ''
    const resourceValuePath = getResourceValuePathFromFeature(item)
    const featureSet = storeGet('/route/params/featureset') || ''

    if (enabledFeatures.includes(featureName)) {
      const featureDetails = getFeatureDetails(storeGet, featureName)
      const isEnabled = featureDetails?.status?.enabled || false
      const isManaged = featureDetails?.status?.managed || false

      if (isEnabled && !isManaged) {
        commit('wizard/model$delete', `/resources/${resourceValuePath}`)
      } else {
        const value = generatePresetValued(featureName, featureSet, storeGet)
        const path = `/resources/${resourceValuePath}`
        commit('wizard/model$update', {
          path: path,
          value: value,
          force: true,
        })
      }
    } else {
      commit('wizard/model$delete', `/resources/${resourceValuePath}`)
    }
  })

  const enabledTypes = getValue(discriminator, '/enabledTypes') || []
  typeConvert(commit, enabledTypes, storeGet)
}

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
    const clusterset = storeGet('route/params/clusterset')
    const spoke = storeGet('/route/params/spoke')

    const {
      name: chartName,
      sourceRef,
      version: chartVersion,
    } = getFeatureSetPropertyValue(storeGet, getValue, '/spec/chart')
    let url =
      `/clusters/${owner}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${chartVersion}&format=json` +
      (clusterset ? `&clusterset=${clusterset}` : '')
    if (spoke)
      url = `/clusters/${owner}/${spoke}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${chartVersion}&format=json`
    const { data } = await axios.get(url)
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

  const resource = getValue(model, '/metadata/resource')
  commit('wizard/model$update', {
    path: '/metadata/resource',
    value: {
      ...resource,
      name: isFeatureSetInstalled ? 'features' : 'featuresets',
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

function isKubedbSelected({ getValue, discriminator, watchDependency, commit, storeGet }) {
  watchDependency('discriminator#/enabledFeatures')
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  const isSelected = enabledFeatures?.includes('kubedb')

  // if not selected return false and remove data
  if (!isSelected) {
    commit('wizard/model$delete', 'resources/helmToolkitFluxcdIoHelmRelease_kubedb')
    return false
  }

  const kubedbFeatur = getFeatureDetails(storeGet, 'kubedb')
  if (kubedbFeatur) {
    const isEnabled = kubedbFeatur?.status?.enabled || false
    const isManaged = kubedbFeatur?.status?.managed || false
    // const isEnabled = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/enabled')
    // const isManaged = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/managed')
    if (isEnabled && !isManaged) {
      commit('wizard/model$delete', 'resources/helmToolkitFluxcdIoHelmRelease_kubedb')
      return false
    }
  }
  return true
}

let allAvailableTypes = [
  'ClickHouse',
  'Druid',
  'Elasticsearch',
  'FerretDB',
  'Kafka',
  'MariaDB',
  'Memcached',
  'MSSQLServer',
  'MongoDB',
  'MySQL',
  'PerconaXtraDB',
  'PgBouncer',
  'Pgpool',
  'Postgres',
  'ProxySQL',
  'RabbitMQ',
  'Redis',
  'Singlestore',
  'Solr',
  'ZooKeeper',
]
let data = {}
let isFetching = 'stale'
async function getDatabaseTypes({
  setDiscriminatorValue,
  discriminator,
  commit,
  storeGet,
  getValue,
  axios,
}) {
  let enabledTypes = ['Elasticsearch', 'Kafka', 'MariaDB', 'MongoDB', 'MySQL', 'Postgres', 'Redis']
  const owner = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const spoke = storeGet('/route/params/spoke')
  const getRoute = storeGet('/route')

  if (isFetching === 'success') {
    enabledTypes = getValue(discriminator, '/enabledTypes') || []
  } else if (isFetching !== 'pending') {
    try {
      isFetching = 'pending'

      const clusterset = getRoute.fullPath.includes('/clustersets/')
        ? getRoute.fullPath.split('/clustersets/')[1].split('/')[0]
        : null

      let url = clusterset
        ? `/clusters/${owner}/${cluster}/db-status?clusterset=${clusterset}`
        : `/clusters/${owner}/${cluster}/db-status`
      if (spoke) url = `/clusters/${owner}/${spoke}/db-status`

      const resp = await axios.get(url)

      data = resp?.data
      isFetching = 'success'
      if (Object.keys(data).length) {
        enabledTypes = []
        allAvailableTypes = []
        for (const [key, value] of Object.entries(data)) {
          if (value === true) enabledTypes.push(key)
          allAvailableTypes.push(key)
        }
      }
    } catch (e) {
      console.log(e)
    }
  } else {
    enabledTypes = ['Elasticsearch', 'Kafka', 'MariaDB', 'MongoDB', 'MySQL', 'Postgres', 'Redis']
  }
  setDiscriminatorValue('/enabledTypes', enabledTypes)
  const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
  const isSelected = enabledFeatures?.includes('kubedb')
  if (isSelected) {
    typeConvert(commit, enabledTypes, storeGet)
  }
  return allAvailableTypes
}

function onTypeUpdate({ discriminator, commit, getValue, storeGet }) {
  const enabledTypes = getValue(discriminator, '/enabledTypes') || []
  typeConvert(commit, enabledTypes, storeGet)
}

function typeConvert(commit, enabledTypes, storeGet) {
  let convertFromArray = {}
  allAvailableTypes?.forEach((item) => {
    convertFromArray[item] = enabledTypes ? enabledTypes.includes(item) : false
  })

  const kubedbValue = resources['helmToolkitFluxcdIoHelmRelease_kubedb']
  if (kubedbValue) {
    const featureSet = storeGet('/route/params/featureset') || ''
    const formattedValue = generatePresetValued('kubedb', featureSet, storeGet)
    formattedValue.spec.values.global.featureGates = convertFromArray
    commit('wizard/model$update', {
      path: 'resources/helmToolkitFluxcdIoHelmRelease_kubedb',
      value: formattedValue,
      force: true,
    })
  }

  return convertFromArray
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
  setReleaseNameAndNamespaceAndInitializeValues,
  fetchFeatureSetOptions,
  isKubedbSelected,
  getDatabaseTypes,
  onTypeUpdate,
  returnFalse,
}
