function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace || null;
}

function labelsDisabilityChecker({ itemCtx }) {
  const { key } = itemCtx;
  if (key.startsWith("app.kubernetes.io") || key.includes("helm")) return true;
  else return false;
}


function showSecretForm({ model, getValue }, value) {
  const backendProvider = initBackendProvider({ model, getValue })
  return backendProvider === value;
}

function showCreateSecretForm({ model, getValue, watchDependency }) {
  watchDependency("model#/resources/secret_repo_cred");
  const useCustomSecret = getValue(
    model,
    "/resources/secret_repo_cred"
  );

  return !!useCustomSecret;
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

function decodeBase64({}, value) {
  return atob(value);
}

function encodeBase64({}, value) {
  return btoa(value);
}

return {
  initNamespace,
  labelsDisabilityChecker,
  showCreateSecretForm,
  initBackendProvider,
  showBackendForm,
  showSecretForm,
  encodeBase64,
  decodeBase64
};
