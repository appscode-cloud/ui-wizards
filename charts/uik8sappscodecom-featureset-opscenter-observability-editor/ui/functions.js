const { axios, store, useOperator } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enabledFeatures', [])
  setDiscriminatorValue('/isResourceLoaded', false)
  const appsCodeOtelStack = 'appscode-otel-stack'
  const thanosOperator = 'thanos-operator'
  const promLabelProxy = 'prom-label-proxy'

  const thanosOperatorResPath = 'helmToolkitFluxcdIoHelmRelease_thanos_operator'
  const promLabelProxyResPath = 'helmToolkitFluxcdIoHelmRelease_prom_label_proxy'
  let resources = {}

  // get specific feature details
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

  // get specific attribute's value of a feature
  function getFeaturePropertyValue(name, path) {
    const feature = getFeatureDetails(name)
    const value = storeGet(path, feature)

    return value
  }

  // helper function to get nested property value from feature
  function getFeatureProperty(featureName, propertyPath) {
    const feature = getFeatureDetails(featureName)
    return storeGet(propertyPath, feature)
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

  function disableFeatures(value) {
    // watchDependency('discriminator#/isResourceLoaded')

    const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
    if (!isResourceLoaded) return true

    const featureName = value
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

  function deepMergeValues(existingValues, newValues) {
    if (!newValues) return existingValues
    if (!existingValues) return newValues

    const merged = { ...existingValues }

    Object.keys(newValues).forEach((key) => {
      if (
        typeof newValues[key] === 'object' &&
        newValues[key] !== null &&
        !Array.isArray(newValues[key])
      ) {
        merged[key] = deepMergeValues(existingValues[key], newValues[key])
      } else {
        merged[key] = newValues[key]
      }
    })

    return merged
  }

  // fetch monitoring cluster configuration
  async function fetchMonitoringClusterConfig(monitoringClusterName) {
    if (!monitoringClusterName) {
      return null
    }

    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const { data } = await axios.get(`/telemetry/${owner}/${cluster}/values/appscode-otel-stack`)
    return data
  }

  async function onEnabledFeaturesChange() {
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    const monitoringClusterName = getValue(discriminator, '/monitoringClusterName')
    let monitoringClusterConfig = getValue(discriminator, '/monitoringClusterConfig')
    const objStorage = getValue(discriminator, '/objStorage')

    const allFeatures = storeGet('/cluster/features/result') || []

    for (const item of allFeatures) {
      const featureName = item?.metadata?.name || ''
      const resourceValuePath = getResourceValuePathFromFeature(item)

      if (enabledFeatures.includes(featureName)) {
        const featureSet = storeGet('/route/params/featureset') || ''
        const chart = getFeaturePropertyValue(featureName, '/spec/chart/name')

        const targetNamespace = getFeaturePropertyValue(featureName, '/spec/chart/namespace')
        const sourceRef = getFeaturePropertyValue(featureName, '/spec/chart/sourceRef')
        const version = getFeaturePropertyValue(featureName, '/spec/chart/version')

        const isEnabled = getFeaturePropertyValue(featureName, '/status/enabled')
        const isManaged = getFeaturePropertyValue(featureName, '/status/managed')

        if (isEnabled && !isManaged) {
          commit('wizard/model$delete', `/resources/${resourceValuePath}`)
        } else {
          // Merge existing values with otelStack data only for appscode-otel-stack feature
          const initialResourceValues = resources?.[resourceValuePath]?.spec?.values
          let mergedResourceValues = initialResourceValues

          let finalSourceRef = sourceRef
          if (
            featureName === appsCodeOtelStack &&
            monitoringClusterName &&
            monitoringClusterConfig
          ) {
            mergedResourceValues = deepMergeValues(initialResourceValues, monitoringClusterConfig)
            finalSourceRef = {
              ...sourceRef,
              monitoringCluster: monitoringClusterName,
            }
          }

          if (featureName === thanosOperator && objStorage) {
            const endpoint = (objStorage.endpoint || '').replace(/^https?:\/\//, '')
            mergedResourceValues = deepMergeValues(initialResourceValues, {
              objStorage: {
                provider: objStorage.provider || 's3',
                bucket: objStorage.bucket || '',
                endpoint: endpoint,
                accessKey: objStorage.accessKey || '',
                secretKey: objStorage.secretKey || '',
                region: objStorage.region || '',
              },
            })
          }

          if (featureName === promLabelProxy && objStorage) {
            const owner = storeGet('/route/params/user')
            const cluster = storeGet('/route/params/cluster')
            let telemetryHost = ''
            try {
              const { data } = await axios.get(`/telemetry/${owner}/${cluster}/stack/host`)
              telemetryHost = data || ''
            } catch (e) {
              window.console.error('Failed to fetch telemetry host', e)
            }

            mergedResourceValues = deepMergeValues(initialResourceValues, {
              clickhouse: {
                s3: {
                  provider: objStorage.provider || 's3',
                  bucket: objStorage.bucket || '',
                  endpoint: objStorage.endpoint || '',
                  accessKey: objStorage.accessKey || '',
                  secretKey: objStorage.secretKey || '',
                  region: objStorage.region || '',
                },
              },
              infra: {
                host: telemetryHost,
              },
            })
          }

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
                values: mergedResourceValues,
                chart: {
                  spec: {
                    chart,
                    sourceRef: finalSourceRef,
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
    }
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
  async function checkIsResourceLoaded() {
    // watchDependency('discriminator#/isResourceLoaded')
    const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
    if (isResourceLoaded) {
      await onEnabledFeaturesChange()
    }
  }

  //this function is used to check if AppsCode OpenTelemetry Stack is enabled
  //it is the condition to show monitoring cluster dropdown
  function checkIsOtelStackEnabled() {
    // watchDependency('discriminator#/enabledFeatures')
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    if (enabledFeatures.includes(appsCodeOtelStack)) {
      return true
    }
    return false
  }

  //this function is used to fetch monitoring cluster options from dropdown
  async function fetchMonitoringClusterOptions() {
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    if (!enabledFeatures.includes(appsCodeOtelStack)) {
      return []
    }

    const owner = storeGet('/route/params/user')
    let url = `/telemetry/${owner}/monitoring-clusters`
    const { data } = await axios.get(url)

    return data || []
  }

  async function onMonitoringClusterChange() {
    const monitoringClusterName = getValue(discriminator, '/monitoringClusterName')
    if (!monitoringClusterName) {
      return
    }

    const data = await fetchMonitoringClusterConfig(monitoringClusterName)

    setDiscriminatorValue('/monitoringClusterConfig', data)
    await onEnabledFeaturesChange()
  }

  function checkIsThanosOrPromLabelProxyEnabled() {
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    return enabledFeatures.includes(thanosOperator) || enabledFeatures.includes(promLabelProxy)
  }

  function fetchInitialObjStorageProvider() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.provider || thanosValues.provider || 's3'
  }

  function fetchInitialObjStorageBucket() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.bucket || thanosValues.bucket || ''
  }

  function fetchInitialObjStorageEndpoint() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.endpoint || thanosValues.endpoint || ''
  }

  function fetchInitialObjStorageRegion() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.region || thanosValues.region || ''
  }

  function fetchInitialObjStorageAccessKey() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.accessKey || thanosValues.accessKey || ''
  }

  function fetchInitialObjStorageSecretKey() {
    const thanosValues = resources[thanosOperatorResPath]?.spec?.values?.objStorage || {}
    const promValues = resources[promLabelProxyResPath]?.spec?.values?.clickhouse?.s3 || {}

    return promValues.secretKey || thanosValues.secretKey || ''
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
    checkIsOtelStackEnabled,
    fetchMonitoringClusterOptions,
    onMonitoringClusterChange,
    checkIsThanosOrPromLabelProxyEnabled,
    fetchInitialObjStorageProvider,
    fetchInitialObjStorageBucket,
    fetchInitialObjStorageEndpoint,
    fetchInitialObjStorageRegion,
    fetchInitialObjStorageAccessKey,
    fetchInitialObjStorageSecretKey,
  }
}
