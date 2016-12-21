import {fetch} from './api'

export const UPDATING_STATUS = 'UPDATING_STATUS';
export const UPDATING_STATUS_SUCCEEDED = 'UPDATING_STATUS_SUCCEEDED';
export const UPDATING_STATUS_FAILED = 'UPDATING_STATUS_FAILED';

export function updatingStatusSucceeded(status) {
  return {
    type: UPDATING_STATUS_SUCCEEDED,
    status: {
      initialized: status.initialized,
      softwareVersion: status.software_version,
      running: status.director_started,
      quotaWarning: status.quota_warning,
      countryCode: status.country_code,
      asn: status.asn
    }
  }
}

export function fetchStatus() {
  return (dispatch) => {
    return fetch('/api/status')
      .then(data => data.json())
      .then(json => dispatch(updatingStatusSucceeded(json)))
      .catch((ex) => {
        console.log(ex)
        console.log("Failed to update status");
      });
  }
}
