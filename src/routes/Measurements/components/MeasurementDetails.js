import React from 'react'
import JSONTree from 'react-json-tree'

export const MeasurementDetails = ({
  measurement
}) => {
  return (
    <div>
      <div className="text-xs-center">
        <h2>Runtime: {measurement.test_runtime}</h2>
        <h2>ASN: {measurement.probe_asn}</h2>
        <h2>Country: {measurement.probe_cc}</h2>
      </div>
      <JSONTree
        hideRoot={true}
        shouldExpandNode={(keyName, data, level) => {
          const collapsedKeys = ['request', 'response']
          return (collapsedKeys.indexOf(keyName[0]) === -1)
        }}
        data={measurement} />
    </div>
  )
}

MeasurementDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default MeasurementDetails
