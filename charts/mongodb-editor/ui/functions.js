function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  value,
  modelPath
) {
  const modelPathValue = getValue(model, modelPath);
  watchDependency("model#" + modelPath);
  return modelPathValue === value;
}

// function showAuthPasswordField({ model, getValue, watchDependency }) {
//   const modelPathValue = getValue(model, "/spec/authSecret/create");
//   watchDependency(modelPathValue, "model#/spec/authSecret/create");
//   return modelPathValue;
// }
//
// function showAuthSecretField({ model, getValue, watchDependency }) {
//   return !this.showAuthPasswordField({ model, getValue, watchDependency });
// }
//

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
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  };

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  // keep only non deprecated versions
  const filteredMongoDbVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  filteredMongoDbVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    item.text = `${name} (${specVersion})`;
    item.value = name;
    return true;
  });
  return filteredMongoDbVersions;
}

function setDatabaseMode({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/resources/kubedbComMongoDB/spec");
  watchDependency("model#/resources/kubedbComMongoDB/spec");
  if (modelPathValue.shardTopology) return "Sharded";
  else if (modelPathValue.replicaSet) return "Replicaset";
  else return "Standalone";
}

function deleteDatabaseModePath({ discriminator, getValue, commit }) {
  const mode = getValue(discriminator, "/activeDatabaseMode");
  if (mode === "Sharded") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComMongoDB/spec/replicaSet"
    );
    commit("wizard/model$delete", "/resources/kubedbComMongoDB/spec/replicas");

    commit("wizard/model$update", {
      path: "/resources/kubedbComMongoDB/spec/shardTopology",
      value: {},
      force: true,
    });
  } else if (mode === "Replicaset") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComMongoDB/spec/shardTopology"
    );

    commit("wizard/model$update", {
      path: "/resources/kubedbComMongoDB/spec/replicaSet",
      value: {},
      force: true,
    });
    commit("wizard/model$update", {
      path: "/resources/kubedbComMongoDB/spec/replicas",
      value: 3,
      force: true,
    });
  } else if (mode === "Standalone") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComMongoDB/spec/shardTopology"
    );

    commit(
      "wizard/model$delete",
      "/resources/kubedbComMongoDB/spec/replicaSet"
    );
    commit("wizard/model$delete", "/resources/kubedbComMongoDB/spec/replicas");
  }
}

function showTlsConfigureSection({ watchDependency, discriminator, getValue }) {
  watchDependency("discriminator#/configureTLS");
  const configureStatus = getValue(discriminator, "/configureTLS");
  return configureStatus;
}

function onTlsConfigureChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/configureTLS");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComMongoDB/spec/tls",
      value: {},
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubedbComMongoDB/spec/tls");
  }
}

function isEqualToDatabaseMode(
  { getValue, watchDependency, discriminator },
  value
) {
  watchDependency("discriminator#/activeDatabaseMode");
  const mode = getValue(discriminator, "/activeDatabaseMode");
  return mode === value;
}

//
// async function getSecrets({
//   storeGet,
//   axios,
//   model,
//   getValue,
//   watchDependency,
// }) {
//   const owner = storeGet("/user/username");
//   const cluster = storeGet("/clusterInfo/name");
//   const namespace = getValue(model, "/namespace");
//   watchDependency("namespace", "model#/namespace");
//
//   const resp = await axios.get(
//     `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
//     {
//       params: {
//         filter: { items: { metadata: { name: null }, type: null } },
//       },
//     }
//   );
//
//   const secrets = (resp && resp.data && resp.data.items) || [];
//
//   const filteredSecrets = secrets.filter((item) => {
//     const validType = ["kubernetes.io/service-account-token", "Opaque"];
//     return validType.includes(item.type);
//   });
//
//   filteredSecrets.map((item) => {
//     const name = (item.metadata && item.metadata.name) || "";
//     item.text = name;
//     item.value = name;
//     return true;
//   });
//   return filteredSecrets;
// }
//
// async function hasExistingSecret({
//   storeGet,
//   axios,
//   model,
//   getValue,
//   watchDependency,
// }) {
//   const resp = await this.getSecrets({
//     storeGet,
//     axios,
//     model,
//     getValue,
//     watchDependency,
//   });
//   return !!(resp && resp.length);
// }
//
// async function hasNoExistingSecret({
//   storeGet,
//   axios,
//   model,
//   getValue,
//   watchDependency,
// }) {
//   const resp = await this.hasExistingSecret({
//     storeGet,
//     axios,
//     model,
//     getValue,
//     watchDependency,
//   });
//   return !resp;
// }

return {
  isEqualToModelPathValue,
  getResources,
  getMongoDbVersions,
  setDatabaseMode,
  deleteDatabaseModePath,
  showTlsConfigureSection,
  onTlsConfigureChange,
  isEqualToDatabaseMode,
};
