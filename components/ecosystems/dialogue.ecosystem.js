const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

class DialogueEcosystem extends ComponentSuperclass {
  render () {

    const MainDiv = this.classNames([
      'LayoutDiv_Pos_Bottom',
      'DialogueEcosystem_MainDiv'
    ])

    const BoxFull = this.classNames([
      'LayoutDiv_Pos_Bottom',
      'DialogueEcosystem_Style_BoxFF7',
      'DialogueEcosystem_Pos_BoxFull',
    ])

    const BoxFace = this.classNames([
      'LayoutDiv_Pos_Bottom',
      'DialogueEcosystem_Style_BoxFF7',
      'DialogueEcosystem_Pos_BoxFace',
    ])

    const Text = this.classNames([
      'DialogueEcosystem_Style_Text',
      'DialogueEcosystem_Pos_Text',
    ])

    return <>
        <div className={MainDiv}>

          <div className={BoxFull}>

            <p className={Text}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

          </div>

          {/* <div className={'LayoutDiv_Pos_Bottom DialogueEcosystem_Style_BoxFF7'}>
            <p className={'DialogueEcosystem_Text'}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div> */}

        </div>
    </>
  }
}

const DialogueEcosystemConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,

}), null)(DialogueEcosystem)

module.exports = DialogueEcosystemConnected