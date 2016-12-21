import { combineReducers } from 'redux'
import locationReducer from './location'
import { statusReducer } from '../reducers/status'
import { notificationReducer } from '../reducers/notification'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    status: statusReducer,
    notification: notificationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
