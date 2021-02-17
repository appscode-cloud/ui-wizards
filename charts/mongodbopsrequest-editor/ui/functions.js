async function getNamespaces({ axios, storeGet }) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function getMongoDbs({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mongodbs`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function getMongoDbVersions({ axios, storeGet }) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  };

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/mongodbversions`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  // keep only non deprecated versions
  const filteredMongoDbVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  return filteredMongoDbVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    return {
      text: `${name} (${specVersion})`,
      value: name,
    };
  });
}

function ifRequestTypeEqualsTo({ model, getValue, watchDependency }, type) {
  const selectedType = getValue(model, "/spec/type");
  watchDependency("model#/spec/type");

  return selectedType === type;
}

function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace;
}

function initDatabaseRef({ route }) {
  const { name } = route.query || {};
  return name;
}

return {
  getNamespaces,
  getMongoDbs,
  getMongoDbVersions,
  ifRequestTypeEqualsTo,
  initNamespace,
  initDatabaseRef,
};
