// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
async function fetchJsons(
  { axios, itemCtx, setDiscriminatorValue },
  discriminatorPath
) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, url, version, packageviewUrlPrefix } = itemCtx.chart;
  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&url=${url}&version=${version}`
    );
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || "");
    functions = evalFunc();
  } catch (e) {
    console.log(e);
  }

  if (discriminatorPath) {
    setDiscriminatorValue(discriminatorPath, {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    });
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

async function getResources({ axios, storeGet }, group, version, resource) {
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
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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

async function getResourceList(axios, storeGet, { group, version, resource }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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

function isDedicatedModeSelected({ model, getValue, watchDependency }) {
  watchDependency("model#/resources/kubedbComKafka/spec/topology");
  isDedicatedSelected = getValue(
    model,
    "/resources/kubedbComKafka/spec/topology"
  );

  return !!isDedicatedSelected;
}

function isCombinedModeSelected({ model, getValue, watchDependency }) {
  return !isDedicatedSelected({ model, getValue, watchDependency });
}

function isDiscriminatorEqualTo(
  { discriminator, getValue, watchDependency },
  discriminatorPath,
  value
) {
  watchDependency("discriminator#" + discriminatorPath);
  const pathValue = getValue(discriminator, discriminatorPath);

  return value === pathValue;
}

// ************************* Basic Info **********************************************

async function getKafkaVersions({ axios, storeGet }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

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
  const filteredKafkaVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  filteredKafkaVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    item.text = `${name} (${specVersion})`;
    item.value = name;
    return true;
  });
  return filteredKafkaVersions;
}

function isSecurityEnabled({ model, getValue, watchDependency }) {
  watchDependency("model#/resources/kubedbComKafka/spec/disableSecurity");
  const value = getValue(
    model,
    "/resources/kubedbComKafka/spec/disableSecurity"
  );
  return !value;
}

function onDisableSecurityChange({ model, getValue, commit }) {
  const disableSecurity = getValue(
    model,
    "/resources/kubedbComKafka/spec/disableSecurity"
  );

  if (disableSecurity) {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/authSecret");
    commit("wizard/model$delete", "/resources/secret_admin_cred");
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/tls");
  }
}

function onEnableSSLChange({ model, getValue, commit }) {
  const enabelSSL = getValue(model, "/resources/kubedbComKafka/spec/enableSSL");

  if (enabelSSL === false) {
    removeCertificatesOfAliases({ model, getValue, commit }, [
      "server",
      "client",
    ]);
  }
}

function removeCertificatesOfAliases(
  { model, getValue, commit },
  aliasesToRemove
) {
  const certificates =
    getValue(model, "/resources/kubedbComKafka/spec/tls/certificates") || [];
  const updatedCertificates = certificates.filter(
    (item) => !aliasesToRemove.includes(item.alias)
  );
  commit("wizard/model$update", {
    path: "/resources/kubedbComKafka/spec/tls/certificates",
    value: updatedCertificates,
    force: true,
  });
}

/*************************************  Database Secret Section ********************************************/

function getCreateAuthSecret({ model, getValue }) {
  const authSecret = getValue(
    model,
    "/resources/kubedbComKafka/spec/authSecret"
  );

  return !authSecret;
}

function showExistingSecretSection({
  getValue,
  watchDependency,
  discriminator,
}) {
  watchDependency("discriminator#/createAuthSecret");

  const hasAuthSecretName = getValue(discriminator, "/createAuthSecret");
  return !hasAuthSecretName;
}

function showPasswordSection({ getValue, watchDependency, discriminator }) {
  return !showExistingSecretSection({
    getValue,
    watchDependency,
    discriminator,
  });
}

function setAuthSecretPassword({ model, getValue }) {
  const encodedPassword = getValue(
    model,
    "/resources/secret_admin_cred/data/password"
  );
  return encodedPassword ? decodePassword({}, encodedPassword) : "";
}

function onAuthSecretPasswordChange({ getValue, discriminator, commit }) {
  const stringPassword = getValue(discriminator, "/password");

  if (stringPassword) {
    commit("wizard/model$update", {
      path: "/resources/secret_admin_cred/data/password",
      value: encodePassword({}, stringPassword),
      force: true,
    });
    commit("wizard/model$update", {
      path: "/resources/secret_admin_cred/data/username",
      value: encodePassword({}, "admin"),
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/secret_admin_cred");
  }
}

// eslint-disable-next-line no-empty-pattern
function encodePassword({}, value) {
  return btoa(value);
}

// eslint-disable-next-line no-empty-pattern
function decodePassword({}, value) {
  return atob(value);
}

function onCreateAuthSecretChange({ discriminator, getValue, commit }) {
  const createAuthSecret = getValue(discriminator, "/createAuthSecret");
  if (createAuthSecret) {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/authSecret");
  } else if (createAuthSecret === false) {
    commit("wizard/model$delete", "/resources/secret_admin_cred");
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

  try {
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
  } catch (e) {
    console.log(e);
    return [];
  }
}

function showSecretSection({ model, getValue, watchDependency, storeGet }) {
  const steps = storeGet("/wizard/configureOptions");

  return (
    !steps.includes("internal-users") &&
    isSecurityEnabled({ model, getValue, watchDependency })
  );
}

// ********************* Database Mode ***********************
function isNotCombinedMode({ discriminator, getValue, watchDependency }) {
  watchDependency("discriminator#/activeDatabaseMode");
  const mode = getValue(discriminator, "/activeDatabaseMode");
  return mode !== "Combined";
}

function setDatabaseMode({ model, getValue }) {
  isDedicatedSelected = getValue(
    model,
    "/resources/kubedbComKafka/spec/topology"
  );
  if (isDedicatedSelected) {
    return "Dedicated";
  } else {
    return "Combined";
  }
}

async function getStorageClassNames(
  { axios, storeGet, commit, setDiscriminatorValue, getValue, model },
  path
) {
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
    const isDefault =
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];

    if (isDefault && path) {
      const className = getValue(model, path);
      if (!className) {
        commit("wizard/model$update", {
          path: path,
          value: name,
          force: true,
        });
      }
    }

    item.text = name;
    item.value = name;
    return true;
  });

  if (!path) {
    setDiscriminatorValue("/storageClasses", resources);
  }

  return resources;
}

function deleteDatabaseModePath({ discriminator, getValue, commit }) {
  const mode = getValue(discriminator, "/activeDatabaseMode");
  if (mode === "Dedicated") {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/replicas");
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/storage");
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/podTemplate");
  } else if (mode === "Combined") {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/topology");
  }
}

function isEqualToDatabaseMode(
  { getValue, watchDependency, discriminator },
  value
) {
  watchDependency("discriminator#/activeDatabaseMode");
  const mode = getValue(discriminator, "/activeDatabaseMode");

  return mode === value;
}

function getStorageClassNamesFromDiscriminator(
  { model, discriminator, getValue, watchDependency, commit },
  path
) {
  watchDependency("discriminator#/storageClasses");
  const options = getValue(discriminator, "/storageClasses") || [];

  const val = getValue(model, path || "");

  options.forEach((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const isDefault =
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];

    if (isDefault && path && !val) {
      commit("wizard/model$update", {
        path: path,
        value: name,
        force: true,
      });
    }
  });

  return options;
}

// ************************** TLS *******************************************

function setApiGroup() {
  return "cert-manager.io";
}

function setApiGroupEdit({ model, getValue }) {
  const kind = getValue(
    model,
    "/resources/kubedbComKafka/spec/tls/issuerRef/kind"
  );
  const name = getValue(
    model,
    "/resources/kubedbComKafka/spec/tls/issuerRef/name"
  );
  return kind && name ? "cert-manager.io" : "";
}

async function getIssuerRefsName({
  axios,
  storeGet,
  getValue,
  model,
  watchDependency,
}) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  watchDependency(
    "model#/resources/kubedbComKafka/spec/tls/issuerRef/apiGroup"
  );
  watchDependency("model#/resources/kubedbComKafka/spec/tls/issuerRef/kind");
  watchDependency("model#/metadata/release/namespace");
  const apiGroup = getValue(
    model,
    "/resources/kubedbComKafka/spec/tls/issuerRef/apiGroup"
  );
  const kind = getValue(
    model,
    "/resources/kubedbComKafka/spec/tls/issuerRef/kind"
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

function setClusterAuthMode({ model, getValue }) {
  const val = getValue(model, "/resources/kubedbComKafka/spec/clusterAuthMode");
  return val || "x509";
}

function setSSLMode({ model, getValue }) {
  const val = getValue(model, "/resources/kubedbComKafka/spec/sslMode");
  return val || "requireSSL";
}

function showTlsConfigureSection({ watchDependency, model, getValue }) {
  watchDependency("model#/resources/kubedbComKafka/spec/enableSSL");
  const configureStatus = getValue(
    model,
    "/resources/kubedbComKafka/spec/enableSSL"
  );
  return configureStatus;
}

function onTlsConfigureChange({ model, getValue, commit }) {
  const configureStatus = getValue(
    model,
    "/resources/kubedbComKafka/spec/enableSSL"
  );
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComKafka/spec/tls",
      value: { issuerRef: {}, certificates: [] },
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/tls");
  }
}

async function showTlsRecommendation({ axios, storeGet }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/cert-manager.io/v1/issuers`;

  try {
    await axios.get(url, {
      params: { filter: { items: { metadata: { name: null } } } },
    });
    return false;
  } catch (err) {
    // if any error response status is 404 or not
    if (err.response && err.response.status === 404) {
      resp = false;
    }
    console.log(err);
    return true;
  }
}

