import * as actions from './ressources.actions'
import * as reducers from './ressources.reducers'
import schema from './ressources.schema'

const { reducerRooter } = require('../../helpers/files/reducer.helper')

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
