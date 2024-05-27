let storageClassList = [];
const machines = {
  "db.t.micro": {
    resources: {
      limits: {
        cpu: "500m",
        memory: "1Gi",
      },
    },
  },
  "db.t.small": {
    resources: {
      limits: {
        cpu: "2",
        memory: "2Gi",
      },
    },
  },
  "db.t.medium": {
    resources: {
      limits: {
        cpu: "2",
        memory: "4Gi",
      },
    },
  },
  "db.t.large": {
    resources: {
      limits: {
        cpu: "2",
        memory: "8Gi",
      },
    },
  },
  "db.t.xlarge": {
    resources: {
      limits: {
        cpu: "4",
        memory: "16Gi",
      },
    },
  },
  "db.t.2xlarge": {
    resources: {
      limits: {
        cpu: "8",
        memory: "32Gi",
      },
    },
  },
  "db.m.small": {
    resources: {
      limits: {
        cpu: "1",
        memory: "1825361100",
      },
    },
  },
  "db.m.large": {
    resources: {
      limits: {
        cpu: "2",
        memory: "8Gi",
      },
    },
  },
  "db.m.xlarge": {
    resources: {
      limits: {
        cpu: "4",
        memory: "16Gi",
      },
    },
  },
  "db.m.2xlarge": {
    resources: {
      limits: {
        cpu: "8",
        memory: "32Gi",
      },
    },
  },
  "db.m.4xlarge": {
    resources: {
      limits: {
        cpu: "16",
        memory: "64Gi",
      },
    },
  },
  "db.m.8xlarge": {
    resources: {
      limits: {
        cpu: "32",
        memory: "128Gi",
      },
    },
  },
  "db.m.12xlarge": {
    resources: {
      limits: {
        cpu: "48",
        memory: "192Gi",
      },
    },
  },
  "db.m.16xlarge": {
    resources: {
      limits: {
        cpu: "64",
        memory: "256Gi",
      },
    },
  },
  "db.m.24xlarge": {
    resources: {
      limits: {
        cpu: "96",
        memory: "384Gi",
      },
    },
  },
  "db.r.large": {
    resources: {
      limits: {
        cpu: "2",
        memory: "16Gi",
      },
    },
  },
  "db.r.xlarge": {
    resources: {
      limits: {
        cpu: "4",
        memory: "32Gi",
      },
    },
  },
  "db.r.2xlarge": {
    resources: {
      limits: {
        cpu: "8",
        memory: "64Gi",
      },
    },
  },
  "db.r.4xlarge": {
    resources: {
      limits: {
        cpu: "16",
        memory: "192Gi",
      },
    },
  },
  "db.r.8xlarge": {
    resources: {
      limits: {
        cpu: "32",
        memory: "256Gi",
      },
    },
  },
  "db.r.12xlarge": {
    resources: {
      limits: {
        cpu: "48",
        memory: "384Gi",
      },
    },
  },
  "db.r.16xlarge": {
    resources: {
      limits: {
        cpu: "64",
        memory: "512Gi",
      },
    },
  },
  "db.r.24xlarge": {
    resources: {
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

function showAuthPasswordField({
  discriminator,
  getValue,
  watchDependency,
}) {
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

function showAuthSecretField({
  discriminator,
  getValue,
  watchDependency,
}) {
  return !showAuthPasswordField({
    discriminator,
    getValue,
    watchDependency,
  });
}

async function getResources(
  { axios, storeGet },
  group,
  version,
  resource
) {
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

async function getStorageClassNames({ axios, storeGet, commit, model, getValue }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
    {
      params: {
        filter: { items: { metadata: { name: null, annotations: null } } },
      },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    item.text = name;
    item.value = name;
    return true;
  });
  storageClassList = resources;
  setStorageClass({model, getValue, commit});
  return resources;
}

async function getMySqlVersions(
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
  const filteredMySqlVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  filteredMySqlVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    item.text = `${name} (${specVersion})`;
    item.value = name;
    return true;
  });
  return filteredMySqlVersions;
}

function onCreateAuthSecretChange({
  discriminator,
  getValue,
  commit
}) {
  const createAuthSecret = getValue(discriminator, "/createAuthSecret");
  if (createAuthSecret) {
    commit(
      "wizard/model$delete",
      "/spec/authSecret/name"
    );
  } else if(createAuthSecret === false) {
    commit(
      "wizard/model$delete",
      "/spec/authSecret/password"
    );
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

  if(owner && cluster && namespace) {
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        {
          params: {
            filter: { items: { data: {username: null, password: null }, metadata: { name: null }, type: null } },
          },
        }
      );

      const secrets = (resp && resp.data && resp.data.items) || [];

      const filteredSecrets = secrets.filter((item) => {
        const validType = ["kubernetes.io/service-account-token", "Opaque", "kubernetes.io/basic-auth"];
        return validType.includes(item.type);
      });

      filteredSecrets.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        item.text = name;
        item.value = name;
        return true;
      });
      return filteredSecrets;
    } catch (e) {
      console.log(e);
    }
  }
  return [];
}

