const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const ImageTilesetMolecule = require('../molecules/image.tileset.molecule')

class DialogueEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'dialogueEco') }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      padding: [],
      dialFull: [ 'layout_div_fullWH_pos', 'layout_div_boxFF7_style', ],

      titleLeft: [ 'layout_div_top_pos' ],
      faceLeft: [ 'layout_div_boxFF7_style', 'layout_div_floatLeft_pos' ],
      dialRight: [ 'layout_div_boxFF7_style', 'layout_div_floatRight_pos' ],
    },
    p: {
      dialogue: [ 'layout_p_boxFF7_style', 'layout_p_noSelect_style' ],
    },
  } }

  renderDialogueFull = <>
    <div className={this.div.dialFull}>
      <div className={this.div.padding}>
        <p className={this.p.dialogue}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
      </div>
    </div>
  </>

  renderDialogueFaceLeft = <>
    <div className={this.div.titleLeft}>
      <p className={this.p.dialogue}>TeazYou</p>
    </div>
    <div className={this.div.faceLeft}>
        <ImageTilesetMolecule
          src={that.images.global.face_example}
          size={'4x2'}
          pos={'0x0'}
        />
    </div>
    <div className={this.div.dialRight}>
      <div className={this.div.padding}>
        <p className={this.p.dialogue}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
      </div>
    </div>
  </>

  render () {

    return <>
        <div className={this.div.main}>
          {this.renderDialogueFaceLeft}
        </div>
    </>
  }
}

const DialogueEcosystemConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,

}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected