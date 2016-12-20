import fetch from 'isomorphic-fetch';
export const STATUS_UPDATE = 'STATUS_UPDATE';

export function updateStatus(status) {
  return {
    type: STATUS_UPDATE,
    payload: status
  }
}

export function fetchStatus() {
  return (dispatch, getState) => {
    return fetch('/api/status')
      .then(data => data.json())
      .then(json => dispatch(updateStatus(json)))
      .catch((ex) => {
        console.log("Failed to update status");
      });
  }
}
