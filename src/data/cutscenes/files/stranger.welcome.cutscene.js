import CutsceneSuperclass from '../../../superclass/cutscene.superclass'
import Redux from '../../../redux'

export default class extends CutsceneSuperclass {
  constructor () {
    super('stranger_welcome')
  }

  // entry () {
  //   console.debug('i am entry scene from', this.cutscene_id)
  // }

  entry_answer () {
    const { dialogue, cutscene } = Redux.Store.getState().ressources
    const { answer_id, next_phrase_id } = dialogue.answer || {}
    // const { scene_id } = cutscene

    console.debug('i am edntry answer handler from scene', this.cutscene_id, answer_id)
    Redux.Store.ressources({ dialogue: { phrase_id: next_phrase_id } })
  }

  exit () {
    console.debug('deddicated exit routine for', this.cutscene_id)
  }
}
