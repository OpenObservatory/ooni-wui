import React from 'react'

export const HttpInvalidRequestLineDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.tampering === true &&
      <p className='text-danger copy'>
        <i className='ooni icon-censorship-tampering' />
        This measurement contains data that could be a sign of network tampering or censorship.
      </p>
      }
      {measurement.test_keys.tampering === false &&
      <p className='text-success copy'>
        <i className='ooni icon-censorship-tampering' />
        This measurement looks normal
      </p>
      }

      {measurement.test_keys.tampering === true &&
      <p className='copy'>This means there could be a transparent HTTP proxy present on your
        network. Click on the "Toggle exchanges" button below to see more
        information.</p>
      }

      <button className='btn btn-primary'>
        Toggle exchanges
      </button>
      {measurement.test_keys.sent.map((sentData, index) => {
        return (
          <div className='row'>
            <div className='col-sm-6'>
              <div className='card card-block'>
                <h3 className='card-title'>I sent</h3>
                <p className='card-text wordwrap'>
                  {sentData}
                </p>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='card card-block'>
                <h3 className='card-title'>I received</h3>
                <p className='card-text wordwrap'>
                  {measurement.test_keys.received[index]}
                </p>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

HttpInvalidRequestLineDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default HttpInvalidRequestLineDetails
