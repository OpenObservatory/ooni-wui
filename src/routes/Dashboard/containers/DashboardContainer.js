import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'
import {
  toggleDeck,
  runDeckClicked,
  runDeckClose,
  runTestClicked,
  runTestClose,
  startDeck,
  startTest
} from '../modules/dashboard';

const mapDispatchToProps = {
  onDeckToggled: toggleDeck,
  onDeckRun: runDeckClicked,
  onDeckRunClose: runDeckClose,
  onDeckStart: startDeck,
  onTestRun: runTestClicked,
  onTestRunClose: runTestClose,
  onTestStart: startTest
};

const mapStateToProps = (state) => {
  const deckIcons = state.dashboard.decks.reduce(
    (o, v) => {
      o[v.id] = v.icon;
      return o;
    }, {});
  return {
    softwareVersion: state.status.software_version,
    running: state.status.director_started,
    quotaWarning: state.status.quota_warning,
    countryCode: state.status.country_code,
    asn: state.status.asn,
    decks: state.dashboard.decks,
    deckIcons: deckIcons,
    recentResults: state.dashboard.recentResults,
    runOpen: state.dashboard.runOpen,
    activeDeck: state.dashboard.activeDeck,
    activeTest: state.dashboard.activeTest,
    tests: state.dashboard.tests,
    loadingDecks: state.dashboard.loadingDecks
}};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
