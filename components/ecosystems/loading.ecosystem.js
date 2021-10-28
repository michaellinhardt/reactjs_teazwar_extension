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

  renderImage (image) { return <>
    <div className={this.div.main}>
        <ImageAtom
            src={image}
            className={this.img.logoIcon}
        />
    </div>
  </> }

  render () {
    const { isSocketConnected, isSocketCommunicating } = this.props

    const imageDisconnected = that.images.global.logo_icon_disconnected
    const imageConnected = that.images.global.logo_icon

    if (!that || !that.auth || !that.auth.isAuth()) {
      return this.renderImage(imageDisconnected)
    }

    if (isSocketConnected && !isSocketCommunicating) { return null }

    return this.props.isSocketConnected
     ? this.renderImage(imageConnected)
     : this.renderImage(imageDisconnected)
  }
}

const LoadingEcosystemConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,
  isSocketCommunicating: state.ui.isSocketCommunicating,
  jwtokenTwitch: state.ui.twitch_auth.token,
  jwtokenRessources: state.ressources.jwtoken,

}), dispatch => ({
  setInput: data => dispatch(inputs.actions.setInput(data)),
  setUi: (label, data) => dispatch(ui.actions.setUi(label, data)),
  setUis: data => dispatch(ui.actions.setUis(data)),
  resetRessources: data => dispatch(ressources.actions.resetRessources(data)),
  saveRessources: data => dispatch(ressources.actions.saveRessources(data)),

}))(LoadingEcosystem)

module.exports = LoadingEcosystemConnected