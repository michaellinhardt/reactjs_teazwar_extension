const { that, _ } = require('../../imports')

module.exports = class CutsceneSuperclass {
  constructor (config) {
    this.name = config.name
    that.helpers.code.autoBindMethod(this)
  }

  getName () { return this.name }
  getSceneName () { return this.scene_name }

}