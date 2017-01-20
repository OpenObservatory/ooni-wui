import React from 'react'

export const TcpConnectDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.connection === 'success' &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' /> Everything is OK</h2>
      </div>
      }

      {measurement.test_keys.connection !== 'success' &&
      <div>
        <h2 className='result-warning'><i className='fa fa-times-circle-o' /> Connection problem</h2>
        <p>When connecting to <code>{measurement.input}</code> we got the error
          <code>{measurement.test_keys.connection}</code>
        </p>
      </div>
      }

    </div>
  )
}

TcpConnectDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default TcpConnectDetails
