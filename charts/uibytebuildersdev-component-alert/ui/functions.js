function onGroupStatusChange({ rootSchema, elementSchema, commit, model, getValue }, status) {
  const { $ref: ref } = elementSchema || {};
  const [, path] = ref.split("#") || "";
  const replacedPath = `/groups/${path.split("/").pop()}`;
  const verd = (status === "true");
  const currentStatus = (getValue(model, `${replacedPath}/enabled`) || false);

  if(currentStatus !== verd) {
    const groupSchema = getValue(rootSchema, `${path}/properties/rules/properties`) || {};    
    const groupModelValue = getValue(model, `${replacedPath}/rules`) || {};

    Object.keys(groupSchema).forEach((item) => {
      if(!groupModelValue[item]) groupModelValue[item] = {};
      groupModelValue[item].enabled = verd;
    });

    commit("wizard/model$update", {
      path: `${replacedPath}/rules`,
      value: groupModelValue,
      force: true
    });
  }
}

function showValField({ elementSchema }) {
  return elementSchema && Object.keys(elementSchema).length;
}

function showAlertSection({ model, getValue, watchDependency }) {
  watchDependency("model#/enabled")
  const status = getValue(model, "/enabled");
  return !!status;
}

return {
  onGroupStatusChange,
  showValField,
  showAlertSection,
}