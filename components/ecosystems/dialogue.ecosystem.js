const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const DialogueOrganism = require('../organisms/dialogue.organism')

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueEco')
    this.maxLengthWithFace = 350
    this.maxLengthFull = 400
    this.state = { isReady: false }
  }

  initDialogueObject () {
    const store = that.store.getState()
    const lang = _.get(store, 'ressources.language', 'fr')
    const { dialogue_id, phrase_id } = _.get(store, 'ressources.dialogue', {})
    if (!dialogue_id || !phrase_id) { return {} }

    const dialogueObjectPath = `dialogues.${lang}.${dialogue_id}.${phrase_id}`
    const dialogueObject = _.get(that, dialogueObjectPath, null)
    if (!dialogueObject) { return {} }

    const {
      face_left,
      face_right,
      emotion,
      message,
      question,
      next_phrase_id,
    } = dialogueObject

    dialogueObject.maxLength = face_left || face_right ? this.maxLengthWithFace : this.maxLengthFull
    dialogueObject.faceType = face_left ? 'left' : 'none'
    dialogueObject.faceType = face_right ? 'right' : dialogueObject.faceType
    dialogueObject.faceSide = face_left ? 'left' : 'right'

    return dialogueObject
  }

  componentWillUnmount () { this.clearTimeout() }
  componentDidMount () { this.initDialogueObject() }

  shouldComponentUpdate (nextProps, nextState) {
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

const DialogueEcosystemConnected = connect(state => ({
  isVisible: state.ressources.scene_data.dialogueEco.isVisible,
  dialogue_id: state.ressources.dialogue.dialogue_id,
  phrase_id: state.ressources.dialogue.phrase_id,
}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected