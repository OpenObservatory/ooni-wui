import fetch from 'isomorphic-fetch';
import {receivedNotification} from '../actions/notification'

export const RUN_NETTEST = 'RUN_NETTEST';

export const LOADING_NETTESTS = 'LOADING_NETTESTS';
export const LOADING_NETTESTS_SUCCEEDED = 'LOADING_NETTESTS_SUCCEEDED';
export const LOADING_NETTESTS_FAILED = 'LOADING_NETTESTS_FAILED';

export const runNettest = (testId, options) => {
  return {
    type: RUN_NETTEST,
    testId,
    options
  }
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
    .then(json => dispatch(loadingNettestsSucceeded(json.nettests)))
    .catch((ex) => {
      dispatch(loadingNettestsFailed(ex))
    });
}

