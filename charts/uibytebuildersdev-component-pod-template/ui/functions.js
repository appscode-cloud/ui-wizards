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

function getOperatorsList() {
  return ["In", "NotIn", "Exists", "DoesNotExist", "Gt", "Lt"];
}

async function getImagePullSecrets({
  getValue,
  watchDependency,
  axios,
  storeGet,
  reusableElementCtx,
}) {
  const namespace = getValue(reusableElementCtx, "/dataContext/namespace");
  watchDependency("data#/namespace");

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group: "core",
    version: "v1",
    resource: "secrets",
  });

  resources = resources.filter((item) => {
    const validType = ["kubernetes.io/dockerconfigjson"];
    return validType.includes(item.type);
  });

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: { name: name },
    };
  });
}

async function getNamespacedResourceList(
  axios,
  storeGet,
  { namespace, group, version, resource }
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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

function showResources({ reusableElementCtx, getValue, watchDependency }) {
  watchDependency("data#/topology");
  const topology = getValue(reusableElementCtx, "/dataContext/topology");
  
  return !topology;
}

function disableSpec({ reusableElementCtx }) {
  const { functionCallbacks } = reusableElementCtx || {};
  const { isEditWizard } = functionCallbacks || {};

  return isEditWizard && !!isEditWizard();
}

return {
	fetchJsons,
	getOperatorsList,
	getImagePullSecrets,
  getNamespacedResourceList,
  showResources,
  disableSpec,
}