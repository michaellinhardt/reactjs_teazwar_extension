const { that, _ } = require('../../imports')

module.exports = class ListenerSuperclass {
  constructor () {
    that.helpers.code.autoBindMethod(this)
    this.last = {}
    this.schema = {}
  }

  trackSchema (schema) {
    this.schema = schema
    this.updateTracking()
  }

  getTrackingValue () {
    const store = that.store.getState()
    const value = {}

    _.forEach(this.schema, (path, name) => {
      value[name] = _.get(store, path, null)
    })

    return value
  }

  updateTracking () {
    const newValue = this.getTrackingValue()
    _.merge(this.last, newValue)
  }

  getTrackingDifference () {
    const current = this.last
    const next = this.getTrackingValue()
    return { current, next }
  }

  event (eventName) {
    const { current, next } = this.getTrackingDifference()

    const formatEventName = that.helpers.string.firstUpper(eventName)
    const method = `on${formatEventName}`
    this[method](current, next)
    this.updateTracking()
  }

}
