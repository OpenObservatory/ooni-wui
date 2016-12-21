import STATUS_UPDATE from '../actions/status'

const ACTION_HANDLERS = {
  [STATUS_UPDATE]: (state, action) => {
    return ({...action.payload})
  }
};

const initialState = {initialized: null};
export function statusReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
