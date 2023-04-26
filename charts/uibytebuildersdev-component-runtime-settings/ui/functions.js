async function fetchJsons({ axios, itemCtx }) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart;
  
  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`
    );
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`
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

async function getImagePullSecrets({
  getValue,
  model,
  watchDependency,
  axios,
  storeGet,
}) {
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

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
  const cluster = storeGet("/route/params/cluster");

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

// return {
//   fetchJsons,
// };


return {
	fetchJsons,
	getImagePullSecrets,
	resourceNames,
	getNamespacedResourceList
}