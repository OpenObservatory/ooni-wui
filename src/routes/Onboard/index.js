import { injectReducer } from '../../store/reducers'

import {
  loadDecks
} from '../../actions/onboard'

export default (store) => ({
  path : 'onboard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Onboard = require('./containers/OnboardContainer').default
      const {onboardReducer} = require('../../reducers/onboard')

      injectReducer(store, {
        key: 'onboard',
        reducer: onboardReducer
      })
      store.dispatch(loadDecks())

      cb(null, Onboard)
    }, 'onboard')
  }
})
