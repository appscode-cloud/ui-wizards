function onGroupStatusChange(
  { rootSchema, schemaRef, commit, model, getValue },
  status
) {
  const { $ref: ref } = schemaRef || {};
  const [, path] = ref.split("#") || "";
  const replacedPath = `/groups/${path.split("/").pop()}`;
  console.log({ ref, path, replacedPath });
  const verd = status === "true";
  const currentStatus =
    getValue(model, path.replace(/\/properties/g, "")) || false;

  const rulesPath = `${path
    .replace(/\/enabled$/, "")
    .replace(/\/properties/g, "")}/rules`;

  if (currentStatus !== verd) {
    const groupSchema =
      getValue(
        rootSchema,
        `${path.replace(/\/enabled$/, "")}/rules/properties`
      ) || {};
    const groupModelValue = getValue(model, rulesPath) || {};

    console.log({ groupSchema });

    Object.keys(groupSchema).forEach((item) => {
      if (!groupModelValue[item]) groupModelValue[item] = {};
      groupModelValue[item].enabled = verd;
    });

    commit("wizard/model$update", {
      path: rulesPath,
      value: groupModelValue,
      force: true,
    });
  }
}

function showValField({ schemaRef }) {
  return schemaRef && Object.keys(schemaRef).length;
}

function showAlertSection({ model, getValue, watchDependency }) {
  watchDependency("model#/enabled");
  const status = getValue(model, "/enabled");
  return !!status;
}

return {
  onGroupStatusChange,
  showValField,
  showAlertSection,
};
