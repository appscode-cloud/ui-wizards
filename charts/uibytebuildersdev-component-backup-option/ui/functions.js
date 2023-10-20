async function checkIsFeatureEnabled(axios, feature) {
  const resp = await axios.get(
    `/clusters/appscode/console-demo-linode/proxy/ui.k8s.appscode.com/v1alpha1/features/${feature}`
  );
  const status = resp.data.status;

  if (status.hasOwnProperty("ready")) {
    return status.enabled && status.ready;
  }
  return status.enabled;
}

async function initBackupStatus({ model, getValue, axios }) {
  if (
    !(
      (await checkIsFeatureEnabled(axios, "stash")) &&
      (await checkIsFeatureEnabled(axios, "stash-presets"))
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

async function stashEnabled({ axios }) {
  return !(
    (await checkIsFeatureEnabled(axios, "stash")) &&
    (await checkIsFeatureEnabled(axios, "stash-presets"))
  );
}
return {
  initBackupStatus,
  onBackupStatusChange,
  stashEnabled,
};
