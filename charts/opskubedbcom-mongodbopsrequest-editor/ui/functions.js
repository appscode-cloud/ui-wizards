function returnFalse() {
  return false;
}

async function getNamespaces({ axios, storeGet }) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

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

async function getMongoDbs({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mongodbs`,
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

async function getMongoDetails({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");
  const name = getValue(model, "/spec/databaseRef/name");
  watchDependency("model#/spec/databaseRef/name");

  if (namespace && name) {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/mongodbs/${name}`
    );
    return resp.data || {};
  } else return {};
}

async function getMongoDbVersions({ axios, storeGet }) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

  const queryParams = {
    filter: {
      items: {
        metadata: { name: null },
        spec: { version: null, deprecated: null },
      },
    },
  };

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/mongodbversions`,
    {
      params: queryParams,
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  // keep only non deprecated versions
  const filteredMongoDbVersions = resources.filter(
    (item) => item.spec && !item.spec.deprecated
  );

  return filteredMongoDbVersions.map((item) => {
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

async function getDbTls({ axios, storeGet, model, getValue, watchDependency }) {
  const mongoDbDetails = await getMongoDetails({
    axios,
    storeGet,
    model,
    getValue,
    watchDependency,
  });

  const { spec } = mongoDbDetails || {};
  return spec.tls || undefined;
}

async function getDbType({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const mongoDbDetails = await getMongoDetails({
    axios,
    storeGet,
    model,
    getValue,
    watchDependency,
  });

  const { spec } = mongoDbDetails || {};
  const { shardTopology, replicaSet } = spec || {};
  let verd = "";
  if (shardTopology) {
    verd = "sharded";
  } else {
    if (replicaSet) {
      verd = "replicaSet";
    } else verd = "standalone";
  }

  return verd;
}

async function disableOpsRequest({
  itemCtx,
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  if (itemCtx.value === "HorizontalScaling") {
    const dbType = await getDbType({
      axios,
      storeGet,
      model,
      getValue,
      watchDependency,
    });

    if (dbType === "standalone") return true;
    else return false;
  } else return false;
}

function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace;
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
    if (verd === "sharded") {
      commit("wizard/model$delete", `/spec/${opsReqType}/replicaSet`);
      commit("wizard/model$delete", `/spec/${opsReqType}/replicas`);
      commit("wizard/model$delete", `/spec/${opsReqType}/standalone`);
    } else if (verd === "standalone") {
      commit("wizard/model$delete", `/spec/${opsReqType}/replicaSet`);
      commit("wizard/model$delete", `/spec/${opsReqType}/configServer`);
      commit("wizard/model$delete", `/spec/${opsReqType}/mongos`);
      commit("wizard/model$delete", `/spec/${opsReqType}/shard`);
    } else {
      commit("wizard/model$delete", `/spec/${opsReqType}/standalone`);
      commit("wizard/model$delete", `/spec/${opsReqType}/configServer`);
      commit("wizard/model$delete", `/spec/${opsReqType}/mongos`);
      commit("wizard/model$delete", `/spec/${opsReqType}/shard`);
    }
  }
}

// vertical scaling
async function ifDbTypeEqualsTo(
  { axios, storeGet, model, getValue, watchDependency, commit },
  value,
  opsReqType
) {
  const verd = await getDbType({
    axios,
    storeGet,
    model,
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
  const cluster = storeGet("/clusterInfo/name");
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

// pod template
function showPodTemplate({ discriminator, getValue, watchDependency }) {
  const reconfigurationType = getValue(discriminator, "/reconfigurationType");
  watchDependency("discriminator#/reconfigurationType");

  return reconfigurationType && reconfigurationType !== "remove";
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
  const cluster = storeGet("/clusterInfo/name");

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
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");

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

async function showConfigMapSelectField({
  storeGet,
  model,
  getValue,
  watchDependency,
  axios,
}) {
  const resp = await resourceNames(
    { axios, getValue, model, watchDependency, storeGet },
    "core",
    "v1",
    "configmaps"
  );
  return !!(resp && resp.length);
}

async function showConfigMapInputField({
  storeGet,
  model,
  getValue,
  watchDependency,
  axios,
}) {
  return !showConfigMapSelectField({
    storeGet,
    model,
    getValue,
    watchDependency,
    axios,
  });
}

function showSecretSelectField({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const resp = getSecrets({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
  return !!resp.length;
}

function showSecretInputField({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  return !showSecretSelectField({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
}

async function getSecretKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(model, "/metadata/namespace");
  const secretName =
    (rootModel &&
      rootModel.valueFrom &&
      rootModel.valueFrom.secretKeyRef &&
      rootModel.valueFrom.secretKeyRef.name) ||
    "";
  watchDependency("model#/metadata/namespace");

  if (!secretName) return [];

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`
  );

  const secret = (resp && resp.data && resp.data.data) || {};

  const secretKeys = Object.keys(secret).map((item) => ({
    text: item,
    value: item,
  }));

  return secretKeys;
}

