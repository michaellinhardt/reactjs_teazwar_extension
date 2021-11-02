import _ from 'lodash'
import languages from '../data/languages'

let lang = () => true

const replacer = (message, ...args) => {
  let msg = message
  _.forEach(args, value => {
    msg = msg.replace('[?]', value)
  })
  return msg
}

const extractMessage = (lang, language_file, language_key) => {
  const message = languages[lang][language_file][language_key]
  return typeof (message) === 'object' && Array.isArray(message)
    ? _.sample(message) : message
}

const get = (lang, language_file, language_key, ...language_args) => {
  const message = extractMessage(lang, language_file, language_key)
  return replacer(message, ...language_args)
}

function fr (...args) { return get('fr', ...args) }
function en (...args) { return get('en', ...args) }

export default { lang, fr, en }