async function getAliasOptions({ model, getValue, watchDependency }) {
  watchDependency("model#/resources/kubedbComKafka/spec/enableSSL");
  watchDependency("model#/resources/kubedbComKafka/spec/monitor");

  const enableSSL = getValue(model, "/resources/kubedbComKafka/spec/enableSSL");

  // always include transport cert alias
  const aliases = [];

  if (enableSSL) {
    aliases.push("server");
    aliases.push("client");
  }

  return aliases;
}

/****** Monitoring *********/

function showMonitoringSection({ watchDependency, discriminator, getValue }) {
  watchDependency("discriminator#/enableMonitoring");
  const configureStatus = getValue(discriminator, "/enableMonitoring");
  return configureStatus;
}

function onEnableMonitoringChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/enableMonitoring");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComKafka/spec/monitor",
      value: {},
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubedbComKafka/spec/monitor");
  }
}

function isValueExistInModel({ model, getValue }, path) {
  const modelValue = getValue(model, path);
  return !!modelValue;
}

function onNamespaceChange({ commit, model, getValue }) {
  const namespace = getValue(model, "/metadata/release/namespace");
  const agent = getValue(model, "/resources/kubedbComKafka/spec/monitor/agent");
  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames",
      value: [namespace],
      force: true,
    });
  }
}

