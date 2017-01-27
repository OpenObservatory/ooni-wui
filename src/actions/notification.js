import { Poller } from '../util/poller'

export const RECEIVED_NOTIFICATION = 'RECEIVED_NOTIFICATION'

export const receivedNotification = (title, message, type = 'success') => ({
  type: RECEIVED_NOTIFICATION,
  payload: { type, message, title }
})

export const startNotificationPoller = () => (dispatch) => {
  let poller = new Poller('/api/notify', undefined)
  poller.start((json) => {
    if (json.type !== 'null') {
      dispatch(receivedNotification('', json.message, json.type))
    }
  }, (error) => {
    dispatch(receivedNotification('Error in notify', error, 'error'))
  })
}
