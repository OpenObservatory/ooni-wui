export const GOTO_STEP = 'GOTO_STEP';
export const NEXT_STEP = 'NEXT_STEP';

export const SETTINGS_CHANGED = 'SETTINGS_CHANGED';

export const DECKS_CHANGED = 'DECKS_CHANGED';
export const DECK_INFO_CLICKED = 'DECK_INFO_CLICKED';

export const QUIZ_ANSWERED = 'QUIZ_ANSWERED';
export const QUIZ_CHANGED = 'QUIZ_CHANGED';
export const QUIZ_CLOSED = 'QUIZ_CLOSED';

export const lastStep = 3;
export const quizStep = 1;

export function nextStep() {
  return {
    type: NEXT_STEP
  }
}

export function finalize() {
  return (dispatch, getState) => {
    const state = getState();
    console.log(state);
    const settings = {};
    return fetch('/api/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
  }
}

export function gotoStep(stepNumber) {
  return {
    type: GOTO_STEP,
    payload: stepNumber
  }
}

export function deckInfoClick(deckID) {
  return {
    type: DECK_INFO_CLICKED,
    payload: deckID
  }
}

export function settingsChanged(key, value) {
  return {
    type: SETTINGS_CHANGED,
    key: key,
    value: value
  }
}

export function decksChanged(key, value) {
  return {
    type: DECKS_CHANGED,
    key: key,
    value: value
  }
}

export function quizAnswered() {
  return {
    type: QUIZ_ANSWERED
  }
}

export function quizClosed() {
  return {
    type: QUIZ_CLOSED
  }
}

export function quizChanged(key, value) {
  return {
    type: QUIZ_CHANGED,
    key: key,
    value: value
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GOTO_STEP]: (state, action) => {
    if (state.currentStep < action.payload) return state;
    return ({...state, currentStep: action.payload, quizOpen: false})
  },
  [NEXT_STEP]: (state) => {
    if (state.currentStep == lastStep) {
      return state;
    }
    if (state.currentStep == quizStep && !state.quizCorrect) {
      return ({...state, quizOpen: true});
    }
    return ({...state, currentStep: state.currentStep + 1, quizOpen: false})
  },
  [SETTINGS_CHANGED]: (state, action) => {
    let settings = Object.assign({}, state.settings);
    settings[action.key] = action.value;
    return ({...state, settings: settings})
  },
  [DECKS_CHANGED]: (state, action) => {
    let decks = [];
    state.decks.forEach((deck) => {
      if (deck.id == action.key) {
        deck.enabled = action.value;
      }
      decks.push(deck);
    });
    return ({...state, decks: decks})
  },
  [DECK_INFO_CLICKED]: (state, action) => {
    let decks = [];
    state.decks.forEach((deck) => {
      if (deck.id == action.payload) {
        deck.infoBoxOpen = !deck.infoBoxOpen;
      }
      decks.push(deck);
    });
    return ({...state, decks: decks})
  },
  [QUIZ_CLOSED]: (state) => {
    return ({...state, quizCorrect: null, quizOpen: false})
  },
  [QUIZ_CHANGED]: (state, action) => {
    let answers = Object.assign({}, state.quizAnswers);
    answers[action.key] = action.value;
    return ({...state, quizAnswers: answers})
  },
  [QUIZ_ANSWERED]: (state) => {
    if (state.quizAnswers.question1 == true
        && state.quizAnswers.question2 == true) {
      return ({...state, quizCorrect: true});
    }
    return ({...state, quizCorrect: false});
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentStep: 0,
  quizAnswers: {
    question1: null,
    question2: null
  },
  quizOpen: false,
  quizCorrect: null,
  settings: {
    uploadMethod: 'tor_hidden_service',
    includeNetwork: true,
    includeCountry: true,
    includeIP: false,
    shareResults: true
  },
  decks: [
    // XXX Move these into a fetch
    {
      id: 'web',
      name: 'Test URLs',
      icon: 'fa-unlink',
      description: 'Lorem',
      enabled: true,
      infoBoxOpen: false
    },
    {
      id: 'im',
      name: 'Test Messaging Apps',
      icon: 'fa-comment-o',
      description: 'Lorem',
      enabled: true,
      infoBoxOpen: false
    },
    {
      id: 'tor',
      name: 'Test Circumvention Tools',
      icon: 'fa-wrench',
      description: 'Lorem',
      enabled: true,
      infoBoxOpen: false
    },
    {
      id: 'http-invalid-request-line',
      name: 'Test for Surveillance',
      icon: 'fa-eye',
      description: 'Lorem',
      enabled: true,
      infoBoxOpen: false
    }
  ]
};

export function onboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
