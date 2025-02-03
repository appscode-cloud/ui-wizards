let namespaces = []
let appKind = []
let coreKind = []
let kubedbKind = []
let availableKinds = {}
let kindToResourceMap = {}
let version = ''

function init({ watchDependency, model, getValue, storeGet, axios, setDiscriminatorValue }) {
  namespaces = getNamespacesApi({ axios, storeGet })
  getKindsApi({ watchDependency, model, getValue, storeGet, axios })
  setDiscriminatorValue('/nameSpaceApi', true)
}

function getKinds({ watchDependency, getValue, model }) {
  watchDependency(`model#/spec/appRef/apiGroup`)
  const apiGroup = getValue(model, `/spec/appRef/apiGroup`)
  console.log(apiGroup)

  if (apiGroup === 'core') return coreKind
  else if (apiGroup === 'apps') return appKind
  else return kubedbKind
}

function setVersion({ getValue, model }) {
  let apiGroup = getValue(model, `/spec/appRef/apiGroup`)
  const kind = getValue(model, `/spec/appRef/kind`)
  if (apiGroup === 'core') apiGroup = ''
  console.log(availableKinds)

  Object.keys(availableKinds[apiGroup]).forEach((vs) => {
    availableKinds[apiGroup][vs].forEach((ele) => {
      if (ele.Kind === kind) {
        version = vs
      }
    })
  })
}

async function getKindsApi({ storeGet, axios }) {
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

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

function fetchNamespaces({ watchDependency }) {
  watchDependency('discriminator#/nameSpaceApi')
  console.log(namespaces)

  return namespaces
}
async function getNamespacesApi({ axios, storeGet }) {
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

async function fetchNames({ getValue, model, storeGet, watchDependency, axios }, type) {
  watchDependency(`model#/spec/${type}/namespace`) || ''
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const namespace = getValue(model, `/spec/${type}/namespace`) || ''
  let suffix = type
  if (type === 'encryptionSecret') suffix = 'secrets'
  else if (type === 'repository') suffix = 'repositories'
  else if (type === 'storageRef') suffix = 'backupstorages'
  const core = suffix === 'secrets' ? 'core' : 'storage.kubestash.com'
  const version = suffix === 'secrets' ? 'v1' : 'v1alpha1'
  const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`

  try {
    if (namespace) {
      const resp = await axios.get(url)
      let names = resp?.data?.items
      names.map((item) => {
        item.value = item?.metadata?.name || ''
        item.text = item?.metadata?.name || ''
        return true
      })

      if (type === 'repository') {
        const resource = storeGet('/resource/layout/result/resource') || {}
        let group = resource?.group || ''
        let kind = resource?.kind || ''

        if (isConsole({ storeGet })) {
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

function getCreateNameSpaceUrl({ model, getValue, storeGet }) {
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

async function getTargetName({ watchDependency, getValue, model, axios, storeGet }) {
  watchDependency('model#/spec/appRef/apiGroup')
  watchDependency('model#/spec/appRef/namespace')
  watchDependency('model#/spec/appRef/kind')
  const apiGroup = getValue(model, `/spec/appRef/apiGroup`)
  const namespace = getValue(model, `/spec/appRef/namespace`)
  const resource = getResourceName({ getValue, model })
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

function getResourceName({ getValue, model }) {
  const apiGroup = getValue(model, `/spec/appRef/apiGroup`)
  const kind = getValue(model, `/spec/appRef/kind`)
  return kindToResourceMap[apiGroup][kind]
}

function returnFalse() {
  return false
}

return {
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
}
