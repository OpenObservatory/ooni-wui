import React from 'react';
import './MeasurementEntry.scss';

import moment from 'moment';

const MeasurementEntry = ({measurement, onDeleteClick, onKeepClick}) => {
  return (
      <div className="measurement-set">
        <div className="measurement-labels">
            {measurement.keep == true &&
              <span className="tag tag-success">keeping</span>
            }
            {measurement.running == true &&
              <span className="tag tag-success">running</span>
            }
            {measurement.runnning != true && measurement.completed == false &&
              <span className="tag tag-warning">incomplete</span>
            }
        </div>
        <h3>{measurement.test_name}
          <small>{moment(measurement.test_start_time).format('lll')}</small>
        </h3>
        <div className="measurement-details">
          <span><strong>ASN</strong> {measurement.asn}</span>
          <span><strong>Country</strong> {measurement.country_code}</span>
          {measurement.completed == true
           && <button className="btn btn-primary">Show measurements</button>
          }
          {measurement.keep == false &&
          <button className="btn btn-primary"
                  onClick={onKeepClick}>
            Keep
          </button>
          }
          {measurement.running == false &&
            <button className="btn btn-danger"
                    onClick={onDeleteClick}>
                Delete
            </button>
          }

        </div>
      </div>
    )
};

MeasurementEntry.propTypes = {
  measurement: React.PropTypes.object.isRequired,
  onDeleteClick: React.PropTypes.func.isRequired,
  onKeepClick: React.PropTypes.func.isRequired
};

export default MeasurementEntry;
