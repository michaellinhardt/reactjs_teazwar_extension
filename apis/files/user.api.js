const { _ } = require('../../imports')

module.exports = class api {

  getUser () { return this.get('/user', this.token) }

  postLanguage () {
    const { ui } = this.store
    const language = _.get(ui, 'lang', 'en')
    return this.post('/user/language', this.token, { language })
  }

  getUserLogout () { return this.get('/user/logout', this.token) }

}
