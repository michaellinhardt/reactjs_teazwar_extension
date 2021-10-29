const { that, _ } = require('../../imports')
const { GameSuperclass } = require('../../superclass')

module.exports = class LoopGame extends GameSuperclass {
  constructor () { super ('LoopGame') }

  run () {
    // if (!that._data.isDataInit()) { return that._data.initData() }
  }
}
