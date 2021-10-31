const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class AuthLibrary extends LibrarySuperclass {
  constructor () { super ('AuthLibrary') }

  getJwtoken () { return _.get(that.store.getState(), 'ressources.jwtoken', false) }
  isAuth () { return _.get(that.store.getState(), 'ressources.jwtoken', false) }

  logout () {
    that.ressources({ jwtoken: null })
  }

  async login () {
    if (that.twitch.getJwtoken() && !this.isAuth()) {
      await that.emit('user', 'auth')
    }
  }
}
