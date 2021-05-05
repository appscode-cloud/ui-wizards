async function resourceNames(
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

async function getNamespacedResourceList(
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

function getValueFrom({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return "ConfigMap";
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return "Secret";
  } else {
    return "Input";
  }
}

function getRefName({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return itemCtx.valueFrom.configMapKeyRef.name;
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return itemCtx.valueFrom.secretKeyRef.name;
  } else {
    return "";
  }
}

function getKeyOrValue({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return itemCtx.valueFrom.configMapKeyRef.key;
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return itemCtx.valueFrom.secretKeyRef.key;
  } else {
    return itemCtx.value;
  }
}

function setValueFrom({ rootModel }) {
  if (isConfigMapTypeValueFrom({ rootModel })) {
    return "configMap";
  } else if (isSecretTypeValueFrom({ rootModel })) {
    return "secret";
  } else {
    return "input";
  }
}

function isEqualToValueFromType(
  { discriminator, getValue, watchDependency },
  value
) {
  watchDependency("discriminator#/valueFromType");
  const valueFrom = getValue(discriminator, "/valueFromType");
  return valueFrom === value;
}

function isConfigMapTypeValueFrom({ rootModel }) {
  const valueFrom = rootModel.valueFrom;
  return !!(valueFrom && valueFrom.configMapKeyRef);
}

function isSecretTypeValueFrom({ rootModel }) {
  const valueFrom = rootModel.valueFrom;
  return !!(valueFrom && valueFrom.secretKeyRef);
}

function isInputTypeValueFrom({ rootModel }) {
  return (
    !isConfigMapTypeValueFrom({ rootModel }) &&
    !isSecretTypeValueFrom({ rootModel })
  );
}

function onValueFromChange({
  rootModel,
  discriminator,
  getValue,
  updateModelValue,
}) {
  const valueFrom = getValue(discriminator, "/valueFromType");
  if (valueFrom === "input") {
    if (isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", true);
    if (isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", true);
  } else if (valueFrom === "secret") {
    if (!isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", false, {});
    if (isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", true);
  } else if (valueFrom === "configMap") {
    if (!isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", false, {});
    if (isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", true);
  }
}

async function getSecrets({
  storeGet,
  axios,
  getValue,
  watchDependency,
  reusableElementCtx,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(reusableElementCtx, "/dataContext/namespace");

  watchDependency("data#/namespace");

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
      {
        params: {
          filter: { items: { metadata: { name: null }, type: null } },
        },
      }
    );

    const secrets = (resp && resp.data && resp.data.items) || [];

    const filteredSecrets = secrets.filter((item) => {
      const validType = ["kubernetes.io/service-account-token", "Opaque"];
      return validType.includes(item.type);
    });

    filteredSecrets.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      item.text = name;
      item.value = name;
      return true;
    });
    return filteredSecrets;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getSecretKeys({
  storeGet,
  axios,
  getValue,
  watchDependency,
  rootModel,
  reusableElementCtx,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(reusableElementCtx, "/dataContext/namespace");
  const secretName =
    (rootModel &&
      rootModel.valueFrom &&
      rootModel.valueFrom.secretKeyRef &&
      rootModel.valueFrom.secretKeyRef.name) ||
    "";
  watchDependency("data#/namespace");
  watchDependency("rootModel#/valueFrom/secretKeyRef/name");

  if (!secretName) return [];

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`
    );

    const secret = (resp && resp.data && resp.data.data) || {};

    const secretKeys = Object.keys(secret).map((item) => ({
      text: item,
      value: item,
    }));

    return secretKeys;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getConfigMapKeys({
  storeGet,
  axios,
  getValue,
  watchDependency,
  rootModel,
  reusableElementCtx,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(reusableElementCtx, "/dataContext/namespace");
  const configMapName =
    (rootModel &&
      rootModel.valueFrom &&
      rootModel.valueFrom.configMapKeyRef &&
      rootModel.valueFrom.configMapKeyRef.name) ||
    "";
  watchDependency("data#/namespace");
  watchDependency("rootModel#/valueFrom/configMapKeyRef/name");

  if (!configMapName) return [];

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`
    );

    const configMaps = (resp && resp.data && resp.data.data) || {};

    const configMapKeys = Object.keys(configMaps).map((item) => ({
      text: item,
      value: item,
    }));

    return configMapKeys;
  } catch (e) {
    console.log(e);
    return [];
  }
}


return {
	resourceNames,
	getNamespacedResourceList,
	getValueFrom,
	getRefName,
	getKeyOrValue,
	setValueFrom,
	isEqualToValueFromType,
	isConfigMapTypeValueFrom,
	isSecretTypeValueFrom,
	isInputTypeValueFrom,
	onValueFromChange,
	getSecrets,
	getSecretKeys,
	getConfigMapKeys
}