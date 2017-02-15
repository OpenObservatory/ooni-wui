import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { updateLocation, history } from './location'
import { messages, loadLocaleData } from './locale'

// This allows us to set the locale by defining the global defaultLocale variable in mobile
const defaultLocale = window.defaultLocale || 'en'
console.log("Setting default locale to", defaultLocale)
export default (initialState = {
  intl: {
    defaultLocale: defaultLocale,
    locale: defaultLocale,
    messages: messages[defaultLocale]
  }
}) => {
  // local locale data
  loadLocaleData()

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  store.unsubscribeHistory = history.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
