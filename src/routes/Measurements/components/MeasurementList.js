import React from 'react'
import { FormattedMessage } from 'react-intl'

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
          <FormattedMessage
            id='measurements.measurementList.loading'
            defaultMessage='{iconLoading} loading measurements'
            values={{
              iconLoading: <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            }}
          />
        </div>
      }
      {(!selectedMeasurements || (selectedMeasurements.results && selectedMeasurements.results.length === 1)) &&
        <div className='text-xs-center'>
          <h1>Measurements</h1>
          <div className='row'>
            {
              decks.map((deck) => {
                const className = hiddenDecks.indexOf(deck.id) === -1 ? 'shown-deck' : 'hidden-deck'
                return (
                  <div key={deck.id} className='col-sm-3 col-xs-6'>
                    <div className={className} onClick={() => onShowHideDeck(deck.id)}>
                      <h6>{deck.name}</h6>
                      <i className={`medium-icon icon-btn fa ${deck.icon}`} />
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* This is for small viewports */}
          <div className='hidden-sm-up'>
            <BootstrapTable
              bordered
              tableStyle={{ border: 'none' }}
              containerStyle={{ border: 'none' }}
              tableBodyClass='measurement-list-table'
              trClassName={rowClassNameFormat}
              data={measurements}>
              <TableHeaderColumn width='100' dataAlign='center' dataField='result'
                dataFormat={formatViewButton(onRowClick)}>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.result'
                    defaultMessage='Result'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn dataAlign='center' dataFormat={getPrettyNettestName}
                caretRender={renderCarret} dataSort dataField='test_name'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.name'
                    defaultMessage='Name'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn dataAlign='center'
                caretRender={renderCarret}
                dataSort dataField='test_start_time' dataFormat={formatTime('calendar')}>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.date'
                    defaultMessage='Date'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='100'
                caretRender={renderCarret} dataSort dataAlign='center' dataField='asn'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.network'
                    defaultMessage='Network'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='100'
                caretRender={renderCarret} dataSort dataAlign='center' dataField='country_code'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.country'
                    defaultMessage='Country'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='80'
                caretRender={renderCarret} dataSort dataAlign='center' dataFormat={formatDeckName(deckIcons, deckNames)}
                dataField='deck_id'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.deck'
                    defaultMessage='Deck'
                  />
                </strong>
              </TableHeaderColumn>

              <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='running' hidden>Running</TableHeaderColumn>
              <TableHeaderColumn dataField='stale' hidden>Stale</TableHeaderColumn>
              <TableHeaderColumn dataField='anomaly' hidden>Anomaly</TableHeaderColumn>
              <TableHeaderColumn dataField='anomaly_type' hidden>Anomaly Type</TableHeaderColumn>
            </BootstrapTable>
          </div>
          {/* This is for bigger viewports */}
          <div className='hidden-xs-down'>
            <BootstrapTable
              bordered
              tableStyle={{ border: 'none' }}
              containerStyle={{ border: 'none' }}
              tableBodyClass='measurement-list-table'
              trClassName={rowClassNameFormat}
              data={measurements}>
              <TableHeaderColumn dataAlign='center' dataFormat={getPrettyNettestName}
                caretRender={renderCarret} dataSort dataField='test_name'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.name.big'
                    defaultMessage='Name'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn dataAlign='center'
                caretRender={renderCarret}
                dataSort dataField='test_start_time' dataFormat={formatTime()}>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.date.big'
                    defaultMessage='Date'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='100'
                caretRender={renderCarret} dataSort dataAlign='center' dataField='asn'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.network.big'
                    defaultMessage='Network'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='100'
                caretRender={renderCarret} dataSort dataAlign='center' dataField='country_code'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.country.big'
                    defaultMessage='Country'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='80'
                caretRender={renderCarret} dataSort dataAlign='center' dataFormat={formatDeckName(deckIcons, deckNames)}
                dataField='deck_id'>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.deck.big'
                    defaultMessage='Deck'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn width='100' dataAlign='center' dataField='result'
                dataFormat={formatViewButton(onRowClick)}>
                <strong>
                  <FormattedMessage
                    id='measurements.measurementsList.result.big'
                    defaultMessage='Result'
                  />
                </strong>
              </TableHeaderColumn>
              <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='running' hidden>Running</TableHeaderColumn>
              <TableHeaderColumn dataField='stale' hidden>Stale</TableHeaderColumn>
              <TableHeaderColumn dataField='anomaly' hidden>Anomaly</TableHeaderColumn>
              <TableHeaderColumn dataField='anomaly_type' hidden>Anomaly Type</TableHeaderColumn>
            </BootstrapTable>
          </div>
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
