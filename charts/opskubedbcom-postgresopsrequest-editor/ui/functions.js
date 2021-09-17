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

function returnFalse() {
  return false;
}

async function getNamespaces({ axios, storeGet }) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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

async function getPostgreses({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/postgreses`,
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

async function getPostgresDetails({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
  setDiscriminatorValue
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");
  const name = getValue(model, "/spec/databaseRef/name");
  watchDependency("model#/spec/databaseRef/name");

  if (namespace && name) {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/postgreses/${name}`
    );

    setDiscriminatorValue("/dbDetails", resp.data || {});

    return resp.data || {};
  } else return {};
}

async function getPostgresVersions({ axios, storeGet }) {
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

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/postgresversions`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  // keep only non deprecated versions
  const filteredPostgresVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  return filteredPostgresVersions.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const specVersion = (item.spec && item.spec.version) || "";
    return {
      text: `${name} (${specVersion})`,
      value: name,
    };
  });
}

function ifRequestTypeEqualsTo(
  { model, getValue, watchDependency },
  type
) {
  const selectedType = getValue(model, "/spec/type");
  watchDependency("model#/spec/type");

  return selectedType === type;
}
function onRequestTypeChange({ model, getValue, commit }) {
  const selectedType = getValue(model, "/spec/type");
  const reqTypeMapping = {
    Upgrade: "upgrade",
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

function getDbTls({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
  return spec?.tls || undefined;
}

function getDbType({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/dbDetails");
  const postgresDetails = getValue(discriminator, "/dbDetails");

  const { spec } = postgresDetails || {};
  const { replicas } = spec || {};
  let verd = "";
  if (replicas > 1) {
    verd = "cluster";
  } else {
    verd = "standalone";
  }

  return verd;
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

function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace || null;
}

function initDatabaseRef({ route }) {
  const { name } = route.query || {};
  return name;
}

function clearOpsReqSpec(verd, opsReqType, commit) {
  if (
    opsReqType === "verticalScaling" ||
    opsReqType === "horizontalScaling" ||
    opsReqType === "volumeExpansion" ||
    opsReqType === "configuration"
  ) {
    if (verd === "standalone") {
      commit("wizard/model$delete", `/spec/${opsReqType}/cluster`);
    } else {
      commit("wizard/model$delete", `/spec/${opsReqType}/standalone`);
    }
  }
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

  clearOpsReqSpec(verd, opsReqType, commit);
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
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
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
function onReconfigurationTypeChange(
  { commit, discriminator, getValue }
) {
  const reconfigurationType = getValue(discriminator, "/reconfigurationType");
  if (reconfigurationType === "remove") {
    commit("wizard/model$delete", `/spec/configuration`);

    commit("wizard/model$update", {
      path: `/spec/configuration/removeCustomConfig`,
      value: true,
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      `/spec/configuration/configSecret`
    );
    commit(
      "wizard/model$delete",
      `/spec/configuration/inlineConfig`
    );
    commit(
      "wizard/model$delete",
      `/spec/configuration/removeCustomConfig`
    );
  }
}
function disableReconfigurationType(
  { discriminator, getValue, watchDependency, itemCtx },
) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
    if (itemCtx.value === "inlineConfig" || itemCtx.value === "remove") {
      if (spec.configSecret) return false;
      else return true;
    } else return false;
}

// for tls
function hasTlsField({
  discriminator,
  getValue,
  watchDependency,
}) {
  const tls = getDbTls({
    discriminator,
    getValue,
    watchDependency,
  });

  return !!tls;
}

function setSSLMode({discriminator, getValue, watchDependency}) {
  watchDependency("discriminator#/dbDetails");

  const retValue = getValue(discriminator, `/dbDetails/spec/sslMode`);
  return retValue || "require";
}

function setClientAuthMode({discriminator, getValue, watchDependency, commit}) {
  watchDependency("discriminator#/dbDetails");

  const retValue = getValue(discriminator, `/dbDetails/spec/clientAuthMode`);

  commit("wizard/model$update", {
    path: "/spec/tls/clientAuthMode",
    value: retValue || "",
    force: true
  });

  return retValue;
}

function initIssuerRefApiGroup({ getValue, model, watchDependency }) {
  const kind = getValue(model, "/spec/tls/issuerRef/kind");
  watchDependency("model#/spec/tls/issuerRef/kind");

  if (kind) {
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
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
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
  } else if (tlsOperation === "remove") {
    commit("wizard/model$update", {
      path: "/spec/tls/remove",
      value: true,
      force: true,
    });
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

function isIssuerRefRequired({
  discriminator,
  getValue,
  watchDependency,
}) {
  const hasTls = hasTlsField({
    discriminator,
    getValue,
    watchDependency,
  });

  return !hasTls;
}

function getClientAuthModes({
  getValue,
  watchDependency,
  discriminator,
}) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");

  const { spec } = dbDetails || {};
  const { version } = spec || {};

  watchDependency("discriminator#/tlsOperation")

  const tlsOperation = getValue(discriminator, "/tlsOperation");

  // major version section from version
  const major = parseInt(version && version.split(".")[0]);

  const options = ["md5"];

  if(major >= 11) {
    options.push("scram");
  }

  if(tlsOperation !== "remove") {
    options.push("cert");
  }

  return options.map((item) => ({text: item, value: item }));
}

function getRequestTypeFromRoute({ route, discriminator, getValue, watchDependency }) {
  const isDbloading = isDbDetailsLoading({discriminator, getValue, watchDependency});
  const { query } = route || {};
  const { requestType } = query || {};
  return isDbloading ? "" : requestType || "";
}

function isDbDetailsLoading({discriminator, getValue, watchDependency}) {
  watchDependency("discriminator#/dbDetails");
  const dbDetails = getValue(discriminator, "/dbDetails");
  
  return !dbDetails;
}

function setValueFromDbDetails({discriminator, getValue, watchDependency, commit}, path, commitPath) {
  watchDependency("discriminator#/dbDetails");
  const retValue = getValue(discriminator, `/dbDetails${path}`);

  if(commitPath) {
    const tlsOperation = getValue(discriminator, "/tlsOperation");
    
    // computed called when tls fields is not visible
    if(commitPath.includes("/spec/tls") && tlsOperation !== "update")
      return undefined; 

    // direct model update required for reusable element.
    // computed property is not applicable for reusable element
    commit("wizard/model$update", {
      path: commitPath,
      value: retValue,
      force: true
    });
  }

  return retValue || undefined;
}

function getAliasOptions() {
  return ["server", "client", "metrics-exporter"];
}

return {
	fetchJsons,
	returnFalse,
	getNamespaces,
	getPostgreses,
	getPostgresDetails,
	getPostgresVersions,
	ifRequestTypeEqualsTo,
	onRequestTypeChange,
	getDbTls,
  setSSLMode,
  setClientAuthMode,
	getDbType,
	disableOpsRequest,
	initNamespace,
	initDatabaseRef,
	clearOpsReqSpec,
	ifDbTypeEqualsTo,
	getConfigSecrets,
	isEqualToValueFromType,
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
  getClientAuthModes,
  getRequestTypeFromRoute,
  isDbDetailsLoading,
  setValueFromDbDetails,
  getAliasOptions
}