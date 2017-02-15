import React from 'react'
import { FormattedMessage } from 'react-intl'

export const WhatsappDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.registration_server_status === 'ok' &&
      measurement.test_keys.whatsapp_web_status === 'ok' &&
      measurement.test_keys.registration_server_status === 'ok' &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
          <FormattedMessage
            id='nettests.whatsapp.working'
            defaultMessage='WhatsApp is working'
          />
        </h2>
      </div>
      }

      {(measurement.test_keys.whatsapp_endpoints_status === 'blocked' ||
      measurement.test_keys.whatsapp_web_status === 'blocked' ||
      measurement.test_keys.facebook_tcp_blocking === true ||
      measurement.test_keys.registration_server_status === 'blocked') &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
          <FormattedMessage
            id='nettests.whatsapp.censorship'
            defaultMessage='Evidence of possible censorship'
          />
        </h2>
      </div>
      }

      {measurement.test_keys.whatsapp_endpoints_status === 'blocked'
      ? <p>
        <FormattedMessage
          id='nettests.whatsapp.applicationBlocked'
          defaultMessage='The WhatsApp application appears to be {status}.'
          values={{
            status: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.whatsapp.applicationBlocked.statusBlocked'
                defaultMessage='blocked'
              /></strong>
          }}
        />
      </p>
      : <p>
        <FormattedMessage
          id='nettests.whatsapp.notBlocked'
          defaultMessage='The WhatsApp application appears to be {status}.'
          values={{
            status: <strong className='text-success'>
              <FormattedMessage
                id='nettests.whatsapp.notBlocked.workingProperly'
                defaultMessage='working properly'
              /></strong>
        }}
      />
      </p>
      }

      {measurement.test_keys.whatsapp_web_status === 'blocked'
      ? <p>
        <FormattedMessage
          id='nettests.whatsapp.webBlocked'
          defaultMessage='WhatsApp web appears to be {status}.'
          values={{
            status: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.whatsapp.webBlocked.blocked'
                defaultMessage='blocked'
              /></strong>
          }}
        />
      </p>
      : <p>
        <FormattedMessage
          id='nettests.whatsapp.webWorking'
          defaultMessage='WhatsApp web appears to be {status}.'
          values={{
            status: <strong className='text-success'>
              <FormattedMessage
                id='nettests.whatsapp.webWorking.properly'
                defaultMessage='working properly'
              /></strong>
          }}
        />
      </p>
      }

      {measurement.test_keys.registration_server_status === 'blocked'
      ? <p>
        <FormattedMessage
          id='nettests.whatsapp.registrationBlocked'
          defaultMessage='The WhatsApp registration service appears to be {status}.'
          values={{
            status: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.whatsapp.registrationBlocked.blocked'
                defaultMessage='blocked'
              /></strong>
          }}
        />
      </p>
      : <p>
        <FormattedMessage
          id='nettests.whatsapp.registrationWorking'
          defaultMessage='The WhatsApp registration service appears to be {status}.'
          values={{
            status: <strong className='text-success'>
              <FormattedMessage
                id='nettests.whatsapp.registrationWorking.properly'
                defaultMessage='working properly'
              /></strong>
          }}
        />
      </p>
      }

      {measurement.test_keys.facebook_tcp_blocking === true &&
      <p>
        <FormattedMessage
          id='nettests.whatsappIs'
          defaultMessage='WhatsApp appears to be {blocked} by {tcpIP}.'
          values={{
            blocked: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.whatsappIs.blocked'
                defaultMessage='blocked'
              /></strong>,
            tcpIP: <strong>
              <FormattedMessage
                id='nettests.whatsappIs.blocked.byTcp'
                defaultMessage='TCP/IP'
              /></strong>
          }}
        />
      </p>
      }

    </div>
  )
}

WhatsappDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default WhatsappDetails
