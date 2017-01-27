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
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' /> Evidence of network tampering</h2>
        <p>When contacting our control servers we noticed that our traffic was being manipulated.
          This means that there could be a <strong>“middle box”</strong> which could be responsible for censorship
          and/or traffic manipulation.
        </p>
      </div>
      }

      {anomaly === false &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' /> Everything is OK</h2>
        <p>There was no anomaly in communicating to our control servers.</p>
      </div>
      }
    </div>
  )
}

HttpHeaderFieldManipulationDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default HttpHeaderFieldManipulationDetails
