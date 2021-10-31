const { that, _ } = require('../../imports')
const { ListenerSuperclass } = require('../../superclass')

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

  shouldInstanciateNewCutscene (current_id, new_id) {
    return new_id !== current_id
    && that.cutscenes[new_id]
    && (!that.cutscene
      || that.cutscene.cutscene_id !== new_id)
  }

  instanciateNewCutscene () {
    const store = that.store.getState()
    const { cutscene_id, cutscene_data } = _.get(store, 'ressources.cutscene', {})
    that.cutscene = new that.cutscenes[cutscene_id]()
  }

  onCutscene (current, next) {
    if (this.shouldInstanciateNewCutscene(
      current.cutscene_id, next.cutscene_id
    )) { this.instanciateNewCutscene() }
  }

  onData (current, next) {
    console.debug('cutscene data changee,', current, next)
  }

}