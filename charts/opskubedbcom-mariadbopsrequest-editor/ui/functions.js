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

function returnFalse() {
  return false;
}

async function getNamespaces({ axios, storeGet }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function getDbs({ axios, storeGet, model, getValue, watchDependency }) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mariadbs`,
    {
      params: { filter: { items: { metadata: { name: null } } } },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  return resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

async function getDbDetails({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue,
}) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");
  const name = getValue(model, "/spec/databaseRef/name");
  watchDependency("model#/spec/databaseRef/name");

  if (namespace && name) {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mariadbs/${name}`
    );

    setDiscriminatorValue("/dbDetails", resp.data || {});

    return resp.data || {};
  } else return {};
}

async function getDbVersions({ axios, storeGet, watchDependency }) {
  watchDependency("discriminator#/dbDetails");
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null, distribution: null },
      },
    },
  };

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/mariadbversions`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  // keep only non deprecated versions
  const filteredElasticsearchVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  return filteredElasticsearchVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    const dist = (item.spec && item.spec.distribution) || "";
    return {
      text: `${name} (${specVersion})`,
      value: name,
    };
  });
}

function ifRequestTypeEqualsTo({ model, getValue, watchDependency }, type) {
  const selectedType = getValue(model, "/spec/type");
  watchDependency("model#/spec/type");

  return selectedType === type;
}

function onRequestTypeChange({ model, getValue, commit }) {
  const selectedType = getValue(model, "/spec/type");
  const reqTypeMapping = {
    Upgrade: "updateVersion",
    UpdateVersion: "updateVersion",
    HorizontalScaling: "horizontalScaling",
    VerticalScaling: "verticalScaling",
    VolumeExpansion: "volumeExpansion",
    Restart: "restart",
    Reconfigure: "configuration",
    ReconfigureTLS: "tls",
  };

  Object.keys(reqTypeMapping).forEach((key) => {
    if (key !== selectedType)
      commit("wizard/model$delete", `/spec/${reqTypeMapping[key]}`);
  });
}

function disableOpsRequest({
  itemCtx,
  discriminator,
  getValue,
  watchDependency,
}) {
  if (itemCtx.value === "HorizontalScaling") {
    const dbType = getDbType({
      discriminator,
      getValue,
      watchDependency,
    });

    if (dbType === "standalone") return true;
    else return false;
  } else return false;
}

function getDbTls({ discriminator, getValue, watchDependency }) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
  return spec?.tls || undefined;
}

function getDbType({ discriminator, getValue, watchDependency }) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
  const { replicas } = spec || {};
  let verd = "";

  if (replicas > 1) {
    verd = "cluster";
  } else {
    verd = "standalone";
  }

  return verd;
}

function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace || null;
}

function initDatabaseRef({ route, watchDependency }) {
  watchDependency("model#/metadata/namespace");
  const { name } = route.query || {};
  return name;
}

function asDatabaseOperation(route) {
  return !!route.query.operation;
}

function showAndInitName({ route, commit }) {
  const ver = asDatabaseOperation(route);
  if (ver) {
    commit("wizard/model$update", {
      path: "/metadata/name",
      value: `${route.query.name}-ops-${new Date().getTime()}`,
      force: true,
    });
  }

  return !ver;
}
function showAndInitNamespace({ route, commit }) {
  const ver = asDatabaseOperation(route);
  if (ver) {
    commit("wizard/model$update", {
      path: "/metadata/namespace",
      value: `${route.query.namespace}`,
      force: true,
    });
  }

  return !ver;
}
function showAndInitDatabaseRef({ route, commit }) {
  const ver = asDatabaseOperation(route);
  if (ver) {
    commit("wizard/model$update", {
      path: "/spec/databaseRef/name",
      value: `${route.query.name}`,
      force: true,
    });
  }

  return !ver;
}
function showConfigureOpsrequestLabel({route}) {
  return !asDatabaseOperation(route);
}
function showAndInitOpsRequestType({ route, commit }) {
  const ver = asDatabaseOperation(route);
  const opMap = {
    upgrade: "UpdateVersion",
    updateVersion: "UpdateVersion",
    horizontalscaling: "HorizontalScaling",
    verticalscaling: "VerticalScaling",
    volumeexpansion: "VolumeExpansion",
    restart: "Restart",
    reconfiguretls: "ReconfigureTLS",
    reconfigure: "Reconfigure",
  };
  if (ver) {
    const operation = route.query.operation;
    const match = /^(.*)-opsrequest-(.*)$/.exec(operation);
    const opstype = match[2];
    commit("wizard/model$update", {
      path: "/spec/type",
      value: opMap[opstype],
      force: true,
    });
  }

  return !ver;
}
// vertical scaling
function ifDbTypeEqualsTo(
  { discriminator, getValue, watchDependency, commit },
  value,
  opsReqType
) {
  const verd = getDbType({
    discriminator,
    getValue,
    watchDependency,
  });

  return value === verd;
}

// for config secret
async function getConfigSecrets({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
    {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    }
  );

  const secrets = (resp && resp.data && resp.data.items) || [];

  const filteredSecrets = secrets;

  filteredSecrets.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    item.text = name;
    item.value = name;
    return true;
  });
  return filteredSecrets;
}

function isEqualToValueFromType(
  { discriminator, getValue, watchDependency },
  value
) {
  watchDependency("discriminator#/valueFromType");
  const valueFrom = getValue(discriminator, "/valueFromType");
  return valueFrom === value;
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
  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

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

// reconfiguration type
function ifReconfigurationTypeEqualsTo(
  { discriminator, getValue, watchDependency },
  value
) {
  const reconfigurationType = getValue(discriminator, "/reconfigurationType");
  watchDependency("discriminator#/reconfigurationType");

  return reconfigurationType === value;
}
function onReconfigurationTypeChange({ commit, discriminator, getValue }) {
  const reconfigurationType = getValue(discriminator, "/reconfigurationType");
  if (reconfigurationType === "remove") {
    commit("wizard/model$delete", `/spec/configuration`);

    commit("wizard/model$update", {
      path: `/spec/configuration/removeCustomConfig`,
      value: true,
      force: true,
    });
  } else {
    commit("wizard/model$delete", `/spec/configuration/configSecret`);
    commit("wizard/model$delete", `/spec/configuration/inlineConfig`);
    commit("wizard/model$delete", `/spec/configuration/removeCustomConfig`);
  }
}
function disableReconfigurationType({
  getValue,
  watchDependency,
  discriminator,
  itemCtx,
}) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
  if (itemCtx.value === "inlineConfig" || itemCtx.value === "remove") {
    if (spec.configSecret) return false;
    else return true;
  } else return false;
}

// for tls
function hasTlsField({ discriminator, getValue, watchDependency }) {
  const tls = getDbTls({
    discriminator,
    getValue,
    watchDependency,
  });

  return !!tls;
}

function initIssuerRefApiGroup({
  getValue,
  model,
  watchDependency,
  discriminator,
}) {
  const kind = getValue(model, "/spec/tls/issuerRef/kind");
  watchDependency("model#/spec/tls/issuerRef/kind");

  if (kind) {
    const apiGroup = getValue(
      discriminator,
      "/dbDetails/spec/tls/issuerRef/apiGroup"
    );
    if (apiGroup) return apiGroup;
    return "cert-manager.io";
  } else return undefined;
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
  watchDependency("model#/spec/tls/issuerRef/apiGroup");
  watchDependency("model#/spec/tls/issuerRef/kind");
  watchDependency("model#/metadata/namespace");
  const apiGroup = getValue(model, "/spec/tls/issuerRef/apiGroup");
  const kind = getValue(model, "/spec/tls/issuerRef/kind");
  const namespace = getValue(model, "/metadata/namespace");

  let url;
  if (kind === "Issuer") {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/namespaces/${namespace}/issuers`;
  } else if (kind === "ClusterIssuer") {
    url = `/clusters/${owner}/${cluster}/proxy/${apiGroup}/v1/clusterissuers`;
  }

  if (!url) return []

  if (url && apiGroup && namespace) {
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
  } else {
    return [];
  }
}

