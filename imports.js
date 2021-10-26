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

    // ressources
    helpers: require('./helpers'),
    config: require('./config'),
    apis: require('./apis'),
    store: require('./redux').store,

    // ressources data
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
}