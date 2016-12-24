import {fetch} from '../../../actions/api'

export const LOADING_MEASUREMENT_LIST = 'LOADING_MEASUREMENT_LIST'
export const LOADING_MEASUREMENT_LIST_SUCCEEDED = 'LOADING_MEASUREMENT_LIST_SUCCEEDED'
export const LOADING_MEASUREMENT_LIST_FAILED = 'LOADING_MEASUREMENT_LIST_FAILED'

export const OPENNED_MEASUREMENT = 'OPENNED_MEASUREMENT'
export const CLOSE_MEASUREMENT = 'CLOSE_MEASUREMENT'

export const SHOW_HIDE_DECK = 'SHOW_HIDE_DECK'
export const SELECTED_MEASUREMENTS = 'SELECTED_MEASUREMENTS'


export const loadingMeasurementList = () => ({
  type: LOADING_MEASUREMENT_LIST
})
export const loadingMeasurementListSucceeded = () => ({
  type: LOADING_MEASUREMENT_LIST_SUCCEEDED
})
export const loadingMeasurementListFailed = () => ({
  type: LOADING_MEASUREMENT_LIST_FAILED
})

export const showHideDeck = (deckId) => ({
  type: SHOW_HIDE_DECK,
  deckId
})

export const selectMeasurements = (measurementId) => (dispatch, getState) => {
  dispatch(loadingMeasurementList())
  return fetch(`/api/measurement/${measurementId}`)
    .then(data => data.json())
    .then(json => {
      dispatch(loadingMeasurementListSucceeded())
      return dispatch(selectedMeasurements({...json, id: measurementId}))
    })
    .catch((ex) => {
      dispatch(loadingMeasurementListFailed())
      console.log("Failed to load", ex)
    });
}

export const selectedMeasurements = (measurements) => {
  return {
  type: SELECTED_MEASUREMENTS,
  measurements
}}


export const opennedMeasurement = (measurement) => ({
  type: OPENNED_MEASUREMENT,
  measurement
})

export const closeMeasurement = () => ({
  type: CLOSE_MEASUREMENT
})

export const openMeasurement = (measurementId, measurementIdx) => (dispatch, getState) => {
  dispatch(loadingMeasurementList())
  return fetch(`/api/measurement/${measurementId}/${measurementIdx}`)
    .then(data => data.json())
    .then(json => {
      dispatch(loadingMeasurementListSucceeded())
      return dispatch(opennedMeasurement(json))
    })
    .catch((ex) => {
      console.log("Failed to open", ex)
    })
}
