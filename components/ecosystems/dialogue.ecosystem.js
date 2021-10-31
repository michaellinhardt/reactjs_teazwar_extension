const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const DialogueOrganism = require('../organisms/dialogue.organism')

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'dialogueEco') }

  render () {
    return <DialogueOrganism
      dialogue_id={this.props.dialogue_id}
      phrase_id={this.props.phrase_id}
    />
  }
}

const DialogueEcosystemConnected = connect(state => ({
  isVisible: state.ressources.scene_data.dialogueEco.isVisible,
  dialogue_id: state.ressources.dialogue.dialogue_id,
  phrase_id: state.ressources.dialogue.phrase_id,
}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected