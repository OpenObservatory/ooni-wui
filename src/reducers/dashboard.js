import {
  CLICKED_RUN_TEST,
  CLOSED_RUN_TEST,
  CLICKED_RUN_DECK,
  CLOSED_RUN_DECK
} from '../actions/dashboard'

const ACTION_HANDLERS = {
  [CLICKED_RUN_DECK]: (state, action) => {
    return ({...state, runOpen: true, activeDeck: action.deckId})
  },
  [CLOSED_RUN_DECK]: (state, action) => ({
    ...state, runOpen: false, activeDeck: {}
  }),
  [CLICKED_RUN_TEST]: (state, action) => {
    return ({...state, activeTest: action.testId})
  },
  [CLOSED_RUN_TEST]: (state, action) => {
    return ({...state, activeTest: {}})
  },
};

const initialState = {
  runOpen: false,
  // XXX these should be implemented as selectors
  activeDeck: {},
  activeTest: {}
};

export function dashboardReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
}
