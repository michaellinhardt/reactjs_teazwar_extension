import combineReducers from 'redux/src/combineReducers'
import createStore from 'redux/src/createStore'
import { connect, Provider } from 'react-redux'

import ressources from './ressources'
import ui from './ui'
import inputs from './inputs'

const

  rootReducer = combineReducers({
    ressources: ressources.reducer,
    ui: ui.reducer,
    inputs: inputs.reducer,
  }),

  Store = createStore(rootReducer)

export default {
  Store,
  connect,
  Provider,

  ressources,
  ui,
  inputs,
}
