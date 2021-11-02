const { React, that, _ } = require('../../imports')

const OverlayTrigger = require('react-bootstrap/OverlayTrigger').default
const Tooltip = require('react-bootstrap/Tooltip').default

const h = require('./../../helpers')

module.exports = class ButtonAtom extends React.Component {
  render () {

    const style = _.get(this, 'props.style', {})
    const className = `${_.get(this, 'props.className', '')}`
    const id = `tooltip-${h.string.uuid()}`

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