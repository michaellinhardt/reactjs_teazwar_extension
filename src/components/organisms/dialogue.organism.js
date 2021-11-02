import { Animated } from 'react-animated-css'
import React from 'react'
import images from '../../data/images'
import cfgGame from '../../config/game.config'
import Redux from '../../redux'
import LanguageHelper from '../../helpers/language.helper'

import ComponentSuperclass from '../../superclass/component.superclass'
import ButtonAtom from '../atoms/button.atom'
import Tooltip from '../atoms/tooltip.atom'

import face from '../molecules/dialogue.face.molecule'
import none from '../molecules/dialogue.full.molecule'
const DialogueTypeFaceMol = { left: face, right: face, none }

const { Store } = Redux

export default class DialogueOrganism extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueOrg')
  }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      animated: ['layout_div_fullWH_pos'],

      skipLeft: ['layout_div_top_pos', 'layout_div_floatLeft_pos'],
      skipRight: ['layout_div_top_pos', 'layout_div_floatLeft_pos'],

    }, button: {
      skip: ['layout_button_btnIconTransparent_style'],
    } } }

  clearTimeout () {
    if (this.animateTimeout) {
      clearTimeout(this.animateTimeout)
      this.animateTimeout = null
    }
  }

  initNextPhrase () {
    this.animateSpeed = cfgGame.dialogue.animateSpeed
    this.setState({
      message: '',
      index: 0,
      isVisible: true,
      isReady: true,
    })
  }

  nextAnimate () {
    this.clearTimeout()
    if (!this.state.autoSkip) {
      this.animateTimeout = setTimeout(this.animate, this.animateSpeed)
      return true
    }

    const isFullRevealed = this.state.index === this.props.message.length
    const isParagraphRevealed = this.props.maxLength === this.state.message.length

    const revealOrNextParagraph =  isParagraphRevealed
      ? this.nextParagraph
      : this.revealParagraph


    const method = isFullRevealed
      ? this.nextPhrase
      : revealOrNextParagraph

    this.animateSpeed = cfgGame.dialogue.autoSkipSpeed
    this.animateTimeout = setTimeout(method.bind(this), this.animateSpeed)
  }

  componentWillUnmount () { this.clearTimeout() }
  componentDidMount () { this.initNextPhrase() }

  animate () {
    const { message, index } = this.state
    if (message.length >= this.props.maxLength
      || index === this.props.message.length) {
      return this.clearTimeout()
    }

    const char = this.props.message[index]
    const newMessage = `${message}${char}`

    this.setState({ message: newMessage, index: (index + 1), isVisible: true })
  }

  nextParagraph () {
    if (this.state.message.length === this.props.message.length) {
      return null
    }

    const findPreviousSpaceIndex = (message, index) => {
      let i = index
      while (i > 0 && message[i] !== ' ') { i -= 1 }
      return i === 0 ? index : i
    }
    const message = ''
    const index = findPreviousSpaceIndex(this.props.message, this.state.index)
    this.setState({ message, index, isVisible: true })
  }

  nextPhrase () {
    const { next_phrase_id } = this.props
    if (!next_phrase_id) { return null }

    const isAnimationOut = this.props.animationOut || this.props.animationOutDelay
    const isAnimationOutDuration = this.props.animationOutDuration || 0
    if (isAnimationOut) {
      this.setState({ isVisible: false })
    }
    setTimeout(() => {
      this.initNextPhrase()
      Store.ressources({ dialogue: { phrase_id: next_phrase_id } })

    }, isAnimationOutDuration)
  }

  revealParagraph () {
    this.clearTimeout()
    const { message, index } = this.state

    if (message.length >= this.props.maxLength
      || index === this.props.message.length) {
      return false
    }

    let newMessage = message
    let i = index
    while ( newMessage.length < this.props.maxLength && i < this.props.message.length ) {
      newMessage = `${newMessage}${this.props.message[i]}`
      i += 1
    }

    this.setState({ message: newMessage, index: i, isVisible: true })
  }

  autoSkipMode () { this.setState({ autoSkip: true }) }

  render () {
    if (!this.state.isReady) { return null }

    const isFullRevealed = this.state.index === this.props.message.length
    const isParagraphRevealed = this.props.maxLength === this.state.message.length

    if ((!isFullRevealed && !isParagraphRevealed)
      || this.state.autoSkip) {
      this.nextAnimate()
    }

    // const revealOrNextParagraph = isParagraphRevealed
    //   ? this.nextParagraph
    //   : this.revealParagraph

    // const onClickNext = isFullRevealed
    //   ? this.nextPhrase
    //   : revealOrNextParagraph

    const onClickSkip = this.autoSkipMode

    const DialogueDisplay = DialogueTypeFaceMol[this.props.faceType]

    const message = isParagraphRevealed && !isFullRevealed
      ? `${this.state.message} ...` : this.state.message

    const dialogueDisplayProps = {
      face: (this.props.face_left || this.props.face_right),
      message,
      face_side: this.props.faceSide,
      face_src: images.global.face_example,
      face_size: '4x2',
      face_pos: '1x1',
    }

    const animatedProps = {
      className: this.div.animated,
      isVisible: this.state.isVisible,
      animationIn: this.props.animationIn,
      animationOut: this.props.animationOut,
      animationInDelay: this.props.animationInDelay,
      animationOutDelay: this.props.animationOutDelay,
      animationInDuration: this.props.animationInDuration,
      animationOutDuration: this.props.animationOutDuration,
    }

    const mainDiv = {
      className: this.div.main,
    }

    const divSkip = {
      className: this.props.faceSide === 'right' ? this.div.skipLeft : this.div.skipRight,
    }

    const btnSkip = {
      className: this.button.skip,
      iconLeft: 'fast_forward',
      onClick: onClickSkip,
    }

    const tooltip = {
      tooltip: LanguageHelper.lang('button', 'skip'),
    }

    return <>
      <div {...mainDiv}>

        <Animated {...animatedProps}>
          <DialogueDisplay {...dialogueDisplayProps} />
        </Animated>

        <div {...divSkip}>

          <Tooltip {...tooltip}>
            <ButtonAtom {...btnSkip} />
          </Tooltip>
        </div>

      </div>
    </>
  }
}
