import _ from 'lodash'

const { mergeWithCustomizer } = require('../../helpers/files/reducer.helper')

export const

  resetRessources = (state, action) => {
    return action.ressources
  },

  saveRessources = (state, action) => {
    const newState = { ...(_.mergeWith(
      state,
      action.ressources,
      mergeWithCustomizer)),
    }
    return newState
  }
