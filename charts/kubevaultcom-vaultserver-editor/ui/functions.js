// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
async function fetchJsons({ axios, itemCtx }) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, url, version } = itemCtx.chart;
  const urlPrefix = "/chart/packageview/files/ui";
  try {
    ui = await axios.get(
      `${urlPrefix}/create-ui.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    language = await axios.get(
      `${urlPrefix}/language.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${urlPrefix}/functions.js?name=${name}&url=${url}&version=${version}`
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

function disableLableChecker({ itemCtx }) {
  const { key } = itemCtx;
  if (key.startsWith("app.kubernetes.io") || key.includes("helm")) return true;
  else return false;
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

async function getResources(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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

function isEqualToDiscriminatorPath(
  { discriminator, getValue, watchDependency },
  value,
  discriminatorPath
) {
  watchDependency("discriminator#" + discriminatorPath);
  const discriminatorValue = getValue(discriminator, discriminatorPath);
  return discriminatorValue === value;
}

function setValueFromModel({ getValue, model }, path) {
  return getValue(model, path);
}

async function getNamespacedResourceList(
  axios,
  storeGet,
  { namespace, group, version, resource }
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`;

  let ans = [];
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    ans = items;
  } catch (e) {
    console.log(e);
  }

  return ans;
}

async function getResourceList(
  axios,
  storeGet,
  { group, version, resource }
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`;

  let ans = [];
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    ans = items;
  } catch (e) {
    console.log(e);
  }

  return ans;
}

async function resourceNames(
  { axios, getValue, model, watchDependency, storeGet },
  group,
  version,
  resource
) {
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group,
    version,
    resource,
  });

  if (resource === "secrets") {
    resources = resources.filter((item) => {
      const validType = ["kubernetes.io/service-account-token", "Opaque"];
      return validType.includes(item.type);
    });
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function unNamespacedResourceNames(
  { axios, storeGet },
  group,
  version,
  resource
) {
  let resources = await getResourceList(axios, storeGet, {
    group,
    version,
    resource,
  });

  if (resource === "secrets") {
    resources = resources.filter((item) => {
      const validType = ["kubernetes.io/service-account-token", "Opaque"];
      return validType.includes(item.type);
    });
  }

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

function returnTrue() {
  return true;
}

function returnStringYes() {
  return "yes";
}

// ************************* Basic Info **********************************************
async function getVaultServerVersions(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  };

  try {
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
  } catch (e) {
    console.log(e);
    return [];
  }
}

function onVaultBackendTypeChange({discriminator, model, getValue, commit}) {
  const backends = [
    "azure",
    "consul",
    "dynamodb",
    "etcd",
    "gcs",
    "inmem",
    "mysql",
    "postgresql",
    "raft",
    "s3",
    "swift",
  ];

  const selectedBackend = getValue(discriminator, "/backend");
  
  if(selectedBackend) {
    backends.forEach((item) => {
      if(item !== selectedBackend) {
        commit("wizard/model$delete", `/resources/kubevaultComVaultServer/spec/backend/${item}`);
      } else {
        const backendObj = getValue(model, `/resources/kubevaultComVaultServer/spec/backend/${item}`);
        if(!backendObj) {
          commit("wizard/model$update", { path: `/resources/kubevaultComVaultServer/spec/backend/${item}`, value: {}, force: true });
        }
      }
    });
  }
}

function setVaultBackendType({ model, getValue }) {
  const backend = getValue(model, "/resources/kubevaultComVaultServer/spec/backend");
  return Object.keys(backend).find(key => key);
}
        

// ************************* Allowed Secret Engines **********************************************
function setDefaultNamespaceFrom() {
  return "Same";
}

// ************************* Unsealer **********************************************
function onUnsealerModeChange({discriminator, getValue, commit}) {
  const unsealerModes = ["awsKmsSsm", "azureKeyVault", "googleKmsGcs", "kubernetesSecret"];

  const selectedMode = getValue(discriminator, "/mode");
  
  unsealerModes.forEach((item) => {
    if(item !== selectedMode) {
      commit("wizard/model$delete", `/resources/kubevaultComVaultServer/spec/unsealer/mode/${item}`);
    }
  });
}

function setUnsealerMode({ model, getValue }) {
  const unsealerMode = getValue(model, "/resources/kubevaultComVaultServer/spec/unsealer/mode");
  return Object.keys(unsealerMode).find(key => key);
}

// ************************** TLS ******************************88

function setApiGroup() {
  return "cert-manager.io";
}

async function getIssuerRefsName({
  axios,
  storeGet,
  getValue,
  model,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  watchDependency(
    "model#/resources/kubevaultComVaultServer/spec/tls/issuerRef/apiGroup"
  );
  watchDependency("model#/resources/kubevaultComVaultServer/spec/tls/issuerRef/kind");
  watchDependency("model#/metadata/release/namespace");
  const apiGroup = getValue(
    model,
    "/resources/kubevaultComVaultServer/spec/tls/issuerRef/apiGroup"
  );
  const kind = getValue(
    model,
    "/resources/kubevaultComVaultServer/spec/tls/issuerRef/kind"
  );
  const namespace = getValue(model, "/metadata/release/namespace");

  let url;
  if (kind === "Issuer") {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/namespaces/${namespace}/issuers`;
  } else if (kind === "ClusterIssuer") {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/clusterissuers`;
  }

  try {
    const resp = await axios.get(url);

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

async function hasIssuerRefName({
  axios,
  storeGet,
  getValue,
  model,
  watchDependency,
}) {
  const resp = await getIssuerRefsName({
    axios,
    storeGet,
    getValue,
    model,
    watchDependency,
  });

  return !!(resp && resp.length);
}

async function hasNoIssuerRefName({
  axios,
  storeGet,
  getValue,
  model,
  watchDependency,
}) {
  const resp = await hasIssuerRefName({
    axios,
    storeGet,
    getValue,
    model,
    watchDependency,
  });

  return !resp;
}

function setSSLMode({ model, getValue }) {
  const val = getValue(model, "/resources/kubevaultComVaultServer/spec/sslMode");
  return val || "require";
}

function showTlsConfigureSection({
  watchDependency,
  discriminator,
  getValue,
}) {
  watchDependency("discriminator#/configureTLS");
  const configureStatus = getValue(discriminator, "/configureTLS");
  return configureStatus;
}

function onTlsConfigureChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/configureTLS");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/tls",
      value: { issuerRef: {}, certificates: [] },
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubevaultComVaultServer/spec/tls");
    commit("wizard/model$delete", "/resources/kubevaultComVaultServer/spec/sslMode");
  }
}

function getAliasOptions() {
  return ["server", "client", "metrics-exporter"];
}

/****** Monitoring *********/

function showMonitoringSection({
  watchDependency,
  discriminator,
  getValue,
}) {
  watchDependency("discriminator#/enableMonitoring");
  const configureStatus = getValue(discriminator, "/enableMonitoring");
  return configureStatus;
}

function onEnableMonitoringChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/enableMonitoring");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/monitor",
      value: {},
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubevaultComVaultServer/spec/monitor");
  }
}

function showCustomizeExporterSection({
  watchDependency,
  discriminator,
  getValue,
}) {
  watchDependency("discriminator#/customizeExporter");
  const configureStatus = getValue(discriminator, "/customizeExporter");
  return configureStatus;
}

function onCustomizeExporterChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/customizeExporter");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/monitor/prometheus/exporter",
      value: {},
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/kubevaultComVaultServer/spec/monitor/prometheus/exporter"
    );
  }
}

function onNameChange({ commit, model, getValue }) {
  const dbName = getValue(model, "/metadata/release/name");

  // to reset configSecret name field
  const hasSecretConfig = getValue(model, "/resources/secret_config");
  if (hasSecretConfig) {
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/configSecret/name",
      value: `${dbName}-config`,
      force: true,
    });
  }
}

function returnFalse() {
  return false;
}

//////////////////////////////////////// Service Monitor //////////////////////////////////////////////////////

function isEqualToServiceMonitorType(
  { rootModel, watchDependency },
  value
) {
  watchDependency("rootModel#/spec/type");
  return rootModel && rootModel.spec && rootModel.spec.type === value;
}

//////////////////// custom config /////////////////
function onConfigurationSourceChange({
  getValue,
  discriminator,
  commit,
  model,
}) {
  const configurationSource = getValue(discriminator, "/configurationSource");
  if (configurationSource === "use-existing-config") {
    commit("wizard/model$delete", "/resources/secret_config");
  } else {
    const value = getValue(model, "/resources/secret_config");
    if (!value) {
      commit("wizard/model$update", {
        path: "/resources/secret_config",
        value: {},
        force: true,
      });
    }
    const configSecretName = `${getValue(
      model,
      "/metadata/release/name"
    )}-config`;
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/configSecret/name",
      value: configSecretName,
      force: true,
    });
  }
}

function onConfigurationChange({
  getValue,
  commit,
  discriminator,
  model,
}) {
  const value = getValue(discriminator, "/configuration");
  commit("wizard/model$update", {
    path: "/resources/secret_config/stringData/md-config.cnf",
    value: value,
    force: true,
  });
  const configSecretName = `${getValue(
    model,
    "/metadata/release/name"
  )}-config`;
  commit("wizard/model$update", {
    path: "/resources/kubevaultComVaultServer/spec/configSecret/name",
    value: configSecretName,
    force: true,
  });
}

function setConfigurationSource({ model, getValue }) {
  const modelValue = getValue(model, "/resources/secret_config");
  if (modelValue) {
    return "create-new-config";
  }
  return "use-existing-config";
}

function setSecretConfigNamespace({ getValue, model, watchDependency }) {
  watchDependency("model#/metadata/release/namespace");
  const namespace = getValue(model, "/metadata/release/namespace");
  return namespace;
}

function setConfiguration({ model, getValue }) {
  return getValue(model, "/resources/secret_config/stringData/md-config.cnf");
}

function setConfigurationFiles({ model, getValue }) {
  const value = getValue(model, "/resources/secret_config/data/md-config.cnf");
  return atob(value);
}

function onSetCustomConfigChange({ discriminator, getValue, commit }) {
  const value = getValue(discriminator, "/setCustomConfig");

  if(value === "no") {
    commit("wizard/model$delete", "/resources/kubevaultComVaultServer/spec/configSecret");
    commit("wizard/model$delete", "/resources/secret_config");
  }
}

return {
	fetchJsons,
	disableLableChecker,
	isEqualToModelPathValue,
	getResources,
	isEqualToDiscriminatorPath,
	setValueFromModel,
	getNamespacedResourceList,
	getResourceList,
	resourceNames,
  unNamespacedResourceNames,
  returnTrue,
  returnStringYes,
	getVaultServerVersions,
  onVaultBackendTypeChange,
  setVaultBackendType,
  setDefaultNamespaceFrom,
  onUnsealerModeChange,
  setUnsealerMode,
	setApiGroup,
	getIssuerRefsName,
	hasIssuerRefName,
	hasNoIssuerRefName,
	setSSLMode,
	showTlsConfigureSection,
	onTlsConfigureChange,
  getAliasOptions,
	showMonitoringSection,
	onEnableMonitoringChange,
	showCustomizeExporterSection,
	onCustomizeExporterChange,
	onNameChange,
	returnFalse,
	isEqualToServiceMonitorType,
	onConfigurationSourceChange,
	onConfigurationChange,
	setConfigurationSource,
	setSecretConfigNamespace,
	setConfiguration,
  setConfigurationFiles,
  onSetCustomConfigChange
}