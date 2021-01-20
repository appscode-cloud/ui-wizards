function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  value,
  modelPath
) {
  const modelPathValue = getValue(model, modelPath);
  const modelName = modelPath.split("/").pop();
  watchDependency(modelName, "model#" + modelPath);
  return modelPathValue === value;
}

async function showElement({ axios }) {
  const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return resp.data.length === 10;
}

return {
  isEqualToModelPathValue,
  showElement,
};
