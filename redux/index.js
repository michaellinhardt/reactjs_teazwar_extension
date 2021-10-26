import { combineReducers, createStore } from 'redux'
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

  store = createStore(rootReducer)

export {
  store,
  connect,
  Provider,

  ressources,
  ui,
  inputs,
}
