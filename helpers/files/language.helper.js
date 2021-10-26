const _ = require('lodash')
const config = require('../../config')
const languages = require('../../data/languages')

// console.debug('yo bitch', require('../../imports'), window._teazwar)

const replacer = (message, ...args) => {
  let msg = message
  _.forEach(args, value => {
    msg = msg.replace('[?]', value)
  })
  return msg
}

const extractMessage = (lang, language_file, language_key) => {
  const message = _.get(languages, `${lang}.${language_file}.${language_key}`, language_key)
  return typeof (message) === 'object' && Array.isArray(message)
    ? _.sample(message) : message
}

const get = (lang, language_file, language_key, ...language_args) => {
  const message = extractMessage(lang, language_file, language_key)
  return replacer(message, ...language_args)
}

module.exports = {

  lang: (...args) => get(config.language.default, ...args),
  fr: (...args) => get('fr', ...args),
  en: (...args) => get('en', ...args),

}
