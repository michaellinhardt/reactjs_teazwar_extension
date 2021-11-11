import kg from '../../data/generator/keys.generator'
import rg from '../../data/generator/ressources.array.generator'

const gid = 'm' // need to be 'm' or beard type will crash
const pid = kg.part[0]

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
    gender_id: gid,
    part_id: pid,
    emotion_id: 'default',

    accA: { gender_id: gid, part_id: pid, item_id: rg[gid].accA[0].item_id, x: 0, y: 0 },
    accB: { gender_id: gid, part_id: pid, item_id: rg[gid].accB[0].item_id, x: 0, y: 0 },
    beard: { gender_id: gid, part_id: pid, item_id: rg[gid].beard[0].item_id, x: 0, y: 0 },
    beastEars: { gender_id: gid, part_id: pid, item_id: rg[gid].beastEars[0].item_id, x: 0, y: 0 },
    body: { gender_id: gid, part_id: pid, item_id: rg[gid].body[0].item_id, x: 0, y: 0 },
    cloak: { gender_id: gid, part_id: pid, item_id: rg[gid].cloak[0].item_id, x: 0, y: 0 },
    clothing: { gender_id: gid, part_id: pid, item_id: rg[gid].clothing[0].item_id, x: 0, y: 0 },
    ears: { gender_id: gid, part_id: pid, item_id: rg[gid].ears[0].item_id, x: 0, y: 0 },
    eyebrows: { gender_id: gid, part_id: pid, item_id: rg[gid].eyebrows[0].item_id, x: 0, y: 0 },
    eyes: { gender_id: gid, part_id: pid, item_id: rg[gid].eyes[0].item_id, x: 0, y: 0 },
    face: { gender_id: gid, part_id: pid, item_id: rg[gid].face[0].item_id, x: 0, y: 0 },
    facialMark: { gender_id: gid, part_id: pid, item_id: rg[gid].facialMark[0].item_id, x: 0, y: 0 },
    frontHair: { gender_id: gid, part_id: pid, item_id: rg[gid].frontHair[0].item_id, x: 0, y: 0 },
    glasses: { gender_id: gid, part_id: pid, item_id: rg[gid].glasses[0].item_id, x: 0, y: 0 },
    mouth: { gender_id: gid, part_id: pid, item_id: rg[gid].mouth[0].item_id, x: 0, y: 0 },
    nose: { gender_id: gid, part_id: pid, item_id: rg[gid].nose[0].item_id, x: 0, y: 0 },
    rearHair: { gender_id: gid, part_id: pid, item_id: rg[gid].rearHair[0].item_id, x: 0, y: 0 },
    tail: { gender_id: gid, part_id: pid, item_id: rg[gid].tail[0].item_id, x: 0, y: 0 },
    wing: { gender_id: gid, part_id: pid, item_id: rg[gid].wing[0].item_id, x: 0, y: 0 },
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
