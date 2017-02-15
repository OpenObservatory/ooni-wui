import React from 'react'

export const FacebookMessengerDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.facebook_dns_blocking === false &&
       measurement.test_keys.facebook_tcp_blocking === false &&
       <div>
         <h2 className='result-success'><i className='fa fa-check-circle-o' />
           <FormattedMessaged
             id='nettests.facebookMessenger.IsWorking'
             defaultValue='Facebook Messenger is working'
           />
          </h2>
       </div>
      }
      {measurement.test_keys.facebook_dns_blocking === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' />
          <FormattedMessage
            id='nettests.facebookMessenger.DnsBlocking.evidenceOfCensorship'
            defaultValue='Evidence of censorship'
          />
        </h2>
        <p>
          <FormattedMessage
            id='nettests.facebookMessenger.DnsBlocking.details'
            defaultValue='Facebook Messenger appears to be {blocked} via {reason}'
            values={{
              blocked:
                <strong className='text-danger'>
                  <FormattedMessage
                    id='nettests.facebookMessenger.DnsBlocking.details.blocked'
                    defaultValue='blocked'
                  />
                </strong>,
              reason: <strong>DNS</strong>
            }}
          />
        </p>
      </div>
      }

      {measurement.test_keys.facebook_tcp_blocking === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' />
          <FormattedMessage
            id='nettests.facebookMessenger.TcpIpBlocking.evidenceOfCensorship'
            defaultValue='Evidence of censorship'
          />
        </h2>
        <p>
          <FormattedMessage
            id='nettests.facebookMessenger.TcpIpBlocking.details'
            defaultValue='Facebook Messenger appears to be {blocked} via {reason}'
            values={{
              blocked:
                <strong>
                  <FormattedMessage
                    id='nettests.facebookMessenger.TcpIpBlocking.details.blocked'
                    defaultValue='blocked'
                  />
                </strong>,
              reason: <strong>TCP/IP</strong>
            }}
          />
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
