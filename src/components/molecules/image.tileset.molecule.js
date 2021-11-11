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

  getPos () {
    if (Array.isArray(this.props.pos)) {
      return this.props.pos
    }

    const sizeX = this.size[0]

    const id = this.props.pos + 1
    const y = Math.ceil(id / sizeX)
    const x = id - (sizeX * (y - 1))

    const realX = x - 1
    const realY = y - 1

    return [realX, realY]
  }

  render () {
    if (!this.state.isReady) { return true }

    this.img_tileset_src = this.props.src
    this.size = this.props.size
    this.pos = this.getPos()

    const img_tileset_style = {
      width: `${this.size[0] * 100}%`,
      height: `${this.size[1] * 100}%`,
      left: `${this.pos[0] * -100}%`,
      top: `${this.pos[1] * -100}%`,
    }

    this.img.tileset.src = this.img_tileset_src
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
