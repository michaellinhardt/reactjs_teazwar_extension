export const

  types = {
    SAVE_RESSOURCES: 'SAVE_RESSOURCES',
    RESET_RESSOURCES: 'RESET_RESSOURCES',
  },

  resetRessources = (ressources = {}) => ({ type: types.RESET_RESSOURCES, ressources }),
  saveRessources = (ressources = {}) => ({ type: types.SAVE_RESSOURCES, ressources })
