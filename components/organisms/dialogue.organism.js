const { React, that, _, connect, Animated } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const DialogueTypeFaceMol = {
  left: require('../molecules/dialogue.face.molecule'),
  right: require('../molecules/dialogue.face.molecule'),
  none: require('../molecules/dialogue.full.molecule'),
}

module.exports = class DialogueOrganism extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueOrg')
  }

  cssClasses () { return { div: {
    main: ['layout_div_bottom_pos'],
    animated: ['layout_div_fullWH_pos'],
  } } }

   clearTimeout () {
    if (this.animateTimeout) {
      clearTimeout(this.animateTimeout)
      this.animateTimeout = null
    }
  }

  initNextPhrase () {
    this.animateSpeed = that.config.game.dialogue.animateSpeed
    this.setState({
      message: '',
      index: 0,
      isVisible: true,
      isReady: true,
    })
  }

  nextAnimate () {
    this.clearTimeout()
    this.animateTimeout = setTimeout(this.animate, this.animateSpeed)
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
      that.ressources({ dialogue: { phrase_id: next_phrase_id } })

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

  render () {
    if (!_.get(this, 'state.isReady', false)) { return null }

    const isFullRevealed = this.state.index === this.props.message.length
    const isParagraphRevealed = this.props.maxLength === this.state.message.length

    if (!isFullRevealed && !isParagraphRevealed) { this.nextAnimate() }

    const onClickMessage = isFullRevealed
      ? this.nextPhrase
      : ( isParagraphRevealed
          ? this.nextParagraph
          : this.revealParagraph
      )

    const DialogueDisplay = DialogueTypeFaceMol[this.props.faceType]

    const message = isParagraphRevealed && !isFullRevealed
        ? `${this.state.message} ...` : this.state.message

    const dialogueDisplayProps = {
      face: (this.props.face_left || this.props.face_right),
      message,
      face_side: this.props.faceSide,
      face_src: that.images.global.face_example,
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
      onClick: onClickMessage,
    }

    return <>
      <div {...mainDiv}>
        <Animated {...animatedProps}>
          <DialogueDisplay {...dialogueDisplayProps} />
        </Animated>
      </div>
    </>
  }
}
