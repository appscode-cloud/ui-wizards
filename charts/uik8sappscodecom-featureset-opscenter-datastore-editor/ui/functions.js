const { axios, store, useOperator } = window.vueHelpers || {}
export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enabledFeatures', [])
  setDiscriminatorValue('/isResourceLoaded', false)
  setDiscriminatorValue('/enabledTypes', [
    'Elasticsearch',
    'Kafka',
    'MariaDB',
    'MongoDB',
    'MySQL',
    'Postgres',
    'Redis',
  ])
  let resources = {}

  function getFeatureSetDetails() {
    const featureSets = storeGet('/cluster/featureSets/result') || []
    const featureSetName = storeGet('/route/params/featureset') || ''
    const featureSet = featureSets.find((item) => item?.metadata?.name === featureSetName)
    return featureSet
  }

  // get specific attribute's value of a feature
  function getFeatureSetPropertyValue(path) {
    const featureSet = getFeatureSetDetails()
    const value = storeGet(path, featureSet)
    return value
  }

  function getFeatureSetDescription() {
    const description = getFeatureSetPropertyValue('/spec/description')
    return description
  }

  // get specific feature details
  function getFeatureDetails(name) {
    const features = storeGet('/cluster/features/result') || []
    const feature = features.find((item) => item?.metadata?.name === name)
    return feature
  }

  function isEqualToModelPathValue(path, value) {
    // watchDependency(`model#${path}`)

    const modelValue = getValue(model, path)
    return modelValue === value
  }

  function isFeatureRequired(featureName) {
    const featureSet = getFeatureSetDetails()
    const requiredFeatures = featureSet?.spec?.requiredFeatures || []
    const isRequired = requiredFeatures.includes(featureName)
    return isRequired
  }

  function getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, isBlockLevel) {
    const featureBlock = storeGet('/route/query/activeBlock') || ''
    const enabledFeatures = allFeatureSetFeature.filter((item) => {
      const featureName = item?.metadata?.name
      return (
        item?.status?.enabled ||
        isFeatureRequired(featureName) ||
        (isBlockLevel && item?.spec?.featureBlock === featureBlock && item?.spec?.recommended)
      )
    })

    const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []
    return enabledFeatureNames
  }

  function getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, isBlockLevel) {
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
            isFeatureRequired(featureName) ||
            (item?.spec?.featureBlock === featureBlock && item?.spec?.recommended === true)
          )
        } else {
          return (
            item?.status?.enabled ||
            isFeatureRequired(featureName) ||
            item?.spec?.featureBlock === featureBlock
          )
        }
      } else {
        return item?.status?.enabled || item?.spec?.recommended || isFeatureRequired(featureName)
      }
    })
    const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []
    return enabledFeatureNames
  }

  function getEnabledFeaturesFromActiveFeature(allFeatureSetFeature) {
    const activeFeature = storeGet('/route/query/activeFeature') || ''

    const enabledFeatures = allFeatureSetFeature.filter((item) => {
      const featureName = item?.metadata?.name
      return (
        item?.status?.enabled ||
        isFeatureRequired(featureName) ||
        item?.spec?.recommended ||
        featureName === activeFeature
      )
    })
    const enabledFeatureNames = enabledFeatures.map((item) => item?.metadata?.name) || []

    return enabledFeatureNames
  }

  function getEnabledFeatures() {
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
      return getEnabledFeaturesFromActiveFeature(allFeatureSetFeature)
    }

    if (featureBlock) {
      //feature block level
      if (configureMode) {
        // configure btn
        return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, true)
      } else {
        // enable btn
        return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, true)
      }
    } else {
      // feature set level
      if (configureMode) {
        // configure btn
        return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, false)
      } else {
        // enable btn
        return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, false)
      }
    }
  }

  function disableFeatures() {
    // watchDependency('discriminator#/isResourceLoaded')

    const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
    if (!isResourceLoaded) return true

    const featureName = itemCtx.value
    const featureSet = getFeatureSetDetails()
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

  function generatePresetValued(featureName, featureSet) {
    const featureDetails = getFeatureDetails(featureName)
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

  function onEnabledFeaturesChange() {
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []

    const allFeatures = storeGet('/cluster/features/result') || []

    allFeatures.forEach((item) => {
      const featureName = item?.metadata?.name || ''
      const resourceValuePath = getResourceValuePathFromFeature(item)
      const featureSet = storeGet('/route/params/featureset') || ''

      if (enabledFeatures.includes(featureName)) {
        const featureDetails = getFeatureDetails(featureName)
        const isEnabled = featureDetails?.status?.enabled || false
        const isManaged = featureDetails?.status?.managed || false

        if (isEnabled && !isManaged) {
          commit('wizard/model$delete', `/resources/${resourceValuePath}`)
        } else {
          const value = generatePresetValued(featureName, featureSet)
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
    typeConvert(enabledTypes)
  }

  function returnFalse() {
    return false
  }

  async function setReleaseNameAndNamespaceAndInitializeValues() {
    const modelResources = getValue(model, '/resources')
    resources = { ...modelResources }

    const isFeatureSetInstalled = getFeatureSetPropertyValue('/status/enabled')

    if (isFeatureSetInstalled) {
      // get resources default values when featureset is installed
      const owner = storeGet('/route/params/user')
      const cluster = storeGet('/route/params/cluster')
      const clusterset = storeGet('/route/params/clusterset')
      const spoke = storeGet('/route/params/spoke')

      const {
        name: chartName,
        sourceRef,
        version: chartVersion,
      } = getFeatureSetPropertyValue('/spec/chart')
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

    await databaseLoader()
  }

  function fetchFeatureSetOptions() {
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
  function checkIsResourceLoaded() {
    // watchDependency('discriminator#/isResourceLoaded')
    const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
    if (isResourceLoaded) {
      onEnabledFeaturesChange()
    }
  }

  function isKubedbSelected() {
    // watchDependency('discriminator#/enabledFeatures')
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    const isSelected = enabledFeatures?.includes('kubedb')

    // if not selected return false and remove data
    if (!isSelected) {
      commit('wizard/model$delete', 'resources/helmToolkitFluxcdIoHelmRelease_kubedb')
      return false
    }

    const kubedbFeatur = getFeatureDetails('kubedb')
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
    'Cassandra',
    'ClickHouse',
    'Druid',
    'Elasticsearch',
    'FerretDB',
    'Hazelcast',
    'Ignite',
    'Kafka',
    'MariaDB',
    'Memcached',
    'MSSQLServer',
    'MongoDB',
    'MySQL',
    'Oracle',
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
  let enabledTypes = []

  async function databaseLoader() {
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
      typeConvert(enabledTypes)
    }
  }

  async function getDatabaseTypes() {
    return allAvailableTypes
  }

  function onTypeUpdate() {
    const enabledTypes = getValue(discriminator, '/enabledTypes') || []
    typeConvert(enabledTypes)
  }

  function typeConvert(enabledTypes) {
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

  function getEnabledTypes() {
    const enabledTypes = getValue(discriminator, '/enabledTypes') || []
    console.log(enabledTypes)

    return enabledTypes
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
    getEnabledTypes,
    databaseLoader,
  }
}
