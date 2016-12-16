import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'onboard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Onboard = require('./containers/OnboardContainer').default;

      const {onboardReducer} = require('./modules/onboard');

      injectReducer(store, {
        key: 'onboard',
        reducer: onboardReducer
      });

      cb(null, Onboard)
    }, 'onboard')
  }
})
