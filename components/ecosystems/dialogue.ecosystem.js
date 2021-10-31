const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const DialogueOrganism = require('../organisms/dialogue.organism')

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'dialogueEco') }

  render () {
    return <>
      <DialogueOrganism />
    </>
  }
}

const DialogueEcosystemConnected = connect(state => ({
  isVisible: state.ressources.scene_data.dialogueEco.isVisible,

}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected