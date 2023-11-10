// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
async function fetchJsons(
  { axios, itemCtx, setDiscriminatorValue },
  discriminatorPath
) {
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
  watchDependency("model#/resources/kubedbComElasticsearch/spec/topology");
  isDedicatedSelected = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/topology"
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

function isAuthPluginNotSearchGuard({
  discriminator,
  getValue,
  watchDependency,
  commit,
}) {
  watchDependency("discriminator#/selectedVersionAuthPlugin");
  const pathValue = getValue(discriminator, "/selectedVersionAuthPlugin");

  if (!pathValue) return false;

  const ret = pathValue !== "SearchGuard" && pathValue !== "";

  if (!ret) {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/topology/dataWarm"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/topology/dataHot"
    );
  }
  return ret;
}

// required for outer form section. where discriminator can not be saved
async function showInternalUsersAndRolesMapping({
  model,
  getValue,
  watchDependency,
  axios,
  storeGet,
  setDiscriminatorValue,
  commit,
}) {
  watchDependency(
    "model#/resources/kubedbComElasticsearch/spec/disableSecurity"
  );
  watchDependency("model#/resources/kubedbComElasticsearch/spec/version");

  const dist = await getSelectedVersionAuthPlugin({
    model,
    getValue,
    watchDependency,
    axios,
    storeGet,
    setDiscriminatorValue,
  });

  const ret =
    (dist === "OpenDistro" || dist === "SearchGuard") &&
    isSecurityEnabled({ model, getValue, watchDependency });

  if (ret) {
    commit("wizard/showSteps$update", {
      stepId: "internal-users",
      show: true,
    });

    commit("wizard/showSteps$update", {
      stepId: "roles-mapping",
      show: true,
    });
  } else {
    commit("wizard/showSteps$update", {
      stepId: "internal-users",
      show: false,
    });

    commit("wizard/showSteps$update", {
      stepId: "roles-mapping",
      show: false,
    });
  }
  return ret;
}

// required for outer form section. where discriminator can not be saved
async function showSecureCustomConfig({
  model,
  getValue,
  watchDependency,
  axios,
  storeGet,
  setDiscriminatorValue,
  commit,
}) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/version");

  const dist = await getSelectedVersionAuthPlugin({
    model,
    getValue,
    watchDependency,
    axios,
    storeGet,
    setDiscriminatorValue,
  });

  const ret = dist === "X-Pack";

  if (ret) {
    commit("wizard/showSteps$update", {
      stepId: "secure-custom-config",
      show: true,
    });
  } else {
    commit("wizard/showSteps$update", {
      stepId: "secure-custom-config",
      show: false,
    });

    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/secureConfigSecret"
    );
    commit("wizard/model$delete", "/resources/secret_secure_config");
  }
  return ret;
}

// ************************* Basic Info **********************************************

async function getElasticSearchVersions(
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
    return true;
  });
  return filteredElasticSearchVersions;
}

function isSecurityEnabled({ model, getValue, watchDependency }) {
  watchDependency(
    "model#/resources/kubedbComElasticsearch/spec/disableSecurity"
  );
  const value = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/disableSecurity"
  );
  return !value;
}

function onDisableSecurityChange({ model, getValue, commit }) {
  const disableSecurity = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/disableSecurity"
  );

  if (disableSecurity) {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/authSecret"
    );
    commit("wizard/model$delete", "/resources/secret_admin_cred");
    commit("wizard/model$delete", "/resources/secret_elastic_cred");
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/internalUsers"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/rolesMapping"
    );
    commit("wizard/model$delete", "/resources/kubedbComElasticsearch/spec/tls");
  }
}

async function onVersionChange({
  model,
  getValue,
  watchDependency,
  axios,
  storeGet,
  commit,
  setDiscriminatorValue,
}) {
  const dist = await getSelectedVersionAuthPlugin({
    model,
    getValue,
    watchDependency,
    axios,
    storeGet,
    setDiscriminatorValue,
  });

  const isOpenDistro = dist === "OpenDistro";
  const isSearchGuard = dist === "SearchGuard";
  const isXpack = dist === "X-Pack";

  if (!isOpenDistro && !isSearchGuard) {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/internalUsers"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/rolesMapping"
    );
    if (isXpack) {
      removeCertificatesOfAliases({ model, getValue, commit }, ["admin"]);
    }
  } else {
    if (!isOpenDistro) {
      const internalUsers = getValue(
        model,
        "/resources/kubedbComElasticsearch/spec/internalUsers"
      );

      if (internalUsers) {
        Object.keys(internalUsers).map((key) => {
          if (internalUsers[key]?.opendistroSecurityRoles)
            delete internalUsers[key]?.opendistroSecurityRoles;
        });
      }

      commit("wizard/model$update", {
        path: "/resources/kubedbComElasticsearch/spec/internalUsers",
        value: internalUsers,
        force: true,
      });
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/dataHot"
      );
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/dataWarm"
      );
    }
    if (!isSearchGuard) {
      const internalUsers = getValue(
        model,
        "/resources/kubedbComElasticsearch/spec/internalUsers"
      );

      if (internalUsers) {
        Object.keys(internalUsers).map((key) => {
          if (internalUsers[key]?.searchGuardRoles)
            delete internalUsers[key]?.searchGuardRoles;
        });
      }

      commit("wizard/model$update", {
        path: "/resources/kubedbComElasticsearch/spec/internalUsers",
        value: internalUsers,
        force: true,
      });
    }

    if (!isXpack) {
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/dataCold"
      );
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/dataContent"
      );
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/dataFrozen"
      );
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/ml"
      );
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/topology/transform"
      );
    }
  }
}

function onEnableSSLChange({ model, getValue, commit }) {
  const enabelSSL = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/enableSSL"
  );

  if (enabelSSL === false) {
    removeCertificatesOfAliases({ model, getValue, commit }, [
      "http",
      "archiver",
      "metrics-exporter",
    ]);
  }
}

