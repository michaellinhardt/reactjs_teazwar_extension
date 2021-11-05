import React from 'react'
import ComponentSuperclass from '../../superclass/component.superclass'
import cfgGame from '../../config/game.config'
import CodeHelper from '../../helpers/code.helper'

export default class TypewriterMolecule extends ComponentSuperclass {
  constructor (props) {
    super(props, 'typewriterMol')
  }

  componentDidMount () { this.resetText() }
  componentWillUnmount () { this.stopLoop() }

  clearTimeout () {
    if (this.itv) { clearTimeout(this.itv) }
    if (this.itv2) { clearTimeout(this.itv2) }
    this.itv = null
    this.itv2 = null
  }

  async loop () {
    this.clearTimeout()
    if (!this.status) { return false }

    this.animate()
    if (!this.status) { return false }

    this.itv = setTimeout(this.loop, cfgGame.dialogue.animateSpeed)
  }

  startLoop () {
    this.clearTimeout()
    this.status = true
    this.loop()
  }

  stopLoop () {
    this.clearTimeout()
    this.status = false
  }

  async onFinish () {
    if (this.props.isSkip) {
      await CodeHelper.sleep(cfgGame.dialogue.autoSkipSpeed)
    }
    this.props.onFinish()
  }

  animate () {
    if (this.state.buffer === this.props.message) {
      this.onFinish()
      return this.stopLoop()
    }

    if (this.props.phrase_id !== this.state.phrase_id) {
      return this.stopLoop()
    }

    if (this.props.isInstant) {
      return this.setState({ buffer: this.props.message })
    }

    const bufferLength = this.state.buffer.length
    const nextChar = this.props.message[bufferLength]
    const buffer = `${this.state.buffer}${nextChar}`

    return this.setState({ buffer })
  }

  resetText () {
    this.stopLoop()
    this.setState({
      buffer: '',
      message: this.props.message,
    })
    setTimeout(this.startLoop, 50)
  }

  render () {
    if (this.props.message !== this.state.message) {
      this.itv2 = setTimeout(this.resetText, 50)
      return null
    }

    const props = {
      className: this.props.className || '',
      style: this.props.style || {},
      children: this.state.buffer,
    }

    return <span {...props} />
  }
}
