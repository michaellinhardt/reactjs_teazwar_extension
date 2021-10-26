const { ReactDOM, React, that } = require('../imports')
const { ComponentSuperclass } = require('../superclass')
const { store, ui, inputs, ressources, connect, Provider } = require('../redux')

class App extends ComponentSuperclass {
  constructor (props) { super(props) }

  registerGlobalMethods () {
    that.inputs = this.props.setInput
    that.ui = this.props.setUi
    that.uis = this.props.setUis
    that.ressources = this.props.saveRessources
    that.cleanRessources = this.props.resetRessources
    that.getStore = that.store.getState
  }

  componentWillUnmount(){ this.twitch.stopListening() }
  componentDidMount () {
    this.registerGlobalMethods()
    this.instanciateLibraries()
    that.twitch.startListening()
  }

  render () {
    return <>
      <div className='App'>
        <p>{that.lang('menu', 'hello', 'world')}</p>
      </div>
    </>
  }
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
  }, 1)
})
