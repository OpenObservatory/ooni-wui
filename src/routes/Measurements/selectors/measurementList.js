import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.measurementList.visibilityFilter
const getMeasurements = (state) => state.measurement.measurements
const getShowNormal = (state) => state.measurementList.showNormal
const getSelectedMeasurements = (state) => state.measurementList.selectedMeasurements

export const getVisibleMeasurements = createSelector(
  [getVisibilityFilter, getMeasurements],
  (visibilityFilter, measurements) => {
    return measurements.filter(measurement => visibilityFilter.hiddenDecks.indexOf(measurement.deck_id) === -1)
  }
)

export const getVisibileSelectedMeasurements = createSelector(
  [getShowNormal, getSelectedMeasurements],
  (showNormal, selectedMeasurements) => {
    return selectedMeasurements.results.filter(measurement => {
      if (showNormal) {
        return true
      }
      return !!measurement.anomaly
    })
  }
)
