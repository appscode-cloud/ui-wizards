const { useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, storeGet, discriminator, setDiscriminatorValue, commit } = useOperator(
    model,
    store.state,
  )

  const backendSecretObj = {
    azure: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['account_key'],
    },
    consul: {
      secretNamePath: 'aclTokenSecretRef/name',
      secretObjectDataKeys: ['aclToken'],
      tlsSecretNamePath: 'tlsSecretRef/name',
      tlsSecretObjectDataKeys: ['ca.crt', 'client.crt', 'client.key'],
    },
    dynamodb: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['access_key', 'secret_key', 'session_token'],
    },
    etcd: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['password', 'username'],
      tlsSecretNamePath: 'tlsSecretRef/name',
      tlsSecretObjectDataKeys: ['tls_ca_file'],
    },
    gcs: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['sa.json'],
    },
    mysql: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['password', 'username'],
      tlsSecretNamePath: 'tlsSecretRef/name',
      tlsSecretObjectDataKeys: ['tls_ca_file'],
    },
    postgresql: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['connection_url'],
    },
    s3: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['access_key', 'secret_key'],
    },
    swift: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['auth_token', 'password', 'username'],
    },
  }

  const unsealerSecretObj = {
    awsKmsSsm: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['access_key', 'secret_key'],
    },
    azureKeyVault: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['client-id', 'client-secret'],
    },
    googleKmsGcs: {
      secretNamePath: 'credentialSecretRef/name',
      secretObjectDataKeys: ['sa.json'],
    },
  }

  // *************************      common functions ********************************************
  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    return modelPathValue === value
  }

  async function getResources(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
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
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    if (!namespace) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: 'core',
        version: 'v1',
        resource: 'secrets',
        namespace,
        filter: { items: { metadata: { name: null }, type: null } },
      })

      const secrets = resp?.items || []

      const filteredSecrets = secrets.filter((item) => {
        const validType = ['kubernetes.io/service-account-token', 'Opaque']
        return validType.includes(item.type)
      })

      filteredSecrets.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        item.text = name
        item.value = name
        return true
      })
      return filteredSecrets
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function isEqualToDiscriminatorPath(value, discriminatorPath) {
    const discriminatorValue = getValue(discriminator, discriminatorPath)
    return discriminatorValue === value
  }

  function setValueFromModel(path) {
    return getValue(model, path)
  }

  async function getNamespacedResourceList({ namespace, group, version, resource }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (!namespace) return []

    let ans = []
    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        namespace,
        filter: { items: { metadata: { name: null }, type: null } },
      })

      ans = resp?.items || []
    } catch (e) {
      console.log(e)
    }

    return ans
  }

  async function getResourceList({ group, version, resource }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    let ans = []
    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        filter: { items: { metadata: { name: null }, type: null } },
      })

      ans = resp?.items || []
    } catch (e) {
      console.log(e)
    }

    return ans
  }

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/release/namespace')

    let resources = await getNamespacedResourceList({
      namespace,
      group,
      version,
      resource,
    })

    if (resource === 'secrets') {
      resources = resources.filter((item) => {
        const validType = ['kubernetes.io/service-account-token', 'Opaque']
        return validType.includes(item.type)
      })
    }

    return resources.map((resource) => {
      const name = (resource.metadata && resource.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  async function getStorageClassNames(path) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await akp.resources.list({
      owner,
      cluster,
      group: 'storage.k8s.io',
      version: 'v1',
      resource: 'storageclasses',
      filter: { items: { metadata: { name: null, annotations: null } } },
    })

    const resources = resp?.items || []

    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const isDefault =
        item.metadata &&
        item.metadata.annotations &&
        item.metadata.annotations['storageclass.kubernetes.io/is-default-class']

      if (isDefault) {
        commit('wizard/model$update', {
          path: path,
          value: name,
          force: true,
        })
      }

      item.text = name
      item.value = name
      return true
    })
    return resources
  }

  async function unNamespacedResourceNames(group, version, resource) {
    let resources = await getResourceList({
      group,
      version,
      resource,
    })

    if (resource === 'secrets') {
      resources = resources.filter((item) => {
        const validType = ['kubernetes.io/service-account-token', 'Opaque']
        return validType.includes(item.type)
      })
    }

    return resources.map((resource) => {
      const name = (resource.metadata && resource.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  function returnTrue() {
    return true
  }

  function returnFalse() {
    return false
  }

  function returnStringYes() {
    return 'yes'
  }

  function valueExists(value, getValue, path) {
    const val = getValue(value, path)
    return !!val
  }

  // ************************* Basic Info **********************************************
  function onNameChange() {
    const dbName = getValue(model, '/metadata/release/name')

    // to reset configSecret name field
    const hasSecretConfig = getValue(model, '/resources/secret_config')
    if (hasSecretConfig) {
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/configSecret/name',
        value: `${dbName}-config`,
        force: true,
      })
    }

    const backendType = getVaultBackendType()
    const unsealerMode = getUnsealerMode()

    // to reset backendCredSecret name field
    const hasSecretBackendCreds = getValue(model, '/resources/secret_backend_creds')
    if (hasSecretBackendCreds) {
      const { secretNamePath } = backendSecretObj[backendType] || {}
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`,
        value: `${dbName}-backend-creds`,
        force: true,
      })
    }

    // to reset backendTlsSecret name field
    const hasSecretBackendTls = getValue(model, '/resources/secret_backend_tls')
    if (hasSecretBackendTls) {
      const { tlsSecretNamePath } = backendSecretObj[backendType] || {}
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`,
        value: `${dbName}-backend-tls`,
        force: true,
      })
    }

    // to reset unsealerCredSecret name field
    const hasSecretUnsealerCreds = getValue(model, '/resources/secret_unsealer_creds')
    if (hasSecretUnsealerCreds) {
      const { secretNamePath } = unsealerSecretObj[unsealerMode] || {}
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
        value: `${dbName}-unsealer-creds`,
        force: true,
      })
    }

    // to reset unsealerTlsSecret name field
    const hasTlsSecretUnsealer = getValue(model, '/resources/secret_unsealer_tls')
    if (hasTlsSecretUnsealer) {
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
        value: `${dbName}-unsealer-tls`,
        force: true,
      })
    }

    // update monitoring fields value which has name dependency
    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')
    const labels = getValue(model, '/resources/kubedbComPostgres/spec/metadata/labels')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }

    // update backup fields value which has name dependency
    const scheduleBackup = getValue(model, '/resources/stashAppscodeComBackupConfiguration')
    if (scheduleBackup) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComBackupConfiguration/spec/target',
        value: {
          ref: {
            apiVersion: 'appcatalog.appscode.com/v1alpha1',
            kind: 'AppBinding',
            name: dbName,
          },
        },
        force: true,
      })
    }

    // update initialization fields value which has name dependency
    const prePopulateDatabase = getValue(model, '/resources/stashAppscodeComRestoreSession_init')
    if (prePopulateDatabase) {
      commit('wizard/model$update', {
        path: '/resources/stashAppscodeComRestoreSession_init/spec/target',
        value: {
          ref: {
            apiVersion: 'appcatalog.appscode.com/v1alpha1',
            kind: 'AppBinding',
            name: dbName,
          },
        },
        force: true,
      })
    }
  }

  async function getVaultServerVersions(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const queryParams = {
      filter: {
        items: {
          metadata: { name: null },
          spec: { version: null, deprecated: null },
        },
      },
    }

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group,
        version,
        resource,
        ...queryParams,
      })

      const resources = resp?.items || []

      // keep only non deprecated versions
      const filteredMongoDbVersions = resources.filter((item) => item.spec && !item.spec.deprecated)

      filteredMongoDbVersions.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        const specVersion = (item.spec && item.spec.version) || ''
        item.text = `${name} (${specVersion})`
        item.value = name
        return true
      })
      return filteredMongoDbVersions
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function onNamespaceChange() {
    const namespace = getValue(model, '/metadata/release/namespace')
    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
        value: [namespace],
        force: true,
      })
    }
  }

  function onLabelChange() {
    const labels = getValue(model, '/resources/kubedbComPostgres/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')

    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }
  }

  /********************************** Backend *************** */

  const dottedToDiscriminatorPath = {
    'sa.json': 'sa_json',
    'ca.crt': 'ca_crt',
    'client.crt': 'client_crt',
    'client.key': 'client_key',
    'client-cert': 'client_cert',
    'client-cert-password': 'client_cert_password',
    'client-id': 'client_id',
    'client-secret': 'client_secret',
  }

  const hasCredentialSecret = [
    'azure',
    'consul',
    'dynamodb',
    'etcd',
    'gcs',
    'mysql',
    'postgresql',
    's3',
    'swift',
  ]

  const hasTlsSecret = ['consul', 'mysql', 'etcd']

  const lowAvailableStorageBackends = ['azure', 'inmem', 's3', 'swift']

  function isLowAvailableStorageBackendSelected() {
    const backendType = getVaultBackendType()
    return lowAvailableStorageBackends.includes(backendType)
  }

  function onVaultBackendTypeChange() {
    const backends = [
      'azure',
      'consul',
      'dynamodb',
      'etcd',
      'gcs',
      'inmem',
      'mysql',
      'postgresql',
      'raft',
      's3',
      'swift',
    ]

    const selectedBackend = getValue(discriminator, '/backend')

    if (selectedBackend) {
      backends.forEach((item) => {
        if (item !== selectedBackend) {
          commit('wizard/model$delete', `/resources/kubevaultComVaultServer/spec/backend/${item}`)
          backendSecretObj[item]?.secretObjectDataKeys.forEach((key) => {
            commit('wizard/model$delete', `/resources/secret_backend_creds/stringData/${key}`)
          })
        } else {
          const backendObj = getValue(
            model,
            `/resources/kubevaultComVaultServer/spec/backend/${item}`,
          )
          if (!backendObj) {
            commit('wizard/model$update', {
              path: `/resources/kubevaultComVaultServer/spec/backend/${item}`,
              value: {},
              force: true,
            })

            const vsName = getValue(model, '/metadata/release/name')

            // add cred secret name to backend object
            const createCredSecretStatus = getValue(model, '/resources/secret_backend_creds')
            if (createCredSecretStatus && hasCredentialSecret.includes(item)) {
              const { secretNamePath } = backendSecretObj[item] || {}

              commit('wizard/model$update', {
                path: `/resources/kubevaultComVaultServer/spec/backend/${item}/${secretNamePath}`,
                value: `${vsName}-backend-creds`,
                force: true,
              })
            } else {
              commit('wizard/model$delete', `/resources/secret_backend_creds`)
            }

            // add tls secret name to backend object
            const createTlsSecretStatus = getValue(model, '/resources/secret_backend_tls')
            if (createTlsSecretStatus && hasTlsSecret.includes(item)) {
              const { tlsSecretNamePath } = backendSecretObj[item] || {}
              commit('wizard/model$update', {
                path: `/resources/kubevaultComVaultServer/spec/backend/${item}/${tlsSecretNamePath}`,
                value: `${vsName}-backend-tls`,
                force: true,
              })
            } else {
              commit('wizard/model$delete', `/resources/secret_backend_tls`)
            }
          }
        }
      })
    } else {
      commit('wizard/model$delete', `/resources/kubevaultComVaultServer/spec/backend`)
      commit('wizard/model$delete', `/resources/secret_backend_creds`)
      commit('wizard/model$delete', `/resources/secret_backend_tls`)
    }

    // update replica for lowAvailableStorage backend
    if (lowAvailableStorageBackends.includes(selectedBackend)) {
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/replicas',
        value: 1,
        force: true,
      })
    }
  }

  function resetBackendSecretDiscriminator() {
    setDiscriminatorValue('/data', undefined)
    setDiscriminatorValue('/secretName', '')
  }

  function getVaultBackendType() {
    const backend = getValue(model, '/resources/kubevaultComVaultServer/spec/backend') || {}

    if (Object.keys(backend).length) return Object.keys(backend).find((key) => key)
    else {
      return getValue(discriminator, '/backend')
    }
  }

  // credential secret

  function setCreateCredentialSecretStatus() {
    const backendCreds = getValue(model, '/resources/secret_backend_creds')
    return !!backendCreds
  }

  function onCreateCredentialSecretChange() {
    const createCredSecretStatus = getValue(discriminator, '/createCredentialSecret')
    const backend = getValue(discriminator, '/backend')
    const vsName = getValue(model, '/metadata/release/name')
    const { secretNamePath } = backendSecretObj[backend] || {}

    if (createCredSecretStatus) {
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backend}/${secretNamePath}`,
        value: `${vsName}-backend-creds`,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/secret_backend_creds')
      commit(
        'wizard/model$delete',
        `/resources/kubevaultComVaultServer/spec/backend/${backend}/${secretNamePath}`,
      )
      resetBackendSecretDiscriminator()
    }
  }

  function showCredentialSecretField() {
    const backendType = getValue(discriminator, '/backend')
    return hasCredentialSecret.includes(backendType)
  }

  function showBackendExistingCredentialSecretSection() {
    const createCredSecret = getValue(discriminator, '/createCredentialSecret')
    return !createCredSecret
  }

  function showBackendCreateCredentialSecretSection() {
    return !showBackendExistingCredentialSecretSection()
  }

  function showCredentialCreateSecretField(value) {
    const backendType = getValue(discriminator, '/backend')

    return value === backendType
  }

  function onCredSecretNameChange() {
    const secretName = getValue(discriminator, '/secretName')
    const backendType = getVaultBackendType()

    if (backendType && secretName) {
      const { secretNamePath } = backendSecretObj[backendType] || {}

      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`,
        value: secretName,
        force: true,
      })
    }
  }

  function onCredSecretDataChange() {
    const data = getValue(discriminator, '/data')
    const backend = getVaultBackendType()

    if (data) {
      commit('wizard/model$delete', `/resources/secret_backend_creds/stringData`)

      backendSecretObj[backend]?.secretObjectDataKeys.forEach((path) => {
        commit('wizard/model$update', {
          path: `/resources/secret_backend_creds/stringData/${path}`,
          value: data[dottedToDiscriminatorPath[path] || path] || '',
          force: true,
        })
      })
    }
  }

  function setCredSecretName() {
    const backendType = getVaultBackendType()
    let secretName
    if (backendType) {
      const { secretNamePath } = backendSecretObj[backendType] || {}
      secretName = getValue(
        model,
        `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${secretNamePath}`,
      )
    }
    return secretName || ''
  }

  function setCredSecretData() {
    const data = getValue(model, '/resources/secret_backend_creds/stringData') || {}

    const createCred = getValue(discriminator, '/createCredentialSecret')

    if (createCred) {
      if (data) {
        const modifiedData = Object.keys(data).reduce((acc, key) => {
          acc[dottedToDiscriminatorPath[key] || key] = data[key]
          return acc
        }, {})
        setDiscriminatorValue('/data', modifiedData)
      } else return setDiscriminatorValue('/data', {})
    }
  }

  // tls secret

  function setCreateTlsSecretStatus() {
    const backendTls = getValue(model, '/resources/secret_backend_tls')

    return !!backendTls
  }

  function onCreateTlsSecretChange() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const backend = getValue(discriminator, '/backend')
    const vsName = getValue(model, '/metadata/release/name')

    const { tlsSecretNamePath } = backendSecretObj[backend] || {}

    if (createTlsSecretStatus) {
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backend}/${tlsSecretNamePath}`,
        value: `${vsName}-backend-tls`,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/secret_backend_tls')
      commit(
        'wizard/model$delete',
        `/resources/kubevaultComVaultServer/spec/unsealer/mode/${backend}/${tlsSecretNamePath}`,
      )

      resetBackendSecretDiscriminator()
    }
  }

  function showTlsSecretField() {
    const backendType = getValue(discriminator, '/backend')
    return hasTlsSecret.includes(backendType)
  }

  function showBackendExistingTlsSecretSection() {
    const createTlsSecret = getValue(discriminator, '/createTlsSecret')
    return !createTlsSecret
  }

  function showBackendCreateTlsSecretSection() {
    return !showBackendExistingTlsSecretSection()
  }

  function showTlsCreateSecretField(value) {
    const backendType = getValue(discriminator, '/backend')

    return value === backendType
  }

  function onTlsSecretNameChange() {
    const secretName = getValue(discriminator, '/secretName')
    const backendType = getVaultBackendType()

    if (backendType && secretName) {
      const { tlsSecretNamePath } = backendSecretObj[backendType] || {}

      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`,
        value: secretName,
        force: true,
      })
    }
  }

  function onTlsSecretDataChange() {
    const data = getValue(discriminator, '/data')
    const backend = getVaultBackendType()

    if (data) {
      commit('wizard/model$delete', `/resources/secret_backend_tls/stringData`)
      backendSecretObj[backend]?.tlsSecretObjectDataKeys.forEach((path) => {
        commit('wizard/model$update', {
          path: `/resources/secret_backend_tls/stringData/${path}`,
          value: data[dottedToDiscriminatorPath[path] || path] || '',
          force: true,
        })
      })
    }
  }

  function setTlsSecretName() {
    const backendType = getVaultBackendType()
    let secretName
    if (backendType) {
      const { tlsSecretNamePath } = backendSecretObj[backendType] || {}
      secretName = getValue(
        model,
        `/resources/kubevaultComVaultServer/spec/backend/${backendType}/${tlsSecretNamePath}`,
      )
    }
    return secretName || ''
  }

  function setTlsSecretData() {
    const createTls = getValue(discriminator, '/createTlsSecret')
    const data = getValue(model, '/resources/secret_backend_tls/stringData') || {}

    if (createTls) {
      if (data) {
        const modifiedData = Object.keys(data).reduce((acc, key) => {
          acc[dottedToDiscriminatorPath[key] || key] = data[key]
          return acc
        }, {})
        setDiscriminatorValue('/data', modifiedData)
      } else return setDiscriminatorValue('/data', {})
    }
  }

  // ************************* Allowed Secret Engines **********************************************
  function setDefaultNamespaceFrom() {
    return 'Same'
  }

  // ************************* Auth Methods **********************************************
  function isAuthMethodTypeEqualTo(expectedType, index) {
    const selectedType = getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/authMethods/${index}/type`,
    )
    return selectedType === expectedType
  }

  function onAuthMethodTypeChange(index) {
    const path = `/resources/kubevaultComVaultServer/spec/authMethods/${index}`
    const selectedType = getValue(model, `${path}/type`)
    const configList = ['kubernetes', 'oidc', 'jwt']
    configList.forEach((item) => {
      if (item !== selectedType) commit('wizard/model$delete', `${path}/${item}Config`)
    })
  }

  // ************************* Unsealer **********************************************

  function onUnsealerModeChange() {
    const unsealerModes = ['awsKmsSsm', 'azureKeyVault', 'googleKmsGcs', 'kubernetesSecret']

    const selectedMode = getValue(discriminator, '/mode')

    const { secretNamePath } = unsealerSecretObj[selectedMode] || {}
    const vsName = getValue(model, '/metadata/release/name')

    if (selectedMode !== 'kubernetesSecret' && secretNamePath) {
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${selectedMode}/${secretNamePath}`,
        value: `${vsName}-unsealer-creds`,
        force: true,
      })
    } else {
      commit('wizard/model$delete', `/resources/secret_unsealer_creds`)
    }

    unsealerModes.forEach((item) => {
      if (item && item !== selectedMode) {
        commit(
          'wizard/model$delete',
          `/resources/kubevaultComVaultServer/spec/unsealer/mode/${item}`,
        )
        unsealerSecretObj[item]?.secretObjectDataKeys.forEach((key) => {
          commit('wizard/model$delete', `/resources/secret_unsealer_creds/stringData/${key}`)
        })
      }
    })

    // delete tlsSecret object if unsealer mode is not azureKeyVault
    if (selectedMode !== 'azureKeyVault') {
      commit('wizard/model$delete', `/resources/secret_unsealer_tls`)
    }
  }

  function resetUnsealerCredDiscriminatorData() {
    setDiscriminatorValue('/data', undefined)
    setDiscriminatorValue('/secretName', '')
  }

  function getUnsealerMode() {
    const unsealerMode =
      getValue(model, '/resources/kubevaultComVaultServer/spec/unsealer/mode') || {}
    if (Object.keys(unsealerMode).length) return Object.keys(unsealerMode).find((key) => key)
    else {
      return getValue(discriminator, '/mode')
    }
  }

  function setCreateUnsealerCredentialSecretStatus() {
    const unsealerCreds = getValue(model, '/resources/secret_unsealer_creds')

    return !!unsealerCreds
  }

  function onCreateUnsealerCredentialSecretChange() {
    const createCredSecretStatus = getValue(discriminator, '/createCredentialSecret')
    const unsealerMode = getValue(discriminator, '/mode')
    const vsName = getValue(model, '/metadata/release/name')

    const { secretNamePath } = unsealerSecretObj[unsealerMode] || {}

    if (createCredSecretStatus) {
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
        value: `${vsName}-unsealer-creds`,
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/secret_unsealer_creds')
      commit(
        'wizard/model$delete',
        `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
      )

      resetUnsealerCredDiscriminatorData()
    }
  }

  function showUnsealerCredentialSecretField() {
    const unsealerMode = getValue(discriminator, '/mode')
    return Object.keys(unsealerSecretObj).includes(unsealerMode)
  }

  function showUnsealerExistingCredentialSecretSection() {
    const createCredSecret = getValue(discriminator, '/createCredentialSecret')
    return !createCredSecret
  }

  function showUnsealerCreateCredentialSecretSection() {
    return !showUnsealerExistingCredentialSecretSection()
  }

  function showUnsealerCredentialCreateSecretField(value) {
    const mode = getValue(discriminator, '/mode')

    return value === mode
  }

  function onUnsealerCredSecretNameChange() {
    const secretName = getValue(discriminator, '/secretName')
    const unsealerMode = getUnsealerMode()

    if (unsealerMode && secretName) {
      const secretNamePath = unsealerSecretObj[unsealerMode].secretNamePath || ''
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
        value: secretName,
        force: true,
      })
    }
  }

  function onUnsealerCredSecretDataChange() {
    const data = getValue(discriminator, '/data')
    const mode = getUnsealerMode()

    if (data) {
      commit('wizard/model$delete', `/resources/secret_unsealer_creds/stringData`)
      unsealerSecretObj[mode]?.secretObjectDataKeys.forEach((path) => {
        commit('wizard/model$update', {
          path: `/resources/secret_unsealer_creds/stringData/${path}`,
          value: data[dottedToDiscriminatorPath[path] || path] || '',
          force: true,
        })
      })
    }
  }

  function setUnsealerCredSecretName() {
    const unsealerMode = getUnsealerMode()
    let secretName
    if (unsealerMode) {
      const secretNamePath = unsealerSecretObj[unsealerMode].secretNamePath || ''
      secretName = getValue(
        model,
        `/resources/kubevaultComVaultServer/spec/unsealer/mode/${unsealerMode}/${secretNamePath}`,
      )
    }
    return secretName || ''
  }

  function setUnsealerCredSecretData() {
    const createCred = getValue(discriminator, '/createCredentialSecret')
    const data = getValue(model, '/resources/secret_unsealer_creds/stringData') || {}

    if (createCred) {
      if (data) {
        const modifiedData = Object.keys(data).reduce((acc, key) => {
          acc[dottedToDiscriminatorPath[key] || key] = data[key]
          return acc
        }, {})

        setDiscriminatorValue('/data', modifiedData)
      } else return setDiscriminatorValue('/data', {})
    }
  }

  function setCreateUnsealerTlsSecretStatus() {
    const unsealerTlsSecret = getValue(model, '/resources/secret_unsealer_tls')

    return !!unsealerTlsSecret
  }

  function onCreateUnsealerTlsSecretChange() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const vsName = getValue(model, '/metadata/release/name')

    // if new tls secret option has been selected
    if (createTlsSecretStatus) {
      // set new tls secret name
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
        value: `${vsName}-unsealer-tls`,
        force: true,
      })

      const tlsSecretObj = getValue(model, '/resources/secret_unsealer_tls')

      if (!tlsSecretObj)
        // set default tls secret object
        commit('wizard/model$update', {
          path: '/resources/secret_unsealer_tls',
          value: {},
          force: true,
        })
    } else {
      // remove tls secret object
      commit('wizard/model$delete', '/resources/secret_unsealer_tls')
      commit('wizard/model$update', {
        path: `/resources/kubevaultComVaultServer/spec/unsealer/mode/azureKeyVault/tlsSecretRef/name`,
        value: '',
        force: true,
      })
    }
  }

  function showUnsealerExisitingTlsSecretField() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    return !createTlsSecretStatus
  }

  function showUnsealerNewTlsSecretField() {
    return !showUnsealerExisitingTlsSecretField()
  }

  function setUnsealerTlsSecretClientCert() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const clientCertValue = getValue(model, '/resources/secret_unsealer_tls')

    return createTlsSecretStatus ? clientCertValue : undefined
  }

  function onUnsealerTlsClientCertChange() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const clientCertValue = getValue(discriminator, '/clientCert')

    if (createTlsSecretStatus) {
      // update tls secret object on discriminator client cert change
      commit('wizard/model$update', {
        path: '/resources/secret_unsealer_tls/stringData/client-cert',
        value: clientCertValue,
        force: true,
      })
    }
  }

  function setUnsealerTlsSecretClientCertPassword() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const clientCertValue = getValue(model, '/resources/secret_unsealer_tls')

    return createTlsSecretStatus ? clientCertValue : undefined
  }

  function onUnsealerTlsClientCertPasswordChange() {
    const createTlsSecretStatus = getValue(discriminator, '/createTlsSecret')
    const clientCertPasswordValue = getValue(discriminator, '/clientCertPassword')

    if (createTlsSecretStatus) {
      // update tls secret object on discriminator client cert password change
      commit('wizard/model$update', {
        path: '/resources/secret_unsealer_tls/stringData/client-cert-password',
        value: clientCertPasswordValue,
        force: true,
      })
    }
  }

  // *************************** Data Source *************************

  const dataSourceObj = {
    configMap: {
      name: 'ConfigMap',
    },
    secret: {
      name: 'Secret',
    },
    csi: {
      name: 'CSI',
    },
  }

  // Data source rows edit a temp copy that keeps each row's source type
  function initDataSources(modelPath) {
    const dataSources = getValue(model, modelPath) || []
    return dataSources.map((item) => {
      const key = Object.keys(item || {}).find((k) => dataSourceObj[k])
      return { ...item, temp: { dataSource: dataSourceObj[key]?.name } }
    })
  }

  function onDataSourcesChange(modelPath) {
    const dataSources = getValue(discriminator, '/dataSources') || []
    const filtered = dataSources.map(({ temp, ...item }) => {
      const key = Object.keys(dataSourceObj).find((k) => dataSourceObj[k].name === temp?.dataSource)
      return key ? { [key]: item[key] || {} } : item
    })

    if (filtered.length) {
      commit('wizard/model$update', { path: modelPath, value: filtered, force: true })
    } else {
      commit('wizard/model$delete', modelPath)
    }
  }

  function isDataSourceTypeEqualTo(type, index) {
    return getValue(discriminator, `/dataSources/${index}/temp/dataSource`) === type
  }

  // ************************** TLS ******************************88

  function setApiGroup() {
    return 'cert-manager.io'
  }

  async function getIssuerRefsName() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const apiGroup = getValue(
      model,
      '/resources/kubevaultComVaultServer/spec/tls/issuerRef/apiGroup',
    )
    const kind = getValue(model, '/resources/kubevaultComVaultServer/spec/tls/issuerRef/kind')
    const namespace = getValue(model, '/metadata/release/namespace')

    let ref
    if (kind === 'Issuer') {
      ref = { resource: 'issuers', namespace }
    } else if (kind === 'ClusterIssuer') {
      ref = { resource: 'clusterissuers' }
    }

    if (!ref || !apiGroup || (ref.namespace !== undefined && !namespace)) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: apiGroup,
        version: 'v1',
        ...ref,
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

  function setSSLMode() {
    const val = getValue(model, '/resources/kubevaultComVaultServer/spec/sslMode')
    return val || 'require'
  }

  function showTlsConfigureSection() {
    const configureStatus = getValue(discriminator, '/configureTLS')
    return configureStatus
  }

  function onTlsConfigureChange() {
    const configureStatus = getValue(discriminator, '/configureTLS')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/tls',
        value: { issuerRef: {}, certificates: [] },
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubevaultComVaultServer/spec/tls')
      commit('wizard/model$delete', '/resources/kubevaultComVaultServer/spec/sslMode')
    }
  }

  function getAliasOptions() {
    return ['server', 'client', 'metrics-exporter']
  }

  /****** Monitoring *********/

  function showMonitoringSection() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubevaultComVaultServer/spec/monitor')
    }

    // update alert value depend on monitoring profile
    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: configureStatus ? 'warning' : 'none',
      force: true,
    })
  }

  function showCustomizeExporterSection() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    return configureStatus
  }

  function onCustomizeExporterChange() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit(
        'wizard/model$delete',
        '/resources/kubevaultComVaultServer/spec/monitor/prometheus/exporter',
      )
    }
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComPostgres/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
        value: [],
        force: true,
      })

      onNamespaceChange()
      onLabelChange()
    } else {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  //////////////////////////////////////// Service Monitor //////////////////////////////////////////////////////

  function isEqualToServiceMonitorType(value, index) {
    const type = getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/serviceTemplates/${index}/spec/type`,
    )
    return type === value
  }

  //////////////////// custom config /////////////////
  function onConfigurationSourceChange() {
    const configurationSource = getValue(discriminator, '/configurationSource')
    if (configurationSource === 'use-existing-config') {
      commit('wizard/model$delete', '/resources/secret_config')
    } else {
      const value = getValue(model, '/resources/secret_config')
      if (!value) {
        commit('wizard/model$update', {
          path: '/resources/secret_config',
          value: {},
          force: true,
        })
      }
      const configSecretName = `${getValue(model, '/metadata/release/name')}-config`
      commit('wizard/model$update', {
        path: '/resources/kubevaultComVaultServer/spec/configSecret/name',
        value: configSecretName,
        force: true,
      })
    }
  }

  function onConfigurationChange() {
    const value = getValue(discriminator, '/configuration')
    commit('wizard/model$update', {
      path: '/resources/secret_config/stringData/vault.hcl',
      value: value,
      force: true,
    })
    const configSecretName = `${getValue(model, '/metadata/release/name')}-config`
    commit('wizard/model$update', {
      path: '/resources/kubevaultComVaultServer/spec/configSecret/name',
      value: configSecretName,
      force: true,
    })
  }

  function setConfigurationSource() {
    const modelValue = getValue(model, '/resources/secret_config')
    if (modelValue) {
      return 'create-new-config'
    }
    return 'use-existing-config'
  }

  function setSecretConfigNamespace() {
    const namespace = getValue(model, '/metadata/release/namespace')
    return namespace
  }

  function setConfiguration() {
    return getValue(model, '/resources/secret_config/stringData/vault.hcl')
  }

  function setConfigurationFiles() {
    const value = getValue(model, '/resources/secret_config/data/vault.hcl')
    return atob(value)
  }

  function onSetCustomConfigChange() {
    const value = getValue(discriminator, '/setCustomConfig')

    if (value === 'no') {
      commit('wizard/model$delete', '/resources/kubevaultComVaultServer/spec/configSecret')
      commit('wizard/model$delete', '/resources/secret_config')
    }
  }

  function isValueExistInModel(path) {
    const modelValue = getValue(model, path)
    return !!modelValue
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

  // Env rows edit a temp copy so each row keeps its own "value from" choice
  function initEnvArray(modelPath) {
    const env = getValue(model, modelPath) || []
    return env.map((item) => ({ ...item, temp: { valueFromType: envValueFromType(item) } }))
  }

  function envValueFromType(item) {
    if (item?.valueFrom?.configMapKeyRef) return 'configMap'
    if (item?.valueFrom?.secretKeyRef) return 'secret'
    return 'input'
  }

  function onEnvArrayChange(modelPath, tempKey) {
    const env = getValue(discriminator, `/${tempKey}`) || []
    const filtered = env.map(({ temp, ...item }) => {
      const type = temp?.valueFromType || envValueFromType(item)
      if (type === 'configMap') {
        return { name: item.name, valueFrom: { configMapKeyRef: item.valueFrom?.configMapKeyRef } }
      }
      if (type === 'secret') {
        return { name: item.name, valueFrom: { secretKeyRef: item.valueFrom?.secretKeyRef } }
      }
      return { name: item.name, value: item.value }
    })

    if (filtered.length) {
      commit('wizard/model$update', { path: modelPath, value: filtered, force: true })
    } else {
      commit('wizard/model$delete', modelPath)
    }
  }

  function isEqualToValueFromType(tempKey, value, index) {
    const valueFrom = getValue(discriminator, `/${tempKey}/${index}/temp/valueFromType`) || 'input'
    return valueFrom === value
  }

  async function getSecretKeys(tempKey, index) {
    const secretName = getValue(discriminator, `/${tempKey}/${index}/valueFrom/secretKeyRef/name`)
    return getDataKeys('secrets', secretName)
  }

  async function getConfigMapKeys(tempKey, index) {
    const configMapName = getValue(
      discriminator,
      `/${tempKey}/${index}/valueFrom/configMapKeyRef/name`,
    )
    return getDataKeys('configmaps', configMapName)
  }

  async function getDataKeys(resource, name) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getNamespace()
    if (!name || !namespace) return []

    try {
      const resp = await akp.resources.get({
        owner,
        cluster,
        group: 'core',
        version: 'v1',
        resource,
        namespace,
        name,
      })

      return Object.keys(resp?.data || {}).map((item) => ({
        text: item,
        value: item,
      }))
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function getNamespace() {
    return getValue(model, '/metadata/release/namespace') || ''
  }

  // ************************* Inlined from the component sub-forms *************************

  const backupConfigPath = '/resources/stashAppscodeComBackupConfiguration'
  const backupRuntimeSettingsPath = `${backupConfigPath}/spec/runtimeSettings`

  function fetchAliasOptions() {
    return getAliasOptions()
  }

  // Rows that already have an alias keep it
  function disableAlias(index) {
    return !!getValue(
      model,
      `/resources/kubevaultComVaultServer/spec/tls/certificates/${index}/alias`,
    )
  }

  function getOperatorsList() {
    return ['In', 'NotIn', 'Exists', 'DoesNotExist', 'Gt', 'Lt']
  }

  async function getImagePullSecrets() {
    let resources = await getNamespacedResourceList({
      namespace: getNamespace(),
      group: 'core',
      version: 'v1',
      resource: 'secrets',
    })

    resources = resources.filter((item) => item.type === 'kubernetes.io/dockerconfigjson')

    return resources.map((resource) => {
      const name = (resource.metadata && resource.metadata.name) || ''
      return {
        text: name,
        value: { name: name },
      }
    })
  }

  function showResources() {
    return true
  }

  function isWriteCheckEnabled() {
    return !getValue(
      model,
      '/resources/kubevaultComVaultServer/spec/healthChecker/disableWriteCheck',
    )
  }

  function initScheduleBackup() {
    return getValue(model, backupConfigPath) ? 'yes' : 'no'
  }

  function onScheduleBackupChange() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')
    if (scheduleBackup === 'no') {
      commit('wizard/model$delete', backupConfigPath)
    } else if (!getValue(model, `${backupConfigPath}/spec`)) {
      commit('wizard/model$update', {
        path: `${backupConfigPath}/spec`,
        value: {
          retentionPolicy: {
            keepLast: 5,
            name: 'keep-last-5',
            prune: true,
          },
          schedule: '*/5 * * * *',
          target: {
            ref: {
              apiVersion: 'appcatalog.appscode.com/v1alpha1',
              kind: 'AppBinding',
              name: getValue(model, '/metadata/release/name'),
            },
          },
        },
        force: true,
      })
    }
  }

  function getCreateRepositoryUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    return `/${user}/kubernetes/${cluster}/stash.appscode.com/v1alpha1/repositories/create?namespace=${namespace}`
  }

  function showBackupForm() {
    return getValue(discriminator, '/scheduleBackup') === 'yes'
  }

  function initCustomizeRestoreJobRuntimeSettings() {
    return getValue(model, backupRuntimeSettingsPath) ? 'yes' : 'no'
  }

  function onCustomizeRestoreJobRuntimeSettingsChange() {
    const customize = getValue(discriminator, '/customizeRestoreJobRuntimeSettings')
    if (customize === 'no') {
      commit('wizard/model$delete', backupRuntimeSettingsPath)
    } else if (customize === 'yes' && !getValue(model, backupRuntimeSettingsPath)) {
      commit('wizard/model$update', { path: backupRuntimeSettingsPath, value: {}, force: true })
    }
  }

  function showRuntimeForm(value) {
    return getValue(discriminator, '/customizeRestoreJobRuntimeSettings') === value
  }

  function showAdditionalPodRuntimeSettingsForm() {
    return !!getValue(discriminator, '/customizeAdditionalPodRuntimeSettings')
  }

  function onAdditionalPodRuntimeSettingsSwitchChange() {
    if (getValue(discriminator, '/customizeAdditionalPodRuntimeSettings') === false) {
      ;['nodeName', 'podAnnotations', 'nodeSelector', 'affinity', 'tolerations'].forEach((key) =>
        commit('wizard/model$delete', `${backupRuntimeSettingsPath}/pod/${key}`),
      )
    }
  }

  function setAdditionalPodRuntimeSettingsSwitch() {
    const pod = getValue(model, `${backupRuntimeSettingsPath}/pod`)
    const { nodeName, podAnnotations, nodeSelector, affinity, tolerations } = pod || {}
    return !!(nodeName || podAnnotations || nodeSelector || affinity || tolerations)
  }

  async function getNodes() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: 'core',
        version: 'v1',
        resource: 'nodes',
        filter: { items: { metadata: { name: null } } },
      })
      return (resp?.items || []).map((nd) => nd.metadata.name)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  return {
    isEqualToModelPathValue,
    getResources,
    getSecrets,
    isEqualToDiscriminatorPath,
    setValueFromModel,
    getNamespacedResourceList,
    getResourceList,
    resourceNames,
    getStorageClassNames,
    unNamespacedResourceNames,
    returnTrue,
    returnFalse,
    returnStringYes,
    valueExists,
    onNameChange,
    getVaultServerVersions,
    onNamespaceChange,
    onLabelChange,
    isLowAvailableStorageBackendSelected,
    onVaultBackendTypeChange,
    resetBackendSecretDiscriminator,
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
    resetUnsealerCredDiscriminatorData,
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
    initDataSources,
    onDataSourcesChange,
    isDataSourceTypeEqualTo,
    setApiGroup,
    getIssuerRefsName,
    setSSLMode,
    showTlsConfigureSection,
    onTlsConfigureChange,
    getAliasOptions,
    showMonitoringSection,
    onEnableMonitoringChange,
    showCustomizeExporterSection,
    onCustomizeExporterChange,
    onAgentChange,
    isEqualToServiceMonitorType,
    onConfigurationSourceChange,
    onConfigurationChange,
    setConfigurationSource,
    setSecretConfigNamespace,
    setConfiguration,
    setConfigurationFiles,
    onSetCustomConfigChange,
    isValueExistInModel,
    getCreateNameSpaceUrl,
    isVariantAvailable,
    initEnvArray,
    envValueFromType,
    onEnvArrayChange,
    isEqualToValueFromType,
    getSecretKeys,
    getConfigMapKeys,
    getDataKeys,
    getNamespace,
    fetchAliasOptions,
    disableAlias,
    getOperatorsList,
    getImagePullSecrets,
    showResources,
    isWriteCheckEnabled,
    initScheduleBackup,
    onScheduleBackupChange,
    getCreateRepositoryUrl,
    showBackupForm,
    initCustomizeRestoreJobRuntimeSettings,
    onCustomizeRestoreJobRuntimeSettingsChange,
    showRuntimeForm,
    showAdditionalPodRuntimeSettingsForm,
    onAdditionalPodRuntimeSettingsSwitchChange,
    setAdditionalPodRuntimeSettingsSwitch,
    getNodes,
  }
}
