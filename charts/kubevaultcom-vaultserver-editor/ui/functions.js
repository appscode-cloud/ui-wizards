// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern
async function fetchJsons({ axios, itemCtx }) {
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
  const owner = storeGet("/user/username");
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

async function getSecrets({
  storeGet,
  axios,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/user/username");
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
  const owner = storeGet("/user/username");
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

async function getStorageClassNames({ axios, storeGet, commit }, path) {
  const owner = storeGet("/user/username");
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

function returnFalse() {
  return false;
}

function returnStringYes() {
  return "yes";
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  return !!val;
}

// ************************* Basic Info **********************************************
function onNameChange({ commit, model, getValue, discriminator }) {
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

  const backendType = getVaultBackendType({ model, getValue, discriminator });
  const unsealerMode = getUnsealerMode({ model, getValue, discriminator });

  // to reset backendCredSecret name field
  const hasSecretBackendCreds = getValue(
    model,
    "/resources/secret_backend_creds"
  );
  if (hasSecretBackendCreds) {
    const { secretNamePath } = backendSecretObj[backendType] || {};
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`,
      value: `${dbName}-backend-creds`,
      force: true,
    });
  }

  // to reset backendTlsSecret name field
  const hasSecretBackendTls = getValue(model, "/resources/secret_backend_tls");
  if (hasSecretBackendTls) {
    const { tlsSecretNamePath } = backendSecretObj[backendType] || {};
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`,
      value: `${dbName}-backend-tls`,
      force: true,
    });
  }

  // to reset unsealerCredSecret name field
  const hasSecretUnsealerCreds = getValue(
    model,
    "/resources/secret_unsealer_creds"
  );
  if (hasSecretUnsealerCreds) {
    const { secretNamePath } = unsealerSecretObj[unsealerMode] || {};
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
      value: `${dbName}-unsealer-creds`,
      force: true,
    });
  }

  // to reset unsealerTlsSecret name field
  const hasTlsSecretUnsealer = getValue(
    model,
    "/resources/secret_unsealer_tls"
  );
  if (hasTlsSecretUnsealer) {
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
      value: `${dbName}-unsealer-tls`,
      force: true,
    });
  }

  // update monitoring fields value which has name dependency
  const agent = getValue(
    model,
    "/resources/kubedbComPostgres/spec/monitor/agent"
  );
  const labels = getValue(
    model,
    "/resources/kubedbComPostgres/spec/metadata/labels"
  );
  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels",
      value: labels,
      force: true,
    });
  }

  // update backup fields value which has name dependency
  const scheduleBackup = getValue(
    model,
    "/resources/stashAppscodeComBackupConfiguration"
  );
  if (scheduleBackup) {
    commit("wizard/model$update", {
      path: "/resources/stashAppscodeComBackupConfiguration/spec/target",
      value: {
        ref: {
          apiVersion: "appcatalog.appscode.com/v1alpha1",
          kind: "AppBinding",
          name: dbName,
        },
      },
      force: true,
    });
  }

  // update initialization fields value which has name dependency
  const prePopulateDatabase = getValue(
    model,
    "/resources/stashAppscodeComRestoreSession_init"
  );
  if (prePopulateDatabase) {
    commit("wizard/model$update", {
      path: "/resources/stashAppscodeComRestoreSession_init/spec/target",
      value: {
        ref: {
          apiVersion: "appcatalog.appscode.com/v1alpha1",
          kind: "AppBinding",
          name: dbName,
        },
      },
      force: true,
    });
  }
}

