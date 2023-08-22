// *************************      common functions ********************************************
// eslint-disable-next-line no-empty-pattern

// get specific feature details
function getFeatureSetDetails(storeGet) {
  const featureSets = storeGet("/cluster/featureSets/result") || [];
  const featureSetName = storeGet("/route/params/featureset") || "";
  const featureSet = featureSets.find(
    (item) => item?.metadata?.name === featureSetName
  );
  return featureSet;
}

// get specific attribute's value of a feature
function getFeatureSetPropertyValue(storeGet, getValue, path) {
  const featureSet = getFeatureSetDetails(storeGet);
  const value = getValue(featureSet, path);
  return value;
}

function getFeatureSetDescription({ storeGet, getValue }) {
  const description = getFeatureSetPropertyValue(
    storeGet,
    getValue,
    "/spec/description"
  );
  return description;
}

// get specific feature details
function getFeatureDetails(storeGet, name) {
  const features = storeGet("/cluster/features/result") || [];
  const feature = features.find((item) => item?.metadata?.name === name);
  return feature;
}

// get specific attribute's value of a feature
function getFeaturePropertyValue(storeGet, name, getValue, path) {
  const feature = getFeatureDetails(storeGet, name);
  const value = getValue(feature, path);
  return value;
}

function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  path,
  value
) {
  watchDependency(`model#${path}`);

  const modelValue = getValue(model, path);
  return modelValue === value;
}

function isEqualToDiscriminatorPathValue(
  { discriminator, getValue, watchDependency },
  path,
  value
) {
  watchDependency(`discriminator#${path}`);

  const discriminatorValue = getValue(discriminator, path);
  return discriminatorValue === value;
}

function getEnabledFeatures({ storeGet }) {
  const allFeatures = storeGet('/cluster/features/result') || []
  const featureSet = storeGet('/route/params/featureset') || []
  const featureBlock = storeGet('/route/query/activeBlock') || ''

  const enabledFeatures = allFeatures.filter(item => {
    return (item?.status?.enabled || item?.spec?.required || item?.spec?.featureBlock === featureBlock) && item?.spec?.featureSet === featureSet
  })

  const enabledFeatureNames = enabledFeatures.map(item => item?.metadata?.name)

  return enabledFeatureNames
}

function disableFeatures({ storeGet, itemCtx }) {
  const featureName = itemCtx.value;
  const feature = getFeatureDetails(storeGet, featureName);
  const { status, spec } = feature || {};
  const { enabled, managed } = status || {};
  const { required } = spec || {};
  return (enabled && !managed) || required;
}

function onEnabledFeaturesChange({
  discriminator,
  getValue,
  commit,
  storeGet,
}) {
  const enabledFeatures = getValue(discriminator, "/enabledFeatures") || [];

  const allFeatures = storeGet("/cluster/features/result") || [];

  allFeatures.forEach((item) => {
    const featureName = item?.metadata?.name || "";
    const underscoredFeatureName = featureName
      .toLowerCase()
      .replaceAll("-", "_");
    const resourceValuePath = `helmToolkitFluxcdIoHelmRelease_${underscoredFeatureName}`;

    if (enabledFeatures.includes(featureName)) {
      const featureSet = storeGet("/route/params/featureset") || "";
      const chart = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/name"
      );
      const targetNamespace = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/namespace"
      );
      const sourceRef = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/sourceRef"
      );
      const version = getFeaturePropertyValue(
        storeGet,
        featureName,
        getValue,
        "/spec/chart/version"
      );


      const isEnabled = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/enabled')
      const isManaged = getFeaturePropertyValue(storeGet, featureName, getValue, '/status/managed')

      if(isEnabled && (!isManaged)){
        commit("wizard/model$delete", `/resources/${resourceValuePath}`);
      }else{
        commit("wizard/model$update", {
          path: `/resources/${resourceValuePath}`,
          value: {
            ...resources?.[resourceValuePath],
            metadata: {
              ...resources?.[resourceValuePath]?.metadata,
              labels: {
                ...resources?.[resourceValuePath]?.metadata?.labels,
                "app.kubernetes.io/component": featureName,
                "app.kubernetes.io/part-of": featureSet,
              },
            },
            spec: {
              ...resources?.[resourceValuePath]?.spec,
              chart: {
                spec: {
                  chart,
                  sourceRef,
                  version,
                },
              },
              targetNamespace,
            },
          },
          force: true,
        });
      }
    } else {
      commit("wizard/model$delete", `/resources/${resourceValuePath}`);
    }
  });
}

let resources = {};

function returnFalse() {
  return false;
}

