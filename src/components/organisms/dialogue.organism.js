import { Animated } from 'react-animated-css'
import React from 'react'
import images from '../../data/images'
// import cfgGame from '../../config/game.config'
// import Redux from '../../redux'
import LanguageHelper from '../../helpers/language.helper'

import ComponentSuperclass from '../../superclass/component.superclass'
import ButtonAtom from '../atoms/button.atom'
import TooltipAtom from '../atoms/tooltip.atom'
import TypewriterMolecule from '../molecules/typewriter.molecule'
import DialogueAnswerMolecule from '../molecules/dialogue.answer.molecule'

import face from '../molecules/dialogue.face.molecule'
import none from '../molecules/dialogue.full.molecule'
import CodeHelper from '../../helpers/code.helper'
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

      skip: ['layout_div_top_pos', 'layout_div_floatRight_pos'],

      answer: [],

    }, span: {
      typewriter: [],

    }, button: {
      next: ['layout_button_btnIconTransparent_style'],
      skip: ['layout_button_btnIconTransparent_style'],
    } } }

  componentWillUnmount () {}
  componentDidMount () { this.setState({ isReady: true }) }

  onFinishTypewriter () {
    // console.debug('typewriter finish')
    this.isAnimationOver = true
    if (this.isSkip) { this.onClickNext() }
  }

  onClickSkip () {
    if (this.props.answers) { return false }

    // console.debug('skip mode')
    this.isSkip = true
    this.isInstant = true

    if (this.isAnimationOver) {
      this.onClickNext()

    } else { this.setState({ reRender: true }) }
  }

  onFinish () { this.props.onFinish() }

  onClickNext () {
    if (this.props.answers) { return false }

    if (this.isAnimationOver || this.isInstant) {

      this.messages.shift()
      if (!this.messages.length) {
        // console.debug('no more text')
        return this.onFinish()
      }
      // console.debug('send next part..')

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
    // console.debug('render init')

    this.initMessageArray()

    this.DialogueDisplay = DialogueTypeFaceMol[this.props.faceType]

    this.dialogueDisplayProps = {
      face: (this.props.face_left || this.props.face_right),
      face_side: this.props.faceSide,
      face_src: images.global.face_example,
      face_size: '4x2',
      face_pos: '1x1',
    }

    this.isVisible = !(!this.isSkip && (this.props.animationIn || this.props.animationInDelay))

    this.div.animated.animationIn = this.props.animationIn || null
    this.div.animated.animationOut = this.props.animationOut || null
    this.div.animated.animationInDelay = this.props.animationInDelay || null
    this.div.animated.animationOutDelay = this.props.animationOutDelay || null
    this.div.animated.animationInDuration = this.props.animationInDuration || null
    this.div.animated.animationOutDuration = this.props.animationOutDuration || null

    this.span.typewriter.onFinish = this.onFinishTypewriter

    this.message = this.props.message
    this.isAnimationOver = false
  }

  async appear () {
    this.isVisible = true
    await CodeHelper.sleep(100)
    this.setState({ reRender: true })
  }

  renderButtonNavigation () {
    if (this.props.answers) { return null }

    return <>
      <div {...this.div.skip}>
        <TooltipAtom {...this.tooltipNext}>
          <ButtonAtom {...this.button.next} />
        </TooltipAtom>

        <TooltipAtom {...this.tooltipSkip}>
          <ButtonAtom {...this.button.skip} />
        </TooltipAtom>
      </div>
    </>
  }

  renderMessage () { return <TypewriterMolecule {...this.span.typewriter} /> }

  renderAnswers () {
    return this.props.answers.map((answerObject, key) => {
      const props = { ...this.div.answer, answerObject }
      return <DialogueAnswerMolecule key={key} {...props} />
    })
  }

  render () {
    if (!this.state.isReady) { return null }

    // console.debug('render orga diad l')

    if (this.message !== this.props.message) { this.renderInit() }

    // console.debug('message nowd:', this.messages[0])

    this.span.typewriter.message = this.messages[0]
    this.span.typewriter.isInstant = this.isInstant
    this.span.typewriter.isSkip = this.isSkip

    this.div.animated.isVisible = this.isVisible

    this.dialogueDisplayProps.message = this.isVisible ?
      this.renderMessage() : null

    this.dialogueDisplayProps.answers = this.props.answers
      ? this.renderAnswers() : null

    if (!this.isVisible) { this.appear() }

    return <>
      <div {...this.div.main}>

        <Animated {...this.div.animated}>
          <this.DialogueDisplay {...this.dialogueDisplayProps} />
        </Animated>

        {this.renderButtonNavigation()}

      </div>
    </>
  }
}
