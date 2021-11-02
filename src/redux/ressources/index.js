import actions from './ressources.actions'
import reducers from './ressources.reducers'
import schema from './ressources.schema'

import { reducerRooter } from '../../helpers/reducer.helper'

export default {
  actions,
  reducer: (state = schema, action) =>
    reducerRooter(actions, reducers, state, action),
}