async function setReleaseNameAndNamespace({ commit, storeGet, model, getValue, axios }) {
  resources = getValue(model, "/resources");

  const isFeatureSetInstalled = getFeatureSetPropertyValue(
    storeGet,
    getValue,
    "/status/enabled"
  );

  if(isFeatureSetInstalled) {
    // get resources deafult values when featureset is installed
    const owner = storeGet("/route/params/user");
    const cluster = storeGet("/route/params/cluster");

    const { name: chartName, sourceRef, version: chartVersion } = getFeatureSetPropertyValue(
      storeGet,
      getValue,
      "/spec/chart"
    );
    const { data } = await axios.get(
      `/clusters/${owner}/${cluster}/helm/packageview/values?name=${chartName}&sourceApiGroup=${sourceRef.apiGroup}&sourceKind=${sourceRef.kind}&sourceNamespace=${sourceRef.namespace}&sourceName=${sourceRef.name}&version=${chartVersion}&format=json`
    );
    const { resources: resourcesDefaultValues } = data || {}

    Object.keys(resourcesDefaultValues || {}).forEach(key => {
      if(!resources[key]) {
        resources[key] = resourcesDefaultValues[key];
      }
    })
  }
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

function fetchFeatureSetOptions({ storeGet }) {
  const features = storeGet('/cluster/features/result') || []
  const featureSetName = storeGet('/route/params/featureset')
  const filteredFeatures = features.filter(item => item?.spec?.featureSet === featureSetName)
  const options = filteredFeatures.map(item => {
    const { spec, metadata } = item || {}
    const { title, description, required } = spec || {}
    const { name } = metadata || {}
    return {
      text: title,
      value: name,
      description: description,
      statusTag: {
        text: required ? 'Required' : ''
      }
    }
  })

  return options || []
}

/*******************************************************  Monitoring config ***********************/

function showMonitoringConfigSection({
  discriminator,
  getValue,
  watchDependency,
  storeGet,
  commit,
}) {
  watchDependency("discriminator#/enabledFeatures");
  const enabledFeatures = getValue(discriminator, "/enabledFeatures") || [];
  if (enabledFeatures.includes("monitoring-config")) {
    const isFeatureSetEnabled = getFeatureSetPropertyValue(
      storeGet,
      getValue,
      "/status/enabled"
    );
    if (isFeatureSetEnabled) {
      return true;
    } else {
      const isKubePrometheusStackEnabled = getFeaturePropertyValue(
        storeGet,
        "kube-prometheus-stack",
        getValue,
        "/status/enabled"
      );

      if(isKubePrometheusStackEnabled) {
        return true;
      }

      const isMonitoringConfigEnabled = getFeaturePropertyValue(
        storeGet,
        "monitoring-config",
        getValue,
        "/status/enabled"
      );

      const isMonitoringConfigManaged = getFeatureDetails(
        storeGet,
        "monitoring-config",
        getValue,
        '/status/managed'
      )

      const isPanopticonEnabled = getFeaturePropertyValue(
        storeGet,
        "panopticon",
        getValue,
        "/status/enabled"
      );

      if(!isMonitoringConfigManaged) return false

      if (!isMonitoringConfigEnabled) {
        resources["helmToolkitFluxcdIoHelmRelease_monitoring_config"] = {
          ...resources["helmToolkitFluxcdIoHelmRelease_monitoring_config"],
          spec: {
            ...resources["helmToolkitFluxcdIoHelmRelease_monitoring_config"]
              ?.spec,
            values: {
              presets: {
                enable: true,
                monitoring: {
                  serviceMonitor: {
                    labels: {
                      release: "kube-prometheus-stack",
                    },
                  },
                  alert: {
                    labels: {
                      release: "kube-prometheus-stack",
                    },
                  },
                },
              },
              prometheus: {
                service: {
                  scheme: "http",
                  name: "kube-prometheus-stack-prometheus",
                  namespace: "monitoring",
                  port: "9090",
                },
              },
            },
          },
        };
      }

      if (!isPanopticonEnabled) {
        resources["helmToolkitFluxcdIoHelmRelease_panopticon"] = {
          ...resources["helmToolkitFluxcdIoHelmRelease_panopticon"],
          spec: {
            ...resources["helmToolkitFluxcdIoHelmRelease_panopticon"]?.spec,
            values: {
              monitoring: {
                serviceMonitor: {
                  labels: {
                    release: "kube-prometheus-stack",
                  },
                },
                alert: {
                  labels: {
                    release: "kube-prometheus-stack",
                  },
                },
              },
            },
          },
        };
      }
      return false;
    }
  }
  return false;
}

function showConfigurationFieldsFor(
  { discriminator, getValue, watchDependency },
  type
) {
  const configureType = getValue(discriminator, "/configureType");
  watchDependency("discriminator#/configureType");
  return configureType === type;
}

function setConfigureType({ model, getValue }) {
  const { service } =
    getValue(
      model,
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus"
    ) || {};
  if (service) return "service";
  else return "url";
}

function onConfigureTypeChange({ discriminator, getValue, commit }) {
  const configureType = getValue(discriminator, "/configureType");
  if (configureType === "url") {
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service"
    );
  } else if (configureType === "service") {
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/url"
    );
  }
}