function removeCertificatesOfAliases(
  { model, getValue, commit },
  aliasesToRemove
) {
  const certificates =
    getValue(
      model,
      "/resources/kubedbComElasticsearch/spec/tls/certificates"
    ) || [];
  const updatedCertificates = certificates.filter(
    (item) => !aliasesToRemove.includes(item.alias)
  );
  commit("wizard/model$update", {
    path: "/resources/kubedbComElasticsearch/spec/tls/certificates",
    value: updatedCertificates,
    force: true,
  });
}

/*************************************  Database Secret Section ********************************************/

function getCreateAuthSecret({ model, getValue }) {
  const authSecret = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/authSecret"
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

function setAuthSecretPassword({
  model,
  getValue,
  watchDependency,
  discriminator,
  commit,
}) {
  watchDependency("discriminator#/selectedVersionAuthPlugin");

  const dist = getValue(discriminator, "/selectedVersionAuthPlugin");
  if (dist) {
    if (dist === "X-Pack") {
      const encodedPassword = getValue(
        model,
        "/resources/secret_elastic_cred/data/password"
      );
      commit("wizard/model$delete", "/resources/secret_admin_cred");
      return encodedPassword ? decodePassword({}, encodedPassword) : "";
    } else {
      const encodedPassword = getValue(
        model,
        "/resources/secret_admin_cred/data/password"
      );
      commit("wizard/model$delete", "/resources/secret_elastic_cred");
      return encodedPassword ? decodePassword({}, encodedPassword) : "";
    }
  }
}

function onAuthSecretPasswordChange({ getValue, discriminator, commit }) {
  const stringPassword = getValue(discriminator, "/password");
  const dist = getValue(discriminator, "/selectedVersionAuthPlugin");

  if (dist) {
    if (stringPassword) {
      if (dist === "X-Pack") {
        commit("wizard/model$update", {
          path: "/resources/secret_elastic_cred/data/password",
          value: encodePassword({}, stringPassword),
          force: true,
        });
        commit("wizard/model$update", {
          path: "/resources/secret_elastic_cred/data/username",
          value: encodePassword({}, "elastic"),
          force: true,
        });
        commit("wizard/model$delete", "/resources/secret_admin_cred");
      } else {
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
        commit("wizard/model$delete", "/resources/secret_elastic_cred");
      }
    } else {
      commit("wizard/model$delete", "/resources/secret_admin_cred");
      commit("wizard/model$delete", "/resources/secret_elastic_cred");
    }
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
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/authSecret"
    );
  } else if (createAuthSecret === false) {
    commit("wizard/model$delete", "/resources/secret_admin_cred");
    commit("wizard/model$delete", "/resources/secret_elastic_cred");
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
    "/resources/kubedbComElasticsearch/spec/topology"
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
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/replicas"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/storage"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/maxUnavailable"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/podTemplate"
    );
  } else if (mode === "Combined") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/topology"
    );
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

function getMaxUnavailableOptions(
  { model, getValue, watchDependency, commit, elementUi },
  path
) {
  let prefixPath;
  if (path) {
    prefixPath = path;
  } else {
    const { $ref } = elementUi.schema || {};
    const replacedPath = ($ref || "").replace(
      "schema#/properties/resources/properties/kubedbComElasticsearch/properties/spec/properties/topology/properties/",
      ""
    );
    const dyn = replacedPath.split("/").shift();
    prefixPath = `/resources/kubedbComElasticsearch/spec/topology/${dyn}`;
  }

  watchDependency(`model#${prefixPath}/replicas`);

  const replicas = getValue(model, `${prefixPath}/replicas`);
  const maxUnavailable = getValue(model, `${prefixPath}/maxUnavailable`);

  if (maxUnavailable > replicas) {
    commit("wizard/model$update", {
      path: `${prefixPath}/maxUnavailable`,
      value: replicas,
      force: true,
    });
  }

  const options = [];

  for (let i = 0; i <= Math.min(replicas, 1000); i++) {
    options.push(i);
  }
  return options;
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

async function getSelectedVersionAuthPlugin(
  { model, getValue, watchDependency, axios, storeGet, setDiscriminatorValue },
  path
) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/version");
  const version =
    getValue(model, "/resources/kubedbComElasticsearch/spec/version") || "";

  const elasticVersions = await getElasticSearchVersions(
    { axios, storeGet },
    "catalog.kubedb.com",
    "v1alpha1",
    "elasticsearchversions"
  );

  const selectedVersion = elasticVersions?.find(
    (item) => item.value === version
  );

  const ret = selectedVersion?.spec?.authPlugin || "";

  if (path) {
    setDiscriminatorValue(path, ret);
  }

  return ret;
}

function onNodeSwitchFalse({ elementSchema, commit }) {
  const { $ref } = elementSchema || {};
  const node = ($ref || "").split("/").pop();
  commit(
    "wizard/model$delete",
    `/resources/kubedbComElasticsearch/spec/topology/${node}`
  );
}

function hasTopologyNode({ model, getValue, itemCtx }) {
  const nodeValue = getValue(
    model,
    `/resources/kubedbComElasticsearch/spec/topology/${itemCtx}`
  );

  return !nodeValue;
}

function hideNode({ itemCtx, discriminator, getValue, watchDependency }) {
  watchDependency("discriminator#/selectedVersionAuthPlugin");
  const authPlugin = getValue(discriminator, "/selectedVersionAuthPlugin");

  let hiddenNodes = ["coordinating"];

  if (authPlugin === "OpenDistro") {
    hiddenNodes = [
      "coordinating",
      "ml",
      "dataCold",
      "dataFrozen",
      "dataContent",
      "transform",
    ];
  } else if (authPlugin === "SearchGuard") {
    hiddenNodes = [
      "coordinating",
      "ml",
      "dataWarm",
      "dataHot",
      "dataCold",
      "dataFrozen",
      "dataContent",
      "transform",
    ];
  }

  const verd = hiddenNodes.includes(itemCtx);
  return verd;
}

function setInitialStatusFalse({ elementSchema }) {
  const disableNodes = ["master", "data", "ingest"];
  const { $ref } = elementSchema || {};
  const node = ($ref || "").split("/").pop();
  return !disableNodes.includes(node);
}

function disableNode({ elementSchema }) {
  const disableNodes = ["master", "data", "ingest"];
  const { $ref } = elementSchema || {};
  const node = ($ref || "").split("/").pop();
  return disableNodes.includes(node);
}