async function getVaultServerVersions(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/route/params/cluster");

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

function onNamespaceChange({ commit, model, getValue }) {
  const namespace = getValue(model, "/metadata/release/namespace");
  const agent = getValue(
    model,
    "/resources/kubedbComPostgres/spec/monitor/agent"
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
    "/resources/kubedbComPostgres/spec/metadata/labels"
  );

  const agent = getValue(
    model,
    "/resources/kubedbComPostgres/spec/monitor/agent"
  );

  if (agent === "prometheus.io") {
    commit("wizard/model$update", {
      path: "/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels",
      value: labels,
      force: true,
    });
  }
}

/********************************** Backend *************** */

const backendSecretObj = {
  azure: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["account_key"],
  },
  consul: {
    secretNamePath: "aclTokenSecretRef/name",
    secretObjectDataKeys: ["aclToken"],
    tlsSecretNamePath: "tlsSecretRef/name",
    tlsSecretObjectDataKeys: ["ca.crt", "client.crt", "client.key"],
  },
  dynamodb: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["access_key", "secret_key", "session_token"],
  },
  etcd: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["password", "username"],
    tlsSecretNamePath: "tlsSecretRef/name",
    tlsSecretObjectDataKeys: ["tls_ca_file"],
  },
  gcs: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["sa.json"],
  },
  mysql: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["password", "username"],
    tlsSecretNamePath: "tlsSecretRef/name",
    tlsSecretObjectDataKeys: ["tls_ca_file"],
  },
  postgresql: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["connection_url"],
  },
  s3: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["access_key", "secret_key"],
  },
  swift: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["auth_token", "password", "username"],
  },
};

const dottedToDiscriminatorPath = {
  "sa.json": "sa_json",
  "ca.crt": "ca_crt",
  "client.crt": "client_crt",
  "client.key": "client_key",
  "client-cert": "client_cert",
  "client-cert-password": "client_cert_password",
  "client-id": "client_id",
  "client-secret": "client_secret",
};

const hasCredentialSecret = [
  "azure",
  "consul",
  "dynamodb",
  "etcd",
  "gcs",
  "mysql",
  "postgresql",
  "s3",
  "swift",
];

const hasTlsSecret = ["consul", "mysql", "etcd"];

const lowAvailableStorageBackends = ["azure", "inmem", "s3", "swift"];

function isLowAvailableStorageBackendSelected({
  model,
  getValue,
  watchDependency,
  discriminator,
}) {
  watchDependency("model#/resources/kubevaultComVaultServer/spec/backend");
  const backendType = getVaultBackendType({ model, getValue, discriminator });
  return lowAvailableStorageBackends.includes(backendType);
}

function onVaultBackendTypeChange({ discriminator, model, getValue, commit }) {
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

  if (selectedBackend) {
    backends.forEach((item) => {
      if (item !== selectedBackend) {
        commit(
          "wizard/model$delete",
          `/resources/kubevaultComVaultServer/spec/backend/${item}`
        );
        backendSecretObj[item]?.secretObjectDataKeys.forEach((key) => {
          commit(
            "wizard/model$delete",
            `/resources/secret_backend_creds/stringData/${key}`
          );
        });
      } else {
        const backendObj = getValue(
          model,
          `/resources/kubevaultComVaultServer/spec/backend/${item}`
        );
        if (!backendObj) {
          commit("wizard/model$update", {
            path: `/resources/kubevaultComVaultServer/spec/backend/${item}`,
            value: {},
            force: true,
          });

          const vsName = getValue(model, "/metadata/release/name");

          // add cred secret name to backend object
          const createCredSecretStatus = getValue(
            model,
            "/resources/secret_backend_creds"
          );
          if (createCredSecretStatus && hasCredentialSecret.includes(item)) {
            const { secretNamePath } = backendSecretObj[item] || {};

            commit("wizard/model$update", {
              path: `/resources/kubevaultComVaultServer/spec/backend/${item}/${secretNamePath}`,
              value: `${vsName}-backend-creds`,
              force: true,
            });
          } else {
            commit("wizard/model$delete", `/resources/secret_backend_creds`);
          }

          // add tls secret name to backend object
          const createTlsSecretStatus = getValue(
            model,
            "/resources/secret_backend_tls"
          );
          if (createTlsSecretStatus && hasTlsSecret.includes(item)) {
            const { tlsSecretNamePath } =
              backendSecretObj[item] ||
              commit("wizard/model$update", {
                path: `/resources/kubevaultComVaultServer/spec/backend/${item}/${tlsSecretNamePath}`,
                value: `${vsName}-backend-tls`,
                force: true,
              });
          } else {
            commit("wizard/model$delete", `/resources/secret_backend_tls`);
          }
        }
      }
    });
  } else {
    commit(
      "wizard/model$delete",
      `/resources/kubevaultComVaultServer/spec/backend`
    );
    commit("wizard/model$delete", `/resources/secret_backend_creds`);
    commit("wizard/model$delete", `/resources/secret_backend_tls`);
  }

  // update replica for lowAvailableStorage backend
  if (lowAvailableStorageBackends.includes(selectedBackend)) {
    commit("wizard/model$update", {
      path: "/resources/kubevaultComVaultServer/spec/replicas",
      value: 1,
      force: true,
    });
  }
}

