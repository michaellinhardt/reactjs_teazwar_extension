import CutsceneSuperclass from '../../../superclass/cutscene.superclass'

export default class extends CutsceneSuperclass {
  constructor () {
    super('stranger_welcome')
  }

  entry () {
    console.debug('i am entry scene from', this.cutscene_id)
  }
}
