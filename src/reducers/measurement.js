import {
  LOADING_MEASUREMENTS,
  LOADING_MEASUREMENTS_FAILED,
  LOADING_MEASUREMENTS_SUCCEEDED
} from '../actions/measurement'

const ACTION_HANDLERS = {
    [LOADING_MEASUREMENTS_FAILED]: (state, action) => {
      return ({...state, failed: true, loading: false, failure: action.ex})
    },
    [LOADING_MEASUREMENTS_SUCCEEDED]: (state, action) => {
        return ({...state, loading: false, measurements: action.measurements})
    },
    [LOADING_MEASUREMENTS]: (state) => {
      return ({...state, loading: true})
    }
};

const initialState = {
  failed: false,
  failure: null,
  loading: false,
  measurements: []
}
export function measurementReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
