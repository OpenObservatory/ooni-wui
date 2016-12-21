import {
  RUN_DECK_FAILED,
  RUN_DECK_SUCCEEDED,
  LOADING_DECKS,
  LOADING_DECKS_FAILED,
  LOADING_DECKS_SUCCEEDED
} from '../actions/deck'

const ACTION_HANDLERS = {
  [RUN_DECK_SUCCEEDED]: (state, action) => {
    let runningDecks = {...state.runningDecks}
    runningDecks.push(action.deckId)
    return {...state, runningDecks}
  },
  [LOADING_DECKS]: (state, action) => ({...state, loading: true}),
  [LOADING_DECKS_SUCCEEDED]: (state, action) => {
    return {...state, decks: action.decks, loading: false};
  },
  // XXX Handle thse
  [RUN_DECK_FAILED]: (state, action) => state,
  [LOADING_DECKS_FAILED]: (state, action) => state,
};

const initialState = {
  runningDecks: [],
  loading: false,
  decks: []
};

export function deckReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
}
