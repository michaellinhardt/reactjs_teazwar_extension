const { _ } = require('../../imports')

module.exports = class api {
  getUser () { return this.get('/user', this.token) }
}
