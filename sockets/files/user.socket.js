
module.exports = class socket {

  auth () {
    const { socket } = this.imports.that
    return this.emit('/user/auth', { socket_id: socket.id })
  }

}
