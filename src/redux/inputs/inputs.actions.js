const
  types = { SET_INPUT: 'SET_INPUT' },

  setInput = (input = {}) => ({
    type: types.SET_INPUT,
    input,
  })

export default { types, setInput }
