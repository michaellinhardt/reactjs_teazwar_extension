const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class LoopLibrary extends LibrarySuperclass {
  constructor () { super ('LoopLibrary') }

  async start () {
    try {
      await this.loop()
    } catch (err) { console.debug(err.message) }

    const itvLoopLibrary = _.get(that, `config.library.itv${this.name}`, 500)
    setTimeout(this.start, itvLoopLibrary)
  }

  async loop () {
    if (this.isForbiddenScene()) { return true }

    if (!that.socket || !that.socket.connected) {
      return that.websocket.connect()
    }

    that.scene('all_hide')

    const isLinked = that.twitch.isLinked()
    if (!isLinked) { return this.unLinkLoop() }


    // const isLogged = that.auth.isLogged()
    // if (!isLogged) { return this.unAuthLoop() }

    // return this.authLoop()
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
    const sceneName = _.get(that.store.getState(), 'ui.scene_name', null)
    return that.config.loop.forbidenScene.includes(sceneName)
  }

}
