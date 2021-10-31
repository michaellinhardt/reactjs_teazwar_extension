const { that, _ } = require('../../imports')
const { ListenerSuperclass } = require('../../superclass')

module.exports = class CutsceneListener extends ListenerSuperclass {
  constructor () {
    super()

    const cutscenePath = 'ressources.cutscene'
    const cutsceneDataPath = 'ressources.cutscene.cutscene_data'

    this.trackSchema({
      cutscene_id: `${cutscenePath}.cutscene_id`,
      cutscene_scene_id: `${cutsceneDataPath}.cutscene_scene_id`,
    })
  }

  shouldInstanciateNewCutscene (current_id, new_id) {
    return new_id !== current_id
    && that.cutscenes[new_id]
    && (!that.cutscene
      || that.cutscene.cutscene_id !== new_id)
  }

  onCutscene (current, next) {
    this.isNewCutscene = false
    this.isNewCutsceneScene = false

    if (this.shouldInstanciateNewCutscene(
      current.cutscene_id, next.cutscene_id
    )) { this.instanciateNewCutscene() }

      // CHANGE SCENE INSIDE CUTSCENE IF NEDED ( by reading cutscene data and compare with current cutscene data )
  }

  instanciateNewCutscene () {
    const store = that.store.getState()
    const { cutscene_id, cutscene_data } = _.get(store, 'ressources.cutscene', {})
    that.cutscene = new that.cutscenes[cutscene_id](cutscene_data)
    this.isNewCutscene = true
  }

}