import React from 'react'

import ComponentSuperclass from '../../superclass/component.superclass'
import ImageTilesetMolecule from './image.tileset.molecule'

export default class DialogueFaceMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueFaceMol')
  }

  cssClasses () { return {
    div: {
      padding: [],
      paddingQuestion: [],

      answers: [],

      titleLeft: [ 'layout_div_bottom_pos' ],
      faceLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
      dialRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],

      titleRight: [ 'layout_div_bottom_pos' ],
      faceRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],
      dialLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
    },
    p: {
      title: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style', 'layout_p_strokeBlack_style' ],
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

  renderMessage () {
    const textStyle = this.props.answers ? this.p.question : this.p.dialogue
    const paddingStyle = this.props.answers ? this.div.paddingQuestion : this.div.padding
    return <>
      <div {...paddingStyle}>
        <p {...textStyle}>
          {this.props.message}
        </p>
      </div>
    </>}

  renderFace () { return <>
    <ImageTilesetMolecule
      src={this.props.face_src}
      size={this.props.face_size}
      pos={this.props.face_pos}
    />
  </>}

  renderRight () {
    return <>
      <div {...this.div.dialLeft}>
        {this.renderAnswers()}
        {this.renderMessage()}
      </div>
      <div {...this.div.faceRight}>
        {this.renderFace()}
      </div>
      <div {...this.div.titleRight}>
        <p {...this.p.title}>{this.props.face}</p>
      </div>
    </>
  }

  renderLeft () {
    return <>
      <div {...this.div.dialRight}>
        {this.renderAnswers()}
        {this.renderMessage()}
      </div>
      <div {...this.div.faceLeft}>
        {this.renderFace()}
      </div>
      <div {...this.div.titleLeft}>
        <p {...this.p.title}>{this.props.face}</p>
      </div>
    </>
  }

  render () {
    return this.props.face_side === 'left'
      ? this.renderLeft()
      : this.renderRight()
  }
}
