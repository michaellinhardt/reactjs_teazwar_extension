import React from 'react'
import _ from 'lodash'
import Redux from '../../redux'
import dialogues from '../../data/dialogues'
import cfgGame from '../../config/game.config'

import ComponentSuperclass from '../../superclass/component.superclass'
import DialogueOrganism from '../organisms/dialogue.organism'

const { Store, connect } = Redux

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'dialogueEco') }

  initDialogueObject () {
    const store = Store.getState()
    const lang = store.ressources.language
    const { dialogue_id, phrase_id } = store.ressources.dialogue
    if (!dialogue_id || !phrase_id) { return {} }

    const dialogueObjectPath = `${lang}.${dialogue_id}.${phrase_id}`
    this.dialogue = _.get(dialogues, dialogueObjectPath, null)
    if (!this.dialogue) { return {} }

    const {
      face_left,
      face_right,
      // emotion,
      // message,
      // next_phrase_id,
    } = this.dialogue

    this.dialogue.maxLength = face_left || face_right
      ? cfgGame.dialogue.dialogueMaxLengthWithFace
      : cfgGame.dialogue.dialogueMaxLengthFull
    this.dialogue.faceType = face_left ? 'left' : 'none'
    this.dialogue.faceType = face_right ? 'right' : this.dialogue.faceType
    this.dialogue.faceSide = face_left ? 'left' : 'right'

    this.dialogue.onFinish = this.onFinishPhrase
  }

  componentWillUnmount () {}
  componentDidMount () { this.initDialogueObject() }

  shouldComponentUpdate (nextProps) {
    if (this.props.dialogue_id === nextProps.dialogue_id
      && this.props.phrase_id === nextProps.phrase_id
      && this.props.isVisible  === nextProps.isVisible) {
      return false
    }
    return true
  }

  onFinishPhrase () {
    console.debug('phrase is done !')
    const next_phrase_id = this.dialogue.next_phrase_id
    if (next_phrase_id) {
      Store.ressources({ dialogue: { phrase_id: next_phrase_id } })
    }
  }

  render () {
    this.initDialogueObject()
    if (_.isEmpty(this.dialogue)) { return null }

    console.debug('render main dial')

    return <DialogueOrganism
      {...this.dialogue}
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
