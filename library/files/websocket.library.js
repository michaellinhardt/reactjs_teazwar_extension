const { that, _, io } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

module.exports = class WebsocketLibrary extends LibrarySuperclass {
  constructor () { super ('WebsocketLibrary') }

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
    that.scene('loading')
  }

  onConnectError (reason) {
    console.log('Socket Connection Error')
    that.scene('loading')
  }

  connect() {
    if (that.socket) { return that.socket }
    console.debug('start connection')
    that.scene('loading')

    that.socket = io(that.config.url.socket)
    that.socket.on('connect', this.onConnect)
    that.socket.on('disconnect', this.onDisconnect)
    that.socket.on('connect_error', this.onConnectError)
    return that.socket
  }

}
