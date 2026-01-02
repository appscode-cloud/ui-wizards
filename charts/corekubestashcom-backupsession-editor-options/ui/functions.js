const { ref, computed, axios, watch, useOperator, store } = window.vueHelpers || {}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, commit, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  let invokerData = []

  function initName() {
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

  async function fetchNamespaces() {
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

  async function fetchInvokerName() {
    // watchDependency('model#/spec/invoker/kind')
    // watchDependency('model#/metadata/release/namespace')
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

        const dbKind = storeGet('/resource/layout/result/resource/kind') || ''
        const group = storeGet('/resource/layout/result/resource/group') || ''
        if (group === 'kubedb.com')
          invokerData = invokerData.filter((item) => item.spec?.target?.kind === dbKind)

        const names = invokerData.map((item) => {
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

  function fetchSessions() {
    // watchDependency('model#/spec/invoker/name')
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
}