// ************************** Internal Users ********************************

const defaultUsers = [
  "admin",
  "kibanaro",
  "kibanaserver",
  "logstash",
  "readall",
  "snapshotrestore",
  "metrics_exporter",
];

function onInternalUsersChange({ discriminator, getValue, commit }) {
  const users = getValue(discriminator, "/internalUsers");

  const internalUsers = {};

  if (users) {
    users.forEach((item) => {
      const { username, createCred, secretName, password, ...obj } = item;
      if (createCred === "no") {
        obj.secretName = secretName;
        commit("wizard/model$delete", `/resources/secret_${username}_cred`);
      } else if (createCred === "yes") {
        if (password) {
          commit("wizard/model$update", {
            path: `/resources/secret_${username}_cred/data/password`,
            value: encodePassword({}, password),
            force: true,
          });
          commit("wizard/model$update", {
            path: `/resources/secret_${username}_cred/data/username`,
            value: encodePassword({}, username),
            force: true,
          });
        } else {
          commit("wizard/model$delete", `/resources/secret_${username}_cred`);
        }
      }
      internalUsers[username] = obj;
    });
  }

  if (Object.keys(internalUsers).length) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/internalUsers",
      value: internalUsers,
      force: true,
    });
  } else {
    // on initial call discriminator value is undefined
    // to ignore model$delete for this case,
    // users value checking is required,
    // model$delete will be executed only if users value is not falsy value (empty array)
    // and internalUsers is emptyObject
    if (users)
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/internalUsers"
      );
  }
}

function setInternalUsers({
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/internalUsers");
  const internalUsers = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/internalUsers"
  );

  const users = [];

  for (const item in internalUsers) {
    internalUsers[item].username = item;
    const encodedPassword = getValue(
      model,
      `/resources/secret_${item}_cred/data/password`
    );
    if (internalUsers[item].secretName) {
      internalUsers[item].createCred = "no";
    } else {
      if (encodedPassword) {
        internalUsers[item].password = decodePassword({}, encodedPassword);
      }
      internalUsers[item].createCred = "yes";
    }
    users.push(internalUsers[item]);
  }

  setDiscriminatorValue("/internalUsers", users);

  return users;
}

function validateNewUser({ itemCtx }) {
  if (defaultUsers.includes(itemCtx.username) && itemCtx.isCreate) {
    return { isInvalid: true, message: "Can't use this username" };
  }
  return {};
}

function disableUsername({ rootModel }) {
  return defaultUsers.includes(rootModel && rootModel.username);
}

function disableUserEdit({ itemCtx }) {
  if (defaultUsers.includes(itemCtx.username)) {
    return { isEditDisabled: false, isDeleteDisabled: true };
  }
  return {};
}

async function isAuthPluginEqualTo(
  { model, getValue, watchDependency, axios, storeGet, setDiscriminatorValue },
  authPlugin
) {
  const dist = await getSelectedVersionAuthPlugin({
    model,
    getValue,
    watchDependency,
    axios,
    storeGet,
    setDiscriminatorValue,
  });
  return dist === authPlugin;
}

// internal user cred
function showPasswordCredSection({ rootModel, getValue, watchDependency }) {
  watchDependency("rootModel#/createCred");
  const createCred = getValue(rootModel, "/createCred");

  return createCred === "yes";
}

function showExistingCredSection({ rootModel, getValue, watchDependency }) {
  return !showPasswordCredSection({ rootModel, getValue, watchDependency });
}

function disableRoleDeletion({ itemCtx, rootModel }) {
  return itemCtx === "admin" && rootModel.username === "admin";
}

// ************************** Roles Mapping ********************************

const defaultRoles = ["readall_and_monitor"];

function onRolesMappingChange({ discriminator, getValue, commit }) {
  const roles = getValue(discriminator, "/rolesMapping");

  const rolesMapping = {};

  if (roles) {
    roles.forEach((item) => {
      const { roleName, ...obj } = item;
      rolesMapping[roleName] = obj;
    });
  }

  if (Object.keys(rolesMapping).length) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/rolesMapping",
      value: rolesMapping,
      force: true,
    });
  } else {
    // on initial call discriminator value is undefined
    // to ignore model$delete for this case,
    // roles value checking is required,
    // model$delete will be executed only if roles value is not falsy value (empty array)
    // and rolesMapping is emptyObject
    if (roles)
      commit(
        "wizard/model$delete",
        "/resources/kubedbComElasticsearch/spec/rolesMapping"
      );
  }
}

function setRolesMapping({
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/rolesMapping");
  const rolesMapping = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/rolesMapping"
  );

  const roles = [];

  for (const item in rolesMapping) {
    rolesMapping[item].roleName = item;
    roles.push(rolesMapping[item]);
  }

  setDiscriminatorValue("/rolesMapping", roles);

  return roles;
}

function disableRolesEdit({ itemCtx }) {
  if (defaultRoles.includes(itemCtx.roleName)) {
    return { isEditDisabled: false, isDeleteDisabled: true };
  }
  return {};
}

function disableRoleName({ rootModel }) {
  return defaultRoles.includes(rootModel && rootModel.roleName);
}

function validateNewRole({ itemCtx }) {
  if (defaultRoles.includes(itemCtx.roleName) && itemCtx.isCreate) {
    return { isInvalid: true, message: "Can't use this role name" };
  }
  return {};
}

function getInternalUsers({ model, getValue, watchDependency }) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/internalUsers");
  const internalUsers = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/internalUsers"
  );

  return Object.keys(internalUsers);
}

function disableUserDeletion({ itemCtx, rootModel }) {
  return (
    itemCtx.value === "metrics_exporter" &&
    rootModel.roleName === "readall_and_monitor"
  );
}

// ************************* Kernel Settings *********************************

function onCustomizeKernelSettingChange({ discriminator, getValue, commit }) {
  const customizeKernelSettings = getValue(
    discriminator,
    "/customizeKernelSettings"
  );

  if (customizeKernelSettings === "no") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/kernelSettings"
    );
  } else if (customizeKernelSettings === "disable") {
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/kernelSettings",
      value: {},
      force: true,
    });
  }
}

// ************************** TLS *******************************************

