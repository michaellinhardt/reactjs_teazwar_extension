const { React, that, _, connect } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

module.exports = class ImageTilesetMolecule extends ComponentSuperclass {
  constructor (props) { super(props, 'imageTilesetMol') }

  cssClasses () { return {
    div: {
      main: [],
      faceSize: [],
    },
    img: {
      tileset: [],
    },
  } }

  render () {

    const img_tileset_src = this.props.src
    const size = this.props.size.split('x')
    const pos = this.props.pos.split('x')
    const img_tileset_style = {
      width: `${size[0] * 100}%`,
      height: `${size[1] * 100}%`,
      left: `${pos[0] * -100}%`,
      top: `${pos[1] * -100}%`,
    }

    return <>
        <div className={this.div.faceSize}>
          <div
            className={this.div.main}
            // style={{backgroundImage:  `url(${that.images.global.face_example})`}}
          >
              <img
                className={this.img.tileset}
                src={img_tileset_src}
                style={{...img_tileset_style}}
              />
          </div>
      </div>
    </>
  }
}

// const ImageTilesetMoleculeConnected = connect(state => ({
//   isSocketConnected: state.ui.isSocketConnected,

// }), null)(ImageTilesetMolecule)

// module.exports = ImageTilesetMoleculeConnected