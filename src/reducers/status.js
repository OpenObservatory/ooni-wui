import {
  UPDATING_STATUS_SUCCEEDED
} from '../actions/status'

const ACTION_HANDLERS = {
  [UPDATING_STATUS_SUCCEEDED]: (state, action) => {
    return ({...action.status})
  }
};

const initialState = {
  initialized: null,
  softwareVersion: null,
  running: false,
  quotaWarning: false,
  countryCode: 'XX',
  asn: 'XX'
};
export function statusReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
