let secretEngineList = [];
let filteredEngineList = [];

function isConsole({ storeGet }) {
  const owner = storeGet("/route/params/user");
  const path = storeGet("/route/path");
  const prefix = `/${owner}/kubernetes`;
  if (path.startsWith(prefix)) return true;
  return false;
}

async function getEngines({ axios, storeGet }) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  try {
    const group = "engine.kubevault.com";
    const version = "v1alpha1";
    const resource = "secretengines";
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`
    );

    const resources = (resp && resp.data && resp.data.items) || [];
    const engines = resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      const spec = item.spec || {};
      return {
        text: name,
        value: {
          name: name,
          spec: spec,
        },
      };
    });
    secretEngineList = engines;
    return resources;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function getSingularResource(resource) {
  if (resource === "elasticsearches") return "elasticsearch";
  else if (resource === "mariadbs") return "mariadb";
  else if (resource === "mongodbs") return "mongodb";
  else if (resource === "mysqls") return "mysql";
  else if (resource === "postgreses") return "postgres";
  else if (resource === "redises") return "redis";
  else return "";
}

function filterSecretEngineList({ getValue, storeGet, discriminator }) {
  const dbValue = getValue(discriminator, "/database") || {};
  const dbName = dbValue?.name
    ? dbValue.name
    : storeGet("/route/params/name") || "";
  const dbNamespace = dbValue?.namespace
    ? dbValue.namespace
    : storeGet("route/query/namespace") || "";
  let resource = isConsole({ storeGet })
    ? dbValue?.resource || ""
    : getSingularResource(storeGet("/route/params/resource") || "");
  resource = resource.toLowerCase();

  const filteredList = secretEngineList.filter((engine) => {
    return (
      engine.value.spec &&
      engine.value.spec[resource] &&
      engine.value.spec[resource].databaseRef &&
      engine.value.spec[resource].databaseRef.name === dbName &&
      engine.value.spec[resource].databaseRef.namespace === dbNamespace
    );
  });
  const result = filteredList.map((engine) => engine.value?.name);
  filteredEngineList = result;
}

async function getDatabases(
  { axios, storeGet, getValue, discriminator },
  group,
  version,
  resource
) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  if (isConsole({ storeGet })) {
    await getEngines({ axios, storeGet, getValue, discriminator });
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

      const databases = resources.map((item) => {
        const name = (item.cells && item.cells[0].data) || "";
        const namespace = (item.cells?.length > 0 && item.cells[1].data) || "";
        const resource = (item.cells?.length > 1 && item.cells[2].data) || "";
        return {
          text: name,
          value: {
            name: name,
            namespace: namespace,
            resource: resource,
          },
        };
      });
      return databases;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

function isDbSelected({ getValue, storeGet, discriminator, watchDependency }) {
  if (!isConsole({ storeGet })) return true;
  watchDependency("discriminator#/database");
  const val = getValue(discriminator, "/database") || {};
  return val && val.name ? true : false;
}

function setRequestName({ watchDependency, getValue, model }) {
  watchDependency("model#/spec/roleRef/name");
  const roleName = getValue(model, "/spec/roleRef/name") || "";
  
  let refinedRoleName = roleName;
  const lastDash = roleName.lastIndexOf('-');
  if(lastDash !== -1 && !isNaN((roleName).slice(lastDash + 1))) 
    refinedRoleName = roleName.slice(0, lastDash);
  
  const timestamp = `${Math.floor(Date.now() / 1000)}`;
  return refinedRoleName ? `${refinedRoleName}-request-${timestamp}` : refinedRoleName;
}

function getDbNamespace({ getValue, storeGet, discriminator, watchDependency }) {
  if (isConsole({ storeGet })) {
    watchDependency("discriminator#/database");
    const data = getValue(discriminator, "/database") || {};
    return (data && data.namespace) || "";
  } else {
    const namespace = storeGet("/route/query/namespace") || "";
    return namespace;
  }
}

async function getNamespaces({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";

  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: { filter: { items: { metadata: { name: null } } } },
      }
    );
    const resources = (resp && resp.data && resp.data.items) || [];

    const namespaces = resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      return { text: name, value: name };
    });
    return namespaces;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function getResourceRoleNameForConsole(resource) {
  return `${resource.toLowerCase()}roles`;
}

function getResourceRoleName(resource) {
  if (resource === "elasticsearches") return "elasticsearchroles";
  else if (resource === "mariadbs") return "mariadbroles";
  else if (resource === "mongodbs") return "mongodbroles";
  else if (resource === "mysqls") return "mysqlroles";
  else if (resource === "postgreses") return "postgresroles";
  else if (resource === "redises") return "redisroles";
  else return "";
}

async function getDbRoles(
  { axios, storeGet, discriminator, getValue, watchDependency },
  group,
  version
) {
  if (!isConsole({ storeGet })) await getEngines({ axios, storeGet });
  filterSecretEngineList({
    getValue,
    storeGet,
    discriminator,
    watchDependency,
  });

  const dbValue = getValue(discriminator, "/database") || {};
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  let resource = "";
  let pluralRole = "";
  if (isConsole({ storeGet })) {
    resource = dbValue?.resource || "";
    pluralRole = getResourceRoleNameForConsole(resource);
  } else {
    resource = storeGet("/route/params/resource") || "";
    pluralRole = getResourceRoleName(resource);
  }

  if (resource) {
    try {
      const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${pluralRole}`;
      const resp = await axios.get(url);
      const response = (resp && resp.data && resp.data.items) || [];

      roles = response.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        const kind = (item && item.kind) || "";
        const namespace = (item.metadata && item.metadata.namespace) || "";
        const engine = (item.spec && item.spec.secretEngineRef?.name) || "";
        return {
          text: name,
          value: {
            name: name,
            kind: kind,
            namespace: namespace,
            engineRef: engine,
          },
        };
      });
      return roles.filter((role) => {
        const target = role.value.engineRef;
        return filteredEngineList.find((item) => item === target);
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

return {
  isConsole,
  getDatabases,
  isDbSelected,
  setRequestName,
  getDbNamespace,
  getNamespaces,
  getResourceRoleName,
  getResourceRoleNameForConsole,
  getDbRoles,
  getEngines,
  filterSecretEngineList,
  getSingularResource,
};
