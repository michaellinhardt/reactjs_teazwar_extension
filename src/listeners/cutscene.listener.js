import Redux from '../redux'
import cutscenes from '../data/cutscenes'
import SocketLib from '../library/websocket.library'

import ListenerSuperclass from '../superclass/listener.superclass'
import CutsceneSuperclass from '../superclass/cutscene.superclass'

class EmptyCutscene extends CutsceneSuperclass {}

export default class CutsceneListener extends ListenerSuperclass {
  constructor () {
    super()

    const cutscenePath = 'ressources.cutscene'
    const cutsceneDataPath = `${cutscenePath}.cutscene_data`

    this.trackSchema({
      cutscene_id: `${cutscenePath}.cutscene_id`,
      scene_id: `${cutsceneDataPath}.scene_id`,
    })
  }

  instanciateNewCutscene () {
    const { cutscene_id } = Redux.Store.getState().ressources.cutscene
    this.cutscene = cutscenes[cutscene_id]
      ? new cutscenes[cutscene_id]()
      : new EmptyCutscene(cutscene_id)
  }

  onCutscene (current, next) {
    if (current.cutscene_id !== next.cutscene_id) {
      this.instanciateNewCutscene()
    }
  }

  async onAnswer () {
    const { dialogue, cutscene } = Redux.Store.getState().ressources
    const { answer_id, next_phrase_id } = dialogue.answer || {}
    const { scene_id } = cutscene

    console.debug('answerr produced', scene_id, answer_id, next_phrase_id)

    if (this.cutscene[`${scene_id}_answer`]) {
      await this.cutscene[`${scene_id}_answer`]()

    } else if (next_phrase_id) {
      Redux.Store.ressources({ dialogue: { phrase_id: next_phrase_id } })
    }
  }

  async onExit () {
    const { dialogue, cutscene } = Redux.Store.getState().ressources
    const { answer_id, next_phrase_id } = dialogue.answer || {}
    const { scene_id } = cutscene

    console.debug('cutscene over, last scene reached', scene_id, answer_id, next_phrase_id)

    if (this.cutscene.exit) {
      await this.cutscene.exit()
    }

    await SocketLib.emit('cutscene', 'exit')

    this.cutscene.clearScene()

    delete this.cutscene
  }
}