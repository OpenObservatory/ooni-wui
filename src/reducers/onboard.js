import {
  GOTO_STEP,
  NEXT_STEP,
  SETTINGS_CHANGED,
  DECK_TOGGLED,
  QUIZ_CLOSED,
  QUIZ_CHANGED,
  QUIZ_ANSWERED,
  lastStep,
  quizStep
} from '../actions/onboard'

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
    let settings = {...state.settings};
    settings[action.key] = action.value;
    return ({...state, settings: settings})
  },
  [DECK_TOGGLED]: (state, action) => {
    let decks = [];
    state.decks.forEach((deck) => {
      if (deck.id == action.payload) {
        deck.enabled = !deck.enabled;
      }
      decks.push(deck);
    });
    return ({...state, decks: decks})
  },
  [QUIZ_CLOSED]: (state) => {
    return ({...state, quizCorrect: null, quizOpen: false})
  },
  [QUIZ_CHANGED]: (state, action) => {
    let answers = {...state.quizAnswers};
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
