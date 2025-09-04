const { ref, computed } = window.vueHelpers || {}

export const useFunc = (model) => {
  const multiLoader = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const singleLoader1 = async () => {
    const str = ref('singleLoader1 is working properly')
    const test = computed(() => {
      console.log('model in singleLoader1', model)
      return model.input?.fName || 'no name'
    })
    console.log(str.value)
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/2')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const singleLoader2 = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/3')
      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const fNameLoader = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/4')
      const data = await resp.json()
      return data?.title
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const test = async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/4'
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      const spl = data?.title?.split(' ')
      return spl.map((op) => ({ text: op, value: op }))
    } catch (error) {
      console.log(error)
    }
    return {}
  }
  const test2 = () => 'porro'
  const kubeconfigFunc = () => 'miao miap'
  const scalingRulesLoader = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/5')
      const data = await resp.json()
      return '1Gi'
    } catch (error) {
      console.log(error)
    }
    return ''
  }
  return {
    multiLoader,
    singleLoader1,
    singleLoader2,
    fNameLoader,
    kubeconfigFunc,
    test,
    test2,
    scalingRulesLoader,
  }
}
