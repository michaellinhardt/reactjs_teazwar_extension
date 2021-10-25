const

  getFunctionName = type => {
    const firstUpper = str => str.charAt(0) + str.substring(1).toLowerCase()
    const firstLower = str => str.charAt(0).toLowerCase() + str.substring(1)

    const allFirstUpper = type
      .split('_')
      .reduce((acc, curr) => acc + firstUpper(curr), '')

    return firstLower(allFirstUpper)
  }



module.exports = {

  getFunctionName,

  mergeWithCustomizer: (objValue, srcValue) => {
    if (Array.isArray(srcValue)) { return srcValue }

    return undefined
  },

  reducerRooter: (actions, reducers, state, action) => {
    const typeToActionName = getFunctionName(action.type)
    const relatedAction = reducers[typeToActionName]

    return actions.types[action.type]
                && typeof (relatedAction) === 'function'
      ? relatedAction(state, action)
      : state
  },

}