const { that, React, _ } = require('../../imports')

module.exports = class ComponentSuperclass extends React.Component {
  constructor (props) {
    super(props)
    that.helpers.code.autoBindMethod(this)
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

}
