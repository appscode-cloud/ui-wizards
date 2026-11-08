const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/customizeRestoreJobRuntimeSettings', false)
  setDiscriminatorValue('/storageClasses', [])

  const restoreSessionInitRunTimeSettings = {
    pod: {
      serviceAccountName: '',
      securityContext: {
        fsGroup: null,
        runAsUser: null,
        runAsGroup: null,
      },
    },
  }

  let databaseToTypeMap = {}

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

  function hasOperationQuery() {
    return !!storeGet('/route/query/operation')
  }

  function showAndInitName() {
    if (hasOperationQuery()) {
      const name = storeGet('/route/query/name')

      commit('wizard/model$update', {
        path: '/metadata/release/name',
        value: `${name}-restore-${new Date().getTime()}`,
        force: true,
      })

      return false
    }
    return true
  }

  function showAndInitNamespace() {
    if (hasOperationQuery()) {
      const namespace = storeGet('/route/query/namespace')

      commit('wizard/model$update', {
        path: '/metadata/release/namespace',
        value: namespace,
        force: true,
      })

      return false
    }
    return true
  }

  function showIfDoesNotHaveOperationQuery() {
    return !hasOperationQuery()
  }

  function initNamespace() {
    return storeGet('/route/query/namespace') || null
  }

  function isNamespaceDisabled() {
    return !!initNamespace()
  }

  function isDatabaseSelectDisabled() {
    return !!storeGet('/route/query/database')
  }

  function labelsDisabilityChecker(key) {
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  async function fetchJsons({ itemCtx }) {
    let ui = {}
    let language = {}
    let functions = {}
    const { name, sourceRef, version, packageviewUrlPrefix } = itemCtx.chart
    try {
      ui = await axios.get(
        `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      language = await axios.get(
        `${packageviewUrlPrefix}/language.yaml?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}&format=json`,
      )
      const functionString = await axios.get(
        `${packageviewUrlPrefix}/functions.js?name=${name}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${version}`,
      )
      const evalFunc = new Function(functionString.data || '')
      functions = evalFunc()
    } catch (e) {
      console.log(e)
    }

    return {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    }
  }

  async function fetchDatabases() {
    const owner = storeGet('/route/params/user')
    const name = storeGet('/route/params/name')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')

    if (!namespace) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: 'appcatalog.appscode.com',
        version: 'v1alpha1',
        resource: 'appbindings',
        namespace,
        filter: {
          items: {
            apiVersion: null,
            kind: null,
            metadata: { name: null, namespace: null },
            spec: { type: null, appRef: { apiGroup: null } },
          },
        },
      })

      const resources = resp?.items || []

      const mappedResources = resources
        .filter((item) => {
          if (item?.spec?.appRef) {
            const appRef = item.spec?.appRef?.apiGroup || ''
            return appRef === 'kubedb.com' || appRef === 'kubevault.com'
          } else return true
        })
        .map((item) => {
          const apiVersion = item.apiVersion || ''
          const kind = item.kind || ''
          const name = (item.metadata && item.metadata.name) || ''
          const namespace = (item.metadata && item.metadata.namespace) || ''
          return {
            text: name,
            value: {
              apiVersion,
              kind,
              name,
              namespace,
            },
          }
        })

      databaseToTypeMap = {}
      resources.forEach((rs) => {
        const type = (rs.spec && rs.spec.type) || ''
        const name = (rs.metadata && rs.metadata.name) || ''
        if (type.startsWith('kubedb.com')) {
          databaseToTypeMap[name] = type
        }
      })

      if (name) {
        // the database named in the route becomes the target
        const matchedOption = mappedResources.find((rs) => rs.text === name)
        if (matchedOption) {
          commit('wizard/model$update', {
            path: '/spec/target',
            value: matchedOption.value,
            force: true,
          })
        }
      }

      return mappedResources
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function showAndInitDatabase() {
    // a target from the route is set by fetchDatabases
    const target = getValue(model, '/spec/target')
    return !(target?.name && hasOperationQuery())
  }

  async function fetchRepositories() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')

    if (!namespace) return []

    try {
      const resp = await akp.resources.list({
        owner,
        cluster,
        group: 'stash.appscode.com',
        version: 'v1alpha1',
        resource: 'repositories',
        namespace,
        filter: {
          items: {
            metadata: { name: null, namespace: null },
          },
        },
      })

      const resources = resp?.items || []

      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        const namespace = (item.metadata && item.metadata.namespace) || ''
        return {
          text: name,
          value: {
            name,
            namespace,
          },
        }
      })
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function valueExists(value, path) {
    return !!getValue(value, path)
  }

  function showInterimVolumneTemplate() {
    const appbindingName = getValue(model, '/spec/target/name')

    let verdict = false
    if (appbindingName) {
      const type = databaseToTypeMap[appbindingName]
      if (type === 'kubedb.com/elasticsearch') verdict = true
    }

    if (!verdict && valueExists(model, '/spec/interimVolumeTemplate')) {
      commit('wizard/model$delete', '/spec/interimVolumeTemplate')
    }

    return verdict
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

      if (isDefault && path) {
        const className = getValue(model, path)
        if (!className) {
          commit('wizard/model$update', {
            path: path,
            value: name,
            force: true,
          })
        }
      }

      item.text = name
      item.value = name
      return true
    })

    if (!path) {
      setDiscriminatorValue('/storageClasses', resources)
    }

    return resources
  }

  function showRuntimeSettingsForm() {
    return !!getValue(discriminator, '/customizeRestoreJobRuntimeSettings')
  }

  function onCustomizeRestoreJobRuntimeSettingsChange() {
    if (getValue(discriminator, '/customizeRestoreJobRuntimeSettings')) {
      if (!valueExists(model, '/spec/runtimeSettings')) {
        commit('wizard/model$update', {
          path: '/spec/runtimeSettings',
          value: restoreSessionInitRunTimeSettings,
        })
      }
    } else {
      commit('wizard/model$delete', '/spec/runtimeSettings')
    }
  }

  async function getServiceAccounts() {
    return getResources('core', 'v1', 'serviceaccounts', true)
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

  function getCreateRepositoryUrl() {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    return `/${user}/${cluster}/stash.appscode.com/v1alpha1/repositories/create?namespace=${namespace}`
  }

  function isVariantAvailable() {
    return !!storeGet('/route/query/variant')
  }

  return {
    isVariantAvailable,
    getResources,

    showAndInitName,
    showAndInitNamespace,
    showIfDoesNotHaveOperationQuery,

    initNamespace,
    isNamespaceDisabled,
    isDatabaseSelectDisabled,
    labelsDisabilityChecker,
    fetchJsons,

    fetchDatabases,
    showAndInitDatabase,

    fetchRepositories,

    showInterimVolumneTemplate,
    getStorageClassNames,

    showRuntimeSettingsForm,
    onCustomizeRestoreJobRuntimeSettingsChange,
    getServiceAccounts,
    getCreateNameSpaceUrl,
    getCreateRepositoryUrl,
  }
}
