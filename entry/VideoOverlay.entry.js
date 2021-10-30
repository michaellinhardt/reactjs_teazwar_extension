const { ReactDOM, React, that } = require('../imports')
const { ComponentSuperclass } = require('../superclass')
const { store, ui, inputs, ressources, connect, Provider } = require('../redux')

const ComponentsObject = require('../components')
const Components = []
_.forEach(ComponentsObject, (Component, name) => {
  if (name.endsWith('Ecosystem')) {
    Components.push(Component)
  }
})

class App extends ComponentSuperclass {
  constructor (props) {
    super(props)
    // this.state = { isReady: false }
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
    that.getStore = that.store.getState
    that.logout = this.logout
  }

  componentWillUnmount(){ that.twitch.stopListening() }
  componentDidMount () { return this.initiateGame() }

  async initiateGame () {
    this.registerGlobalMethods()
    this.instanciateLibraries()
    that.twitch.startListening()
    that.websocket.connect()
    // that.loop.start()
    that.cutscenes = require('../data/cutscenes')
    await that.websocket.connect()
    this.setState({ isReady: true })
    // setTimeout(() => this.setState({ isReady: true }), 300)
  }

  renderEcosystems = () => {}

  render () { return _.map(Components, (Component, index) => <Component key={index} />) }
}

const AppConnected = connect(null, dispatch => ({
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