function setApiGroup() {
  return "cert-manager.io";
}

function setApiGroupEdit({ model, getValue }) {
  const kind = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/tls/issuerRef/kind"
  );
  const name = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/tls/issuerRef/name"
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
    "model#/resources/kubedbComElasticsearch/spec/tls/issuerRef/apiGroup"
  );
  watchDependency(
    "model#/resources/kubedbComElasticsearch/spec/tls/issuerRef/kind"
  );
  watchDependency("model#/metadata/release/namespace");
  const apiGroup = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/tls/issuerRef/apiGroup"
  );
  const kind = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/tls/issuerRef/kind"
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
  const val = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/clusterAuthMode"
  );
  return val || "x509";
}

function setSSLMode({ model, getValue }) {
  const val = getValue(model, "/resources/kubedbComElasticsearch/spec/sslMode");
  return val || "requireSSL";
}

function showTlsConfigureSection({ watchDependency, discriminator, getValue }) {
  watchDependency("discriminator#/configureTLS");
  const configureStatus = getValue(discriminator, "/configureTLS");
  return configureStatus;
}

function onTlsConfigureChange({ discriminator, getValue, commit }) {
  const configureStatus = getValue(discriminator, "/configureTLS");
  if (configureStatus) {
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/tls",
      value: { issuerRef: {}, certificates: [] },
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/kubedbComElasticsearch/spec/tls");
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/clusterAuthMode"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/sslMode"
    );
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

async function getAliasOptions({
  model,
  getValue,
  watchDependency,
  axios,
  storeGet,
  setDiscriminatorValue,
}) {
  watchDependency("model#/resources/kubedbComElasticsearch/spec/enableSSL");
  watchDependency("model#/resources/kubedbComElasticsearch/spec/monitor");

  const enableSSL = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/enableSSL"
  );
  const monitor = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/monitor"
  );
  const authPlugin = await getSelectedVersionAuthPlugin({
    model,
    getValue,
    watchDependency,
    axios,
    storeGet,
    setDiscriminatorValue,
  });

  // always include transport cert alias
  const aliases = ["transport"];

  if (authPlugin !== "X-Pack") {
    aliases.push("admin");
  }

  if (enableSSL) {
    aliases.push("http");
    aliases.push("archiver");
    if (monitor) {
      aliases.push("metrics-exporter");
    }
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
      path: "/resources/kubedbComElasticsearch/spec/monitor",
      value: {},
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/monitor"
    );
  }

  // update alert value depend on monitoring profile
  commit("wizard/model$update", {
    path: "/form/alert/enabled",
    value: configureStatus ? 'warning' : 'none',
    force: true
  });
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
      path: "/resources/kubedbComElasticsearch/spec/monitor/prometheus/exporter",
      value: {},
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/monitor/prometheus/exporter"
    );
  }
}

// ********************************* Initialization & Backup *************************************
const stashAppscodeComRestoreSession_init = {
  spec: {
    repository: {
      name: "",
    },
    rules: [
      {
        snapshots: ["latest"],
      },
    ],
    target: {
      ref: {
        apiVersion: "appcatalog.appscode.com/v1alpha1",
        kind: "AppBinding",
        name: "",
      },
    },
  },
};
const initScript = {
  scriptPath: "",
  secret: {
    secretName: "",
  },
};
const stashAppscodeComRepository_init_repo = {
  spec: {
    backend: {
      gcs: {
        bucket: "",
        prefix: "",
      },
      storageSecretName: "",
    },
  },
};
const stashAppscodeComRepository_repo = {
  spec: {
    backend: {
      gcs: {
        bucket: "",
        prefix: "",
      },
      storageSecretName: "",
    },
  },
};
const restoreSessionInitRunTimeSettings = {
  container: {
    resources: {
      requests: {
        cpu: "",
        memory: "",
      },
      limits: {
        cpu: "",
        memory: "",
      },
    },
    nice: {
      adjustment: null,
    },
    ionice: {
      class: null,
      classData: null,
    },
    securityContext: {
      privileged: false,
      runAsNonRoot: false,
      runAsUser: null,
      runAsGroup: null,
      seLinuxOptions: {
        level: "",
        role: "",
        type: "",
        user: "",
      },
    },
    env: [],
    envFrom: [],
  },
  pod: {
    serviceAccountName: "",
    imagePullSecrets: [],
    securityContext: {
      fsGroup: null,
      runAsNonRoot: false,
      runAsUser: null,
      runAsGroup: null,
      seLinuxOptions: {
        level: "",
        role: "",
        type: "",
        user: "",
      },
    },
  },
};

const stashAppscodeComBackupConfiguration = {
  spec: {
    repository: {
      name: "",
    },
    retentionPolicy: {
      keepLast: 5,
      name: "keep-last-5",
      prune: true,
    },
    schedule: "*/5 * * * *",
    target: {
      ref: {
        apiVersion: "appcatalog.appscode.com/v1alpha1",
        kind: "AppBinding",
        name: "",
      },
    },
  },
};

function disableInitializationSection({ model, getValue, watchDependency }) {
  const initialized = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/initialized"
  );
  watchDependency(
    "model#/resources/kubedbComElasticsearch/spec/init/initialized"
  );
  return !!initialized;
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  if (val) return true;
  else return false;
}

function initPrePopulateDatabase({ getValue, model }) {
  const waitForInitialRestore = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/waitForInitialRestore"
  );
  const stashAppscodeComRestoreSession_init = getValue(
    model,
    "/resources/stashAppscodeComRestoreSession_init"
  );
  const script = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/script"
  );

  return waitForInitialRestore ||
    !!stashAppscodeComRestoreSession_init ||
    !!script
    ? "yes"
    : "no";
}

function onPrePopulateDatabaseChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const prePopulateDatabase = getValue(discriminator, "/prePopulateDatabase");
  if (prePopulateDatabase === "no") {
    // delete related properties
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/init/waitForInitialRestore",
      value: false,
    });
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComRestoreSession_init"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/init/script"
    );
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComRepository_init_repo"
    );
  } else {
    const dbName = getValue(model, "/metadata/release/name");
    // set stashAppscodeComRestoreSession_init if it doesn't exist
    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComRestoreSession_init"
      )
    ) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init",
        value: stashAppscodeComRestoreSession_init,
        force: true,
      });

      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name",
        value: dbName,
        force: true,
      });
    }
  }
}

