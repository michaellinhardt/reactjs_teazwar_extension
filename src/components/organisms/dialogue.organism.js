import { Animated } from 'react-animated-css'
import React from 'react'
import images from '../../data/images'
// import cfgGame from '../../config/game.config'
// import Redux from '../../redux'
import LanguageHelper from '../../helpers/language.helper'

import ComponentSuperclass from '../../superclass/component.superclass'
import ButtonAtom from '../atoms/button.atom'
import Tooltip from '../atoms/tooltip.atom'
import Typewriter from '../molecules/typewriter.molecule'

import face from '../molecules/dialogue.face.molecule'
import none from '../molecules/dialogue.full.molecule'
const DialogueTypeFaceMol = { left: face, right: face, none }

// const { Store } = Redux

export default class DialogueOrganism extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueOrg')

    this.tooltipSkip = { tooltip: LanguageHelper.lang('button', 'dialogueSkip') }
    this.tooltipNext = { tooltip: LanguageHelper.lang('button', 'dialogueNext') }

    this.button.next.iconLeft = 'forward'
    this.button.next.onClick = this.onClickNext

    this.button.skip.iconLeft = 'fast_forward'
    this.button.skip.onClick = this.onClickSkip
  }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      animated: ['layout_div_fullWH_pos'],

      skipLeft: ['layout_div_top_pos', 'layout_div_floatLeft_pos'],
      skipRight: ['layout_div_top_pos', 'layout_div_floatRight_pos'],

    }, span: {
      typewriter: [],

    }, button: {
      next: ['layout_button_btnIconTransparent_style'],
      skip: ['layout_button_btnIconTransparent_style'],
    } } }

  componentWillUnmount () {}
  componentDidMount () { this.setState({ isReady: true }) }

  onFinishTypewriter () {
    console.debug('typewriter finish')
    this.isAnimationOver = true
    if (this.isSkip) { this.onClickNext() }
  }

  onClickSkip () {
    console.debug('skip mode')
    this.isSkip = true
    this.isInstant = true

    if (this.isAnimationOver) {
      this.onClickNext()

    } else { this.setState({ reRender: true }) }
  }

  onFinish () { this.props.onFinish() }

  onClickNext () {
    if (this.isAnimationOver || this.isInstant) {
      this.messages.shift()
      if (!this.messages.length) {
        console.debug('no more text')
        return this.onFinish()
      }
      console.debug('send next part..')

    } else { this.isInstant = true }

    this.setState({ reRender: true })
  }

  initMessageArray () {
    this.messages = []
    this.buffer = ''
    this.words = this.props.message.split(' ')

    while (this.words.length) {
      const newLength = this.buffer.length + this.words[0].length

      if (newLength <= this.props.maxLength) {
        this.buffer = `${this.buffer} ${this.words.shift()}`

      } else {
        this.messages.push(`${this.buffer} ...`)
        this.buffer = ''
      }
    }
    if (this.buffer.length) { this.messages.push(this.buffer) }
    delete this.buffer
    delete this.words
  }

  renderInit () {
    console.debug('render init')

    this.initMessageArray()

    this.DialogueDisplay = DialogueTypeFaceMol[this.props.faceType]

    this.dialogueDisplayProps = {
      face: (this.props.face_left || this.props.face_right),
      face_side: this.props.faceSide,
      face_src: images.global.face_example,
      face_size: '4x2',
      face_pos: '1x1',
    }

    this.div.animated.isVisible = this.state.isVisible
    this.div.animated.animationIn = this.props.animationIn
    this.div.animated.animationOut = this.props.animationOut
    this.div.animated.animationInDelay = this.props.animationInDelay
    this.div.animated.animationOutDelay = this.props.animationOutDelay
    this.div.animated.animationInDuration = this.props.animationInDuration
    this.div.animated.animationOutDuration = this.props.animationOutDuration


    this.div.skip = this.props.faceSide === 'right'
      ? this.div.skipLeft
      : this.div.skipRight,

    this.span.typewriter.onFinish = this.onFinishTypewriter

    this.message = this.props.message
    this.isAnimationOver = false
  }

  render () {
    if (!this.state.isReady) { return null }

    console.debug('render orga dial')

    if (this.message !== this.props.message) { this.renderInit() }

    console.debug('message now:', this.messages[0])

    this.span.typewriter.message = this.messages[0]
    this.span.typewriter.isInstant = this.isInstant
    this.span.typewriter.isSkip = this.isSkip

    return <>
      <div {...this.div.main}>

        <Animated {...this.div.animated}>
          <this.DialogueDisplay {...this.dialogueDisplayProps}>
            <Typewriter {...this.span.typewriter} />
          </this.DialogueDisplay>
        </Animated>

        <div {...this.div.skip}>

          <Tooltip {...this.tooltipNext}>
            <ButtonAtom {...this.button.next} />
          </Tooltip>

          <Tooltip {...this.tooltipSkip}>
            <ButtonAtom {...this.button.skip} />
          </Tooltip>
        </div>

      </div>
    </>
  }
}
