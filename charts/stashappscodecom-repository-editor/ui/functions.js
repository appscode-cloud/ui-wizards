function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace || null;
}

function labelsDisabilityChecker({ itemCtx }) {
  const { key } = itemCtx;
  if (key.startsWith("app.kubernetes.io") || key.includes("helm")) return true;
  else return false;
}

// backend configuration
const backendMap = {
  azure: {
    spec: { container: "", maxConnections: 0, prefix: "" },
    auth: { AZURE_ACCOUNT_KEY: "", AZURE_ACCOUNT_NAME: "" },
  },
  b2: {
    spec: { bucket: "", prefix: "", maxConnections: 0 },
    auth: { B2_ACCOUNT_ID: "", B2_ACCOUNT_KEY: "" },
  },
  gcs: {
    spec: { bucket: "", prefix: "", maxConnections: 0 },
    auth: { GOOGLE_PROJECT_ID: "", GOOGLE_SERVICE_ACCOUNT_JSON_KEY: "" },
  },
  s3: {
    spec: { endpoint: "", bucket: "", prefix: "", region: "" },
    auth: {
      AWS_ACCESS_KEY_ID: "",
      AWS_SECRET_ACCESS_KEY: "",
      CA_CERT_DATA: "",
    },
  },
  swift: {
    spec: { container: "", prefix: "" },
    auth: {
      OS_AUTH_TOKEN: "",
      OS_AUTH_URL: "",
      OS_PASSWORD: "",
      OS_PROJECT_DOMAIN_NAME: "",
      OS_PROJECT_NAME: "",
      OS_REGION_NAME: "",
      OS_STORAGE_URL: "",
      OS_TENANT_ID: "",
      OS_TENANT_NAME: "",
      OS_USERNAME: "",
      OS_USER_DOMAIN_NAME: "",
      ST_AUTH: "",
      ST_KEY: "",
      ST_USER: "",
    },
  },
};

function initBackendProvider({ model, getValue }) {
  const backend = getValue(model, "/resources/stashAppscodeComRepository/spec/backend");
  const backendProvider = Object.keys(backend).find((key) => key)
  return backendProvider || "gcs";
}

function showBackendForm({ getValue, discriminator, watchDependency }, value) {
  watchDependency("discriminator#/backendProvider");
  const backendProvider = getValue(discriminator, "/backendProvider");
  return backendProvider === value;
}

async function getResources(
  { axios, storeGet, model, getValue, watchDependency },
  group,
  version,
  resource,
  namespaced
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  let namespace = "";
  if (namespaced) {
    namespace = getValue(model, "/metadata/release/namespace");
    watchDependency("model#/metadata/release/namespace");
  }

  if (!namespaced || namespace) {
    // call api if resource is either not namespaced
    // or namespaced and user has selected a namespace
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}${
          namespace ? "/namespaces/" + namespace : ""
        }/${resource}`,
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
  } else return [];
}


async function getSecrets(ctx) {
  const { axios, storeGet, model, getValue, watchDependency } = ctx;
  return getResources({ axios, storeGet, model, getValue, watchDependency }, "core", "v1", "secrets", true)
}

function getSecretEditPageLink({storeGet, getValue, model, watchDependency}) {
  watchDependency("model#/resources/stashAppscodeComRepository/spec/backend/storageSecretName")
  
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  const domain = storeGet("/domain") || '';
  const owner = storeGet("/route/params/user");
  const namespace = getValue(model, "/metadata/release/namespace");
  const secretName = getValue(model, "/resources/stashAppscodeComRepository/spec/backend/storageSecretName")

  return `${domain}/${owner}/kubernetes/${cluster}/core/v1/secrets/${secretName}?namespace=${namespace}`
}

function onSecretChange({commit, storeGet, model, getValue}) {
  const initialSecretObject = storeGet("/wizard/initialModel/resources/secret_repo_cred")
  const initialSecretName = storeGet("/wizard/initialModel/resources/secret_repo_cred/metadata/name")
  const secretName = getValue(model, "/resources/stashAppscodeComRepository/spec/backend/storageSecretName")

  if(initialSecretObject) {
    if(secretName === initialSecretName) {
      commit("wizard/model$update", {
        path: "/resources/secret_repo_cred",
        value: initialSecretObject,
        force: true
      })
    }
    else {
      commit("wizard/model$delete", "/resources/secret_repo_cred")
    }
  }
}

return {
  initNamespace,
  labelsDisabilityChecker,
  initBackendProvider,
  showBackendForm,
  getSecrets,
  getSecretEditPageLink,
  onSecretChange
};
