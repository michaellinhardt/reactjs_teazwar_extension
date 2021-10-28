const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const ImageAtom = require('../atoms/image.atom')

class LoadingEcosystem extends ComponentSuperclass {
  constructor(props) { super(props, 'loadingEco') }

  cssClasses () { return {
    div: {
      main: ['layout_div_topRight_pos', 'anim_heartBeat1'],
    },
    img: {
      logoIcon: [],
    },
  } }

  render () {
    const { isSocketConnected, isSocketCommunicating } = this.props

    if (isSocketConnected && !isSocketCommunicating) { return null }

    const image = this.props.isSocketConnected
      ? that.images.global.logo_icon
      : that.images.global.logo_icon_disconnected

    return <>
        <div className={this.div.main}>
            <ImageAtom
                src={image}
                className={this.img.logoIcon}
            />
        </div>
    </>
  }
}

const LoadingEcosystemConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,
  isSocketCommunicating: state.ui.isSocketCommunicating,

}), dispatch => ({
  setInput: data => dispatch(inputs.actions.setInput(data)),
  setUi: (label, data) => dispatch(ui.actions.setUi(label, data)),
  setUis: data => dispatch(ui.actions.setUis(data)),
  resetRessources: data => dispatch(ressources.actions.resetRessources(data)),
  saveRessources: data => dispatch(ressources.actions.saveRessources(data)),

}))(LoadingEcosystem)

module.exports = LoadingEcosystemConnected