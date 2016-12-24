import React from 'react'
import Modal from 'react-modal'

import MeasurementDetails from './MeasurementDetails'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

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
      <div className="text-xs-left">
        <a className="text-primary clickable" onClick={onBackClick}>
          <i className="fa fa-arrow-circle-o-left" /> Return
        </a>
      </div>
      <div className="text-xs-center">
        <h1>{selectedMeasurements.test_name}</h1>
      </div>
        {selectedMeasurements.asn} - {selectedMeasurements.country_code} -

      <BootstrapTable
        options={tableOptions}
        bordered={true}
        hover={true}
        data={selectedMeasurements.results}>
        <TableHeaderColumn dataField="idx" isKey={true} hidden></TableHeaderColumn>
        <TableHeaderColumn dataAlign='center' dataField="url">
          Url
        </TableHeaderColumn>
        <TableHeaderColumn width="100" dataAlign='center' dataField="anomaly">
          Anomaly
        </TableHeaderColumn>
      </BootstrapTable>

      <Modal
        className="Modal__Bootstrap modal-dialog"
        onRequestClose={onCloseClick}
        contentLabel="Measurement details"
        isOpen={isMeasurementOpen}>
        <div className="modal-content">
          <button type="button" className="close" onClick={onCloseClick}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <div className="modal-body modal-body-no-header">
            <MeasurementDetails
              measurement={openMeasurement}/>
          </div>
          <div className="modal-footer text-xs-center">
            <button className="btn btn-primary" onClick={onCloseClick}>
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
};

export default MeasurementViewer
