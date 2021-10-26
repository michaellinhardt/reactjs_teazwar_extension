const { that, _ } = require('../../imports')
const { LibrarySuperclass } = require('../../superclass')

// https://dev.twitch.tv/docs/extensions/reference DOCS

module.exports = class TwitchLibrary extends LibrarySuperclass {
  constructor () {
    super ('TwitchLibrary')
    this.registerTwitchApi()
  }

  isLinked () { return (typeof (this.getUserId()) === 'string') }
  getJwtoken () { return _.get(this, '_twitch.viewer.sessionToken', null) }
  getSubscription () { return _.get(this, '_twitch.viewer.subscriptionStatus.tier', null) }
  getUserId () { return _.get(this, '_twitch.viewer.id', null) }
  getViewer () {
    return {
      jwtoken: this.getJwtoken(),
      subscription: this.getSubscription(),
      user_id: this.getUserId(),
    }
  }

  initViewerInRedux () { return this.onViewerChange() }
  async onViewerChange () {
    const viewer = this.getViewer()
    await that.ui('twitch_viewer', viewer)
  }

  async onAuthorized (auth) {

    // channelId    Channel ID of the page where the extension is iframe embedded.
    // clientId     Client ID of the extension.
    // token 	    JWT that should be passed to any EBS call for authentication.
    // helixToken 	JWT that can be used for front end API requests. See Using the Twitch API in an Extension Front End.
    // userId 	    Opaque user ID.

    const store = that.getStore()
    const currValues = _.get(store, 'ui.twitch_auth', {})
    const newValues = {}
    let isChange = false
    _.forEach(auth, (propValue, propName) => {
      if (currValues[propName] !== undefined) {
        isChange = true
        newValues[propName] = propValue
      }
    })

    if (isChange) { await that.ui('twitch_auth', newValues) }
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

  async onVisibilityCHange (isVisible, _c) {
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
    this._twitch.onVisibilityChanged(this.onVisibilityCHange)
    this._twitch.listen('broadcast', this.onBroadcastEvent)
    this._twitch.onAuthorized(this.onAuthorized)
    this._twitch.viewer.onChanged(this.onViewerChange)
    this.initViewerInRedux()
  }

  stopListening () { this._twitch.unlisten('broadcast', () => console.log('successfully unlistened')) }
}
