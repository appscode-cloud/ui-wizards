const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

const machines = {
  'db.t.micro': {
    resources: {
      limits: { cpu: '250m', memory: '512Mi' },
    },
  },
  'db.t.small': {
    resources: {
      limits: { cpu: '500m', memory: '1Gi' },
    },
  },
  'db.t.medium': {
    resources: {
      limits: { cpu: '1', memory: '2Gi' },
    },
  },
  'db.t.large': {
    resources: {
      limits: { cpu: '2', memory: '4Gi' },
    },
  },
  'db.t.xlarge': {
    resources: {
      limits: { cpu: '4', memory: '8Gi' },
    },
  },
  'db.t.2xlarge': {
    resources: {
      limits: { cpu: '8', memory: '16Gi' },
    },
  },
  'db.m.small': {
    resources: {
      limits: { cpu: '500m', memory: '1Gi' },
    },
  },
  'db.m.large': {
    resources: {
      limits: { cpu: '2', memory: '8Gi' },
    },
  },
  'db.m.xlarge': {
    resources: {
      limits: { cpu: '4', memory: '16Gi' },
    },
  },
  'db.m.2xlarge': {
    resources: {
      limits: { cpu: '8', memory: '32Gi' },
    },
  },
  'db.m.4xlarge': {
    resources: {
      limits: { cpu: '16', memory: '64Gi' },
    },
  },
  'db.m.8xlarge': {
    resources: {
      limits: { cpu: '32', memory: '128Gi' },
    },
  },
  'db.m.12xlarge': {
    resources: {
      limits: { cpu: '48', memory: '192Gi' },
    },
  },
  'db.m.16xlarge': {
    resources: {
      limits: { cpu: '64', memory: '256Gi' },
    },
  },
  'db.m.24xlarge': {
    resources: {
      limits: { cpu: '96', memory: '384Gi' },
    },
  },
  'db.r.large': {
    resources: {
      limits: { cpu: '2', memory: '16Gi' },
    },
  },
  'db.r.xlarge': {
    resources: {
      limits: { cpu: '4', memory: '32Gi' },
    },
  },
  'db.r.2xlarge': {
    resources: {
      limits: { cpu: '8', memory: '64Gi' },
    },
  },
  'db.r.4xlarge': {
    resources: {
      limits: { cpu: '16', memory: '128Gi' },
    },
  },
  'db.r.8xlarge': {
    resources: {
      limits: { cpu: '32', memory: '256Gi' },
    },
  },
  'db.r.12xlarge': {
    resources: {
      limits: { cpu: '48', memory: '384Gi' },
    },
  },
  'db.r.16xlarge': {
    resources: {
      limits: { cpu: '64', memory: '512Gi' },
    },
  },
  'db.r.24xlarge': {
    resources: {
      limits: { cpu: '96', memory: '768Gi' },
    },
  },
}

