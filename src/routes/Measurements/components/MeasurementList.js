import React from 'react'
import {
  formatTime,
  formatViewButton,
  formatDeckName,
  renderCarret,
  rowClassNameFormat
} from '../../../util/table'

import { getPrettyNettestName } from '../../../util/nettest'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import './MeasurementList.scss'
import MeasurementViewer from '../containers/MeasurementViewerContainer'

const MeasurementList = ({
  decks,
  measurements,
  selectedMeasurements,
  onRowClick,
  onShowHideDeck,
  hiddenDecks,
  deckIcons,
  deckNames,
  loadingMeasurements,
  loadingMeasurementsFailed
}) => {
  return (
    <div>
      {selectedMeasurements &&
      <MeasurementViewer />
      }
      {loadingMeasurementsFailed &&
        <div className='text-xs-center' style={{ marginTop: '2rem' }}>
          <p className='text-danger'>
            <i className='fa fa-exclamation-circle' /> failed to load measurements
          </p>
        </div>
      }
      {loadingMeasurements &&
        <div className='text-xs-center' style={{ marginTop: '2rem' }}>
          <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /> loading measurements
        </div>
      }
      {(!selectedMeasurements || (selectedMeasurements.results && selectedMeasurements.results.length === 1)) &&
        <div className='text-xs-center'>
          <h1>Past measurements</h1>
          <div className='row'>
            {
              decks.map((deck) => {
                const className = hiddenDecks.indexOf(deck.id) === -1 ? 'shown-deck' : 'hidden-deck'
                return (
                  <div key={deck.id} className='col-md-3'>
                    <div className={className} onClick={() => onShowHideDeck(deck.id)}>
                      <h2>{deck.name}</h2>
                      <i className={`medium-icon icon-btn fa ${deck.icon}`} />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <BootstrapTable
            bordered
            tableStyle={{ border: 'none' }}
            containerStyle={{ border: 'none' }}
            tableBodyClass='measurement-list-table'
            trClassName={rowClassNameFormat}
            data={measurements}>
            <TableHeaderColumn dataAlign='center' dataFormat={getPrettyNettestName}
              dataField='test_name'><strong>Name</strong></TableHeaderColumn>
            <TableHeaderColumn dataAlign='center'
              caretRender={renderCarret}
              dataSort dataField='test_start_time' dataFormat={formatTime}>
              <strong>Date</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='asn'>
              <strong>Network</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='country_code'>
              <strong>Country</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='150' dataAlign='center' dataFormat={formatDeckName(deckIcons, deckNames)}
              dataField='deck_id'>
              <strong>Test Deck</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='result'
              dataFormat={formatViewButton(onRowClick)}>
              <strong>Result</strong>
            </TableHeaderColumn>
            <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='running' hidden>Running</TableHeaderColumn>
            <TableHeaderColumn dataField='stale' hidden>Stale</TableHeaderColumn>
            <TableHeaderColumn dataField='anomaly' hidden>Anomaly</TableHeaderColumn>
            <TableHeaderColumn dataField='anomaly_type' hidden>Anomaly Type</TableHeaderColumn>
          </BootstrapTable>
        </div>
      }
    </div>
  )
}

MeasurementList.propTypes = {
  measurements: React.PropTypes.array,
  loadingMeasurements: React.PropTypes.bool,
  loadingMeasurementsFailed: React.PropTypes.bool,
  selectedMeasurements: React.PropTypes.object,
  decks: React.PropTypes.array,
  deckIcons: React.PropTypes.object,
  deckNames: React.PropTypes.object,
  hiddenDecks: React.PropTypes.array,
  onRowClick: React.PropTypes.func,
  onShowHideDeck: React.PropTypes.func
}

export default MeasurementList
