import { connect } from 'react-redux'
import Logs from '../components/Logs'
import {
  loadOlder
} from '../actions/logs'

const mapDispatchToProps = (dispatch) => ({
  loadOlderLogs: () => {dispatch(loadOlder())}
})

const mapStateToProps = (state) => {
  return ({
    latestLog: state.logs.latest,
    olderLogs: state.logs.older
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs)