function resetBackendSecretDiscriminator({ setDiscriminatorValue }) {
  setDiscriminatorValue("/data", undefined);
  setDiscriminatorValue("/secretName", "");
}

function getVaultBackendType({ model, getValue, discriminator }) {
  const backend =
    getValue(model, "/resources/kubevaultComVaultServer/spec/backend") || {};

  if (Object.keys(backend).length)
    return Object.keys(backend).find((key) => key);
  else {
    return getValue(discriminator, "/backend");
  }
}

// credential secret

function setCreateCredentialSecretStatus({ model, getValue }) {
  const backendCreds = getValue(model, "/resources/secret_backend_creds");
  return !!backendCreds;
}

function onCreateCredentialSecretChange({
  discriminator,
  model,
  getValue,
  commit,
  setDiscriminatorValue,
}) {
  const createCredSecretStatus = getValue(
    discriminator,
    "/createCredentialSecret"
  );
  const backend = getValue(discriminator, "/backend");
  const vsName = getValue(model, "/metadata/release/name");
  const { secretNamePath } = backendSecretObj[backend] || {};

  if (createCredSecretStatus) {
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backend}/${secretNamePath}`,
      value: `${vsName}-backend-creds`,
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/secret_backend_creds");
    commit(
      "wizard/model$delete",
      `/resources/kubevaultComVaultServer/spec/backend/${backend}/${secretNamePath}`
    );
    resetBackendSecretDiscriminator({ setDiscriminatorValue });
  }
}

function showCredentialSecretField({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/backend");
  const backendType = getValue(discriminator, "/backend");
  return hasCredentialSecret.includes(backendType);
}

function showBackendExistingCredentialSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/createCredentialSecret");
  const createCredSecret = getValue(discriminator, "/createCredentialSecret");
  return !createCredSecret;
}

function showBackendCreateCredentialSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  return !showBackendExistingCredentialSecretSection({
    discriminator,
    getValue,
    watchDependency,
  });
}

function showCredentialCreateSecretField(
  { discriminator, getValue, watchDependency },
  value
) {
  watchDependency("discriminator#/backend");
  const backendType = getValue(discriminator, "/backend");

  return value === backendType;
}

function onCredSecretNameChange({ model, commit, getValue, discriminator }) {
  const secretName = getValue(discriminator, "/secretName");
  const backendType = getVaultBackendType({ model, getValue, discriminator });

  if (backendType && secretName) {
    const { secretNamePath } = backendSecretObj[backendType] || {};

    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`,
      value: secretName,
      force: true,
    });
  }
}

function onCredSecretDataChange({ commit, getValue, discriminator, model }) {
  const data = getValue(discriminator, "/data");
  const backend = getVaultBackendType({ model, getValue, discriminator });

  if (data) {
    commit("wizard/model$delete", `/resources/secret_backend_creds/stringData`);

    backendSecretObj[backend]?.secretObjectDataKeys.forEach((path) => {
      commit("wizard/model$update", {
        path: `/resources/secret_backend_creds/stringData/${path}`,
        value: data[dottedToDiscriminatorPath[path] || path] || "",
        force: true,
      });
    });
  }
}

