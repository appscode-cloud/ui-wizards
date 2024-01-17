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
    `/clusters/${owner}/${cluster}/proxy/engine.kubevault.com/v1alpha1/redisroles`
  )

  const resources = (resp && resp.data && resp.data.items) || []

  resources.map((item) => {
    const name = (item.metadata && item.metadata.name) || ""
    const kind = (item && item.kind)
    const namespace = (item.metadata && item.metadata.namespace)
    item.text = name
    item.value = {
      name: name,
      kind: kind,
      namespace: namespace
    }
    return true
  })
  const dbname = getDbName({storeGet}) || ''
  const mappedresources = resources.filter((item) => item.spec && (item.spec.secretEngineRef.name === dbname) )
  console.log(mappedresources);
  return mappedresources
}


function getRoleKind({model, getValue, storeGet, commit}) {
  const resource = storeGet("/route/params/resource") || ''
  let kind = ''
  if (resource === 'elasticsearches') kind = 'ElasticsearchRole'
  else if (resource === 'mariadbs') kind = 'MysqlRole'
  else if (resource === 'mongodbs') kind = 'MongodbRole'
  else if (resource === 'mysqls') kind = 'MysqlRole'
  else if (resource === 'postgreses') kind = 'PostgresqlRole'
  else if (resource === 'redises') kind = 'RedisRole'

  let specRef = getValue(model, "/spec/roleRef") || {}
  specRef.kind = kind
  specRef.namespace = getDbNamespace({storeGet})
  if(kind){    
    commit("wizard/model$update",  {
      path: `/spec/roleRef`,
      value: specRef,
      force: true,
    })
  }
  return kind
}

return {
  getDbName,
  getDbNamespace,
	getResources,
  getRoleKind,
}