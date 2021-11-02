import _ from 'lodash'
import Redux from '../redux'
import CodeHelper from '../helpers/code.helper'
import StringHelper from '../helpers/string.helper'

export default class ListenerSuperclass {
  constructor () {
    CodeHelper.autoBindMethod(this)
    this.last = {}
    this.schema = {}
  }

  trackSchema (schema) {
    this.schema = schema
    this.updateTracking()
  }

  getTrackingValue () {
    const store = Redux.Store.getState()
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

    const formatEventName = StringHelper.firstUpper(eventName)
    const method = `on${formatEventName}`
    this[method](current, next)
    this.updateTracking()
  }

}
