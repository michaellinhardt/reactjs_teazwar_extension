import generatorHelper from "../../helpers/generator.helper"
const { getDefaultGenderId, getDefaultTemplate } = generatorHelper


const gid = getDefaultGenderId()
const generatorDefaultTemplate = getDefaultTemplate(gid)

export default {
  jwtoken: false,
  language: 'fr',

  scene_data: {

    dialogueEco: {
      isVisible: false,
    },

    loadingEco: {
      isVisible: true
    },

    generatorEco: {
      isVisible: true
    },

  },

  generator: {
    ...generatorDefaultTemplate,
  },

  cutscene: {
    listener_cutscene_cutscene: 0,
    listener_cutscene_answer: 0,

    cutscene_id: null,
    scene_id: null,
  },

  dialogue: {
    dialogue_id: null,
    phrase_id: null,
    answer: null,
  },


}
