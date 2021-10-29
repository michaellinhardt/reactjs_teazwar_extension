const { that, _ } = require('../../imports')

module.exports = class GameSuperclass {
  constructor (className) {
    this.name = className
    that.helpers.code.autoBindMethod(this)
  }
}