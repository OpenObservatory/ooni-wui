import React from 'react'
import { Link } from 'react-router';
import moment from 'moment';

import Deck from '../../../components/Deck';
import DeckRunner from './DeckRunner';

import OONILogoImage from '../assets/ooni-logo.svg'
import './Dashboard.scss'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const formatName = (deckIcons) => (cell, row) => {
  const deckIcon = deckIcons[row.deck_id];
  return <span><i className={`fa ${deckIcon}`} />{` ${cell}`}</span>
};

const formatTime = (cell, row) => {
  return moment(cell).format('lll')
};

const formatResult = (cell, row) => {
  if (cell == 'ok') {
    return <i className="icon-ok fa fa-check-circle-o" />
  } else if (cell == 'error') {
    return <i className="icon-error fa fa-warning" />
  }
};

export const Dashboard = ({
  softwareVersion,
  running,
  quotaWarning,
  countryCode,
  asn,
  decks,
  deckIcons,
  recentResults,
  onDeckToggled,
  onDeckRun,
  onDeckRunClose,

  onTestRun,
  onTestRunClose,

  onTestStart,

  runOpen,
  activeDeck,
  activeNettest,
  nettests,
  loadingDecks
}) => (
  <div>

    <div className="row text-xs-center">
      <h1>ooniprobe Dashboard</h1>
      <div className="status">
        ooniprobe {softwareVersion} { "| " }
        {running == true
         && <span className="status-running">
            running <i className="fa fa-check-circle-o" />
            </span>
        }
        {running == false
         && <span className="status-not-running">
              not running <i className="fa fa-close" />
            </span>
        }
        { " | " }
        Location: {countryCode} { `(${asn})` }
      </div>
    </div>

    <div className="row decks">
      {
        decks.map((deck) => {
          return <Deck
                    key={deck.id}
                    deck={deck}
                    onDeckToggled={onDeckToggled}
                    onDeckRun={onDeckRun}
                    fullControls={true}/>
        })
      }
    </div>

    <DeckRunner
      onDeckStart={() => onDeckRun(activeDeck)}
      onDeckClose={onDeckRunClose}
      onTestStart={onTestStart}
      onTestRun={onTestRun}
      onTestRunClose={onTestRunClose}
      isOpen={runOpen}
      activeNettest={activeNettest}
      nettests={nettests}
      deck={activeDeck} />

    {recentResults.length == 0 ?
      <div className="row recent-results">
        <div className="col-md-3 offset-md-3">
          <img src={OONILogoImage} width="200px" height="200px" className="ooni-logo"/>
        </div>
        <div className="col-md-3">
          <h2>Your recent test results will appear here once the tests have finished running!
            As you run more tests, you can view past results in the "Measurements" page.</h2>
        </div>
      </div> :
      <div className="row recent-results text-xs-center">
        <h2>Last {recentResults.length} tests</h2>
        <BootstrapTable
          bordered={ false }
          headerStyle={{'display': 'none'}}
          data={recentResults}>
          <TableHeaderColumn dataField="id" isKey={true} hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataAlign='center' dataField="test_name" dataFormat={formatName(deckIcons)}></TableHeaderColumn>
          <TableHeaderColumn dataAlign='center' dataField="test_start_time" dataFormat={formatTime}></TableHeaderColumn>
          <TableHeaderColumn width="150" dataAlign='center' dataField="asn"></TableHeaderColumn>
          <TableHeaderColumn width="100" dataAlign='center' dataField="country_code"></TableHeaderColumn>
          <TableHeaderColumn width="40" dataAlign='center' dataField="result" dataFormat={formatResult}></TableHeaderColumn>
        </BootstrapTable>
        <Link to="/measurements" className="btn btn-primary">View your measurements</Link>
      </div>
    }

  </div>
);

Dashboard.propTypes = {
  softwareVersion: React.PropTypes.string,
  running: React.PropTypes.bool,
  quotaWarning: React.PropTypes.bool,
  countryCode: React.PropTypes.string,
  asn: React.PropTypes.string,
  decks: React.PropTypes.array,
  deckIcons: React.PropTypes.object,
  recentResults: React.PropTypes.array,

  onDeckToggled: React.PropTypes.func,
  onDeckStart: React.PropTypes.func,
  onDeckRun: React.PropTypes.func,
  onDeckRunClose: React.PropTypes.func,

  onTestStart: React.PropTypes.func,
  onTestRun: React.PropTypes.func,
  onTestRunClose: React.PropTypes.func,

  nettests: React.PropTypes.object,
  runOpen: React.PropTypes.bool,
  activeDeck: React.PropTypes.object,
  activeNettest: React.PropTypes.object,
  loadingDecks: React.PropTypes.bool
};

export default Dashboard
