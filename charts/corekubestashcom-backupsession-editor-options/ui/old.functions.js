let invokerData = []

function initName({ model, getValue, commit }) {
  const invoker = getValue(model, '/spec/invoker/name') || ''
  const session = getValue(model, '/spec/session') || ''
  let name = ''
  if (invoker && session) name = `${invoker}-${session}-${Date.now()}`
  else name = ''
  commit('wizard/model$update', {
    path: '/metadata/release/name',
    value: name,
    force: true,
  })

  const found = invokerData.find((item) => item.metadata.name === invoker)
  const uid = found ? found.metadata?.uid : ''
  commit('wizard/model$update', {
    path: '/spec/ownerUID',
    value: uid,
    force: true,
  })
}

async function fetchNamespaces({ axios, storeGet }) {
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

function isRancherManaged({ storeGet }) {
  const managers = storeGet('/cluster/clusterDefinition/result/clusterManagers')
  const found = managers.find((item) => item === 'Rancher')
  return !!found
}

async function fetchInvokerName({ getValue, model, watchDependency, axios, storeGet }) {
  watchDependency('model#/spec/invoker/kind')
  watchDependency('model#/metadata/release/namespace')
  const namespace = getValue(model, '/metadata/release/namespace') || ''
  const kind = getValue(model, '/spec/invoker/kind') || ''
  const user = storeGet('/route/params/user') || ''
  const cluster = storeGet('/route/params/cluster') || ''
  const core = 'core.kubestash.com'
  const version = 'v1alpha1'
  const suffix = kind === 'BackupConfiguration' ? 'backupconfigurations' : 'backupblueprints'
  try {
    if (namespace && kind) {
      const url = `/clusters/${user}/${cluster}/proxy/${core}/${version}/namespaces/${namespace}/${suffix}`
      const resp = await axios.get(url)
      invokerData = resp.data.items
      const names = resp.data.items.map((item) => {
        const name = item.metadata?.name
        return name
      })
      return names
    }
  } catch (e) {
    console.log(e)
  }
  return []
}

function fetchSessions({ getValue, model, watchDependency }) {
  watchDependency('model#/spec/invoker/name')
  const invokerName = getValue(model, '/spec/invoker/name') || ''
  const found = invokerData.find((item) => item.metadata.name === invokerName)
  if (found) return found.spec?.sessions.map((item) => item.name)
  return []
}

return {
  isRancherManaged,
  initName,
  fetchNamespaces,
  fetchInvokerName,
  fetchSessions,
}
