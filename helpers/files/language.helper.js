const _ = require('lodash')
const language = require('../../languages')
const config = require('../../config')

const replacer = (message, ...args) => {
  let msg = message
  _.forEach(args, value => {
    msg = msg.replace('[?]', value)
  })
  return msg
}

const extractMessage = (lang, language_file, language_key) => {
  const message = _.get(language, `${lang}.${language_file}.${language_key}`, language_key)
  return typeof (message) === 'object' && Array.isArray(message)
    ? _.sample(message) : message
}

const get = (lang, language_file, language_key, ...language_args) => {
  const message = extractMessage(lang, language_file, language_key)
  return replacer(message, ...language_args)
}

module.exports = {

  get: (...args) => get(config.language.default, ...args),
  fr: (...args) => get('fr', ...args),
  en: (...args) => get('en', ...args),

}
