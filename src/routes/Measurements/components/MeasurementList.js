import React from 'react'
import {
  formatTime,
  formatResult,
  formatDeckName,
  renderCarret,
  snakeToHuman
} from '../../../util/table'

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
  deckNames
}) => {
  let tableOptions = {
    onRowClick: onRowClick
  }
  return (
    <div>
      {selectedMeasurements ?
        <MeasurementViewer /> :
        <div className="text-xs-center">
          <h1>Past measurements</h1>
          <div className="row">
            {
              decks.map((deck) => {
                const className = hiddenDecks.indexOf(deck.id) === -1 ? 'shown-deck' : 'hidden-deck'
                return (
                  <div key={deck.id} className="col-md-3">
                    <div className={className} onClick={() => onShowHideDeck(deck.id)}>
                      <h2>{deck.name}</h2>
                      <i className={`medium-icon fa ${deck.icon}`} />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <BootstrapTable
            options={tableOptions}
            bordered={true}
            hover={true}
            data={measurements}>
            <TableHeaderColumn dataField="id" isKey={true} hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center' dataFormat={snakeToHuman}
                               dataField="test_name">Name</TableHeaderColumn>
            <TableHeaderColumn dataAlign='center'
                               caretRender={renderCarret}
                               dataSort dataField="test_start_time" dataFormat={formatTime}>
              Date
            </TableHeaderColumn>
            <TableHeaderColumn width="100" dataAlign='center' dataField="asn">
              Network
            </TableHeaderColumn>
            <TableHeaderColumn width="100" dataAlign='center' dataField="country_code">
              Country
            </TableHeaderColumn>
            <TableHeaderColumn width="150" dataAlign='center' dataFormat={formatDeckName(deckIcons, deckNames)}
                               dataField="deck_id">
              Test Deck
            </TableHeaderColumn>
            <TableHeaderColumn width="100" dataAlign='center' dataField="result" dataFormat={formatResult}>
              Result
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      }
    </div>
  )
}

MeasurementList.propTypes = {
  measurements: React.PropTypes.array,
  selectedMeasurements: React.PropTypes.object,
  decks: React.PropTypes.array,
  deckIcons: React.PropTypes.object,
  deckNames: React.PropTypes.object,
  hiddenDecks: React.PropTypes.array,
  onRowClick: React.PropTypes.func,
  onShowHideDeck: React.PropTypes.func
};

export default MeasurementList
