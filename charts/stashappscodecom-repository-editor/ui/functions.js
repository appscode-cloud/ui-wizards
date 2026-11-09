const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/backendProvider', '')

  // backend configuration
  const backendMap = {
    azure: {
      spec: { container: '', maxConnections: 0, prefix: '' },
      auth: { AZURE_ACCOUNT_KEY: '', AZURE_ACCOUNT_NAME: '' },
    },
    b2: {
      spec: { bucket: '', prefix: '', maxConnections: 0 },
      auth: { B2_ACCOUNT_ID: '', B2_ACCOUNT_KEY: '' },
    },
    gcs: {
      spec: { bucket: '', prefix: '', maxConnections: 0 },
      auth: { GOOGLE_PROJECT_ID: '', GOOGLE_SERVICE_ACCOUNT_JSON_KEY: '' },
    },
    s3: {
      spec: { endpoint: '', bucket: '', prefix: '', region: '' },
      auth: {
        AWS_ACCESS_KEY_ID: '',
        AWS_SECRET_ACCESS_KEY: '',
        CA_CERT_DATA: '',
      },
    },
    swift: {
      spec: { container: '', prefix: '' },
      auth: {
        OS_AUTH_TOKEN: '',
        OS_AUTH_URL: '',
        OS_PASSWORD: '',
        OS_PROJECT_DOMAIN_NAME: '',
        OS_PROJECT_NAME: '',
        OS_REGION_NAME: '',
        OS_STORAGE_URL: '',
        OS_TENANT_ID: '',
        OS_TENANT_NAME: '',
        OS_USERNAME: '',
        OS_USER_DOMAIN_NAME: '',
        ST_AUTH: '',
        ST_KEY: '',
        ST_USER: '',
      },
    },
  }

  function initNamespace() {
    return storeGet('/route/query/namespace') || null
  }

  function labelsDisabilityChecker(key) {
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  function initBackendProvider() {
    const backend = getValue(model, '/resources/stashAppscodeComRepository/spec/backend') || {}
    const backendProvider = Object.keys(backend).find((key) => key)
    return backendProvider || 'gcs'
  }

  function showBackendForm(value) {
    const backendProvider = getValue(discriminator, '/backendProvider')
    return backendProvider === value
  }

  async function getResources(group, version, resource, namespaced) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    // `name|arg` arguments arrive as strings
    const isNamespaced = namespaced === true || namespaced === 'true'
    const namespace = isNamespaced ? getValue(model, '/metadata/release/namespace') : ''

    if (isNamespaced && !namespace) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        namespace,
        filter: { items: { metadata: { name: null } } },
      })

      const resources = resp?.items || []

      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        item.text = name
        item.value = name
        return true
      })
      return resources
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecrets() {
    return getResources('core', 'v1', 'secrets', true)
  }

  function getSecretEditPageLink() {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    const owner = storeGet('/route/params/user')
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      '/resources/stashAppscodeComRepository/spec/backend/storageSecretName',
    )

    return `${domain}/${owner}/kubernetes/${cluster}/core/v1/secrets/${secretName}?namespace=${namespace}`
  }

  function onSecretChange() {
    const initialSecretObject = storeGet('/wizard/initialModel/resources/secret_repo_cred')
    const initialSecretName = storeGet(
      '/wizard/initialModel/resources/secret_repo_cred/metadata/name',
    )
    const secretName = getValue(
      model,
      '/resources/stashAppscodeComRepository/spec/backend/storageSecretName',
    )

    if (initialSecretObject) {
      if (secretName === initialSecretName) {
        commit('wizard/model$update', {
          path: '/resources/secret_repo_cred',
          value: initialSecretObject,
          force: true,
        })
      } else {
        commit('wizard/model$delete', '/resources/secret_repo_cred')
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
    onSecretChange,
  }
}