const machineList = [
  'custom',
  'db.t.micro',
  'db.t.small',
  'db.t.medium',
  'db.t.large',
  'db.t.xlarge',
  'db.t.2xlarge',
  'db.m.small',
  'db.m.large',
  'db.m.xlarge',
  'db.m.2xlarge',
  'db.m.4xlarge',
  'db.m.8xlarge',
  'db.m.12xlarge',
  'db.m.16xlarge',
  'db.m.24xlarge',
  'db.r.large',
  'db.r.xlarge',
  'db.r.2xlarge',
  'db.r.4xlarge',
  'db.r.8xlarge',
  'db.r.12xlarge',
  'db.r.16xlarge',
  'db.r.24xlarge',
]

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('createBackendCredentialSecret', 'createNew')
  setDiscriminatorValue('createTlsSecret', 'createNew')
  setDiscriminatorValue('createUnsealerCredentialSecret', 'createNew')

  function isVariantAvailable() {
    const variant = storeGet('/route/query/variant')
    return variant ? true : false
  }

  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    return modelPathValue === value
  }

  function isNotEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    return modelPathValue !== value
  }

  function showCredentialExistingSecretField() {
    const pathValue = getValue(discriminator, '/createBackendCredentialSecret')
    return pathValue === 'useExisting'
  }

  function showCredentialCreateSecretField(backendType) {
    const selectedBackendType = getValue(model, '/spec/backend/provider/type')
    return !showCredentialExistingSecretField() && selectedBackendType === backendType
  }

  function onCreateCredentialSecretChange() {
    const createCredentialSecret = getValue(discriminator, '/createBackendCredentialSecret')
    if (createCredentialSecret === 'createNew') {
      commit('wizard/model$delete', '/spec/backend/credentialSecret/name')
    } else {
      commit('wizard/model$update', {
        path: '/spec/backend/credentialSecret',
        value: { name: '' },
        force: true,
      })
    }
  }

  function showTlsExistingSecretField() {
    const pathValue = getValue(discriminator, '/createTlsSecret')
    return pathValue === 'useExisting'
  }

  function showTlsCreateSecretField(backendType) {
    const selectedBackendType = getValue(model, '/spec/backend/provider/type')
    return !showTlsExistingSecretField() && selectedBackendType === backendType
  }

  function onCreateTlsSecretChange() {
    const createTlsSecret = getValue(discriminator, '/createTlsSecret')
    if (createTlsSecret === 'createNew') {
      commit('wizard/model$delete', '/spec/backend/tlsSecret/name')
    } else {
      commit('wizard/model$update', {
        path: '/spec/backend/tlsSecret',
        value: { name: '' },
        force: true,
      })
    }
  }

  function showUnsealerCredentialExistingSecretField() {
    const pathValue = getValue(discriminator, '/createUnsealerCredentialSecret')
    return pathValue === 'useExisting'
  }

  function showUnsealerCredentialCreateSecretField(unsealerMode) {
    const selectedUnsealerMode = getValue(model, '/spec/unsealer/mode/type')
    return !showUnsealerCredentialExistingSecretField() && selectedUnsealerMode === unsealerMode
  }

  function onCreateUnsealerCredentialSecretChange() {
    const createCredentialSecret = getValue(discriminator, '/createUnsealerCredentialSecret')
    if (createCredentialSecret === 'createNew') {
      commit('wizard/model$delete', '/spec/unsealer/credentialSecret/name')
    } else {
      commit('wizard/model$update', {
        path: '/spec/unsealer/credentialSecret',
        value: { name: '' },
        force: true,
      })
    }
  }

  function showCredentialSecret() {
    const type = getValue(model, '/spec/backend/provider/type')
    const backendsForCredential = [
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
    return backendsForCredential.includes(type)
  }

  function showTlsSecret() {
    const type = getValue(model, '/spec/backend/provider/type')
    const backendsForTls = ['consul', 'mysql']
    return backendsForTls.includes(type)
  }

  function onBackendTypeChange() {
    if (isLowAvailableStorageBackendSelected()) {
      commit('wizard/model$update', { path: '/spec/replicas', value: 1, force: true })
    } else {
      commit('wizard/model$update', { path: '/spec/replicas', value: 3, force: true })
    }
  }

  function isLowAvailableStorageBackendSelected() {
    const backendType = getValue(model, '/spec/backend/provider/type')
    const lowAvailableStorageBackends = ['azure', 'inmem', 's3', 'swift']
    return lowAvailableStorageBackends.includes(backendType)
  }

  async function getResources(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      { params: { filter: { items: { metadata: { name: null } } } } },
    )
    const resources = (resp && resp.data && resp.data.items) || []
    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      item.text = name
      item.value = name
      return true
    })
    return resources
  }

  async function getStorageClassNames(path) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
      { params: { filter: { items: { metadata: { name: null, annotations: null } } } } },
    )
    const resources = (resp && resp.data && resp.data.items) || []
    resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const isDefault =
        item.metadata &&
        item.metadata.annotations &&
        item.metadata.annotations['storageclass.kubernetes.io/is-default-class']
      if (isDefault) {
        commit('wizard/model$update', { path: path, value: name, force: true })
      }
      item.text = name
      item.value = name
      return true
    })
    return resources
  }

  async function getVaultServerVersions(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const queryParams = {
      filter: {
        items: { metadata: { name: null }, spec: { version: null, deprecated: null } },
      },
    }
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      { params: queryParams },
    )
    const resources = (resp && resp.data && resp.data.items) || []
    const filteredVersions = resources.filter((item) => item.spec && !item.spec.deprecated)
    filteredVersions.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      const specVersion = (item.spec && item.spec.version) || ''
      item.text = `${name} (${specVersion})`
      item.value = name
      return true
    })
    return filteredVersions
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
      { params: { filter: { items: { metadata: { name: null }, type: null } } } },
    )
    const secrets = (resp && resp.data && resp.data.items) || []
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
  }

  function disableLimit() {
    const modelPathValue = getValue(model, '/spec/machine')
    return modelPathValue !== 'custom' && !!modelPathValue
  }

  function getMachineListForOptions() {
    const array = machineList.map((item) => {
      return { text: item, value: item }
    })
    return array
  }

  function setResourceLimit() {
    const modelPathValue = getValue(model, '/spec/machine')
    if (modelPathValue && modelPathValue !== 'custom') {
      commit('wizard/model$update', {
        path: '/spec/resources/limits/cpu',
        value: machines[modelPathValue].resources.limits.cpu,
        force: true,
      })
      commit('wizard/model$update', {
        path: '/spec/resources/limits/memory',
        value: machines[modelPathValue].resources.limits.memory,
        force: true,
      })
    }
  }

  function setLimitsCpuOrMem(path) {
    const modelPathValue = getValue(model, '/spec/machine')
    if (modelPathValue && modelPathValue !== 'custom') {
      return (
        machines[modelPathValue] &&
        machines[modelPathValue].resources &&
        machines[modelPathValue].resources.limits[path]
      )
    } else {
      if (path === 'cpu') return '.5'
      else if (path === 'memory') return '1024Mi'
    }
  }

  function setMachineToCustom() {
    return 'custom'
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

  return {
    isVariantAvailable,
    isEqualToModelPathValue,
    isNotEqualToModelPathValue,
    showCredentialExistingSecretField,
    showCredentialCreateSecretField,
    onCreateCredentialSecretChange,
    showTlsExistingSecretField,
    showTlsCreateSecretField,
    onCreateTlsSecretChange,
    showUnsealerCredentialExistingSecretField,
    showUnsealerCredentialCreateSecretField,
    onCreateUnsealerCredentialSecretChange,
    showCredentialSecret,
    showTlsSecret,
    onBackendTypeChange,
    isLowAvailableStorageBackendSelected,
    getResources,
    getStorageClassNames,
    getVaultServerVersions,
    getSecrets,
    disableLimit,
    getMachineListForOptions,
    setResourceLimit,
    setLimitsCpuOrMem,
    setMachineToCustom,
    getCreateNameSpaceUrl,
  }
}
