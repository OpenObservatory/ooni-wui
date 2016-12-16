import { connect } from 'react-redux';
import MeasurementList from '../components/MeasurementList';

const mapStateToProps = (state) => {
  return ({
    measurements: state.measurements.measurements
  });
};

export default connect(mapStateToProps)(MeasurementList)
