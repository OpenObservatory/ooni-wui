import { connect } from 'react-redux'
import MeasurementViewer from '../components/MeasurementViewer'
import {
  selectedMeasurements,
  openMeasurement,
  closeMeasurement,
  toggleNormalMeasurements
} from '../actions/measurementList'

import {
  getVisibileSelectedMeasurements
} from '../selectors/measurementList'

const mapDispatchToProps = (dispatch) => ({
  onRowClick: (measurementId, idx) => {
    dispatch(openMeasurement(measurementId, idx))
  },
  onBackClick: () => {
    dispatch(selectedMeasurements(null))
  },
  onCloseClick: () => {
    dispatch(closeMeasurement())
  },
  onToggleNormal: () => {
    dispatch(toggleNormalMeasurements())
  }
})

const mapStateToProps = (state) => {
  return ({
    selectedMeasurements: state.measurementList.selectedMeasurements,
    isMeasurementOpen: state.measurementList.isMeasurementOpen,
    openMeasurement: state.measurementList.openMeasurement,
    visibleMeasurements: getVisibileSelectedMeasurements(state),
    showNormal: state.measurementList.showNormal
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementViewer)
