const
  types = {
    SAVE_RESSOURCES: 'SAVE_RESSOURCES',
    RESET_RESSOURCES: 'RESET_RESSOURCES',
  }

export default {
  types,
  resetRessources: (ressources = {}) => ({ type: types.RESET_RESSOURCES, ressources }),
  saveRessources: (ressources = {}) => ({ type: types.SAVE_RESSOURCES, ressources }),

}