function onLabelChange({ commit, model, getValue }) {
  const labels = getValue(
    model,
    "/resources/kubedbComKafka/spec/metadata/labels"
  );

  const agent = getValue(model, "/resources/kubedbComKafka/spec/monitor/agent");

  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels",
      value: labels,
      force: true,
    });
  }
}

function onNameChange({ commit, model, getValue }) {
  const dbName = getValue(model, "/metadata/release/name");

  const agent = getValue(model, "/resources/kubedbComKafka/spec/monitor/agent");

  const labels = getValue(
    model,
    "/resources/kubedbComKafka/spec/metadata/labels"
  );

  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels",
      value: labels,
      force: true,
    });
  }

  const scheduleBackup = getValue(
    model,
    "/resources/stashAppscodeComBackupConfiguration"
  );

  if (scheduleBackup) {
    commit("wizard/model$update", {
      path: "/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name",
      value: dbName,
      force: true,
    });
    const creatingNewRepo = getValue(
      model,
      "/resources/stashAppscodeComRepository_repo"
    );
    if (creatingNewRepo) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration/spec/repository/name",
        value: `${dbName}-repo`,
        force: true,
      });
    }
  }

  const prePopulateDatabase = getValue(
    model,
    "/resources/stashAppscodeComRestoreSession_init"
  );

  if (prePopulateDatabase) {
    commit("wizard/model$update", {
      path: "/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name",
      value: dbName,
      force: true,
    });
    const creatingNewRepo = getValue(
      model,
      "/resources/stashAppscodeComRepository_init_repo"
    );
    if (creatingNewRepo) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init/spec/repository/name",
        value: `${dbName}-init-repo`,
        force: true,
      });
    }
  }

  // to reset configSecret name field
  const hasSecretConfig = getValue(model, "/resources/secret_user_config");
  if (hasSecretConfig) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComKafka/spec/configSecret/name",
      value: `${dbName}-config`,
      force: true,
    });
  }
}

function returnFalse() {
  return false;
}

function onAgentChange({ commit, model, getValue }) {
  const agent = getValue(model, "/resources/kubedbComKafka/spec/monitor/agent");

  if (!agent) {
    removeCertificatesOfAliases({ model, getValue, commit }, [
      "metrics-exporter",
    ]);
  }

  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/endpoints",
      value: [],
      force: true,
    });

    onNamespaceChange({ commit, model, getValue });
    onLabelChange({ commit, model, getValue });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/monitoringCoreosComServiceMonitor"
    );
  }
}

//////////////////// service monitor ///////////////////

