import React from 'react'
import { FormattedMessage } from 'react-intl'
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
              <FormattedMessage
                id='measurements.measurementViewer.returnButton'
                defaultMessage='{iconArrowLeft} Return'
                values={{
                  iconArrowLeft: <i className='fa fa-arrow-circle-o-left' />
                }}
              />
            </a>
          </div>
          <div className='text-xs-center'>

            <h1>{getPrettyNettestName(selectedMeasurements.test_name)}</h1>
            <div className='result-metadata'>
              {formatDate(selectedMeasurements.test_start_time)}
              {' | '}
              <FormattedMessage
                id='measurements.measurementViewer.location'
                defaultMessage='Location: {countryCode} ({asNumber})'
                values={{
                  countryCode: selectedMeasurements.country_code,
                  asNumber: selectedMeasurements.asn
                }}
              />
            </div>
          </div>

          <BootstrapTable
            tableStyle={{ border: 'none' }}
            containerStyle={{ border: 'none' }}
            trClassName={rowClassNameFormat}
            data={visibleMeasurements}>
            <TableHeaderColumn dataAlign='center' dataField='url'>
              <strong>
                <FormattedMessage
                  id='measurements.measurementViewer.url'
                  defaultMessage='URL'
                /> (
                <a href='#' onClick={(evt) => onToggleNormal(evt)}>
                  {showNormal
                   ? <FormattedMessage
                     id='measurements.measurementViewer.hideNormal'
                     defaultMessage='Hide normal'
                     />
                   : <FormattedMessage
                     id='measurements.measurementViewer.showNormal'
                     defaultMessage='Show normal'
                     />
                  }
                </a>
                )</strong>
            </TableHeaderColumn>
            <TableHeaderColumn width='100' dataAlign='center' dataField='anomaly'
              dataFormat={formatViewButton(tableOptions.onRowClick)}>
              <strong>
                <FormattedMessage
                  id='measurements.measurementViewer.result'
                  defaultMessage='Result'
                />
              </strong>
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
              <FormattedMessage
                id='measurements.measurementViewer.returnButtonNoIcon'
                defaultMessage='Return'
              />
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
