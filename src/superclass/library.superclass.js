import CodeHelper from '../helpers/code.helper'

export default class LibrarySuperclass {
  constructor (className) {
    this.name = className
    CodeHelper.autoBindMethod(this)
  }
}