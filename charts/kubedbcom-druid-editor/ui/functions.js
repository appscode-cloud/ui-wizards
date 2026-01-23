const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('repoInitialSelectionStatus', '')
  setDiscriminatorValue('scheduleBackup', 'yes')
  setDiscriminatorValue('backupType', '')
  setDiscriminatorValue('isBackupDataLoaded', false)
  setDiscriminatorValue('backupConfigContext', '')
  setDiscriminatorValue('config', '')
  setDiscriminatorValue('paused', false)
  setDiscriminatorValue('schedule', '')
  setDiscriminatorValue('blueprintEnabled', false)
  setDiscriminatorValue('archiverEnabled', false)

  setDiscriminatorValue('binding', false)
  setDiscriminatorValue('hidePreviewFromWizard', undefined)

  setDiscriminatorValue('/enableMonitoring', true)
  setDiscriminatorValue('/customizeExporter', true)
  setDiscriminatorValue('/valueFromType', 'input')

  // Compute Autoscaler Discriminators
  setDiscriminatorValue('/dbDetails', false)
  setDiscriminatorValue('/topologyMachines', [])
  setDiscriminatorValue('/allowedMachine-coordinators-min', '')
  setDiscriminatorValue('/allowedMachine-coordinators-max', '')
  setDiscriminatorValue('/allowedMachine-overlords-min', '')
  setDiscriminatorValue('/allowedMachine-overlords-max', '')
  setDiscriminatorValue('/allowedMachine-brokers-min', '')
  setDiscriminatorValue('/allowedMachine-brokers-max', '')
  setDiscriminatorValue('/allowedMachine-routers-min', '')
  setDiscriminatorValue('/allowedMachine-routers-max', '')
  setDiscriminatorValue('/allowedMachine-historicals-min', '')
  setDiscriminatorValue('/allowedMachine-historicals-max', '')
  setDiscriminatorValue('/allowedMachine-middleManagers-min', '')
  setDiscriminatorValue('/allowedMachine-middleManagers-max', '')

  // ************************* Common Helper Functions ********************************************

  // eslint-disable-next-line no-empty-pattern
  async function fetchJsons({ axios, itemCtx }) {
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
      // declare evaluate the functionString to get the functions Object
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

  function disableLableChecker({ itemCtx }) {
    const { key } = itemCtx
    if (key.startsWith('app.kubernetes.io') || key.includes('helm')) return true
    else return false
  }

  function isEqualToModelPathValue(value, modelPath) {
    const modelPathValue = getValue(model, modelPath)
    // watchDependency('model#' + modelPath)
    return modelPathValue === value
  }

  async function getResources(group, version, resource) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
        {
          params: { filter: { items: { metadata: { name: null } } } },
        },
      )

      const resources = (resp && resp.data && resp.data.items) || []
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

  function isConfigMapTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.configMapKeyRef)
  }

  function isSecretTypeValueFrom() {
    const valueFrom = getValue(discriminator, '/valueFrom')
    return !!(valueFrom && valueFrom.secretKeyRef)
  }

  function isInputTypeValueFrom() {
    return !isConfigMapTypeValueFrom() && !isSecretTypeValueFrom()
  }

  function onValueFromChange() {
    const valueFrom = getValue(discriminator, '/valueFromType')
    if (valueFrom === 'input') {
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
    } else if (valueFrom === 'secret') {
      if (!isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: false,
        })
      if (isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: true,
        })
    } else if (valueFrom === 'configMap') {
      if (!isConfigMapTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/configMapKeyRef',
          value: false,
        })
      if (isSecretTypeValueFrom())
        commit('wizard/model$update', {
          path: 'temp/valueFrom/secretKeyRef',
          value: true,
        })
    }
  }

  function isEqualToDiscriminatorPath(
    { discriminator, getValue, watchDependency },
    value,
    discriminatorPath,
  ) {
    watchDependency('discriminator#' + discriminatorPath)
    const discriminatorValue = getValue(discriminator, discriminatorPath)
    return discriminatorValue === value
  }

  function setValueFromModel({ getValue, model }, path) {
    return getValue(model, path)
  }

  function isEqualToValueFromType(value) {
    //watchDependency('discriminator#/valueFromType')
    const valueFrom = getValue(discriminator, '/valueFromType')
    return valueFrom === value
  }

  async function getNamespacedResourceList(
    axios,
    storeGet,
    { namespace, group, version, resource },
  ) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`

    let ans = []
    try {
      const resp = await axios.get(url, {
        params: {
          filter: { items: { metadata: { name: null }, type: null } },
        },
      })

      const items = (resp && resp.data && resp.data.items) || []
      ans = items
    } catch (e) {
      console.log(e)
    }

    return ans
  }

  async function getResourceList(axios, storeGet, { group, version, resource }) {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`

    let ans = []
    try {
      const resp = await axios.get(url, {
        params: {
          filter: { items: { metadata: { name: null }, type: null } },
        },
      })

      const items = (resp && resp.data && resp.data.items) || []
      ans = items
    } catch (e) {
      console.log(e)
    }

    return ans
  }

  async function resourceNames(group, version, resource) {
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

    let resources = await getNamespacedResourceList(axios, storeGet, {
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

  async function unNamespacedResourceNames({ axios, storeGet }, group, version, resource) {
    let resources = await getResourceList(axios, storeGet, {
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

  // ************************* Helper Functions **********************************************

  /**
   * Creates a deep copy of an object using JSON serialization
   * @param {Object} obj - The object to copy
   * @returns {Object} Deep copy of the input object
   */
  function objectCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
   * Encodes a password to base64 format
   * @param {string} value - The password to encode
   * @returns {string} Base64 encoded password
   */
  function encodePassword(value) {
    return btoa(value)
  }

  /**
   * Decodes a base64 encoded password
   * @param {string} value - The base64 encoded password
   * @returns {string} Decoded password
   */
  function decodePassword(value) {
    return atob(value)
  }

  /**
   * Checks if a value exists at a given path
   * @param {Object} value - The object to check
   * @param {Function} getValue - Function to get value from path
   * @param {string} path - The path to check
   * @returns {boolean} True if value exists, false otherwise
   */
  function valueExists(value, getValue, path) {
    const val = getValue(value, path)
    if (val) return true
    else return false
  }

  /**
   * Clears the spec model for a specific resource path
   * @param {Object} commit - Vuex commit function
   * @param {string} path - The path to clear
   */
  function clearSpecModel(commit, path) {
    commit('wizard/model$delete', path)
  }

  /**
   * Gets the URL for creating a namespace
   * @returns {string} The namespace creation URL
   */
  function getCreateNameSpaceUrl() {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    const owner = storeGet('/route/params/user')

    return `${domain}/${owner}/kubernetes/${cluster}/core/v1/namespaces/create`
  }

  function isRancherManaged({ storeGet }) {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  function isKubedb() {
    return !!storeGet('/route/params/actions')
  }

  async function getNamespaces() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    const resp = await axios.get(`/clusters/${owner}/${cluster}/proxy/core/v1/namespaces`, {
      params: { filter: { items: { metadata: { name: null } } } },
    })

    const resources = (resp && resp.data && resp.data.items) || []

    return resources.map((item) => {
      const name = (item.metadata && item.metadata.name) || ''
      return {
        text: name,
        value: name,
      }
    })
  }

  // ************************* Backup & Restore Functions *************************************

  const stashAppscodeComRestoreSession_init = {
    spec: {
      repository: {
        name: '',
      },
      rules: [
        {
          snapshots: ['latest'],
        },
      ],
      target: {
        ref: {
          apiVersion: 'appcatalog.appscode.com/v1alpha1',
          kind: 'AppBinding',
          name: '',
        },
      },
    },
  }
  const initScript = {
    scriptPath: '',
    secret: {
      secretName: '',
    },
  }
  const stashAppscodeComRepository_init_repo = {
    spec: {
      backend: {
        gcs: {
          bucket: '',
          prefix: '',
        },
        storageSecretName: '',
      },
    },
  }
  const stashAppscodeComRepository_repo = {
    spec: {
      backend: {
        gcs: {
          bucket: '',
          prefix: '',
        },
        storageSecretName: '',
      },
    },
  }
  const restoreSessionInitRunTimeSettings = {
    container: {
      resources: {
        requests: {
          cpu: '',
          memory: '',
        },
        limits: {
          cpu: '',
          memory: '',
        },
      },
      nice: {
        adjustment: null,
      },
      ionice: {
        class: null,
        classData: null,
      },
      securityContext: {
        privileged: false,
        runAsNonRoot: false,
        runAsUser: null,
        runAsGroup: null,
        seLinuxOptions: {
          level: '',
          role: '',
          type: '',
          user: '',
        },
      },
      env: [],
      envFrom: [],
    },
    pod: {
      serviceAccountName: '',
      imagePullSecrets: [],
      securityContext: {
        fsGroup: null,
        runAsNonRoot: false,
        runAsUser: null,
        runAsGroup: null,
        seLinuxOptions: {
          level: '',
          role: '',
          type: '',
          user: '',
        },
      },
    },
  }

  const stashAppscodeComBackupConfiguration = {
    spec: {
      repository: {
        name: '',
      },
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
          name: '',
        },
      },
    },
  }

  function getBackupConfigsAndAnnotations(getValue, model) {
    const stashAppscodeComBackupConfiguration = getValue(
      model,
      '/resources/stashAppscodeComBackupConfiguration',
    )

    const coreKubestashComBackupConfiguration = getValue(
      model,
      '/resources/coreKubestashComBackupConfiguration',
    )
    const kubeStashTarget = coreKubestashComBackupConfiguration?.spec?.target

    const druid = getValue(model, '/resources/kubedbComDruid')
    const druidKind = druid?.apiVersion?.split('/')?.at(0)

    let isKubeStash = false
    if (
      druid?.kind === kubeStashTarget?.kind &&
      druid?.metadata?.name === kubeStashTarget?.name &&
      druid?.metadata?.namespace === kubeStashTarget?.namespace &&
      druidKind === kubeStashTarget?.apiGroup
    ) {
      isKubeStash = true
    }

    const kubedbComDruidAnnotations =
      getValue(model, '/resources/kubedbComDruid/metadata/annotations') || {}

    const isBluePrint = Object.keys(kubedbComDruidAnnotations).some(
      (k) =>
        k === 'stash.appscode.com/backup-blueprint' ||
        k === 'stash.appscode.com/schedule' ||
        k.startsWith('params.stash.appscode.com/'),
    )

    return {
      stashAppscodeComBackupConfiguration,
      isBluePrint,
      isKubeStash,
    }
  }

  function deleteKubeDbComDruidAnnotation(getValue, model, commit) {
    const annotations = getValue(model, '/resources/kubedbComDruid/metadata/annotations') || {}
    const filteredKeyList =
      Object.keys(annotations).filter(
        (k) =>
          k !== 'stash.appscode.com/backup-blueprint' &&
          k !== 'stash.appscode.com/schedule' &&
          !k.startsWith('params.stash.appscode.com/'),
      ) || []
    const filteredAnnotations = {}
    filteredKeyList.forEach((k) => {
      filteredAnnotations[k] = annotations[k]
    })
    commit('wizard/model$update', {
      path: '/resources/kubedbComDruid/metadata/annotations',
      value: filteredAnnotations,
    })
  }

  function addKubeDbComDruidAnnotation(getValue, model, commit, key, value, force) {
    const annotations = getValue(model, '/resources/kubedbComDruid/metadata/annotations') || {}

    if (annotations[key] === undefined) {
      annotations[key] = value
    } else if (force) {
      annotations[key] = value
    }

    commit('wizard/model$update', {
      path: '/resources/kubedbComDruid/metadata/annotations',
      value: annotations,
      force: true,
    })
  }

  function initScheduleBackupForEdit() {
    const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
      getValue,
      model,
    )

    initRepositoryChoiseForEdit()

    if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
    else return 'no'
  }

  function initScheduleBackup({ getValue, model }) {
    const { stashAppscodeComBackupConfiguration, isBluePrint } = getBackupConfigsAndAnnotations(
      getValue,
      model,
    )

    if (stashAppscodeComBackupConfiguration || isBluePrint) return 'yes'
    else return 'no'
  }

  function onScheduleBackupChange() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')

    if (scheduleBackup === 'no') {
      // delete stashAppscodeComBackupConfiguration
      commit('wizard/model$delete', '/resources/stashAppscodeComBackupConfiguration')
      commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
      // delete annotation from KubeDBComDruid annotation
      deleteKubeDbComDruidAnnotation(getValue, model, commit)
    } else {
      const { isBluePrint } = getBackupConfigsAndAnnotations(getValue, model)

      // create stashAppscodeComBackupConfiguration and initialize it if not exists

      const dbName = getValue(model, '/metadata/release/name')

      if (
        !valueExists(model, getValue, '/resources/stashAppscodeComBackupConfiguration') &&
        !isBluePrint
      ) {
        commit('wizard/model$update', {
          path: '/resources/stashAppscodeComBackupConfiguration',
          value: stashAppscodeComBackupConfiguration,
        })
        commit('wizard/model$update', {
          path: '/resources/stashAppscodeComBackupConfiguration/spec/target/ref/name',
          value: dbName,
          force: true,
        })
      }
    }
  }

  // backup form
  function showBackupForm() {
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')
    // watchDependency('discriminator#/scheduleBackup')
    if (scheduleBackup === 'yes') return true
    else return false
  }

  function showScheduleBackup() {
    // watchDependency('discriminator#/scheduleBackup')
    const scheduleBackup = getValue(discriminator, '/scheduleBackup')
    if (scheduleBackup === 'yes') return true
    else return false
  }

  // backup configuration form
  function initalizeTargetReferenceName({ getValue, model, watchDependency }) {
    const databaseName = getValue(model, '/metadata/release/name')
    watchDependency('model#/metadata/release/name')

    return databaseName
  }

  // restore session repository
  function setInitialRestoreSessionRepo({ getValue, model }) {
    const value = getValue(model, 'resources/stashAppscodeComRepository_init_repo')
    return value ? 'create' : 'select'
  }

  // backup config repository
  function initRepositoryChoise({ getValue, model }) {
    const stashAppscodeComRepository_repo = getValue(
      model,
      '/resources/stashAppscodeComRepository_repo',
    )

    if (stashAppscodeComRepository_repo) return 'create'
    else return 'select'
  }

  function initRepositoryChoiseForEdit() {
    const stashAppscodeComRepository_repo = getValue(
      model,
      '/resources/stashAppscodeComRepository_repo',
    )
    const repoInitialSelectionStatus = stashAppscodeComRepository_repo ? 'yes' : 'no'
    setDiscriminatorValue('/repoInitialSelectionStatus', repoInitialSelectionStatus)

    return repoInitialSelectionStatus
  }

  function onRepositoryChoiseChange({ getValue, discriminator, watchDependency, commit, model }) {
    const repositoryChoise = getValue(discriminator, '/repositoryChoise')
    watchDependency('discriminator#/repositoryChoise')

    if (repositoryChoise === 'select') {
      // delete the stashAppscodeComRepository_repo
      commit('wizard/model$delete', '/resources/stashAppscodeComRepository_repo')
    } else if (repositoryChoise === 'create') {
      // create new stashAppscodeComRepository_repo
      if (!valueExists(model, getValue, '/resources/stashAppscodeComRepository_repo')) {
        commit('wizard/model$update', {
          path: '/resources/stashAppscodeComRepository_repo',
          value: stashAppscodeComRepository_repo,
        })
        const repositoryName = `${getValue(model, '/metadata/release/name')}-repo`
        // set this name in stashAppscodeComRestoreSession_init
        commit('wizard/model$update', {
          path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
          value: repositoryName,
        })
      }
    }
  }

  function onRepositoryNameChange({ getValue, model, commit }) {
    const repositoryName = getValue(
      model,
      'resources/stashAppscodeComRepository_repo/metadata/name',
    )
    // set this name in stashAppscodeComRestoreSession_init
    commit('wizard/model$update', {
      path: '/resources/stashAppscodeComBackupConfiguration/spec/repository/name',
      value: repositoryName,
    })
  }

  // KubeStash Backup Functions
  let initialModel = {}
  let isBackupOn = false
  let isBackupOnModel = false
  let dbResource = {}
  let initialDbMetadata = {}
  let namespaceList = []
  let backupConfigurationsFromStore = {}
  let valuesFromWizard = {}
  let initialArchiver = {}
  let isArchiverAvailable = false
  let archiverObjectToCommit = {}

  async function initBackupData() {
    // set initial model for further usage
    initialModel = getValue(model, '/resources/coreKubestashComBackupConfiguration')
    isBackupOnModel = !!initialModel

    // check db backup is enabled or not
    backupConfigurationsFromStore = storeGet('/backup/backupConfigurations')
    const configs = objectCopy(backupConfigurationsFromStore)
    const { name, cluster, user, group, resource, spoke } = storeGet('/route/params')
    const namespace = storeGet('/route/query/namespace')
    const kind = storeGet('/resource/layout/result/resource/kind')
    dbResource = getValue(model, '/resources/kubedbComDruid')
    initialDbMetadata = objectCopy(dbResource.metadata)
    initialArchiver = dbResource.spec?.archiver ? objectCopy(dbResource.spec?.archiver) : undefined

    // get values.yaml to populate data when backup-config is being created
    try {
      const actionArray = storeGet('/resource/actions/result')
      const editorDetails = actionArray[0]?.items[0]?.editor
      const chartName = editorDetails?.name
      const sourceApiGroup = editorDetails?.sourceRef?.apiGroup
      const sourceKind = editorDetails?.sourceRef?.kind
      const sourceNamespace = editorDetails?.sourceRef?.namespace
      const sourceName = editorDetails?.sourceRef?.name
      const chartVersion = editorDetails?.version

      let url = `/clusters/${user}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceApiGroup}&sourceKind=${sourceKind}&sourceNamespace=${sourceNamespace}&sourceName=${sourceName}&version=${chartVersion}&format=json`

      if (spoke)
        url = `/clusters/${user}/${spoke}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceApiGroup}&sourceKind=${sourceKind}&sourceNamespace=${sourceNamespace}&sourceName=${sourceName}&version=${chartVersion}&format=json`

      const resp = await axios.get(url)

      valuesFromWizard = objectCopy(resp.data?.resources?.coreKubestashComBackupConfiguration) || {}
    } catch (e) {
      console.log(e)
    }

    // check storageclass archiver annotation
    if (initialArchiver) {
      isArchiverAvailable = true
    } else {
      const storageClassName = dbResource?.spec?.topology?.historicals?.storage?.storageClassName
      const url = `/clusters/${user}/${cluster}/proxy/storage.k8s.io/v1/storageclasses/${storageClassName}`
      try {
        const resp = await axios.get(url)
        const archAnnotation = resp.data?.metadata?.annotations
        const annotationKeyToFind = `${resource}.${group}/archiver`
        if (archAnnotation[annotationKeyToFind]) {
          isArchiverAvailable = true
          archiverObjectToCommit = {
            ref: {
              name: archAnnotation[annotationKeyToFind],
              namespace: 'kubedb',
            },
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    // check config with metadata name first
    let config = configs?.find(
      (item) =>
        item.metadata?.name === name &&
        item.spec?.target?.name === name &&
        item.spec?.target?.namespace === namespace &&
        item.spec?.target?.kind === kind &&
        item.spec?.target?.apiGroup === group,
    )

    // check config without metadata name if not found with metadata name
    if (!config)
      config = configs?.find(
        (item) =>
          item.spec?.target?.name === name &&
          item.spec?.target?.namespace === namespace &&
          item.spec?.target?.kind === kind &&
          item.spec?.target?.apiGroup === group,
      )

    // set backup switch here
    isBackupOn = !!config

    // set initial data from stash-presets
    const stashPreset = storeGet('/backup/stashPresets')
    if (stashPreset) {
      const { retentionPolicy, encryptionSecret, schedule, storageRef } = stashPreset

      const tempBackends = valuesFromWizard.spec?.backends
      tempBackends[0]['storageRef'] = storageRef
      tempBackends[0]['retentionPolicy'] = retentionPolicy
      valuesFromWizard.spec['backends'] = tempBackends

      const tempSessions = valuesFromWizard.spec?.sessions
      const tempRepositories = valuesFromWizard.spec?.sessions[0]?.repositories
      tempRepositories[0]['encryptionSecret'] = encryptionSecret
      tempRepositories[0].name = name
      tempRepositories[0]['directory'] = `${namespace}/${name}`

      tempSessions[0]['repositories'] = tempRepositories
      tempSessions[0]['scheduler']['schedule'] = schedule
      valuesFromWizard.spec['sessions'] = tempSessions
    }

    const apiGroup = storeGet('/route/params/group')
    valuesFromWizard.spec['target'] = { name, namespace, apiGroup, kind }
    const labels = dbResource.metadata?.labels
    valuesFromWizard['metadata'] = {
      name: `${name}-${Math.floor(Date.now() / 1000)}`,
      namespace,
      labels,
    }

    setDiscriminatorValue('isBackupDataLoaded', true)
  }

  function isBackupDataLoadedTrue() {
    // watchDependency('discriminator#/isBackupDataLoaded')
    return !!getValue(discriminator, '/isBackupDataLoaded')
  }

  function setBackupType() {
    return 'BackupConfig'
  }

  function getTypes() {
    const arr = [
      {
        description: 'Create, Delete or Modify BackupConfig',
        text: 'BackupConfig',
        value: 'BackupConfig',
      },
      {
        description: 'Enable/Disable BackupBlueprint',
        text: 'BackupBlueprint',
        value: 'BackupBlueprint',
      },
    ]

    if (dbResource?.spec?.topology && isArchiverAvailable) {
      arr.push({
        description: 'Enable/Disable Archiver',
        text: 'Archiver',
        value: 'Archiver',
      })
    }
    return arr
  }

  function onBackupTypeChange() {
    const type = getValue(discriminator, '/backupType')
    commit('wizard/model$update', {
      path: '/backupType',
      value: type,
      force: true,
    })
    if (!isBackupOnModel) {
      commit('wizard/model$delete', '/resources/coreKubestashComBackupConfiguration')
    } else {
      commit('wizard/model$update', {
        path: '/resources/coreKubestashComBackupConfiguration',
        value: objectCopy(initialModel),
        force: true,
      })
    }
    commit('wizard/model$delete', '/context')
    commit('wizard/model$update', {
      path: '/resources/kubedbComDruid',
      value: objectCopy(dbResource),
      force: true,
    })
  }

  function isBackupType(type) {
    // watchDependency('discriminator#/backupType')
    const selectedType = getValue(discriminator, '/backupType')

    return selectedType === type
  }

  function setBlueprintSwitch() {
    const annotations = initialDbMetadata?.annotations

    return !!(
      annotations['blueprint.kubestash.com/name'] &&
      annotations['blueprint.kubestash.com/namespace']
    )
  }

  function onBlueprintChange() {
    const blueprintSwitch = getValue(discriminator, '/blueprintEnabled')
    if (blueprintSwitch) addLabelAnnotation(commit, storeGet, 'annotations')
    else deleteLabelAnnotation(commit, 'annotations')
  }

  function setArchiverSwitch() {
    const archiver = dbResource?.spec?.archiver
    return !!archiver
  }

  function onArchiverChange() {
    const archiverSwitch = getValue(discriminator, '/archiverEnabled')
    const path = 'resources/kubedbComDruid/spec/archiver'
    if (archiverSwitch) {
      commit('wizard/model$update', {
        path: path,
        value: initialArchiver ? initialArchiver : archiverObjectToCommit,
      })
    } else {
      commit('wizard/model$delete', path)
    }
  }

  function addLabelAnnotation(commit, storeGet, type) {
    const obj = objectCopy(initialDbMetadata[type])

    if (type === 'annotations') {
      const kind = storeGet('/resource/layout/result/resource/kind')
      obj['blueprint.kubestash.com/name'] = 'kubedb'
      obj['blueprint.kubestash.com/namespace'] = `${kind.toLowerCase()}-blueprint`
    } else {
      obj['kubedb.com/archiver'] = 'true'
    }

    commit('wizard/model$update', {
      path: `/resources/kubedbComDruid/metadata/${type}`,
      value: obj,
      force: true,
    })
  }

  function deleteLabelAnnotation(commit, type) {
    const obj = initialDbMetadata[type]

    if (type === 'annotations') {
      delete obj['blueprint.kubestash.com/name']
      delete obj['blueprint.kubestash.com/namespace']
    } else delete obj['kubedb.com/archiver']

    commit('wizard/model$update', {
      path: `/resources/kubedbComDruid/metadata/${type}`,
      value: obj,
      force: true,
    })
  }

  function getContext() {
    if (isBackupOn) return ['Create', 'Delete', 'Modify']
    return ['Create']
  }

  function onContextChange() {
    const context = getValue(discriminator, '/backupConfigContext')
    commit('wizard/model$update', {
      path: '/context',
      value: context,
      force: true,
    })
    if (context === 'Create') {
      commit('wizard/model$update', {
        path: '/resources/coreKubestashComBackupConfiguration',
        value: valuesFromWizard,
        force: true,
      })
    }
    if (context === 'Delete') setDiscriminatorValue('hidePreviewFromWizard', true)
    else setDiscriminatorValue('hidePreviewFromWizard', undefined)
  }

  function getConfigList() {
    const configs = objectCopy(backupConfigurationsFromStore)
    const { name, group } = storeGet('/route/params')
    const namespace = storeGet('/route/query/namespace')
    const kind = storeGet('/resource/layout/result/resource/kind')
    const filteredList = configs?.filter(
      (item) =>
        item.spec?.target?.name === name &&
        item.spec?.target?.namespace === namespace &&
        item.spec?.target?.kind === kind &&
        item.spec?.target?.apiGroup === group,
    )
    const list = filteredList?.map((ele) => ele.metadata.name)
    return list
  }

  function onConfigChange() {
    const configName = getValue(discriminator, '/config')
    const configs = objectCopy(backupConfigurationsFromStore)
    const configDetails = configs?.find((item) => item?.metadata?.name === configName)

    commit('wizard/model$update', {
      path: '/resources/coreKubestashComBackupConfiguration',
      value: configDetails,
      force: true,
    })
  }

  function showPause() {
    // watchDependency('discriminator#/backupConfigContext')
    // watchDependency('discriminator#/config')
    const contex = getValue(discriminator, '/backupConfigContext')
    const configName = getValue(discriminator, '/config')
    return !!configName && contex === 'Modify'
  }

  function showConfigList() {
    // watchDependency('discriminator#/backupConfigContext')
    const contex = getValue(discriminator, '/backupConfigContext')
    return contex === 'Modify' || contex === 'Delete'
  }

  function showSchedule() {
    // watchDependency('discriminator#/backupConfigContext')
    // watchDependency('discriminator#/config')
    const configName = getValue(discriminator, '/config')
    const contex = getValue(discriminator, '/backupConfigContext')
    if (contex === 'Create') return true
    else if (contex === 'Delete') return false
    else return !!configName
  }

  function getNamespaceArray() {
    return namespaceList
  }

  function onInputChange(
    { getValue, discriminator, watchDependency, commit, model },
    modelPath,
    field,
    subfield,
    discriminatorName,
  ) {
    const value = getValue(discriminator, `/${discriminatorName}`)
    const backends = getValue(model, modelPath) || []
    if (field !== 'encryptionSecret') backends[0][field][subfield] = value
    else backends[0]['repositories'][0][field][subfield] = value
    commit('wizard/model$update', {
      path: modelPath,
      value: backends,
    })
  }

  function setFileValueFromStash({ getValue, commit, model }, modelPath, field, subfield, value) {
    const backends = getValue(model, modelPath)
    if (field !== 'encryptionSecret') backends[0][field][subfield] = value
    else backends[0]['repositories'][0][field][subfield] = value
    commit('wizard/model$update', {
      path: modelPath,
      value: backends,
    })
  }

  function onInputChangeSchedule(modelPath, discriminatorName) {
    const value = getValue(discriminator, `/${discriminatorName}`)
    const session = getValue(model, modelPath) || []
    if (session.length) {
      session[0].scheduler.schedule = value
      commit('wizard/model$update', {
        path: modelPath,
        value: session,
        force: true,
      })
    }
  }

  function setInitSchedule(
    { getValue, discriminator, watchDependency, commit, model },
    modelPath,
    value,
  ) {
    const session = getValue(model, modelPath)
    session[0].scheduler.schedule = value
    commit('wizard/model$update', {
      path: modelPath,
      value: session,
    })
  }

  function getDefault({ getValue, model }, modelPath, field, subfield) {
    const backends = getValue(model, modelPath)
    if (field !== 'encryptionSecret') return backends[0][field][subfield]
    else {
      return backends[0]['repositories'][0][field][subfield]
    }
  }

  function getDefaultSchedule(modelPath) {
    // watchDependency('discriminator#/config')
    const config = getValue(discriminator, '/config') // only for computed behaviour
    const session = getValue(model, modelPath)
    return session?.length ? session[0]?.scheduler.schedule : ''
  }

  async function fetchNamespaces({ axios, storeGet }) {
    const username = storeGet('/route/params/user')
    const clusterName = storeGet('/route/params/cluster')
    const group = storeGet('/route/params/group')
    const version = storeGet('/route/params/version')
    const resource = storeGet('/route/params/resource')

    const url = `clusters/${username}/${clusterName}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`

    try {
      const resp = await axios.post(url, {
        _recurringCall: false,
        apiVersion: 'identity.k8s.appscode.com/v1alpha1',
        kind: 'SelfSubjectNamespaceAccessReview',
        spec: {
          resourceAttributes: [
            {
              verb: 'create',
              group: group,
              version: version,
              resource: resource,
            },
          ],
        },
      })
      if (resp.data?.status?.projects) {
        const projects = resp.data?.status?.projects
        let projectsNamespace = []
        projectsNamespace = Object.keys(projects).map((project) => ({
          project: project,
          namespaces: projects[project].map((namespace) => ({
            text: namespace,
            value: namespace,
          })),
        }))
        return projectsNamespace
      } else {
        return resp.data?.status?.namespaces || []
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  async function fetchNames(
    { getValue, axios, storeGet, watchDependency, discriminator },
    version,
    type,
    discriminatorName,
  ) {
    watchDependency(`discriminator#/${discriminatorName}`)
    const username = storeGet('/route/params/user')
    const clusterName = storeGet('/route/params/cluster')
    const namespace = getValue(discriminator, `${discriminatorName}`)
    const url =
      type !== 'secrets'
        ? `clusters/${username}/${clusterName}/proxy/storage.kubestash.com/${version}/namespaces/${namespace}/${type}`
        : `clusters/${username}/${clusterName}/proxy/core/${version}/namespaces/${namespace}/${type}`
    try {
      if (namespace) {
        const resp = await axios.get(url)
        let data = resp.data.items
        if (type === 'secrets') data = data.filter((ele) => !!ele.data['RESTIC_PASSWORD'])
        data = data.map((ele) => ele.metadata.name)
        return data
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  async function getBlueprints(
    { getValue, model, setDiscriminatorValue, axios, storeGet },
    backup,
  ) {
    const username = storeGet('/route/params/user')
    const clusterName = storeGet('/route/params/cluster')
    const url = `clusters/${username}/${clusterName}/proxy/core.kubestash.com/v1alpha1/backupblueprints`

    try {
      const resp = await axios.get(url)
      let data = resp.data.items
      return data
    } catch (e) {
      console.log(e)
    }
  }

  function isBlueprintOption({ discriminator, getValue, watchDependency }, value) {
    watchDependency('discriminator#/blueprintOptions')
    const blueprintOptions = getValue(discriminator, '/blueprintOptions')
    return blueprintOptions === value
  }

  function ifUsagePolicy({ discriminator, getValue, watchDependency, model }, value) {
    watchDependency(
      'model#/resources/coreKubestashComBackupBlueprint/spec/usagePolicy/allowedNamespaces/from/default',
    )
    const usagePolicy = getValue(
      model,
      '/resources/coreKubestashComBackupBlueprint/spec/usagePolicy/allowedNamespaces/from/default',
    )
    return usagePolicy === value
  }

  function showBackupOptions({ discriminator, getValue, watchDependency }, backup) {
    const backupEnabled = getValue(discriminator, '/backupEnabled')
    if (backupEnabled) {
      if (backup === 'alert') return true
      else return false
    } else {
      if (backup === 'alert') return false
      else return true
    }
  }

  // ************************* Monitoring Functions **********************************************

  /**
   * Determines whether to show the monitoring configuration section
   * @returns {boolean} True if monitoring is enabled
   */
  function showMonitoringSection() {
    // watchDependency('discriminator#/enableMonitoring')
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    return configureStatus
  }

  /**
   * Handles changes to the monitoring enable/disable toggle
   * Updates the monitor spec and alert configuration accordingly
   */
  function onEnableMonitoringChange() {
    const configureStatus = getValue(discriminator, '/enableMonitoring')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComDruid/spec/monitor',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComDruid/spec/monitor')
    }

    // update alert value depend on monitoring profile
    commit('wizard/model$update', {
      path: '/form/alert/enabled',
      value: configureStatus ? 'warning' : 'none',
      force: true,
    })
  }

  /**
   * Determines whether to show the exporter customization section
   * @returns {boolean} True if exporter customization is enabled
   */
  function showCustomizeExporterSection() {
    // watchDependency('discriminator#/customizeExporter')
    const configureStatus = getValue(discriminator, '/customizeExporter')
    return configureStatus
  }

  /**
   * Handles changes to the exporter customization toggle
   * Creates or removes the prometheus exporter configuration
   */
  function onCustomizeExporterChange() {
    const configureStatus = getValue(discriminator, '/customizeExporter')
    if (configureStatus) {
      commit('wizard/model$update', {
        path: '/resources/kubedbComDruid/spec/monitor/prometheus/exporter',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/kubedbComDruid/spec/monitor/prometheus/exporter')
    }
  }

  /**
   * Checks if a value exists in the model at the specified path
   * @param {string} path - The model path to check
   * @returns {boolean} True if value exists and is truthy
   */
  function isValueExistInModel(path) {
    const modelValue = getValue(model, path)
    return !!modelValue
  }

  function onNamespaceChange({ commit, model, getValue }) {
    const namespace = getValue(model, '/metadata/release/namespace')
    const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
        value: [namespace],
        force: true,
      })
    }
  }

  function onLabelChange({ commit, model, getValue }) {
    const labels = getValue(model, '/resources/kubedbComDruid/spec/metadata/labels')

    const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')

    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
        value: labels,
        force: true,
      })
    }
  }

  function onAgentChange() {
    const agent = getValue(model, '/resources/kubedbComDruid/spec/monitor/agent')
    if (agent === 'prometheus.io') {
      commit('wizard/model$update', {
        path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
        value: [],
        force: true,
      })

      onNamespaceChange({ commit, model, getValue })
      onLabelChange({ commit, model, getValue })
    } else {
      commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
    }
  }

  function setMetadata() {
    const namespace = getValue(model, '/metadata/release/namespace')
    const labels = getValue(model, '/resources/kubedbComDruid/spec/metadata/labels')
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
      value: [namespace],
      force: true,
    })
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
      value: labels,
      force: true,
    })
  }

  // ************************* Autoscaling Functions (Storage) **********************************************

  /**
   * Handles unit conversion for storage autoscaling configuration
   * Ensures values have proper units (Gi for storage, pc for percentage)
   * @param {string} path - The model path to the value
   * @param {string} type - Type of value ('bound' or 'scalingRules')
   */
  function handleUnit(path, type = 'bound') {
    let value = getValue(model, `/resources/${path}`)
    if (type === 'scalingRules') {
      const updatedValue = []
      value?.forEach((ele) => {
        let appliesUpto = ele['appliesUpto']
        let threshold = ele['threshold']
        if (appliesUpto && !isNaN(appliesUpto)) {
          appliesUpto += 'Gi'
        }
        if (!isNaN(threshold)) {
          threshold += 'pc'
        }
        updatedValue.push({ threshold, appliesUpto })
      })
      if (JSON.stringify(updatedValue) !== JSON.stringify(value)) {
        commit('wizard/model$update', {
          path: `/resources/${path}`,
          value: updatedValue,
          force: true,
        })
      }
    } else {
      if (!isNaN(value)) {
        value += 'Gi'
        commit('wizard/model$update', {
          path: `/resources/${path}`,
          value: value,
          force: true,
        })
      }
    }
  }

  // ************************* Autoscaling Functions (Compute) **********************************************

  let autoscaleType = ''
  let dbDetails = {}

  /**
   * Fetches database details for autoscaling configuration
   * Retrieves the Druid database resource to determine topology and settings
   */
  let instance = {}
  async function getDbDetails() {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations',
    )
    instance = annotations?.['kubernetes.io/instance-type']
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace =
      storeGet('/route/query/namespace') || getValue(model, '/metadata/namespace') || ''
    const name =
      storeGet('/route/params/name') ||
      getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name') ||
      ''

    if (namespace && name) {
      try {
        const resp = await axios.get(
          `/clusters/${owner}/${cluster}/proxy/kubedb.com/v1alpha2/namespaces/${namespace}/druids/${name}`,
        )
        dbDetails = resp.data || {}
        setDiscriminatorValue('/dbDetails', true)
      } catch (e) {
        console.log(e)
      }
    }

    commit('wizard/model$update', {
      path: `/metadata/release/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/metadata/release/namespace`,
      value: namespace,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name`,
      value: name,
      force: true,
    })
    commit('wizard/model$update', {
      path: `/resources/autoscalingKubedbComDruidAutoscaler/metadata/labels`,
      value: dbDetails.metadata?.labels,
      force: true,
    })
  }

  /**
   * Checks if a specific node type exists in the database topology
   * Used for conditional rendering of autoscaling sections
   * @param {string} value - The node type to check (e.g., 'coordinators', 'brokers')
   * @param {string} section - The section type ('compute' or 'storage')
   * @returns {boolean} True if the node type exists in topology for the given section
   */
  function dbTypeEqualsTo(value, section) {
    // watchDependency('discriminator#/dbDetails')
    const dbDetailsLoaded = getValue(discriminator, '/dbDetails')
    if (!dbDetailsLoaded) return false

    const topology = dbDetails?.spec?.topology
    if (!topology) return false

    // For compute section, check if node type exists in topology
    if (section === 'compute') {
      return !!topology[value]
    }

    // For storage section, check if node type is historicals or middleManagers
    if (section === 'storage') {
      const storageNodeTypes = ['historicals', 'middleManagers']
      return storageNodeTypes.includes(value) && !!topology[value]
    }

    return false
  }

  /**
   * Gets the current trigger state for autoscaling
   * @param {string} path - The model path to the trigger
   * @returns {string} 'On' or 'Off'
   */
  function setTrigger(path) {
    let value = getValue(model, `/resources/${path}`)
    if (value) return value
    return 'On'
  }

  /**
   * Toggles the autoscaling trigger between On and Off
   * @param {string} path - The model path to the trigger
   */
  function onTriggerChange(path) {
    const value = getValue(model, `/resources/${path}`)
    if (value === 'On') {
      commit('wizard/model$update', {
        path: `/resources/${path}`,
        value: 'Off',
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: `/resources/${path}`,
        value: 'On',
        force: true,
      })
    }
  }

  /**
   * Fetches available machine profiles from node topology
   * Used for machine-based autoscaling configuration
   * @returns {Array} List of available machine profiles with their specifications
   */
  async function fetchTopologyMachines() {
    const annotations = getValue(
      model,
      '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations',
    )
    const instance = annotations['kubernetes.io/instance-type']

    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    if (instance) {
      try {
        const url = `/clusters/${user}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies/kubedb-ui-machine-profiles`
        const resp = await axios.get(url)

        const nodeGroups = resp.data?.spec?.nodeGroups || []
        setDiscriminatorValue('/topologyMachines', nodeGroups)
        // return nodeGroups
      } catch (e) {
        console.log(e)
        // return []
        setDiscriminatorValue('/topologyMachines', [])
      }
    }
  }

  /**
   * Gets available machine options for autoscaling configuration
   * Filters machines based on min/max constraints to ensure valid ranges
   * @param {string} nodeType - The type of Druid node (e.g., 'coordinators', 'brokers')
   * @param {string} minmax - Either 'min' or 'max' to indicate which constraint to get
   * @returns {Array} Filtered list of machine profiles with CPU and memory specifications
   */
  function getMachines(type, minmax) {
    // watchDependency('discriminator#/topologyMachines')
    const depends = minmax === 'min' ? 'max' : 'min'
    const dependantPath = `/allowedMachine-${type}-${depends}`

    // watchDependency(`discriminator#${dependantPath}`)
    const dependantMachineObj = getValue(discriminator, dependantPath)
    const dependantMachine = dependantMachineObj?.machine || ''

    const nodeGroups = getValue(discriminator, '/topologyMachines') || []

    const dependantIndex = nodeGroups?.findIndex((item) => item.topologyValue === dependantMachine)

    // Return array with text and value object (expected format for machine-compare loader)
    const machines = nodeGroups?.map((item) => {
      const text = item.topologyValue
      return {
        text,
        value: {
          machine: item.topologyValue,
          cpu: item.allocatable?.cpu,
          memory: item.allocatable?.memory,
        },
      }
    })

    const filteredMachine = machines?.filter((item, ind) =>
      minmax === 'min' ? ind <= dependantIndex : ind >= dependantIndex,
    )

    return dependantIndex === -1 ? machines : filteredMachine
  }

  function setAllowedMachine(type, minmax) {
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      console.log(e)
      parsedInstance = {}
    }

    const machine = parsedInstance[type] || ''
    const mx = machine?.includes(',') ? machine.split(',')[1] : ''
    const mn = machine?.includes(',') ? machine.split(',')[0] : ''
    const machineName = minmax === 'min' ? mn : mx

    // Find the machine details from topologyMachines
    const nodeGroups = getValue(discriminator, '/topologyMachines') || []
    const machineData = nodeGroups.find((item) => item.topologyValue === machineName)

    // Return object with machine, cpu, memory (expected format for machine-compare init)
    if (machineData) {
      return {
        machine: machineName,
        cpu: machineData.allocatable?.cpu,
        memory: machineData.allocatable?.memory,
      }
    }
    // Return empty object if no machine found
    return {
      machine: machineName || '',
      cpu: '',
      memory: '',
    }
  }

  function onMachineChange(nodeType) {
    const annoPath = '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations'
    const annotations = getValue(model, annoPath) || {}
    const instance = annotations['kubernetes.io/instance-type']
    let parsedInstance = {}
    try {
      if (instance) parsedInstance = JSON.parse(instance)
    } catch (e) {
      console.log(e)
      parsedInstance = {}
    }

    // Now discriminator values are objects with { machine, cpu, memory }
    const minMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-min`)
    const maxMachineObj = getValue(discriminator, `/allowedMachine-${nodeType}-max`)
    const minMachine = minMachineObj?.machine || ''
    const maxMachine = maxMachineObj?.machine || ''
    const minMaxMachine = `${minMachine},${maxMachine}`

    parsedInstance[nodeType] = minMaxMachine
    const instanceString = JSON.stringify(parsedInstance)
    annotations['kubernetes.io/instance-type'] = instanceString

    // Use cpu/memory directly from the machine objects
    const minMachineAllocatable = minMachineObj
      ? { cpu: minMachineObj.cpu, memory: minMachineObj.memory }
      : null
    const maxMachineAllocatable = maxMachineObj
      ? { cpu: maxMachineObj.cpu, memory: maxMachineObj.memory }
      : null
    const allowedPath = `/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/${nodeType}`

    if (minMachine && maxMachine && instance !== instanceString) {
      commit('wizard/model$update', {
        path: `${allowedPath}/maxAllowed`,
        value: maxMachineAllocatable,
        force: true,
      })
      commit('wizard/model$update', {
        path: `${allowedPath}/minAllowed`,
        value: minMachineAllocatable,
        force: true,
      })
      commit('wizard/model$update', {
        path: annoPath,
        value: annotations,
        force: true,
      })
    }
  }

  function setControlledResources(type) {
    const list = ['cpu', 'memory']
    const path = `/resources/autoscalingKubedbComDruidAutoscaler/spec/${type}/controlledResources`
    commit('wizard/model$update', {
      path: path,
      value: list,
      force: true,
    })
    return list
  }

  function hasAnnotations() {
    const annotations =
      getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/metadata/annotations') || {}
    const instance = annotations['kubernetes.io/instance-type']

    return !!instance
  }

  function hasNoAnnotations() {
    return !hasAnnotations()
  }

  async function fetchNodeTopology() {
    const owner = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const url = `/clusters/${owner}/${cluster}/proxy/node.k8s.appscode.com/v1alpha1/nodetopologies`
    try {
      const resp = await axios.get(url)
      const list = (resp && resp.data?.items) || []
      const mappedList = list.map((item) => {
        const name = (item.metadata && item.metadata.name) || ''
        return name
      })
      return mappedList
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isNodeTopologySelected() {
    // watchDependency(
    //   'model#/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/nodeTopology/name',
    // )
    const nodeTopologyName =
      getValue(
        model,
        '/resources/autoscalingKubedbComDruidAutoscaler/spec/compute/nodeTopology/name',
      ) || ''
    return !!nodeTopologyName.length
  }

  function showOpsRequestOptions() {
    if (isKubedb() === true) return true
    // watchDependency('model#/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name')
    // watchDependency('discriminator#/autoscalingType')
    return (
      !!getValue(model, '/resources/autoscalingKubedbComDruidAutoscaler/spec/databaseRef/name') &&
      !!getValue(discriminator, '/autoscalingType')
    )
  }

  function setApplyToIfReady() {
    return 'IfReady'
  }

  function setValueFromDbDetails(path) {
    const value = getValue(model, path)
    return value
  }

  // ************************* ConfigMap/Secret Functions **********************************************

  /**
   * Determines the source type for environment variable values
   * @returns {string} 'configMap', 'secret', or 'input'
   */
  function setValueFrom() {
    if (isConfigMapTypeValueFrom()) {
      return 'configMap'
    } else if (isSecretTypeValueFrom()) {
      return 'secret'
    } else {
      return 'input'
    }
  }

  /**
   * Fetches keys from a specified ConfigMap
   * Used to populate dropdown options for ConfigMap key selection
   * @returns {Array} List of ConfigMap keys with text/value pairs
   */
  async function getConfigMapKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    const configMapName = getValue(
      model,
      '/resources/kubedbComDruid/spec/monitor/prometheus/exporter/env/items/valueFrom/configMapKeyRef/name',
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/configMapKeyRef/name')

    if (!configMapName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/configmaps/${configMapName}`,
      )

      const configMaps = (resp && resp.data && resp.data.data) || {}

      const configMapKeys = Object.keys(configMaps).map((item) => ({
        text: item,
        value: item,
      }))

      return configMapKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecrets() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    // watchDependency('model#/metadata/release/namespace')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`,
        {
          params: {
            filter: { items: { metadata: { name: null }, type: null } },
          },
        },
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
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async function getSecretKeys() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const namespace = getValue(model, '/metadata/release/namespace')
    const secretName = getValue(
      model,
      '/resources/kubedbComDruid/spec/monitor/prometheus/exporter/env/items/valueFrom/secretKeyRef/name',
    )

    // watchDependency('data#/namespace')
    // watchDependency('rootModel#/valueFrom/secretKeyRef/name')

    if (!secretName) return []

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets/${secretName}`,
      )

      const secret = (resp && resp.data && resp.data.data) || {}

      const secretKeys = Object.keys(secret).map((item) => ({
        text: item,
        value: item,
      }))

      return secretKeys
    } catch (e) {
      console.log(e)
      return []
    }
  }

  // ************************* Gateway Binding Functions **********************************************

  /**
   * Checks if gateway binding is currently enabled
   * @returns {boolean} True if binding is enabled
   */
  function isBindingAlreadyOn() {
    const binding = getValue(discriminator, '/binding')
    return !!binding
  }

  /**
   * Adds or removes gateway binding configuration
   * Creates or deletes the DruidBinding resource based on toggle state
   */
  function addOrRemoveBinding() {
    const binding = getValue(discriminator, '/binding')
    if (binding) {
      commit('wizard/model$update', {
        path: '/resources/gatewayVoyagerAppscodeComDruidBinding',
        value: {},
        force: true,
      })
    } else {
      commit('wizard/model$delete', '/resources/gatewayVoyagerAppscodeComDruidBinding')
    }
  }

  // ************************* Ops Request Functions **********************************************

  /**
   * Generates the URL for creating a Druid ops request
   * Constructs different URLs based on whether running in KubeDB console or standalone
   * @param {string} reqType - The type of ops request (e.g., 'Upgrade', 'HorizontalScaling')
   * @returns {string} The constructed URL for the ops request creation page
   */
  function getOpsRequestUrl(reqType) {
    const cluster = storeGet('/route/params/cluster')
    const domain = storeGet('/domain') || ''
    const owner = storeGet('/route/params/user')
    const dbname = getValue(model, '/metadata/release/name')
    const group = getValue(model, '/metadata/resource/group')
    const kind = getValue(model, '/metadata/resource/kind')
    const namespace = getValue(model, '/metadata/release/namespace')
    const resource = getValue(model, '/metadata/resource/name')
    const version = getValue(model, '/metadata/resource/version')
    const routeRootPath = storeGet('/route/path')
    const pathPrefix = `${domain}/db${routeRootPath}`
    const pathSplit = pathPrefix.split('/').slice(0, -1).join('/')
    const pathConstructedForKubedb =
      pathSplit + `/create-opsrequest-${reqType.toLowerCase()}?namespace=${namespace}`

    const isKube = !!storeGet('/route/params/actions')

    if (isKube) return pathConstructedForKubedb
    else
      return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/druidopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=${reqType}`
  }

  // ************************* Export All Functions **********************************************

  return {
    // Common Helper Functions
    fetchJsons,
    disableLableChecker,
    isEqualToModelPathValue,
    getResources,
    isEqualToDiscriminatorPath,
    setValueFromModel,
    getNamespacedResourceList,
    getResourceList,
    resourceNames,
    unNamespacedResourceNames,
    returnTrue,
    returnFalse,
    returnStringYes,

    // Helper Functions
    objectCopy,
    valueExists,
    encodePassword,
    decodePassword,
    clearSpecModel,
    getCreateNameSpaceUrl,
    isRancherManaged,
    isKubedb,
    getNamespaces,

    // Backup & Restore Functions
    getBackupConfigsAndAnnotations,
    deleteKubeDbComDruidAnnotation,
    addKubeDbComDruidAnnotation,
    initScheduleBackup,
    initScheduleBackupForEdit,
    onScheduleBackupChange,
    showBackupForm,
    showScheduleBackup,
    initalizeTargetReferenceName,
    setInitialRestoreSessionRepo,
    initRepositoryChoise,
    initRepositoryChoiseForEdit,
    onRepositoryChoiseChange,
    onRepositoryNameChange,

    // KubeStash Backup Functions
    initBackupData,
    isBackupDataLoadedTrue,
    setBackupType,
    getTypes,
    onBackupTypeChange,
    isBackupType,
    setBlueprintSwitch,
    onBlueprintChange,
    setArchiverSwitch,
    onArchiverChange,
    addLabelAnnotation,
    deleteLabelAnnotation,
    getContext,
    onContextChange,
    getConfigList,
    onConfigChange,
    showPause,
    showConfigList,
    showSchedule,
    getNamespaceArray,
    onInputChange,
    setFileValueFromStash,
    onInputChangeSchedule,
    setInitSchedule,
    getDefault,
    getDefaultSchedule,
    fetchNamespaces,
    fetchNames,
    getBlueprints,
    isBlueprintOption,
    ifUsagePolicy,
    showBackupOptions,

    // Monitoring Functions
    showMonitoringSection,
    onEnableMonitoringChange,
    showCustomizeExporterSection,
    onCustomizeExporterChange,
    isValueExistInModel,
    onNamespaceChange,
    onLabelChange,
    onAgentChange,
    setMetadata,

    // Autoscaling Functions - Storage
    handleUnit,

    // Autoscaling Functions - Compute
    getDbDetails,
    dbTypeEqualsTo,
    setTrigger,
    onTriggerChange,
    fetchTopologyMachines,
    getMachines,
    setAllowedMachine,
    onMachineChange,
    setControlledResources,
    hasAnnotations,
    hasNoAnnotations,
    fetchNodeTopology,
    isNodeTopologySelected,
    showOpsRequestOptions,
    setApplyToIfReady,
    setValueFromDbDetails,

    // ConfigMap/Secret Functions
    setValueFrom,
    isConfigMapTypeValueFrom,
    isSecretTypeValueFrom,
    isInputTypeValueFrom,
    onValueFromChange,
    isEqualToValueFromType,
    getConfigMapKeys,
    getSecrets,
    getSecretKeys,

    // Gateway Binding Functions
    isBindingAlreadyOn,
    addOrRemoveBinding,

    // Ops Request Functions
    getOpsRequestUrl,
  }
}
