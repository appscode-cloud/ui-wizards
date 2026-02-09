const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  /********** Initialize Discriminator **************/

  setDiscriminatorValue('/bundle', {})
  setDiscriminatorValue('/allDbVersions', {})
  setDiscriminatorValue('/enableProfiles', true)
  setDiscriminatorValue('/useCustomProfile', false)
  setDiscriminatorValue('/profile', '')
  setDiscriminatorValue('/profileChoseSwitch', false)

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
          memory: '912680550',
        },
        limits: {
          cpu: '1',
          memory: '1825361100',
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
    Druid: {
      availableModes: ['Topology'],
      default: 'Topology',
    },
    Elasticsearch: {
      availableModes: ['Combined', 'Topology'],
      default: 'Topology',
    },
    FerretDB: {
      availableModes: ['PrimaryOnly', 'PrimaryAndSecondary'],
      default: 'PrimaryAndSecondary',
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

  function checkModeToggle(db) {
    const toggle = getValue(model, `/spec/admin/databases/${db}/mode/toggle`)
    if (toggle === undefined) return true
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

  function clearDefaultVersion(db) {
    const data = getValue(model, `/spec/admin/databases/${db}/versions/available`)
    if (data?.includes('Select all')) {
      versions = getValue(discriminator, `allDbVersions/${db}Version`)
      commit('wizard/model$update', {
        path: `/spec/admin/databases/${db}/versions/available`,
        value: versions,
        force: true,
      })
    }
    if (data?.includes('Remove all')) {
      commit('wizard/model$update', {
        path: `/spec/admin/databases/${db}/versions/available`,
        value: [],
        force: true,
      })
    }
  }

  function clearDefaultMode(db) {
    commit('wizard/model$update', {
      path: `/spec/admin/databases/${db}/mode/default`,
      value: '',
      force: true,
    })
  }

  function availableVersions(db) {
    // watchDependency(`model#/spec/admin/databases/${db}/versions/available`)
    return getValue(model, `/spec/admin/databases/${db}/versions/available`)
  }

  function availableModes(db) {
    // watchDependency(`model#/spec/admin/databases/${db}/mode/available`)
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

  function setTool() {
    commit('wizard/model$update', {
      path: '/spec/backup/tool',
      value: 'KubeStash',
      force: true,
    })
    return 'KubeStash'
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
    const classes = getValue(model, '/spec/admin/storageClasses/available')
    if (classes.length === 1)
      commit('wizard/model$update', {
        path: '/spec/admin/storageClasses/default',
        value: classes[0],
        force: true,
      })
    return classes[0] ?? ''
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

  let initialMachines = []
  function hasMachineProfiles() {
    const val = getValue(model, '/spec/admin/machineProfiles/machines') || []
    initialMachines = val
    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: sortMachines(val),
      force: true,
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

  function getMachines() {
    // watchDependency('model#/spec/admin/machineProfiles/machines')
    // watchDependency('discriminator#/useCustomProfile')
    let machines = getValue(model, '/spec/admin/machineProfiles/machines') || []

    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: sortMachines(machines),
      force: true,
    })

    let mappedMachine = machines?.map((machine) => ({
      text: machine.id,
      value: machine.id,
    }))

    const hasCustom = getValue(discriminator, '/useCustomProfile')
    if (hasCustom) mappedMachine = [{ text: 'custom', value: 'custom' }, ...mappedMachine]
    else if (hasCustom === false)
      mappedMachine = mappedMachine.filter((item) => item.value !== 'custom')

    return mappedMachine
  }

  function setCustomAvlMachine() {
    // watchDependency('discriminator#/useCustomProfile')
    const hasCustom = getValue(discriminator, '/useCustomProfile')
    let avl = getValue(model, '/spec/admin/machineProfiles/available') || []

    if (hasCustom) avl = ['custom', ...avl]
    else avl = avl.filter((item) => item !== 'custom')

    return avl
  }

  function getAvailableMachines() {
    // watchDependency('model#/spec/admin/machineProfiles/available')
    let machines = getValue(model, '/spec/admin/machineProfiles/available') || []
    return machines
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
    const updatedMachines = machines.map(({ temp, ...rest }) => rest)

    commit('wizard/model$update', {
      path: '/spec/admin/machineProfiles/machines',
      value: updatedMachines,
    })
  }

  function hasCustomProfile() {
    const machines = getValue(model, '/spec/admin/machineProfiles/available')
    const hasCustom = machines.includes('custom')
    return hasCustom
  }

  function setMachineProfiles() {
    const machines = getValue(model, '/spec/admin/machineProfiles/machines') || []
    return machines
  }

  function parseMemory(memory) {
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
    if (typeof cpu === 'number') return cpu // If already a number, return as is

    const match = cpu.match(/^(\d+(?:\.\d+)?)(m)?$/)
    if (!match) return 0 // Invalid format, return 0

    if (cpu.endsWith('m')) {
      return parseFloat(cpu) / 1000 // Convert '500m' to 0.5
    }

    return parseFloat(cpu) // Convert '1', '0.5' directly
  }

  function sortMachines(arr) {
    return arr.sort((a, b) => {
      const memA = parseMemory(a.limits.memory)
      const memB = parseMemory(b.limits.memory)

      if (memA !== memB) {
        return memA - memB
      }

      const cpuA = parseCPU(a.limits.cpu)
      const cpuB = parseCPU(b.limits.cpu)

      return cpuA - cpuB
    })
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
    getPlacements,
    getStorageClass,
    getClusterIssuers,
    getNamespaces,
    isKubedbUiPreset,
    FetchDbBundle,
    setTool,
    returnFalse,
    checkModeToggle,
    fetchJsons,
    presetNameEqualsTo,
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
    setCustomAvlMachine,
    onMachineProfileChange,
    setMachineProfiles,
  }
}
