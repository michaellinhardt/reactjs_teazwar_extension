import React from 'react'
import ComponentSuperclass from '../../superclass/component.superclass'

export default class ImageTilesetMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'imageTilesetMol')
    this.state = { isReady: false }
  }

  cssClasses () { return {
    div: {
      main: [],
      delimiter: [],
    },
    img: {
      tileset: [],
    },
  } }

  componentDidMount () { setTimeout(() => this.setState({ isReady: true }), 10) }

  render () {
    if (!this.state.isReady) { return true }

    const img_tileset_src = this.props.src
    const size = this.props.size.split('x')
    const pos = this.props.pos.split('x')
    const img_tileset_style = {
      width: `${size[0] * 100}%`,
      height: `${size[1] * 100}%`,
      left: `${pos[0] * -100}%`,
      top: `${pos[1] * -100}%`,
    }

    this.img.tileset.src = img_tileset_src
    this.img.tileset.style = img_tileset_style

    return <>
      <div {...this.div.main}>
        <div {...this.div.delimiter}>
          <img {...this.img.tileset} />
        </div>
      </div>
    </>
  }
}
