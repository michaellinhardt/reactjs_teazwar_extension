import React from 'react'
import StringHelper from '../../helpers/string.helper'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default class ButtonAtom extends React.Component {
  render () {

    const style = this.props.style || {}
    const className = this.props.className || ''
    const id = `tooltip-${StringHelper.uuid()}`

    const tooltip = {
      style,
      className,
      id,
      children: this.props.tooltip,
    }

    return <>
      <OverlayTrigger overlay={<Tooltip {...tooltip} />}>
        <span className="d-inline-block">
          {this.props.children}
        </span>
      </OverlayTrigger>
    </>}
}