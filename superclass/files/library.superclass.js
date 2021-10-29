const { that, _ } = require('../../imports')

module.exports = class LibrarySuperclass {
  constructor (className) {
    this.name = className
    that.helpers.code.autoBindMethod(this)
  }
}