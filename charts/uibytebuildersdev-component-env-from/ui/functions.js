export async function resourceNames(
  { axios, getValue, watchDependency, storeGet, reusableElementCtx },
  group,
  version,
  resource
) {
  const namespace = getValue(reusableElementCtx, "/dataContext/namespace");
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

export function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  if (val) return true;
  else return false;
}

export function showRefType({ itemCtx }) {
  if (itemCtx.configMapRef) return "ConfigMap";
  else if (itemCtx.secretRef) return "Secret";
  else return "-";
}

export function showRefName({ itemCtx }) {
  if (itemCtx.configMapRef) {
    return itemCtx.configMapRef.name;
  } else if (itemCtx.secretRef) {
    return itemCtx.secretRef.name;
  } else {
    return "";
  }
}

export function initializeRefType({ rootModel }) {
  if (rootModel.configMapRef) return "configMap";
  else return "secret";
}

export function onRefTypeChange({
  rootModel,
  getValue,
  discriminator,
  updateModelValue,
}) {
  const refType = getValue(discriminator, "/refType");
  if (refType === "configMap") {
    // delete secretRef
    if (valueExists(rootModel, getValue, "/secretRef"))
      updateModelValue("secretRef", true);
    // add configMapRef
    if (!valueExists(rootModel, getValue, "/configMapRef"))
      updateModelValue("configMapRef", false, { name: "" });
  } else {
    // delete configMapRef
    if (valueExists(rootModel, getValue, "/configMapRef"))
      updateModelValue("configMapRef", true);
    // add secretRef
    if (!valueExists(rootModel, getValue, "/secretRef"))
      updateModelValue("secretRef", false, { name: "" });
  }
}

export function showRefSelect(
  { discriminator, getValue, watchDependency },
  value
) {
  const refType = getValue(discriminator, "/refType");
  watchDependency("discriminator#/refType");
  return refType === value;
}

// return {
//   resourceNames,
//   getNamespacedResourceList,
//   showRefType,
//   showRefName,
//   initializeRefType,
//   onRefTypeChange,
//   showRefSelect,
// };
