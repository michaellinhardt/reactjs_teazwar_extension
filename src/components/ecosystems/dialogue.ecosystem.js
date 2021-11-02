import React from 'react'
import _ from 'lodash'
import Redux from '../../redux'
import dialogues from '../../data/dialogues'

const { Store, connect } = Redux

import ComponentSuperclass from '../../superclass/component.superclass'
import DialogueOrganism from '../organisms/dialogue.organism'

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueEco')
    this.maxLengthWithFace = 350
    this.maxLengthFull = 400
    this.state = { isReady: false }
  }

  initDialogueObject () {
    const store = Store.getState()
    const lang = store.ressources.language
    const { dialogue_id, phrase_id } = store.ressources.dialogue
    if (!dialogue_id || !phrase_id) { return {} }

    const dialogueObjectPath = `${lang}.${dialogue_id}.${phrase_id}`
    const dialogueObject = _.get(dialogues, dialogueObjectPath, null)
    if (!dialogueObject) { return {} }

    const {
      face_left,
      face_right,
      // emotion,
      // message,
      // question,
      // next_phrase_id,
    } = dialogueObject

    dialogueObject.maxLength = face_left || face_right ? this.maxLengthWithFace : this.maxLengthFull
    dialogueObject.faceType = face_left ? 'left' : 'none'
    dialogueObject.faceType = face_right ? 'right' : dialogueObject.faceType
    dialogueObject.faceSide = face_left ? 'left' : 'right'

    return dialogueObject
  }

  componentWillUnmount () { this.clearTimeout() }
  componentDidMount () { this.initDialogueObject() }

  shouldComponentUpdate (nextProps) {
    if (this.props.dialogue_id === nextProps.dialogue_id
      && this.props.phrase_id === nextProps.phrase_id
      && this.props.isVisible  === nextProps.isVisible) {
      return false
    }
    return true
  }


  render () {
    const dialogueObject = this.initDialogueObject()
    if (_.isEmpty(dialogueObject)) { return null }


    return <DialogueOrganism
      {...dialogueObject}
      dialogue_id={this.props.dialogue_id}
      phrase_id={this.props.phrase_id}
    />
  }
}

export default connect(state => ({
  isVisible: state.ressources.scene_data.dialogueEco.isVisible,
  dialogue_id: state.ressources.dialogue.dialogue_id,
  phrase_id: state.ressources.dialogue.phrase_id,

}), null)(DialogueEcosystem)
