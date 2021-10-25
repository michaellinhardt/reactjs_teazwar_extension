const uuid = require('uuid').v1

const firstCharUpper = string => {
  const lowered = string.toLowerCase()
  return lowered.charAt(0).toUpperCase() + lowered.slice(1)
}

module.exports = {

  firstUpper: str => str.charAt(0) + str.substring(1).toLowerCase(),
  firstLower: str => str.charAt(0).toLowerCase() + str.substring(1),

  uuid,

  firstCharUpper,

  camelCaseString: (string, char) => {
    const nameSplit = string.split(char)

    const firstName = nameSplit.shift()

    const lastName = nameSplit
      .map(n => firstCharUpper(n))
      .join('')

    return `${firstName}${lastName}`
  },

  camelCaseFileName: filename => {
    const nameSplit = filename.split('.')

    const firstName = nameSplit.shift()

    const lastName = nameSplit
      .map(n => firstCharUpper(n))
      .join('')

    return `${firstName}${lastName}`
  },

  randomNumber: length => {
    let result = ''
    const characters = '0123456789'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  },

}