function setCredSecretName({ model, getValue, discriminator }) {
  const backendType = getVaultBackendType({ model, getValue, discriminator });
  let secretName;
  if (backendType) {
    const { secretNamePath } = backendSecretObj[backendType] || {};
    secretName = getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`
    );
  }
  return secretName || "";
}

function setCredSecretData({
  setDiscriminatorValue,
  model,
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/backend");

  const data =
    getValue(model, "/resources/secret_backend_creds/stringData") || {};

  const createCred = getValue(discriminator, "/createCredentialSecret");

  if (createCred) {
    if (data) {
      const modifiedData = Object.keys(data).reduce((acc, key) => {
        acc[dottedToDiscriminatorPath[key] || key] = data[key];
        return acc;
      }, {});
      setDiscriminatorValue("/data", modifiedData);
    } else return setDiscriminatorValue("/data", {});
  }
}

// tls secret

function setCreateTlsSecretStatus({ model, getValue }) {
  const backendTls = getValue(model, "/resources/secret_backend_tls");

  return !!backendTls;
}

function onCreateTlsSecretChange({
  discriminator,
  model,
  getValue,
  commit,
  setDiscriminatorValue,
}) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const backend = getValue(discriminator, "/backend");
  const vsName = getValue(model, "/metadata/release/name");

  const { tlsSecretNamePath } = backendSecretObj[backend] || {};

  if (createTlsSecretStatus) {
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backend}/${tlsSecretNamePath}`,
      value: `${vsName}-backend-tls`,
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/secret_backend_tls");
    commit(
      "wizard/model$delete",
      `/resources/kubevaultComVaultServer/spec/unsealer/mode/${backend}/${tlsSecretNamePath}`
    );

    resetBackendSecretDiscriminator({ setDiscriminatorValue });
  }
}

function showTlsSecretField({ discriminator, getValue, watchDependency }) {
  watchDependency("discriminator#/backend");
  const backendType = getValue(discriminator, "/backend");
  return hasTlsSecret.includes(backendType);
}

function showBackendExistingTlsSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/createTlsSecret");
  const createTlsSecret = getValue(discriminator, "/createTlsSecret");
  return !createTlsSecret;
}

function showBackendCreateTlsSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  return !showBackendExistingTlsSecretSection({
    discriminator,
    getValue,
    watchDependency,
  });
}

function showTlsCreateSecretField(
  { discriminator, getValue, watchDependency },
  value
) {
  watchDependency("discriminator#/backend");
  const backendType = getValue(discriminator, "/backend");

  return value === backendType;
}

function onTlsSecretNameChange({ model, commit, getValue, discriminator }) {
  const secretName = getValue(discriminator, "/secretName");
  const backendType = getVaultBackendType({ model, getValue, discriminator });

  if (backendType && secretName) {
    const { tlsSecretNamePath } = backendSecretObj[backendType] || {};

    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`,
      value: secretName,
      force: true,
    });
  }
}

function onTlsSecretDataChange({ commit, getValue, discriminator, model }) {
  const data = getValue(discriminator, "/data");
  const backend = getVaultBackendType({ model, getValue, discriminator });

  if (data) {
    commit("wizard/model$delete", `/resources/secret_backend_tls/stringData`);
    backendSecretObj[backend]?.tlsSecretObjectDataKeys.forEach((path) => {
      commit("wizard/model$update", {
        path: `/resources/secret_backend_tls/stringData/${path}`,
        value: data[dottedToDiscriminatorPath[path] || path] || "",
        force: true,
      });
    });
  }
}

function setTlsSecretName({ model, getValue, discriminator }) {
  const backendType = getVaultBackendType({ model, getValue, discriminator });
  let secretName;
  if (backendType) {
    const { tlsSecretNamePath } = backendSecretObj[backendType] || {};
    secretName = getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`
    );
  }
  return secretName || "";
}

