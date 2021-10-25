import ReactDOM from 'react-dom'
import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <>
      <div className='App'>
        <p>Hello world!</p>
        <p>{this.entry}</p>
      </div>
    </>
  }
}

setTimeout(() => { ReactDOM.render( <App />, document.getElementById('root')) }, 1)