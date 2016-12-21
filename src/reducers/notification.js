import { RECEIVED_NOTIFICATION } from '../actions/notification'

const maximumLength = 4;

const ACTION_HANDLERS = {
    [RECEIVED_NOTIFICATION]: (state, action) => {
      let messages = [...state.messages.slice(-1 * (maximumLength + 1))]
      messages.push({...action.payload})
      return ({...state, messages: messages})
    }
};

const initialState = {
  messages: []
};
export function notificationReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
}
