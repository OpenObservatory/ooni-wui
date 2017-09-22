import { fetch } from '../util/api'

export const GOTO_STEP = 'GOTO_STEP'
export const NEXT_STEP = 'NEXT_STEP'
export const SKIP_TO_END = 'SKIP_TO_END'

export const SETTINGS_CHANGED = 'SETTINGS_CHANGED'

export const DECK_TOGGLED = 'DECK_TOGGLED'

export const QUIZ_ANSWERED = 'QUIZ_ANSWERED'
export const QUIZ_CHANGED = 'QUIZ_CHANGED'
export const QUIZ_CLOSED = 'QUIZ_CLOSED'

export const LOADING_INITIAL_DECKS = 'LOADING_INITIAL_DECKS'
export const LOADING_INITIAL_DECKS_SUCCEEDED = 'LOADING_INITIAL_DECKS_SUCCEEDED'
export const LOADING_INITIAL_DECKS_FAILED = 'LOADING_INITIAL_DECKS_FAILED'

export const INITIALIZING = 'INITIALIZING'
export const INITIALIZING_SUCCEEDED = 'INITIALIZING_SUCCEEDED'
export const INITIALIZING_FAILED = 'INITIALIZING_FAILED'

export const lastStep = 3
export const quizStep = 1

export const nextStep = () => {
  return {
    type: NEXT_STEP
  }
}

export const loadingDecks = () => ({
  type: LOADING_INITIAL_DECKS
})

export const initializing = () => ({
  type: INITIALIZING
})

export const initializingSucceeded = () => ({
  type: INITIALIZING_SUCCEEDED
})

export const initializingFailed = () => ({
  type: INITIALIZING_FAILED
})

export const loadingDecksSucceeded = (decks) => ({
  type: LOADING_INITIAL_DECKS_SUCCEEDED,
  decks
})
export const loadingDecksFailed = () => ({
  type: LOADING_INITIAL_DECKS_FAILED
})

export const loadDecks = () => (dispatch, getState) => {
  dispatch(loadingDecks())

  return fetch('/api/initialize')
    .then(data => data.json())
    .then(json => dispatch(loadingDecksSucceeded(json.available_decks)))
    .catch((ex) => {
      console.log('Got error', ex)
    })
}

export const finalize = () => (dispatch, getState) => {
  dispatch(initializing())
  const { onboard } = getState()
  let options = {
    include_ip: onboard.settings.includeIP,
    include_asn: onboard.settings.includeNetwork,
    include_country: onboard.settings.includeCountry,
    should_upload: onboard.settings.shareResults,
    preferred_backend: onboard.settings.uploadMethod,
    deck_config: {}
  }
  onboard.decks.forEach((deck) => {
    options['deck_config'][deck.id] = deck.enabled
  })
  return fetch('/api/initialize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  }).then(_ => dispatch(initializingSucceeded()))
    .catch((ex) => {
      console.log('Got error while initializing', ex)
      dispatch(initializingFailed())
    })
}

export const gotoStep = (stepNumber) => ({
  type: GOTO_STEP,
  payload: stepNumber
})

export const skipToEnd = () => ({
  type: SKIP_TO_END
})

export const settingsChanged = (key, value) => ({
  type: SETTINGS_CHANGED,
  key: key,
  value: value
})

export const deckToggled = (deckID) => ({
  type: DECK_TOGGLED,
  payload: deckID
})

export const quizAnswered = () => ({
  type: QUIZ_ANSWERED
})

export const quizClosed = () => ({
  type: QUIZ_CLOSED
})

export const quizChanged = (key, value) => ({
  type: QUIZ_CHANGED,
  key: key,
  value: value
})
