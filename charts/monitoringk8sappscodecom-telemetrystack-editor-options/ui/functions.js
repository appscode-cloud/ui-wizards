const { axios, useOperator, store } = window.vueHelpers || {}

const certificateMountDir = '/etc/thanos/certs'
const additionalConfigPath = '/spec/metrics/thanos/ruler/additionalConfig'

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, storeGet, discriminator, commit } = useOperator(
    model,
    store.state,
  )

  // the sidebar writes the active page here, keep the first page selected on load
  setDiscriminatorValue('/telemetryPage', 'metrics-thanos-compact')

  function isActivePage(page) {
    return getValue(discriminator, '/telemetryPage') === page
  }

  function isPillarEnabled(pillar) {
    return !!getValue(model, `/spec/${pillar}/enabled`)
  }

  function pillarStatus(pillar) {
    return isPillarEnabled(pillar)
      ? `ClickHouse is collecting ${pillar}. Turn it off to remove the backend from this stack.`
      : `ClickHouse is not collecting ${pillar}. Turn it on to configure the backend.`
  }

  function isClusterTopology(pillar) {
    return (
      isPillarEnabled(pillar) &&
      getValue(model, `/spec/${pillar}/deploymentMode`) === 'ClusterTopology'
    )
  }

  function isVolumeType(type, index) {
    return getValue(model, `${additionalConfigPath}/additionalVolumes/${index}/volumeType`) === type
  }

  function volumeMode(index) {
    return getValue(model, `${additionalConfigPath}/additionalVolumes/${index}/volumeType`)
      ? 420
      : ''
  }

  // volume mounts are derived from the volume sitting at the same index
  function volumeName(index) {
    return getValue(model, `${additionalConfigPath}/additionalVolumes/${index}/name`) || ''
  }

  function volumeMountPath(index) {
    const path = getValue(model, `${additionalConfigPath}/additionalVolumes/${index}/path`)
    return path ? `${certificateMountDir}/${path}` : ''
  }

  function setS3(path, values) {
    Object.entries(values).forEach(([key, value]) => {
      const current = getValue(model, `${path}/${key}`)
      if (current === value) return
      if (value === undefined) commit('/model$delete', `${path}/${key}`)
      else commit('/model$update', { path: `${path}/${key}`, value })
    })
  }

  // The same S3 config is rendered twice - inside the ClickHouse page and on the Thanos
  // S3 page - and an input keeps its own copy of the value once it is mounted. Both
  // copies watch the shared path and read it back through this, so editing either one
  // updates the other.
  function s3Field(field) {
    const value = getValue(model, `/spec/logs/s3/${field}`)
    return value === undefined || value === null ? '' : value
  }

  // one S3 backend feeds both pillars, each one gets its own prefix inside the bucket
  function syncS3() {
    const s3 = getValue(model, '/spec/logs/s3') || {}
    const mounts = getValue(model, `${additionalConfigPath}/additionalVolumeMounts`) || []
    const caFile = mounts.find((mount) => mount?.mountPath)?.mountPath

    setS3('/spec/logs/s3', { prefix: 'logs', caFile })
    setS3('/spec/metrics/thanos/s3', {
      bucket: s3.bucket,
      endpoint: (s3.endpoint || '').replace(/^https?:\/\//, ''),
      region: s3.region,
      accessKey: s3.accessKey,
      secretKey: s3.secretKey,
      prefix: 'metrics',
      caFile,
    })
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
    isVolumeType,
    pillarStatus,
    s3Field,
    syncS3,
    volumeMode,
    volumeMountPath,
    volumeName,
  }
}
