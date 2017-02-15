import React from 'react'

export const TcpConnectDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.connection === 'success' &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
          <FormattedMessage
            id='nettests.tcpConnect.EverythingOkay'
            defaultValue='Everything is OK'
          />
        </h2>
      </div>
      }

      {measurement.test_keys.connection !== 'success' &&
      <div>
        <h2 className='result-warning'><i className='fa fa-times-circle-o' />
          <FormattedMessage
            id='nettests.tcpConnect.ConnectionProblem'
            defaultValue='Connection problem'
          />
        </h2>
        <p>
          <FormattedMessage
           id='nettests.tcpConnect.Explanation'
           defaultValue='When connecting to {input} we got the error {error}'
           values={{
             input: <code>{measurement.input}</code>,
             error: <code>{measurement.test_keys.connection}</code>
           }}
          />
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
