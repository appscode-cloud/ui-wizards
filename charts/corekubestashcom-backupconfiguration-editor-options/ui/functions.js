const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

let namespaces = []
let appKind = []
let coreKind = []
let kubedbKind = []
let availableKinds = {}
let kindToResourceMap = {}
let version = ''

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  setDiscriminatorValue('/nameSpaceApi', false)

  async function initBundle() {
    namespaces = await getNamespacesApi()
    await getKindsApi()
    setDiscriminatorValue('/nameSpaceApi', true)
  }

  async function getNamespacesApi() {
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

  function getNamespaces() {
    // watchDependency('discriminator#/nameSpaceApi')
    return namespaces
  }

  async function getAddon() {
    const params = storeGet('/route/params')

    const { user, cluster } = params
    let url = `/clusters/${user}/${cluster}/proxy/addons.kubestash.com/v1alpha1/addons`
    try {
      const resp = await axios.get(url)
      let addons = []
      resp.data?.items.forEach((item) => {
        addons.push(item.metadata.name)
      })
      return addons
    } catch (e) {
      console.log(e)
    }
    return []
  }

  async function getTaskNames(index) {
    // watchDependency('temporaryModel#/session/addon/name')
    const session = getValue(model, `/spec/sessions`)
    const addon = session[index]?.addons?.name

    const params = storeGet('/route/params')
    const { user, cluster } = params
    let url = `/clusters/${user}/${cluster}/proxy/addons.kubestash.com/v1alpha1/addons/${addon}`
    if (addon) {
      try {
        const resp = await axios.get(url)

        const backupTasks = resp?.data?.spec?.backupTasks?.map((task) => task.name) || []
        return backupTasks
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }

  function clearTasks() {
    commit('wizard/temporaryModel$update', {
      path: '/session/addon/tasks',
      value: [],
      force: true,
    })
  }

  async function getEncryptionSecretNames() {
    // watchDependency('temporaryModel#/session/encryptionSecret/namespace')
    const namespace = storeGet('/wizard/temporaryModel/session/encryptionSecret/namespace')
    const params = storeGet('/route/params')
    const { user, cluster } = params
    let url = `/clusters/${user}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`
    if (namespace) {
      try {
        const resp = await axios.get(url)
        const name = resp?.data?.items?.map((item) => item.metadata?.name) || []
        return name
      } catch (e) {
        console.log(e)
      }
    }
    return []
  }

  async function getKindsApi() {
    const params = storeGet('/route/params')
    const { user, cluster } = params
    let url = `/clusters/${user}/${cluster}/available-types?groups=core,apps,kubedb.com`
    try {
      const resp = await axios.get(url)

      kindToResourceMap['kubedb.com'] = {}
      kindToResourceMap['apps'] = {}
      kindToResourceMap['core'] = {}

      availableKinds = resp.data
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

  function getKinds() {
    // watchDependency(`model#/spec/target/apiGroup`)
    const apiGroup = getValue(model, `/spec/target/apiGroup`)

    if (apiGroup === 'core') return coreKind
    else if (apiGroup === 'apps') return appKind
    else return kubedbKind
  }

  function setVersion() {
    let apiGroup = getValue(model, `/spec/target/apiGroup`)
    const kind = getValue(model, `/spec/target/kind`)
    if (apiGroup === 'core') apiGroup = ''
    Object.keys(availableKinds[apiGroup]).forEach((vs) => {
      availableKinds[apiGroup][vs].forEach((ele) => {
        if (ele.Kind === kind) {
          version = vs
        }
      })
    })
  }

  function getApiGroup() {
    return ['core', 'apps', 'kubedb.com']
  }

  async function getTargetName() {
    // watchDependency('model#/spec/target/apiGroup')
    // watchDependency('model#/spec/target/namespace')
    // watchDependency('model#/spec/target/kind')
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const namespace = getValue(model, `/spec/target/namespace`)
    const resource = getResourceName()
    const params = storeGet('/route/params')
    const { user, cluster } = params

    const url = `/clusters/${user}/${cluster}/proxy/${apiGroup}/${version}/namespaces/${namespace}/${resource}`
    if (apiGroup && version && resource && namespace) {
      try {
        const resp = await axios.get(url)
        const items = resp.data?.items
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
    const apiGroup = getValue(model, `/spec/target/apiGroup`)
    const kind = getValue(model, `/spec/target/kind`)
    if (!kind || !apiGroup) return ''
    return kindToResourceMap[apiGroup][kind]
  }

  async function fetchJsons() {
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

  async function getData(ctx, type) {
    const user = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')
    let url = `/clusters/${user}/${cluster}/proxy/storage.kubestash.com/v1alpha1/${
      type === 'retentionPolicy' ? 'retentionpolicies' : 'backupstorages'
    }`
    try {
      const data = await axios.get(url)
      const items = data.data?.items || []
      const options = items.map((item) => {
        return {
          text: `${item.metadata.namespace}/${item.metadata.name}`,
          value: { name: item.metadata.name, namespace: item.metadata.namespace },
        }
      })
      return options || []
    } catch (e) {
      console.log(e)
      return []
    }
  }

  function showTarget() {
    const params = storeGet('/route/params') || {}
    const { group, name } = params
    const namespace = storeGet('/route/query/namespace') || ''
    const kind = storeGet('/resource/layout/result/resource/kind') || ''

    if (group === 'kubedb.com') {
      const target = {
        apiGroup: 'kubedb.com',
        kind: kind,
        namespace: namespace,
        name: name,
      }
      commit('wizard/model$update', {
        path: '/spec/target',
        value: target,
        force: true,
      })
    }
    return group !== 'kubedb.com'
  }

  function returnFalse() {
    return false
  }

  return {
    clearTasks,
    fetchJsons,
    getAddon,
    getApiGroup,
    getData,
    getEncryptionSecretNames,
    getKinds,
    getNamespaces,
    getTargetName,
    getTaskNames,
    initBundle,
    isRancherManaged,
    returnFalse,
    setVersion,
    showTarget,
  }
}
