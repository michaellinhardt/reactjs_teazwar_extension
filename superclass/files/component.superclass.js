const { that, React, _ } = require('../../imports')

module.exports = class ComponentSuperclass extends React.Component {
  constructor (props, componentId = '') {
    super(props)
    that.helpers.code.autoBindMethod(this)
    this.componentId = componentId
    this.generateCss()
    this.local = {}
    this.referenceMethods()
    this.setRenderHandler()
  }

  renderHandler () {
    const store = that.store.getState()
    const scene_data_path = 'ressources.scene_data'
    const isVisible = _.get(store, `${scene_data_path}.${this.componentId}.isVisible`, false)
    if (!isVisible) { return null }
    return this.renderMethod()
  }

  setRenderHandler () {
    if (!this.componentId.endsWith('Eco')) { return false }
    this.renderMethod = this.render
    this.render = this.renderHandler
  }

  referenceMethods () {
    _.set(that, this.componentId, {
      setLocal: this.setLocal.bind(this),
      setState: this.setState.bind(this),
    })
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
        _.set(this, `${elemType}.${elemId}`, classNames.join(' '))
      })
    })
  }

}
