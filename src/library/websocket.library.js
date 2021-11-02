import { io } from 'socket.io-client'
import cfgUrl from '../config/url.config'
import cfgSocket from '../config/socket.config'
import CodeHelper from '../helpers/code.helper'
import StringHelper from '../helpers/string.helper'
import Redux from '../redux'
import AuthLib from '../library/auth.library'
import TwitchLib from '../library/twitch.library'
import getSendParams from '../sockets'

const { Store } = Redux

const ws = {
  emits: {},
  timeouts: {},
  socket: null,
}

async function onConnect () {
  Store.ui('socket_id', ws.socket.id)
  await AuthLib.login()
  await emit('data', 'init')
  Store.ui('isSocketConnected', true)
  ws.socket.onAny((...args) => onSocketMessage(...args))
}

function onSocketMessage (event, data) {
  console.log('Socket Message:', event, data)
}

function onDisconnect (reason) {
  Store.uis({
    isSocketConnected: false,
    socket_id: null,
  })
  console.log('Socket Disconnecter:', reason)
  AuthLib.logout()
}

function onConnectError () {
  console.log('Socket Connection Error')
  AuthLib.logout()
}

function connectSocket () {
  if (ws.socket) { return ws.socket }

  ws.socket = io(cfgUrl.socket)
  ws.socket.on('connect', onConnect)
  ws.socket.on('disconnect', onDisconnect)
  ws.socket.on('connect_error', onConnectError)
}

async function emit (api, method, callbackMethods = {}) {
  if (!ws.socket) { return unknowError() }
  try {
    Store.ui('isSocketCommunicating', true)

    const callback = {
      onCallSuccess: callbackMethods.onCallSuccess || callbackMethods.onCallResult || null,
      onCallError: callbackMethods.onCallError || callbackMethods.onCallResult || null,
      onServerDown: callbackMethods.onServerDown || callbackMethods.onCallResult || null,
      onCallResult: callbackMethods.onCallResult || null,
    }

    const { path, data } = getSendParams[api][method](Store.getState())
    const result = await send(path, data)
    const ressources = result.ressources || {}
    const errorKey = ressources.error_key || ''

    if (errorKey) { await CodeHelper.sleep(cfgSocket.sleepOnError) }
    if (errorKey.startsWith('jwtoken')) { AuthLib.logout() }

    await Store.ressources(ressources)

    Store.ui('isSocketCommunicating', false)
    const callbackMethod = getCallbackMethod(callback, ressources)
    return callbackMethod ? callbackMethod(ressources) : ressources

  } catch (err) {
    Store.ui('isSocketCommunicating', false)
    console.info(err.message)
    return unknowError()
  }
}

function send (path, data = {}) {
  return new Promise(function (resolve, reject) {
    const jwtoken = AuthLib.getJwtoken() || TwitchLib.getTwitchJwtoken()
    const emit_uuid = StringHelper.uuid()


    ws.socket.emit(emit_uuid, {
      ...data,
      path: `/extension${path}`,
      method: 'post',
      jwtoken,
    })

    ws.emits[emit_uuid] = true

    const resetTrace = () => {
      ws.emits[emit_uuid] = null
      delete ws.emits[emit_uuid]
      ws.timeouts[emit_uuid] = null
      delete ws.timeouts[emit_uuid]
    }

    ws.timeouts[emit_uuid] = setTimeout(() => {
      if (!ws.emits[emit_uuid]) { return false }
      ws.socket.off(emit_uuid)
      resetTrace()
      return reject()
    }, cfgSocket.timeout)

    ws.socket.on(emit_uuid, result => {
      ws.socket.off(emit_uuid)
      resetTrace()
      return resolve(result)
    })
  })
}

function unknowError (error_key = 'server.down') { return ({ error_key }) }

function getCallbackMethod (callback, result) {
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

export default { connectSocket, emit }
