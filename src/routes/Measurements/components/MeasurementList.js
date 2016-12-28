import React from 'react'
import {
  formatTime,
  formatViewButton,
  formatDeckName,
  renderCarret,
  snakeToHuman,
  rowClassNameFormat
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
  return (
    <div>
      {selectedMeasurements &&
      <MeasurementViewer />
      }
      {(!selectedMeasurements || (selectedMeasurements.results && selectedMeasurements.results.length == 1))&&
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
            bordered={true}
            tableStyle={{border: 'none'}}
            containerStyle={{border: 'none'}}
            trClassName={rowClassNameFormat}
            data={measurements}>
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
            <TableHeaderColumn width="100" dataAlign='center' dataField="result"
                               dataFormat={formatViewButton(onRowClick)}>
              Result
            </TableHeaderColumn>
            <TableHeaderColumn dataField="id" isKey={true} hidden>ID</TableHeaderColumn>
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
