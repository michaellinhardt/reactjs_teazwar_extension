const { ReactDOM, React, that } = require('../imports')
const { ComponentSuperclass } = require('../superclass')

class App extends ComponentSuperclass {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.instanciateLibraries()
  }

  render () {
    return <>
      <div className='App'>
        <p>{that.lang('menu', 'hello', 'world')}</p>
      </div>
    </>
  }
}

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }, 1)
})
