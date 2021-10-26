const { that, _ } = require('../../imports')

module.exports = class LibrarySuperclass {
  constructor (className) {
    this.name = className
    that.helpers.code.autoBindMethod(this)
    this.setRunMethod()
  }

  setRunMethod () {
    this.runHandler = this.run || this.noRunMethod
    this.run = this._run
  }

  saveNextRunTimestamp () {
    const itvLibraryRun = _.get(that, `config.library.itvLibraryRuns.itv${this.name}`, 0)
    const currTimestampMs = Date.now()
    const nextTimestamp = currTimestampMs + itvLibraryRun
    that.library.tsnLibraryRuns[this.name] = nextTimestamp
  }

  isTimeToRun () {
    const tsnLibraryRun = _.get(that, `globals.library.tsnLibraryRuns.${this.name}`, 0)
    const currTimestampMs = Date.now()
    return tsnLibraryRun <= currTimestampMs
  }

  forceRun () { this._run(true) }

  async _run (force = false) {
    const isRunning = _.get(that, `globals.library.boolStateRuns.${this.name}`, false)

    if ((!this.isTimeToRun() && !force) || isRunning) {
      return false
    }

    _.set(that, `globals.library.boolStateRuns.${this.name}`, true)
    const result = await this.runHandler()
    this.saveNextRunTimestamp()

    _.set(that, `globals.library.boolStateRuns.${this.name}`, false)
    return result
  }

  async noRunMethod () {
    console.info('No method _run implemented for ', this.name)
    return false
  }

}