import { connect } from 'react-redux';
import { deleteMeasurement, keepMeasurement } from '../modules/measurements';

import MeasurementEntry from '../components/MeasurementEntry';

const mapStoreToProps = (state) => {
  return ({});
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: () => {dispatch(deleteMeasurement(ownProps.measurement.id))},
    onKeepClick: () => {dispatch(keepMeasurement(ownProps.measurement.id))}
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(MeasurementEntry)
