import React from 'react'
import Redux from '../../redux'
import ressourcesGenerator from '../../data/generator/ressources.array.generator'

import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ComponentSuperclass from '../../superclass/component.superclass'
import GeneratorItemMolecule from '../molecules/generator.item.molecule'

class GeneratorSelectorItemOrganism extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorSelectorItemOrg') }

  componentDidMount () { this.setState({ isReady: true }) }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      navigation: [],
      genders: [],
      items: ['layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style'],
      item: [],
      selected: ['layout_img_pngSelected_style'],
      notSelected: [],
    }, button: {
      section: ['layout_div_top_pos'],
      sectionGroup: ['layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style'],
    }
  } }

  renderNavigations () {
    if (this.ref.length < 2) { return null }

    this.button.sectionGroup.size = 'sm'

    return <>
      <ButtonToolbar {...this.button.section}>
        <ButtonGroup {...this.button.sectionGroup}>
          <Button variant="secondary">1</Button>
          <Button variant="secondary">2</Button>
          <Button variant="secondary">3</Button>
          <Button variant="secondary">4</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  }

  renderGenders () {
    return null
  }

  onClickRef (ref) {
    window.scroll({
      top: ref.current.offsetTop,
      behavior: "smooth",
    })
  }

  onClickItem (item_id) {
    const { part_id, gender_id } = this.props

    Redux.Store.ressources({
      generator: {
        [part_id]: { part_id, gender_id, item_id }
      }
    })
  }

  renderItems () {
    let sectionCount = 1
    this.ref = []

    return this.arrayItems.map((item, key) => {

      let ref = null
      if (sectionCount === 1) {
        ref = React.createRef()
        this.ref.push(ref)

      } else if (sectionCount === 25) { sectionCount = 0 }
      sectionCount += 1

      const className = `${this.div.item.className} ${
        (this.currentItemId === item.item_id
          ? this.div.selected.className
          : this.div.notSelected.className)
      }`
      const divProps = {
        ...this.div.item,
        className,
      }
      const props = {
        part_id: this.props.part_id,
        gender_id: this.props.gender_id,
        item_id: item.item_id,
        onClick: this.onClickItem.bind(this)
      }

      props.ref = ref
      return <div key={key} {...divProps} ref={ref}>
        <GeneratorItemMolecule {...props} />
      </div>
    })
  }

  render () {
    if (!this.state.isReady) { return null }

    const { part_id, gender_id } = this.props

    this.arrayItems = ressourcesGenerator[gender_id][part_id]
    this.currentItemId = this.props[part_id]

    return <>
      <div {...this.div.main}>
        <div {...this.div.items}>
          {this.renderItems()}
          {/* {this.renderGenders()} */}
        </div>
        {this.renderNavigations()}
      </div>
    </>
  }
}

export default Redux.connect(state => ({
  part_id: state.ressources.generator.part_id,
  gender_id: state.ressources.generator.gender_id,

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

}), null)(GeneratorSelectorItemOrganism)
