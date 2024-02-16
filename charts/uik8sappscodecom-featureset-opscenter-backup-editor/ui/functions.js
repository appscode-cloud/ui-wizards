// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

const backendMap = {
  azure: {
    spec: { container: "", maxConnections: 0, prefix: "" },
    auth: { AZURE_ACCOUNT_KEY: "", AZURE_ACCOUNT_NAME: "" },
  },
  b2: {
    spec: { bucket: "", prefix: "", maxConnections: 0 },
    auth: { B2_ACCOUNT_ID: "", B2_ACCOUNT_KEY: "" },
  },
  gcs: {
    spec: { bucket: "", prefix: "", maxConnections: 0 },
    auth: { GOOGLE_PROJECT_ID: "", GOOGLE_SERVICE_ACCOUNT_JSON_KEY: "" },
  },
  s3: {
    spec: { endpoint: "", bucket: "", prefix: "", region: "" },
    auth: {
      AWS_ACCESS_KEY_ID: "",
      AWS_SECRET_ACCESS_KEY: "",
      CA_CERT_DATA: "",
    },
  },
  swift: {
    spec: { container: "", prefix: "" },
    auth: {
      OS_AUTH_TOKEN: "",
      OS_AUTH_URL: "",
      OS_PASSWORD: "",
      OS_PROJECT_DOMAIN_NAME: "",
      OS_PROJECT_NAME: "",
      OS_REGION_NAME: "",
      OS_STORAGE_URL: "",
      OS_TENANT_ID: "",
      OS_TENANT_NAME: "",
      OS_USERNAME: "",
      OS_USER_DOMAIN_NAME: "",
      ST_AUTH: "",
      ST_KEY: "",
      ST_USER: "",
    },
  },
};

// get specific feature details
function getFeatureSetDetails(storeGet) {
  const featureSets = storeGet("/cluster/featureSets/result") || [];
  const featureSetName = storeGet("/route/params/featureset") || "";
  const featureSet = featureSets.find(
    (item) => item?.metadata?.name === featureSetName
  );
  return featureSet;
}

// get specific attribute's value of a feature
function getFeatureSetPropertyValue(storeGet, getValue, path) {
  const featureSet = getFeatureSetDetails(storeGet);
  const value = getValue(featureSet, path);
  return value;
}

function getFeatureSetDescription({ storeGet, getValue }) {
  const description = getFeatureSetPropertyValue(
    storeGet,
    getValue,
    "/spec/description"
  );
  return description;
}

// get specific feature details
function getFeatureDetails(storeGet, name) {
  const features = storeGet("/cluster/features/result") || [];
  const feature = features.find((item) => item?.metadata?.name === name);
  return feature;
}

// get specific attribute's value of a feature
function getFeaturePropertyValue(storeGet, name, getValue, path) {
  const feature = getFeatureDetails(storeGet, name);
  const value = getValue(feature, path);
  return value;
}

function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  path,
  value
) {
  watchDependency(`model#${path}`);

  const modelValue = getValue(model, path);
  return modelValue === value;
}

function isFeatureRequired(storeGet,featureName) {
  const featureSet = getFeatureSetDetails(storeGet);
  const requiredFeatures = featureSet?.spec?.requiredFeatures || [];
  const isRequired = requiredFeatures.includes(featureName);
  return isRequired;
}

function getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, isBlockLevel, storeGet){   
  const featureBlock = storeGet("/route/query/activeBlock") || "";
  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name;
    return (
      item?.status?.enabled ||
      isFeatureRequired(storeGet, featureName) ||
      (isBlockLevel && item?.spec?.featureBlock === featureBlock && item?.spec?.recommended)
    );
  });
  const enabledFeatureNames =
    enabledFeatures.map((item) => item?.metadata?.name) || [];
  return enabledFeatureNames;
}

function getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, isBlockLevel, storeGet){
  // filter only (enabled + required + feature block feature)
  const featureBlock = storeGet("/route/query/activeBlock") || "";
  const isRecommendedFeatureAvailable = allFeatureSetFeature.some((item)=> {
    return item?.spec?.featureBlock === featureBlock && item?.spec?.recommended
  });
  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name;

    if(isBlockLevel) {
      if(isRecommendedFeatureAvailable) {
        return (
          item?.status?.enabled ||
          isFeatureRequired(storeGet, featureName) ||
          (item?.spec?.featureBlock === featureBlock && item?.spec?.recommended === true)
        );
      } else {
          return(
            item?.status?.enabled ||
            isFeatureRequired(storeGet, featureName) ||
            (item?.spec?.featureBlock === featureBlock)
        )
      }
    }
    else {
      return (
        item?.status?.enabled ||
        item?.spec?.recommended ||
        isFeatureRequired(storeGet, featureName)
      );
    }
  });
  const enabledFeatureNames =
    enabledFeatures.map((item) => item?.metadata?.name) || [];
  return enabledFeatureNames;
}


function getEnabledFeatures({ storeGet }) {
  const allFeatures = storeGet("/cluster/features/result") || [];
  const featureSet = storeGet("/route/params/featureset") || [];
  const featureBlock = storeGet("/route/query/activeBlock") || "";
  const configureMode = storeGet("/route/query/mode") || "";

  const allFeatureSetFeature =
    allFeatures.filter((item) => {
      return item?.spec?.featureSet === featureSet;
    }) || [];

  if (featureBlock) {
    //feature block level
    if (configureMode) {
      // configure btn
      return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, true, storeGet);
    } else {
      // enable btn
      return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, true, storeGet)
    }
  } else {
    // feature set level
    if (configureMode) {
      // configure btn
      return getEnabledFeatureInConfigureBtnClick(allFeatureSetFeature, false, storeGet);
    } else {
      // enable btn
      return getEnabledFeatureInEnableBtnClick(allFeatureSetFeature, false, storeGet)
    }
  }
}

function disableFeatures({getValue, storeGet, itemCtx, discriminator,watchDependency }) {

  watchDependency("discriminator#/isResourceLoaded")

  const isResourceLoaded = getValue(discriminator, "/isResourceLoaded");
  if(!isResourceLoaded) return true; 

  const featureName = itemCtx.value;
  const featureSet = getFeatureSetDetails(storeGet);
  const requiredFeatures = featureSet?.spec?.requiredFeatures || [];

  if (requiredFeatures.includes(featureName)) return true;
  else return false;
}

function getResourceValuePathFromFeature(feature) {
  const featureName = feature?.metadata?.name || "";
  const underscoredFeatureName = featureName
    .toLowerCase()
    .replaceAll("-", "_");
  const resourceValuePath = `helmToolkitFluxcdIoHelmRelease_${underscoredFeatureName}`;
  return resourceValuePath;
}

function onEnabledFeaturesChange({
  discriminator,
  getValue,
  commit,
  storeGet,
}) {
  const enabledFeatures = getValue(discriminator, "/enabledFeatures") || [];
  const allFeatures = storeGet("/cluster/features/result") || [];

  allFeatures.forEach((item) => {
    const featureName = item?.metadata?.name || "";
    const resourceValuePath = getResourceValuePathFromFeature(item)

    if (enabledFeatures.includes(featureName)) {
      const featureSet = storeGet("/route/params/featureset") || "";
      const chart = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/name"
      );
      const targetNamespace = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/namespace"
      );
      const sourceRef = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/sourceRef"
      );
      const version = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/version"
      );

      const isEnabled = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/enabled')
      const isManaged = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/managed')


      if (isEnabled && (!isManaged)) {
        commit("wizard/model$delete", `/resources/${resourceValuePath}`);
      }
      else {
        commit("wizard/model$update", {
          path: `/resources/${resourceValuePath}`,
          value: {
            ...resources?.[resourceValuePath],
            metadata: {
              ...resources?.[resourceValuePath]?.metadata,
              labels: {
                ...resources?.[resourceValuePath]?.metadata?.labels,
                "app.kubernetes.io/component": featureName,
                "app.kubernetes.io/part-of": featureSet,
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
        });
      }

    } else {
      commit("wizard/model$delete", `/resources/${resourceValuePath}`);
    }
  });
}

