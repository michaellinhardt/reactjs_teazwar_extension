import _ from 'lodash'

export const

  setInput = (state, action) => ({ ...(_.merge(state, action.input)) })
