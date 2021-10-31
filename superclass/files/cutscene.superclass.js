const { that, _ } = require('../../imports')

module.exports = class CutsceneSuperclass {
  constructor (cutscene_id) {
    this.cutscene_id = cutscene_id
    console.debug('i am ', this.cutscene_id)
    that.helpers.code.autoBindMethod(this)
    this.initScene()
  }

  initScene () {
    const store = that.store.getState()
    const cutscene_data = _.get(store, 'ressources.cutscene.cutscene_data', {})
    const cutscene_scene_id = _.get(cutscene_data, 'cutscene_scene_id', 'entry')

    if (cutscene_scene_id === this.cutscene_scene_id) { return false }

    console.debug('iniet cutscene_scene_id' ,cutscene_scene_id)
  }
}