import {
  CLICKED_RUN_TEST,
  CLOSED_RUN_TEST,
  CLICKED_RUN_DECK,
  CLOSED_RUN_DECK
} from '../actions/dashboard'

const ACTION_HANDLERS = {
  [CLICKED_RUN_DECK]: (state, action) => ({
    ...state, runOpen: true, activeDeckId: action.deckId, activeNettestId: null
  }),
  [CLOSED_RUN_DECK]: (state, action) => ({
    ...state, runOpen: false, activeDeckId: null, activeNettestId: null
  }),
  [CLICKED_RUN_TEST]: (state, action) => ({
    ...state, activeNettestId: action.nettestId
  }),
  [CLOSED_RUN_TEST]: (state, action) => ({
    ...state, activeNettestId: null
  })
}

const initialState = {
  runOpen: false,
  activeDeckId: null,
  activeNettestId: null
}

export function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
