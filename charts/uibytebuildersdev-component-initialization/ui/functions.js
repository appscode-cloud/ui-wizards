
// ********************************* Initialization & Backup *************************************
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

async function getNamespacedResourceList(
  axios,
  storeGet,
  { namespace, group, version, resource }
) {
  const owner = storeGet("/user/username");
  const cluster = storeGet("/cluster/clusterDefinition/spec/name");

  const url = `/clusters/${owner}/${cluster}/proxy/${group}/${version}/namespaces/${namespace}/${resource}`;

  try {
    const resp = await axios.get(url, {
      params: {
        filter: { items: { metadata: { name: null }, type: null } },
      },
    });

    const items = (resp && resp.data && resp.data.items) || [];
    return items;
  } catch (e) {
    console.log(e);
  }

  return [];
}

async function resourceNames(
  { axios, watchDependency, storeGet, reusableElementCtx },
  group,
  version,
  resource
) {
  const { dataContext } = reusableElementCtx;
  const { namespace } = dataContext;
  watchDependency("data#/namespace");

  let resources = await getNamespacedResourceList(axios, storeGet, {
    namespace,
    group,
    version,
    resource,
  });

  return resources.map((resource) => {
    const name = (resource.metadata && resource.metadata.name) || "";
    return {
      text: name,
      value: name,
    };
  });
}

function initPrePopulateDatabase({ model, reusableElementCtx }) {

  const { functionCallbacks } = reusableElementCtx || {};
  const { isEditWizard } = functionCallbacks || {};

  const isCreateWizard = !(isEditWizard && !!isEditWizard());

  // if current wizard is for create step then always set yes
  // otherwise return yes if the model value (initialization value) exist
  return isCreateWizard || model ? "yes" : "no";
}

function isValueExists(value, getValue, path) {
  const val = getValue(value, path);
  return !!val;
}

function onPrePopulateDatabaseChange({
  commit,
  getValue,
  discriminator,
  model,
  reusableElementCtx
}) {
  const prePopulateDatabase = getValue(discriminator, "/prePopulateDatabase");
  
  if (prePopulateDatabase === "no") {
    // delete related properties
    commit(
      "wizard/model$delete",
      "/"
    );
  } else {
    const dbName = getValue(reusableElementCtx, "/dataContext/name");
    // set stashAppscodeComRestoreSession_init if it doesn't exist

    if (
      !isValueExists(
        model,
        getValue,
        "/spec"
      )
    ) {
      commit("wizard/model$update", {
        path: "/spec/rules",
        value: [{
          snapshots: ["latest"],
        }],
        force: true,
      });

      commit("wizard/model$update", {
        path: "/spec/target",
        value: {
          ref: {
            apiVersion: "appcatalog.appscode.com/v1alpha1",
            kind: "AppBinding",
            name: dbName,
          },
        },
        force: true,
      });
    }
  }
}

function returnFalse() {
  return false;
}

function showInitializationForm({ getValue, discriminator, watchDependency }) {
  const prePopulateDatabase = getValue(discriminator, "/prePopulateDatabase");
  watchDependency("discriminator#/prePopulateDatabase");
  return prePopulateDatabase === "yes";
}

function initCustomizeRestoreJobRuntimeSettings({ getValue, model }) {
  const runtimeSettings = getValue(
    model,
    "/spec/runtimeSettings"
  );
  if (runtimeSettings) return "yes";
  else return "no";
}

function onCustomizeRestoreJobRuntimeSettingsChange({
  commit,
  getValue,
  discriminator,
  model,
}) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  if (customizeRestoreJobRuntimeSettings === "no") {
    commit(
      "wizard/model$delete",
      "/spec/runtimeSettings"
    );
  } else if (customizeRestoreJobRuntimeSettings === "yes") {
    if (
      !isValueExists(
        model,
        getValue,
        "/spec/runtimeSettings"
      )
    ) {
      // set new value
      commit("wizard/model$update", {
        path:
          "/spec/runtimeSettings",
        value: {},
      });
    }
  }
}

function showRuntimeForm(
  { discriminator, getValue, watchDependency },
  value
) {
  const customizeRestoreJobRuntimeSettings = getValue(
    discriminator,
    "/customizeRestoreJobRuntimeSettings"
  );
  watchDependency("discriminator#/customizeRestoreJobRuntimeSettings");
  return customizeRestoreJobRuntimeSettings === value;
}

function setSnapshot() {
  return 'latest'
}

function onSnapshotChange({ commit, getValue, discriminator }) {
  const snapshot = getValue(discriminator, '/snapshot')
  commit('wizard/model$update', {
    path: '/spec/rules',
    value: [{snapshots: [snapshot]}],
    force: true
  })
}

return {
  fetchJsons,
  initPrePopulateDatabase,
  onPrePopulateDatabaseChange,
  showInitializationForm,
  initCustomizeRestoreJobRuntimeSettings,
  onCustomizeRestoreJobRuntimeSettingsChange,
  showRuntimeForm,
  returnFalse,
  resourceNames,
  setSnapshot,
  onSnapshotChange,
}