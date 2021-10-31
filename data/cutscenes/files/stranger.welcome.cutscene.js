const { that, _ } = require('../../../imports')
const { CutsceneSuperclass } = require('../../../superclass')

module.exports = class extends CutsceneSuperclass {
    constructor () {
        super('stranger_welcome')
    }
}
