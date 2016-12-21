import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'

/*
import {
  toggleDeck,
  runDeckClicked,
  runDeckClose,
  runTestClicked,
  runTestClose,
  startDeck,
  startTest
} from '../modules/dashboard';
*/

/*
import {
  load as loadMeasurements
} from '../../../actions/measurement'
*/

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

const mapDispatchToProps = {
  onDeckStart: runDeck,
  onDeckToggled: toggleDeck,

  onTestStart: runNettest,

  onDeckRun: clickedRunDeck,
  onDeckRunClose: closedRunDeck,
  onTestRun: clickedRunTest,
  onTestRunClose: closedRunTest,

};

const mapStateToProps = (state) => {
  const deckIcons = state.deck.decks.reduce(
    (o, v) => {
      o[v.id] = v.icon;
      return o;
    }, {});
  return {
    // XXX This can become a selector
    deckIcons: deckIcons,
    // XXX This can become a selector
    recentResults: state.measurement.measurements,

    softwareVersion: state.status.software_version,
    running: state.status.director_started,
    quotaWarning: state.status.quota_warning,
    countryCode: state.status.country_code,
    asn: state.status.asn,

    decks: state.deck.decks,
    loadingDecks: state.deck.loading,

    tests: state.nettest.tests,

    runOpen: state.dashboard.runOpen,
    activeDeck: state.dashboard.activeDeck,
    activeTest: state.dashboard.activeTest
}};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
