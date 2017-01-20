import {
  SHOW_HIDE_DECK,
  SELECTED_MEASUREMENTS,
  LOADING_MEASUREMENT_LIST_SUCCEEDED,
  LOADING_MEASUREMENT_LIST_FAILED,
  LOADING_MEASUREMENT_LIST,
  OPENNED_MEASUREMENT,
  CLOSE_MEASUREMENT,
  TOGGLE_NORMAL_MEASUREMENTS
} from '../actions/measurementList'

const ACTION_HANDLERS = {
  [SHOW_HIDE_DECK]: (state, action) => {
    const { deckId } = action
    const visibilityFilter = { ...state.visibilityFilter }
    const idx = visibilityFilter.hiddenDecks.indexOf(deckId)
    if (idx === -1) {
      visibilityFilter.hiddenDecks.push(deckId)
    } else {
      visibilityFilter.hiddenDecks.splice(idx, 1)
    }
    return ({ ...state, visibilityFilter })
  },
  [TOGGLE_NORMAL_MEASUREMENTS]: (state) => {
    return ({ ...state, showNormal: !state.showNormal })
  },
  [SELECTED_MEASUREMENTS]: (state, action) => {
    return ({ ...state, selectedMeasurements: action.measurements })
  },
  [OPENNED_MEASUREMENT]: (state, action) => {
    return ({ ...state, openMeasurement: action.measurement, isMeasurementOpen: true })
  },
  [CLOSE_MEASUREMENT]: (state) => {
    return ({ ...state, openMeasurement: {}, isMeasurementOpen: false })
  },
  [LOADING_MEASUREMENT_LIST]: (state) => ({ ...state, loading: true }),
  [LOADING_MEASUREMENT_LIST_SUCCEEDED]: (state) => ({ ...state, loading: false }),
  [LOADING_MEASUREMENT_LIST_FAILED]: (state) => ({ ...state, loading: false })
}

const initialState = {
  loading: false,
  selectedMeasurements: null,
  openMeasurement: {},
  isMeasurementOpen: false,
  visibilityFilter: {
    hiddenDecks: []
  },
  showNormal: true
}

export function measurementListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
