let storageClassList = [];

const machines = {
  "db.t.micro": {
    resources: {
      requests: {
        cpu: "250m",
        memory: "512Mi",
      },
      limits: {
        cpu: "500m",
        memory: "1Gi",
      },
    },
  },
  "db.t.small": {
    resources: {
      requests: {
        cpu: "1",
        memory: "1Gi",
      },
      limits: {
        cpu: "2",
        memory: "2Gi",
      },
    },
  },
  "db.t.medium": {
    resources: {
      requests: {
        cpu: "1",
        memory: "2Gi",
      },
      limits: {
        cpu: "2",
        memory: "4Gi",
      },
    },
  },
  "db.t.large": {
    resources: {
      requests: {
        cpu: "1",
        memory: "4Gi",
      },
      limits: {
        cpu: "2",
        memory: "8Gi",
      },
    },
  },
  "db.t.xlarge": {
    resources: {
      requests: {
        cpu: "2",
        memory: "8Gi",
      },
      limits: {
        cpu: "4",
        memory: "16Gi",
      },
    },
  },
  "db.t.2xlarge": {
    resources: {
      requests: {
        cpu: "4",
        memory: "16Gi",
      },
      limits: {
        cpu: "8",
        memory: "32Gi",
      },
    },
  },
  "db.m.small": {
    resources: {
      requests: {
        cpu: "500m",
        memory: "912680550",
      },
      limits: {
        cpu: "1",
        memory: "1825361100",
      },
    },
  },
  "db.m.large": {
    resources: {
      requests: {
        cpu: "1",
        memory: "4Gi",
      },
      limits: {
        cpu: "2",
        memory: "8Gi",
      },
    },
  },
  "db.m.xlarge": {
    resources: {
      requests: {
        cpu: "2",
        memory: "8Gi",
      },
      limits: {
        cpu: "4",
        memory: "16Gi",
      },
    },
  },
  "db.m.2xlarge": {
    resources: {
      requests: {
        cpu: "4",
        memory: "16Gi",
      },
      limits: {
        cpu: "8",
        memory: "32Gi",
      },
    },
  },
  "db.m.4xlarge": {
    resources: {
      requests: {
        cpu: "8",
        memory: "32Gi",
      },
      limits: {
        cpu: "16",
        memory: "64Gi",
      },
    },
  },
  "db.m.8xlarge": {
    resources: {
      requests: {
        cpu: "16",
        memory: "64Gi",
      },
      limits: {
        cpu: "32",
        memory: "128Gi",
      },
    },
  },
  "db.m.12xlarge": {
    resources: {
      requests: {
        cpu: "24",
        memory: "96Gi",
      },
      limits: {
        cpu: "48",
        memory: "192Gi",
      },
    },
  },
  "db.m.16xlarge": {
    resources: {
      requests: {
        cpu: "32",
        memory: "128Gi",
      },
      limits: {
        cpu: "64",
        memory: "256Gi",
      },
    },
  },
  "db.m.24xlarge": {
    resources: {
      requests: {
        cpu: "48",
        memory: "192Gi",
      },
      limits: {
        cpu: "96",
        memory: "384Gi",
      },
    },
  },
  "db.r.large": {
    resources: {
      requests: {
        cpu: "1",
        memory: "8Gi",
      },
      limits: {
        cpu: "2",
        memory: "16Gi",
      },
    },
  },
  "db.r.xlarge": {
    resources: {
      requests: {
        cpu: "2",
        memory: "16Gi",
      },
      limits: {
        cpu: "4",
        memory: "32Gi",
      },
    },
  },
  "db.r.2xlarge": {
    resources: {
      requests: {
        cpu: "4",
        memory: "32Gi",
      },
      limits: {
        cpu: "8",
        memory: "64Gi",
      },
    },
  },
  "db.r.4xlarge": {
    resources: {
      requests: {
        cpu: "8",
        memory: "96Gi",
      },
      limits: {
        cpu: "16",
        memory: "192Gi",
      },
    },
  },
  "db.r.8xlarge": {
    resources: {
      requests: {
        cpu: "16",
        memory: "128Gi",
      },
      limits: {
        cpu: "32",
        memory: "256Gi",
      },
    },
  },
  "db.r.12xlarge": {
    resources: {
      requests: {
        cpu: "24",
        memory: "192Gi",
      },
      limits: {
        cpu: "48",
        memory: "384Gi",
      },
    },
  },
  "db.r.16xlarge": {
    resources: {
      requests: {
        cpu: "32",
        memory: "256Gi",
      },
      limits: {
        cpu: "64",
        memory: "512Gi",
      },
    },
  },
  "db.r.24xlarge": {
    resources: {
      requests: {
        cpu: "24",
        memory: "384Gi",
      },
      limits: {
        cpu: "96",
        memory: "768Gi",
      },
    },
  },
};

const machineList = [
  "custom",
  "db.t.micro",
  "db.t.small",
  "db.t.medium",
  "db.t.large",
  "db.t.xlarge",
  "db.t.2xlarge",
  "db.m.small",
  "db.m.large",
  "db.m.xlarge",
  "db.m.2xlarge",
  "db.m.4xlarge",
  "db.m.8xlarge",
  "db.m.12xlarge",
  "db.m.16xlarge",
  "db.m.24xlarge",
  "db.r.large",
  "db.r.xlarge",
  "db.r.2xlarge",
  "db.r.4xlarge",
  "db.r.8xlarge",
  "db.r.12xlarge",
  "db.r.16xlarge",
  "db.r.24xlarge",
];

function showAuthPasswordField({ discriminator, getValue, watchDependency }) {
  const modelPathValue = getValue(discriminator, "/createAuthSecret");
  watchDependency("discriminator#/createAuthSecret");
  return !!modelPathValue;
}

function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  value,
  modelPath
) {
  const modelPathValue = getValue(model, modelPath);
  watchDependency("model#" + modelPath);
  return modelPathValue === value;
}

function showAuthSecretField({ discriminator, getValue, watchDependency }) {
  return !showAuthPasswordField({
    discriminator,
    getValue,
    watchDependency,
  });
}

function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  const validType = ["Standalone", "Cluster"];
  return validType.includes(modelPathValue);
}

function showReplicaField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  const validType = ["Replicaset"];
  return validType.includes(modelPathValue);
}

function onModeChange({ model, getValue, watchDependency, commit }) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  if (modelPathValue === "Replicaset") {
    commit("wizard/model$update", {
      path: "/spec/replicas",
      value: 3,
      force: true,
    });
  } else {
    commit("wizard/model$update", {
      path: "/spec/replicas",
      value: 1,
      force: true,
    });
  }
}

async function getResources({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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

function onCreateAuthSecretChange({ discriminator, getValue, commit }) {
  const createAuthSecret = getValue(discriminator, "/createAuthSecret");
  if (createAuthSecret) {
    commit("wizard/model$delete", "/spec/authSecret/name");
  } else if (createAuthSecret === false) {
    commit("wizard/model$delete", "/spec/authSecret/password");
  }
}

async function getSecrets({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    }
  );

  const secrets = (resp && resp.data && resp.data.items) || [];

  const filteredSecrets = secrets.filter((item) => {
    const validType = ["kubernetes.io/service-account-token", "Opaque"];
    return validType.includes(item.type);
  });

  filteredSecrets.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    item.text = name;
    item.value = name;
    return true;
  });
  return filteredSecrets;
}

function disableLimit({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/podResources/machine");
  watchDependency("model#/spec/podResources/machine");
  return modelPathValue !== "custom" && !!modelPathValue;
}

function getMachineListForOptions() {
  const array = machineList.map((item) => {
    return { text: item, value: item };
  });
  return array;
}

function setLimitsCpuOrMem({ model, getValue, watchDependency }, path) {
  watchDependency("model#/spec/version");
  const dbVersion = getValue(model, "/spec/version");
  const modelPathValue = getValue(model, "/spec/podResources/machine");

  if (modelPathValue && modelPathValue !== "custom") {
    return (
      machines[modelPathValue] &&
      machines[modelPathValue].resources &&
      machines[modelPathValue].resources.limits[path]
    );
  } else {
    if (path === "cpu") {
      if (dbVersion >= "6") return "1";
      else return ".5";
    } else if (path === "memory") {
      return "1024Mi";
    }
  }
}

function setMachineToCustom() {
  return "custom";
}

async function fetchJsons({ axios, itemCtx }) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart;

  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`
    );
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`
    );
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || "");
    functions = evalFunc();
  } catch (e) {
    console.log(e);
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  };
}

