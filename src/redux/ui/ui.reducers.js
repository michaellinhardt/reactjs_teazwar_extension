import _ from 'lodash'

import { mergeWithCustomizer } from '../../helpers/reducer.helper'

export default {

  setUi: (state, action) =>
    ({ ...(_.mergeWith(state, { [action.key]: action.data }, mergeWithCustomizer)) }),

  setUis: (state, action) =>
    ({ ...(_.mergeWith(state, action.data, mergeWithCustomizer)) }),

}
