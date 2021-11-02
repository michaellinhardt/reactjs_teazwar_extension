import CodeHelper from '../helpers/code.helper'

export default class GameSuperclass {
  constructor (className) {
    this.name = className
    CodeHelper.autoBindMethod(this)
  }
}