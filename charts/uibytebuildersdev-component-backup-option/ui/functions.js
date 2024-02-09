async function checkIsFeatureEnabled(axios, feature, storeGet) {
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


async function backupStatus (model, getValue, axios, storeGet){
  const isStashPresetEnable = await checkIsFeatureEnabled(axios,"stash-presets",storeGet);

  const tool = getValue(model,'/tool') || '';
  if(tool === "KubeStash"){
    const isKubeStashEnable = await checkIsFeatureEnabled(axios,"kubestash",storeGet);
    return isStashPresetEnable && isKubeStashEnable;
  }
  else if(tool === 'Stash'){
    const isStashEnable = await checkIsFeatureEnabled(axios,"stash",storeGet);
    return isStashPresetEnable && isStashEnable;
  }

  return false
}


async function initBackupStatus({model, getValue, axios, storeGet, setDiscriminatorValue}) {
  const tool = getValue(model,'/tool') || '';
  setDiscriminatorValue('/initialStatus', tool)
  const status = await backupStatus(model, getValue, axios, storeGet);
  return status
}

function onBackupStatusChange({ discriminator, getValue, commit }) {
  const status = getValue(discriminator, "/backupEnabledStatus");
  const initialStatus = getValue(discriminator, "/initialStatus");
  commit("wizard/model$update", {
    path: "/tool",
    value: status ? initialStatus : "",
    force: true,
  });
}

async function stashEnabled({ axios, storeGet,model,getValue }) {
  const status = await backupStatus(model, getValue, axios, storeGet);
  return !status;
}

function getRequirements() {
  return `To configure backup you need to enable following features
  - ## **Stash or KubeStash**
  - ## **Stash Presets**`;
}

return {
  initBackupStatus,
  onBackupStatusChange,
  stashEnabled,
  getRequirements,
};
