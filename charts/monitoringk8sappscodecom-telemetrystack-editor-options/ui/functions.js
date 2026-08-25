const { axios, useOperator, store } = window.vueHelpers || {}

const certificateMountDir = '/etc/thanos/certs'
const additionalConfigPath = '/spec/metrics/thanos/ruler/additionalConfig'
const retentionConfigPath = '/spec/metrics/thanos/compact/retentionConfig'
const externalLabelsPath = '/spec/metrics/thanos/receive/routerSpec/externalLabels'

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, storeGet, discriminator, commit } = useOperator(
    model,
    store.state,
  )

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

  const additionalVolumesPath = `${additionalConfigPath}/additionalVolumes/0`

  function isVolumeType(type) {
    return getValue(model, `${additionalVolumesPath}/volumeType`) === type
  }

  function volumeMode() {
    return getValue(model, `${additionalVolumesPath}/volumeType`) ? 420 : ''
  }

  function volumeName() {
    console.log('volumeName', getValue(model, `${additionalVolumesPath}/name`))
    return getValue(model, `${additionalVolumesPath}/name`) || ''
  }

  function volumeMountPath() {
    const path = getValue(model, `${additionalVolumesPath}/path`)
    console.log('volumeMountPath', path, certificateMountDir)
    return path ? `${certificateMountDir}/${path}` : ''
  }

  function syncAdditionalConfig() {
    const mount = getValue(discriminator, '/additionalVolumeMount') || {}
    const mountsPath = `${additionalConfigPath}/additionalVolumeMounts`
    const current = getValue(model, mountsPath)

    if (mount.name || mount.mountPath) {
      const next = [
        {
          name: mount.name || '',
          mountPath: mount.mountPath || '',
          readOnly: mount.readOnly !== undefined ? mount.readOnly : true,
        },
      ]
      if (JSON.stringify(current) === JSON.stringify(next)) return
      commit('wizard/model$update', { path: mountsPath, value: next, force: true })
    } else if (current !== undefined) {
      commit('wizard/model$delete', mountsPath)
    }
  }

  function syncExternalLabels() {
    const extra = getValue(discriminator, '/externalLabelsExtra') || {}
    const next = { ...extra, receive: 'true' }
    const current = getValue(model, externalLabelsPath)
    if (JSON.stringify(current) === JSON.stringify(next)) return
    commit('wizard/model$update', { path: externalLabelsPath, value: next, force: true })
  }

  function setS3(path, values) {
    Object.entries(values).forEach(([key, value]) => {
      const current = getValue(model, `${path}/${key}`)
      if (current === value) return
      if (value === undefined) commit('wizard/model$delete', `${path}/${key}`)
      else commit('wizard/model$update', { path: `${path}/${key}`, value, force: true })
    })
  }

  function s3Field(field) {
    const value = getValue(model, `/spec/logs/s3/${field}`)
    return value === undefined || value === null ? '' : value
  }

  function syncS3() {
    syncAdditionalConfig()
    syncExternalLabels()

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

  syncExternalLabels()

  const DURATION_RE = /^([1-9]\d*y)?([1-9]\d*w)?([1-9]\d*d)?([1-9]\d*h)?([1-9]\d*m)?([1-9]\d*s)?$/
  const STORAGE_RE = /^\d+(Ki|Mi|Gi|Ti|Pi|Ei|k|m|g|t|p|e|K|M|G|T|P|E)?$/

  function validateRetention(value) {
    if (!value) return false
    return DURATION_RE.test(value) ? false : 'e.g. 10d, 1h30m, 2d12h'
  }

  function validateStorageSize(value) {
    if (!value) return false
    return STORAGE_RE.test(value) ? false : 'e.g. 1Gi, 512Mi, 1Ki'
  }

  function validateReplicationFactor(value) {
    if (!value) return false
    return [1, 3, 5].includes(Number(value)) ? false : 'Must be 1, 3, or 5'
  }

  function durationToSeconds(value) {
    const units = { y: 365 * 24 * 3600, w: 7 * 24 * 3600, d: 24 * 3600, h: 3600, m: 60, s: 1 }
    let seconds = 0
    let match
    const regex = /([1-9]\d*)(y|w|d|h|m|s)/g
    while ((match = regex.exec(value || '')) !== null) {
      seconds += parseInt(match[1], 10) * units[match[2]]
    }
    return seconds
  }

  function validateRawRetention(value) {
    const format = validateRetention(value)
    if (format || !value) return format
    return durationToSeconds(value) < 40 * 3600 ? 'Must be at least 40h' : false
  }

  function validateFiveMinutesRetention(value) {
    const format = validateRetention(value)
    if (format || !value) return format
    return durationToSeconds(value) < 10 * 24 * 3600 ? 'Must be at least 10d' : false
  }

  function validateOneHourRetention(value, items) {
    const format = validateRetention(value)
    if (format || !value) return format

    const fiveMinutes = getValue(model, `${retentionConfigPath}/${items ?? '0'}/fiveMinutes`)
    if (fiveMinutes && !validateRetention(fiveMinutes)) {
      if (durationToSeconds(value) <= durationToSeconds(fiveMinutes)) {
        return 'Must be greater than 5m retention'
      }
    }
    return false
  }

  function validateClientCaCertificates(rows) {
    const list = Array.isArray(rows) ? rows : []
    for (let i = 0; i < list.length; i++) {
      const { name, key } = list[i] || {}
      const at = list.length > 1 ? ` in row ${i + 1}` : ''
      if (key && !name) return `Secret name is required${at}`
      if (name && !key) return `Key is required${at}`
    }
    return false
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
    validateClientCaCertificates,
    validateFiveMinutesRetention,
    validateOneHourRetention,
    validateRawRetention,
    validateReplicationFactor,
    validateRetention,
    validateStorageSize,
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
