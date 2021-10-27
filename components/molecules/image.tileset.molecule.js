const { React } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

module.exports = class ImageTilesetMolecule extends ComponentSuperclass {
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

  componentDidMount () {
    setTimeout(() => this.setState({isReady: true}), 1)
  }

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

    return <>
        <div className={this.div.main}>
          <div className={this.div.delimiter}>
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