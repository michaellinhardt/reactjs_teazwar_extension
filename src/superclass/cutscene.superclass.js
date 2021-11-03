import Redux from '../redux'
import CodeHelper from '../helpers/code.helper'
import scenes from '../data/scenes'

export default class CutsceneSuperclass {
  constructor (cutscene_id) {
    this.cutscene_id = cutscene_id
    CodeHelper.autoBindMethod(this)
    this.initScene()
  }

  initScene () {
    const cutscene = Redux.Store.getState().ressources.cutscene
    const scene_id = cutscene.scene_id
    if (scene_id === this.scene_id) { return false }

    const scene_data = this.initSceneData(scene_id)
    const dialogue = this.initSceneDialogue(cutscene.cutscene_id, scene_id)

    Redux.Store.ressources({ scene_data, dialogue })

    if (this[scene_id]) { this[scene_id]() }
  }

  initSceneData (scene_id) {

    const cutscene_scene_layout = scenes[this.cutscene_id] || {}
    const scene_layout = scenes[`${this.cutscene_id}_${scene_id}`] || null

    const scene_data = scene_layout ? scene_layout : cutscene_scene_layout

    return scene_data
  }

  initSceneDialogue (dialogue_id, phrase_id) {
    const dialogue = { dialogue_id, phrase_id }
    return dialogue
  }

  clearScene () {
    Redux.Store.ressources({
      dialogue: {
        dialogue_id: null,
        phrase_id: null,
        answer: null,
      },
      cutscene: {
        cutscene_id: null,
        scene_id: null,
      },
    })
  }

}