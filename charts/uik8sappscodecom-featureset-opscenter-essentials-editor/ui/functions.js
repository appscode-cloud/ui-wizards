// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

//******************************** Common function ******************************/
async function getResourceList(
  axios,
  storeGet,
  { group, version, resource }
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`;

  let ans = [];
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    ans = items;
  } catch (e) {
    console.log(e);
  }

  return ans;
}

async function getImagePullSecrets({ axios, storeGet }) {
  let resources = await getResourceList(axios, storeGet, {
    group: "core",
    version: "v1",
    resource: "secrets",
  });

  resources = resources.filter((item) => {
    const validType = ["kubernetes.io/dockerconfigjson"];
    return validType.includes(item.type);
  });

  return resources.map((resource) => {
    const name = resource?.metadata?.name || "";
    return {
      text: name,
      value: name,
    };
  });
}

// get specific feature details
function getFeatureDetails(storeGet, name) {
  const features = storeGet('/cluster/features/result') || []
  const feature = features.find(item => item?.metadata?.name === name)
  return feature
}

// get specific attribute's value of a feature
function getFeaturePropertyValue(storeGet, name, getValue, path) {
  const feature = getFeatureDetails(storeGet, name);
  const value = getValue(feature, path)
  return value
}

function getFeatureTitle({ storeGet, getValue }, name) {
  const title = getFeaturePropertyValue(storeGet, name, getValue, '/spec/title');
  return title
}

function isFeatureDisabled({ storeGet, getValue }, name) {
  const isEnabled = isFeatureEnabled({ storeGet, getValue }, name)
  const isManaged = isFeatureManaged({ storeGet, getValue }, name)

  return (isEnabled && !isManaged)
}

function isFeatureManaged({ storeGet, getValue }, name) {
  const isManaged = getFeaturePropertyValue(storeGet, name, getValue, '/status/managed');
  return !!isManaged
}

function getFeatureDescription({ storeGet, getValue }, name) {
  const description = getFeaturePropertyValue(storeGet, name, getValue, '/spec/description');
  return description
}

function getFeatureNote({ storeGet, getValue }, name) {
  const note = getFeaturePropertyValue(storeGet, name, getValue, '/status/note');
  return note
}

function isFeatureRequired({ storeGet, getValue }, name) {
  const isRequired = getFeaturePropertyValue(storeGet, name, getValue, '/spec/required');
  return isRequired
}

function isFeatureEnabled({ storeGet, getValue }, name) {
  const enabled = getFeaturePropertyValue(storeGet, name, getValue, '/status/enabled');
  return enabled
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, path, value) {
  watchDependency(`model#${path}`)

  const modelValue = getValue(model, path)
  return modelValue === value
}

function onAgentChange({ model, getValue, commit }, feature) {
  const agent = getValue(model, `/resources/${feature}/spec/values/monitoring/agent`)

  if(agent !== 'prometheus.io/operator') {
    commit("wizard/model$delete", `/resources/${feature}/spec/values/monitoring/serviceMonitor`)
  }
}

function onServiceAccountNameChange({model, getValue, commit}, feature) {
  const serviceAccountName = getValue(model, `/resources/${feature}/spec/values/serviceAccount/name`)

  // set create value to true if name field is empty otherwise set to false
  commit('wizard/model$update', {
    path: `/resources/${feature}/spec/values/serviceAccount/create`,
    value: !serviceAccountName,
    force: true
  })
}

function isDiscriminatorValueTrue({ discriminator, watchDependency, getValue }, path) {
  watchDependency(`discriminator#${path}`)
  const value = getValue(discriminator, path)
  return !!value
}

function onFeatureStatusChange({ discriminator, getValue, commit, storeGet }, feature, discriminatorPath, featureName) {
  const switchStatus = getValue(discriminator, discriminatorPath)
  if(!switchStatus) {
    commit('wizard/model$delete', `/resources/${feature}`)
  } else {
    const featureSet = storeGet('/route/params/featureset') || ''
    const chart = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/name');
    const targetNamespace = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/namespace');
    const sourceRef = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/sourceRef');
    const version = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/version');

    commit('wizard/model$update', {
      path: `/resources/${feature}`,
      value: {
        ...resources?.[feature],
        metadata: {
          ...resources?.[feature]?.metadata,
          labels: {
            ...resources?.[feature]?.metadata?.labels,
            'app.kubernetes.io/component': featureName,
            'app.kubernetes.io/part-of': featureSet,
          },
        },
        spec: {
          ...resources?.[feature]?.spec,
          chart: {
            spec: {
              chart,
              sourceRef,
              version,
            }
          },
          targetNamespace
        }
      },
      force: true
    })
  }
}

let resources = {}

function returnFalse() {
  return false;
}

function setReleaseNameAndNamespace({ commit, storeGet, model, getValue }) {
  resources = getValue(model, '/resources')
  const featureSet = storeGet('/route/params/featureset')
  commit('wizard/model$update', {
    path: '/metadata/release',
    value: {
      name: featureSet,
      namespace: 'kubeops'
    },
    force: true
  })
}

return {
  getFeatureTitle,
  getFeatureNote,
  isFeatureManaged,
  getFeatureDescription,
  isFeatureDisabled,
  isFeatureEnabled,
  getImagePullSecrets,
  isEqualToModelPathValue,
  onAgentChange,
  onServiceAccountNameChange,
  isDiscriminatorValueTrue,
  onFeatureStatusChange,
  setReleaseNameAndNamespace,
  returnFalse
};
