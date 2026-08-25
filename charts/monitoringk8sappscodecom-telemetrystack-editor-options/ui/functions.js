const { axios, useOperator, store } = window.vueHelpers || {}

const certificateMountDir = '/etc/thanos/certs'
const additionalConfigPath = '/spec/metrics/thanos/ruler/additionalConfig'

export const useFunc = (model) => {
  const { getValue, setDiscriminatorValue, storeGet, discriminator, commit } = useOperator(
    model,
    store.state,
  )

  // the sidebar writes the active page here, keep the first page selected on load
  setDiscriminatorValue('/telemetryPage', 'basic-info')

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

  // additionalVolumes is real, schema-bound (values.openapiv3_schema.yaml keeps it array-shaped;
  // we do not touch the schema). Master only ever configures one, so every field here writes
  // straight to index 0 - the array stays exactly 0-or-1 elements without ever offering an Add
  // button. Because it's schema-bound directly, it needs no sync step of its own: each input
  // commits into the real model on its own, the same as any other plain field.
  const additionalVolumesPath = `${additionalConfigPath}/additionalVolumes/0`

  function isVolumeType(type) {
    return getValue(model, `${additionalVolumesPath}/volumeType`) === type
  }

  function volumeMode() {
    return getValue(model, `${additionalVolumesPath}/volumeType`) ? 420 : ''
  }

  // additionalVolumeMounts stays a scratch `temp` field (values.openapiv3_schema.yaml has no
  // per-item way to derive one array's values from another, so name/mountPath are computed here
  // and pushed into the mount's own disabled inputs - one-way, additionalVolumes -> mounts only).
  function volumeName() {
    console.log('volumeName', getValue(model, `${additionalVolumesPath}/name`))
    return getValue(model, `${additionalVolumesPath}/name`) || ''
  }

  function volumeMountPath() {
    const path = getValue(model, `${additionalVolumesPath}/path`)
    console.log('volumeMountPath', path, certificateMountDir)
    return path ? `${certificateMountDir}/${path}` : ''
  }

  // Mirror the scratch additionalVolumeMount into the real additionalConfig.additionalVolumeMounts
  // array (name/mountPath/readOnly, exactly what values.openapiv3_schema.yaml declares).
  // additionalVolumes needs no mirroring anymore - its fields already write the real schema path
  // directly via their own native input binding.
  function syncAdditionalConfig() {
    const mount = getValue(discriminator, '/additionalVolumeMount') || {}
    const mountsPath = `${additionalConfigPath}/additionalVolumeMounts`

    if (mount.name || mount.mountPath) {
      commit('wizard/model$update', {
        path: mountsPath,
        value: [
          {
            name: mount.name || '',
            mountPath: mount.mountPath || '',
            readOnly: mount.readOnly !== undefined ? mount.readOnly : true,
          },
        ],
        force: true,
      })
    } else {
      commit('wizard/model$delete', mountsPath)
    }
  }

  function setS3(path, values) {
    Object.entries(values).forEach(([key, value]) => {
      const current = getValue(model, `${path}/${key}`)
      if (current === value) return
      if (value === undefined) commit('wizard/model$delete', `${path}/${key}`)
      else commit('wizard/model$update', { path: `${path}/${key}`, value, force: true })
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

  // one S3 backend feeds both pillars, each one gets its own prefix inside the bucket. Also the
  // single form-wide watcher entry point (see the sidebar-layout's `watcher` in create-ui.yaml),
  // so it drives the additionalConfig sync too - both react to the same "something changed" tick.
  function syncS3() {
    syncAdditionalConfig()

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

  // ---------------------------------------------------------------------------
  // Validation. Ported from cluster-ui master's CreateTelemetryStackView.vue so
  // the wizard rejects exactly what the master form rejects. Each validator
  // returns an error message, or false when the value is acceptable.
  // ---------------------------------------------------------------------------

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

  // A custom validator on a field never sees its own row index, so the rules that
  // compare two columns of the same row live on the array element, which is handed
  // the whole list.
  function validateRetentionConfig(rows) {
    const list = Array.isArray(rows) ? rows : []
    for (let i = 0; i < list.length; i++) {
      const row = list[i] || {}
      const at = list.length > 1 ? ` in row ${i + 1}` : ''

      const raw = validateRawRetention(row.raw)
      if (raw) return `Raw retention${at}: ${raw}`

      const five = validateFiveMinutesRetention(row.fiveMinutes)
      if (five) return `5m retention${at}: ${five}`

      const hour = validateRetention(row.oneHour)
      if (hour) return `1h retention${at}: ${hour}`

      if (row.oneHour && row.fiveMinutes && !validateRetention(row.fiveMinutes)) {
        if (durationToSeconds(row.oneHour) <= durationToSeconds(row.fiveMinutes)) {
          return `1h retention${at} must be greater than 5m retention`
        }
      }
    }
    return false
  }

  // master: a certificate ref needs both halves or neither.
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
    validateRawRetention,
    validateReplicationFactor,
    validateRetention,
    validateRetentionConfig,
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
