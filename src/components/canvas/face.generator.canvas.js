import React from 'react'
import canvasConfig from '../../config/canvas.config'
import Redux from '../../redux'

import ComponentSuperclass from '../../superclass/component.superclass'

class FaceGeneratorCanvas extends ComponentSuperclass {
  constructor (props) {
    super(props, 'faceGeneratorCan')
    this.div.canvas.id = 'canvas_generator_face'
    this.div.canvas.width = canvasConfig.generatorFace.width
    this.div.canvas.height = canvasConfig.generatorFace.height
  }

  componentDidMount () { this.onNextFrame(this.setCanvas) }
  cssClasses () { return { div: {
    main: [],
    canvas: [],
  } } }

  shouldComponentUpdate () {
    if (!this.isInit) { return true }


    return false
  }

  setCanvas () {
    this.isInit = true
    this.canvas = document.querySelector('#canvas_generator_face')
    this.ctx = this.canvas.getContext('2d')
  }

  render () { return <div {...this.div.main}>
    <canvas {...this.div.canvas} />
  </div> }
}

export default Redux.connect(state => ({
  accA: state.ressources.generator.accA.item_id,
  accB: state.ressources.generator.accB.item_id,
  beard: state.ressources.generator.beard.item_id,
  beastEars: state.ressources.generator.beastEars.item_id,
  body: state.ressources.generator.body.item_id,
  cloak: state.ressources.generator.cloak.item_id,
  clothing: state.ressources.generator.clothing.item_id,
  ears: state.ressources.generator.ears.item_id,
  eyebrows: state.ressources.generator.eyebrows.item_id,
  eyes: state.ressources.generator.eyes.item_id,
  face: state.ressources.generator.face.item_id,
  facialMark: state.ressources.generator.facialMark.item_id,
  frontHair: state.ressources.generator.frontHair.item_id,
  glasses: state.ressources.generator.glasses.item_id,
  mouth: state.ressources.generator.mouth.item_id,
  nose: state.ressources.generator.nose.item_id,
  rearHair: state.ressources.generator.rearHair.item_id,
  tail: state.ressources.generator.tail.item_id,
  wing: state.ressources.generator.wing.item_id,

}), null)(FaceGeneratorCanvas)
