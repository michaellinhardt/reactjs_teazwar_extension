// import Redux from '../redux'

import ListenerSuperclass from '../superclass/listener.superclass'

export default class CutsceneListener extends ListenerSuperclass {
  constructor () {
    super()

    // const generatorPath = 'ressources.generator'

    this.trackSchema({
      isVisible: 'ressources.scene_data.generatorEco.isVisible',
    })
  }

  // onStatus (current) {
  //   const isOpenSwitchStatus = current.isOpen ? false : true
  //   Redux.Store.ressources({ generator: { isOpen: isOpenSwitchStatus }})
  // }

}