function initDataSource({ getValue, model }) {
  const script = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/script"
  );
  const stashAppscodeComRestoreSession_init = getValue(
    model,
    "/resources/stashAppscodeComRestoreSession_init"
  );

  if (script) return "script";
  else if (stashAppscodeComRestoreSession_init) return "stashBackup";
  else return undefined;
}

function onDataSourceChange({ commit, getValue, discriminator, model }) {
  const dataSource = getValue(discriminator, "/dataSource");

  commit("wizard/model$update", {
    path: "/resources/kubedbComElasticsearch/spec/init/waitForInitialRestore",
    value: dataSource === "stashBackup",
    force: true,
  });

  if (dataSource === "script") {
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComRestoreSession_init"
    );

    // create a new script if there is no script property
    if (
      !valueExists(
        model,
        getValue,
        "/resources/kubedbComElasticsearch/spec/init/script"
      )
    )
      commit("wizard/model$update", {
        path: "/resources/kubedbComElasticsearch/spec/init/script",
        value: initScript,
      });
  } else if (dataSource === "stashBackup") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/init/script"
    );

    // create a new stashAppscodeComRestoreSession_init if there is no stashAppscodeComRestoreSession_init property
    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComRestoreSession_init"
      )
    ) {
      const dbName = getValue(model, "/metadata/release/name");

      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init",
        value: stashAppscodeComRestoreSession_init,
      });

      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init/spec/target/ref/name",
        value: dbName,
        force: true,
      });
    }
  }
}

// // for script
function initVolumeType({ getValue, model }) {
  const configMap = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/script/configMap/name"
  );
  const secret = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/init/script/secret/secretName"
  );

  if (configMap) return "configMap";
  else if (secret) return "secret";
  else return undefined;
}

function onVolumeTypeChange({ commit, getValue, discriminator, model }) {
  const sourceVolumeType = getValue(discriminator, "/sourceVolumeType");
  if (sourceVolumeType === "configMap") {
    // add configMap object and delete secret object
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/init/script/secret"
    );

    if (
      !valueExists(
        model,
        getValue,
        "/resources/kubedbComElasticsearch/spec/init/script/configMap"
      )
    ) {
      commit("wizard/model$update", {
        path: "/resources/kubedbComElasticsearch/spec/init/script/configMap",
        value: {
          name: "",
        },
      });
    }
  } else if (sourceVolumeType === "secret") {
    // delete configMap object and add secret object
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/init/script/configMap"
    );

    if (
      !valueExists(
        model,
        getValue,
        "/resources/kubedbComElasticsearch/spec/init/script/secret"
      )
    ) {
      commit("wizard/model$update", {
        path: "/resources/kubedbComElasticsearch/spec/init/script/secret",
        value: {
          secretName: "",
        },
      });
    }
  }
}

function showInitializationForm({ getValue, discriminator, watchDependency }) {
  const prePopulateDatabase = getValue(discriminator, "/prePopulateDatabase");
  watchDependency("discriminator#/prePopulateDatabase");
  return prePopulateDatabase === "yes";
}

function showScriptOrStashForm(
  { getValue, discriminator, watchDependency },
  value
) {
  const dataSource = getValue(discriminator, "/dataSource");
  watchDependency("discriminator#/dataSource");
  return dataSource === value;
}

function showConfigMapOrSecretName(
  { getValue, discriminator, watchDependency },
  value
) {
  const sourceVolumeType = getValue(discriminator, "/sourceVolumeType");
  watchDependency("discriminator#/sourceVolumeType");
  return sourceVolumeType === value;
}

// for stash backup
function initializeNamespace({ getValue, model }) {
  const namespace = getValue(model, "/metadata/release/namespace");
  return namespace;
}

function showRepositorySelectOrCreate(
  { getValue, discriminator, watchDependency },
  value
) {
  const repositoryChoise = getValue(discriminator, "/repositoryChoise");
  watchDependency("discriminator#/repositoryChoise");

  return repositoryChoise === value;
}

function onInitRepositoryChoiseChange({
  getValue,
  discriminator,
  commit,
  model,
}) {
  const repositoryChoise = getValue(discriminator, "/repositoryChoise");
  if (repositoryChoise === "select") {
    // delete stashAppscodeComRepository_init_repo from model
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComRepository_init_repo"
    );
  } else if (repositoryChoise === "create") {
    // add stashAppscodeComRepository_init_repo to model
    commit("wizard/model$update", {
      path: "resources/stashAppscodeComRepository_init_repo",
      value: stashAppscodeComRepository_init_repo,
    });

    const repositoryName = `${getValue(
      model,
      "/metadata/release/name"
    )}-init-repo`;
    // set this name in stashAppscodeComRestoreSession_init
    commit("wizard/model$update", {
      path: "/resources/stashAppscodeComRestoreSession_init/spec/repository/name",
      value: repositoryName,
    });
  }
}

function initCustomizeRestoreJobRuntimeSettings({ getValue, model }) {
  const runtimeSettings = getValue(
    model,
    "/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings"
  );
  if (runtimeSettings) return "yes";
  else return "no";
}

function initCustomizeRestoreJobRuntimeSettingsForBackup({ getValue, model }) {
  const runtimeSettings = getValue(
    model,
    "/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings"
  );
  if (runtimeSettings) return "yes";
  else return "no";
}

function onCustomizeRestoreJobRuntimeSettingsChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  if (customizeRestoreJobRuntimeSettings === "no") {
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings"
    );
  } else if (customizeRestoreJobRuntimeSettings === "yes") {
    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings"
      )
    ) {
      // set new value
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRestoreSession_init/spec/runtimeSettings",
        value: restoreSessionInitRunTimeSettings,
      });
    }
  }
}

function onCustomizeRestoreJobRuntimeSettingsChangeForBackup({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  if (customizeRestoreJobRuntimeSettings === "no") {
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings"
    );
  } else if (customizeRestoreJobRuntimeSettings === "yes") {
    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings"
      )
    ) {
      // set new value
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration/spec/runtimeSettings",
        value: {},
        force: true,
      });
    }
  }
}

