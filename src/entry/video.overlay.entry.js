import 'regenerator-runtime/runtime'

import ReactDOM from 'react-dom'
import React from 'react'
import Redux from '../redux'
import TwitchLib from '../library/twitch.library'
import SocketLib from '../library/websocket.library'
import LangHelper from '../helpers/language.helper'


import ComponentSuperclass from '../superclass/component.superclass'
import CutsceneListener from '../listeners/cutscene.listener'

import DialogueEcosystem from '../components/ecosystems/dialogue.ecosystem'
import LoadingEcosystem from '../components/ecosystems/loading.ecosystem'

const { Store, ui, inputs, ressources, connect, Provider } = Redux
const { twitchStopListening, twitchStartListening } = TwitchLib
const { connectSocket } = SocketLib

class App extends ComponentSuperclass {
  constructor (props) { super(props) }

  instanciateListeners () {
    this.listeners = {}
    this.listeners.cutscene = new CutsceneListener()
  }

  registerStoreMethods () {
    Store.inputs = this.props.setInput
    Store.ui = this.props.setUi
    Store.uis = this.props.setUis
    Store.ressources = this.props.saveRessources
    Store.cleanRessources = this.props.resetRessources
  }

  componentWillUnmount () { twitchStopListening() }
  componentDidMount () { return this.initiateGame() }

  pingListener(nextProps, ping_key) {
    const newValue = nextProps[ping_key]
    if (this.props[ping_key] === newValue) { return true }

    const [, listenerName, listenerEvent ] = ping_key.split('_')
    this.listeners[listenerName].event(listenerEvent)
    return true
  }

  shouldComponentUpdate (nextProps, nextState) {
    const isReady = nextState.isReady
    const isRender = !isReady || !this.isLock
    // console.info('should render ?', isRender, isReady, this.isLock)
    if (isRender) { return true }

    this.pingListener(nextProps, 'listener_cutscene_cutscene')
    this.pingListener(nextProps, 'listener_cutscene_answer')
    this.pingListener(nextProps, 'listener_cutscene_exit')

    return this.props.language !== nextProps.language
  }

  async initiateGame () {
    this.registerStoreMethods()
    this.instanciateListeners()
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
      <LoadingEcosystem />
      <DialogueEcosystem />
    </>

  }
}

const AppConnected = connect(state => ({
  listener_cutscene_cutscene: state.ressources.cutscene.listener_cutscene_cutscene,
  listener_cutscene_answer: state.ressources.cutscene.listener_cutscene_answer,
  listener_cutscene_exit: state.ressources.cutscene.listener_cutscene_exit,
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
