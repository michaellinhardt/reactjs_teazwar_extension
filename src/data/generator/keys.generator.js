import _ from 'lodash'

const lists = {
  part: [
    'accA',
    'accB',
    'beard',
    'beastEars',
    'body',
    'cloak',
    'clothing',
    'ears',
    'eyebrows',
    'eyes',
    'face',
    'facialMark',
    'frontHair',
    'glasses',
    'mouth',
    'nose',
    'rearHair',
    'tail',
    'wing',
  ],
  gender: [
    'f',
    'k',
    'm',
  ],
}

lists.partIndex = {}
_.forEach(lists.part, (part, index) => { lists.partIndex[part] = index })

export default lists
