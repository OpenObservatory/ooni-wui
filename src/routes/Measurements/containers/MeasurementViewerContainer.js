import { connect } from 'react-redux'
import MeasurementViewer from '../components/MeasurementViewer'
import {
  selectedMeasurements,
  openMeasurement,
  closeMeasurement
} from '../actions/measurementList'

const mapDispatchToProps = (dispatch) => ({
  onRowClick: (measurementId, idx) => {
    dispatch(openMeasurement(measurementId, idx))
  },
  onBackClick: () => {
    dispatch(selectedMeasurements(null))
  },
  onCloseClick: () => {
    dispatch(closeMeasurement())
  }
})

const mapStateToProps = (state) => {
  return ({
    selectedMeasurements: state.measurementList.selectedMeasurements,
    isMeasurementOpen: state.measurementList.isMeasurementOpen,
    openMeasurement: state.measurementList.openMeasurement
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementViewer)
