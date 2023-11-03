async function checkIsFeatureEnabled(axios, feature,storeGet) {

  const owner = storeGet("/route/params/user");
  const cluster = storeGet("/route/params/cluster");
  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/ui.k8s.appscode.com/v1alpha1/features/${feature}`
  );
  const status = resp.data.status;

  if (status.hasOwnProperty("ready")) {
    return status.enabled && status.ready;
  }
  return status.enabled;
}

async function initBackupStatus({ model, getValue, axios,storeGet}) {
  if (
    !(
      (await checkIsFeatureEnabled(axios, "stash",storeGet)) &&
      (await checkIsFeatureEnabled(axios, "stash-presets",storeGet))
    )
  ) {
    return false;
  }
  const tool = getValue(model, "/tool");
  return tool === "Stash";
}

function onBackupStatusChange({ discriminator, getValue, commit }) {
  const status = getValue(discriminator, "/backupEnabledStatus");
  commit("wizard/model$update", {
    path: "/tool",
    value: status ? "Stash" : "",
    force: true,
  });
}

async function stashEnabled({ axios,storeGet }) {
  return !(
    (await checkIsFeatureEnabled(axios, "stash",storeGet)) &&
    (await checkIsFeatureEnabled(axios, "stash-presets",storeGet))
  );
}

function getRequirements(){
  return `To configure backup you need to enable following features
  - ## **Stash**
  - ## **Stash Presets**`
}


return {
  initBackupStatus,
  onBackupStatusChange,
  stashEnabled,
  getRequirements,
};
