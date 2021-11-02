import { v1 as uuid } from 'uuid'

export default { uuid, firstUpper, firstLower, firstCharUpper, camelCaseString, camelCaseFileName, randomNumber }

function firstUpper (str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}

function firstLower (str) {
  return str.charAt(0).toLowerCase() + str.substring(1)
}

function firstCharUpper (string) {
  const lowered = string.toLowerCase()
  return lowered.charAt(0).toUpperCase() + lowered.slice(1)
}

function camelCaseString (string, char) {
  const nameSplit = string.split(char)

  const firstName = nameSplit.shift()

  const lastName = nameSplit
    .map(n => firstCharUpper(n))
    .join('')

  return `${firstName}${lastName}`
}

function camelCaseFileName (filename) {
  const nameSplit = filename.split('.')

  const firstName = nameSplit.shift()

  const lastName = nameSplit
    .map(n => firstCharUpper(n))
    .join('')

  return `${firstName}${lastName}`
}

function randomNumber (length) {
  let result = ''
  const characters = '0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
