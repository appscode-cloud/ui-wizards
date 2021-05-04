const repoBackendMap = {
  azure: { container: "", prefix: "" },
  b2: { bucket: "", prefix: "" },
  gcs: { bucket: "", prefix: "" },
  local: { hostPath: { path: "", mountPath: "", subPath: "" } },
  rest: { url: "" },
  s3: { endpoint: "", bucket: "", prefix: "", region: "" },
  swift: { container: "", prefix: "" },
};

const volumeSourceMap = {
  hostPath: { path: "", mountPath: "", subPath: "" },
  nfs: { path: "", server: "", mountPath: "", subPath: "" },
  persistentVolumeClaim: { claimName: "", mountPath: "", subPath: "" },
};

export async function resourceNames(
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

export function initBackendType({ model, getValue }) {
  const backend = getValue(model, "/");
  const selectedBackend = Object.keys(repoBackendMap).find((key) => {
    const value = backend && backend[key];

    return value ? true : false;
  });
  return selectedBackend || "gcs";
}

export function onBackendTypeChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const selectedBackendType = getValue(discriminator, "/backendType");

  // delete every other backend type from model  exect the selected one
  Object.keys(repoBackendMap).forEach((key) => {
    if (key !== selectedBackendType) {
      commit("wizard/model$delete", `/${key}`);
    }
  });

  // set the selectedBackend type object in

  if (!valueExists(model, getValue, `/${selectedBackendType}`)) {
    commit("wizard/model$update", {
      path: `/${selectedBackendType}`,
      value: repoBackendMap[selectedBackendType],
    });
  }
}

export function showBackendForm(
  { getValue, discriminator, watchDependency },
  value
) {
  const backendType = getValue(discriminator, "/backendType");
  watchDependency("discriminator#/backendType");
  return backendType === value;
}

export function showVolumeSourceForm(
  { getValue, discriminator, watchDependency },
  value
) {
  const volumeSource = getValue(discriminator, "/volumeSource");
  watchDependency("discriminator#/volumeSource");
  return volumeSource === value;
}

export function initVolumeSource({ getValue, model }) {
  const selectedVolumeSource = Object.keys(volumeSourceMap).find((key) => {
    const value = getValue(model, `/local/${key}`);

    return value ? true : false;
  });
  return selectedVolumeSource || "hostPath";
}

export function onVolumeSourceChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const selectedVolumeSource = getValue(discriminator, "/volumeSource");

  // delete every other volume source type from model except selected one
  Object.keys(volumeSourceMap).forEach((key) => {
    if (key !== selectedVolumeSource) {
      commit("wizard/model$delete", `/local/${key}`);
    }
  });

  // set the selectedVolumeSource object in model
  if (!valueExists(model, getValue, `/local/${selectedVolumeSource}`)) {
    commit("wizard/model$update", {
      path: `/local/${selectedVolumeSource}`,
      value: volumeSourceMap[selectedVolumeSource],
    });
  }
}

// return {
//   valueExists
//   initBackendType,
//   onBackendTypeChange,
//   showBackendForm,
//   showVolumeSourceForm,
//   initVolumeSource,
//   onVolumeSourceChange,
// };
