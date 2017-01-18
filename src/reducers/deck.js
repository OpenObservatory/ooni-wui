import {
  RUN_DECK_FAILED,
  RUN_DECK_SUCCEEDED,
  LOADING_DECKS,
  LOADING_DECKS_FAILED,
  LOADING_DECKS_SUCCEEDED
} from '../actions/deck'

const ACTION_HANDLERS = {
  [RUN_DECK_SUCCEEDED]: (state, action) => ({
    ...state, decks: action.decks
  }),
  [LOADING_DECKS]: (state, action) => ({ ...state, loading: true, loadingFailed: false }),
  [LOADING_DECKS_SUCCEEDED]: (state, action) => {
    return { ...state, decks: action.decks, loading: false, loadingFailed: false }
  },
  // XXX Handle thse
  [RUN_DECK_FAILED]: (state, action) => state,
  [LOADING_DECKS_FAILED]: (state, action) => ({ ...state, loadingFailed: true })
}

const initialState = {
  runningDecks: [],
  loading: false,
  loadingFailed: false,
  decks: []
}

export function deckReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