function disableLimit({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/machine");
  watchDependency("model#/spec/machine");
  return modelPathValue !== "custom" && !!modelPathValue;
}

function getMachineListForOptions() {
  const array = machineList.map((item) => {
    return { text: item, value: item };
  });
  return array;
}

function setResourceLimit({ commit, model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/podResources/machine");
  watchDependency("model#/spec/podResources/machine");
  if (modelPathValue && modelPathValue !== "custom") {
    // to avoiding set value by reference, cpu and memory set separately
    commit("wizard/model$update", {
      path: "/spec/resources/limits/cpu",
      value: machines[modelPathValue].resources.limits.cpu,
      force: true,
    });
    commit("wizard/model$update", {
      path: "/spec/resources/limits/memory",
      value: machines[modelPathValue].resources.limits.memory,
      force: true,
    });
  }
}

function setLimitsCpuOrMem({ model, getValue }, path) {
  const modelPathValue = getValue(model, "/spec/machine");
  if (modelPathValue && modelPathValue !== "custom") {
    return (
      machines[modelPathValue] &&
      machines[modelPathValue].resources &&
      machines[modelPathValue].resources.limits[path]
    );
  } else {
    if (path === "cpu") {
      return ".5";
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

function updateAgentValue({commit },val) {
  commit("wizard/model$update", {
    path: "/spec/monitoring/agent",
    value: val ? "prometheus.io/operator" : "",
    force: true
  });

  // update alert value depend on monitoring profile
  commit("wizard/model$update", {
    path: "/form/alert/enabled",
    value: val ? 'warning' : 'none',
    force: true
  });
}

function onModeChange({ model, getValue, watchDependency, commit }){
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  if(modelPathValue==='Topology'){
    commit("wizard/model$update", {
      path: "/spec/replicas",
      value: 3,
      force: true,
    });
  }else{
    commit("wizard/model$update", {
      path: "/spec/replicas",
      value: 1,
      force: true,
    });
  }
}

function getCreateNameSpaceUrl ({ model, getValue, storeGet }){ 

  const user = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const domain = storeGet("/domain") || '';
  if(domain.includes("bb.test")){
    return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  }else{
    const editedDomain = domain.replace("kubedb","console");
    return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
  }
}

const ifCapiProviderIsNotEmpty = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/provider");
  const val = getValue(model, "/form/capi/provider");
  if (val) return true
};

const showMultiselectZone = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/dedicated");
  const val = getValue(model, "/form/capi/provider");
  
  if(val === "capz" && ifDedicated({ model, getValue })) return true;
};

const showSelectZone = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/form/capi/dedicated");
  const val = getValue(model, "/form/capi/provider");
  if(val !== "capz" && ifDedicated({ model, getValue })) return true;
};

const ifDedicated = ({ model, getValue}) => {
  const val = getValue(model, "form/capi/dedicated");
  if (val) return true
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
  if (zones.length && isDedicated) return true
};

const zonesOnChange = ({ model, getValue, commit }) => {
  const zones = getValue(model, "form/capi/zones") || [];
  if (!zones.length) commit("wizard/model$delete", "form/capi/sku");
};

async function getZones({storeGet,axios,model,getValue}) {
  const owner = storeGet("/route/params/user")
  const cluster = storeGet("/route/params/cluster")
  const isDedicated = getValue(model,"form/capi/dedicated")
  if(isDedicated)
  {
    try {
      const resp = await axios.get(`clustersv2/${owner}/${cluster}/zones`);
      const val = resp.data.map((item)=>{
        return {"value":item,"text":item}
      })
      return val
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

async function getSKU({storeGet,axios,model,getValue,watchDependency}) {
  watchDependency("model#/form/capi/zones")
  const owner = storeGet("/route/params/user")
  const cluster = storeGet("/route/params/cluster")
  const zones = getValue(model,"form/capi/zones") || []
  if(zones.length)
  {
    try {
      let url = `clustersv2/${owner}/${cluster}/vms?`
      if(typeof zones === 'string') {
        url+=`zones=${encodeURIComponent(zones)}`
      }
      else {
        zones.forEach((item) => {
          url+= `zones=${encodeURIComponent(item)}&`
        });
        url = url.slice(0,-1)
      }
      const resp = await axios.get(url);
      const val = resp.data.map((item)=>{
        return {"value":item.name,"text":`${item.name} [CPU: ${item.cpu}] [Memory: ${item.memory}mb] `}
      })
      return val
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

function isVariantAvailable ({storeGet})  {
  const variant = storeGet("/route/query/variant");
  return variant ? true : false
}

function setStorageClass({model, getValue, commit}) {
  const terminationPolicy = getValue(model, "spec/terminationPolicy") || "";
  let storageClass = getValue(model, "spec/storageClass/name") || "";
  const suffix = "-retain";

  const simpleClassList = storageClassList.filter(item => {
    return !item.metadata?.name?.endsWith(suffix)
  })

  const retainClassList = storageClassList.filter(item => {
    return item.metadata?.name?.endsWith(suffix)
  })

  const defaultSimpleList = simpleClassList.filter(item => {
    return item.metadata &&
    item.metadata.annotations &&
    item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];
  })

  const defaultRetainList = retainClassList.filter(item => {
    return item.metadata &&
    item.metadata.annotations &&
    item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];
  })

  if(terminationPolicy === "WipeOut" || terminationPolicy === "Delete") {
    if(simpleClassList.length > 1) {
      const found = defaultSimpleList.length 
        ? defaultSimpleList[0] 
        : simpleClassList[0];
      storageClass = found.value;
    }
    else if(simpleClassList.length === 1) {
      storageClass = simpleClassList[0]?.value;
    }
    else {
      const found = defaultRetainList.length 
        ? defaultRetainList[0].value 
        : storageClassList.length ? storageClassList[0].value : "";
      storageClass = found;
    }
  }
  else {
    if(retainClassList.length > 1) {
        const found = defaultRetainList.length 
          ? defaultRetainList[0] 
          : retainClassList[0];
        storageClass = found.value;
    }
    else if(retainClassList.length === 1) {
      storageClass = retainClassList[0]?.value;
    }
    else {
      const found = defaultSimpleList.length 
        ? defaultSimpleList[0].value
        : storageClassList.length ? storageClassList[0].value : "";
      storageClass = found;
    }
  }

  if(storageClass) {
    commit("wizard/model$update", {
      path: "/spec/storageClass/name",
      value: storageClass,
      force: true,
    });
  }
}

return {
  isVariantAvailable,
	fetchJsons,
	showAuthPasswordField,
	isEqualToModelPathValue,
	showAuthSecretField,
	getResources,
	getStorageClassNames,
  getMySqlVersions,
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
  onModeChange
}