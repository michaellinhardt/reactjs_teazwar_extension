import React from 'react'
import Redux from '../../redux'

import ComponentSuperclass from '../../superclass/component.superclass'
import GeneratorSelectorPartOrganism from '../organisms/generator.selector.part.organism'
import GeneratorSelectorItemOrganism from '../organisms/generator.selector.item.organism'

class GeneratorEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorEco') }

  componentDidMount () { this.setState({ isReady: true }) }

  render () {
    if (!this.state.isReady) { return null }

    return <>
      <GeneratorSelectorPartOrganism />
      <GeneratorSelectorItemOrganism />
    </>
  }
}

export default Redux.connect(state => ({
  isVisible: state.ressources.scene_data.generatorEco.isVisible,

}), null)(GeneratorEcosystem)