function updateAgentValue({ commit }, val) {
  commit("wizard/model$update", {
    path: "/spec/monitoring/agent",
    value: val ? "prometheus.io/operator" : "",
    force: true,
  });

  // update alert value depend on monitoring profile
  commit("wizard/model$update", {
    path: "/form/alert/enabled",
    value: val ? "warning" : "none",
    force: true,
  });
}

function getCreateNameSpaceUrl({ model, getValue, storeGet }) {
  const user = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const domain = storeGet("/domain") || "";
  if (domain.includes("bb.test")) {
    return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/namespaces/create`;
  } else {
    const editedDomain = domain.replace("kubedb", "console");
    return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/namespaces/create`;
  }
}

const ifCapiProviderIsNotEmpty = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/provider");
  const val = getValue(model, "/form/capi/provider");
  if (val) return true;
};

const showMultiselectZone = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/dedicated");
  const val = getValue(model, "/form/capi/provider");

  if (val === "capz" && ifDedicated({ model, getValue })) return true;
};

const showSelectZone = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/dedicated");
  const val = getValue(model, "/form/capi/provider");
  if (val !== "capz" && ifDedicated({ model, getValue })) return true;
};

const ifDedicated = ({ model, getValue }) => {
  const val = getValue(model, "form/capi/dedicated");
  if (val) return true;
};

const dedicatedOnChange = ({ model, getValue, commit }) => {
  const val = getValue(model, "form/capi/dedicated");
  if (!val) {
    commit("wizard/model$delete", "form/capi/zones");
    commit("wizard/model$delete", "form/capi/sku");
  }
};

const ifZones = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/zones");
  watchDependency("model#/form/capi/dedicated");
  const zones = getValue(model, "form/capi/zones") || [];
  const isDedicated = getValue(model, "form/capi/dedicated");
  if (zones.length && isDedicated) return true;
};

const zonesOnChange = ({ model, getValue, commit }) => {
  const zones = getValue(model, "form/capi/zones") || [];
  if (!zones.length) commit("wizard/model$delete", "form/capi/sku");
};

