import _ from 'lodash'

const { mergeWithCustomizer } = require('../../helpers/files/reducer.helper')

export const

  setUi = (state, action) =>
    ({ ...(_.mergeWith(state, { [action.key]: action.data }, mergeWithCustomizer)) }),

  setUis = (state, action) =>
    ({ ...(_.mergeWith(state, action.data, mergeWithCustomizer)) })
