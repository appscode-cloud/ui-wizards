async function fetchJsons({ axios, itemCtx }) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, url, version, packageviewUrlPrefix } = itemCtx.chart;

  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&url=${url}&version=${version}`
    );
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || "");
    functions = evalFunc();
  } catch (e) {
    console.log(e);
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  };
}

async function resourceNames(
  { axios, watchDependency, storeGet, reusableElementCtx },
  group,
  version,
  resource
) {
  const { dataContext } = reusableElementCtx;
  const { namespace } = dataContext;
  watchDependency("data#/namespace");

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group,
    version,
    resource,
  });

  if (resource === "secrets") {
    resources = resources.filter((item) => {
      const validType = ["kubernetes.io/service-account-token", "Opaque"];
      return validType.includes(item.type);
    });
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function getNamespacedResourceList(
  axios,
  storeGet,
  { namespace, group, version, resource }
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`;

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

function showAdditionalPodRuntimeSettingsForm({
  discriminator,
  getValue,
  watchDependency,
}) {
  const customizeAdditionalPodRuntimeSettings = getValue(
    discriminator,
    "/customizeAdditionalPodRuntimeSettings"
  );
  watchDependency("discriminator#/customizeAdditionalPodRuntimeSettings");

  return !!customizeAdditionalPodRuntimeSettings;
}

function onAdditionalPodRuntimeSettingsSwitchChange({
  discriminator,
  getValue,
  commit,
}) {
  const customizeAdditionalPodRuntimeSettings = getValue(
    discriminator,
    "/customizeAdditionalPodRuntimeSettings"
  );

  if (customizeAdditionalPodRuntimeSettings === false) {
    // remove additional runtime settings properties
    commit("wizard/model$delete", "/pod/nodeName");
    commit("wizard/model$delete", "/pod/podAnnotations");
    commit("wizard/model$delete", "/pod/nodeSelector");
    commit("wizard/model$delete", "/pod/affinity");
    commit("wizard/model$delete", "/pod/tolerations");
  }
}

function setAdditionalPodRuntimeSettingsSwitch({model, getValue}) {
  const pod = getValue(model, '/pod')

  const { nodeName, podAnnotations, nodeSelector, affinity, tolerations } = pod || {};

  return !!(nodeName || podAnnotations || nodeSelector || affinity || tolerations);
}

async function getNodes({ axios, storeGet }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/core/v1/nodes`;

  let ans = [];
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null } } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    ans = items;
  } catch (e) {
    console.log(e);
  }

  return ans.map((nd) => nd.metadata.name);
}

function getOperatorsList() {
  return ["In", "NotIn", "Exists", "DoesNotExist", "Gt", "Lt"];
}

return {
  fetchJsons,
  resourceNames,
  getNamespacedResourceList,
  showAdditionalPodRuntimeSettingsForm,
  getNodes,
  getOperatorsList,
  setAdditionalPodRuntimeSettingsSwitch,
  onAdditionalPodRuntimeSettingsSwitchChange
};
