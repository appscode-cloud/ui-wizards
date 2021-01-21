function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  value,
  modelPath
) {
  const modelPathValue = getValue(model, modelPath);
  const modelName = modelPath.split("/").pop();
  watchDependency(modelName, "model#" + modelPath);
  return modelPathValue === value;
}

function showAuthPasswordField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/authSecret/create");
  watchDependency(modelPathValue, "model#/spec/authSecret/create");
  return modelPathValue;
}

function showAuthSecretField({ model, getValue, watchDependency }) {
  return !this.showAuthPasswordField({ model, getValue, watchDependency });
}

async function getResources({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
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
}

async function getMongoDbVersions(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const queryParams = {
    filter: { items: { metadata: { name: null }, spec: { version: null } } },
  };

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    item.text = `${name} (${specVersion})`;
    item.value = name;
    return true;
  });
  return resources;
}

async function getSecrets({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(model, "/namespace");
  watchDependency("namespace", "model#/namespace");

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
}

async function hasExistingSecret({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const resp = await this.getSecrets({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
  return !!(resp && resp.length);
}

async function hasNoExistingSecret({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const resp = await this.hasExistingSecret({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
  return !resp;
}

return {
  isEqualToModelPathValue,
  showAuthPasswordField,
  showAuthSecretField,
  getResources,
  getMongoDbVersions,
  getSecrets,
  hasExistingSecret,
  hasNoExistingSecret,
};
