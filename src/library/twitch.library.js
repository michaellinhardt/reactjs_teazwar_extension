import Redux from '../redux'
import AuthLib from '../library/auth.library'

const { Store } = Redux

// https://dev.twitch.tv/docs/extensions/reference DOCS

let _twitch = null

function getTwitchJwtoken () {
  return _twitch.viewer.sessionToken
    || Store.getState().ui.twitch_auth.token
}

function isAuth () {
  return getTwitchJwtoken()
}

async function _onViewerChange () {
  Store.ui('twitch_viewer', _twitch.viewer)
}

async function _onAuthorized (twitch_auth) {
  await Store.ui('twitch_auth', twitch_auth)
  await AuthLib.login()
}

async function _onContextChange (context) {
  await Store.ui('twitch_player', context)
}

async function _onVisibilityChange (isVisible, _c) {
  const context = _c ? _c : {}
  context.isVisible = isVisible
  await _onContextChange(context)
}

async function _onBroadcastEvent (target, contentType, body) {
  console.info(`New PubSub message!\n${target}\n${contentType}\n${body}`)
}

function twitchStartListening () {
  _twitch = window.Twitch.ext
  _twitch.onContext(_onContextChange.bind(this))
  _twitch.onVisibilityChanged(_onVisibilityChange.bind(this))
  _twitch.listen('broadcast', _onBroadcastEvent.bind(this))
  _twitch.onAuthorized(_onAuthorized.bind(this))
  _twitch.viewer.onChanged(_onViewerChange.bind(this))
  _onViewerChange()
}

function twitchStopListening () {
  _twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
}

export default { getTwitchJwtoken, isAuth, twitchStartListening, twitchStopListening }
