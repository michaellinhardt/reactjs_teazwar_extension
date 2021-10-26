require('regenerator-runtime/runtime')


if (!window._teazwar) {
  console.debug('CREATING GLOBAL _TEAZWAR')

  const helpers = require('./helpers')

  window._teazwar = {

    // globals var
    globals: {
      inputs: {},
      library: {
        tsnLibraryRuns: {},
        boolStateRuns: {},
      },
    },

    // Socket connection
    socket: null,

    // ressources
    helpers: require('./helpers'),
    config: require('./config'),
    apis: require('./apis'),
    store: require('./redux').store,

    // ressources data
    scenes: require('./data/scenes'),
    images: require('./data/images'),
    languages: require('./data/languages'),

    // method 'lang, fr and en'  from language helper
    ...helpers.language,
  }

}

module.exports = {
  that: window._teazwar,

  // modules
  _: require('lodash'),
  moment: require('moment'),
  uuid: require('uuid').v1,
  ReactDOM: require('react-dom'),
  React: require('react'),
  Img: require('react-image').Img,
  io: require('socket.io-client').io,
  connect: require('./redux').connect,

}