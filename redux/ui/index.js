import * as actions from './ui.actions'
import * as reducers from './ui.reducers'
import schema from './ui.schema'

const { reducerRooter } = require('../../helpers/files/reducer.helper')

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
