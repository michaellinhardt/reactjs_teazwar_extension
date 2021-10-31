const config = require('../../config')

export default {

  isSocketConnected: false,
  isSocketCommunicating: false,

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

  twitch_viewer: {},
  twitch_auth: {},

}