function showRuntimeForm({ discriminator, getValue, watchDependency }, value) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  watchDependency("discriminator#/customizeRestoreJobRuntimeSettings");
  return customizeRestoreJobRuntimeSettings === value;
}

async function getImagePullSecrets({
  getValue,
  model,
  watchDependency,
  axios,
  storeGet,
}) {
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group: "core",
    version: "v1",
    resource: "secrets",
  });

  resources = resources.filter((item) => {
    const validType = ["kubernetes.io/dockerconfigjson"];
    return validType.includes(item.type);
  });

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: { name: name },
    };
  });
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FOR Backup Configuration

// schedule bakcup

function getBackupConfigsAndAnnotations(getValue, model) {
  const stashAppscodeComBackupConfiguration = getValue(
    model,
    "/resources/stashAppscodeComBackupConfiguration"
  );
  const kubedbComElasticsearchAnnotations =
    getValue(model, "/resources/kubedbComElasticsearch/metadata/annotations") ||
    {};

  const isBluePrint = Object.keys(kubedbComElasticsearchAnnotations).some(
    (k) =>
      k === "stash.appscode.com/backup-blueprint" ||
      k === "stash.appscode.com/schedule" ||
      k.startsWith("params.stash.appscode.com/")
  );

  return {
    stashAppscodeComBackupConfiguration,
    isBluePrint,
  };
}

function deleteKubedbComElasticsearchDbAnnotation(getValue, model, commit) {
  const annotations =
    getValue(model, "/resources/kubedbComElasticsearch/metadata/annotations") ||
    {};
  const filteredKeyList =
    Object.keys(annotations).filter(
      (k) =>
        k !== "stash.appscode.com/backup-blueprint" &&
        k !== "stash.appscode.com/schedule" &&
        !k.startsWith("params.stash.appscode.com/")
    ) || [];
  const filteredAnnotations = {};
  filteredKeyList.forEach((k) => {
    filteredAnnotations[k] = annotations[k];
  });
  commit("wizard/model$update", {
    path: "/resources/kubedbComElasticsearch/metadata/annotations",
    value: filteredAnnotations,
  });
}

function addKubedbComElasticsearchDbAnnotation(
  getValue,
  model,
  commit,
  key,
  value,
  force
) {
  const annotations =
    getValue(model, "/resources/kubedbComElasticsearch/metadata/annotations") ||
    {};

  if (annotations[key] === undefined) {
    annotations[key] = value;
  } else if (force) {
    annotations[key] = value;
  }

  commit("wizard/model$update", {
    path: "/resources/kubedbComElasticsearch/metadata/annotations",
    value: annotations,
    force: true,
  });
}

function initScheduleBackupForEdit({ getValue, model, setDiscriminatorValue }) {
  const { stashAppscodeComBackupConfiguration, isBluePrint } =
    getBackupConfigsAndAnnotations(getValue, model);

  initRepositoryChoiseForEdit({ getValue, model, setDiscriminatorValue });

  if (stashAppscodeComBackupConfiguration || isBluePrint ) return "yes";
  else return "no";
}

function initScheduleBackup({ getValue, model }) {
  const { stashAppscodeComBackupConfiguration, isBluePrint } =
    getBackupConfigsAndAnnotations(getValue, model);

  if (stashAppscodeComBackupConfiguration || isBluePrint) return "yes";
  else return "no";
}

function onScheduleBackupChange({ commit, getValue, discriminator, model }) {
  const scheduleBackup = getValue(discriminator, "/scheduleBackup");

  if (scheduleBackup === "no") {
    // delete stashAppscodeComBackupConfiguration
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComBackupConfiguration"
    );
    commit("wizard/model$delete", "/resources/stashAppscodeComRepository_repo");
    // delete annotation from kubedbComElasticsearch annotation
    deleteKubedbComElasticsearchDbAnnotation(getValue, model, commit);
  } else {
    const { isBluePrint } = getBackupConfigsAndAnnotations(getValue, model);

    // create stashAppscodeComBackupConfiguration and initialize it if not exists

    const dbName = getValue(model, "/metadata/release/name");

    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComBackupConfiguration"
      ) &&
      !isBluePrint
    ) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration",
        value: stashAppscodeComBackupConfiguration,
      });
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name",
        value: dbName,
        force: true,
      });
    }
  }
}

// backup form
function showBackupForm({ getValue, discriminator, watchDependency }) {
  const scheduleBackup = getValue(discriminator, "/scheduleBackup");
  watchDependency("discriminator#/scheduleBackup");

  if (scheduleBackup === "yes") return true;
  else return false;
}

// invoker form
function initBackupInvoker({ getValue, model }) {
  const { stashAppscodeComBackupConfiguration, isBluePrint } =
    getBackupConfigsAndAnnotations(getValue, model);

  if (stashAppscodeComBackupConfiguration) return "backupConfiguration";
  else if (isBluePrint) return "backupBlueprint";
  else return undefined;
}

function onBackupInvokerChange({ getValue, discriminator, commit, model }) {
  const backupInvoker = getValue(discriminator, "/backupInvoker");

  if (backupInvoker === "backupConfiguration") {
    // delete annotation and create backup config object
    deleteKubedbComElasticsearchDbAnnotation(getValue, model, commit);
    const dbName = getValue(model, "/metadata/release/name");

    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComBackupConfiguration"
      )
    ) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration",
        value: stashAppscodeComBackupConfiguration,
      });
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name",
        value: dbName,
        force: true,
      });
    }
  } else if (backupInvoker === "backupBlueprint") {
    // delete backup configuration object and create the annotation
    commit(
      "wizard/model$delete",
      "/resources/stashAppscodeComBackupConfiguration"
    );
    addKubedbComElasticsearchDbAnnotation(
      getValue,
      model,
      commit,
      "stash.appscode.com/backup-blueprint",
      ""
    );
  }
}

function showInvokerForm({ getValue, discriminator, watchDependency }, value) {
  const backupInvoker = getValue(discriminator, "/backupInvoker");
  watchDependency("discriminator#/backupInvoker");

  return backupInvoker === value;
}

