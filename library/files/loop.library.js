const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class LoopLibrary extends LibrarySuperclass {
  constructor () { super ('LoopLibrary') }

  startLoop () {
    this.loop()

    const isInterval = _.get(that, 'globals.loopInterval', null)
    if (!isInterval) {
      const itvLoopLibrary = _.get(that, `config.library.itv${this.name}`, 1000)
      _.set(that, 'globals.loopInterval',
        setInterval(this.loop, itvLoopLibrary))
    }
  }

  async loop () {
    if (this.isForbiddenScene()) {
      return true
    }

    const isLinked = that.auth.isLinked()
    if (!isLinked) { return this.unLinkLoop() }


    const isLogged = that.auth.isLogged()
    if (!isLogged) { return this.unAuthLoop() }

    return this.authLoop()
  }

  async unLinkLoop() {
    return that.auth.link()
  }

  async unAuthLoop() {
    return that.auth.login()
  }

  async authLoop() {
    return console.debug('auth loop')
  }

  isForbiddenScene () {
    return that.config.loop.forbidenScene.includes(that.sceneName())
  }

}
