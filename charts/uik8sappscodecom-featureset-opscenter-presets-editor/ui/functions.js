// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

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
  const enabledFeatures = allFeatureSetFeature.filter((item) => {
    const featureName = item?.metadata?.name;

    if(isBlockLevel){
      return (
        item?.status?.enabled ||
        isFeatureRequired(storeGet, featureName) ||
        item?.spec?.featureBlock === featureBlock
      );
    }else{
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


let isStash= false

function onEnabledFeaturesChange({
  discriminator,
  getValue,
  commit,
  storeGet,
  model,
}) {

  const enabledFeatures = getValue(discriminator, "/enabledFeatures") || [];


  if(enabledFeatures.includes('stash-presets'))
  {
     isStash = true
  }
  else
  {
    isStash = false
  }
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
      else{
        const resourceObject = getValue(model, "/resources") || [];

        if(resourceObject.hasOwnProperty('helmToolkitFluxcdIoHelmRelease_stash_presets') && isStash)
        {
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
        else{
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
    }
    } else {
      commit("wizard/model$delete", `/resources/${resourceValuePath}`);
    }
  });

  if(enabledFeatures.includes('stash-presets')){
  commit("wizard/model$update", {	
    path: `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/retentionPolicy`,	
    value: { prune: false},	
    force: true,	
  });	
}
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

function onBackendProviderChange({ commit, getValue, model }) {	
  const selectedBackendProvider = getValue(model, "/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/provider");	

  // delete every other backend type from model  exect the selected one	
  Object.keys(backendMap).forEach((key) => {	
    if (key !== selectedBackendProvider) {	
      commit("wizard/model$delete", `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/${key}`);	
    }	
  });	

  // set the selectedBackend type object in	

  if (!valueExists(model, getValue, `/${selectedBackendProvider}`)) {	
    commit("wizard/model$update", {	
      path: `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/${selectedBackendProvider}`,	
      value: {},	
      force: true,	
    });	
  }	
}


function showBackendForm({ getValue, model, watchDependency ,commit}, value) {
  const backendProvider = getValue(model, "/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/provider");
  watchDependency("model#/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/provider");

  
  // delete every other backend type from model  exect the selected one	
  
  setTimeout(() => {
    Object.keys(backendMap).forEach((key) => {
      if (key !== backendProvider) {
        commit("wizard/model$delete", `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/${key}`);
      }
    });
  }, 1000);


  return backendProvider === value;
}

async function initExistingAuthSecrets(ctx) {
  ctx.setDiscriminatorValue("/isExistingAuthSecretsFetching", true);
  const secrets = await getResources(ctx, "core", "v1", "secrets", true);
  // set secrets;
  ctx.setDiscriminatorValue("/existingAuthSecrets", secrets);
  ctx.setDiscriminatorValue("/isExistingAuthSecretsFetching", false);

  return true;
}

function onChoiseChange({discriminator, getValue, commit}) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  // remove spec.authSecret
    commit("wizard/model$delete", "/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/authSecret");
    if (useExistingAuthSecret) {
      // remove the auth from each backend
      Object.keys(backendMap).forEach((backend) => {
        commit("wizard/model$delete", `/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/${backend}/auth`);
      });
    }
    
}


async function getExistingAuthSecrets({
  discriminator,
  getValue,
  watchDependency,
}) {
  const existingAuthSecrets = getValue(discriminator, "/existingAuthSecrets");
  watchDependency("discriminator#/existingAuthSecrets");
  return existingAuthSecrets;
}

function showExistingSecretSelection({
  discriminator,
  getValue,
  watchDependency,
}) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  const isExistingAuthSecretsFetching = getValue(
    discriminator,
    "/isExistingAuthSecretsFetching"
  );
  watchDependency("discriminator#/useExistingAuthSecret");
  watchDependency("discriminator#/isExistingAuthSecretsFetching");

  return !isExistingAuthSecretsFetching && useExistingAuthSecret;
}

function showCreateSecretForm({ discriminator, getValue, watchDependency }) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  watchDependency("discriminator#/useExistingAuthSecret");
  if(useExistingAuthSecret === undefined)
    return false
  return !useExistingAuthSecret;
}

async function getResources(
  { axios, storeGet, model, getValue, watchDependency },
  group,
  version,
  resource,
  namespaced
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  let namespace = "";
  if (namespaced) {
    namespace = getValue(model, "/metadata/release/namespace");
    watchDependency("model#/metadata/release/namespace");
  }

  if (!namespaced || namespace) {
    // call api if resource is either not namespaced
    // or namespaced and user has selected a namespace
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}${
          namespace ? "/namespaces/" + namespace : ""
        }/${resource}`,
        {
          params: { filter: { items: { metadata: { name: null } } } },
        }
      );

      const resources = (resp && resp.data && resp.data.items) || [];

      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        item.text = name;
        item.value = name;
        return true;
      });
      return resources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

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

function showSecretForm({ model, getValue, watchDependency,discriminator }, value) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  if(useExistingAuthSecret === undefined)
  return false
  const backendProvider = getValue(model, "/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/provider");
  watchDependency("model#/resources/helmToolkitFluxcdIoHelmRelease_stash_presets/spec/values/stash/backend/provider");
  watchDependency("discriminator#/useExistingAuthSecret")

  return (backendProvider === value && !useExistingAuthSecret) ;
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  if (val) return true;
  else return false;
}

function isPresetEnabled({getValue,watchDependency,model}){
  watchDependency("model#/resources");

 
  return isStash
}

function removeResource({commit}){
  if(!isStash)
  {
    setTimeout(function() {
      commit("wizard/model$delete", "/resources/helmToolkitFluxcdIoHelmRelease_stash_presets");
    }, 1000);
  }
}

return {
  hideThisElement,
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
  onBackendProviderChange,
  showBackendForm,
  initExistingAuthSecrets,
  onChoiseChange,
  getExistingAuthSecrets,
  showExistingSecretSelection,
  showCreateSecretForm,
  getResources,
  showSecretForm,
  valueExists,
  isPresetEnabled,
  removeResource,
}