function setScheme({ model, getValue }) {
  const scheme = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/scheme"
  );
  return scheme || "http";
}

function onAuthTypeChange({ discriminator, getValue, commit }) {
  const authType = getValue(discriminator, "/authType");
  if (authType === "token") {
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/basicAuth"
    );
  } else if (authType === "basic") {
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/bearerToken"
    );
  }
}

/// ****************************** EDITOR field related functions ****************************************

function showtlsClientAuthAndCaCert({
  discriminator,
  getValue,
  watchDependency,
  commit,
}) {
  watchDependency("discriminator#/configureType");

  const configureType = getValue(discriminator, "/configureType");

  if (configureType !== "url") {
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/tls/ca"
    );
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/tls/cert"
    );
    commit(
      "wizard/model$delete",
      "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/tls/key"
    );
  }

  return configureType === "url";
}

// eslint-disable-next-line no-empty-pattern
function encodeBase64({}, value) {
  return btoa(value);
}

// eslint-disable-next-line no-empty-pattern
function decodeBase64({}, value) {
  return atob(value);
}

// ****************************** Get resources **************************************************
async function getResources(
  { axios },
  owner,
  cluster,
  group,
  version,
  resource,
  params
) {
  try {
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/${resource}`,
      {
        params: params || { filter: { items: { metadata: { name: null } } } },
      }
    );

    const resources = (resp && resp.data && resp.data.items) || [];

    return resources;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getNamespacedResources(
  { axios },
  owner,
  cluster,
  group,
  version,
  namespace,
  resource,
  params
) {
  try {
    if (!namespace) return [];
    const resp = await axios.get(
      `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`,
      {
        params: params || {
          filter: { items: { metadata: { name: null } } },
        },
      }
    );

    const items = (resp && resp.data && resp.data.items) || [];
    return items;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getNamespaces({ axios, route, getValue }) {
  const owner = getValue(route, "/params/user");
  const cluster = getValue(route, "/params/cluster");

  const resources =
    (await getResources(
      { axios },
      owner,
      cluster,
      "core",
      "v1",
      "namespaces"
    )) || [];

  const mappedResources = resources.map((item) => {
    const name = item?.metadata?.name || "";
    return {
      text: name,
      value: name,
    };
  });

  return mappedResources;
}

async function getPrometheuses(
  {
    axios,
    route,
    getValue,
    watchDependency,
    model,
    commit,
    setDiscriminatorValue,
  },
  path
) {
  watchDependency(
    "model#/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/namespace"
  );
  const namespace = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/namespace"
  );
  const owner = getValue(route, "/params/user");
  const cluster = getValue(route, "/params/cluster");

  const params = {
    filter: {
      items: {
        metadata: { name: null },
        spec: {
          serviceMonitorSelector: { matchLabels: null },
          ruleSelector: { matchLabels: null },
        },
        type: null,
      },
    },
  };

  const resources =
    (await getNamespacedResources(
      { axios },
      owner,
      cluster,
      "monitoring.coreos.com",
      "v1",
      namespace,
      "prometheuses",
      params,
      true
    )) || [];

  const filteredResources = resources.map((item) => {
    const name = item?.metadata?.name || "";
    return {
      ...item,
      text: name,
      value: name,
    };
  });

  if (filteredResources?.length && path) {
    const [src, pathRef] = path.split("#");
    if (src === "model") {
      commit("wizard/model$update", {
        path: pathRef,
        value: filteredResources[0].value,
        force: true,
      });
    } else if (src === "discriminator") {
      setDiscriminatorValue(pathRef, filteredResources[0].value);
    }
  }

  setDiscriminatorValue("/prometheuses", filteredResources);

  return filteredResources;
}

async function getServices(
  {
    axios,
    route,
    model,
    getValue,
    watchDependency,
    setDiscriminatorValue,
    commit,
  },
  path
) {
  watchDependency(
    "model#/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/namespace"
  );
  const namespace = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/namespace"
  );
  const owner = getValue(route, "/params/user");
  const cluster = getValue(route, "/params/cluster");

  const params = {
    filter: {
      items: { metadata: { name: null }, spec: { ports: null } },
    },
  };

  const services =
    (await getNamespacedResources(
      { axios },
      owner,
      cluster,
      "core",
      "v1",
      namespace,
      "services",
      params
    )) || [];

  const filteredServices = services
    .filter(
      (item) =>
        item?.spec?.ports?.length && item.metadata?.name?.endsWith("prometheus")
    )
    .map((item) => {
      const name = item.metadata?.name || "";
      return {
        ...item,
        text: name,
        value: name,
      };
    });

  if (filteredServices?.length && path) {
    commit("wizard/model$update", {
      path,
      value: filteredServices[0].value,
      force: true,
    });
  }

  setDiscriminatorValue("/services", filteredServices);

  return filteredServices;
}

function getServicePorts({
  discriminator,
  model,
  getValue,
  watchDependency,
  commit,
}) {
  watchDependency(
    "model#/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/name"
  );
  watchDependency("discriminator#/services");

  const serviceName = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/name"
  );
  const services = getValue(discriminator, "/services");

  if (services && serviceName) {
    const service = services.find(
      (item) => item.spec && item.metadata.name === serviceName
    );
    const ports = (service && service.spec && service.spec.ports) || [];

    const portList = ports.map((item) => String(item.port)) || [];

    if (portList.length) {
      commit("wizard/model$update", {
        path: "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/prometheus/service/port",
        value: String(portList[0]),
        force: true,
      });
    }

    return portList;
  } else {
    return [];
  }
}

// **************************** On value change *******************************************************
function onPrometheusChange({ discriminator, getValue, commit }) {
  const prometheuses = getValue(discriminator, "/prometheuses");
  const selectedPrometheusName = getValue(discriminator, "/selectedPrometheus");

  if (prometheuses?.length && selectedPrometheusName) {
    const selectedPrometheus = prometheuses.find(
      (item) => item.value === selectedPrometheusName
    );

    if (selectedPrometheus) {
      const serviceMonitorSelector =
        selectedPrometheus.spec?.serviceMonitorSelector?.matchLabels || {};
      const ruleSelector =
        selectedPrometheus.spec?.ruleSelector?.matchLabels || {};

      if (Object.keys(serviceMonitorSelector).length) {
        commit("wizard/model$update", {
          path: "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/global/monitoring/serviceMonitor/labels",
          value: serviceMonitorSelector,
          force: true,
        });
        commit("wizard/model$update", {
          path: "/resources/helmToolkitFluxcdIoHelmRelease_panopticon/spec/values/monitoring/serviceMonitor/labels",
          value: serviceMonitorSelector,
          force: true,
        });
      }

      if (Object.keys(ruleSelector).length) {
        commit("wizard/model$update", {
          path: "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/global/monitoring/alert/labels",
          value: ruleSelector,
          force: true,
        });
        commit("wizard/model$update", {
          path: "/resources/helmToolkitFluxcdIoHelmRelease_panopticon/spec/values/monitoring/alert/labels",
          value: ruleSelector,
          force: true,
        });
      }
    }
  }
}

function onServiceMonitorLabelChange({ model, getValue, commit }) {
  const labels = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/global/monitoring/serviceMonitor/labels"
  );
  commit("wizard/model$update", {
    path: "/resources/helmToolkitFluxcdIoHelmRelease_panopticon/spec/values/monitoring/serviceMonitor/labels",
    value: labels,
    force: true,
  });
}

function onAlertLabelChange({ model, getValue, commit }) {
  const labels = getValue(
    model,
    "/resources/helmToolkitFluxcdIoHelmRelease_monitoring_config/spec/values/global/monitoring/alert/labels"
  );
  commit("wizard/model$update", {
    path: "/resources/helmToolkitFluxcdIoHelmRelease_panopticon/spec/values/monitoring/alert/labels",
    value: labels,
    force: true,
  });
}

return {
  getFeatureSetDetails,
  getFeatureSetPropertyValue,
  getFeatureSetDescription,
  isEqualToModelPathValue,
  isEqualToDiscriminatorPathValue,
  getEnabledFeatures,
  disableFeatures,
  onEnabledFeaturesChange,
  returnFalse,
  setReleaseNameAndNamespace,
  fetchFeatureSetOptions,
  showMonitoringConfigSection,
  showConfigurationFieldsFor,
  setConfigureType,
  onConfigureTypeChange,
  setScheme,
  onAuthTypeChange,
  showtlsClientAuthAndCaCert,
  encodeBase64,
  decodeBase64,
  getResources,
  getNamespacedResources,
  getNamespaces,
  getPrometheuses,
  getServices,
  getServicePorts,
  onPrometheusChange,
  onServiceMonitorLabelChange,
  onAlertLabelChange,
};
