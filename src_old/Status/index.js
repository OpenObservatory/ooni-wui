import { injectReducer } from '../../store/reducers'

export const StatusWithStore = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Status = require('./containers/StatusContainer').default;
      const {statusReducer, fetchStatus} = require('./status');

      injectReducer(store, {
        key: 'status',
        reducer: statusReducer
      });
      store.dispatch(fetchStatus());
      cb(null, Status);
    }, 'status')
  }
})
