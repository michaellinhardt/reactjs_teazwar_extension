const { that, _ } = require('../../imports')

module.exports = class CutsceneSuperclass {
  constructor (cutscene_id, cutscene_data) {
    this.cutscene_id = cutscene_id
    this.cutscene_data = cutscene_data
    that.helpers.code.autoBindMethod(this)
  }
}