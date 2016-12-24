import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.measurementList.visibilityFilter
const getMeasurements = (state) => state.measurement.measurements

export const getVisibleMeasurements = createSelector(
  [getVisibilityFilter, getMeasurements],
  (visibilityFilter, measurements) => {
    return measurements.filter(measurement => visibilityFilter.hiddenDecks.indexOf(measurement.deck_id) === -1);
  }
)

