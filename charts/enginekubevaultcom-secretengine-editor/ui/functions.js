function getDbName({ storeGet }) {
  const path = storeGet("/route/fullPath");
  const splitedPath = path.split("/");
  return splitedPath[6];
}

function getDbVault({ storeGet, getValue, watchDependency, model }) {
  watchDependency("model#/spec/vaultRef/name");
  const val = getValue(model, "/spec/vaultRef/name") || "";
  const dbName = getDbName({ storeGet });
  return val.length ? `${dbName}-${val}` : dbName;
}

function getDbNamespace({ storeGet }) {
  const path = storeGet("/route/fullPath");
  const splitedPath = path.split("/");
  const segment = splitedPath[splitedPath.length - 1];
  const namespace = segment.split("=");
  return namespace[1] || "";
}

function isVaultSelected({ getValue, watchDependency, discriminator }) {
  watchDependency("discriminator#/vaultserver");
  const val = getValue(discriminator, "/vaultserver");
  if (val && val.length > 0) return true;
  else return false;
}

async function getResources({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: {
          filter: { items: { metadata: { name: null, namespace: null } } },
        },
      }
    );

    const resources = (resp && resp.data && resp.data.items) || [];

    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      const namespace = (item.metadata && item.metadata.namespace) || "";
      item.text = `${namespace}/${name}`;
      item.value = `${namespace}/${name}`;
      return true;
    });
    return resources;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function vaultRefName({ getValue, discriminator }) {
  const val = getValue(discriminator, "/vaultserver");
  let refName = "";
  if (val && val.length > 0) {
    refName = val.split("/")[1];
  }
  return refName;
}

function vaultRefNamespace({ getValue, discriminator }) {
  const val = getValue(discriminator, "/vaultserver");
  let refName = "";
  if (val && val.length > 0) {
    refName = val.split("/")[0];
  }
  return refName;
}

function getSingularResource(resource) {
  if (resource === "elasticsearches") return "elasticsearch";
  else if (resource === "mariadbs") return "mariadb";
  else if (resource === "mongodbs") return "mongodb";
  else if (resource === "mysqls") return "mysql";
  else if (resource === "postgreses") return "postgres";
  else if (resource === "redises") return "redis";
}

function getPluginName({ storeGet }) {
  const resource = storeGet("/route/params/resource") || "";
  let singularResource = getSingularResource(resource);
  if (singularResource === "postgres") singularResource = "postgresql";
  const plugin = `${singularResource}-database-plugin`;
  return plugin;
}

function getSpecRef({ model, getValue, storeGet, commit }) {
  const resource = storeGet("/route/params/resource") || "";
  const databaseRefName = getSingularResource(resource);
  const val = {
    databaseRef: {
      name: getDbName({ storeGet }),
      namespace: getDbNamespace({ storeGet }),
    },
    pluginName: getPluginName({ storeGet }),
  };
  let spec = getValue(model, "/spec") || {};
  spec[databaseRefName] = val;
  if (spec) {
    commit("wizard/model$update", {
      path: `/spec`,
      value: spec,
      force: true,
    });
  }
}

return {
  getDbName,
  getDbVault,
  getDbNamespace,
  isVaultSelected,
  getResources,
  vaultRefName,
  vaultRefNamespace,
  getSingularResource,
  getPluginName,
  getSpecRef,
};
