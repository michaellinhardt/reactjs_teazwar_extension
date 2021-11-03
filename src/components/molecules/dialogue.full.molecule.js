import React from 'react'

import ComponentSuperclass from '../../superclass/component.superclass'

export default class DialogueFullMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueFullMol')
  }

  cssClasses () { return {
    div: {
      padding: [],
      dialFull: [ 'layout_div_overflowHidden_style', 'layout_div_boxRPG_style', 'layout_div_shadow80_style' ],
    },
    p: {
      dialogue: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style' ],
    },
  } }

  render () {
    return <>
      <div {...this.div.dialFull}>
        <div {...this.div.padding}>
          <p {...this.p.dialogue}>
            {this.props.children}
          </p>
        </div>
      </div>
    </>
  }
}
