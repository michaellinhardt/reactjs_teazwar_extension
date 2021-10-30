const { that, _ } = require('../../imports')

module.exports = class CutsceneSuperclass {
  constructor (config) {
    this.name = config.name
    that.helpers.code.autoBindMethod(this)
    this.initScene()
  }

  initScene () {
    const cutscene_data = _.get(that.getStore(), 'ressources.cutscene.cutscene_data', {})
    const scene_name = _.get(cutscene_data, 'scene_name', scene_name_error)
  }

}