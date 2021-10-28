const imports = require('../../imports')
const { that, _, io } = imports

const { LibrarySuperclass } = require('../../superclass')

module.exports = class WebsocketLibrary extends LibrarySuperclass {
  constructor () {
    super ('WebsocketLibrary')
    this.instanciateApis()
    this.registerEmit()
    this.imports = imports
  }

  onConnect () {
    that.ui('isSocketConnected', true)
    console.log('Socket Connected:', that.socket.id)
    that.socket.onAny(data => this.onSocketMessage(data))
  }

  onSocketMessage (data) {
    console.log('Socket Message:', data)
  }

  onDisconnect (reason) {
    that.ui('isSocketConnected', false)
    console.log('Socket Disconnecter:', reason)
    that.logout()
  }

  onConnectError (reason) {
    console.log('Socket Connection Error')
    that.logout()
  }

  connect() {
    if (that.socket) { return that.socket }

    that.socket = io(that.config.url.socket)
    that.socket.on('connect', this.onConnect)
    that.socket.on('disconnect', this.onDisconnect)
    that.socket.on('connect_error', this.onConnectError)
    return that.socket
  }

  async emitHandler (api, method, callbackMethods = {}) {
    try {
      that.ui('isSocketCommunicating', true)

      const callback = {
        onCallSuccess: callbackMethods.onCallSuccess || callbackMethods.onCallResult || null,
        onCallError: callbackMethods.onCallError || callbackMethods.onCallResult || null,
        onServerDown: callbackMethods.onServerDown || callbackMethods.onCallResult || null,
        onCallResult: callbackMethods.onCallResult || null,
      }

      const isMethod = _.get(this, `${api}.${method}`, null)
      if (!isMethod) { return this.error('api.badParam') }


      const result = await isMethod()

      const error_key = _.get(result, 'ressources.error_key', '')
      if (error_key.startsWith('jwtoken')) {
        that.logout()
      }

      const ressources = _.get(result, 'ressources', {})
      if (ressources && typeof(ressources) === 'object') {
        await that.ressources(ressources)
      }

      that.ui('isSocketCommunicating', false)
      const callbackMethod = this.getCallbackMethod(callback, result)
      return callbackMethod ? callbackMethod(result) : result

      } catch (err) {
        that.ui('isSocketCommunicating', false)
        console.info(err.message)
        return this.error()
      }
    }

  emit (path, data = {}) {
    return new Promise(function (resolve, reject) {
      const jwtoken = that.auth.getJwtoken() || that.twitch.getJwtoken()
      const emit_uuid = that.helpers.string.uuid()


      that.socket.emit(emit_uuid, {
        ...data,
        path: `/extension${path}`,
        method: 'post',
        jwtoken,
      })

      that.emits[emit_uuid] = true

      const resetTrace = () => {
        that.emits[emit_uuid] = null
        delete that.emits[emit_uuid]
        that.timeouts[emit_uuid] = null
        delete that.timeouts[emit_uuid]
      }

      that.timeouts[emit_uuid] = setTimeout(() => {
        if (!that.emits[emit_uuid]) { return false }
        that.socket.off(emit_uuid)
        resetTrace()
        return reject()
      }, that.config.socket.timeout)

      that.socket.on(emit_uuid, result => {
        that.socket.off(emit_uuid)
        resetTrace()
        return resolve(result)
      })
    })
  }

  error (error_key = 'server.down') { return ({ error_key }) }

  getCallbackMethod (callback, result) {
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
    _.forEach(that.sockets, (classAddr, className) => {
      const keyName = className.replace('Socket', '').toLowerCase()
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

  callStart (api, method, callbackThis) {
    const callback = this.extractCallback(callbackThis)
    const callOrder = { api, method, callback, retry: 0 }
    this.status = true

    return this.execApiCall(callOrder).then(this.callResult)
  }

  registerEmit() { that.emit = this.emitHandler }

}
