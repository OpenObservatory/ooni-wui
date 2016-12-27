import {
  fetch
} from '../../../actions/api'

export const UPLOADING_LOGS = 'UPLOADING_LOGS'
export const UPLOADING_LOGS_SUCCEEDED = 'UPLOADING_LOGS_SUCCEEDED'
export const UPLOADING_LOGS_FAILED = 'UPLOADING_LOGS_FAILED'

export const LOADING_LOGS = 'LOADING_LOGS'
export const LOADING_LOGS_SUCCEEDED = 'LOADING_LOGS_SUCCEEDED'
export const LOADING_LOGS_FAILED = 'LOADING_LOGS_FAILED'

export const loadingLogs = () => ({
  type: LOADING_LOGS
})
export const loadingLogsSucceeded = (logData) => ({
  type: LOADING_LOGS_SUCCEEDED,
  latest: logData.latest,
  older: logData.older
})

export const loadLatest = () => (dispatch, getState) => {
  dispatch(loadingLogs())
  return fetch('/api/logs')
    .then(data => data.json())
    .then(json => {
      dispatch(loadingLogsSucceeded(json))
    })
    .catch((ex) => {
      console.log(ex)
    })
}

export const loadOlder = () => (dispatch, getState) => {
  dispatch(loadingLogs())
  return fetch('/api/logs?all=true')
    .then(data => data.json())
    .then(json => {
      dispatch(loadingLogsSucceeded(json))
    })
    .catch((ex) => {
      console.log(ex)
    })
}