// backup configuration form
function initalizeTargetReferenceName({ getValue, model, watchDependency }) {
  const databaseName = getValue(model, "/metadata/release/name");
  watchDependency("model#/metadata/release/name");

  return databaseName;
}

// restore session repository
function setInitialRestoreSessionRepo({ getValue, model }) {
  const value = getValue(
    model,
    "resources/stashAppscodeComRepository_init_repo"
  );
  return value ? "create" : "select";
}

// backup config repository
function initRepositoryChoise({ getValue, model }) {
  const stashAppscodeComRepository_repo = getValue(
    model,
    "/resources/stashAppscodeComRepository_repo"
  );

  if (stashAppscodeComRepository_repo) return "create";
  else return "select";
}

function initRepositoryChoiseForEdit({
  getValue,
  model,
  setDiscriminatorValue,
}) {
  const stashAppscodeComRepository_repo = getValue(
    model,
    "/resources/stashAppscodeComRepository_repo"
  );
  const repoInitialSelectionStatus = stashAppscodeComRepository_repo
    ? "yes"
    : "no";
  setDiscriminatorValue(
    "/repoInitialSelectionStatus",
    repoInitialSelectionStatus
  );

  return repoInitialSelectionStatus;
}

function onRepositoryChoiseChange({
  getValue,
  discriminator,
  watchDependency,
  commit,
  model,
}) {
  const repositoryChoise = getValue(discriminator, "/repositoryChoise");
  watchDependency("discriminator#/repositoryChoise");

  if (repositoryChoise === "select") {
    // delete the stashAppscodeComRepository_repo
    commit("wizard/model$delete", "/resources/stashAppscodeComRepository_repo");
  } else if (repositoryChoise === "create") {
    // create new stashAppscodeComRepository_repo
    if (
      !valueExists(
        model,
        getValue,
        "/resources/stashAppscodeComRepository_repo"
      )
    ) {
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComRepository_repo",
        value: stashAppscodeComRepository_repo,
      });
      const repositoryName = `${getValue(
        model,
        "/metadata/release/name"
      )}-repo`;
      // set this name in stashAppscodeComRestoreSession_init
      commit("wizard/model$update", {
        path: "/resources/stashAppscodeComBackupConfiguration/spec/repository/name",
        value: repositoryName,
      });
    }
  }
}

function onRepositoryNameChange({ getValue, model, commit }) {
  const repositoryName = getValue(
    model,
    "resources/stashAppscodeComRepository_repo/metadata/name"
  );
  // set this name in stashAppscodeComRestoreSession_init
  commit("wizard/model$update", {
    path: "/resources/stashAppscodeComBackupConfiguration/spec/repository/name",
    value: repositoryName,
  });
}

// backup blueprint form
function getMongoAnnotations(getValue, model) {
  const annotations = getValue(
    model,
    "/resources/kubedbComElasticsearch/metadata/annotations"
  );
  return { ...annotations } || {};
}

function initFromAnnotationValue({ getValue, model }, key) {
  const annotations = getMongoAnnotations(getValue, model);
  return annotations[key];
}

function onBackupBlueprintNameChange({
  getValue,
  discriminator,
  commit,
  model,
}) {
  const backupBlueprintName = getValue(discriminator, "/backupBlueprintName");
  addKubedbComElasticsearchDbAnnotation(
    getValue,
    model,
    commit,
    "stash.appscode.com/backup-blueprint",
    backupBlueprintName,
    true
  );
}

function onBackupBlueprintScheduleChange({
  getValue,
  discriminator,
  commit,
  model,
}) {
  const backupBlueprintSchedule = getValue(discriminator, "/schedule");
  addKubedbComElasticsearchDbAnnotation(
    getValue,
    model,
    commit,
    "stash.appscode.com/schedule",
    backupBlueprintSchedule,
    true
  );
}

function initFromAnnotationKeyValue({ getValue, model }, prefix) {
  const annotations = getMongoAnnotations(getValue, model);
  const newOb = {};
  Object.keys(annotations).forEach((key) => {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");
      newOb[newKey] = annotations[key];
    }
  });
  return newOb;
}

function onTaskParametersChange({ getValue, discriminator, model, commit }) {
  const taskParameters = getValue(discriminator, "/taskParameters");

  const taskParamterKeys = Object.keys(taskParameters).map(
    (tp) => `params.stash.appscode.com/${tp}`
  );
  const oldAnnotations =
    getValue(model, "/resources/kubedbComElasticsearch/metadata/annotations") ||
    {};
  const newAnnotations = {};

  const filteredAnnotationKeys = Object.keys(oldAnnotations).filter(
    (key) =>
      !taskParamterKeys.includes(key) &&
      !key.startsWith("params.stash.appscode.com/")
  );

  filteredAnnotationKeys.forEach((key) => {
    newAnnotations[key] = oldAnnotations[key];
  });

  Object.keys(taskParameters).forEach((tpk) => {
    newAnnotations[`params.stash.appscode.com/${tpk}`] = taskParameters[tpk];
  });

  commit("wizard/model$update", {
    path: "/resources/kubedbComElasticsearch/metadata/annotations",
    value: newAnnotations,
  });
}

function isValueExistInModel({ model, getValue }, path) {
  const modelValue = getValue(model, path);
  return !!modelValue;
}

function onNamespaceChange({ commit, model, getValue }) {
  const namespace = getValue(model, "/metadata/release/namespace");
  const agent = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/monitor/agent"
  );
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
    "/resources/kubedbComElasticsearch/spec/metadata/labels"
  );

  const agent = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/monitor/agent"
  );

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

  const agent = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/monitor/agent"
  );

  const labels = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/metadata/labels"
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
      path: "/resources/kubedbComElasticsearch/spec/configSecret/name",
      value: `${dbName}-config`,
      force: true,
    });
  }
}

function returnFalse() {
  return false;
}

function onAgentChange({ commit, model, getValue }) {
  const agent = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/monitor/agent"
  );

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
      path: "/resources/kubedbComElasticsearch/spec/configSecret/name",
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
      "/resources/kubedbComElasticsearch/spec/configSecret"
    );
    commit("wizard/model$delete", "/resources/secret_user_config");
  }
}

