const { store, useOperator } = window.vueHelpers || {}

let namespaces = []
let appKind = []
let coreKind = []
let kubedbKind = []
let availableKinds = {}
let kindToResourceMap = {}
let version = ''

export const useFunc = (model, { akp } = {}) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('nameSpaceApi', false)
  setDiscriminatorValue('existingAuthSecrets', [])
  setDiscriminatorValue('isExistingAuthSecretsFetching', true)
  setDiscriminatorValue('useExistingAuthSecret', true)
  const route = store.state?.route

  async function init() {
    namespaces = await getNamespacesApi()
    await getKindsApi()
    setDiscriminatorValue('/nameSpaceApi', true)
    const group = route.params?.group || ''
    if (group === 'kubedb.com') setAppRef()
  }

  function getKinds() {
    // watchDependency(`model#/spec/appRef/apiGroup`)
    const apiGroup = getValue(model, `/spec/appRef/apiGroup`)

    if (apiGroup === 'core') return coreKind
    else if (apiGroup === 'apps') return appKind
    else return kubedbKind
  }

  function setVersion() {
    let apiGroup = getValue(model, `/spec/appRef/apiGroup`)
    const kind = getValue(model, `/spec/appRef/kind`)
    if (apiGroup === 'core') apiGroup = ''

    Object.keys(availableKinds[apiGroup]).forEach((vs) => {
      availableKinds[apiGroup][vs].forEach((ele) => {
        if (ele.Kind === kind) {
          version = vs
        }
      })
    })
  }

  async function getKindsApi() {
    const params = storeGet('/route/params')
    const { user, cluster } = params
    try {
      const clusters = await akp.client('akp.cluster.v2.ClusterService')
      const { types } = await clusters.listAvailableTypes({
        cluster: { owner: user, name: cluster },
        groups: ['core', 'apps', 'kubedb.com'],
      })

      kindToResourceMap['kubedb.com'] = {}
      kindToResourceMap['apps'] = {}
      kindToResourceMap['core'] = {}

      // Same shape as the AKP v1 API answered: { [group]: { [version]: [{ Kind, Resource }] } }, '' being core.
      availableKinds = {}
      types.forEach(({ group, version, resources }) => {
        availableKinds[group] ??= {}
        availableKinds[group][version] = resources.map((r) => ({
          Kind: r.kind,
          Resource: r.resource,
        }))
      })
      appKind = Object.values(availableKinds['apps'])
        .flat()
        .map((ele) => {
          kindToResourceMap['apps'][ele.Kind] = ele.Resource
          return ele.Kind
        })
      kubedbKind = Object.values(availableKinds['kubedb.com'])
        .flat()
        .map((ele) => {
          kindToResourceMap['kubedb.com'][ele.Kind] = ele.Resource
          return ele.Kind
        })
      coreKind = Object.values(availableKinds[''])
        .flat()
        .map((ele) => {
          kindToResourceMap['core'][ele.Kind] = ele.Resource
          return ele.Kind
        })
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

  function fetchNamespaces() {
    // watchDependency('discriminator#/nameSpaceApi')
    return namespaces
  }

  async function getNamespacesApi() {
    const params = storeGet('/route/params')
    const { user, cluster, group, version, resource } = params
    try {
      const resp = await akp.resources.create({
        owner: user,
        cluster,
        group: 'identity.k8s.appscode.com',
        version: 'v1alpha1',
        resource: 'selfsubjectnamespaceaccessreviews',
        object: {
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
      })
      if (resp?.status?.projects) {
        const projects = resp?.status?.projects
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
        return resp?.status?.namespaces || []
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  async function fetchNames(type) {
    // watchDependency(`model#/spec/${type}/namespace`)
    const user = storeGet('/route/params/user') || ''
    const cluster = storeGet('/route/params/cluster') || ''
    const namespace = getValue(model, `/spec/${type}/namespace`) || ''
    let suffix = type
    if (type === 'encryptionSecret') suffix = 'secrets'
    else if (type === 'repository') suffix = 'repositories'
    else if (type === 'storageRef') suffix = 'backupstorages'
    const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
    const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'

    try {
      if (namespace) {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: core,
          version,
          resource: suffix,
          namespace,
        })
        let names = resp?.items
        names.map((item) => {
          item.value = item?.metadata?.name || ''
          item.text = item?.metadata?.name || ''
          return true
        })

        if (type === 'repository') {
          const resource = storeGet('/resource/layout/result/resource') || {}
          let group = resource?.group || ''
          let kind = resource?.kind || ''

          if (isConsole()) {
            group = getValue(model, '/spec/appRef/apiGroup') || ''
            kind = getValue(model, '/spec/appRef/kind') || ''
          }

          const filteredRepo = names.filter((item) => {
            const appRef = item?.spec?.appRef || {}
            return appRef?.apiGroup === group && appRef?.kind === kind
          })
          return filteredRepo
        }
        return names
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  function isConsole() {
    const urlPrefix = storeGet('/route/params/urlPrefix') || ''
    return urlPrefix.includes('console')
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

  function getApiGroup() {
    return ['core', 'apps', 'kubedb.com']
  }

  async function getTargetName() {
    // watchDependency('model#/spec/appRef/apiGroup')
    // watchDependency('model#/spec/appRef/namespace')
    // watchDependency('model#/spec/appRef/kind')
    const apiGroup = getValue(model, `/spec/appRef/apiGroup`)
    const namespace = getValue(model, `/spec/appRef/namespace`)
    const resource = getResourceName()
    const params = storeGet('/route/params')
    const { user, cluster } = params

    if (apiGroup && version && resource && namespace) {
      try {
        const resp = await akp.resources.list({
          owner: user,
          cluster,
          group: apiGroup,
          version,
          resource,
          namespace,
        })
        const items = resp?.items
        const options = items.map((ele) => {
          return ele.metadata.name
        })
        return options
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }

  function getResourceName() {
    const apiGroup = getValue(model, `/spec/appRef/apiGroup`)
    const kind = getValue(model, `/spec/appRef/kind`)
    if (!kind || !apiGroup) return ''
    return kindToResourceMap[apiGroup][kind]
  }

  function returnFalse() {
    return false
  }

  function onStorageRefNamespaceChange() {
    // Clear the name when namespace changes
    commit('wizard/model$update', {
      path: '/spec/storageRef/name',
      value: '',
      force: true,
    })
  }

  function onEncryptionSecretNamespaceChange() {
    // Clear the name when namespace changes
    commit('wizard/model$update', {
      path: '/spec/encryptionSecret/name',
      value: '',
      force: true,
    })
  }

  function onApiGroupChange() {
    // Clear kind, namespace, and name when apiGroup changes
    commit('wizard/model$update', {
      path: '/spec/appRef/kind',
      value: '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/appRef/namespace',
      value: '',
      force: true,
    })
    commit('wizard/model$update', {
      path: '/spec/appRef/name',
      value: '',
      force: true,
    })
  }

  function onAppRefNamespaceChange() {
    // Clear the name when namespace changes
    commit('wizard/model$update', {
      path: '/spec/appRef/name',
      value: '',
      force: true,
    })
  }

  function setAppRef() {
    const resource = storeGet('/resource/layout/result/resource') || {}
    console.log(resource)

    const kind = resource?.kind || ''
    const namespace = route.query?.namespace || ''
    const name = route.params?.name || ''
    commit('wizard/model$update', {
      path: '/spec/appRef',
      value: {
        apiGroup: 'kubedb.com',
        kind: kind,
        namespace: namespace,
        name: name,
      },
      force: true,
    })
  }

  function isAppRefRequired() {
    const group = route.params?.group || ''
    return group !== 'kubedb.com'
  }

  return {
    isAppRefRequired,
    getKindsApi,
    getNamespacesApi,
    init,
    getCreateNameSpaceUrl,
    isRancherManaged,
    fetchNamespaces,
    fetchNames,
    getApiGroup,
    getTargetName,
    getKinds,
    getResourceName,
    returnFalse,
    setVersion,
    onStorageRefNamespaceChange,
    onEncryptionSecretNamespaceChange,
    onApiGroupChange,
    onAppRefNamespaceChange,
  }
}
