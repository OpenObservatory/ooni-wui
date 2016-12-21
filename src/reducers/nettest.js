import {
  RUN_NETTEST,
  LOADING_NETTESTS,
  LOADING_NETTESTS_SUCCEEDED,
  LOADING_NETTESTS_FAILED,
}
from '../actions/nettest'

const ACTION_HANDLERS = {
  [RUN_NETTEST]: (state, action) => state,
  [LOADING_NETTESTS]: (state, action) => ({...state, loading: true}),
  [LOADING_NETTESTS_SUCCEEDED]: (state, action) => {
    return {...state, nettests: action.nettests, loading: false};
  },
  [LOADING_NETTESTS_FAILED]: (state, action) => {
    return {...state, loading: false};
  }
};

const initialState = {
  loading: false,
  nettests: []
};
export function nettestReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
}
