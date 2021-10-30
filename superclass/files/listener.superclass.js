const { that, React, _ } = require('../../imports')

module.exports = class ComponentSuperclass extends React.Component {
  constructor (props) {
    super(props)
    that.helpers.code.autoBindMethod(this)
  }

  render () { return null }

  shouldComponentUpdate () {
    setTimeout(this.onEvent, 100)
    return false
  }

}
