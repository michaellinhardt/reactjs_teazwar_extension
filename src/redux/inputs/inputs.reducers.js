import _ from 'lodash'

export default {

  setInput: (state, action) => ({ ...(_.merge(state, action.input)) }),

}