function initSetCustomConfig({ model, getValue }) {
  const configSecret = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/configSecret/name"
  );

  if (configSecret) return "yes";
  else return "no";
}

//////////////////// secret custom config /////////////////
function onSecretConfigurationSourceChange({
  getValue,
  discriminator,
  commit,
  model,
}) {
  const configurationSource = getValue(discriminator, "/configurationSource");
  if (configurationSource === "use-existing-config") {
    commit("wizard/model$delete", "/resources/secret_secure_config");
  } else {
    const value = getValue(model, "/resources/secret_secure_config");
    if (!value) {
      commit("wizard/model$update", {
        path: "/resources/secret_secure_config",
        value: {},
        force: true,
      });
    }
    const configSecretName = `${getValue(
      model,
      "/metadata/release/name"
    )}-secure-config`;
    commit("wizard/model$update", {
      path: "/resources/kubedbComElasticsearch/spec/secureConfigSecret/name",
      value: configSecretName,
      force: true,
    });
  }
}

function setSecretConfigurationSource({ model, getValue }) {
  const modelValue = getValue(model, "/resources/secret_secure_config");
  if (modelValue) {
    return "create-new-config";
  }
  return "use-existing-config";
}

function setSecretConfigFiles({
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  watchDependency("model#/resources/secret_secure_config/stringData");
  const configFiles = getValue(
    model,
    "/resources/secret_secure_config/stringData"
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

function onSecretConfigFilesChange({ discriminator, getValue, commit }) {
  const files = getValue(discriminator, "/configFiles");

  const configFiles = {};

  if (files) {
    files.forEach((item) => {
      const { key, value } = item;
      configFiles[key] = value;
    });
  }

  commit("wizard/model$update", {
    path: "/resources/secret_secure_config/stringData",
    value: configFiles,
    force: true,
  });
}

function onSetSecretCustomConfigChange({ discriminator, getValue, commit }) {
  const value = getValue(discriminator, "/setSecretCustomConfig");

  if (value === "no") {
    commit(
      "wizard/model$delete",
      "/resources/kubedbComElasticsearch/spec/secureConfigSecret"
    );
    commit("wizard/model$delete", "/resources/secret_secure_config");
  }
}

function initSetSecureCustomConfig({ model, getValue }) {
  const configSecret = getValue(
    model,
    "/resources/kubedbComElasticsearch/spec/secureConfigSecret/name"
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
    return `${domain}/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/elasticsearchopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=${reqType}`;
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


function isVariantAvailable ({storeGet})  {
  const variant = storeGet("/route/query/variant");
  return variant ? true : false
}

function showScheduleBackup({storeGet}){
  const operationQuery = storeGet("/route/query/operation") || ''
  const isBackupOperation = operationQuery === 'edit-self-backupconfiguration' ? true : false
  return !isBackupOperation
}


return {
  showScheduleBackup,
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
  isAuthPluginNotSearchGuard,
  showInternalUsersAndRolesMapping,
  showSecureCustomConfig,
  getElasticSearchVersions,
  isSecurityEnabled,
  onDisableSecurityChange,
  onVersionChange,
  onEnableSSLChange,
  removeCertificatesOfAliases,
  setDatabaseMode,
  getStorageClassNames,
  getStorageClassNamesFromDiscriminator,
  deleteDatabaseModePath,
  isEqualToDatabaseMode,
  getSelectedVersionAuthPlugin,
  onNodeSwitchFalse,
  hasTopologyNode,
  hideNode,
  disableNode,
  setInitialStatusFalse,
  onInternalUsersChange,
  disableRoleDeletion,
  setInternalUsers,
  validateNewUser,
  disableUsername,
  disableUserEdit,
  isAuthPluginEqualTo,
  showExistingCredSection,
  showPasswordCredSection,
  onRolesMappingChange,
  setRolesMapping,
  disableRolesEdit,
  disableRoleName,
  validateNewRole,
  disableUserDeletion,
  onCustomizeKernelSettingChange,
  getInternalUsers,
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
  showCustomizeExporterSection,
  onCustomizeExporterChange,
  disableInitializationSection,
  valueExists,
  initPrePopulateDatabase,
  onPrePopulateDatabaseChange,
  initDataSource,
  onDataSourceChange,
  initVolumeType,
  onVolumeTypeChange,
  showInitializationForm,
  showScriptOrStashForm,
  showConfigMapOrSecretName,
  initializeNamespace,
  showRepositorySelectOrCreate,
  onInitRepositoryChoiseChange,
  initCustomizeRestoreJobRuntimeSettings,
  initCustomizeRestoreJobRuntimeSettingsForBackup,
  onCustomizeRestoreJobRuntimeSettingsChange,
  onCustomizeRestoreJobRuntimeSettingsChangeForBackup,
  showRuntimeForm,
  getImagePullSecrets,
  getBackupConfigsAndAnnotations,
  deleteKubedbComElasticsearchDbAnnotation,
  addKubedbComElasticsearchDbAnnotation,
  initScheduleBackup,
  initScheduleBackupForEdit,
  onScheduleBackupChange,
  showBackupForm,
  initBackupInvoker,
  onBackupInvokerChange,
  showInvokerForm,
  initalizeTargetReferenceName,
  setInitialRestoreSessionRepo,
  initRepositoryChoise,
  initRepositoryChoiseForEdit,
  onRepositoryChoiseChange,
  onRepositoryNameChange,
  getMongoAnnotations,
  initFromAnnotationValue,
  onBackupBlueprintNameChange,
  onBackupBlueprintScheduleChange,
  initFromAnnotationKeyValue,
  onTaskParametersChange,
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
  getMaxUnavailableOptions,
  setConfigFiles,
  onConfigFilesChange,
  onSetCustomConfigChange,
  onSecretConfigurationSourceChange,
  setSecretConfigurationSource,
  setSecretConfigFiles,
  onSecretConfigFilesChange,
  onSetSecretCustomConfigChange,
  initSetCustomConfig,
  initSetSecureCustomConfig,
  getOpsRequestUrl,
  getCreateNameSpaceUrl,
  isVariantAvailable
};
