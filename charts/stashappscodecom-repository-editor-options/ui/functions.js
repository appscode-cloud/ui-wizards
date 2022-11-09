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

  if(!namespaced || namespace) {
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

function labelsDisabilityChecker({ itemCtx }) {
  const { key } = itemCtx;
  if (key.startsWith("app.kubernetes.io") || key.includes("helm")) return true;
  else return false;
}

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

function showExistingSecretSelection({
  discriminator,
  getValue,
  watchDependency,
}) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  const isExistingAuthSecretsFetching = getValue(
    discriminator,
    "/isExistingAuthSecretsFetching"
  );
  watchDependency("discriminator#/useExistingAuthSecret");
  watchDependency("discriminator#/isExistingAuthSecretsFetching");
  return !isExistingAuthSecretsFetching && useExistingAuthSecret;
}

async function initExistingAuthSecrets(ctx) {
  ctx.setDiscriminatorValue("/isExistingAuthSecretsFetching", true);
  const secrets = await getResources(ctx, "core", "v1", "secrets", true);
  // set secrets;
  ctx.setDiscriminatorValue("/existingAuthSecrets", secrets);
  ctx.setDiscriminatorValue("/isExistingAuthSecretsFetching", false);

  return true;
}

async function getExistingAuthSecrets({
  discriminator,
  getValue,
  watchDependency,
}) {
  const existingAuthSecrets = getValue(discriminator, "/existingAuthSecrets");
  watchDependency("discriminator#/existingAuthSecrets");
  return existingAuthSecrets;
}

function showCreateSecretForm({ discriminator, getValue, watchDependency }) {
  const useExistingAuthSecret = getValue(
    discriminator,
    "/useExistingAuthSecret"
  );
  watchDependency("discriminator#/useExistingAuthSecret");
  return !useExistingAuthSecret;
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
  const backend = getValue(model, '/spec/backend');
  const selectedBackend = Object.keys(backendMap).find((key) => {
    const value = backend && backend[key];

    return value ? true : false;
  });
  return selectedBackend || "gcs";
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  if (val) return true;
  else return false;
}

function onBackendProviderChange({ commit, getValue, model }) {
  const selectedBackendProvider = getValue(model, "/spec/backend/provider");

  // delete every other backend type from model  exect the selected one
  Object.keys(backendMap).forEach((key) => {
    if (key !== selectedBackendProvider) {
      commit("wizard/model$delete", `/spec/backend/${key}`);
    }
  });

  // set the selectedBackend type object in

  if (!valueExists(model, getValue, `/${selectedBackendProvider}`)) {
    commit("wizard/model$update", {
      path: `/spec/backend/${selectedBackendProvider}`,
      value: {},
      force: true,
    });
  }
}

function showBackendForm({ getValue, model, watchDependency }, value) {
  const backendProvider = getValue(model, "/spec/backend/provider");
  watchDependency("model#/spec/backend/provider");
  return backendProvider === value;
}

function showSecretForm(
  { model, getValue, watchDependency },
  value
) {
  const backendProvider = getValue(model, '/spec/backend/provider')
  watchDependency("model#/spec/backend/provider");
  return backendProvider === value;
}

return {
  getResources,
  labelsDisabilityChecker,
  fetchJsons,
  showExistingSecretSelection,
  initExistingAuthSecrets,
  getExistingAuthSecrets,
  showCreateSecretForm,
  initBackendProvider,
  onBackendProviderChange,
  showBackendForm,
  showSecretForm,
};
