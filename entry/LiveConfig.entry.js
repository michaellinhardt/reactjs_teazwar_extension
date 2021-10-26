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