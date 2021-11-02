import React from 'react'
import { Img } from 'react-image'

import images from '../../data/images'

export default class ImageAtom extends React.Component {
  render () {

    const propSrc = this.props.src || []
    const src = typeof propSrc === 'string'
      ? [ propSrc ] : propSrc

    src.push(images.global.e404)

    const style = this.props.style || {}
    const className = this.props.className || ''

    return <Img
      src={src}
      loader={<img {...this.props} src={images.global.loader} className={className} />}
      {...this.props}
      className={className}
      style={style}
    />
  }
}