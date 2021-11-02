import { connect } from 'react-redux'
import React from 'react'
import images from '../../data/images'
import AuthLib from '../../library/auth.library'

import ComponentSuperclass from '../../superclass/component.superclass'
import ImageAtom from '../atoms/image.atom'

class LoadingEcosystem extends ComponentSuperclass {
  constructor(props) {
    super(props, 'loadingEco')
    this.state = { isVisible: true }
  }

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

    const imageDisconnected = images.global.logo_icon_disconnected
    const imageConnected = images.global.logo_icon

    if (!AuthLib.isAuth()) {
      return this.renderImage(imageDisconnected)
    }

    if (isSocketConnected && !isSocketCommunicating) { return null }

    return this.props.isSocketConnected
      ? this.renderImage(imageConnected)
      : this.renderImage(imageDisconnected)
  }
}

export default connect(state => ({
  loadingEco: state.ressources.scene_data.loadingEco.isVisible,

  isSocketConnected: state.ui.isSocketConnected,
  isSocketCommunicating: state.ui.isSocketCommunicating,
  jwtokenTwitch: state.ui.twitch_auth.token,
  jwtokenRessources: state.ressources.jwtoken,

}), null)(LoadingEcosystem)