async function getZones({ storeGet, axios, model, getValue }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const isDedicated = getValue(model, "form/capi/dedicated");
  if (isDedicated) {
    try {
      const resp = await axios.get(`clustersv2/${owner}/${cluster}/zones`);
      const val = resp.data.map((item) => {
        return { value: item, text: item };
      });
      return val;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

async function getSKU({ storeGet, axios, model, getValue, watchDependency }) {
  watchDependency("model#/form/capi/zones");
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const zones = getValue(model, "form/capi/zones") || [];
  if (zones.length) {
    try {
      let url = `clustersv2/${owner}/${cluster}/vms?`;
      if (typeof zones === "string") {
        url += `zones=${encodeURIComponent(zones)}`;
      } else {
        zones.forEach((item) => {
          url += `zones=${encodeURIComponent(item)}&`;
        });
        url = url.slice(0, -1);
      }
      const resp = await axios.get(url);
      const val = resp.data.map((item) => {
        return {
          value: item.name,
          text: `${item.name} [CPU: ${item.cpu}] [Memory: ${item.memory}mb] `,
        };
      });
      return val;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

function isVariantAvailable({ storeGet }) {
  const variant = storeGet("/route/query/variant");
  return variant ? true : false;
}


function setStorageClass({ model, getValue, commit }) {
  const deletionPolicy = getValue(model, "/spec/deletionPolicy") || "";
  let storageClass =
    getValue(model, "/spec/admin/storageClasses/default") || "";
  const storageClassList =
    getValue(model, "/spec/admin/storageClasses/available") || [];
  const suffix = "-retain";

  const simpleClassList = storageClassList.filter((item) => {
    return !item.endsWith(suffix);
  });
  const retainClassList = storageClassList.filter((item) => {
    return item.endsWith(suffix);
  });
  if (deletionPolicy === "WipeOut" || deletionPolicy === "Delete") {
    storageClass = simpleClassList.length
      ? simpleClassList[0]
      : retainClassList[0];
  } else {
    storageClass = retainClassList.length
      ? retainClassList[0]
      : simpleClassList[0];
  }

  const isChangeable = isToggleOn({ getValue, model }, "storageClasses");
  if (isChangeable && storageClass) {
    commit("wizard/model$update", {
      path: "/spec/admin/storageClasses/default",
      value: storageClass,
      force: true,
    });
  }
}

function getAdminOptions({ getValue, model }, type) {
  const options = getValue(model, `/spec/admin/${type}/available`) || [];
  return options;
}

function isToggleOn({ getValue, model }, type) {
  return getValue(model, `/spec/admin/${type}/toggle`);
}

function showAlerts({ watchDependency, model, getValue, discriminator }) {
  watchDependency("discriminator#/monitoring");
  const isMonitorEnabled = getValue(discriminator, "/monitoring");
  return isMonitorEnabled && isToggleOn({ getValue, model }, "alerts");
}

function onBackupSwitch({ discriminator, getValue, commit }) {
  const isBackupOn = getValue(discriminator, "/backup");
  commit("wizard/model$update", {
    path: "/spec/admin/backup/tool",
    value: isBackupOn ? "KubeStash" : "",
    force: true,
  });
}

function clearArbiterHidden({ commit }) {
  commit("wizard/model$update", {
    path: `/spec/arbiter/enabled`,
    value: false,
    force: true,
  });

  commit("wizard/model$update", {
    path: `/spec/hidden/enabled`,
    value: false,
    force: true,
  });
}
let nodeTopologyListFromApi = [];
let provider = "";

async function getNodeTopology({
  model,
  getValue,
  axios,
  storeGet,
  watchDependency,
}) {
  watchDependency("model#/spec/admin/deployment/default");
  watchDependency("model#/spec/admin/clusterTier/default");
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const deploymentType =
    getValue(model, "/spec/admin/deployment/default") || "";
  const clusterTier = getValue(model, "/spec/admin/clusterTier/default") || "";
  const nodeTopologyList =
    getValue(model, `/spec/admin/clusterTier/nodeTopology/available`) || [];
  let mappedResp = [];
  if (nodeTopologyListFromApi.length === 0) {
    try {
      const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`;
      const resp = await axios.get(url);
      nodeTopologyListFromApi = resp.data?.items;
      const filteredResp = resp.data?.items.filter(
        (item) =>
          item.metadata.labels?.["node.k8s.appscode.com/tenancy"] ===
          deploymentType.toLowerCase()
      );
      mappedResp = filteredResp?.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        return name;
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    const filteredResp = nodeTopologyListFromApi.filter(
      (item) =>
        item.metadata.labels?.["node.k8s.appscode.com/tenancy"] ===
        deploymentType.toLowerCase()
    );
    mappedResp = filteredResp?.map((item) => {
      const name = (item.metadata && item.metadata.name) || "";
      return name;
    });
  }

  const statusUrl = `/clustersv2/${owner}/${cluster}/status`;
  if (provider.length === 0) {
    try {
      const resp = await axios.get(statusUrl);
      provider = resp.data?.provider;
    } catch (e) {
      console.log(e);
    }
  }
  const filteredList = filterNodeTopology(
    nodeTopologyList,
    clusterTier,
    provider,
    mappedResp
  );
  return filteredList;
}
function returnFalse() {
  return false;
}
function isConfigDatabaseOn({ watchDependency, discriminator, getValue }) {
  watchDependency("discriminator#/configDatabase");
  return getValue(discriminator, "/configDatabase");
}
function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  return modelPathValue && modelPathValue !== mode;
}
function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  const validType = [];
  return !validType.includes(modelPathValue);
}
function showHidden({ watchDependency, model, getValue }) {
  watchDependency("model#/spec/hidden/enabled");
  const isHiddenOn = getValue(model, "/spec/hidden/enabled") || "";
  const notStandalone = notEqualToDatabaseMode(
    { model, getValue, watchDependency },
    "Standalone"
  );
  return isHiddenOn && notStandalone;
}
function notEqualToDatabaseMode({ model, getValue, watchDependency }, mode) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  return modelPathValue && modelPathValue !== mode;
}
function showArbiter({ watchDependency, model, getValue }) {
  watchDependency("model#/spec/arbiter/enabled");
  const isArbiterOn = getValue(model, "/spec/arbiter/enabled") || "";
  const notStandalone = notEqualToDatabaseMode(
    { model, getValue, watchDependency },
    "Standalone"
  );
  return isArbiterOn && notStandalone;
}
function clearConfiguration({ discriminator, getValue, commit }) {
  const configOn = getValue(discriminator, "/configDatabase");

  if (!configOn) {
    commit("wizard/model$delete", "/spec/configuration");
  }
}
function filterNodeTopology(list, tier, provider, map) {
  // first filter the list from value that exists from the filtered list got from API
  const filteredlist = list.filter((item) => {
    return map.includes(item);
  });

  // filter the list based on clusterTier
  if (provider === "EKS") {
    return filteredlist.filter((item) => {
      if (tier === "CPUOptimized") return item.startsWith("c");
      else if (tier === "MemoryOptimized") return item.startsWith("r");
      else return !item.startsWith("c") && !item.startsWith("r");
    });
  } else if (provider === "AKS") {
    return filteredlist.filter((item) => {
      if (tier === "CPUOptimized")
        return item.startsWith("f") || item.startsWith("fx");
      else if (tier === "MemoryOptimized")
        return (
          item.startsWith("e") ||
          item.startsWith("eb") ||
          item.startsWith("ec") ||
          item.startsWith("m") ||
          item.startsWith("d")
        );
      else
        return (
          !(item.startsWith("f") || item.startsWith("fx")) &&
          !(
            item.startsWith("e") ||
            item.startsWith("eb") ||
            item.startsWith("ec") ||
            item.startsWith("m") ||
            item.startsWith("d")
          )
        );
    });
  } else if (provider === "GKE") {
    return filteredlist.filter((item) => {
      if (tier === "CPUOptimized")
        return (
          item.startsWith("h3") ||
          item.startsWith("c2") ||
          item.startsWith("c2d")
        );
      else if (tier === "MemoryOptimized")
        return (
          item.startsWith("x4") ||
          item.startsWith("m1") ||
          item.startsWith("m2") ||
          item.startsWith("m3")
        );
      else
        return (
          !(
            item.startsWith("h3") ||
            item.startsWith("c2") ||
            item.startsWith("c2d")
          ) &&
          !(
            item.startsWith("x4") ||
            item.startsWith("m1") ||
            item.startsWith("m2") ||
            item.startsWith("m3")
          )
        );
    });
  }
}
function showIssuer({ model, getValue, watchDependency }) {
  watchDependency("model#/spec/admin/tls/default");
  const isTlsEnabled = getValue(model, "/spec/admin/tls/default");
  const isIssuerToggleEnabled = isToggleOn(
    { getValue, model },
    "clusterIssuers"
  );
  return isTlsEnabled && isIssuerToggleEnabled;
}
function onAuthChange({ getValue, discriminator, commit }) {
  const isAuthOn = getValue(discriminator, "/createAuthSecret");
  if (!isAuthOn) {
    commit("wizard/model$update", {
      path: "/spec/authSecret/name",
      value: "",
      force: true,
    });
    commit("wizard/model$update", {
      path: "/spec/authSecret/password",
      value: "",
      force: true,
    });
  }
}
function setMonitoring({ getValue, model }) {
  const agent = getValue(model, "/spec/admin/monitoring/agent") || "";
  return !!agent;
}
async function isBackupCluster({ axios, storeGet, commit }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const url = `/clusters/${owner}/${cluster}/proxy/ui.k8s.appscode.com/v1alpha1/features`;
  let isStashEnabled = false;

  try {
    const resp = await axios.get(url);
    const stashPreset = resp.data?.items?.find(
      (item) => item.metadata?.name === "stash-presets"
    );
    isStashEnabled = !!(
      stashPreset?.status?.enabled && stashPreset?.status?.ready
    );
  } catch (e) {
    console.log(e);
  }
  commit("wizard/model$update", {
    path: "/spec/admin/backup/tool",
    value: isStashEnabled ? "KubeStash" : "",
    force: true,
  });
  return isStashEnabled;
}
function isMachineNotCustom({ model, getValue, watchDependency }, path) {
  const fullpath = path
    ? `/spec/${path}/podResources/machine`
    : "/spec/podResources/machine";
  const modelPathValue = getValue(model, fullpath);
  watchDependency(`model#${fullpath}`);
  return modelPathValue !== "custom" && !!modelPathValue;
}
async function getNamespaces({ axios, storeGet }) {
  const params = storeGet("/route/params");
  const { user, cluster, group, version, resource } = params;
  try {
    const resp = await axios.post(
      `/clusters/${user}/${cluster}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`,
      {
        apiVersion: "identity.k8s.appscode.com/v1alpha1",
        kind: "SelfSubjectNamespaceAccessReview",
        spec: {
          resourceAttributes: [
            {
              verb: "create",
              group: group,
              version: version,
              resource: resource,
            },
          ],
        },
      }
    );
    const namespaces = resp?.data?.status?.namespaces || [];
    return namespaces;
  } catch (e) {
    console.log(e);
    return [];
  }
}
function updateAlertValue({ commit, model, discriminator, getValue }) {
  const isMonitorEnabled = getValue(discriminator, "/monitoring");
  const alert = isMonitorEnabled ? "warning" : "none";
  // update alert value depend on monitoring profile
  commit("wizard/model$update", {
    path: "/form/alert/enabled",
    value: alert,
    force: true,
  });
  const agent = isMonitorEnabled ? "prometheus.io/operator" : "";
  commit("wizard/model$update", {
    path: "/spec/admin/monitoring/agent",
    value: agent,
    force: true,
  });
}

function setResourceLimit({ commit, model, getValue, watchDependency }) {
  let modelPathValue = getValue(model, "/spec/podResources/machine");
  const deploymentType = getValue(model, "/spec/admin/deployment/default");
  if (modelPathValue) {
    if (modelPathValue === "custom") modelPathValue = "db.t.micro";
    // to avoiding set value by reference, cpu and memory set separately
    if (deploymentType === "Dedicated") {
      commit("wizard/model$update", {
        path: "/spec/podResources/resources/requests",
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      });
      commit("wizard/model$update", {
        path: "/spec/podResources/resources/limits",
        value: machines[modelPathValue]?.resources.limits,
        force: true,
      });
    } else {
      commit("wizard/model$update", {
        path: "/spec/podResources/resources",
        value: machines[modelPathValue]?.resources,
        force: true,
      });
    }
  }
}

return {
  getNamespaces,
  updateAlertValue,
  getAdminOptions,
  isToggleOn,
  showAlerts,
  getNodeTopology,
  clearArbiterHidden,
  returnFalse,
  showHidden,
  isConfigDatabaseOn,
  notEqualToDatabaseMode,
  filterNodeTopology,
  onAuthChange,
  setMonitoring,
  isBackupCluster,
  isMachineNotCustom,
  showIssuer,
  showArbiter,
  clearConfiguration,
  showStorageSizeField,
  onBackupSwitch,
  isVariantAvailable,
  fetchJsons,
  showAuthPasswordField,
  isEqualToModelPathValue,
  showAuthSecretField,
  showStorageSizeField,
  getResources,
  getMongoDbVersions,
  onCreateAuthSecretChange,
  getSecrets,
  disableLimit,
  getMachineListForOptions,
  setResourceLimit,
  setLimitsCpuOrMem,
  setMachineToCustom,
  updateAgentValue,
  getCreateNameSpaceUrl,
  ifCapiProviderIsNotEmpty,
  ifDedicated,
  dedicatedOnChange,
  ifZones,
  zonesOnChange,
  getZones,
  getSKU,
  showMultiselectZone,
  showSelectZone,
  setStorageClass,
  showReplicaField,
  onModeChange,
};