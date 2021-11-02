import actions from './ui.actions'
import reducers from './ui.reducers'
import schema from './ui.schema'

import { reducerRooter } from '../../helpers/reducer.helper'

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
