const { React } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

module.exports = class DialogueFullMolecule extends ComponentSuperclass {
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
      <div className={this.div.dialFull}>
        <div className={this.div.padding}>
          <p className={this.p.dialogue}><span>{this.props.message}</span></p>
        </div>
      </div>
    </>
  }
}
