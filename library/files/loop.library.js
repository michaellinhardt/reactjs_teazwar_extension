const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class LoopLibrary extends LibrarySuperclass {
  constructor () { super ('LoopLibrary') }

  async start () {
    try {
      await this.loop()
    } catch (err) { console.info(err.message) }

    const itvLoopLibrary = _.get(that, `config.loop.itvLoop`, 1000)
    setTimeout(this.start, itvLoopLibrary)
  }

  async loop () {
    if (this.isForbiddenScene()) { return true }

    if (!that.socket || !that.socket.connected) {
      return that.websocket.connect()
    }

    if (!that.twitch.isAuth()) { return false }

    if (!that.auth.isAuth()) {
      const result = await that.emit('user', 'auth')
      return true
    }

    return true


    // const isAuth = that.auth.isAuth()
    // if (!isAuth) { return this.unAuthLoop() }

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
