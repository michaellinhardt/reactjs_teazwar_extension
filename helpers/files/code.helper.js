const getAllMethods = (obj) => {
  let props = []

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter((p, i, arr) =>
        ![
          'isMounted',
          'replaceState',
        ].includes(p) &&
              typeof obj[p] === 'function' &&
              p !== 'constructor' &&
              (i === 0 || p !== arr[i - 1]) &&
              props.indexOf(p) === -1
      )
    props = props.concat(l)
  }
  while (
    (obj = Object.getPrototypeOf(obj)) &&
      Object.getPrototypeOf(obj)
  )

  return props
}

module.exports = {

  getAllMethods,

  autoBindMethod: that => {
    getAllMethods(that)
      .forEach(method => {
        that[method] = that[method].bind(that)
      })
  },

  isObject: objectVar =>
    typeof objectVar === 'object'
    && !Array.isArray(objectVar)
    && objectVar !== null
    && !(objectVar instanceof Date),

  isObjectOrArray: objectVar =>
    (typeof objectVar === 'object'
    && objectVar !== null
    && !(objectVar instanceof Date)),

  sleep: ms => new Promise(resolve => { setTimeout(resolve, ms) }),

}

