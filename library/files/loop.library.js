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
    if (this.isForbiddenScene()) { return false }

    const result = await that._loop.run()
    return result
  }

  isForbiddenScene () {
    const sceneName = that._scene.getSceneName()
    return that.config.loop.forbidenScene.includes(sceneName)
  }

}
