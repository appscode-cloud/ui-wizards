// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

//******************************** Common function ******************************/

// timezons
// src https://gist.githubusercontent.com/Skipants/788819/raw/1e17dde9b6eac423723fb0728aea6b292ab6d0db/timezones.yaml

const timeZones = [
  {
    "value": "utc",
    "text": "(GMT) Default"
  },
  {
    "value": "browser",
    "text": "Browser Time"
  },
  {
    "value": "Pacific/Midway",
    "text": "(GMT-11:00) Midway Island, Samoa"
  },
  {
    "value": "America/Adak",
    "text": "(GMT-10:00) Hawaii-Aleutian"
  },
  {
    "value": "Etc/GMT+10",
    "text": "(GMT-10:00) Hawaii"
  },
  {
    "value": "Pacific/Marquesas",
    "text": "(GMT-09:30) Marquesas Islands"
  },
  {
    "value": "Pacific/Gambier",
    "text": "(GMT-09:00) Gambier Islands"
  },
  {
    "value": "America/Anchorage",
    "text": "(GMT-09:00) Alaska"
  },
  {
    "value": "America/Ensenada",
    "text": "(GMT-08:00) Tijuana, Baja California"
  },
  {
    "value": "Etc/GMT+8",
    "text": "(GMT-08:00) Pitcairn Islands"
  },
  {
    "value": "America/Los_Angeles",
    "text": "(GMT-08:00) Pacific Time (US & Canada)"
  },
  {
    "value": "America/Denver",
    "text": "(GMT-07:00) Mountain Time (US & Canada)"
  },
  {
    "value": "America/Chihuahua",
    "text": "(GMT-07:00) Chihuahua, La Paz, Mazatlan"
  },
  {
    "value": "America/Dawson_Creek",
    "text": "(GMT-07:00) Arizona"
  },
  {
    "value": "America/Belize",
    "text": "(GMT-06:00) Saskatchewan, Central America"
  },
  {
    "value": "America/Cancun",
    "text": "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
  },
  {
    "value": "Chile/EasterIsland",
    "text": "(GMT-06:00) Easter Island"
  },
  {
    "value": "America/Chicago",
    "text": "(GMT-06:00) Central Time (US & Canada)"
  },
  {
    "value": "America/New_York",
    "text": "(GMT-05:00) Eastern Time (US & Canada)"
  },
  {
    "value": "America/Havana",
    "text": "(GMT-05:00) Cuba"
  },
  {
    "value": "America/Bogota",
    "text": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
  },
  {
    "value": "America/Caracas",
    "text": "(GMT-04:30) Caracas"
  },
  {
    "value": "America/Santiago",
    "text": "(GMT-04:00) Santiago"
  },
  {
    "value": "America/La_Paz",
    "text": "(GMT-04:00) La Paz"
  },
  {
    "value": "Atlantic/Stanley",
    "text": "(GMT-04:00) Faukland Islands"
  },
  {
    "value": "America/Campo_Grande",
    "text": "(GMT-04:00) Brazil"
  },
  {
    "value": "America/Goose_Bay",
    "text": "(GMT-04:00) Atlantic Time (Goose Bay)"
  },
  {
    "value": "America/Glace_Bay",
    "text": "(GMT-04:00) Atlantic Time (Canada)"
  },
  {
    "value": "America/St_Johns",
    "text": "(GMT-03:30) Newfoundland"
  },
  {
    "value": "America/Araguaina",
    "text": "(GMT-03:00) UTC-3"
  },
  {
    "value": "America/Montevideo",
    "text": "(GMT-03:00) Montevideo"
  },
  {
    "value": "America/Miquelon",
    "text": "(GMT-03:00) Miquelon, St. Pierre"
  },
  {
    "value": "America/Godthab",
    "text": "(GMT-03:00) Greenland"
  },
  {
    "value": "America/Argentina/Buenos_Aires",
    "text": "(GMT-03:00) Buenos Aires"
  },
  {
    "value": "America/Sao_Paulo",
    "text": "(GMT-03:00) Brasilia"
  },
  {
    "value": "America/Noronha",
    "text": "(GMT-02:00) Mid-Atlantic"
  },
  {
    "value": "Atlantic/Cape_Verde",
    "text": "(GMT-01:00) Cape Verde Is."
  },
  {
    "value": "Atlantic/Azores",
    "text": "(GMT-01:00) Azores"
  },
  {
    "value": "Europe/Belfast",
    "text": "(GMT) Greenwich Mean Time Belfast"
  },
  {
    "value": "Europe/Dublin",
    "text": "(GMT) Greenwich Mean Time Dublin"
  },
  {
    "value": "Europe/Lisbon",
    "text": "(GMT) Greenwich Mean Time Lisbon"
  },
  {
    "value": "Europe/London",
    "text": "(GMT) Greenwich Mean Time London"
  },
  {
    "value": "Africa/Abidjan",
    "text": "(GMT) Monrovia, Reykjavik"
  },
  {
    "value": "Europe/Amsterdam",
    "text": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
  },
  {
    "value": "Europe/Belgrade",
    "text": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
  },
  {
    "value": "Europe/Brussels",
    "text": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
  },
  {
    "value": "Africa/Algiers",
    "text": "(GMT+01:00) West Central Africa"
  },
  {
    "value": "Africa/Windhoek",
    "text": "(GMT+01:00) Windhoek"
  },
  {
    "value": "Asia/Beirut",
    "text": "(GMT+02:00) Beirut"
  },
  {
    "value": "Africa/Cairo",
    "text": "(GMT+02:00) Cairo"
  },
  {
    "value": "Asia/Gaza",
    "text": "(GMT+02:00) Gaza"
  },
  {
    "value": "Africa/Blantyre",
    "text": "(GMT+02:00) Harare, Pretoria"
  },
  {
    "value": "Asia/Jerusalem",
    "text": "(GMT+02:00) Jerusalem"
  },
  {
    "value": "Europe/Minsk",
    "text": "(GMT+02:00) Minsk"
  },
  {
    "value": "Asia/Damascus",
    "text": "(GMT+02:00) Syria"
  },
  {
    "value": "Europe/Moscow",
    "text": "(GMT+03:00) Moscow, St. Petersburg, Volgograd"
  },
  {
    "value": "Africa/Addis_Ababa",
    "text": "(GMT+03:00) Nairobi"
  },
  {
    "value": "Asia/Tehran",
    "text": "(GMT+03:30) Tehran"
  },
  {
    "value": "Asia/Dubai",
    "text": "(GMT+04:00) Abu Dhabi, Muscat"
  },
  {
    "value": "Asia/Yerevan",
    "text": "(GMT+04:00) Yerevan"
  },
  {
    "value": "Asia/Kabul",
    "text": "(GMT+04:30) Kabul"
  },
  {
    "value": "Asia/Yekaterinburg",
    "text": "(GMT+05:00) Ekaterinburg"
  },
  {
    "value": "Asia/Tashkent",
    "text": "(GMT+05:00) Tashkent"
  },
  {
    "value": "Asia/Kolkata",
    "text": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"
  },
  {
    "value": "Asia/Katmandu",
    "text": "(GMT+05:45) Kathmandu"
  },
  {
    "value": "Asia/Dhaka",
    "text": "(GMT+06:00) Astana, Dhaka"
  },
  {
    "value": "Asia/Novosibirsk",
    "text": "(GMT+06:00) Novosibirsk"
  },
  {
    "value": "Asia/Rangoon",
    "text": "(GMT+06:30) Yangon (Rangoon)"
  },
  {
    "value": "Asia/Bangkok",
    "text": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
  },
  {
    "value": "Asia/Krasnoyarsk",
    "text": "(GMT+07:00) Krasnoyarsk"
  },
  {
    "value": "Asia/Hong_Kong",
    "text": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
  },
  {
    "value": "Asia/Irkutsk",
    "text": "(GMT+08:00) Irkutsk, Ulaan Bataar"
  },
  {
    "value": "Australia/Perth",
    "text": "(GMT+08:00) Perth"
  },
  {
    "value": "Australia/Eucla",
    "text": "(GMT+08:45) Eucla"
  },
  {
    "value": "Asia/Tokyo",
    "text": "(GMT+09:00) Osaka, Sapporo, Tokyo"
  },
  {
    "value": "Asia/Seoul",
    "text": "(GMT+09:00) Seoul"
  },
  {
    "value": "Asia/Yakutsk",
    "text": "(GMT+09:00) Yakutsk"
  },
  {
    "value": "Australia/Adelaide",
    "text": "(GMT+09:30) Adelaide"
  },
  {
    "value": "Australia/Darwin",
    "text": "(GMT+09:30) Darwin"
  },
  {
    "value": "Australia/Brisbane",
    "text": "(GMT+10:00) Brisbane"
  },
  {
    "value": "Australia/Hobart",
    "text": "(GMT+10:00) Hobart"
  },
  {
    "value": "Asia/Vladivostok",
    "text": "(GMT+10:00) Vladivostok"
  },
  {
    "value": "Australia/Lord_Howe",
    "text": "(GMT+10:30) Lord Howe Island"
  },
  {
    "value": "Etc/GMT-11",
    "text": "(GMT+11:00) Solomon Is., New Caledonia"
  },
  {
    "value": "Asia/Magadan",
    "text": "(GMT+11:00) Magadan"
  },
  {
    "value": "Pacific/Norfolk",
    "text": "(GMT+11:30) Norfolk Island"
  },
  {
    "value": "Asia/Anadyr",
    "text": "(GMT+12:00) Anadyr, Kamchatka"
  },
  {
    "value": "Pacific/Auckland",
    "text": "(GMT+12:00) Auckland, Wellington"
  },
  {
    "value": "Etc/GMT-12",
    "text": "(GMT+12:00) Fiji, Kamchatka, Marshall Is."
  },
  {
    "value": "Pacific/Chatham",
    "text": "(GMT+12:45) Chatham Islands"
  },
  {
    "value": "Pacific/Tongatapu",
    "text": "(GMT+13:00) Nuku'alofa"
  },
  {
    "value": "Pacific/Kiritimati",
    "text": "(GMT+14:00) Kiritimati"
  }
]


