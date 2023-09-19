const ifDedicated = ({ model, getValue, watchDependency }) => {
  watchDependency("model#/dedicated");
  const val = getValue(model, "/dedicated");
  console.log(val, model)
  if(val)return true
};


return{
  ifDedicated
}