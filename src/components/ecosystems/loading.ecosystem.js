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


  render () {
    const { isSocketConnected, isSocketCommunicating } = this.props
    if (isSocketConnected && !isSocketCommunicating) { return null }

    const imageDisconnected = images.global.logo_icon_disconnected
    const imageConnected = images.global.logo_icon

    if (!AuthLib.isAuth()) {
      this.img.logoIcon.src = imageDisconnected

    } else {
      this.img.logoIcon.src = this.props.isSocketConnected
        ? imageConnected : imageDisconnected
    }

    return <>
      <div {...this.div.main}>
        <ImageAtom {...this.img.logoIcon} />
      </div>
    </>
  }
}

export default connect(state => ({
  loadingEco: state.ressources.scene_data.loadingEco.isVisible,

  isSocketConnected: state.ui.isSocketConnected,
  isSocketCommunicating: state.ui.isSocketCommunicating,
  jwtokenTwitch: state.ui.twitch_auth.token,
  jwtokenRessources: state.ressources.jwtoken,

}), null)(LoadingEcosystem)
