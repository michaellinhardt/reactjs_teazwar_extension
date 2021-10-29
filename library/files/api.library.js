const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class ApiLibrary extends LibrarySuperclass {
  constructor () {
    super ('ApiLibrary')
    this.status = false
    this.instanciateApis()
    this.registerCallStart()
  }

  registerCallStart() { that.call = this.callStart }

  sleep (ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

  extractCallback (callback = {}) {
    return {
      onCallSuccess: callback.onCallSuccess || callback.onCallResult || null,
      onCallError: callback.onCallError || callback.onCallResult || null,
      onServerDown: callback.onServerDown || callback.onCallResult || null,
      onCallResult: callback.onCallResult || null,
    }
  }

  callStart (api, method, callbackThis) {
    const callback = this.extractCallback(callbackThis)
    const callOrder = { api, method, callback, retry: 0 }
    this.status = true

    return this.execApiCall(callOrder).then(this.callResult)
  }

  async callResult ({ result, callOrder }) {
    await that.ressources(result)
    return this.callEnd(callOrder, result)
  }

  async callEnd (callOrder, result) {
    this.status = false
    const callbackMethod = this.getCallbackMethod(callOrder, result)
    return callbackMethod ? callbackMethod(result) : result
  }

  async callRetry (callOrder) {
    callOrder.retry += 1
    await this.sleep(that.config.api.retryWait)
    return this.execApiCall(callOrder)
  }

  async execApiCall (callOrder) {
    const { api, method, retry } = callOrder

    this.store = that.getStore()
    this.token = _.get(this.store, 'ressources.jwtoken', '')

    const isMethod = _.get(this, `${api}.${method}`, null)
    if (!isMethod) { return this.error('api.badParam') }
    const result = await isMethod()

    return (
      !result.error_key
            || result.error_key !== 'server.down'
            || retry >= that.config.api.retryMax)
      ? { result, callOrder }
      : this.callRetry(callOrder)
  }

  getCallbackMethod ({ callback }, result) {
    const { error_key = null } = result
    const { onCallError, onCallResult, onCallSuccess, onServerDown } = callback

    if (!error_key && onCallSuccess) {
      return onCallSuccess

    } else if (error_key && error_key === 'server.down' && onServerDown) {
      return onServerDown

    } else if (error_key && error_key !== 'server.down' && onCallError) {
      return onCallError

    } else if (onCallResult) {
      return onCallResult

    } else { return null }
  }

  instanciateApis () {
    _.forEach(that.apis, (classAddr, className) => {
      const keyName = className.replace('Api', '').toLowerCase()
      this.instanciate(keyName, classAddr)
    })
  }

  instanciate (className, classAddr) {
    this[className] = new classAddr()
    that.helpers.code.getAllMethods(this[className])
      .forEach(method => {
        this[className][method] = this[className][method].bind(this)
      })
  }

  post (route, token, body = {}) { return this.call(route, 'POST', token, JSON.stringify(body)) }
  put (route, token, body = {}) { return this.call(route, 'PUT', token, JSON.stringify(body)) }
  get (route, token, body = {}) { return this.call(route, 'GET', token, JSON.stringify(body)) }
  delete (route, token, body = {}) { return this.call(route, 'DELETE', token, JSON.stringify(body)) }

  error (error_key = 'server.down') { return ({ error_key }) }

  async call (route, method, token = null, body = {}) {
    try {
      const url = `${that.config.url.backend}${route}`
      const contentType = 'application/json'

      const payload = {
        method,
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
          ['x-access-token']: token ? `Bearer ${token}` : '',
        },
        body,
      }

      if (method === 'GET' || method === 'DELETE') { delete payload.body }

      const response = await fetch(url, payload)
      const responseJson = await response.json()
      return responseJson


    } catch (error) { return this.error() }
  }

}
