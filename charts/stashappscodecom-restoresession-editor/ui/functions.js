async function getResources(
  { axios, storeGet, model, getValue, watchDependency },
  group,
  version,
  resource,
  namespaced
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  let namespace = "";
  if (namespaced) {
    namespace = getValue(model, "/metadata/release/namespace");
    watchDependency("model#/metadata/release/namespace");
  }

  if (!namespaced || namespace) {
    // call api if resource is either not namespaced
    // or namespaced and user has selected a namespace
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/${group}/${version}${
          namespace ? "/namespaces/" + namespace : ""
        }/${resource}`,
        {
          params: { filter: { items: { metadata: { name: null } } } },
        }
      );

      const resources = (resp && resp.data && resp.data.items) || [];

      resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        item.text = name;
        item.value = name;
        return true;
      });
      return resources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

function initNamespace({ route }) {
  const { namespace } = route.query || {};
  return namespace || null;
}
function isNamespaceDisabled({ route }) {
  return !!initNamespace({ route });
}
function isDatabaseSelectDisabled({ route }) {
  const { database } = route.query || {};
  return !!database;
}

function labelsDisabilityChecker({ itemCtx }) {
  const { key } = itemCtx;
  if (key.startsWith("app.kubernetes.io") || key.includes("helm")) return true;
  else return false;
}

async function fetchJsons(
  { axios, itemCtx, setDiscriminatorValue },
  discriminatorPath
) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, url, version, packageviewUrlPrefix } = itemCtx.chart;
  try {
    ui = await axios.get(
      `${packageviewUrlPrefix}/create-ui.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    language = await axios.get(
      `${packageviewUrlPrefix}/language.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${packageviewUrlPrefix}/functions.js?name=${name}&url=${url}&version=${version}`
    );
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || "");
    functions = evalFunc();
  } catch (e) {
    console.log(e);
  }

  if (discriminatorPath) {
    setDiscriminatorValue(discriminatorPath, {
      ui: ui.data || {},
      language: language.data || {},
      functions,
    });
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  };
}

let databaseToTypeMap = {};

