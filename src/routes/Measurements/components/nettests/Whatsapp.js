import React from 'react'

export const WhatsappDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.registration_server_status === 'ok' &&
      measurement.test_keys.whatsapp_web_status === 'ok' &&
      measurement.test_keys.registration_server_status === 'ok' &&
      <p className='text-success copy'>
        WhatsApp appears to be working properly.
      </p>
      }

      {measurement.test_keys.whatsapp_endpoints_status === 'blocked' &&
      <p className='text-danger copy'>
        The WhatsApp application is blocked
      </p>
      }

      {measurement.test_keys.whatsapp_web_status === 'blocked' &&
      <p className='text-danger copy'>
        WhatsApp Web is blocked
      </p>
      }

      { // XXX
      measurement.test_keys.facebook_tcp_blocking === true &&
      <p className='text-danger copy'>
        WhatsApp appears to be blocked to due to TCP/IP blocking
      </p>
      }

      {measurement.test_keys.registration_server_status === 'blocked' &&
      <p className='text-danger copy'>
        WhatsApp registration server is blocked
      </p>
      }

    </div>
  )
}

WhatsappDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default WhatsappDetails
