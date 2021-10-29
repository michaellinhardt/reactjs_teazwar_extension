const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class AuthLibrary extends LibrarySuperclass {
  constructor () { super ('AuthLibrary') }

  getJwtoken () { return _.get(that.getStore(), 'ressources.jwtoken', false) }
  isAuth () { return _.get(that.getStore(), 'ressources.jwtoken', false) }

  logout () {
    that._scene.setSceneName('socket_disconnected')
    that.ressources({ jwtoken: null })
  }
}