function setTlsSecretData({
  setDiscriminatorValue,
  model,
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/backend");
  const createTls = getValue(discriminator, "/createTlsSecret");
  const data =
    getValue(model, "/resources/secret_backend_tls/stringData") || {};

  if (createTls) {
    if (data) {
      const modifiedData = Object.keys(data).reduce((acc, key) => {
        acc[dottedToDiscriminatorPath[key] || key] = data[key];
        return acc;
      }, {});
      setDiscriminatorValue("/data", modifiedData);
    } else return setDiscriminatorValue("/data", {});
  }
}

// ************************* Allowed Secret Engines **********************************************
function setDefaultNamespaceFrom() {
  return "Same";
}

// ************************* Auth Methods **********************************************
function isAuthMethodTypeEqualTo(
  { rootModel, getValue, watchDependency },
  expectedType
) {
  watchDependency("rootModel#/type");
  const selectedType = getValue(rootModel, "/type");
  return selectedType === expectedType;
}

function onAuthMethodTypeChange({ rootModel, getValue, updateModelValue }) {
  const selectedType = getValue(rootModel, "/type");
  const configList = ["kubernetes", "oidc", "jwt"];
  configList.forEach((item) => {
    if (item !== selectedType) {
      updateModelValue(`${item}Config`, true);
    }
  });
}

// ************************* Unsealer **********************************************

const unsealerSecretObj = {
  awsKmsSsm: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["access_key", "secret_key"],
  },
  azureKeyVault: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["client-id", "client-secret"],
  },
  googleKmsGcs: {
    secretNamePath: "credentialSecretRef/name",
    secretObjectDataKeys: ["sa.json"],
  },
};

function onUnsealerModeChange({ discriminator, getValue, commit, model }) {
  const unsealerModes = [
    "awsKmsSsm",
    "azureKeyVault",
    "googleKmsGcs",
    "kubernetesSecret",
  ];

  const selectedMode = getValue(discriminator, "/mode");

  const { secretNamePath } = unsealerSecretObj[selectedMode] || {};
  const vsName = getValue(model, "/metadata/release/name");

  if (selectedMode !== "kubernetesSecret" && secretNamePath) {
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${selectedMode}/${secretNamePath}`,
      value: `${vsName}-unsealer-creds`,
      force: true,
    });
  } else {
    commit("wizard/model$delete", `/resources/secret_unsealer_creds`);
  }

  unsealerModes.forEach((item) => {
    if (item && item !== selectedMode) {
      commit(
        "wizard/model$delete",
        `/resources/kubevaultComVaultServer/spec/unsealer/mode/${item}`
      );
      unsealerSecretObj[item]?.secretObjectDataKeys.forEach((key) => {
        commit(
          "wizard/model$delete",
          `/resources/secret_unsealer_creds/stringData/${key}`
        );
      });
    }
  });

  // delete tlsSecret object if unsealer mode is not azureKeyVault
  if (selectedMode !== "azureKeyVault") {
    commit("wizard/model$delete", `/resources/secret_unsealer_tls`);
  }
}

function resetUnsealerCredDiscriminatorData({ setDiscriminatorValue }) {
  setDiscriminatorValue("/data", undefined);
  setDiscriminatorValue("/secretName", "");
}

function getUnsealerMode({ model, getValue, discriminator }) {
  const unsealerMode =
    getValue(model, "/resources/kubevaultComVaultServer/spec/unsealer/mode") ||
    {};
  if (Object.keys(unsealerMode).length)
    return Object.keys(unsealerMode).find((key) => key);
  else {
    return getValue(discriminator, "/mode");
  }
}

function setCreateUnsealerCredentialSecretStatus({ model, getValue }) {
  const unsealerCreds = getValue(model, "/resources/secret_unsealer_creds");

  return !!unsealerCreds;
}

function onCreateUnsealerCredentialSecretChange({
  discriminator,
  model,
  getValue,
  commit,
  setDiscriminatorValue,
}) {
  const createCredSecretStatus = getValue(
    discriminator,
    "/createCredentialSecret"
  );
  const unsealerMode = getValue(discriminator, "/mode");
  const vsName = getValue(model, "/metadata/release/name");

  const { secretNamePath } = unsealerSecretObj[unsealerMode] || {};

  if (createCredSecretStatus) {
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
      value: `${vsName}-unsealer-creds`,
      force: true,
    });
  } else {
    commit("wizard/model$delete", "/resources/secret_unsealer_creds");
    commit(
      "wizard/model$delete",
      `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`
    );

    resetUnsealerCredDiscriminatorData({ setDiscriminatorValue });
  }
}

function showUnsealerCredentialSecretField({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/mode");
  const unsealerMode = getValue(discriminator, "/mode");
  return Object.keys(unsealerSecretObj).includes(unsealerMode);
}

function showUnsealerExistingCredentialSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/createCredentialSecret");
  const createCredSecret = getValue(discriminator, "/createCredentialSecret");
  return !createCredSecret;
}

function showUnsealerCreateCredentialSecretSection({
  discriminator,
  getValue,
  watchDependency,
}) {
  return !showUnsealerExistingCredentialSecretSection({
    discriminator,
    getValue,
    watchDependency,
  });
}

function showUnsealerCredentialCreateSecretField(
  { discriminator, getValue, watchDependency },
  value
) {
  watchDependency("discriminator#/mode");
  const mode = getValue(discriminator, "/mode");

  return value === mode;
}

function onUnsealerCredSecretNameChange({
  model,
  commit,
  getValue,
  discriminator,
}) {
  const secretName = getValue(discriminator, "/secretName");
  const unsealerMode = getUnsealerMode({ model, getValue, discriminator });

  if (unsealerMode && secretName) {
    const secretNamePath = unsealerSecretObj[unsealerMode].secretNamePath || "";
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
      value: secretName,
      force: true,
    });
  }
}

function onUnsealerCredSecretDataChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const data = getValue(discriminator, "/data");
  const mode = getUnsealerMode({ model, getValue, discriminator });

  if (data) {
    commit(
      "wizard/model$delete",
      `/resources/secret_unsealer_creds/stringData`
    );
    unsealerSecretObj[mode]?.secretObjectDataKeys.forEach((path) => {
      commit("wizard/model$update", {
        path: `/resources/secret_unsealer_creds/stringData/${path}`,
        value: data[dottedToDiscriminatorPath[path] || path] || "",
        force: true,
      });
    });
  }
}

function setUnsealerCredSecretName({ model, getValue, discriminator }) {
  const unsealerMode = getUnsealerMode({ model, getValue, discriminator });
  let secretName;
  if (unsealerMode) {
    const secretNamePath = unsealerSecretObj[unsealerMode].secretNamePath || "";
    secretName = getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`
    );
  }
  return secretName || "";
}