async function hasSecretKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const resp = await getSecretKeys({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
    rootModel,
  });
  return !!(resp && resp.length);
}

async function hasNoSecretKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const resp = await hasSecretKeys({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
    rootModel,
  });
  return !resp;
}

async function getConfigMapKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
  const namespace = getValue(model, "/metadata/namespace");
  const configMapName =
    (rootModel &&
      rootModel.valueFrom &&
      rootModel.valueFrom.configMapKeyRef &&
      rootModel.valueFrom.configMapKeyRef.name) ||
    "";
  watchDependency("model#/metadata/namespace");

  if (!configMapName) return [];

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`
  );

  const configMaps = (resp && resp.data && resp.data.data) || {};

  const configMapKeys = Object.keys(configMaps).map((item) => ({
    text: item,
    value: item,
  }));

  return configMapKeys;
}

async function hasConfigMapKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const resp = await getConfigMapKeys({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
    rootModel,
  });
  return !!(resp && resp.length);
}

async function hasNoConfigMapKeys({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
  rootModel,
}) {
  const resp = await hasConfigMapKeys({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
    rootModel,
  });
  return !resp;
}

async function getSecrets({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/clusterInfo/name");
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

async function hasExistingSecret({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const resp = await getSecrets({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
  return !!(resp && resp.length);
}

async function hasNoExistingSecret({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const resp = await hasExistingSecret({
    storeGet,
    axios,
    model,
    getValue,
    watchDependency,
  });
  return !resp;
}

async function getImagePullSecrets({
  getValue,
  model,
  watchDependency,
  axios,
  storeGet,
}) {
  const namespace = getValue(model, "/metadata/namespace");
  watchDependency("model#/metadata/namespace");

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

function getValueFrom({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return "ConfigMap";
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return "Secret";
  } else {
    return "Input";
  }
}

function getRefName({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return itemCtx.valueFrom.configMapKeyRef.name;
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return itemCtx.valueFrom.secretKeyRef.name;
  } else {
    return "";
  }
}

function isConfigMapTypeValueFrom({ rootModel }) {
  const valueFrom = rootModel.valueFrom;
  return !!(valueFrom && valueFrom.configMapKeyRef);
}

function isSecretTypeValueFrom({ rootModel }) {
  const valueFrom = rootModel.valueFrom;
  return !!(valueFrom && valueFrom.secretKeyRef);
}

function getKeyOrValue({ itemCtx }) {
  if (itemCtx.valueFrom && itemCtx.valueFrom.configMapKeyRef) {
    return itemCtx.valueFrom.configMapKeyRef.key;
  } else if (itemCtx.valueFrom && itemCtx.valueFrom.secretKeyRef) {
    return itemCtx.valueFrom.secretKeyRef.key;
  } else {
    return itemCtx.value;
  }
}

function setValueFrom({ rootModel }) {
  if (isConfigMapTypeValueFrom({ rootModel })) {
    return "configMap";
  } else if (isSecretTypeValueFrom({ rootModel })) {
    return "secret";
  } else {
    return "input";
  }
}

function onValueFromChange({
  rootModel,
  discriminator,
  getValue,
  updateModelValue,
}) {
  const valueFrom = getValue(discriminator, "/valueFromType");
  if (valueFrom === "input") {
    if (isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", true);
    if (isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", true);
  } else if (valueFrom === "secret") {
    if (!isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", false, {});
    if (isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", true);
  } else if (valueFrom === "configMap") {
    if (!isConfigMapTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/configMapKeyRef", false, {});
    if (isSecretTypeValueFrom({ rootModel }))
      updateModelValue("valueFrom/secretKeyRef", true);
  }
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
  { commit, discriminator, getValue },
  property
) {
  const reconfigurationType = getValue(discriminator, "/reconfigurationType");
  if (reconfigurationType === "remove") {
    commit("wizard/model$delete", `/spec/configuration/${property}`);

    commit("wizard/model$update", {
      path: `/spec/configuration/${property}/removeCustomConfig`,
      value: true,
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      `/spec/configuration/${property}/configSecret`
    );
    commit(
      "wizard/model$delete",
      `/spec/configuration/${property}/inlineConfig`
    );
    commit(
      "wizard/model$delete",
      `/spec/configuration/${property}/removeCustomConfig`
    );
  }
}
async function disableReconfigurationType(
  { axios, storeGet, model, getValue, watchDependency, itemCtx },
  dbType,
  prop
) {
  const dbDetails = await getMongoDetails({
    axios,
    storeGet,
    model,
    getValue,
    watchDependency,
  });

  const { spec } = dbDetails || {};
  if (dbType === "standalone" || dbType === "replicaSet") {
    if (itemCtx.value === "inlineConfig" || itemCtx.value === "remove") {
      if (spec.configSecret) return false;
      else return true;
    } else return false;
  } else {
    const { shardTopology } = spec || {};
    if (itemCtx.value === "inlineConfig" || itemCtx.value === "remove") {
      if (
        shardTopology &&
        shardTopology[prop] &&
        shardTopology[prop].configSecret
      )
        return false;
      else return true;
    } else return false;
  }
}

// for tls
async function hasTlsField({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const tls = await getDbTls({
    axios,
    storeGet,
    model,
    getValue,
    watchDependency,
  });

  return !!tls;
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
  const cluster = storeGet("/clusterInfo/name");
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

async function isIssuerRefRequired({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const hasTls = await hasTlsField({
    axios,
    storeGet,
    model,
    getValue,
    watchDependency,
  });

  return !hasTls;
}

// return {
//   getNamespaces,
//   getMongoDbs,
//   getMongoDbVersions,
// };


return {
	returnFalse,
	getNamespaces,
	getMongoDbs,
	getMongoDetails,
	getMongoDbVersions,
	ifRequestTypeEqualsTo,
	onRequestTypeChange,
	getDbTls,
	getDbType,
	disableOpsRequest,
	initNamespace,
	initDatabaseRef,
	ifDbTypeEqualsTo,
	getConfigSecrets,
	showPodTemplate,
	isEqualToValueFromType,
	getNamespacedResourceList,
	getResourceList,
	resourceNames,
	unNamespacedResourceNames,
	showConfigMapSelectField,
	showConfigMapInputField,
	showSecretSelectField,
	showSecretInputField,
	getSecretKeys,
	hasSecretKeys,
	hasNoSecretKeys,
	getConfigMapKeys,
	hasConfigMapKeys,
	hasNoConfigMapKeys,
	getSecrets,
	hasExistingSecret,
	hasNoExistingSecret,
	getImagePullSecrets,
	getValueFrom,
	getRefName,
	getKeyOrValue,
	setValueFrom,
	onValueFromChange,
	ifReconfigurationTypeEqualsTo,
	onReconfigurationTypeChange,
	disableReconfigurationType,
	hasTlsField,
	initIssuerRefApiGroup,
	getIssuerRefsName,
	hasIssuerRefName,
	hasNoIssuerRefName,
	initTlsOperation,
	onTlsOperationChange,
	showIssuerRefAndCertificates,
	isIssuerRefRequired
}