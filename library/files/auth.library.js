const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class AuthLibrary extends LibrarySuperclass {
  constructor () { super ('AuthLibrary') }

  async run () {
    console.debug('running Auth method...')
  }

  isLogged () {
    return _.get(that.getStore(), 'ressources.jwtoken', false)
  }

  // LOGOUT METHOD, CAN BE CALL ANYWHERE (MAY MOVE TO LIBRARY LATER)
  async logout () {
    that.call('user', 'getUserLogout', {})
    await that.ressources({ jwtoken: { isValidated: false } })
  }

  async login () {
    // console.debug('login')
  }

  async link () {
    // console.debug('link')
  }

}