function setUnsealerCredSecretData({
  setDiscriminatorValue,
  model,
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/mode");

  const createCred = getValue(discriminator, "/createCredentialSecret");
  const data =
    getValue(model, "/resources/secret_unsealer_creds/stringData") || {};

  if (createCred) {
    if (data) {
      const modifiedData = Object.keys(data).reduce((acc, key) => {
        acc[dottedToDiscriminatorPath[key] || key] = data[key];
        return acc;
      }, {});

      setDiscriminatorValue("/data", modifiedData);
    } else return setDiscriminatorValue("/data", {});
  }
}

function setCreateUnsealerTlsSecretStatus({ model, getValue }) {
  const unsealerTlsSecret = getValue(model, "/resources/secret_unsealer_tls");

  return !!unsealerTlsSecret;
}

function onCreateUnsealerTlsSecretChange({
  discriminator,
  model,
  getValue,
  commit,
}) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const vsName = getValue(model, "/metadata/release/name");

  // if new tls secret option has been selected
  if (createTlsSecretStatus) {
    // set new tls secret name
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
      value: `${vsName}-unsealer-tls`,
      force: true,
    });

    const tlsSecretObj = getValue(model, "/resources/secret_unsealer_tls");

    if (!tlsSecretObj)
      // set default tls secret object
      commit("wizard/model$update", {
        path: "/resources/secret_unsealer_tls",
        value: {},
        force: true,
      });
  } else {
    // remove tls secret object
    commit("wizard/model$delete", "/resources/secret_unsealer_tls");
    commit("wizard/model$update", {
      path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
      value: "",
      force: true,
    });
  }
}

function showUnsealerExisitingTlsSecretField({
  discriminator,
  getValue,
  watchDependency,
}) {
  watchDependency("discriminator#/createTlsSecret");
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  return !createTlsSecretStatus;
}

