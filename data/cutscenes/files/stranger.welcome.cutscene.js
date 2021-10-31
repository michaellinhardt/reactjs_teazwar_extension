const { that, _ } = require('../../../imports')
const { CutsceneSuperclass } = require('../../../superclass')

module.exports = class extends CutsceneSuperclass {
    constructor (cutscene_data) {
        super('stranger_welcome', cutscene_data)
        console.debug('i am ', this.cutscene_id, 'with data', this.cutscene_data)
    }
}
