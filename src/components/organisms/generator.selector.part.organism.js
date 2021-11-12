import React from 'react'
import Redux from '../../redux'
import keysGenerator from '../../data/generator/keys.generator'
import ressourcesArrayGenerator from '../../data/generator/ressources.array.generator'

import ComponentSuperclass from '../../superclass/component.superclass'
import GeneratorPartMolecule from '../molecules/generator.part.molecule'

class GeneratorSelectorPartOrganism extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorSelectorPartOrg') }

  componentDidMount () {
    this.setState({ isReady: true })
  }

  cssClasses () { return {
    div: {
      main: ['layout_div_top_pos', 'layout_div_shadow80_style', 'layout_div_boxTransparentBlack_style', 'justify-content-md-center'],
      part: [],
      selected: [],
      notSelected: [],
    },
  } }

  onClickPart (part) {
    Redux.Store.ressources({
      generator: {
        part_id: part,
      }
    })
  }

  renderParts () {
    return keysGenerator.part
      .filter(p => p !== 'body')
      .map((part, key) => {
        const ressourceParts = ressourcesArrayGenerator[this.props.gender_id][part]
        if (!ressourceParts) { return null }

        const className = `${this.div.part.className} ${
          (this.props.part_id === part
            ? this.div.selected.className
            : this.div.notSelected.className)
        }`
        const divProps = {
          ...this.div.part,
          className,
        }
        const props = {
          part,
          onClick: this.onClickPart.bind(this)
        }
        return <div key={key} {...divProps}>
          <GeneratorPartMolecule {...props} />
        </div>
      })
  }

  render () {
    if (!this.state.isReady) { return null }

    return <>
      <div {...this.div.main}>
        {this.renderParts()}
      </div>
    </>
  }
}

export default Redux.connect(state => ({
  part_id: state.ressources.generator.part_id,
  gender_id: state.ressources.generator.gender_id,

}), null)(GeneratorSelectorPartOrganism)
