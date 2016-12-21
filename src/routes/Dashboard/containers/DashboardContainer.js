import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
  runDeck,
  toggleDeck
} from '../../../actions/deck'

import {
  runNettest
} from '../../../actions/nettest'

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

import Dashboard from '../components/Dashboard'

const mapDispatchToProps = (dispatch) => ({
  onDeckStart: (deckId) => {
    dispatch(runDeck(deckId)).then(() => {
      dispatch(closedRunDeck())
    })
  },
  onDeckToggled: bindActionCreators(toggleDeck, dispatch),

  onTestStart: bindActionCreators(runNettest, dispatch),

  onDeckRun: bindActionCreators(clickedRunDeck, dispatch),
  onDeckRunClose: bindActionCreators(closedRunDeck, dispatch),
  onTestRun: bindActionCreators(clickedRunTest, dispatch),
  onTestRunClose: bindActionCreators(closedRunTest, dispatch),
});

const mapStateToProps = (state) => {
  const deckIcons = state.deck.decks.reduce(
    (o, v) => {
      o[v.id] = v.icon;
      return o;
    }, {});
  return {
    // XXX this can maybe be a selector as well..
    deckIcons: deckIcons,

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
}};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