function showUnsealerNewTlsSecretField({
  discriminator,
  getValue,
  watchDependency,
}) {
  return !showUnsealerExisitingTlsSecretField({
    discriminator,
    getValue,
    watchDependency,
  });
}

function setUnsealerTlsSecretClientCert({ discriminator, model, getValue }) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const clientCertValue = getValue(model, "/resources/secret_unsealer_tls");

  return createTlsSecretStatus ? clientCertValue : undefined;
}

function onUnsealerTlsClientCertChange({ discriminator, getValue, commit }) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const clientCertValue = getValue(discriminator, "/clientCert");

  if (createTlsSecretStatus) {
    // update tls secret object on discriminator client cert change
    commit("wizard/model$update", {
      path: "/resources/secret_unsealer_tls/stringData/client-cert",
      value: clientCertValue,
      force: true,
    });
  }
}

function setUnsealerTlsSecretClientCertPassword({
  discriminator,
  model,
  getValue,
}) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const clientCertValue = getValue(model, "/resources/secret_unsealer_tls");

  return createTlsSecretStatus ? clientCertValue : undefined;
}

function onUnsealerTlsClientCertPasswordChange({
  discriminator,
  getValue,
  commit,
}) {
  const createTlsSecretStatus = getValue(discriminator, "/createTlsSecret");
  const clientCertPasswordValue = getValue(
    discriminator,
    "/clientCertPassword"
  );

  if (createTlsSecretStatus) {
    // update tls secret object on discriminator client cert password change
    commit("wizard/model$update", {
      path: "/resources/secret_unsealer_tls/stringData/client-cert-password",
      value: clientCertPasswordValue,
      force: true,
    });
  }
}

// *************************** Data Source *************************

const dataSourceObj = {
  configMap: {
    name: "ConfigMap",
  },
  secret: {
    name: "Secret",
  },
  csi: {
    name: "CSI",
  },
};

function setDataSourceName({ itemCtx }) {
  const dataSource = getDataSourceType({ itemCtx });
  if (dataSource === "ConfigMap") return itemCtx?.configMap?.name || "";
  else if (dataSource === "Secret") return itemCtx?.secret?.secretName || "";
  else if (dataSource === "CSI") return itemCtx?.csi?.driver || "";
}

function getDataSourceType({ itemCtx }) {
  if (!itemCtx) return "";
  const dataSource = Object.keys(itemCtx).find((key) => key);
  return dataSourceObj[dataSource]?.name;
}

function getDataSourceTypeForEdit({ rootModel }) {
  if (!rootModel) return "";
  const dataSource = Object.keys(rootModel).find((key) => key);
  return dataSourceObj[dataSource]?.name;
}

function isDataSourceTypeEqualTo({ itemCtx }, type) {
  const dataSource = getDataSourceType({ itemCtx });
  return dataSource === type;
}

function onDataSourceChange({
  discriminator,
  getValue,
  updateModelValue,
  rootModel,
}) {
  const selectedDataSource = getValue(discriminator, "/dataSource");

  Object.keys(dataSourceObj).forEach((key) => {
    if (dataSourceObj[key].name === selectedDataSource) {
      if (!rootModel[key]) updateModelValue(key, false, {});
    } else {
      updateModelValue(key, true);
    }
  });
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
  const cluster = storeGet("/route/params/cluster");
  watchDependency(
    "model#/resources/kubevaultComVaultServer/spec/tls/issuerRef/apiGroup"
  );
  watchDependency(
    "model#/resources/kubevaultComVaultServer/spec/tls/issuerRef/kind"
  );
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

  if (!url) return [];

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
  const val = getValue(
    model,
    "/resources/kubevaultComVaultServer/spec/sslMode"
  );
  return val || "require";
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
      path: "/resources/kubevaultComVaultServer/spec/tls",
      value: { issuerRef: {}, certificates: [] },
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/kubevaultComVaultServer/spec/tls"
    );
    commit(
      "wizard/model$delete",
      "/resources/kubevaultComVaultServer/spec/sslMode"
    );
  }
}