function initTlsOperation() {
  return "update";
}
function onTlsOperationChange({ discriminator, getValue, commit }) {
  const tlsOperation = getValue(discriminator, "/tlsOperation");

  commit("wizard/model$delete", "/spec/tls");

  if (tlsOperation === "rotate") {
    commit("wizard/model$update", {
      path: "/spec/tls/rotateCertificates",
      value: true,
      force: true,
    });
    commit("wizard/model$delete", "/spec/tls/certificates");
    commit("wizard/model$delete", "/spec/tls/remove");
  } else if (tlsOperation === "remove") {
    commit("wizard/model$update", {
      path: "/spec/tls/remove",
      value: true,
      force: true,
    });
    commit("wizard/model$delete", "/spec/tls/certificates");
    commit("wizard/model$delete", "/spec/tls/rotateCertificates");
  }
}

function showIssuerRefAndCertificates({
  discriminator,
  getValue,
  watchDependency,
}) {
  const tlsOperation = getValue(discriminator, "/tlsOperation");
  watchDependency("discriminator#/tlsOperation");
  const verd = tlsOperation !== "remove" && tlsOperation !== "rotate";

  return verd;
}

function isIssuerRefRequired({ discriminator, getValue, watchDependency }) {
  const hasTls = hasTlsField({
    discriminator,
    getValue,
    watchDependency,
  });

  return !hasTls;
}

