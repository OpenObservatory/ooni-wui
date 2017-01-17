import React from 'react'

export const WhatsappDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.registration_server_status === 'ok' &&
      measurement.test_keys.whatsapp_web_status === 'ok' &&
      measurement.test_keys.registration_server_status === 'ok' &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' /> WhatsApp is working</h2>
      </div>
      }

      {(measurement.test_keys.whatsapp_endpoints_status === 'blocked' ||
      measurement.test_keys.whatsapp_web_status === 'blocked' ||
      measurement.test_keys.facebook_tcp_blocking === true ||
      measurement.test_keys.registration_server_status === 'blocked') &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o'/> Evidence of censorship</h2>
      </div>
      }

      {measurement.test_keys.whatsapp_endpoints_status === 'blocked'
      ? <p>
        The WhatsApp application is <strong className='text-danger'>blocked</strong>
      </p>
      : <p>
        The WhatsApp application is <strong className='text-success'>working properly</strong>
      </p>
      }

      {measurement.test_keys.whatsapp_web_status === 'blocked'
      ? <p>
        WhatsApp web is <strong className='text-danger'>blocked</strong>
      </p>
      : <p>
        WhatsApp web is <strong className='text-success'>working properly</strong>
      </p>
      }

      {measurement.test_keys.registration_server_status === 'blocked'
      ? <p>
        The WhatsApp registration service is <strong className='text-danger'>blocked</strong>
      </p>
      : <p>
        The WhatsApp registration service <strong className='text-success'>working properly</strong>
      </p>
      }

      {measurement.test_keys.facebook_tcp_blocking === true &&
      <p>
        WhatsApp appears to be <strong className='text-danger'>blocked</strong> by <strong>TCP/IP</strong>
      </p>
      }

    </div>
  )
}

WhatsappDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default WhatsappDetails
