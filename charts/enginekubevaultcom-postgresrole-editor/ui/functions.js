function getDbName({ storeGet }) {
  const name = storeGet("/route/params/name") || "";
  return name;
}

function getDbNamespace({ storeGet }) {
  const namespace = storeGet("/route/query/namespace") || "";
  return namespace;
}

async function getResources({ axios, storeGet }, group, version, resource) {
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

    const dbname = getDbName({ storeGet });
    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      const namespace = (item.metadata && item.metadata.namespace) || "";
      item.text = name;
      item.value = name;
      return true;
    });
    const mappedresources = resources.filter(
      (item) => item.text && item.text.startsWith(dbname)
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
  getResources,
};
