import { connect } from 'react-redux'
import MeasurementList from '../components/MeasurementList'

import {
  showHideDeck,
  selectMeasurements
} from '../actions/measurementList'

import {
  getVisibleMeasurements
} from '../selectors/measurementList'

import {
  getDeckIcons,
  getDeckNames
} from '../../../selectors/deck'

const mapDispatchToProps = (dispatch) => ({
  onRowClick: (row) => {
    dispatch(selectMeasurements(row.id))
  },
  onShowHideDeck: (deckId) => {
    dispatch(showHideDeck(deckId))
  }
})

const mapStateToProps = (state) => {
  return ({
    measurements: getVisibleMeasurements(state),
    loadingMeasurements: state.measurement.loading,
    loadingMeasurementsFailed: state.measurement.failed,

    selectedMeasurements: state.measurementList.selectedMeasurements,
    hiddenDecks: state.measurementList.visibilityFilter.hiddenDecks,
    decks: state.deck.decks,
    deckIcons: getDeckIcons(state),
    deckNames: getDeckNames(state)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementList)
