import React from 'react'
import _ from 'lodash'
import Redux from '../redux'
import CodeHelper from '../helpers/code.helper'

export default class ComponentSuperclass extends React.Component {
  constructor (props, componentId = '') {
    super(props)
    this.state = {}
    CodeHelper.autoBindMethod(this)
    this.componentId = componentId
    this.generateCss()
    this.local = {}
    this.setRenderHandler()
  }

  renderHandler () {
    const store = Redux.Store.getState()
    const isVisible = _.get(store.ressources.scene_data, `${this.componentId}.isVisible`, false)
    if (!isVisible) { return null }
    return this.renderMethod()
  }

  setRenderHandler () {
    if (!this.componentId.endsWith('Eco')) { return false }
    this.renderMethod = this.render
    this.render = this.renderHandler
  }

  setLocal (valueObject) { _.merge(this.local, valueObject) }

  generateCss () {
    if (!this.cssClasses) { return true }
    const classObject = this.cssClasses()
    _.forEach(classObject, (classDescription, elemType) => {
      _.forEach(classDescription, (arraysClass, elemId) => {
        const classNames = [
          `${this.componentId}_${elemType}_${elemId}`,
          `${this.componentId}_${elemType}_${elemId}_style`,
          `${this.componentId}_${elemType}_${elemId}_pos`,
          ...arraysClass,
        ]

        if (elemType === 'div' && elemId === 'main') {
          classNames.unshift(`${this.componentId}_target_all`)
        }
        _.set(this, `${elemType}.${elemId}`, { className: classNames.join(' ') })
      })
    })
  }

}
