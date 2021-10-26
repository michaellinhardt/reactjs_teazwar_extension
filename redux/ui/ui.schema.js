const config = require('../../config')

export default {
  lang: config.language.default,

  sharedRunNextTimestamps: {},

  scene: null,

  twitch_player: {
    isVisible: true,

    // CONTEXT DATA
    arePlayerControlsVisible: false,
    displayResolution: '1920x1080',
    hlsLatencyBroadcaster: 0,
    hostingInfo: false,
    isFullScreen: false,
    isMuted: true,
    isPaused: true,
    mode: 'viewer',
    playbackMode: 'video',
    theme: 'dark',
    videoResolution: '1920x1080',
    volume: 0,
  },

  twitch_viewer: {
    jwtoken: null,
    subscription: null,
    user_id: null,
  },

  twitch_auth: {
    clientId: null,
    helixToken: null,
    token: null,
    userId: null,
  },

  game_event: null,

}