import React from 'react';
import MeasurementEntryContainer from '../containers/MeasurementEntryContainer';

const MeasurementList = ({measurements}) => {
  return (
    <div>
      {measurements.length > 0 ?
        <div>
          <h3>Measurement list</h3>
          {measurements.map((measurement, index) => (
            <MeasurementEntryContainer
              key={measurement.id}
              measurement={measurement}
            />
          ))}
        </div> :
        <h3>No measurement run yet</h3>
      }
    </div>
  )
}

MeasurementList.propTypes = {
  measurements: React.PropTypes.array
};

export default MeasurementList
