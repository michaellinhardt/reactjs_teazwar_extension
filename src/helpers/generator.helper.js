import gameConfig from '../config/game.config'
const { partCanBeNull } = gameConfig.generator
import kg from '../data/generator/keys.generator'
import rg from '../data/generator/ressources.array.generator'

const defaultPartId = kg.part[0]

const getDefaultItemId = (gender_id, part_id) => ({
  gender_id, x: 0, y: 0,
  item_id: partCanBeNull[part_id]
    ? null
    : rg[gender_id][part_id][0].item_id,
})

export default {

  getDefaultGenderId: () => 'm',
  getDefaultPartId: () => defaultPartId,

  getDefaultItemId,

  getDefaultTemplate: gender_id => ({
    gender_id,
    part_id: defaultPartId,
    emotion_id: 'default',

    accA: getDefaultItemId(gender_id, 'accA'),
    accB: getDefaultItemId(gender_id, 'accB'),
    beard: getDefaultItemId(gender_id, 'beard'),
    beastEars: getDefaultItemId(gender_id, 'beastEars'),
    body: getDefaultItemId(gender_id, 'body'),
    cloak: getDefaultItemId(gender_id, 'cloak'),
    clothing: getDefaultItemId(gender_id, 'clothing'),
    ears: getDefaultItemId(gender_id, 'ears'),
    eyebrows: getDefaultItemId(gender_id, 'eyebrows'),
    eyes: getDefaultItemId(gender_id, 'eyes'),
    face: getDefaultItemId(gender_id, 'face'),
    facialMark: getDefaultItemId(gender_id, 'facialMark'),
    frontHair: getDefaultItemId(gender_id, 'frontHair'),
    glasses: getDefaultItemId(gender_id, 'glasses'),
    mouth: getDefaultItemId(gender_id, 'mouth'),
    nose: getDefaultItemId(gender_id, 'nose'),
    rearHair: getDefaultItemId(gender_id, 'rearHair'),
    tail: getDefaultItemId(gender_id, 'tail'),
    wing: getDefaultItemId(gender_id, 'wing'),
  }),

}
