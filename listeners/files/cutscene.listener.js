const { that, _ } = require('../../imports')
const { ListenerSuperclass, CutsceneSuperclass } = require('../../superclass')

class EmptyCutscene extends CutsceneSuperclass {}

module.exports = class CutsceneListener extends ListenerSuperclass {
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
    const store = that.store.getState()
    const { cutscene_id, cutscene_data } = _.get(store, 'ressources.cutscene', {})
    that.cutscene = that.cutscenes[cutscene_id]
      ? new that.cutscenes[cutscene_id]()
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