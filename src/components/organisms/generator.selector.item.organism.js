import React from 'react'
import Redux from '../../redux'
import ressourcesGenerator from '../../data/generator/ressources.array.generator'

import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ComponentSuperclass from '../../superclass/component.superclass'
import GeneratorItemMolecule from '../molecules/generator.item.molecule'
import gameConfig from '../../config/game.config'
import languageHelper from '../../helpers/language.helper'
import TooltipAtom from '../atoms/tooltip.atom'
import generatorHelper from '../../helpers/generator.helper'

class GeneratorSelectorItemOrganism extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorSelectorItemOrg') }

  componentDidMount () { this.setState({ isReady: true }) }

  cssClasses () { return {
    div: {
      main: ['layout_div_bottom_pos'],
      items: ['layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style'],
      item: [],
      selected: ['layout_img_pngSelected_style'],
      notSelected: [],

    }, button: {
      section: ['layout_div_top_pos'],
      sectionGroup: ['layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style'],
      sectionButton: [],

      genders: ['layout_div_top_pos'],
      gendersGroup: ['layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style'],
      gendersButton: [],
    }
  } }

  onClickSection (index) {
    this.index = index
    this.setState({ isReady: true })
  }

  renderNavigations () {
    if (this.ref.length < 2) { return null }

    this.button.sectionGroup.size = 'sm'

    return <>
      <ButtonToolbar {...this.button.section}>
        <ButtonGroup {...this.button.sectionGroup}>
          {this.ref.map((ref, i) => {
            const props = {
              ...this.button.sectionButton,
              variant: 'secondary',
              active: i === this.index,
              key: `btnSection_${i}`,
              children: i + 1,
              onClick: () => this.onClickSection(i),
            }
            // eslint-disable-next-line react/jsx-key
            return <Button {...props} />
          })}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  }

  onClickGender (gender) {
    Redux.Store.ressources({
      generator: {
        ...generatorHelper.getDefaultTemplate(gender.toLowerCase())
      }
    })
  }

  renderGenders () {
    this.button.gendersGroup.size = 'sm'
    const genders = ['M', 'F', 'K']

    return <>
      <ButtonToolbar {...this.button.genders}>
        <ButtonGroup {...this.button.gendersGroup}>
          {genders.map((gender, i) => {
            const genderLower = gender.toLowerCase()
            const props = {
              ...this.button.gendersButton,
              variant: 'secondary',
              active: genderLower === this.props.gender_id,
              key: `btnGenders_${i}`,
              onClick: () => this.onClickGender(gender),
            }
            const toolipProps = {
              className: 'layout_div_fullWH_pos',
              tooltip: languageHelper.lang('generator', genderLower),
              children: languageHelper.lang('generator', gender),
            }
            props.children = <TooltipAtom {...toolipProps} />
            // eslint-disable-next-line react/jsx-key
            return <Button {...props} />
          })}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  }

  onClickItem (item_id) {
    const { part_id, gender_id } = this.props

    Redux.Store.ressources({
      generator: {
        [part_id]: { gender_id, item_id, x: 0, y: 0 }
      }
    })
  }

  renderItems () {
    let sectionCount = 1
    this.ref = []

    const startIndex = this.index * gameConfig.generator.maxDisplayedItem
    const endIndex = startIndex + gameConfig.generator.maxDisplayedItem - 1

    return this.arrayItems.map((item, key) => {

      let ref = null
      if (sectionCount === 1) {
        ref = React.createRef()
        this.ref.push(ref)

      } else if (sectionCount === 25) { sectionCount = 0 }
      sectionCount += 1

      if (key < startIndex || key > endIndex) { return null }

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

  addNullItem () {
    const { partCanBeNull } = gameConfig.generator
    if (!partCanBeNull[this.props.part_id]) { return null }

    if (!this.arrayItems[0]
      || this.arrayItems[0].item_id === null) { return null }

    const emptyItem = {
      ...this.arrayItems[0],
      item_id: null,
    }

    this.arrayItems.unshift(emptyItem)
  }

  render () {
    if (!this.state.isReady) { return null }

    const { part_id, gender_id } = this.props

    this.arrayItems = ressourcesGenerator[gender_id][part_id] || []
    this.currentItemId = this.props[part_id]

    this.addNullItem()

    if (!this.lastPartId || this.lastPartId !== part_id) {
      this.index = 0
      this.lastPartId = part_id
    }

    return <>
      <div {...this.div.main}>
        <div {...this.div.items}>
          {this.renderItems()}
        </div>
        {this.renderGenders()}
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
