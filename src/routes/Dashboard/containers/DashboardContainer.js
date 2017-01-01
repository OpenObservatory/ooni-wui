import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submit } from 'redux-form'

import {
  runDeck,
  toggleDeck
} from '../../../actions/deck'

import {
  clickedRunTest,
  closedRunTest,
  clickedRunDeck,
  closedRunDeck
} from '../../../actions/dashboard'

import {
  getActiveDeck,
  getActiveNettest,
  getRecentMeasurements
} from '../../../selectors/dashboard'

import {
  getDeckIcons
} from '../../../selectors/deck'

import Dashboard from '../components/Dashboard'

const mapDispatchToProps = (dispatch) => ({
  onDeckStart: (deckId) => {
    dispatch(runDeck(deckId)).then(() => {
      dispatch(closedRunDeck())
    })
  },
  onDeckToggled: bindActionCreators(toggleDeck, dispatch),

  onTestStart: () => {
    // This triggers the form
    dispatch(submit('nettestRunnerOptions'))
  },

  onDeckRun: bindActionCreators(clickedRunDeck, dispatch),
  onDeckRunClose: bindActionCreators(closedRunDeck, dispatch),
  onTestRun: bindActionCreators(clickedRunTest, dispatch),
  onTestRunClose: bindActionCreators(closedRunTest, dispatch)
})

const mapStateToProps = (state) => {
  return {
    deckIcons: getDeckIcons(state),

    softwareVersion: state.status.softwareVersion,
    running: state.status.running,
    quotaWarning: state.status.quotaWarning,
    countryCode: state.status.countryCode,
    asn: state.status.asn,

    decks: state.deck.decks,
    loadingDecks: state.deck.loading,

    nettests: state.nettest.nettests,

    runOpen: state.dashboard.runOpen,

    activeDeck: getActiveDeck(state),
    activeNettest: getActiveNettest(state),
    recentResults: getRecentMeasurements(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
