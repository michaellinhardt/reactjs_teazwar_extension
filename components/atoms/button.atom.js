const { React, that, _ } = require('../../imports')

module.exports = class ButtonAtom extends React.Component {
  render () {

    const style = _.get(this, 'props.style', {})
    const className = `${_.get(this, 'props.className', '')}`
    const onClick = _.get(this, 'props.onClick', () => true)

    return <>
      <button
        onClick={onClick}
        style={style}
        className={className}
      >
        {(this.props.iconLeft ? <>

          <span className="material-icons layout_span_btnIconTransparentIcon_style">{this.props.iconLeft}</span>&nbsp;

        </> : null)}
        <div className="layout_div_btnIconTransparentText_style">{this.props.children}</div>
      </button>
    </>}
}