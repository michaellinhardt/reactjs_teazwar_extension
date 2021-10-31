const { that, _ } = require('../../../imports')
const { CutsceneSuperclass } = require('../../../superclass')

module.exports = class extends CutsceneSuperclass {
    constructor () {
        super('stranger_welcome')
    }

    entry () {
        console.debug('i am entry scene from', this.cutscene_id)
    }
}
