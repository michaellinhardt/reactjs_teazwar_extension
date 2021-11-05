import 'regenerator-runtime/runtime'

import ReactDOM from 'react-dom'
import React from 'react'
import Redux from '../redux'
import TwitchLib from '../library/twitch.library'
import SocketLib from '../library/websocket.library'
import LangHelper from '../helpers/language.helper'


import ComponentSuperclass from '../superclass/component.superclass'

import DialogueEcosystem from '../components/ecosystems/dialogue.ecosystem'
import LoadingEcosystem from '../components/ecosystems/loading.ecosystem'
import ListenerEcosystem from '../components/ecosystems/listener.ecosystem'

const { Store, ui, inputs, ressources, connect, Provider } = Redux
const { twitchStopListening, twitchStartListening } = TwitchLib
const { connectSocket } = SocketLib

class App extends ComponentSuperclass {
  constructor (props) { super(props) }

  registerStoreMethods () {
    Store.inputs = this.props.setInput
    Store.ui = this.props.setUi
    Store.uis = this.props.setUis
    Store.ressources = this.props.saveRessources
    Store.cleanRessources = this.props.resetRessources
  }

  componentWillUnmount () { twitchStopListening() }
  componentDidMount () { return this.initiateGame() }

  shouldComponentUpdate (nextProps, nextState) {
    const isReady = nextState.isReady
    const isRender = !isReady || !this.isLock
    if (isRender) { return true }

    return this.props.language !== nextProps.language
  }

  async initiateGame () {
    this.registerStoreMethods()
    twitchStartListening()
    this.setState({ isReady: true })
  }

  setLanguageMethod () {
    const lang = Store.getState().ressources.language
    LangHelper.lang = LangHelper[lang]
  }

  render () {
    const isReady = this.state.isReady
    if (!isReady) { return null }

    this.setLanguageMethod()

    if (isReady && !this.isLock) {
      this.isLock = true
      setTimeout(connectSocket, 300)
    }

    return <>
      <ListenerEcosystem />
      <LoadingEcosystem />
      <DialogueEcosystem />
    </>

  }
}

const AppConnected = connect(state => ({
  language: state.ressources.language,

}), dispatch => ({
  setInput: data => dispatch(inputs.actions.setInput(data)),
  setUi: (label, data) => dispatch(ui.actions.setUi(label, data)),
  setUis: data => dispatch(ui.actions.setUis(data)),
  resetRessources: data => dispatch(ressources.actions.resetRessources(data)),
  saveRessources: data => dispatch(ressources.actions.saveRessources(data)),

}))(App)

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(() => {
    ReactDOM.render(<>
      <Provider store={Store}>
        <AppConnected />
      </Provider>
    </>, document.getElementById('root'))
  }, 100)
})
