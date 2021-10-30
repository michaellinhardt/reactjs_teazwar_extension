const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

// https://dev.twitch.tv/docs/extensions/reference DOCS

module.exports = class TwitchLibrary extends LibrarySuperclass {
  constructor () {
    super ('TwitchLibrary')
    this.registerTwitchApi()
  }

  isAuth () { return this.getJwtoken() }
  getJwtoken () {
    return _.get(this, '_twitch.viewer.sessionToken', null)
      || _.get(that.getStore(), 'ui.twitch_auth.token', null)
  }

  initViewerInRedux () { return this.onViewerChange() }

  async onViewerChange () { that.ui('twitch_viewer', this._twitch.viewer) }

  async onAuthorized (twitch_auth) {
    await that.ui('twitch_auth', twitch_auth)

    await that.auth.login()
  }

  async onContextChange (context, delta = []) {
    const store = that.getStore()
    const currValues = _.get(store, 'ui.twitch_player', {})
    const newValues = {}
    let isChange = false
    if (delta.length === 0) {
      _.forEach(context, (newValue, propName) => {
        if (currValues[propName] !== undefined) {
          isChange = true
          newValues[propName] = newValue
        }
      })
    } else {
      _.forEach(delta, propName => {
        if (currValues[propName] !== undefined) {
          isChange = true
          const newValue = _.get(context, propName, null)
          newValues[propName] = newValue
        }
      })
    }

    if (isChange) { await that.ui('twitch_player', newValues) }
  }

  async onVisibilityChange (isVisible, _c) {
    const context = _c ? _c : {}
    context.isVisible = isVisible
    await this.onContextChange(context)
  }

  async onBroadcastEvent (target, contentType, body) {
    console.dedug(`New PubSub message!\n${target}\n${contentType}\n${body}`)
  }

  registerTwitchApi () {
    this._twitch = _.get(window, 'Twitch.ext', null)
    that._twitch = this._twitch
  }

  startListening () {
    this._twitch.onContext(this.onContextChange)
    this._twitch.onVisibilityChanged(this.onVisibilityChange)
    this._twitch.listen('broadcast', this.onBroadcastEvent)
    this._twitch.onAuthorized(this.onAuthorized)
    this._twitch.viewer.onChanged(this.onViewerChange)
    this.initViewerInRedux()
  }

  stopListening () { this._twitch.unlisten('broadcast', () => console.log('successfully unlistened')) }
}
