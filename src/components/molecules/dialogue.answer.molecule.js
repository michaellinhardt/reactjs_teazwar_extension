import React from 'react'

import ComponentSuperclass from '../../superclass/component.superclass'
import ButtonBootstrap from 'react-bootstrap/Button'

export default class DialogueAnswerMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueAnswerMol')
  }

  cssClasses () { return {
    div: {
      answer: ['d-grid'],
    },
    button: {
      answer: [],

    }, span: {
      answer: [],
    },
  } }

  render () {

    this.span.answer.children = this.props.answerObject.answer

    this.button.answer.children = <span {...this.span.answer} />
    this.button.answer.variant = 'primary'
    // this.button.answer.size = 'sm'

    return <>

      <div {...this.div.answer}>
        <ButtonBootstrap {...this.button.answer} />
      </div>
    </>
  }
}
