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
    const cutscene = _.get(store, 'ressources.cutscene', {})

    const scene_id = cutscene.scene_id
    if (scene_id === this.scene_id || !this[scene_id]) { return false }

    const cutscene_scene_layout = _.get(that, `scenes.${this.cutscene_id}`, {})
    const scene_layout = _.get(that, `scenes.${this.cutscene_id}_${scene_id}`, null)

    const scene_data = scene_layout ? scene_layout : cutscene_scene_layout

    console.debug('scene_data', scene_data)

    // inject scene data

    this[scene_id]()

  }
}