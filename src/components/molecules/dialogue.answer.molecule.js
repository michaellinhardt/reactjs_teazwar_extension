import React from 'react'
import DateHelper from '../../helpers/date.helper'
import Redux from '../../redux'

import ComponentSuperclass from '../../superclass/component.superclass'

class DialogueAnswerMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueAnswerMol')
  }

  cssClasses () { return {
    div: {
      answer: [],

    }, button: {
      answer: [],

    }, span: {
      icon: ['material-icons'],
      answer: [ 'layout_p_boxRPG_style' ],
      answerLock: [ 'layout_p_boxRPG_style' ],
    },
  } }

  onAnswer () {
    Redux.Store.ressources({
      dialogue: { answer: this.props.answerObject },
      cutscene: { listener_cutscene_answer: DateHelper.timestampMs() },
    })
  }

  render () {

    const { answer } = this.props

    this.div.answer.onClick = this.onAnswer

    this.span.icon.children = 'forward'

    this.button.answer.variant = 'primary'
    this.button.answer.size = 'sm'

    if (answer && typeof(answer) === 'object' && this.props.answerObject.answer_id) {

      const isMeChoosen = answer.answer_id === this.props.answerObject.answer_id

      this.span.answer.className = !isMeChoosen
        ? `${this.span.answer.className} answer_lock`
        : this.span.answer.className

      this.span.icon.className = !isMeChoosen
        ? 'icon_lock'
        : `${this.span.icon.className} icon_selected`

      this.div.answer.onClick = () => true

    }

    return <>

      <div {...this.div.answer}>
        <button {...this.button.answer}>
          <span {...this.span.answer}>
            <span {...this.span.icon} />
            {this.props.answerObject.answer}
          </span>
        </button>
      </div>
    </>
  }
}

export default Redux.connect(state => ({
  answer: state.ressources.dialogue.answer,

}), null)(DialogueAnswerMolecule)