async function getResourceList(
  axios,
  storeGet,
  { group, version, resource }
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`;

  let ans = [];
  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    ans = items;
  } catch (e) {
    console.log(e);
  }

  return ans;
}

async function getImagePullSecrets({ axios, storeGet }) {
  let resources = await getResourceList(axios, storeGet, {
    group: "core",
    version: "v1",
    resource: "secrets",
  });

  resources = resources.filter((item) => {
    const validType = ["kubernetes.io/dockerconfigjson"];
    return validType.includes(item.type);
  });

  return resources.map((resource) => {
    const name = resource?.metadata?.name || "";
    return {
      text: name,
      value: name,
    };
  });
}

// get specific feature details
function getFeatureDetails(storeGet, name) {
  const features = storeGet('/cluster/features/result') || []
  const feature = features.find(item => item?.metadata?.name === name)
  return feature
}

// get specific attribute's value of a feature
function getFeaturePropertyValue(storeGet, name, getValue, path) {
  const feature = getFeatureDetails(storeGet, name);
  const value = getValue(feature, path)
  return value
}

function getFeatureTitle({ storeGet, getValue }, name) {
  const title = getFeaturePropertyValue(storeGet, name, getValue, '/spec/title');
  return title
}

function isFeatureDisabled({ storeGet, getValue }, name) {
  const isEnabled = isFeatureEnabled({ storeGet, getValue }, name)
  const isManaged = isFeatureManaged({ storeGet, getValue }, name)

  return (isEnabled && !isManaged)
}

function isFeatureManaged({ storeGet, getValue }, name) {
  const isManaged = getFeaturePropertyValue(storeGet, name, getValue, '/status/managed');
  return !!isManaged
}

function getFeatureDescription({ storeGet, getValue }, name) {
  const description = getFeaturePropertyValue(storeGet, name, getValue, '/spec/description');
  return description
}

function getFeatureNote({ storeGet, getValue }, name) {
  const note = getFeaturePropertyValue(storeGet, name, getValue, '/status/note');
  return note
}

function isFeatureRequired({ storeGet, getValue }, name) {
  const isRequired = getFeaturePropertyValue(storeGet, name, getValue, '/spec/required');
  return isRequired
}

function isFeatureEnabled({ storeGet, getValue }, name) {
  const enabled = getFeaturePropertyValue(storeGet, name, getValue, '/status/enabled');
  return enabled
}

function isEqualToModelPathValue({ model, getValue, watchDependency }, path, value) {
  watchDependency(`model#${path}`)
  const modelValue = getValue(model, path)
  return modelValue === value
}

function onAgentChange({ model, getValue, commit }, feature) {
  const agent = getValue(model, `/resources/${feature}/spec/values/monitoring/agent`)

  if(agent !== 'prometheus.io/operator') {
    commit("wizard/model$delete", `/resources/${feature}/spec/values/monitoring/serviceMonitor`)
  }
}

function onServiceAccountNameChange({model, getValue, commit}, feature) {
  let path = `/resources/${feature}/spec/values/serviceAccount`;
  if(feature === 'helmToolkitFluxcdIoHelmRelease_kube_prometheus_stack') path = `/resources/${feature}/spec/values/alertmanager/serviceAccount`
  
  const serviceAccountName = getValue(model, `${path}/name`)

  // set create value to true if name field is empty otherwise set to false
  commit('wizard/model$update', {
    path: `${path}/create`,
    value: !serviceAccountName,
    force: true
  })
}

function isDiscriminatorValueTrue({ discriminator, watchDependency, getValue }, path) {
  watchDependency(`discriminator#${path}`)
  const value = getValue(discriminator, path)
  return !!value
}

function isModelValueTrue({ model, watchDependency, getValue }, path) {
  watchDependency(`model#${path}`)
  const value = getValue(model, path)
  return !!value
}

function onFeatureStatusChange({ discriminator, getValue, commit, storeGet }, feature, discriminatorPath, featureName) {
  const switchStatus = getValue(discriminator, discriminatorPath)
  if(!switchStatus) {
    commit('wizard/model$delete', `/resources/${feature}`)
  } else {
    const featureSet = storeGet('/route/params/featureset') || ''
    const chart = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/name');
    const targetNamespace = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/namespace');
    const sourceRef = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/sourceRef');
    const version = getFeaturePropertyValue(storeGet, featureName, getValue, '/spec/chart/version');

    commit('wizard/model$update', {
      path: `/resources/${feature}`,
      value: {
        ...resources?.[feature],
        metadata: {
          ...resources?.[feature]?.metadata,
          labels: {
            ...resources?.[feature]?.metadata?.labels,
            'app.kubernetes.io/component': featureName,
            'app.kubernetes.io/part-of': featureSet,
          },
        },
        spec: {
          ...resources?.[feature]?.spec,
          chart: {
            spec: {
              chart,
              sourceRef,
              version,
            }
          },
          targetNamespace
        }
      },
      force: true
    })
  }
}


