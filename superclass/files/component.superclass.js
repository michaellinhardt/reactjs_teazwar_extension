const { that, React, _ } = require('../../imports')

module.exports = class ComponentSuperclass extends React.Component {
  constructor (props, componentId = '') {
    super(props)
    that.helpers.code.autoBindMethod(this)
    this.componentId = componentId
    this.generateCss()
  }

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

  instanciateLibraries () {
    const Library = require('../../library')
    _.forEach(Library, (classAddr, className) => {
      const keyName = className.replace('Library', '').toLowerCase()
      if (!window._teazwar[keyName]) {
        window._teazwar[keyName] = new classAddr()
      }
    })
  }

  logout () {
    that.scene('socket_disconnected')
    that.ressources({ jwtoken: null })
  }
}
