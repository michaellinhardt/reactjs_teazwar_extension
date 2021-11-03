/* eslint-disable max-len */


// animationIn: 'tada',
// animationOut: null,
// animationInDelay: null,
// animationOutDelay: null,
// animationInDuration: null,
// animationOutDuration: null,

export default {

  stranger_welcome: {
    entry: {
      face_left: 'Teazyou',
      emotion: 'angry',
      message: 'Hey c\'est toi qui a volé mon makeup ??!!',
      answers: [
        {
          answer: 'Nooooo!',
          next_phrase_id: 'no_i_dont',
        }, {
          answer: 'Yes, and what?..',
          next_phrase_id: 'yes_i_do',
        }, {
          answer: 'Peut etre..',
          next_phrase_id: 'yes_i_do',
        },
      ],
      next_phrase_id: 'no_i_dont',
      animationIn: 'tada',
      animationOut: null,
      animationInDelay: null,
      animationOutDelay: null,
      animationInDuration: null,
      animationOutDuration: null,
    },
    no_i_dont: {
      face_right: 'Masochix',
      message: 'Pffffff, you lie to me ! I know it is you because...',
      next_phrase_id: 'you_gay',
    },
    yes_i_do: {
      face_right: 'Masochix',
      message: 'AHahahaha I knew it !!!!',
      next_phrase_id: 'you_gay',
    },
    you_gay: {
      face_right: 'Masochix',
      message: 'YOU ARE GAYYYYY',
      next_phrase_id: 'me_no_gay',
    },
    me_no_gay: {
      face_right: 'TeazYou',
      message: 'Shut the fuck up bitch, im not -.-',
    },
  },
}