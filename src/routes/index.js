import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Dashboard from './Dashboard';
import MeasurementsRoute from './Measurements';
import OnboardRoute from './Onboard';

const requireInitialized = (store) => (nextState, replace, next) => {
  const {fetchStatus} = require('../actions/status');
  const {status} = store.getState();
  console.log("Initialized status...", status.initialized)
  if (nextState.location.pathname === '/onboard' || status.initialized === true) {
    next()
  } else {
    store.dispatch(fetchStatus()).then(() => {
      if (status.initialized === false) {
        replace('/onboard')
        next()
      } else {
        next()
      }
    });
  }
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

export default createRoutes
