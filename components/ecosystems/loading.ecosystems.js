const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const ImageAtom = require('../atoms/image.atom')

class LoadingEcosystems extends ComponentSuperclass {
  render () {


    const image = this.props.isSocketConnected
      ? that.images.global.logo_icon
      : that.images.global.logo_icon_disconnected

      console.debug('render loading eco', image)

    return <>
        <div className={'LayoutDiv_TopRight LoadingEcosystems_MainDiv AnimHeartbeat2'}>
            <ImageAtom
                src={image}
                className={'LoadingEcosystems_LogoIcon'}
            />
        </div>
    </>
  }
}

const LoadingEcosystemsConnected = connect(state => ({
  isSocketConnected: state.ui.isSocketConnected,

}), dispatch => ({
  setInput: data => dispatch(inputs.actions.setInput(data)),
  setUi: (label, data) => dispatch(ui.actions.setUi(label, data)),
  setUis: data => dispatch(ui.actions.setUis(data)),
  resetRessources: data => dispatch(ressources.actions.resetRessources(data)),
  saveRessources: data => dispatch(ressources.actions.saveRessources(data)),

}))(LoadingEcosystems)

module.exports = LoadingEcosystemsConnected