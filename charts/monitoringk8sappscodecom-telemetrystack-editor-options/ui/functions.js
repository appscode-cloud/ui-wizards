const { axios, useOperator, store } = window.vueHelpers || {}

const pillarNames = {
  logs: 'Logs',
  traces: 'Traces',
}

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, storeGet, discriminator } = useOperator(
    model,
    store.state,
  )

  // the sidebar writes the active page here, keep the first page selected on load
  setDiscriminatorValue('/telemetryPage', 'logs-clickhouse')

  function isActivePage(page) {
    return getValue(discriminator, '/telemetryPage') === page
  }

  function isPillarEnabled(pillar) {
    return !!getValue(model, `/spec/${pillar}/enabled`)
  }

  function pillarStatus(pillar) {
    const name = pillarNames[pillar] || pillar
    return isPillarEnabled(pillar)
      ? `ClickHouse is collecting ${name.toLowerCase()}. Turn it off to remove the backend from this stack.`
      : `ClickHouse is not collecting ${name.toLowerCase()}. Turn it on to configure the backend.`
  }

  function isClusterTopology(pillar) {
    return (
      isPillarEnabled(pillar) &&
      getValue(model, `/spec/${pillar}/deploymentMode`) === 'ClusterTopology'
    )
  }

  async function getStorageClasses() {
    const owner = storeGet('/route/params/user')
    const cluster = storeGet('/route/params/cluster')

    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
        { params: { filter: { items: { metadata: { name: null } } } } },
      )
      const items = (resp && resp.data && resp.data.items) || []
      return items.map((item) => item?.metadata?.name).filter(Boolean)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  return {
    getStorageClasses,
    isActivePage,
    isClusterTopology,
    isPillarEnabled,
    pillarStatus,
  }
}
