import React from 'react'
import Modal from 'react-modal'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import MeasurementDetails from './MeasurementDetails'

import {
  formatViewButton,
  formatDate,
  rowClassNameFormat
} from '../../../util/table'

import { getPrettyNettestName } from '../../../util/nettest'

const MeasurementViewer = ({
  selectedMeasurements,
  onRowClick,
  onBackClick,
  onCloseClick,
  onToggleNormal,
  isMeasurementOpen,
  openMeasurement,
  visibleMeasurements,
  showNormal
}) => {
  let tableOptions = {
    onRowClick: (row) => {
      onRowClick(selectedMeasurements.id, row.idx)
    }
  }
  return (
    <div>
      {selectedMeasurements.results.length > 1 &&
        <div>
          <div className='text-xs-left'>
            <a className='text-primary clickable' onClick={onBackClick}>
              <i className='fa fa-arrow-circle-o-left' /> Return
            </a>
          </div>
          <div className='text-xs-center'>

            <h1>{getPrettyNettestName(selectedMeasurements.test_name)}</h1>
            <div className='result-metadata'>
              {formatDate(selectedMeasurements.test_start_time)}
              {' | '}
              Location: {selectedMeasurements.country_code} ({selectedMeasurements.asn})
            </div>
          </div>

          <BootstrapTable
            tableStyle={{ border: 'none' }}
            containerStyle={{ border: 'none' }}
            trClassName={rowClassNameFormat}
            data={visibleMeasurements}>
            <TableHeaderColumn dataAlign='center' dataField='url'>
              <strong>Url (
                <a href='#' onClick={(evt) => onToggleNormal(evt)}>
                  {showNormal ? 'Hide' : 'Show'} normal
                </a>
                )</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='anomaly'
              dataFormat={formatViewButton(tableOptions.onRowClick)}>
              <strong>Result</strong>
            </TableHeaderColumn>
            <TableHeaderColumn dataField='idx' isKey hidden />
          </BootstrapTable>
        </div>
      }

      <Modal
        className='Modal__Bootstrap modal-dialog'
        onRequestClose={onCloseClick}
        contentLabel='Measurement details'
        isOpen={isMeasurementOpen}>
        <div className='modal-content'>
          <div className='modal-header' style={{ borderBottom: '0', padding: '0' }}>
            <button type='button' className='close' onClick={onCloseClick}>
              <span aria-hidden='true'>&times;</span>
              <span className='sr-only'>Close</span>
            </button>
          </div>
          <div className='modal-body modal-body-no-header'>
            <MeasurementDetails
              measurement={openMeasurement} />
          </div>
          <div className='modal-footer text-xs-center'>
            <button className='btn btn-primary' onClick={onCloseClick}>
              Return
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

MeasurementViewer.propTypes = {
  selectedMeasurements: React.PropTypes.object,
  visibleMeasurements: React.PropTypes.array,
  onRowClick: React.PropTypes.func,
  onBackClick: React.PropTypes.func,
  onCloseClick: React.PropTypes.func,
  onToggleNormal: React.PropTypes.func,
  isMeasurementOpen: React.PropTypes.bool,
  openMeasurement: React.PropTypes.object,
  showNormal: React.PropTypes.bool
}

export default MeasurementViewer
