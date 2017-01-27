import { fetch } from '../util/api'
import { Poller } from '../util/poller'
import { receivedNotification } from './notification'

export const UPDATING_STATUS = 'UPDATING_STATUS'
export const UPDATING_STATUS_SUCCEEDED = 'UPDATING_STATUS_SUCCEEDED'
export const UPDATING_STATUS_FAILED = 'UPDATING_STATUS_FAILED'

export const updatingStatusSucceeded = (status) => ({
  type: UPDATING_STATUS_SUCCEEDED,
  status: {
    initialized: status.initialized,
    softwareVersion: status.software_version,
    running: status.director_started,
    quotaWarning: status.quota_warning,
    countryCode: status.country_code,
    asn: status.asn
  }
})
export const updatingStatusFailed = () => ({
  type: UPDATING_STATUS_FAILED
})

export const fetchStatus = () => (dispatch) => {
  return fetch('/api/status')
    .then(data => data.json())
    .then(json => dispatch(updatingStatusSucceeded(json)))
    .catch((ex) => {
      dispatch(receivedNotification('Failed to update status', ex.toString(), 'error'))
    })
}

export const startStatusPoller = () => (dispatch, getStatus) => {
  let poller = new Poller('/api/status/update', '/api/status')
  poller.start((json) => {
    dispatch(updatingStatusSucceeded(json))
  }, (error) => {
    dispatch(receivedNotification('Error in status update', error.toString(), 'error'))
    dispatch(updatingStatusFailed())
  })
}
