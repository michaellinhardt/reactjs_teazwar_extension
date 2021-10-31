const { ReactDOM, React, that } = require('../imports')
const { ComponentSuperclass } = require('../superclass')
const { store, ui, inputs, ressources, connect, Provider } = require('../redux')

const ComponentsObject = require('../components')
const ListenersObject = require('../listeners')
const Components = []
_.forEach(ComponentsObject, (Component, name) => {
  if (name.endsWith('Ecosystem')) {
    Components.push(Component)
  }
})

class App extends ComponentSuperclass {
  constructor (props) { super(props) }

  instanciateListeners () {
    const Listeners = require('../listeners')
    window._teazwar.listeners = {}
    _.forEach(Listeners, (classAddr, className) => {
      const keyName = className.replace('Listener', '').toLowerCase()
      if (!window._teazwar.listeners[keyName]) {
        window._teazwar.listeners[keyName] = new classAddr()
      }
    })
  }

  instanciateLibraries () {
    const Library = require('../library')
    _.forEach(Library, (classAddr, className) => {
      const keyName = className.replace('Library', '').toLowerCase()
      if (!window._teazwar[keyName]) {
        window._teazwar[keyName] = new classAddr()
      }
    })
  }

  registerGlobalMethods () {
    that.inputs = this.props.setInput
    that.ui = this.props.setUi
    that.uis = this.props.setUis
    that.ressources = this.props.saveRessources
    that.cleanRessources = this.props.resetRessources
    that.logout = this.logout
  }

  componentWillUnmount(){ that.twitch.stopListening() }
  componentDidMount () { return this.initiateGame() }

  pingListener(ping_key, newValue) {
    if (!ping_key.startsWith('listener_')
    || this.props[ping_key] === newValue) {
      return true
    }

    const [ trash, listenerName, listenerEvent ] = ping_key.split('_')
    that.listeners[listenerName].event(listenerEvent)
    return true
  }

  shouldComponentUpdate (nextProps, nextState) {
    const isReady = _.get(nextState, 'isReady', false)
    const isRender = !nextState.isReady || !this.isLock
    // console.info('should render ?', isRender)
    if (isRender) { return true }

    _.forEach(nextProps, (value, name) =>
      this.pingListener(name, value))

    return false
  }

  async initiateGame () {
    this.registerGlobalMethods()
    this.instanciateListeners()
    this.instanciateLibraries()
    that.twitch.startListening()
    that.websocket.connect()
    // that.loop.start()
    that.cutscenes = require('../data/cutscenes')
    await that.websocket.connect()
    setTimeout(() => this.setState({ isReady: true }), 100)
  }

  renderEcosystems = () => {}

  render () {
    const isReady = _.get(this, 'state.isReady', false)
    if (isReady) { this.isLock = true }
    return !isReady
      ? null
      : _.map(Components, (Component, index) => <Component key={index} />)
  }
}

const AppConnected = connect(state => ({
  listener_cutscene_cutscene: state.ressources.cutscene.listener_cutscene_cutscene,

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
      <Provider store={store}>
        <AppConnected />
      </Provider>
    </>, document.getElementById('root'))
  }, 100)
})
