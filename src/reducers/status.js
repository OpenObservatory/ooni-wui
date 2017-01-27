import {
  UPDATING_STATUS_SUCCEEDED,
  UPDATING_STATUS_FAILED
} from '../actions/status'

const ACTION_HANDLERS = {
  [UPDATING_STATUS_SUCCEEDED]: (state, action) => {
    return ({ ...action.status })
  },
  [UPDATING_STATUS_FAILED]: (state) => {
    return { ...state, running: false }
  }
}

const initialState = {
  initialized: null,
  softwareVersion: null,
  running: false,
  quotaWarning: false,
  countryCode: 'XX',
  asn: 'XX'
}
export function statusReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
