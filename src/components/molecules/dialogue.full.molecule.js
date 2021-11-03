import React from 'react'

import ComponentSuperclass from '../../superclass/component.superclass'

export default class DialogueFullMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueFullMol')
  }

  cssClasses () { return {
    div: {
      padding: [],
      paddingQuestion: [],
      answers: [],

      dialFull: [ 'layout_div_overflowHidden_style', 'layout_div_boxRPG_style', 'layout_div_shadow80_style' ],
    },
    p: {
      dialogue: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style' ],
      question: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style' ],
    },
  } }

  renderAnswers () {
    // console.debug('render answers:', this.props.answers)
    return this.props.answers
      ? <div {...this.div.answers}>
        {this.props.answers}
      </div> : null
  }

  render () {
    const textStyle = this.props.answers ? this.p.question : this.p.dialogue
    const paddingStyle = this.props.answers ? this.div.paddingQuestion : this.div.padding

    return <>
      <div {...this.div.dialFull}>
        {this.renderAnswers()}
        <div {...paddingStyle}>
          <p {...textStyle}>
            {this.props.message}
          </p>
        </div>
      </div>
    </>
  }
}
