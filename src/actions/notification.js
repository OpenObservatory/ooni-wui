export const RECEIVED_NOTIFICATION = 'RECEIVED_NOTIFICATION'

export function receivedNotification(title, message, type = 'success') {
  return {
    type: RECEIVED_NOTIFICATION,
    payload: {type, message, title}
  }
}
