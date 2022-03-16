function onVersionChange({discriminator, getValue, commit, model, watchDependency}) {
  watchDependency("discriminator#/elasticVersions")
  const versions = getValue(discriminator, "/elasticVersions");

  const selectedVersion = getValue(model, "/spec/version");

  const version = versions?.find((item) => item.value === selectedVersion) || {};

  commit("wizard/model$update", {
    path: "/spec/authPlugin",
    value: version.authPlugin,
    force: true
  });

  return selectedVersion;
}

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

function showStorageSizeField({ model, getValue, watchDependency }) {
  const modelPathValue = getValue(model, "/spec/mode");
  watchDependency("model#/spec/mode");
  const validType = ["Standalone", "Replicaset"];
  return validType.includes(modelPathValue);
}

async function getResources(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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

async function getStorageClassNames({ axios, storeGet, commit }, path) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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
    const isDefault =
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];

    if (isDefault) {
      commit("wizard/model$update", {
        path: path,
        value: name,
        force: true,
      });
    }

    item.text = name;
    item.value = name;
    return true;
  });
  return resources;
}

async function getElasticSearchVersions(
  { axios, storeGet, setDiscriminatorValue },
  group,
  version,
  resource
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null, authPlugin: null },
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
  const filteredElasticSearchVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  filteredElasticSearchVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    item.text = `${name} (${specVersion})`;
    item.value = name;
    item.authPlugin = item.spec.authPlugin;
    return true;
  });

  setDiscriminatorValue("/elasticVersions", filteredElasticSearchVersions);

  return filteredElasticSearchVersions;
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
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
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
  const modelPathValue = getValue(model, "/spec/machine");
  watchDependency("model#/spec/machine");
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

function disableConfigureOption({ model, getValue, watchDependency, itemCtx }) {
  watchDependency("model#/spec/authPlugin");
  const authPlugin = getValue(model, "/spec/authPlugin");

  if(itemCtx.value === "tls") {
    return !isSecurityEnabled({model, getValue, watchDependency});
  }
  else if(itemCtx.value === "internal-users" || itemCtx.value === "roles-mapping") {  
    return !isSecurityEnabled({model, getValue, watchDependency}) || !authPlugin || authPlugin === "X-Pack";
  }
  else if(itemCtx.value === "secure-custom-config") {
    return authPlugin !== "X-Pack";
  }
  return false;
}

function isSecurityEnabled({model, getValue, watchDependency}) {
  watchDependency("model#/spec/disableSecurity");
  const value = getValue(model, "/spec/disableSecurity");
  return !value;
}

function onDisableSecurityChange({ model, getValue }) {
  const disableSecurity = getValue(model, "/resources/kubedbComElasticsearch/spec/disableSecurity");

  if(disableSecurity) {
    commit(
      "wizard/model$delete",
      "/spec/authSecret",
    );
  }
}

return {
  onVersionChange,
	showAuthPasswordField,
	isEqualToModelPathValue,
	showAuthSecretField,
	showStorageSizeField,
	getResources,
	getStorageClassNames,
  getElasticSearchVersions,
  onCreateAuthSecretChange,
	getSecrets,
	disableLimit,
	getMachineListForOptions,
	setResourceLimit,
	setLimitsCpuOrMem,
	setMachineToCustom,
  disableConfigureOption,
  isSecurityEnabled,
  onDisableSecurityChange,
}