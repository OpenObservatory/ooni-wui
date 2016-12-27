import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'logs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Logs = require('./containers/LogsContainer').default
      const logsReducer = require('./reducers/logs').logsReducer
      const loadLatest = require('./actions/logs').loadLatest

      injectReducer(store, {
        key: 'logs',
        reducer: logsReducer
      })
      store.dispatch(loadLatest())

      cb(null, Logs)
    }, 'logs')
  }
})
