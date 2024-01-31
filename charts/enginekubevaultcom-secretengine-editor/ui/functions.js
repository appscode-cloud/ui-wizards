function isConsole({ storeGet }) {
  const owner = storeGet("/route/params/user");
  const path = storeGet("/route/path");
  const prefix = `/${owner}/kubernetes`;
  if(path.startsWith(prefix)) return true;
  return false;
}

async function getDatabases({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: {
          convertToTable: true,
          labelSelector: 'k8s.io/group=kubedb.com'
        },
      }
    );

    const resources = (resp && resp.data && resp.data.rows) || [];

    resources.map((item) => {
      const name = (item.cells && item.cells[0].data) || "";
      const namespace = (item.cells?.length > 0 && item.cells[1].data) || "";
      const resource = (item.cells?.length > 1 && item.cells[2].data) || "";
      item.text = name;
      item.value = {
        name: name,
        namespace: namespace,
        resource: resource
      };
      return true;
    });
    return resources;
  } catch (e) {
    console.log(e);
    return [];
  }
}


function getDbName({ getValue, storeGet, discriminator, watchDependency }) {
  watchDependency("discriminator#/database");
  const val = getValue(discriminator, "/database") || {};
  const name = storeGet("/route/params/name") || "";
  return val && val.name ? val.name : name;
}

function getEngineName({ storeGet, getValue, watchDependency, model, discriminator }) {
  watchDependency("model#/spec/vaultRef/name");
  const val = getValue(model, "/spec/vaultRef/name") || "";
  const dbName = getDbName({ getValue, storeGet, discriminator, watchDependency });
  return val && dbName ? `${dbName}-${val}` : dbName;
}

function getDbNamespace({ getValue, storeGet, discriminator, watchDependency  }) {
  watchDependency("discriminator#/database");
  const data = getValue(discriminator, "/database") || {};
  const namespace = storeGet("/route/query/namespace") || "";
  return data && data.namespace ? data.namespace : namespace;
}

function isVaultSelected({ getValue, watchDependency, discriminator }) {
  watchDependency("discriminator#/vaultserver");
  const vault = getValue(discriminator, "/vaultserver") || {};
  return vault && vault.name ? true : false;
}

async function getVaultservers({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
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
      item.value = {
        name: name,
        namespace: namespace
      };
      return true;
    });
    return resources;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function vaultRefName({ getValue, discriminator }) {
  const vault = getValue(discriminator, "/vaultserver") || {};
  let refName = "";
  if (vault && vault.name) {
    refName = vault.name;
  }
  return refName;
}

function vaultRefNamespace({ getValue, discriminator }) {
  const vault = getValue(discriminator, "/vaultserver") || {};
  let refNamespace = "";
  if (vault && vault.namespace) {
    refNamespace = vault.namespace;
  }
  return refNamespace;
}

function getSingularResource(resource) {
  if (resource === "elasticsearches") return "elasticsearch";
  else if (resource === "mariadbs") return "mariadb";
  else if (resource === "mongodbs") return "mongodb";
  else if (resource === "mysqls") return "mysql";
  else if (resource === "postgreses") return "postgres";
  else if (resource === "redises") return "redis";
}

function getPluginName({ storeGet, getValue, watchDependency, discriminator }) {
  watchDependency("discriminator#/database");
  const database = getValue(discriminator, "/database") || {};
  const resource = storeGet("/route/params/resource") || "";
  let singularResource = getSingularResource(resource) || "";
  if (singularResource === "postgres") singularResource = "postgresql";
  if(database && database.resource) {
    const databaseResource = database.resource;
    singularResource = databaseResource.toLowerCase();
  }
  let plugin = "";
  if (singularResource) plugin = `${singularResource}-database-plugin`;
  return plugin;
}

function getSpecRef({ model, getValue, storeGet, commit, watchDependency, discriminator }) {
  watchDependency("discriminator#/database");
  const database = getValue(discriminator, "/database") || {};
  const paramResource = storeGet("/route/params/resource") || "";
  let databaseRefName = getSingularResource(paramResource) || "";
  if(database && database.resource) databaseRefName = database.resource.toLowerCase()
  const val = {
    databaseRef: {
      name: getDbName({ getValue, storeGet, discriminator, watchDependency }),
      namespace: getDbNamespace({ getValue, storeGet, discriminator, watchDependency }),
    },
    pluginName: getPluginName({ storeGet, getValue, watchDependency, discriminator }),
  };

  let spec = getValue(model, "/spec") || {};

  const temp = Object.keys(spec).filter(key => key === 'vaultRef');
  const tempSpec = {};
  temp.forEach(key => {
    tempSpec[key] = spec[key];
  })
  spec = tempSpec;

  spec[databaseRefName] = val;
  if (spec && databaseRefName) {
    commit("wizard/model$update", {
      path: `/spec`,
      value: spec,
      force: true,
    });
  }
}

return {
  isConsole,
  getDatabases,
  getDbName,
  getEngineName,
  getDbNamespace,
  isVaultSelected,
  getVaultservers,
  vaultRefName,
  vaultRefNamespace,
  getSingularResource,
  getPluginName,
  getSpecRef,
};
