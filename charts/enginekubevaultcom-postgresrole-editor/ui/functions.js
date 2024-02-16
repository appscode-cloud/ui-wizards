function isConsole({ storeGet }) {
  const owner = storeGet("/route/params/user");
  const path = storeGet("/route/path");
  const prefix = `/${owner}/kubernetes`;
  if (path.startsWith(prefix)) return true;
  return false;
}

async function getDatabases({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  if (isConsole({ storeGet })) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
        {
          params: {
            convertToTable: true,
            labelSelector: "k8s.io/group=kubedb.com",
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
          resource: resource,
        };
        return true;
      });
      const filteredResources = resources.filter(
        (item) => item.value.resource.toLowerCase() === "postgres"
      );
      return filteredResources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

function isDbSelected({ getValue, storeGet, discriminator, watchDependency }) {
  if (!isConsole({ storeGet })) return true;
  watchDependency("discriminator#/database");
  const val = getValue(discriminator, "/database") || {};
  return val && val.name ? true : false;
}

function getDbName({ getValue, storeGet, discriminator, watchDependency }) {
  if (isConsole({ storeGet })) {
    watchDependency("discriminator#/database");
    const data = getValue(discriminator, "/database") || {};
    return data && data.name || "";
  }
  else {
    const name = storeGet("/route/params/name") || "";
    return name;
  }
}

function getDbNamespace({
  getValue,
  storeGet,
  discriminator,
  watchDependency,
}) {
  if (isConsole({ storeGet })) {
    watchDependency("discriminator#/database");
    const data = getValue(discriminator, "/database") || {};
    return data && data.namespace || "";
  }
  else {
    const namespace = storeGet("/route/query/namespace") || "";
    return namespace;
  }
}

async function getEngines(
  { axios, storeGet, getValue, discriminator },
  group,
  version,
  resource
) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  const dbValue = getValue(discriminator, "/database") || {};
  const dbName = storeGet("/route/params/name") || dbValue.name || "";
  const dbNamespace = storeGet("/route/query/namespace") || dbValue.namespace || "";
  if (dbName) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`
      );

      const resources = (resp && resp.data && resp.data.items) || [];
      const filteredResources = resources.filter(
        (item) =>
          item.spec?.postgres?.databaseRef?.name === dbName &&
          item.spec?.postgres?.databaseRef?.namespace === dbNamespace
      );
      filteredResources.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        item.text = name;
        item.value = name;
        return true;
      });
      return filteredResources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

return {
  isConsole,
  getDatabases,
  isDbSelected,
  getDbName,
  getDbNamespace,
  getEngines,
};
