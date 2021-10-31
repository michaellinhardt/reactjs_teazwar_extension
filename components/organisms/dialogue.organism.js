const { React, that, _, connect, Animated } = require('../../imports')
const { ComponentSuperclass } = require('../../superclass')

const ImageTilesetMolecule = require('../molecules/image.tileset.molecule')

module.exports = class DialogueOrganism extends ComponentSuperclass {
  constructor (props) {
    super(props, 'dialogueOrg')
    this.maxLengthWithFace = 455
    this.maxLengthFull = 590
    this.state = { isVisible: true }
  }

  loadDialogue () {
    const store = that.store.getState()
    const lang = _.get(store, 'ressources.language', 'fr')
    const { dialogue_id, phrase_id } = _.get(store, 'ressources.dialogue', {})

    const dialogue = _.get(that, `dialogues.${lang}.${dialogue_id}.${phrase_id}`, null)
    if (!dialogue) { return false }


    const {
      face_left,
      face_right,
      emotion,
      message,
      next_phrase_id,
    } = dialogue

    const maxLength = face_left ? this.maxLengthWithFace : this.maxLengthFull
    this.method = face_left ? 'renderDialogueFaceLeft' : 'renderDialogueFull'
    this.method = face_right ? 'renderDialogueFaceRight' : this.method

    if (message) {
      this.messages = []
      this.prepareMessageArray(message, maxLength)
      this.message = ''
      this.index = 0
      setTimeout(this.animate, that.config.game.dialogue.animateSpeed)
    }

    this.setState({...dialogue})
  }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      padding: [],
      dialFull: [ 'layout_div_fullWH_pos', 'layout_div_boxRPG_style', 'layout_div_shadow80_style' ],

      titleLeft: [ 'layout_div_top_pos' ],
      faceLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
      dialRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],

      titleRight: [ 'layout_div_top_pos' ],
      faceRight: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatRight_pos' ],
      dialLeft: [ 'layout_div_boxRPG_style', 'layout_div_shadow80_style', 'layout_div_floatLeft_pos' ],
    },
    p: {
      dialogue: [ 'layout_p_boxRPG_style', 'layout_p_noSelect_style' ],
    },
  } }

  renderDialogueFull() {
    return <>
      <div className={this.div.dialFull}>
        <div className={this.div.padding}>
          <p className={this.p.dialogue}><span>{this.state.message}</span></p>
        </div>
      </div>
  </>}

  renderDialogueFaceRight() {
    return <>
      <div className={this.div.titleRight}>
        <p className={this.p.dialogue}>{this.state.face_right}</p>
      </div>
      <div className={this.div.faceRight}>
          <ImageTilesetMolecule
            src={that.images.global.face_example}
            size={'4x2'}
            pos={'1x1'}
          />
      </div>
      <div className={this.div.dialLeft}>
        <div className={this.div.padding}>
          <p className={this.p.dialogue}><span>{this.state.message}</span></p>
        </div>
      </div>
  </>}

  renderDialogueFaceLeft() {
    return <>
    <div className={this.div.dialRight}>
      <div className={this.div.padding}>
        <p className={this.p.dialogue}><span>{this.state.message}</span></p>
      </div>
    </div>
      <div className={this.div.titleLeft}>
        <p className={this.p.dialogue}>{this.state.face_left}</p>
      </div>
      <div className={this.div.faceLeft}>
          <ImageTilesetMolecule
            src={that.images.global.face_example}
            size={'4x2'}
            pos={'1x1'}
          />
      </div>
  </>}

  prepareMessageArray (message, maxLength) {
    if (!message) { return undefined }
    const messages = []
    const byWords = message.split(' ')
    let buffer = ''

    while (byWords[0]) {
      const newSize = buffer.length + byWords[0].length + 1
      if (newSize <= maxLength) {
        buffer = `${buffer} ${byWords.shift()}`
      } else {
        messages.push(buffer)
        buffer = ''
      }
    }

    if (buffer.length) { messages.push(buffer) }

    this.messages = messages
  }

  clearTimeout () {
    if (this.animateTimeout) {
      clearTimeout(this.animateTimeout)
      this.animateTimeout = null
    }
  }

  componentWillUnmount () {
    this.clearTimeout()
  }
  componentDidMount () {
    this.loadDialogue()
    this.setState({ isReady: true })
  }

  animate () {
    if (!this.messages || !this.messages[0].length) { return false }

    const stringArr = this.messages[0].split('')
    const char = stringArr.shift()
    this.messages[0] = stringArr.join('')
    this.message = [this.message, char].join('')

    this.setState({ message: this.message, isVisible: true })
    this.animateTimeout = setTimeout(this.animate, that.config.game.dialogue.animateSpeed)
  }

  stopAnimate () {
    this.clearTimeout()
    this.message = [this.message, this.messages[0]].join('')
    this.messages[0] = ''
    this.setState({ message: this.message })
  }

  nextPhrase () {
    const { next_phrase_id } = this.state
    if (!next_phrase_id) { return null }
    that.ressources({ dialogue: { phrase_id: next_phrase_id } })

    const isAnimationOut = this.state.animationOut || this.state.animationOutDelay
    if (isAnimationOut) {
      this.setState({ isVisible: false })
    }
    this.loadDialogue()
  }

  render () {
    const isReady = _.get(this, 'state.isReady', false)
    if (!isReady) { return null }

    const remainMessage = _.get(this, 'messages[0]', '')
    const onClickMessage = remainMessage.length ? this.stopAnimate : this.nextPhrase

    return <>
          <div className={this.div.main} onClick={onClickMessage}>
          <Animated
            style={{width: '100%', height: '100%'}}
            isVisible={this.state.isVisible}

            animationIn={this.state.animationIn}
            animationOut={this.state.animationOut}
            animationInDelay={this.state.animationInDelay}
            animationOutDelay={this.state.animationOutDelay}
            animationInDuration={this.state.animationInDuration}
            animationOutDuration={this.state.animationOutDuration}
          >
            {this[this.method]()}
        </Animated>
          </div>
    </>
  }
}
