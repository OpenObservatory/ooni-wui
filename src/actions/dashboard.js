export const CLICKED_RUN_DECK = 'CLICKED_RUN_DECK'
export const CLOSED_RUN_DECK = 'CLOSED_RUN_DECK'

export const CLICKED_RUN_TEST = 'CLICKED_RUN_TEST'
export const CLOSED_RUN_TEST = 'CLOSED_RUN_TEST'

export const clickedRunDeck = (deckId) => ({
  type: CLICKED_RUN_DECK,
  deckId
})

export const closedRunDeck = () => ({
  type: CLOSED_RUN_DECK
})

// XXX this should be nettest
export const clickedRunTest = (testId) => ({
  type: CLICKED_RUN_TEST,
  testId
})
export const closedRunTest = () => ({
  type: CLOSED_RUN_TEST
})

