import React from 'react'
import images from '../../data/images'
import keysGenerator from '../../data/generator/keys.generator'

import ComponentSuperclass from '../../superclass/component.superclass'
import ImageTilesetMolecule from './image.tileset.molecule'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import stringHelper from '../../helpers/string.helper'
import languageHelper from '../../helpers/language.helper'

export default class GeneratorPartMolecule extends ComponentSuperclass {
  constructor (props) { super(props, 'generatorPartMol') }

  cssClasses () { return {
    div: {
      main: [],
    },
    icon: {
      part: [],
    },
  } }

  onClick () { this.props.onClick(this.props.part) }

  componentDidMount () {
    const { part } = this.props
    this.iconSetIndex = keysGenerator.partIndex[part]

    this.icon.part.src = images.icons.generatorPart
    this.icon.part.size = images.icons.generatorPartXY
    this.icon.part.pos = this.iconSetIndex

    this.div.main.onClick = this.onClick.bind(this)
    this.tooltipId = `tooltip_${stringHelper.uuid()}`

    this.setState({ isReady: true })
  }

  render () {
    if (!this.state.isReady) { return null }

    const tooltipProps = {
      id: this.tooltipId,
      children: languageHelper.lang('generator', this.props.part),
    }

    const overlayProps = {
      placement: 'auto',
      overlay: <Tooltip {...tooltipProps} />
    }

    return <>
      <div {...this.div.main}>
        <OverlayTrigger {...overlayProps}>
          <span>
            <ImageTilesetMolecule {...this.icon.part} />
          </span>
        </OverlayTrigger>
      </div>
    </>
  }
}