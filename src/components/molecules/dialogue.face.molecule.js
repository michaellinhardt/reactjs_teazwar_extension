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

      titleLeft: [ 'layout_div_top_pos' ],
      faceLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
      dialRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],

      titleRight: [ 'layout_div_top_pos' ],
      faceRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],
      dialLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
    },
    p: {
      dialogue: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style' ],
    },
  } }

  renderMessage () { return <>
    <div className={this.div.padding}>
      <p className={this.p.dialogue}><span>{this.props.message}</span></p>
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
      <div className={this.div.dialLeft}>
        {this.renderMessage()}
      </div>
      <div className={this.div.titleRight}>
        <p className={this.p.dialogue}>{this.props.face}</p>
      </div>
      <div className={this.div.faceRight}>
        {this.renderFace()}
      </div>
    </>
  }

  renderLeft () {
    return <>
      <div className={this.div.dialRight}>
        {this.renderMessage()}
      </div>
      <div className={this.div.titleLeft}>
        <p className={this.p.dialogue}>{this.props.face}</p>
      </div>
      <div className={this.div.faceLeft}>
        {this.renderFace()}
      </div>
    </>
  }

  render () {
    return this.props.face_side === 'left'
      ? this.renderLeft()
      : this.renderRight()
  }
}
