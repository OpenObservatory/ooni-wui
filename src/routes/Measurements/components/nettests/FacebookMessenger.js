import React from 'react'

export const FacebookMessengerDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.facebook_dns_blocking === false &&
       measurement.test_keys.facebook_tcp_blocking === false &&
       <div>
         <h2 className='result-success'><i className='fa fa-check-circle-o' /> Facebook Messenger is working</h2>
       </div>
      }
      {measurement.test_keys.facebook_dns_blocking === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' /> Evidence of censorship</h2>
        <p>Facebook Messenger appears to be <strong className='text-danger'>blocked</strong> via <strong>DNS</strong>
        </p>
      </div>
      }

      {measurement.test_keys.facebook_tcp_blocking === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' /> Evidence of censorship</h2>
        <p>Facebook Messenger appears to be <strong className='text-danger'>blocked</strong> via <strong>TCP/IP</strong>
        </p>
      </div>
      }
    </div>
  )
}
FacebookMessengerDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default FacebookMessengerDetails
