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

  renderChildren () { return <>
    <div {...this.div.padding}>
      <p {...this.p.dialogue}>
        {this.props.children}
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
        {this.renderChildren()}
      </div>
      <div {...this.div.titleRight}>
        <p {...this.p.dialogue}>{this.props.face}</p>
      </div>
      <div {...this.div.faceRight}>
        {this.renderFace()}
      </div>
    </>
  }

  renderLeft () {
    return <>
      <div {...this.div.dialRight}>
        {this.renderChildren()}
      </div>
      <div {...this.div.titleLeft}>
        <p {...this.p.dialogue}>{this.props.face}</p>
      </div>
      <div {...this.div.faceLeft}>
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