let resources = {};

function returnFalse() {
  return false;
}

async function setReleaseNameAndNamespaceAndInitializeValues({
  commit,
  storeGet,
  model,
  getValue,
  axios,
  setDiscriminatorValue
}) {
  const modelResources = getValue(model, "/resources");
  resources = { ...modelResources };

  const isFeatureSetInstalled = getFeatureSetPropertyValue(
    storeGet,
    getValue,
    "/status/enabled"
  );

  if (isFeatureSetInstalled) {
    // get resources default values when featureset is installed
    const owner = storeGet("/route/params/user");
    const cluster = storeGet("/route/params/cluster");

    const {
      name: chartName,
      sourceRef,
      version: chartVersion,
    } = getFeatureSetPropertyValue(storeGet, getValue, "/spec/chart");
    const { data } = await axios.get(
      `/clusters/${owner}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${chartVersion}&format=json`
    );
    const { resources: resourcesDefaultValues } = data || {};

    Object.keys(resourcesDefaultValues || {}).forEach((key) => {
      if (!resources[key]) {
        resources[key] = resourcesDefaultValues[key];
      }
    });
  }
  const featureSet = storeGet("/route/params/featureset");
  commit("wizard/model$update", {
    path: "/metadata/release",
    value: {
      name: featureSet,
      namespace: "kubeops",
    },
    force: true,
  });

  // delete extra values from model if the feature does not exist
  const allFeatures = storeGet("/cluster/features/result") || [];
  const allFeatureResourceValuePathNames = allFeatures.map((feature) =>
    getResourceValuePathFromFeature(feature)
  );
  Object.keys(modelResources).forEach((modelResourcePath) => {
    if (!allFeatureResourceValuePathNames.includes(modelResourcePath)) {
      // model path does not exist in feature values
      // remove the model path
      commit("wizard/model$delete", `/resources/${modelResourcePath}`);
    }
  });

  setDiscriminatorValue("/isResourceLoaded", true);
}

function fetchFeatureSetOptions({ storeGet }) {
  const features = storeGet('/cluster/features/result') || []
  const featureSetName = storeGet('/route/params/featureset')
  const filteredFeatures = features.filter(item => item?.spec?.featureSet === featureSetName)
  const options = filteredFeatures.map(item => {
    const { spec, metadata } = item || {}
    const { title, description, required } = spec || {}
    const { name } = metadata || {}
    return {
      text: title,
      value: name,
      description: description,
      statusTag: {
        text: required ? 'Required' : ''
      }
    }
  })

  return options || []
}

// this element is is used only to catch discriminator value
// It is not used in create-ui to get or store value
function hideThisElement () {
  return false
}

// this computed's main purpose is to watch isResourceLoaded flag
// and fire the onEnabledFeatureChange function when it's true
function checkIsResourceLoaded ({commit, storeGet,watchDependency,getValue,discriminator }) {
  watchDependency("discriminator#/isResourceLoaded")
  const isResourceLoaded = getValue(discriminator, "/isResourceLoaded");
  if(isResourceLoaded){
    onEnabledFeaturesChange({discriminator,getValue, commit, storeGet})
  }
}


function showBackendForm({ getValue, model, watchDependency, commit }, value, presetType) {

  const backendProvider = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/provider`
  );
  watchDependency(
    `model#/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/provider`
  );

  // delete every other backend type from model  exect the selected one

  setTimeout(() => {
    Object.keys(backendMap).forEach((key) => {
      if (key !== backendProvider) {
        commit(
          "wizard/model$delete",
          `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/${key}`
        );
      }
    });
  }, 1000);

  return backendProvider === value;
}

function checkPresetType({ getValue, model, watchDependency, commit , discriminator}, value) {
  watchDependency("discriminator#/backupPresetType")
  const backupType = getValue(discriminator, "/backupPresetType");
  if(backupType === value)
  {
    return true
  }
  return false
}


