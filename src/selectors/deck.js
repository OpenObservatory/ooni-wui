import { createSelector } from 'reselect'

export const getDecks = (state) => state.deck.decks

export const getDeckIcons = createSelector(
  [getDecks],
  (decks) => {
    return decks.reduce(
      (o, v) => {
        o[v.id] = v.icon
        return o
      }, {})
  }
)

export const getDeckNames = createSelector(
  [getDecks],
  (decks) => {
    return decks.reduce(
      (o, v) => {
        o[v.id] = v.name
        return o
      }, {})
  }
)
