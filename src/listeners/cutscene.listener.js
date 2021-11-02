import Redux from '../redux'
import cutscenes from '../data/cutscenes'

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

  onData (current, next) {
    console.debug('cutscene data changee,', current, next)
  }

}