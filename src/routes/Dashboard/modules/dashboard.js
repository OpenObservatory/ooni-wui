import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------

export const RUN_DECK_CLICKED = 'RUN_DECK_CLICKED';
export const RUN_DECK_CLOSE = 'RUN_DECK_CLOSE';

export const RUN_TEST_CLICKED = 'RUN_TEST_CLICKED';
export const RUN_TEST_CLOSE = 'RUN_TEST_CLOSE';

export const START_DECK = 'START_DECK';
export const START_NETTEST = 'START_NETTEST';

export const TOGGLE_DECK = 'TOGGLE_DECK';

export const LOADING_DECKS = 'LOADING_DECKS';
export const LOADED_DECKS = 'LOADED_DECKS';
export const LOADED_DECK = 'LOADED_DECK';

export const LOADING_TESTS = 'LOADING_TESTS';
export const LOADED_TESTS = 'LOADED_TESTS';

export function runDeckClicked(deckID) {
  return {
    type: RUN_DECK_CLICKED,
    payload: deckID
  }
}
export function runDeckClose() {
  return {
    type: RUN_DECK_CLOSE
  }
}

export function runTestClicked(testID) {
  console.log("Clicked on ", testID);
  return {
    type: RUN_TEST_CLICKED,
    payload: testID
  }
}

export function runTestClose() {
  return {
    type: RUN_TEST_CLOSE
  }
}

export function startDeck(deckID) {
  return {
    type: START_DECK,
    payload: deckID
  }
}

export function startTest(testID, options) {
  return {
    type: START_NETTEST,
    payload: {testID, options}
  }
}

export function toggleDeck(deckID) {
  return (dispatch, getState) => {
    let deck = {...getState().dashboard.decks.find((deck) => (deck.id == deckID))};
    deck.enabled = !deck.enabled;
    const action = deck.enabled ? 'enable' : 'disable';
    fetch(`/api/deck/${deck.id}/${action}`, {method: 'POST'})
      .then(data => data.json())
      .then(json => {
        dispatch(loadedDeck(deck.id, deck));
      })
      .catch((ex) => {
        console.log("Failed to fetch decks", ex);
      });
  }
}

export function fetchTests() {
  return (dispatch, getState) => {
    dispatch(loadingTests());

    fetch('/api/nettest')
      .then(data => data.json())
      .then(json => dispatch(loadedTests(json)))
      .catch((ex) => {
        console.log("Failed to fetch tests", ex);
      });
  }
}

export function loadingTests() {
  return {
    type: LOADING_TESTS
  }
}
export function loadedTests(tests) {
  return {
    type: LOADED_TESTS,
    payload: tests
  }
}

export function fetchDecks() {
  return (dispatch, getState) => {
    dispatch(loadingDecks());

    fetch('/api/deck')
      .then(data => data.json())
      .then(json => json.decks.map((deck) => ({...deck, infoBoxOpen: false})))
      .then(decks => dispatch(loadedDecks(decks)))
      .catch((ex) => {
        console.log("Failed to fetch decks", ex);
      });
  }
}

export function loadingDecks() {
  return {
    type: LOADING_DECKS
  }
}
export function loadedDecks(decks) {
  return {
    type: LOADED_DECKS,
    payload: decks
  }
}

export function loadedDeck(deckID, deckInfo) {
  return {
    type: LOADED_DECK,
    payload: {deckID, deckInfo}
  }
}

export const actions = {
  startDeck,
  startTest,
  toggleDeck,
  runDeckClicked
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [START_DECK]: (state, action) => state,
  [START_NETTEST]: (state, action) => state,
  [TOGGLE_DECK]: (state, action) => state,
  [RUN_TEST_CLOSE]: (state, action) => {
    return {...state, activeTest: {}}
  },
  [RUN_TEST_CLICKED]: (state, action) => {
    const activeTest = {...state.tests[action.payload]};
    return {...state, activeTest: activeTest}
  },
  [RUN_DECK_CLOSE]: (state, action) => {
    return {...state, runOpen: false, activeDeck: {}}
  },
  [RUN_DECK_CLICKED]: (state, action) => {
    const activeDeck = state.decks.find((deck) => (deck.id == action.payload));
    return {...state, runOpen: true, activeDeck: activeDeck};
  },
  [LOADING_TESTS]: (state, action) => ({...state, loadingTests: true}),
  [LOADED_TESTS]: (state, action) => {
    return {...state, tests: action.payload, loadingTests: false};
  },
  [LOADING_DECKS]: (state, action) => ({...state, loadingDecks: true}),
  [LOADED_DECKS]: (state, action) => {
    return {...state, decks: action.payload, loadingDecks: false};
  },
  [LOADED_DECK]: (state, action) => {
    const {deckID, deckInfo} = action.payload;
    return {...state, decks: state.decks.map((deck) => {
      if (deck.id == deckID) return {...deckInfo, loading: false};
      return deck;
    })};
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  runOpen: false,
  activeDeck: {},
  activeTest: {},
  loadingDecks: false,
  loadingTests: false,
  tests: {},
  recentResults: [
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "tcp_connect",
      "test_start_time": "20161214T085527Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T085527Z-GR-AS1241-tcp_connect",
      "deck_id": "tor",
      "result": "ok"
    },
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "meek_fronted_requests_test",
      "test_start_time": "20161214T080637Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080637Z-GR-AS1241-meek_fronted_requests_test",
      "deck_id": "tor",
      "result": "ok"
    },
    {
      "size": -1,
      "running": true,
      "country_code": "GR",
      "test_name": "facebook_messenger",
      "test_start_time": "20161214T080551Z",
      "completed": true,
      "keep": false,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080551Z-GR-AS1241-facebook_messenger",
      "deck_id": "im",
      "result": "error"
    },
    {
      "size": -1,
      "running": false,
      "country_code": "GR",
      "test_name": "web_connectivity",
      "test_start_time": "20161214T080502Z",
      "completed": true,
      "keep": true,
      "asn": "AS1241",
      "stale": false,
      "id": "20161214T080502Z-GR-AS1241-web_connectivity",
      "deck_id": "web",
      "result": "error"
    }
  ],
  decks: []
};

export function dashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
