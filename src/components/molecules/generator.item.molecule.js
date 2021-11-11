import React from 'react'
import ressourcesGenerator from '../../data/generator/ressources.flat.generator'

import ComponentSuperclass from '../../superclass/component.superclass'
import ImageAtom from '../atoms/image.atom'

export default class GeneratorItemMolecule extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorItemMol') }

  cssClasses () { return {
    div: {
      main: [],
    },
    icon: {
      item: [],
    },
  } }

  onClick () { this.props.onClick(this.props.item_id) }

  componentDidMount () { this.setState({ isReady: true }) }

  render () {
    if (!this.state.isReady) { return null }

    const { item_id, part_id, gender_id } = this.props

    const ressource = ressourcesGenerator[gender_id][part_id][item_id]

    this.icon.item.src = ressource.ico.colors[0]

    this.icon.item.onClick = this.onClick.bind(this)

    this.icon.item.fluid = true

    return <ImageAtom {...this.icon.item} />
  }
}