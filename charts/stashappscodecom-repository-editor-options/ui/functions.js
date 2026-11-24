const { useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

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

  async function getResources(group, version, resource, namespaced) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    let namespace = ''
    if (namespaced) {
      namespace = getValue(model, '/metadata/release/namespace')
    }

    if (!namespaced || namespace) {
      // call api if resource is either not namespaced
      // or namespaced and user has selected a namespace
      try {
        const resp = await akp.resources.list({
          owner,
          cluster,
          group,
          version,
          resource,
          ...(namespace ? { namespace } : {}),
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
    } else return []
  }

  function initNamespace() {
    return storeGet('/route/query/namespace') || null
  }
  function isNamespaceDisabled() {
    return !!initNamespace()
  }

  function showExistingSecretSelection() {
    const useExistingAuthSecret = getValue(discriminator, '/useExistingAuthSecret')
    const isExistingAuthSecretsFetching = getValue(discriminator, '/isExistingAuthSecretsFetching')

    return !isExistingAuthSecretsFetching && useExistingAuthSecret
  }

  function onChoiseChange() {
    const useExistingAuthSecret = getValue(discriminator, '/useExistingAuthSecret')
    // remove spec.authSecret
    commit('wizard/model$delete', '/spec/authSecret')
    if (useExistingAuthSecret) {
      // remove the auth from each backend
      Object.keys(backendMap).forEach((backend) => {
        commit('wizard/model$delete', `/spec/backend/${backend}/auth`)
      })
    }
  }

  async function initExistingAuthSecrets() {
    setDiscriminatorValue('/isExistingAuthSecretsFetching', true)
    const secrets = await getResources('core', 'v1', 'secrets', true)
    // set secrets;
    setDiscriminatorValue('/existingAuthSecrets', secrets)
    setDiscriminatorValue('/isExistingAuthSecretsFetching', false)

    return true
  }

  async function getExistingAuthSecrets() {
    const existingAuthSecrets = getValue(discriminator, '/existingAuthSecrets')
    return existingAuthSecrets
  }

  function showCreateSecretForm() {
    const useExistingAuthSecret = getValue(discriminator, '/useExistingAuthSecret')
    return !useExistingAuthSecret
  }

  // backend configuration
  function initBackendProvider() {
    const backend = getValue(model, '/spec/backend')
    const selectedBackend = Object.keys(backendMap).find((key) => {
      const value = backend && backend[key]

      return value ? true : false
    })
    return selectedBackend || 'gcs'
  }

  function valueExists(value, getValue, path) {
    const val = getValue(value, path)
    if (val) return true
    else return false
  }

  function onBackendProviderChange() {
    const selectedBackendProvider = getValue(model, '/spec/backend/provider')

    // delete every other backend type from model  exect the selected one
    Object.keys(backendMap).forEach((key) => {
      if (key !== selectedBackendProvider) {
        commit('wizard/model$delete', `/spec/backend/${key}`)
      }
    })

    // set the selectedBackend type object in

    if (!valueExists(model, getValue, `/${selectedBackendProvider}`)) {
      commit('wizard/model$update', {
        path: `/spec/backend/${selectedBackendProvider}`,
        value: {},
        force: true,
      })
    }
  }

  function showBackendForm(value) {
    const backendProvider = getValue(model, '/spec/backend/provider')
    return backendProvider === value
  }

  function showSecretForm(value) {
    const backendProvider = getValue(model, '/spec/backend/provider')
    return backendProvider === value
  }

  function getCreateNameSpaceUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const domain = storeGet('/domain') || ''
    if (domain.includes('bb.test')) {
      return `http://console.bb.test:5990/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    } else {
      const editedDomain = domain.replace('kubedb', 'console')
      return `${editedDomain}/${user}/kubernetes/${cluster}/core/v1/namespaces/create`
    }
  }

  function isVariantAvailable() {
    const variant = storeGet('/route/query/variant')
    return variant ? true : false
  }

  return {
    getResources,
    initNamespace,
    isNamespaceDisabled,
    showExistingSecretSelection,
    onChoiseChange,
    initExistingAuthSecrets,
    getExistingAuthSecrets,
    showCreateSecretForm,
    initBackendProvider,
    valueExists,
    onBackendProviderChange,
    showBackendForm,
    showSecretForm,
    getCreateNameSpaceUrl,
    isVariantAvailable,
  }
}
