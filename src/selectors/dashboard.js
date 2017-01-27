import { createSelector } from 'reselect'

import {
  getDecks
} from './deck'

export const getActiveDeckId = (state) => state.dashboard.activeDeckId
export const getActiveNettestId = (state) => state.dashboard.activeNettestId
export const getNettests = (state) => state.nettest.nettests

export const getActiveDeck = createSelector(
  [getActiveDeckId, getDecks, getNettests],
  (activeDeckId, decks) => {
    if (!activeDeckId) return {}
    return decks.find((deck) => (deck.id === activeDeckId))
  }
)

export const getActiveNettest = createSelector(
  [getActiveNettestId, getNettests],
  (activeNettestId, nettests) => {
    if (!activeNettestId) return null
    return { ...nettests[activeNettestId], id: activeNettestId }
  }
)

const recentCount = 4
export const getMeasurements = (state) => state.measurement.measurements

export const getRecentMeasurements = createSelector(
  [getMeasurements],
  (measurements) => measurements.slice(0, recentCount)
)