async function fetchDatabases({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
  commit
}) {
  const owner = storeGet("/route/params/user");
  const database = storeGet('/route/query/database');
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

  if (namespace) {
    // call api if user has selected a namespace
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/appcatalog.appscode.com/v1alpha1/namespaces/${namespace}/appbindings`,
        {
          params: {
            filter: {
              items: {
                apiVersion: null,
                kind: null,
                metadata: { name: null, namespace: null },
                spec: { type: null },
              },
            },
          },
        }
      );

      const resources = (resp && resp.data && resp.data.items) || [];

      const mappedResources = resources
        .filter((item) => {
          const type = (item.spec && item.spec.type) || "";
          return type.startsWith("kubedb.com");
        })
        .map((item) => {
          const name = (item.metadata && item.metadata.name) || "";
          return {
            text: name,
            value: name
          };
        });
        
      // update database to type map
      databaseToTypeMap = {};
      resources.forEach((rs) => {
        const type = (rs.spec && rs.spec.type) || "";
        const name = (rs.metadata && rs.metadata.name) || "";
        if (type.startsWith("kubedb.com")) {
          databaseToTypeMap[name] = type;
        }
      });

      if(database) {
        // if database name is provided in route query
        // find the option matching with database
        const matchedOption = mappedResources.find(rs => rs.text === database)
        if(matchedOption) {
          // set this value as target
          commit("wizard/model$update", {
            path: "/resources/stashAppscodeComRestoreSession/spec/target/ref/name",
            value: matchedOption.value,
            force: true
          })
        }
      }

      return mappedResources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

async function fetchRepositories({
  axios,
  storeGet,
  model,
  getValue,
  watchDependency,
}) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");
  const namespace = getValue(model, "/metadata/release/namespace");
  watchDependency("model#/metadata/release/namespace");

  if (namespace) {
    // call api if user has selected a namespace
    try {
      const resp = await axios.get(
        `/clusters/${owner}/${cluster}/proxy/stash.appscode.com/v1alpha1/namespaces/${namespace}/repositories`,
        {
          params: {
            filter: {
              items: {
                metadata: { name: null },
              },
            },
          },
        }
      );

      const resources = (resp && resp.data && resp.data.items) || [];

      const mappedResources = resources.map((item) => {
        const name = (item.metadata && item.metadata.name) || "";
        return {
          text: name,
          value: name,
        };
      });

      return mappedResources;
    } catch (e) {
      console.log(e);
      return [];
    }
  } else return [];
}

function valueExists(value, getValue, path) {
  const val = getValue(value, path);
  if (val) return true;
  else return false;
}

function showInterimVolumneTemplate({
  model,
  getValue,
  watchDependency,
  commit,
}) {
  const appbindingName = getValue(model, "/spec/target/name");
  watchDependency("model#/spec/target/name");

  let verdict = false;
  if (appbindingName) {
    // find app binding type
    const type = databaseToTypeMap[appbindingName];
    if (type === "kubedb.com/elasticsearch") verdict = true;
  }

  if (!verdict) {
    // delete interimVolumeTempalte if it exists
    if (valueExists(model, getValue, "/spec/interimVolumeTemplate")) {
      commit("wizard/model$delete", "/spec/interimVolumeTemplate");
    }
  }

  return verdict;
}

async function getStorageClassNames(
  { axios, storeGet, commit, setDiscriminatorValue, getValue, model },
  path
) {
  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

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

    if (isDefault && path) {
      const className = getValue(model, path);
      if (!className) {
        commit("wizard/model$update", {
          path: path,
          value: name,
          force: true,
        });
      }
    }

    item.text = name;
    item.value = name;
    return true;
  });

  if (!path) {
    setDiscriminatorValue("/storageClasses", resources);
  }

  return resources;
}

const restoreSessionInitRunTimeSettings = {
  pod: {
    serviceAccountName: "",
    securityContext: {
      fsGroup: null,
      runAsUser: null,
      runAsGroup: null,
    },
  },
};
function showRuntimeSettingsForm(
  { discriminator, getValue, watchDependency, commit, model }
) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  watchDependency("discriminator#/customizeRestoreJobRuntimeSettings");

  return !!customizeRestoreJobRuntimeSettings;
}

function setCustomizeRestoreJobRuntimeSettings({model, getValue}) {
  const runtimeSettings = getValue(model, '/resources/stashAppscodeComRestoreSession/spec/runtimeSettings')
  return !!runtimeSettings;
}

function onCustomizeRestoreJobRuntimeSettingsChange({discriminator, getValue}) {
  const customizeRestoreJobRuntimeSettingsStatus = getValue(discriminator, '/customizeRestoreJobRuntimeSettings')
  
  if (customizeRestoreJobRuntimeSettingsStatus === false) {
    commit("wizard/model$delete", "/spec/runtimeSettings");
  }
}

function setSnapshot({ model, getValue }) {
  const snapshot = getValue(model, '/resources/stashAppscodeComRestoreSession/spec/rules/0/snapshots/0')
  return snapshot || ''
}

function onSnapshotChange({ commit, getValue, discriminator }) {
  const snapshot = getValue(discriminator, '/snapshot')
  commit('wizard/model$update', {
    path: '/resources/stashAppscodeComRestoreSession/spec/rules/0/snapshots/0',
    value: snapshot,
    force: true
  })
}

return {
  getResources,
  initNamespace,
  isNamespaceDisabled,
  isDatabaseSelectDisabled,
  labelsDisabilityChecker,
  fetchJsons,
  fetchDatabases,
  fetchRepositories,
  showInterimVolumneTemplate,
  getStorageClassNames,
  showRuntimeSettingsForm,
  setCustomizeRestoreJobRuntimeSettings,
  onCustomizeRestoreJobRuntimeSettingsChange,
  setSnapshot,
  onSnapshotChange
};
