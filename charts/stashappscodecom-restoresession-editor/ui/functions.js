const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  let databaseToTypeMap = {}

  async function getResources(group, version, resource, namespaced) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    let namespace = ''
    if (namespaced) {
      namespace = getValue(model, '/metadata/release/namespace')
    }

    // namespaced resources wait for a namespace
    if (namespaced && !namespace) return []

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
  }

  function initNamespace() {
    const { namespace } = storeGet('/route/query') || {}
    return namespace || null
  }

  function isNamespaceDisabled() {
    return !!initNamespace()
  }

  function isDatabaseSelectDisabled() {
    const { database } = storeGet('/route/query') || {}
    return !!database
  }

  function labelsDisabilityChecker(key) {
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  async function fetchJsons({ itemCtx }, discriminatorPath) {
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

    if (discriminatorPath) {
      setDiscriminatorValue(discriminatorPath, {
        ui: ui.data || {},
        language: language.data || {},
        functions,
      })
    }

    return {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    }
  }

  async function fetchDatabases() {
    const owner = storeGet('/route/params/user')
    const database = storeGet('/route/query/database')
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
            spec: { type: null },
          },
        },
      })

      const resources = resp?.items || []

      const mappedResources = resources
        .filter((item) => {
          const type = (item.spec && item.spec.type) || ''
          return type.startsWith('kubedb.com')
        })
        .map((item) => {
          const name = (item.metadata && item.metadata.name) || ''
          return {
            text: name,
            value: name,
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

      if (database) {
        // preselect the database named in the route query
        const matchedOption = mappedResources.find((rs) => rs.text === database)
        if (matchedOption) {
          commit('wizard/model$update', {
            path: '/resources/stashAppscodeComRestoreSession/spec/target/ref/name',
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
        filter: { items: { metadata: { name: null } } },
      })

      const resources = resp?.items || []

      return resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return {
          text: name,
          value: name,
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

  function setCustomizeRestoreJobRuntimeSettings() {
    const runtimeSettings = getValue(
      model,
      '/resources/stashAppscodeComRestoreSession/spec/runtimeSettings',
    )
    return !!runtimeSettings
  }

  function onCustomizeRestoreJobRuntimeSettingsChange() {
    const status = getValue(discriminator, '/customizeRestoreJobRuntimeSettings')

    if (status === false) {
      commit('wizard/model$delete', '/spec/runtimeSettings')
    }
  }

  function setSnapshot() {
    const snapshot = getValue(
      model,
      '/resources/stashAppscodeComRestoreSession/spec/rules/0/snapshots/0',
    )
    return snapshot || ''
  }

  function onSnapshotChange() {
    const snapshot = getValue(discriminator, '/snapshot')
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComRestoreSession/spec/rules',
      value: [{ snapshot: [snapshot] }],
      force: true,
    })
  }

  return {
    getResources,
    initNamespace,
    isNamespaceDisabled,
    isDatabaseSelectDisabled,
    labelsDisabilityChecker,
    fetchJsons,
    fetchDatabases,
    fetchRepositories,
    showInterimVolumneTemplate,
    getStorageClassNames,
    showRuntimeSettingsForm,
    setCustomizeRestoreJobRuntimeSettings,
    onCustomizeRestoreJobRuntimeSettingsChange,
    setSnapshot,
    onSnapshotChange,
  }
}
