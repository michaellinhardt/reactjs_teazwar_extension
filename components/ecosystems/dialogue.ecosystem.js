const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const DialogueOrganism = require('../organisms/dialogue.organism')

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'dialogueEco') }

  // cssClasses () { return {} }

  render () {

    return <>
      <DialogueOrganism />
    </>
  }
}

const DialogueEcosystemConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,

}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected