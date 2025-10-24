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

async function getNamespacedResourceList(axios, storeGet, { namespace, group, version, resource }) {
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

/****** Monitoring *********/

function showMonitoringSection() {
  // watchDependency('discriminator#/enableMonitoring')
  const configureStatus = getValue(discriminator, '/enableMonitoring')
  return configureStatus
}

function onEnableMonitoringChange() {
  const configureStatus = getValue(discriminator, '/enableMonitoring')
  if (configureStatus) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMariaDB/spec/monitor',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComMariaDB/spec/monitor')
  }

  // update alert value depend on monitoring profile
  commit('wizard/model$update', {
    path: '/form/alert/enabled',
    value: configureStatus ? 'warning' : 'none',
    force: true,
  })
}

function showCustomizeExporterSection() {
  // watchDependency('discriminator#/customizeExporter')
  const configureStatus = getValue(discriminator, '/customizeExporter')
  return configureStatus
}

function onCustomizeExporterChange() {
  const configureStatus = getValue(discriminator, '/customizeExporter')
  if (configureStatus) {
    commit('wizard/model$update', {
      path: '/resources/kubedbComMariaDB/spec/monitor/prometheus/exporter',
      value: {},
      force: true,
    })
  } else {
    commit('wizard/model$delete', '/resources/kubedbComMariaDB/spec/monitor/prometheus/exporter')
  }
}

function isValueExistInModel(path) {
  const modelValue = getValue(model, path)
  return !!modelValue
}

// function onNamespaceChange() {
//   const namespace = getValue(model, '/metadata/release/namespace')
//   const agent = getValue(model, '/resources/kubedbComMariaDB/spec/monitor/agent')
//   if (agent === 'prometheus.io') {
//     commit('wizard/model$update', {
//       path: '/resources/monitoringCoreosComServiceMonitor/spec/namespaceSelector/matchNames',
//       value: [namespace],
//       force: true,
//     })
//   }
// }

function onLabelChange() {
  const labels = getValue(model, '/resources/kubedbComMariaDB/spec/metadata/labels')

  const agent = getValue(model, '/resources/kubedbComMariaDB/spec/monitor/agent')

  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/selector/matchLabels',
      value: labels,
      force: true,
    })
  }
}

function onAgentChange() {
  const agent = getValue(model, '/resources/kubedbComMariaDB/spec/monitor/agent')
  if (agent === 'prometheus.io') {
    commit('wizard/model$update', {
      path: '/resources/monitoringCoreosComServiceMonitor/spec/endpoints',
      value: [],
      force: true,
    })

    onNamespaceChange()
    onLabelChange()
  } else {
    commit('wizard/model$delete', '/resources/monitoringCoreosComServiceMonitor')
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
    return `${domain}/console/${owner}/kubernetes/${cluster}/ops.kubedb.com/v1alpha1/mariadbopsrequests/create?name=${dbname}&namespace=${namespace}&group=${group}&version=${version}&resource=${resource}&kind=${kind}&page=operations&requestType=VerticalScaling`
}

function onNamespaceChange() {
  const namespace = getValue(model, '/metadata/namespace')
  if (!namespace) {
    commit(
      'wizard/model$delete',
      '/resources/autoscalingKubedbComMariaDBAutoscaler/spec/databaseRef/name',
    )
  }
}

function setValueFrom() {
  if (isConfigMapTypeValueFrom()) {
    return 'configMap'
  } else if (isSecretTypeValueFrom()) {
    return 'secret'
  } else {
    return 'input'
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

function isEqualToValueFromType(value) {
  //watchDependency('discriminator#/valueFromType')
  const valueFrom = getValue(discriminator, '/valueFromType')
  return valueFrom === value
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

async function getConfigMapKeys() {
  const owner = storeGet('/route/params/user')
  const cluster = storeGet('/route/params/cluster')
  // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
  const namespace = getValue(model, '/metadata/release/namespace')
  const configMapName = getValue(
    model,
    '/resources/kubedbComMariaDB/spec/monitor/prometheus/exporter/env/items/valueFrom/configMapKeyRef/name',
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
  // const namespace = getValue(reusableElementCtx, '/dataContext/namespace') // not supported
  const namespace = getValue(model, '/metadata/release/namespace')
  const secretName = getValue(
    model,
    '/resources/kubedbComMariaDB/spec/monitor/prometheus/exporter/env/items/valueFrom/secretKeyRef/name',
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
