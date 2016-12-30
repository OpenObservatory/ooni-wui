import {fetch} from '../util/api';

import {receivedNotification} from '../actions/notification'

export const RUN_NETTEST = 'RUN_NETTEST';

export const LOADING_NETTESTS = 'LOADING_NETTESTS';
export const LOADING_NETTESTS_SUCCEEDED = 'LOADING_NETTESTS_SUCCEEDED';
export const LOADING_NETTESTS_FAILED = 'LOADING_NETTESTS_FAILED';

export const runNettest = (nettestId, options) => {
  return fetch(`/api/nettest/${nettestId}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  })
}

export const loadingNettests = () => ({
  type: LOADING_NETTESTS
})

export const loadingNettestsSucceeded = (nettests) => ({
  type: LOADING_NETTESTS_SUCCEEDED,
  nettests
})

export const loadingNettestsFailed = () => (dispatch) => {
  dispatch(receivedNotification(
    "Failed to fetch tests", `${ex.message}`, "error")
  )
  return {
    type: LOADING_NETTESTS_FAILED
  }
}

export const load = () => (dispatch) => {
  dispatch(loadingNettests());

  fetch('/api/nettest')
    .then(data => data.json())
    .then(json => dispatch(loadingNettestsSucceeded(json)))
    .catch((ex) => {
      dispatch(loadingNettestsFailed(ex))
    });
}
