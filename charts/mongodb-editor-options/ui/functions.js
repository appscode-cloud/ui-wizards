export function isEqualToModelPathValue(
  { model, getValue, watchDependency },
  value,
  modelPath
) {
  const modelPathValue = getValue(model, modelPath);
  const modelName = modelPath.split("/").pop();
  watchDependency(modelName, "model#" + modelPath);
  return modelPathValue === value;
}
