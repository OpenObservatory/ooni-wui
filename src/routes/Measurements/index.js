import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'measurements',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Measurements = require('./containers/MeasurementListContainer').default;

      injectReducer(store, {
          key: 'measurementList',
          reducer: require('./reducers/measurementList').measurementListReducer
      })
      injectReducer(store, {
          key: 'measurement',
          reducer: require('../../reducers/measurement').measurementReducer
      })
      injectReducer(store, {
        key: 'deck',
        reducer: require('../../reducers/deck').deckReducer
      })
      store.dispatch(require('../../actions/deck').load())
      store.dispatch(require('../../actions/measurement').load());

      cb(null, Measurements);

    }, 'measurements')
  }
})