let resources = {}

function returnFalse() {
  return false;
}

function setReleaseNameAndNamespace({ commit, storeGet, model, getValue }) {
  resources = getValue(model, '/resources')
  const featureSet = storeGet('/route/params/featureset')
  commit('wizard/model$update', {
    path: '/metadata/release',
    value: {
      name: featureSet,
      namespace: 'kubeops'
    },
    force: true
  })
}

/*********************************** Kube grafana dashboard **********************/

const dashboards = [
  'coreDns',
  'kubeEtcd',
  'kubeApiServer',
  'kubeControllerManager',
  'kubelet',
  'kubeProxy',
  'kubeScheduler',
  'nodeExporter',
  'prometheus,'
]

function setSelectedDashboard({ model, getValue }) {
  const selectedDashboards =  dashboards.filter((item) => {
    const { remoteWriteDashboards, enabled } = getValue(model, `/resources/helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards/spec/values/${item}`) || {}
    return (remoteWriteDashboards || enabled)
  })

  return selectedDashboards || []
}

function onSelectedDashboardChange({ discriminator, getValue, commit }) {
  const selectedDashboards = getValue(discriminator, '/selectedDashboards') || []

  dashboards.forEach(item => {
    const path = item === 'prometheus' 
      ? `/resources/helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards/spec/values/${item}/remoteWriteDashboards`
      : `/resources/helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards/spec/values/${item}/enabled`

    const value = selectedDashboards.includes(item)
    commit('wizard/model$update', { path, value, force: true })
  })
}

