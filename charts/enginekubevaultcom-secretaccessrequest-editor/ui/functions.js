function getDbName({ storeGet }) {
  const path = storeGet("/route/fullPath");
  const splitedPath = path.split("/");
  return splitedPath[6] || "";
}

function getDbNamespace({ storeGet }) {
  const path = storeGet("/route/fullPath");
  const splitedPath = path.split("/");
  const segment = splitedPath[splitedPath.length - 1];
  const namespace = segment.split("=");
  return namespace[1] || "";
}

async function getNamespaces({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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
  if (resource === "elasticsearches") return "ElasticsearchRole";
  else if (resource === "mariadbs") return "MysqlRole";
  else if (resource === "mongodbs") return "MongodbRole";
  else if (resource === "mysqls") return "MysqlRole";
  else if (resource === "postgreses") return "PostgresRole";
  else if (resource === "redises") return "RedisRole";
}

async function getDbRoles({ axios, storeGet }, group, version) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const resource = storeGet("/route/params/resource") || "";
  const pluralRole = getResourceRoleName(resource).toLowerCase() + "s";
  try {
    const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${pluralRole}`;
    const resp = await axios.get(url);
    const resources = (resp && resp.data && resp.data.items) || [];

    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      const kind = item && item.kind;
      const namespace = item.metadata && item.metadata.namespace;
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

function getRoleKind({ model, getValue, storeGet, commit }) {
  const resource = storeGet("/route/params/resource") || "";
  const kind = getResourceRoleName(resource);

  let specRef = getValue(model, "/spec/roleRef") || {};
  specRef.kind = kind;
  specRef.namespace = getDbNamespace({ storeGet });
  if (kind) {
    commit("wizard/model$update", {
      path: `/spec/roleRef`,
      value: specRef,
      force: true,
    });
  }
  return kind;
}

return {
  getDbName,
  getDbNamespace,
  getNamespaces,
  getResourceRoleName,
  getDbRoles,
  getRoleKind,
};
