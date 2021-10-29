const { that, _ } = require('../../imports')
const { GameSuperclass } = require('../../superclass')

module.exports = class DataGame extends GameSuperclass {
  constructor () { super ('DataGame') }

  isDataInit () { return _.get(that.getStore(), 'ressources.isDataInit', false) }

  initData () { return that.emit('data', 'init')}
}