async function getListApiCall(axios, url, params) {
  try {
    const resp = await axios.get(url, params);
    const items = resp?.data?.items || [];
    return items;
  } catch (e) {
    console.log(e);
  }
  return [];
}

async function getNamespacedResources({ storeGet, axios, model, getValue, watchDependency }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  watchDependency('model#/resources/helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards/spec/values/grafana/namespace')
  const namespace = getValue(model, '/resources/helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards/spec/values/grafana/namespace')

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`;
  const params = {
    filter: { items: { metadata: { name: null }, type: null } },
  }

  if(owner && cluster && namespace) {
    const resources = await getListApiCall(axios, url, params)

    return resources.map((resource) => {
      const name = resource?.metadata?.name || "";
      return {
        text: name,
        value: name,
      };
    });
  }
  return []
}

async function getResources({ storeGet, axios }, group, version, resource) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`;
  const params = {
    filter: { items: { metadata: { name: null }, type: null } },
  }

  if(owner && cluster) {
    const resources = await getListApiCall(axios, url, params)

    return resources.map((resource) => {
      const name = resource?.metadata?.name || "";
      return {
        text: name,
        value: name,
      };
    });
  }
  return []
}

function getTimeZones() {
  return timeZones
}

/********************************** Kube prometheus stack */

function setStorageSpec({ commit }) {
  commit('wizard/model$update', {
    path: '/resources/helmToolkitFluxcdIoHelmRelease_kube_prometheus_stack/spec/values/prometheusSpec/storageSpec',
    value: {
      volumeClaimTemplate: {
        spec: {
          storageClassName: '',
          accessModes: ["ReadWriteOnce"],
          resources: {
            requests: {
              storage: '50Gi'
            }
          }
        },
        selector: {}
      }
    },
    force: true
  })
}

async function getStorageClassNames({ axios, storeGet, commit }, path) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/storage.k8s.io/v1/storageclasses`,
    {
      params: {
        filter: { items: { metadata: { name: null, annotations: null } } },
      },
    }
  );

  const resources = (resp && resp.data && resp.data.items) || [];

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || "";
    const isDefault =
      item.metadata &&
      item.metadata.annotations &&
      item.metadata.annotations["storageclass.kubernetes.io/is-default-class"];

    if (isDefault) {
      commit("wizard/model$update", {
        path: path,
        value: name,
        force: true,
      });
    }

    item.text = name;
    item.value = name;
    return true;
  });
  return resources;
}


return {
  getFeatureTitle,
  isFeatureManaged,
  isFeatureDisabled,
  getFeatureNote,
  getFeatureDescription,
  isFeatureEnabled,
  getImagePullSecrets,
  isEqualToModelPathValue,
  onAgentChange,
  onServiceAccountNameChange,
  isDiscriminatorValueTrue,
  isModelValueTrue,
  onFeatureStatusChange,
  setSelectedDashboard,
  onSelectedDashboardChange,
  getResources,
  getNamespacedResources,
  getTimeZones,
  setStorageSpec,
  getStorageClassNames,
  setReleaseNameAndNamespace,
  returnFalse
};
