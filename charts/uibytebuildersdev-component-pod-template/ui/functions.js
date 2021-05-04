export async function fetchJsons({}, url) {
  let ui = {};
  let language = {};
  let functions = {};
  try {
    ui = await import("@/jsons/mongodbs/reusable-elements/" + url + "/ui.json");
    // ui = await axios.get(
    //   "/chart/packageview/files/ui/create-ui.yaml?name=kubedbcom-mongodb-editor-options&url=https://raw.githubusercontent.com/bytebuilders/ui-wizards/master/stable&version=v0.1.0&format=json"
    // );
    language = await import(
      "@/jsons/mongodbs/reusable-elements/" + url + "/language.json"
    );
    functions = await import(
      "@/jsons/mongodbs/reusable-elements/" + url + "/functions.js"
    );
  } catch (e) {
    console.log(e);
  }

  return {
    ui: ui.default || {},
    language: language.default || {},
    functions,
  };
}

export async function getImagePullSecrets({
  getValue,
  watchDependency,
  axios,
  storeGet,
  reusableElementCtx,
}) {
  const namespace = getValue(reusableElementCtx, "/data/namespace");
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

export async function getNamespacedResourceList(
  axios,
  storeGet,
  { namespace, group, version, resource }
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

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
