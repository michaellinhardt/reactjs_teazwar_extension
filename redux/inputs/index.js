import * as actions from './inputs.actions'
import * as reducers from './inputs.reducers'
import schema from './inputs.schema'

const { reducerRooter } = require('../../helpers/files/reducer.helper')

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
