import React from 'react'
import Image from 'react-bootstrap/Image'

export default class ImageAtom extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isReady: false }
  }

  componentDidMount () { this.setState({ isReady: true })}

  render () {
    if (!this.state.isReady) { return null }

    const props = {
      ...this.props,
      src: this.props.src,
      style: this.props.style || {},
      className: this.props.className || '',

    }

    return <Image {...props} />
  }
}