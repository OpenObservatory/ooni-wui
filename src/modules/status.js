// ------------------------------------
// Constants
// ------------------------------------
import fetch from 'isomorphic-fetch';
export const STATUS_UPDATE = 'STATUS_UPDATE';

// ------------------------------------
// Actions
// ------------------------------------

export function updateStatus(value) {
  return {
    type: STATUS_UPDATE,
    payload: value
  }
}

export function fetchStatus() {
  return (dispatch, getState) => {
    return fetch('/api/status')
      .then(data => data.json())
      .then(json => dispatch(updateStatus(json)))
      .catch((ex) => {
        console.log("Failed to update status");
      });
  }
}

export const actions = {
  updateStatus,
  fetchStatus
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [STATUS_UPDATE]: (state, action) => {
    return ({...action.payload})
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {initialized: null};
export function statusReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