function initStorageSecret({commit})
{
  commit("wizard/model$update", {
    path: "schema#/resources/helmToolkitFluxcdIoHelmRelease_kubestash/spec/values/kubestash/storageSecret/create",
    value: true,
    force: true,
  });
  return true
}

function initRetentionPolicyPrune({commit})
{
  commit("wizard/model$update", {
    path: "schema#/resources/helmToolkitFluxcdIoHelmRelease_stash/spec/values/stash/retentionPolicy/prune",
    value: true,
    force: true,
  });
  return true
}
function isStorageSectionOn({getValue,model,watchDependency }, provider, presetType)
{
  const backendProvider = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/provider`
  );
  watchDependency(`model#/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/storageSecret/create`)
  watchDependency(`model#/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/provider`)
  const secretStorage = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_kubestash/spec/values/kubestash/storageSecret/create`
  )
  if(backendProvider === undefined)
  {
    return false
  }
    return ( backendProvider=== provider && secretStorage)
}
function initTLS({commit}, presetType)
{
  commit("wizard/model$update", {
    path: `schema#/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/s3/spec/insecureTLS`,
    value: false,
    force: true,
  });
  return false
}

function getPresetList({getValue,discriminator, watchDependency, commit, model})
{
  const allPreset = getValue(discriminator, "/isPresetEnabled") || [];
  const enabledPreset = getValue(discriminator, "/enabledFeatures");

  if(!enabledPreset?.includes('stash-presets'))
  {
    // this case if for if stash-presets is not enabled
    if(enabledPreset!==undefined)
    {
        commit(
          "wizard/model$delete",
          `/resources/helmToolkitFluxcdIoHelmRelease_stash/spec/values/stash/`
        );

        commit(
          "wizard/model$delete",
          `/resources/helmToolkitFluxcdIoHelmRelease_kubestash/spec/values/kubestash/`
        );
      return []
    }
  }
  if(!enabledPreset?.includes('stash'))
  {
    if(enabledPreset!==undefined)
    {
      delete resources.helmToolkitFluxcdIoHelmRelease_stash?.spec?.values?.stash;
      
    }
  }
  if(!enabledPreset?.includes('kubestash'))
  {
    if(enabledPreset!==undefined)
    {
      delete resources.helmToolkitFluxcdIoHelmRelease_kubestash?.spec?.values?.kubestash;
    }
  }
  watchDependency('discriminator#/enabledFeatures')
  watchDependency('discriminator#/presetType')
  for (let i = allPreset.length - 1; i >= 0; i--) {
    const preset = allPreset[i];
    if (!enabledPreset?.includes(preset)) {
      allPreset.splice(i, 1);
    }
  }
    return allPreset
}

function onPresetTypeChange({getValue,commit, discriminator}){

  const backupType = getValue(discriminator, "/backupPresetType");
  const compliment = backupType === 'stash' ? 'kubestash' : 'stash'
    commit(
      "wizard/model$delete",
      `/resources/helmToolkitFluxcdIoHelmRelease_${compliment}/spec/values/${compliment}/`
    );


}
function onBackendProviderChange({ commit, getValue, model }, presetType) {
  const selectedBackendProvider = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/provider`
  );

  Object.keys(backendMap).forEach((key) => {
    if (key !== selectedBackendProvider) {
      commit(
        "wizard/model$delete",
        `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/${key}`
      );
    }
  });
}

function storageSecretChange({getValue,model, commit}, presetType)
{
  const storageSecret = getValue(
    model,
    `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/storageSecret/create`
  );
  if(!storageSecret)
  {
    Object.keys(backendMap).forEach((key) => {
        commit(
          "wizard/model$delete",
          `/resources/helmToolkitFluxcdIoHelmRelease_${presetType}/spec/values/${presetType}/backend/${key}/auth`
        );
    });
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
  checkPresetType,
  onBackendProviderChange,
  showBackendForm,
  initStorageSecret,
  isStorageSectionOn,
  initRetentionPolicyPrune,
  initTLS,
  getPresetList,
  onPresetTypeChange,
  storageSecretChange,
};
