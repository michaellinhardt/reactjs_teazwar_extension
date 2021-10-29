const { that, _ } = require('../../imports')
const { GameSuperclass } = require('../../superclass')

module.exports = class SceneGame extends GameSuperclass {
  constructor () { super ('SceneGame') }

  getSceneName () { return _.get(that.getStore(), 'ressources.scene_name', 'scene_name_error') }

  isSceneData(sceneName) {
    const scene_name = sceneName ? sceneName : this.getSceneName()
    return _.get(that, `scenes.${scene_name}`, false) ? true : false
  }
  getSceneData (sceneName) {
    const scene_name = sceneName ? sceneName : this.getSceneName()
    return _.get(that, `scenes.${scene_name}`, that.scenes.scene_name_error)
  }

  setSceneName (scene_name) {
    const currentSceneName = this.getSceneName()

    if (!scene_name || scene_name === currentSceneName || !this.isSceneData(scene_name)) {
      return currentSceneName
    }
    that.ressources({ scene_name })
    return scene_name
  }
}
