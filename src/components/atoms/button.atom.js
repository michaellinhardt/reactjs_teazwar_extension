import React from 'react'

function emptyMethod () { return true }

export default class ButtonAtom extends React.Component {
  render () {

    const style = this.props.style || {}
    const className = this.props.className || ''
    const onClick = this.props.onClick || emptyMethod

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