function getRequestTypeFromRoute({
  route,
  model,
  discriminator,
  getValue,
  watchDependency,
}) {
  const isDbloading = isDbDetailsLoading({
    discriminator,
    model,
    getValue,
    watchDependency,
  });
  const { query } = route || {};
  const { requestType } = query || {};
  return isDbloading ? "" : requestType || "";
}

// ************************************** Set db details *****************************************

function isDbDetailsLoading({
  discriminator,
  model,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/dbDetails");
  watchDependency("model#/spec/databaseRef/name");
  const dbDetails = getValue(discriminator, "/dbDetails");
  const dbName = getValue(model, "/spec/databaseRef/name");

  return !dbDetails || !dbName;
}

function setValueFromDbDetails(
  { discriminator, getValue, watchDependency, commit },
  path,
  commitPath
) {
  watchDependency("discriminator#/dbDetails");

  const retValue = getValue(discriminator, `/dbDetails${path}`);

  if (commitPath && retValue) {
    const tlsOperation = getValue(discriminator, "/tlsOperation");

    // computed called when tls fields is not visible
    if (commitPath.includes("/spec/tls") && tlsOperation !== "update")
      return undefined;

    // direct model update required for reusable element.
    // computed property is not applicable for reusable element
    commit("wizard/model$update", {
      path: commitPath,
      value: retValue,
      force: true,
    });
  }

  return retValue || undefined;
}

function getAliasOptions() {
  return ["server", "client", "metrics-exporter"];
}

function isNamespaceDisabled({ route }) {
  const { namespace } = route.query || {};
  return !!namespace;
}

function isDatabaseRefDisabled({ route }) {
  const { name } = route.query || {};
  return !!name;
}

function onNamespaceChange({ commit }) {
  commit("wizard/model$delete", "/spec/type");
}

function onDbChange({ commit }) {
  commit("wizard/model$delete", "/spec/type");
}

function setApplyToIfReady(){
  return "IfReady"
}

return {
  fetchJsons,
  returnFalse,
  getNamespaces,
  getDbs,
  getDbDetails,
  getDbVersions,
  ifRequestTypeEqualsTo,
  onRequestTypeChange,
  getDbTls,
  getDbType,
  initNamespace,
  initDatabaseRef,

  showAndInitName,
  showAndInitNamespace,
  showAndInitDatabaseRef,
  showConfigureOpsrequestLabel,
  showAndInitOpsRequestType,

  ifDbTypeEqualsTo,
  getConfigSecrets,
  isEqualToValueFromType,
  disableOpsRequest,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  ifReconfigurationTypeEqualsTo,
  onReconfigurationTypeChange,
  disableReconfigurationType,
  hasTlsField,
  initIssuerRefApiGroup,
  getIssuerRefsName,
  initTlsOperation,
  onTlsOperationChange,
  showIssuerRefAndCertificates,
  isIssuerRefRequired,
  getRequestTypeFromRoute,
  isDbDetailsLoading,
  setValueFromDbDetails,
  getAliasOptions,
  isNamespaceDisabled,
  isDatabaseRefDisabled,
  onNamespaceChange,
  onDbChange,
  setApplyToIfReady
};
