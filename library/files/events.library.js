const { LibrarySuperclass } = require('../../superclass')

module.exports = class EventsLibrary extends LibrarySuperclass {
  constructor () { super ('EventsLibrary') }

  async run () {
    console.debug('running event method...')
  }

}
