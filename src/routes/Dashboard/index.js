import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;

      injectReducer(store, {
        key: 'deck',
        reducer: require('../../reducers/deck').deckReducer
      });
      injectReducer(store, {
        key: 'nettest',
        reducer: require('../../reducers/nettest').nettestReducer
      });
      injectReducer(store, {
        key: 'measurement',
        reducer: require('../../reducers/measurement').measurementReducer
      });
      injectReducer(store, {
        key: 'dashboard',
        reducer: require('../../reducers/dashboard').dashboardReducer
      });

      store.dispatch(require('../../actions/deck').load())
      store.dispatch(require('../../actions/measurement').load())
      store.dispatch(require('../../actions/nettest').load())

      cb(null, Dashboard);

    }, 'dashboard')
  }
})
