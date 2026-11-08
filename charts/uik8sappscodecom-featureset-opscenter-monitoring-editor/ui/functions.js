const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/enabledFeatures', [])
  setDiscriminatorValue('/isResourceLoaded', false)

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

  function isEqualToModelPathValue(path, value) {
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
      // feature block level: configure btn or enable btn
      if (configureMode) return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, true)
      return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, true)
    }
    // feature set level: configure btn or enable btn
    if (configureMode) return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, false)
    return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, false)
  }

  function disableFeatures(value) {
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

  function onEnabledFeaturesChange() {
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []

    const allFeatures = storeGet('/cluster/features/result') || []

    allFeatures.forEach((item) => {
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
                storageNamespace: targetNamespace,
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

  function returnFalse() {
    return false
  }

  async function setReleaseNameAndNamespaceAndInitializeValues() {
    const modelResources = getValue(model, '/resources') || {}
    resources = { ...modelResources }

    const isFeatureSetInstalled = getFeatureSetPropertyValue('/status/enabled')

    if (isFeatureSetInstalled) {
      // get resources default values when featureset is installed
      const owner = storeGet('/route/params/user')
      const cluster = storeGet('/route/params/cluster')
      const spoke = storeGet('/route/params/spoke')

      const {
        name: chartName,
        sourceRef,
        version: chartVersion,
      } = getFeatureSetPropertyValue('/spec/chart')
      const packages = await akp.client('akp.editor.v2.PackageService')
      const { values: data } = await packages.getPackageValues({
        cluster: { owner, name: spoke || cluster },
        chart: {
          name: chartName,
          version: chartVersion,
          sourceApiGroup: sourceRef.apiGroup,
          sourceKind: sourceRef.kind,
          sourceNamespace: sourceRef.namespace,
          sourceName: sourceRef.name,
        },
      })
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

  // this element is used only to catch a discriminator value
  function hideThisElement() {
    return false
  }

  // watches isResourceLoaded and applies the enabled features once it is true
  function checkIsResourceLoaded() {
    const isResourceLoaded = getValue(discriminator, '/isResourceLoaded')
    if (isResourceLoaded) {
      onEnabledFeaturesChange()
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
  }
}
