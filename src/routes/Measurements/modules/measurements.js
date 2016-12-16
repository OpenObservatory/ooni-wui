import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const MEASUREMENTS_REQUEST = 'MEASUREMENTS_REQUEST';
export const MEASUREMENTS_RECEIVE = 'MEASUREMENTS_RECEIVE';

// ------------------------------------
// Actions
// ------------------------------------

export function requestMeasurements (value) {
  return {
    type: MEASUREMENTS_REQUEST
  }
}

export function receiveMeasurements (measurements) {
  return {
    type: MEASUREMENTS_RECEIVE,
    payload: measurements
  }
}

export function fetchMeasurements () {
  return (dispatch) => {
    dispatch(requestMeasurements());

    return fetch('/api/measurement')
      .then(data => data.json())
      .then(json => dispatch(receiveMeasurements(json.measurements)))
      .catch((ex) => {
        console.log("Failed to fetch measurements", ex);
      });
  }
}

export const deleteMeasurement = (measurement_id) => {
  return (dispatch, getState) => {
    dispatch(requestMeasurements());

    return fetch(`/api/measurement/${measurement_id}`, {method: 'DELETE'})
      .then(data => data.json())
      .then(() => {
        let newMeasurementsList = getState().measurements.measurements.filter(
          (measurement) => measurement.id != measurement_id
        );
        dispatch(receiveMeasurements(newMeasurementsList));
      });
  }
};

export const keepMeasurement = (measurement) => {
  return (dispatch, getState) => {
    return fetch(`/api/measurement/${measurement.id}/keep`, {method: 'POST'})
      .then(data => data.json())
      .then(() => {
        let measurement_list = getState().measurements.measurements;
        const removed_idx = measurement_list.indexOf(measurement);
        measurement_list.splice(removed_idx, 1);
        dispatch(receiveMeasurements(measurement_list));
      });
  }
};

export const actions = {
  receiveMeasurements,
  requestMeasurements,
  fetchMeasurements,
  deleteMeasurement,
  keepMeasurement
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MEASUREMENTS_REQUEST]: (state, action) => {
    return ({...state, fetching: true})
  },
  [MEASUREMENTS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      measurements: action.payload,
      fetching: false
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {fetching: false, measurements: []};
export function measurementsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
