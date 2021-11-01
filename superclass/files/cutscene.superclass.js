const scene = require('../../data/scenes')
const { that, _ } = require('../../imports')

module.exports = class CutsceneSuperclass {
  constructor (cutscene_id) {
    this.cutscene_id = cutscene_id
    that.helpers.code.autoBindMethod(this)
    this.initScene()
  }

  initScene () {
    const store = that.store.getState()
    const cutscene = _.get(store, 'ressources.cutscene', {})
    const scene_id = cutscene.scene_id
    if (scene_id === this.scene_id || !this[scene_id]) { return false }

    const scene_data = this.initSceneData(scene_id)
    const dialogue = this.initSceneDialogue(cutscene.cutscene_id, scene_id)

    that.ressources({ scene_data, dialogue })

    if (this[scene_id]) { this[scene_id]() }
  }

  initSceneData (scene_id) {

    const cutscene_scene_layout = _.get(that, `scenes.${this.cutscene_id}`, {})
    const scene_layout = _.get(that, `scenes.${this.cutscene_id}_${scene_id}`, null)

    const scene_data = scene_layout ? scene_layout : cutscene_scene_layout

    return scene_data
  }

  initSceneDialogue (dialogue_id, phrase_id) {
    const dialogue = { dialogue_id, phrase_id }
    return dialogue
  }
}