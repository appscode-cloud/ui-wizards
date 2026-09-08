const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('/bundle', {})
  setDiscriminatorValue('/allDbVersions', {})
  setDiscriminatorValue('/enableProfiles', false)
  setDiscriminatorValue('/useCustomProfile', false)
  setDiscriminatorValue('/profile', '')
  setDiscriminatorValue('/profileChoseSwitch', false)
  setDiscriminatorValue('/presetPage', 'deployment-type')
  setDiscriminatorValue('/isHubManaged', false)

  /************** Common Funcitons ******************/

  const machinesMap = {
    'db.t.micro': {
      resources: {
        requests: {
          cpu: '250m',
          memory: '512Mi',
        },
        limits: {
          cpu: '500m',
          memory: '1Gi',
        },
      },
    },
    'db.t.small': {
      resources: {
        requests: {
          cpu: '1',
          memory: '1Gi',
        },
        limits: {
          cpu: '2',
          memory: '2Gi',
        },
      },
    },
    'db.t.medium': {
      resources: {
        requests: {
          cpu: '1',
          memory: '2Gi',
        },
        limits: {
          cpu: '2',
          memory: '4Gi',
        },
      },
    },
    'db.t.large': {
      resources: {
        requests: {
          cpu: '1',
          memory: '4Gi',
        },
        limits: {
          cpu: '2',
          memory: '8Gi',
        },
      },
    },
    'db.t.xlarge': {
      resources: {
        requests: {
          cpu: '2',
          memory: '8Gi',
        },
        limits: {
          cpu: '4',
          memory: '16Gi',
        },
      },
    },
    'db.t.2xlarge': {
      resources: {
        requests: {
          cpu: '4',
          memory: '16Gi',
        },
        limits: {
          cpu: '8',
          memory: '32Gi',
        },
      },
    },
    'db.m.small': {
      resources: {
        requests: {
          cpu: '500m',
          memory: '0.85Gi',
        },
        limits: {
          cpu: '1',
          memory: '1.7Gi',
        },
      },
    },
    'db.m.large': {
      resources: {
        requests: {
          cpu: '1',
          memory: '4Gi',
        },
        limits: {
          cpu: '2',
          memory: '8Gi',
        },
      },
    },
    'db.m.xlarge': {
      resources: {
        requests: {
          cpu: '2',
          memory: '8Gi',
        },
        limits: {
          cpu: '4',
          memory: '16Gi',
        },
      },
    },
    'db.m.2xlarge': {
      resources: {
        requests: {
          cpu: '4',
          memory: '16Gi',
        },
        limits: {
          cpu: '8',
          memory: '32Gi',
        },
      },
    },
    'db.m.4xlarge': {
      resources: {
        requests: {
          cpu: '8',
          memory: '32Gi',
        },
        limits: {
          cpu: '16',
          memory: '64Gi',
        },
      },
    },
    'db.m.8xlarge': {
      resources: {
        requests: {
          cpu: '16',
          memory: '64Gi',
        },
        limits: {
          cpu: '32',
          memory: '128Gi',
        },
      },
    },
    'db.m.12xlarge': {
      resources: {
        requests: {
          cpu: '24',
          memory: '96Gi',
        },
        limits: {
          cpu: '48',
          memory: '192Gi',
        },
      },
    },
    'db.m.16xlarge': {
      resources: {
        requests: {
          cpu: '32',
          memory: '128Gi',
        },
        limits: {
          cpu: '64',
          memory: '256Gi',
        },
      },
    },
    'db.m.24xlarge': {
      resources: {
        requests: {
          cpu: '48',
          memory: '192Gi',
        },
        limits: {
          cpu: '96',
          memory: '384Gi',
        },
      },
    },
    'db.r.large': {
      resources: {
        requests: {
          cpu: '1',
          memory: '8Gi',
        },
        limits: {
          cpu: '2',
          memory: '16Gi',
        },
      },
    },
    'db.r.xlarge': {
      resources: {
        requests: {
          cpu: '2',
          memory: '16Gi',
        },
        limits: {
          cpu: '4',
          memory: '32Gi',
        },
      },
    },
    'db.r.2xlarge': {
      resources: {
        requests: {
          cpu: '4',
          memory: '32Gi',
        },
        limits: {
          cpu: '8',
          memory: '64Gi',
        },
      },
    },
    'db.r.4xlarge': {
      resources: {
        requests: {
          cpu: '8',
          memory: '96Gi',
        },
        limits: {
          cpu: '16',
          memory: '192Gi',
        },
      },
    },
    'db.r.8xlarge': {
      resources: {
        requests: {
          cpu: '16',
          memory: '128Gi',
        },
        limits: {
          cpu: '32',
          memory: '256Gi',
        },
      },
    },
    'db.r.12xlarge': {
      resources: {
        requests: {
          cpu: '24',
          memory: '192Gi',
        },
        limits: {
          cpu: '48',
          memory: '384Gi',
        },
      },
    },
    'db.r.16xlarge': {
      resources: {
        requests: {
          cpu: '32',
          memory: '256Gi',
        },
        limits: {
          cpu: '64',
          memory: '512Gi',
        },
      },
    },
    'db.r.24xlarge': {
      resources: {
        requests: {
          cpu: '24',
          memory: '384Gi',
        },
        limits: {
          cpu: '96',
          memory: '768Gi',
        },
      },
    },
  }

  const machineList = [
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

  const modes = {
    Cassandra: {
      availableModes: ['Standalone', 'Topology'],
      default: 'Topology',
    },
    ClickHouse: {
      availableModes: ['Standalone', 'Topology'],
      default: 'Topology',
    },
    DB2: {
      availableModes: ['Standalone'],
      default: 'Standalone',
    },
    DocumentDB: {
      availableModes: ['Standalone', 'ReplicaSet'],
      default: 'ReplicaSet',
    },
    Druid: {
      availableModes: ['Topology'],
      default: 'Topology',
    },
    Elasticsearch: {
      availableModes: ['Combined', 'Topology'],
      default: 'Topology',
    },
    HanaDB: {
      availableModes: ['Standalone', 'SystemReplication'],
      default: 'Standalone',
    },
    Kafka: {
      availableModes: ['Combined', 'Topology'],
      default: 'Topology',
    },
    Hazelcast: {
      availableModes: ['Combined', 'Topology'],
      default: 'Topology',
    },
    Ignite: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    MSSQLServer: {
      availableModes: ['Standalone', 'Topology'],
      default: 'Topology',
    },
    MariaDB: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Memcached: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Milvus: {
      availableModes: ['Standalone', 'Distributed'],
      default: 'Standalone',
    },
    MongoDB: {
      availableModes: ['Standalone', 'Replicaset', 'Sharded'],
      default: 'Replicaset',
    },
    MySQL: {
      availableModes: [
        'Standalone',
        'GroupReplication',
        'InnoDBCluster',
        'RemoteReplica',
        'SemiSync',
      ],
      default: 'GroupReplication',
    },
    Neo4j: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Oracle: {
      availableModes: ['Standalone', 'DataGuard'],
      default: 'DataGuard',
    },
    PerconaXtraDB: {
      availableModes: ['Replicaset'],
      default: 'Replicaset',
    },
    PgBouncer: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Pgpool: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Postgres: {
      availableModes: ['Standalone', 'Cluster', 'RemoteReplica'],
      default: 'Cluster',
    },
    ProxySQL: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Qdrant: {
      availableModes: ['Standalone', 'Distributed'],
      default: 'Standalone',
    },
    RabbitMQ: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    Redis: {
      availableModes: ['Standalone', 'Cluster', 'Sentinel'],
      default: 'Cluster',
    },
    Singlestore: {
      availableModes: ['Standalone', 'Topology'],
      default: 'Topology',
    },
    Solr: {
      availableModes: ['Standalone', 'Replicaset', 'Topology'],
      default: 'Topology',
    },
    Weaviate: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
    ZooKeeper: {
      availableModes: ['Standalone', 'Replicaset'],
      default: 'Replicaset',
    },
  }

  function setTool() {
    commit('wizard/model$update', {
      path: '/spec/backup/tool',
      value: 'KubeStash',
      force: true,
    })
    return 'KubeStash'
  }

  function returnFalse() {
    return false
  }

  // remove itemCtx
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

  function presetNameEqualsTo(value) {
    const presetName = storeGet('/route/params/presetName') || ''
    return presetName === value
  }

  function isActivePage(page) {
    return getValue(discriminator, '/presetPage') === page
  }

  function getOptions(type) {
    // watchDependency(`model#/spec/admin/${type}/available`)
    const options = getValue(model, `/spec/admin/${type}/available`)
    return options
  }

  async function FetchAllDbVersions() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const url = `/clusters/${owner}/${cluster}/proxy/catalog.kubedb.com/v1alpha1/all-available`

    const resp = await axios.get(url)

    setDiscriminatorValue(`/allDbVersions`, resp.data)
    return resp.data
  }

  function isConfigureDb(value) {
    // watchDependency(`discriminator#/${value}/isConfigure`)
    const resp = getValue(discriminator, `/${value}/isConfigure`)
    return resp
  }

  async function FetchDbVersions(db) {
    // watchDependency(`discriminator#/allDbVersions`)
    let data = getValue(discriminator, `allDbVersions/${db}Version`)
    if (!data?.includes('Remove all')) data?.unshift('Remove all')
    if (!data?.includes('Select all')) data?.unshift('Select all')
    return data
  }

  // `FetchDbVersions` unshifts the two bulk-action entries into the cached list
  // in place, so the raw catalog always has to be read back through here.
  function allDbVersions(db) {
    const versions = getValue(discriminator, `allDbVersions/${db}Version`) ?? []
    return versions.filter((v) => v !== 'Select all' && v !== 'Remove all')
  }

  function clearDefaultVersion(db) {
    const data = getValue(model, `/spec/admin/databases/${db}/versions/available`)
    if (data?.includes('Remove all')) return []
    if (data?.includes('Select all')) {
      return allDbVersions(db).map((v) => ({ text: v, value: v }))
    }
  }

  function clearDefaultMode(db) {
    commit('wizard/model$update', {
      path: `/spec/admin/databases/${db}/mode/default`,
      value: '',
      force: true,
    })
  }

  // `type` is a path under /spec/admin, e.g. `databases/Cassandra/versions`.
  // Every `Can user modify ...?` switch is stored as a `toggle` next to the
  // `available`/`default` pair it controls.
  function isAdminToggleOn(type) {
    // watchDependency(`model#/spec/admin/${type}/toggle`)
    return !!getValue(model, `/spec/admin/${type}/toggle`)
  }

  function isAdminToggleOff(type) {
    return !isAdminToggleOn(type)
  }

  // While the switch is off end users never get a picker, so `default` is the
  // single value they are given and must not be left empty.
  function isDefaultRequired(type, value) {
    if (isAdminToggleOn(type)) return ''
    return value ? '' : 'This field is required'
  }

  function availableVersions(db) {
    // watchDependency(`model#/spec/admin/databases/${db}/versions/available`)
    // The `Available Versions` picker is hidden while the switch is off, so the
    // whole catalog has to be selectable from `Default Version` instead.
    if (isAdminToggleOff(`databases/${db}/versions`)) return allDbVersions(db)
    return getValue(model, `/spec/admin/databases/${db}/versions/available`)
  }

  function availableModes(db) {
    // watchDependency(`model#/spec/admin/databases/${db}/mode/available`)
    // Same as `availableVersions`: with `Available Modes` hidden, every mode has
    // to be selectable from `Default Mode`. `fetchModes` also seeds
    // `mode/available`, which nothing else does while the picker is hidden.
    if (isAdminToggleOff(`databases/${db}/mode`)) return fetchModes(db)
    return getValue(model, `/spec/admin/databases/${db}/mode/available`)
  }

  function isKubedbPresetEnable(storeGet) {
    const featureSets = storeGet('/cluster/featureSets/result') || []
    const featureSetName = storeGet('/route/params/featureset') || ''
    const featureSet = featureSets.find((item) => item?.metadata?.name === featureSetName)

    const features = featureSet?.status?.features || []
    const isKubedbPresetEnable = features.some((feature) => {
      if (feature.name === 'kubedb-ui-presets') return true
    })
    return isKubedbPresetEnable
  }

  async function FetchDbBundle() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const url = `/clusters/${owner}/${cluster}/db-bundle?type=common&deployment=all`
    try {
      const resp = await axios.get(url)
      setDiscriminatorValue('/bundle', resp.data)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  // TODO: the hub console url is a placeholder until we know where it comes from
  // (annotation on the HelmRelease / ClusterChartPreset, console store, or OCM objects).
  const hubUiLink = 'https://appscode.com'

  // A preset that is delivered by the hub cluster carries an AppliedManifestWork
  // ownerReference on the flux HelmRelease that installed it. The release name and
  // namespace are stamped on the preset itself as flux labels. Such presets are
  // read only here, they can only be changed from the hub.
  async function fetchHubOwnership() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    const presetName = storeGet('/route/params/presetName') || ''
    if (!presetName) {
      setDiscriminatorValue('/isHubManaged', false)
      return false
    }
    const proxyUrl = `/clusters/${owner}/${cluster}/proxy`
    try {
      const preset = await axios.get(
        `${proxyUrl}/charts.x-helm.dev/v1alpha1/clusterchartpresets/${presetName}`,
      )
      const labels = preset.data?.metadata?.labels || {}
      const releaseName = labels['helm.toolkit.fluxcd.io/name']
      const releaseNamespace = labels['helm.toolkit.fluxcd.io/namespace']
      if (!releaseName || !releaseNamespace) {
        setDiscriminatorValue('/isHubManaged', false)
        return false
      }
      const release = await axios.get(
        `${proxyUrl}/helm.toolkit.fluxcd.io/v2/namespaces/${releaseNamespace}/helmreleases/${releaseName}`,
      )
      const ownerReferences = release.data?.metadata?.ownerReferences || []
      const isHubManaged = ownerReferences.some(
        (ref) =>
          ref?.apiVersion === 'work.open-cluster-management.io/v1' &&
          ref?.kind === 'AppliedManifestWork',
      )
      setDiscriminatorValue('/isHubManaged', isHubManaged)
      return isHubManaged
    } catch (e) {
      console.log(e)
      setDiscriminatorValue('/isHubManaged', false)
      return false
    }
  }

  async function initPresetPage() {
    await Promise.all([FetchDbBundle(), fetchHubOwnership()])
  }

  function isHubManaged() {
    return !!getValue(discriminator, '/isHubManaged')
  }

  function loadHubManagedWarning() {
    return `This preset is maintained by the hub cluster, so it can not be edited from here. Use the <a href="${hubUiLink}" target="_blank" rel="noopener noreferrer">hub console</a> to change it.`
  }

  function getPlacements() {
    // watchDependency('discriminator#/bundle')
    const placements = getValue(discriminator, '/bundle/placementpolicies')

    return placements
  }

  function getNodeTopology() {
    // watchDependency('discriminator#/bundle')
    const shared = getValue(discriminator, '/bundle/shared')
    const dedicated = getValue(discriminator, '/bundle/dedicated')

    const nodeTopology = []

    shared?.map((item) => {
      nodeTopology.push(item + ' (shared)')
    })
    dedicated?.map((item) => {
      nodeTopology.push(item + ' (dedicated)')
    })

    return nodeTopology
  }

  function getStorageClass() {
    // watchDependency('discriminator#/bundle')
    const storageClasses = getValue(discriminator, '/bundle/storageclasses')

    return storageClasses
  }

  function getClusterIssuers() {
    // watchDependency('discriminator#/bundle')
    const clusterIssuers = getValue(discriminator, '/bundle/clusterissuers')

    return clusterIssuers
  }

  async function getNamespaces() {
    const params = storeGet('/route/params')
    const { user, cluster, group, version, resource } = params
    try {
      const resp = await axios.post(
        `/clusters/${user}/${cluster}/proxy/identity.k8s.appscode.com/v1alpha1/selfsubjectnamespaceaccessreviews`,
        {
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
        },
      )
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

  function isRancherManaged() {
    const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
    const found = managers.find((item) => item === 'Rancher')
    return !!found
  }

  function isKubedbUiPreset() {
    const presetName = storeGet('/route/params/presetName') || ''
    if (presetName === 'kubedb-ui-presets') return true
    const enabledFeatures = getValue(discriminator, '/enabledFeatures') || []
    // watchDependency('discriminator#/enabledFeatures')
    if (enabledFeatures?.includes('kubedb-ui-presets')) {
      return true
    } else return false
  }

  function fetchModes(db) {
    const arr = modes[db]?.availableModes || []
    const val = getValue(model, `/spec/admin/databases/${db}/mode/available`)
    if (!val)
      commit('wizard/model$update', {
        path: `/spec/admin/databases/${db}/mode/available`,
        value: arr,
        force: true,
      })
    return arr
  }

  function setDefaultMode(db) {
    const modelDef = getValue(model, `/spec/admin/databases/${db}/mode/default`)
    const def = modes[db]?.default || ''
    // if (modelDef === undefined) return def
    return def
  }

  function setStorageClass() {
    // watchDependency('model#/spec/admin/storageClasses/available')
    const classes = getValue(model, '/spec/admin/storageClasses/available') || []
    if (classes.length === 1) return classes[0]
  }

  function preSelectClusterIssuer() {
    const val = getValue(model, '/spec/admin/tls/default')
    const clusterIssuers = getClusterIssuers()
    if (val) {
      if (clusterIssuers?.length) {
        commit('wizard/model$update', {
          path: '/spec/admin/clusterIssuers/available',
          value: [clusterIssuers[0]],
          force: true,
        })
      }
    } else {
      commit('wizard/model$update', {
        path: '/spec/admin/clusterIssuers/available',
        value: '',
        force: true,
      })
    }
  }

  // machine profiles stuffs

  function parseMemory(memory) {
    if (memory == null || (typeof memory !== 'string' && typeof memory !== 'number')) return 0
    const units = {
      B: 1, // Base unit (Bytes)
      K: 1000, // 1 K = 1000 B
      KB: 1000, // 1 KB = 1000 B
      Ki: 1024, // 1 Ki = 1024 B
      M: 1000 * 1000, // 1 M = 1000 K
      MB: 1000 * 1000, // 1 MB = 1000 KB
      Mi: 1024 * 1024, // 1 Mi = 1024 Ki
      G: 1000 * 1000 * 1000, // 1 G = 1000 M
      GB: 1000 * 1000 * 1000, // 1 GB = 1000 MB
      Gi: 1024 * 1024 * 1024, // 1 Gi = 1024 Mi
      T: 1000 * 1000 * 1000 * 1000, // 1 T = 1000 G
      TB: 1000 * 1000 * 1000 * 1000, // 1 TB = 1000 GB
      Ti: 1024 * 1024 * 1024 * 1024, // 1 Ti = 1024 Gi
      P: 1000 * 1000 * 1000 * 1000 * 1000, // 1 P = 1000 T
      PB: 1000 * 1000 * 1000 * 1000 * 1000, // 1 PB = 1000 TB
      Pi: 1024 * 1024 * 1024 * 1024 * 1024, // 1 Pi = 1024 Ti
    }

    // If memory is just a number (int or float), treat it as bytes
    if (/^\d+(\.\d+)?$/.test(memory)) {
      return parseFloat(memory)
    }

    // Match float or int followed by optional unit
    const match = memory.match(/^(\d+(?:\.\d+)?)(B|KB|Ki|K|M|MB|Mi|G|GB|Gi|T|TB|Ti|P|PB|Pi)?$/)
    if (match) {
      const value = parseFloat(match[1])
      const unit = match[2] || 'B'
      return value * (units[unit] || 1)
    }

    return 0 // Default fallback for unexpected formats
  }

  function parseCPU(cpu) {
    if (cpu == null) return 0
    if (typeof cpu === 'number') return cpu // If already a number, return as is

    const match = cpu.match(/^(\d+(?:\.\d+)?)(m)?$/)
    if (!match) return 0 // Invalid format, return 0

    if (cpu.endsWith('m')) {
      return parseFloat(cpu) / 1000 // Convert '500m' to 0.5
    }

    return parseFloat(cpu) // Convert '1', '0.5' directly
  }

  function sortMachines(arr) {
    if (!Array.isArray(arr)) return []
    return arr.sort((a, b) => {
      const memA = parseMemory(a?.limits?.memory)
      const memB = parseMemory(b?.limits?.memory)

      if (memA !== memB) {
        return memA - memB
      }

      const cpuA = parseCPU(a?.limits?.cpu)
      const cpuB = parseCPU(b?.limits?.cpu)

      return cpuA - cpuB
    })
  }

  let initialMachines = []
  function hasMachineProfiles() {
    const val = getValue(model, '/spec/admin/machineProfiles/machines') || []
    initialMachines = val
    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: sortMachines(val),
      force: true,
    })
    commit('wizard/temp$update', {
      path: '/enableProfiles',
      value: !!val?.length,
    })

    return !!val?.length
  }

  function isEnableProfiles() {
    // watchDependency('discriminator#/enableProfiles')
    return getValue(discriminator, '/enableProfiles') || false
  }

  function onMachineProfilesToggle() {
    const toggle = getValue(discriminator, '/enableProfiles') || false

    if (!toggle) {
      commit('wizard/model$update', {
        path: '/spec/admin/machineProfiles',
        value: { available: [], default: '', machines: [] },
        force: true,
      })
    } else {
      commit('wizard/model$update', {
        path: '/spec/admin/machineProfiles/machines',
        value: initialMachines,
        force: true,
      })
    }
  }

  // every fully filled in profile, in the shape the selects expect
  function machineOptions() {
    // watchDependency('model#/spec/admin/machineProfiles/machines')
    const machines = getValue(model, '/spec/admin/machineProfiles/machines') || []
    return (
      machines
        ?.filter((machine) => machine?.id && machine?.limits?.cpu && machine?.limits?.memory)
        .map((machine) => ({
          text: machine.id,
          value: machine.id,
        })) || []
    )
  }

  function isCustomProfileOn() {
    // watchDependency('discriminator#/useCustomProfile')
    return !!getValue(discriminator, '/useCustomProfile')
  }

  function getMachines() {
    // watchDependency('model#/spec/admin/machineProfiles/machines')
    // watchDependency('discriminator#/useCustomProfile')
    let mappedMachine = machineOptions()

    const hasCustom = getValue(discriminator, '/useCustomProfile')
    if (hasCustom) mappedMachine = [{ text: 'custom', value: 'custom' }, ...mappedMachine]
    else if (hasCustom === false)
      mappedMachine = mappedMachine.filter((item) => item.value !== 'custom')

    commit('wizard/temp$update', {
      path: '/spec/admin/machineProfiles/available',
      value: mappedMachine?.map((item) => item.value) || [],
    })
    return mappedMachine
  }

  function setCustomAvlMachine() {
    // watchDependency('discriminator#/useCustomProfile')
    const hasCustom = getValue(discriminator, '/useCustomProfile')
    let avl = getValue(model, '/spec/admin/machineProfiles/available') || []

    avl = avl.map((item) => ({ text: item, value: item }))
    avl = avl.filter((item) => item.value !== 'custom')

    if (hasCustom) {
      avl = [{ text: 'custom', value: 'custom' }, ...avl]
    }
    return avl
  }

  function onAvailableMachineChange() {
    const setMachines = getValue(model, '/spec/admin/machineProfiles/available') || []
    const loadedMachines = getValue(discriminator, '/spec/admin/machineProfiles/available') || []
    const hasCustom = getValue(discriminator, '/useCustomProfile')

    // filter out unselected machines from from available machine list
    let res = setMachines?.filter((item) => loadedMachines?.includes(item)) || []
    res = res?.filter((item) => item !== 'custom')
    if (hasCustom) res = ['custom', ...res]
    res = res?.map((item) => ({ text: item, value: item })) || []

    return res
  }

  function getAvailableMachines() {
    // watchDependency('model#/spec/admin/machineProfiles/available')
    // watchDependency('discriminator#/useCustomProfile')
    // The `Available Machines` picker is hidden while the custom resource switch
    // is off, so `Default Machine` offers every defined profile instead of the
    // curated subset. `syncAvailableMachines` keeps `available` usable meanwhile,
    // the same way `fetchModes` seeds `mode/available`.
    if (!isCustomProfileOn()) {
      syncAvailableMachines()
      return machineOptions()
    }
    let machines = getValue(model, '/spec/admin/machineProfiles/available') || []
    return machines
  }

  // `available` is normally maintained by the `Available Machines` picker. That
  // picker is hidden while the switch is off, and the only thing the switch takes
  // away is the `custom` entry, so end users keep every defined profile: exactly
  // the options `Default Machine` lists. Leaving `available` empty is not an
  // option, the consuming editor falls back to the built in machine list then.
  function syncAvailableMachines() {
    if (isCustomProfileOn()) return

    const ids = machineOptions().map((item) => item.value)
    const current = getValue(model, '/spec/admin/machineProfiles/available') || []

    const unchanged = current.length === ids.length && current.every((item, i) => item === ids[i])
    if (unchanged) return

    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/available',
      value: ids,
      force: true,
    })
  }

  // remembers the curated list so turning the switch off and on again does not
  // lose it
  let curatedMachines = []
  function onCustomProfileToggle() {
    if (isCustomProfileOn()) {
      if (curatedMachines.length)
        commit('wizard/model$update', {
          path: '/spec/admin/machineProfiles/available',
          value: curatedMachines,
          force: true,
        })
      return
    }

    curatedMachines = getValue(model, '/spec/admin/machineProfiles/available') || []

    // `custom` is not offered any more, so it can not stay as the default either
    const ids = machineOptions().map((item) => item.value)
    const def = getValue(model, '/spec/admin/machineProfiles/default') || ''
    if (def && !ids.includes(def))
      commit('wizard/model$update', {
        path: '/spec/admin/machineProfiles/default',
        value: '',
        force: true,
      })

    syncAvailableMachines()
  }

  function onDefaultMachineChange() {
    syncAvailableMachines()
  }

  function isKnownProfileToggled(index) {
    // watchDependency('discriminator#/profileChoseSwitch')
    const val = getValue(
      discriminator,
      `/spec/admin/machineProfiles/machines/${index}/temp/profileChoseSwitch`,
    )
    return val
  }

  function getKnownProfile() {
    const machineProfiles = getValue(model, '/spec/admin/machineProfiles/machines')

    // filtering machine list, if it's already in the model we don't need to show it
    const filteredMachines = machineList.filter(
      (machine) => !machineProfiles.some((m) => m.id === machine),
    )
    const mappedMachine = filteredMachines.map((item) => ({
      text: item,
      value: item.toLowerCase(),
      subText: `CPU: ${machinesMap[item].resources.limits.cpu}, memory: ${machinesMap[item].resources.limits.memory}`,
    }))
    return mappedMachine
  }

  function setLimits(type, index) {
    // watchDependency('discriminator#/profile')
    const pro =
      getValue(discriminator, `/spec/admin/machineProfiles/machines/${index}/temp/profile`) || ''
    if (!pro) {
      const input = getValue(
        discriminator,
        `/spec/admin/machineProfiles/machines/${index}/temp/profile/limits/${type}`,
      )
      return input
    }
    const profileDetails = machinesMap[pro] || {}
    const limits = profileDetails.resources?.limits || {}
    return limits[type] || ''
  }

  function getProfileName(index) {
    // watchDependency('discriminator#/profile')
    const pro =
      getValue(discriminator, `/spec/admin/machineProfiles/machines/${index}/temp/profile`) || ''
    if (!pro) return
    return pro
  }

  function onMachineProfileChange(index) {
    const machines = getValue(discriminator, 'spec/admin/machineProfiles/machines')
    const cleanedMachines = Array.isArray(machines) ? machines.map(({ temp, ...rest }) => rest) : []

    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: sortMachines(cleanedMachines),
    })
  }

  function hasCustomProfile() {
    const machines = getValue(model, '/spec/admin/machineProfiles/available')
    const hasCustom = machines.includes('custom')

    commit('wizard/temp$update', {
      path: '/useCustomProfile',
      value: hasCustom,
    })
    return hasCustom
  }

  function setMachineProfiles() {
    const machines = getValue(model, '/spec/admin/machineProfiles/machines') || []
    return machines
  }

  async function fetchNames(type) {
    // watchDependency(`model#/${type}/namespace`)
    const username = storeGet('/route/params/user')
    const clusterName = storeGet('/route/params/cluster')
    const namespace = getValue(model, `/spec/backup/kubestash/${type}/namespace`)
    const suffix =
      type === 'encryptionSecret'
        ? 'secrets'
        : type === 'retentionPolicy'
          ? 'retentionpolicies'
          : 'backupstorages'
    const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
    const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'
    const url = `/clusters/${username}/${clusterName}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`
    try {
      if (namespace) {
        const resp = await axios.get(url)
        let names = resp?.data?.items
        names = names.map((ele) => ele?.metadata?.name)
        return names
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  return {
    preSelectClusterIssuer,
    isRancherManaged,
    getOptions,
    getNodeTopology,
    FetchAllDbVersions,
    isConfigureDb,
    FetchDbVersions,
    availableVersions,
    clearDefaultVersion,
    isAdminToggleOn,
    isDefaultRequired,
    getPlacements,
    getStorageClass,
    getClusterIssuers,
    getNamespaces,
    isKubedbUiPreset,
    FetchDbBundle,
    initPresetPage,
    fetchHubOwnership,
    isHubManaged,
    loadHubManagedWarning,
    setTool,
    returnFalse,
    fetchJsons,
    presetNameEqualsTo,
    isActivePage,
    fetchModes,
    availableModes,
    setDefaultMode,
    clearDefaultMode,
    setStorageClass,
    hasMachineProfiles,
    isEnableProfiles,
    getMachines,
    onMachineProfilesToggle,
    isKnownProfileToggled,
    getKnownProfile,
    setLimits,
    getProfileName,
    hasCustomProfile,
    getAvailableMachines,
    isCustomProfileOn,
    onCustomProfileToggle,
    onDefaultMachineChange,
    setCustomAvlMachine,
    onMachineProfileChange,
    setMachineProfiles,
    fetchNames,
    onAvailableMachineChange,
  }
}
