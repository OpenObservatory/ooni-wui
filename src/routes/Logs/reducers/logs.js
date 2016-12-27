import {
  UPLOADING_LOGS,
  UPLOADING_LOGS_SUCCEEDED,
  LOADING_LOGS,
  LOADING_LOGS_SUCCEEDED
} from '../actions/logs'

const ACTION_HANDLERS = {
    [UPLOADING_LOGS]: (state) => {
        return ({...state, uploading: true})
    },
    [LOADING_LOGS]: (state) => {
        return ({...state, loading: true})
    },
    [LOADING_LOGS_SUCCEEDED]: (state, action) => {
        return ({...state, loading: false, latest: action.latest, older: action.older})
    }
};

const initialState = {
  loading: false,
  uploading: false,
  latest: "",
  older: []
};
export function logsReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}
