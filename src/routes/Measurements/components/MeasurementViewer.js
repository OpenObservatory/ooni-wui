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
  isMeasurementOpen,
  openMeasurement
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
            <p className='copy'>Date and Time: {formatDate(selectedMeasurements.test_start_time)}</p>
            <p className='copy'>ASN: {selectedMeasurements.asn}</p>
            <p className='copy'>Country: {selectedMeasurements.country_code}</p>
          </div>

          <BootstrapTable
            tableStyle={{ border: 'none' }}
            containerStyle={{ border: 'none' }}
            trClassName={rowClassNameFormat}
            data={selectedMeasurements.results}>
            <TableHeaderColumn dataAlign='center' dataField='url'>
              Url
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='anomaly'
              dataFormat={formatViewButton(tableOptions.onRowClick)}>
              Result
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
  onRowClick: React.PropTypes.func,
  onBackClick: React.PropTypes.func,
  onCloseClick: React.PropTypes.func,
  isMeasurementOpen: React.PropTypes.bool,
  openMeasurement: React.PropTypes.object
}

export default MeasurementViewer
