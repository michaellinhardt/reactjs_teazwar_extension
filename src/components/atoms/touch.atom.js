import React from 'react'
import gameConfig from '../../config/game.config'
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import stringHelper from '../../helpers/string.helper'

export default class ButtonAtom extends React.Component {
  constructor(props) {
    super(props)
    this.state = { iteration: 0 }
  }

  clearTimeout () {
    if (this.itv) { clearTimeout(this.itv) }
    this.itv = null
  }

  iterate () {
    const { iteration } = this.state
    const newIteration = iteration + gameConfig.ui.itvTouchIterate

    if (newIteration >= gameConfig.ui.itvTouchActivate) {
      const args = this.props.onTouchArgs || []
      this.props.onTouch(...args)
      return this.stopLoop()
    }

    this.setState({ iteration: newIteration })
  }

  async loop () {
    this.clearTimeout()
    if (!this.status) { return false }

    this.iterate()
    if (!this.status) { return false }

    this.itv = setTimeout(this.loop.bind(this), gameConfig.ui.itvTouchIterate)
  }

  startLoop () {
    this.setState({ iteration: 0 })
    this.clearTimeout()
    this.status = true
    this.loop()
  }

  stopLoop () {
    this.clearTimeout()
    this.status = false
    this.setState({ iteration: 0 })
  }

  componentDidMount () {
    this.div = {
      style: this.props.style || {},
      className: `${(this.props.className || '')} touchAto_div_main_pos touchAto_div_main_style`,
      onMouseEnter: this.startLoop.bind(this),
      onMouseOut: this.stopLoop.bind(this),
    }



    this.tooltipId = `tooltip_${stringHelper.uuid()}`
    this.setState({ isReady: true })
  }

  render () {
    if (!this.state.isReady) { return null }

    const { itvTouchActivate } = gameConfig.ui

    const percentage = parseInt(100 / itvTouchActivate * this.state.iteration, 10)

    return <>
      <span {...this.div}>
        <OverlayTrigger placement={'auto'} overlay={<Tooltip id={this.tooltipId}><ProgressBar style={{width: '5vh'}} now={percentage} /></Tooltip>}>
          <span>
            {this.props.children}
          </span>
        </OverlayTrigger>
      </span>
    </>
  }
}