import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;
      const {fetchDecks, fetchTests, dashboardReducer} = require('./modules/dashboard');

      injectReducer(store, {
        key: 'dashboard',
        reducer: dashboardReducer
      });

      store.dispatch(fetchDecks());
      store.dispatch(fetchTests());

      cb(null, Dashboard);

    }, 'dashboard')
  }
})
