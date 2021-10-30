const { that, React, _ } = require('../../imports')

module.exports = class ListenerSuperclass extends React.Component {
  constructor (config) {
    this.name = config.name
    that.helpers.code.autoBindMethod(this)
  }

}