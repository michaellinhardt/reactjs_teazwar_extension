const { React, that, _, Img } = require('../../imports')

module.exports = class ImageAtom extends React.Component {
  render () {

    const propSrc = _.get(this, 'props.src', [])
    const src = typeof propSrc === 'string'
      ? [ propSrc ] : propSrc

    src.push(that.images.global.e404)

    const style = _.get(this, 'props.style', {})
    const className = _.get(this, 'props.className', '')

    return <Img
      src={src}
      loader={<img {...this.props} src={that.images.global.loader} className={className} />}
      {...this.props}
      className={className}
      style={style}
    />
  }
}