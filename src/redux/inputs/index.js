import actions from './inputs.actions'
import reducers from './inputs.reducers'
import schema from './inputs.schema'

import { reducerRooter } from '../../helpers/reducer.helper'

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
