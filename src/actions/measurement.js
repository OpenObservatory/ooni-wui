import {fetch} from './api'

export const LOADING_MEASUREMENTS = 'LOADING_MEASUREMENTS'
export const LOADING_MEASUREMENTS_FAILED = 'LOADING_MEASUREMENTS_FAILED'
export const LOADING_MEASUREMENTS_SUCCEEDED = 'LOADING_MEASUREMENTS_SUCCEEDED'

export const loading = () => ({
  type: LOADING_MEASUREMENTS
})

export const loadingSucceeded = (measurements) => ({
  type: LOADING_MEASUREMENTS_SUCCEEDED,
  measurements
})

export const loadingFailed = (ex) => ({
  type: LOADING_MEASUREMENTS_FAILED,
  exception: ex
})

export const load = () => (dispatch, getState) => {
  dispatch(loading())

  return fetch('/api/measurement')
    .then(data => data.json())
    .then(json => dispatch(loadingSucceeded(json.measurements)))
    .catch((ex) => {
      dispatch(loadingFailed(ex))
    });
}
