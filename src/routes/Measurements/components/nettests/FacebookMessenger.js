import React from 'react'

export const FacebookMessengerDetails = ({measurement}) => {

  return (
    <div>
      {measurement.test_keys.facebook_dns_blocking === false
      && measurement.test_keys.facebook_tcp_blocking === false &&
      <p className="text-success">
        Facebook Messenger appears to be working properly.
      </p>
      }
      {measurement.test_keys.facebook_dns_blocking === true &&
      <p className="text-danger copy">
        Facebook Messenger appears to be blocked via
        <strong>DNS</strong>
      </p>
      }

      {measurement.test_keys.facebook_tcp_blocking === true &&
      <p className="text-danger copy">
        Facebook Messenger appears to be blocked to due to TCP/IP blocking
      </p>
      }
   </div>
  )
}
FacebookMessengerDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default FacebookMessengerDetails
