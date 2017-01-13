import React from 'react'

export const HttpHeaderFieldManipulationDetails = ({ measurement }) => {
  let anomaly = false
  const tampering = measurement.test_keys.tampering
  Object.keys(tampering).forEach((key) => {
    if (tampering[key] === true) {
      anomaly = true
    }
  })
  return (
    <div>
      {anomaly === true &&
      <p className='text-danger copy'>
      This measurement contains data that could be a sign of network tampering or censorship.
    </p>
    }
      {anomaly === false &&
      <p className='text-success copy'>
        This measurement looks normal
      </p>
    }
      {anomaly === true &&
      <p>This means there could be a transparent HTTP proxy present on your
      network.</p>
    }

    </div>
  )
}

HttpHeaderFieldManipulationDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default HttpHeaderFieldManipulationDetails
