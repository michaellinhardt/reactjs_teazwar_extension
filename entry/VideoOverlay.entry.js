const { ReactDOM, React, that } = require('../imports')
const { ComponentSuperclass } = require('../superclass')
const { store, ui, inputs, ressources, connect, Provider } = require('../redux')
const Components = require('../components')

class App extends ComponentSuperclass {
  constructor (props) { super(props) }

  registerGlobalMethods () {
    that.scene = this.scene
    that.inputs = this.props.setInput
    that.ui = this.props.setUi
    that.uis = this.props.setUis
    that.ressources = this.props.saveRessources
    that.cleanRessources = this.props.resetRessources
    that.getStore = that.store.getState
    that.logout = this.logout
  }

  componentWillUnmount(){ that.twitch.stopListening() }
  componentDidMount () {
    this.registerGlobalMethods()
    this.instanciateLibraries()
    that.twitch.startListening()
    that.websocket.connect()
    that.loop.start()
  }

  scene (scene_name) {
    if (scene_name === this.props.scene_name) { return true }
    that.ressources({ scene_name })
  }

  renderSceneEcosystems = () => {
    const scene_data = _.get(that, `scenes.${this.props.scene_name}`, that.scenes.scene_name_error)
    const scene_ecosystems = _.get(scene_data, 'Ecosystems', {})
    return _.map(scene_ecosystems, (props, name) => {
      const Ecosystem = Components[name]
      if (Components[name]) { return (<Ecosystem key={name} {...props} />) }
    })
  }

  render () {
    const LoadingEcosystem = Components['LoadingEcosystem']
    return <>
      <LoadingEcosystem />
      {this.renderSceneEcosystems()}
    </>
  }
}

const AppConnected = connect(state => ({
  scene_name: state.ressources.scene_name,

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