function getAliasOptions() {
  return ["server", "client", "metrics-exporter"];
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
      path: "/resources/kubevaultComVaultServer/spec/monitor",
      value: {},
      force: true,
    });
  } else {
    commit(
      "wizard/model$delete",
      "/resources/kubevaultComVaultServer/spec/monitor"
    );
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

function onAgentChange({ commit, model, getValue }) {
  const agent = getValue(
    model,
    "/resources/kubedbComPostgres/spec/monitor/agent"
  );
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

//////////////////////////////////////// Service Monitor //////////////////////////////////////////////////////

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

function onConfigurationChange({ getValue, commit, discriminator, model }) {
  const value = getValue(discriminator, "/configuration");
  commit("wizard/model$update", {
    path: "/resources/secret_config/stringData/vault.hcl",
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
  return getValue(model, "/resources/secret_config/stringData/vault.hcl");
}

function setConfigurationFiles({ model, getValue }) {
  const value = getValue(model, "/resources/secret_config/data/vault.hcl");
  return atob(value);
}

function onSetCustomConfigChange({ discriminator, getValue, commit }) {
  const value = getValue(discriminator, "/setCustomConfig");

  if (value === "no") {
    commit(
      "wizard/model$delete",
      "/resources/kubevaultComVaultServer/spec/configSecret"
    );
    commit("wizard/model$delete", "/resources/secret_config");
  }
}

function isValueExistInModel({ model, getValue }, path) {
  const modelValue = getValue(model, path);
  return !!modelValue;
}

function getCreateNameSpaceUrl({ model, getValue, storeGet }) {
  const user = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const domain = storeGet("/domain") || '';
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
  getSecrets,
  isEqualToDiscriminatorPath,
  setValueFromModel,
  getNamespacedResourceList,
  getResourceList,
  resourceNames,
  unNamespacedResourceNames,
  getStorageClassNames,
  returnTrue,
  returnStringYes,
  getVaultServerVersions,
  isLowAvailableStorageBackendSelected,
  onVaultBackendTypeChange,
  getVaultBackendType,
  setCreateCredentialSecretStatus,
  onCreateCredentialSecretChange,
  showCredentialSecretField,
  showBackendExistingCredentialSecretSection,
  showBackendCreateCredentialSecretSection,
  showCredentialCreateSecretField,
  onCredSecretNameChange,
  onCredSecretDataChange,
  setCredSecretName,
  setCredSecretData,
  setCreateTlsSecretStatus,
  onCreateTlsSecretChange,
  showTlsSecretField,
  showBackendExistingTlsSecretSection,
  showBackendCreateTlsSecretSection,
  showTlsCreateSecretField,
  onTlsSecretNameChange,
  onTlsSecretDataChange,
  setTlsSecretName,
  setTlsSecretData,
  setDefaultNamespaceFrom,
  isAuthMethodTypeEqualTo,
  onAuthMethodTypeChange,
  onUnsealerModeChange,
  getUnsealerMode,
  setCreateUnsealerCredentialSecretStatus,
  onCreateUnsealerCredentialSecretChange,
  showUnsealerCredentialSecretField,
  showUnsealerExistingCredentialSecretSection,
  showUnsealerCreateCredentialSecretSection,
  showUnsealerCredentialCreateSecretField,
  onUnsealerCredSecretNameChange,
  onUnsealerCredSecretDataChange,
  setUnsealerCredSecretName,
  setUnsealerCredSecretData,
  setCreateUnsealerTlsSecretStatus,
  onCreateUnsealerTlsSecretChange,
  showUnsealerExisitingTlsSecretField,
  showUnsealerNewTlsSecretField,
  setUnsealerTlsSecretClientCert,
  onUnsealerTlsClientCertChange,
  setUnsealerTlsSecretClientCertPassword,
  onUnsealerTlsClientCertPasswordChange,
  setDataSourceName,
  getDataSourceType,
  getDataSourceTypeForEdit,
  isDataSourceTypeEqualTo,
  onDataSourceChange,
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
  onSetCustomConfigChange,
  isValueExistInModel,
  valueExists,
  onDataSourceChange,
  isValueExistInModel,
  onNamespaceChange,
  onLabelChange,
  onAgentChange,
  getCreateNameSpaceUrl,
};
