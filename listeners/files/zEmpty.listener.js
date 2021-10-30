const { that, _, connect } = require('../../imports')
const { ListenerSuperclass } = require('../../superclass')

class CutsceneListener extends ListenerSuperclass {
  constructor (props) { super(props, 'dialogueEco') }
  onEvent () {
    console.debug('routine')
  }
}

const CutsceneListenerConnected = connect(state => ({
  cutscene_id: state.ressources.cutscene.cutscene_id,
}), null)(CutsceneListener)
module.exports = CutsceneListenerConnected