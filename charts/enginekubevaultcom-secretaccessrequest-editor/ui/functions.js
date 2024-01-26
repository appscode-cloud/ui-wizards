function getDbName({ storeGet }) {
  const name = storeGet("/route/params/name") || "";
  return name;
}

function getDbNamespace({ storeGet }) {
  const namespace = storeGet("/route/query/namespace") || "";
  return namespace;
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

    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      item.text = name;
      item.value = name;
      return true;
    });
    return resources;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function getResourceRoleName(resource) {
  if (resource === "elasticsearches") return "elasticsearchroles";
  else if (resource === "mariadbs") return "mariadbroles";
  else if (resource === "mongodbs") return "mongodbroles";
  else if (resource === "mysqls") return "mysqlroles";
  else if (resource === "postgreses") return "postgresroles";
  else if (resource === "redises") return "redisroles";
  else return ""
}

async function getDbRoles({ axios, storeGet }, group, version) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  const resource = storeGet("/route/params/resource") || "";
  const pluralRole = getResourceRoleName(resource);
  try {
    const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${pluralRole}`;
    const resp = await axios.get(url);
    const resources = (resp && resp.data && resp.data.items) || [];

    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      const kind = (item && item.kind) || "";
      const namespace = (item.metadata && item.metadata.namespace) || "";
      item.text = name;
      item.value = {
        name: name,
        kind: kind,
        namespace: namespace,
      };
      return true;
    });
    const dbname = getDbName({ storeGet }) || "";
    const mappedresources = resources.filter(
      (item) => item.spec && item.spec.secretEngineRef.name.startsWith(dbname)
    );
    return mappedresources;
  } catch (e) {
    console.log(e);
    return [];
  }
}

return {
  getDbName,
  getDbNamespace,
  getNamespaces,
  getResourceRoleName,
  getDbRoles,
};
