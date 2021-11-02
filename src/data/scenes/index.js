import _ from 'lodash'

import global from './files/global.scene'
import cutscene from './files/cutscene.scene'

const scene = {
  ...global,
  ...cutscene,
}

const addLayout = () => {
  _.forEach(scene, (data, name) => {
    if (typeof(data.layout) === 'string') {
      const layout = _.get(scene, data.layout, null)
      if (layout) {
        delete scene[name].layout

        scene[name] = {
          ...layout,
          ...scene[name],
        }
      }
    }
  })
}

addLayout()
addLayout()

export default scene