function isEqualToServiceMonitorType({ rootModel, watchDependency }, value) {
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
    commit("wizard/model$delete", "/resources/secret_user_config");
    commit("wizard/model$delete", "/resources/config_secret");
  } else {
    const value = getValue(model, "/resources/secret_user_config");
    if (!value) {
      commit("wizard/model$update", {
        path: "/resources/secret_user_config",
        value: {},
        force: true,
      });
    }
    const configSecretName = `${getValue(
      model,
      "/metadata/release/name"
    )}-config`;
    commit("wizard/model$update", {
      path: "/resources/kubedbComKafka/spec/configSecret/name",
      value: configSecretName,
      force: true,
    });
  }
}

function setConfigurationSource({ model, getValue }) {
  const modelValue = getValue(model, "/resources/secret_user_config");
  if (modelValue) {
    return "create-new-config";
  }
  return "use-existing-config";
}

function setConfigFiles({
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  watchDependency("model#/resources/secret_user_config/stringData");
  const configFiles = getValue(
    model,
    "/resources/secret_user_config/stringData"
  );

  const files = [];

  for (const item in configFiles) {
    const obj = {};
    obj.key = item;
    obj.value = configFiles[item];
    files.push(obj);
  }

  setDiscriminatorValue("/configFiles", files);

  return files;
}

function onConfigFilesChange({ discriminator, getValue, commit }) {
  const files = getValue(discriminator, "/configFiles");

  const configFiles = {};

  if (files) {
    files.forEach((item) => {
      const { key, value } = item;
      configFiles[key] = value;
    });
  }

  commit("wizard/model$update", {
    path: "/resources/secret_user_config/stringData",
    value: configFiles,
    force: true,
  });
}

function onSetCustomConfigChange({ discriminator, getValue, commit }) {
  const value = getValue(discriminator, "/setCustomConfig");

  if (value === "no") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComKafka/spec/configSecret"
    );
    commit("wizard/model$delete", "/resources/secret_user_config");
  }
}

function initSetCustomConfig({ model, getValue }) {
  const configSecret = getValue(
    model,
    "/resources/kubedbComKafka/spec/configSecret/name"
  );

  if (configSecret) return "yes";
  else return "no";
}

function getOpsRequestUrl({ storeGet, model, getValue, mode }, reqType) {
  const cluster = storeGet("/route/params/cluster");
  const domain = storeGet("/domain") || "";
  const owner = storeGet("/route/params/user");
  const dbname = getValue(model, "/metadata/release/name");
  const group = getValue(model, "/metadata/resource/group");
  const kind = getValue(model, "/metadata/resource/kind");
  const namespace = getValue(model, "/metadata/release/namespace");
  const resource = getValue(model, "/metadata/resource/name");
  const version = getValue(model, "/metadata/resource/version");
  const routeRootPath = storeGet("/route/path");
  const pathPrefix = `${domain}${routeRootPath}`;

  if (mode === "standalone-step")
    return `${pathPrefix}?namespace=${namespace}&applyAction=create-opsrequest-${reqType.toLowerCase()}`;
  else
    return `${domain}/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/kafkaopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=${reqType}`;
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
  isDedicatedModeSelected,
  isCombinedModeSelected,
  isDiscriminatorEqualTo,
  getKafkaVersions,
  isSecurityEnabled,
  onDisableSecurityChange,
  onEnableSSLChange,
  removeCertificatesOfAliases,
  setDatabaseMode,
  getStorageClassNames,
  getStorageClassNamesFromDiscriminator,
  deleteDatabaseModePath,
  isEqualToDatabaseMode,
  setApiGroup,
  setApiGroupEdit,
  getIssuerRefsName,
  hasIssuerRefName,
  hasNoIssuerRefName,
  setClusterAuthMode,
  setSSLMode,
  showTlsConfigureSection,
  onTlsConfigureChange,
  showTlsRecommendation,
  getAliasOptions,
  showMonitoringSection,
  onEnableMonitoringChange,
  isValueExistInModel,
  onNamespaceChange,
  onLabelChange,
  onNameChange,
  returnFalse,
  onAgentChange,
  getCreateAuthSecret,
  showExistingSecretSection,
  showPasswordSection,
  encodePassword,
  decodePassword,
  onCreateAuthSecretChange,
  setAuthSecretPassword,
  onAuthSecretPasswordChange,
  showSecretSection,
  getSecrets,
  isEqualToServiceMonitorType,
  onConfigurationSourceChange,
  setConfigurationSource,
  setConfigFiles,
  onConfigFilesChange,
  onSetCustomConfigChange,
  initSetCustomConfig,
  getOpsRequestUrl,
  getCreateNameSpaceUrl,
};
