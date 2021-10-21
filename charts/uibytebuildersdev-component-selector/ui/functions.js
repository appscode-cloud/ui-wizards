async function fetchJsons({ axios, itemCtx }) {
  let ui = {};
  let language = {};
  let functions = {};
  const { name, url, version } = itemCtx.chart;
  const urlPrefix = "/chart/packageview/files/ui";
  try {
    ui = await axios.get(
      `${urlPrefix}/create-ui.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    language = await axios.get(
      `${urlPrefix}/language.yaml?name=${name}&url=${url}&version=${version}&format=json`
    );
    const functionString = await axios.get(
      `${urlPrefix}/functions.js?name=${name}&url=${url}&version=${version}`
    );
    // declare evaluate the functionString to get the functions Object
    const evalFunc = new Function(functionString.data || "");
    functions = evalFunc();
  } catch (e) {
    console.log(e);
  }

  return {
    ui: ui.data || {},
    language: language.data || {},
    functions,
  };
}

return {
	fetchJsons
}