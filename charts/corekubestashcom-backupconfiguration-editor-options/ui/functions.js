let namespaces = []
let appKind = []
let coreKind = []
let kubedbKind = []

function init({ watchDependency, model, getValue, storeGet, axios, setDiscriminatorValue }) {
  getNamespacesApi({ axios, storeGet, setDiscriminatorValue })
  getKindsApi({ watchDependency, model, getValue, storeGet, axios })
  setDiscriminatorValue('/nameSpaceApi', true)
}

async function getNamespacesApi({ axios, storeGet, setDiscriminatorValue }) {
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
    namespaces = resp?.data?.status?.namespaces || []
    return namespaces
  } catch (e) {
    console.log(e)
    return []
  }
}

function getNamespaces({ watchDependency }) {
  watchDependency('discriminator#/nameSpaceApi')
  return namespaces
}

async function getNames({ storeGet, getValue, model, axios, watchDependency }, type) {
  watchDependency(`model#/spec/backend/${type}/namespace`)

  const namespace = getValue(model, `/spec/backend/${type}/namespace`)
  const params = storeGet('/route/params')
  const { user, cluster } = params

  let url = `/clusters/${user}/${cluster}/proxy/storage.kubestash.com/v1alpha1/namespaces/${namespace}/retentionpolicies`
  if (type === 'storageRef') {
    url = `/clusters/${user}/${cluster}/proxy/storage.kubestash.com/v1alpha1/namespaces/${namespace}/backupstorages`
  }

  if (namespace) {
    try {
      const resp = await axios.get(url)
      const items = resp.data?.items
      items.forEach((ele) => {
        options.push(ele.metadata?.name)
      })
    } catch (e) {
      console.log(e)
    }
  }
  return []
}

async function getAddon({ storeGet, axios }) {
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

async function getTaskNames({ model, watchDependency, storeGet, getValue, axios }) {
  watchDependency('model#/spec/session/items/addon/name')
  const addon = getValue(model, '/spec/session/items/addon/name')
  const params = storeGet('/route/params')
  const { user, cluster } = params
  let url = `/clusters/${user}/${cluster}/proxy/addons.kubestash.com/v1alpha1/addons/${addon}`
  if (addon) {
    try {
      const resp = await axios.get(url)
    } catch (e) {
      console.log(e)
    }
  }
  return []
}

async function getEncryptionSecretNames({ model, watchDependency, storeGet, getValue, axios }) {
  watchDependency('model#/spec/session/items/encryptionSecret/namespace')
  const namespace = getValue(model, '/spec/session/items//encryptionSecret/namespace')
  const params = storeGet('/route/params')
  const { user, cluster } = params
  let url = `/clusters/${user}/${cluster}/proxy/core/v1/namespaces/${namespace}/secrets`
  if (namespace) {
    try {
      const resp = await axios.get(url)
    } catch (e) {
      console.log(e)
    }
  }
  return []
}

async function getKindsApi({ storeGet, axios }) {
  const params = storeGet('/route/params')
  const { user, cluster } = params
  let url = `/clusters/${user}/${cluster}/available-types?groups=core,apps,kubedb.com`
  try {
    const resp = await axios.get(url)
    appKind = Object.values(resp.data['apps']).flat()
    kubedbKind = Object.values(resp.data['kubedb.com']).flat()
    coreKind = Object.values(resp.data['']).flat()
  } catch (e) {
    console.log(e)
  }
  return []
}

function getKinds({ watchDependency, getValue, model }) {
  watchDependency(`model#/spec/target/apiGroup`)
  const apiGroup = getValue(model, `/spec/target/apiGroup`)

  if (apiGroup === 'core') return coreKind
  else if (apiGroup === 'apps') return appKind
  else return kubedbKind
}

function getApiGroup() {
  return ['core', 'apps', 'kubedb.com']
}

function setApiGroup() {
  return 'kubedb.com'
}

async function getTargetName({ watchDependency, storeGet, getValue, model, axios }) {
  watchDependency(`model#/spec/target/apiGroup`)
  watchDependency(`model#/spec/target/kind`)
  watchDependency(`model#/spec/target/namespace`)
  const apiGroup = getValue(model, `/spec/target/apiGroup`)
  const kind = getValue(model, `/spec/target/kind`)
  const namespace = getValue(model, `/spec/target/namespace`)
  const params = storeGet('/route/params')
  const { user, cluster } = params

  const url = `/clusters/${user}/${cluster}/proxy/meta.k8s.appscode.com/v1alpha1/usermenus/kubedb-accordion/available`
  try {
    const resp = await axios.get(url)
    console.log(resp)
  } catch (e) {
    console.log(e)
  }
}

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

function returnFalse() {
  return false
}

return {
  getTargetName,
  setApiGroup,
  getApiGroup,
  getEncryptionSecretNames,
  getKinds,
  getTaskNames,
  getAddon,
  init,
  getNames,
  returnFalse,
  fetchJsons,
  getNamespaces,
}
