import Redux from '../redux'
import SocketLib from '../library/websocket.library'
import TwitchLib from '../library/twitch.library'

const { Store } = Redux

function getJwtoken () {
  return Store.getState().ressources.jwtoken
}

function isAuth () {
  return Store.getState().ressources.jwtoken
}

function logout () {
  Store.ressources({ jwtoken: null })
}

async function login () {
  if (TwitchLib.getTwitchJwtoken() && !isAuth()) {
    await SocketLib.emit('user', 'auth')
  }
}

export default { getJwtoken, isAuth, login, logout }
