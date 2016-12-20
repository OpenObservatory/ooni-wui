export const GOTO_STEP = 'GOTO_STEP';
export const NEXT_STEP = 'NEXT_STEP';

export const SETTINGS_CHANGED = 'SETTINGS_CHANGED';

export const DECK_TOGGLED = 'DECK_TOGGLED';

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

export function settingsChanged(key, value) {
  return {
    type: SETTINGS_CHANGED,
    key: key,
    value: value
  }
}

export function deckToggled(deckID) {
  return {
    type: DECK_TOGGLED,
    payload: deckID
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
