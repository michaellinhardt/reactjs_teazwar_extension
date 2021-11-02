import _ from 'lodash'
import { mergeWithCustomizer } from '../../helpers/reducer.helper'

export default {

  resetRessources: (state, action) => action.ressources,

  saveRessources: (state, action) => {
    const newState = { ...(_.mergeWith(
      state,
      action.ressources,
      mergeWithCustomizer)),
    }
    return newState
  },

}
