function getDbName({storeGet}) {
  const path =  storeGet("/route/fullPath")
  const splitedPath = path.split('/')
  return splitedPath[6]
}


function getDbNamespace({storeGet}) {
  const path =  storeGet("/route/fullPath")
  const splitedPath = path.split('/')
  const segment = splitedPath[splitedPath.length-1]
  const namespace = segment.split('=')
  return namespace[1]
}


async function getResources(
  { axios, storeGet },
  group,
  version,
  resource
) {
  const owner = storeGet("/route/params/user")
  const cluster = storeGet("/route/params/cluster")

  const resp = await axios.get(
    `/clusters/${owner}/${cluster}/proxy/engine.kubevault.com/v1alpha1/secretengines`
  )

  const resources = (resp && resp.data && resp.data.items) || []

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ""
    const namespace = (item.metadata && item.metadata.namespace) || ""
    item.text = name
    item.value = name
    return true
  })
  const dbname = getDbName({storeGet}) || ''
  const mappedresources = resources.filter((item) => item.text && (item.text === dbname) )
  return mappedresources
}


return {
  getDbName,
  getDbNamespace,
	getResources,
}