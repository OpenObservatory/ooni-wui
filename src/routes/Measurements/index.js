import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'measurements',
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Measurements = require('./containers/MeasurementListContainer').default;
      const {measurementsReducer, fetchMeasurements} = require('./modules/measurements');

      injectReducer(store, {
          key: 'measurements',
          reducer: measurementsReducer
      });
      /* Fetch the initial set of measurements */
      store.dispatch(fetchMeasurements());

      /*  Return getComponent   */
      cb(null, Measurements);

      /* Webpack named bundle   */
    }, 'measurements')
  }
})
