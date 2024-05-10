let autoscaleType = "";
let dbDetails = {}

async function mongoTypeEqualsTo({ axios, storeGet }, value) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  const namespace = storeGet("/route/query/namespace") || "";
  const name = storeGet("/route/query/name") || "";

  if (namespace && name) {
    try{
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mongodbs/${name}`
      );
      dbDetails = resp.data || {};
    }
    catch(e){
      console.log(e);
    }
  }

  const { spec } = dbDetails || {};
  const { shardTopology, replicaSet } = spec || {};
  
  let verd = "";
  if (shardTopology) verd = "sharded";
  else {
    if (replicaSet) verd = "replicaSet";
    else verd = "standalone";
  }
  return value === verd;
}

function setTrigger({ storeGet, commit }) {
  initDatabaseRef({ storeGet, commit });
  return "On";
}

function initDatabaseRef({ storeGet, commit }) {
  const dbName = storeGet("/route/query/name") || "";
  commit("wizard/model$update", {
    path: "/spec/databaseRef/name",
    value: dbName,
    force: true,
  });

  initMetadata({ storeGet, commit }, dbName);
}

function initMetadata({ storeGet, commit }, dbName){
  const namespace = storeGet("/route/query/namespace") || "";
  const type = ifScalingTypeEqualsTo({ storeGet }, "compute") ? "compute" : "storage";
  const date = Math.floor(Date.now() / 1000);
  const modifiedName = `${dbName}-${date}-autoscaling-${type}`;

  commit("wizard/model$update", {
    path: "/metadata/name",
    value: modifiedName,
    force: true,
  });
  commit("wizard/model$update", {
    path: "/metadata/namespace",
    value: namespace,
    force: true,
  });
}

function setControlledResources({ commit }, type) {
  const list = ["cpu", "memory"];
  const path = `/spec/compute/${type}/controlledResources`;
  commit("wizard/model$update", {
    path: path,
    value: list,
    force: true,
  });
  return list;
}

function ifScalingTypeEqualsTo({ storeGet }, type) {
  const operation = storeGet("/route/query/operation") || "";
  if (operation.length) {
    const splitOp = operation.split("-");
    if (splitOp.length > 2) autoscaleType = splitOp[2];
  }
  return autoscaleType === type;
}

async function fetchNodeTopology({ axios, storeGet }) {
  const owner = storeGet("/route/params/user") || "";
  const cluster = storeGet("/route/params/cluster") || "";
  const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`;
  let list = [];
  try {
    const resp = await axios.get(url);
    const items = (resp && resp.data?.items) || [];
    list = items;
  } catch (e) {
    console.log(e);
  }
  return list;
}

function isNodeTopologySelected({ watchDependency, model, getValue }) {
  watchDependency("model#/spec/compute/nodeTopology/name");
  const nodeTopologyName = getValue(model, "/spec/compute/nodeTopology/name") || "";
  return !!(nodeTopologyName.length)
}

function setApplyToIfReady(){
  return "IfReady"
}

return {
  mongoTypeEqualsTo,
  initDatabaseRef,
  initMetadata,
  setControlledResources,
  setTrigger,
  ifScalingTypeEqualsTo,
  fetchNodeTopology,
  isNodeTopologySelected,
  setApplyToIfReady,
};
