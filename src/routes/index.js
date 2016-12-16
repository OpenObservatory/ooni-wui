import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Dashboard from './Dashboard';
import MeasurementsRoute from './Measurements';
import OnboardRoute from './Onboard';
import { injectReducer } from '../store/reducers'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const requireInitialized = (store) => {
  const {statusReducer, fetchStatus} = require('../modules/status');
  injectReducer(store, {
    key: 'status',
    reducer: statusReducer
  });
  return (nextState, replace) => {
    const {status} = store.getState();
    if (nextState.location.pathname === '/onboard' || status === true) {
      return;
    }
    store.dispatch(fetchStatus()).then(() => {
      const {status} = store.getState();
      if (status.initialized === false) replace('/onboard');
    });
  };
};

export const createRoutes = (store) => ({
  path        : '/',
  childRoutes : [
    {
      component: CoreLayout,
      indexRoute: Dashboard(store),
      onEnter: requireInitialized(store),
      childRoutes: [
        MeasurementsRoute(store)
      ]
    },
    OnboardRoute(store)
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
