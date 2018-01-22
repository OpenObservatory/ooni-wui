import React from 'react'
import { FormattedMessage } from 'react-intl'

export const TelegramDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.telegram_tcp_blocking === false &&
       measurement.test_keys.telegram_http_blocking === false &&
       measurement.test_keys.telegram_web_status === 'ok' &&
       <div>
         <h2 className='result-success'><i className='fa fa-check-circle-o' />
           <FormattedMessage
             id='nettests.telegram.working'
             defaultMessage='Telegram is working'
          />
         </h2>
       </div>
      }

      {measurement.test_keys.telegram_tcp_blocking === true ||
      measurement.test_keys.telegram_web_status === 'blocked' ||
      measurement.test_keys.telegram_http_blocking === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' />
          <FormattedMessage
            id='nettests.telegram.censorship'
            defaultMessage='Evidence of possible censorship'
          />
        </h2>
      </div>
      }

      {(measurement.test_keys.telegram_tcp_blocking === true ||
      measurement.test_keys.telegram_http_blocking === true) &&
      <p>
        <FormattedMessage
          id='nettests.telegram.applicationBlocked'
          defaultMessage='The Telegram application appears to be {status}.'
          values={{
            status: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.telegram.applicationBlocked.statusBlocked'
                defaultMessage='blocked'
              /></strong>
          }}
        />
      </p>
      }

      {measurement.test_keys.telegram_tcp_blocking === false &&
      measurement.test_keys.telegram_http_blocking === false &&
      <p>
        <FormattedMessage
          id='nettests.telegram.notBlocked'
          defaultMessage='The Telegram application appears to be {status}.'
          values={{
            status: <strong className='text-success'>
              <FormattedMessage
                id='nettests.telegram.notBlocked.workingProperly'
                defaultMessage='working properly'
              /></strong>
          }}
      />
      </p>
      }

      {measurement.test_keys.telegram_web_status === 'blocked'
      ? <p>
        <FormattedMessage
          id='nettests.telegram.webBlocked'
          defaultMessage='Telegram web appears to be {status}.'
          values={{
            status: <strong className='text-danger'>
              <FormattedMessage
                id='nettests.telegram.webBlocked.blocked'
                defaultMessage='blocked'
              /></strong>
          }}
        />
      </p>
      : <p>
        <FormattedMessage
          id='nettests.telegram.webWorking'
          defaultMessage='Telegram web appears to be {status}.'
          values={{
            status: <strong className='text-success'>
              <FormattedMessage
                id='nettests.telegram.webWorking.properly'
                defaultMessage='working properly'
              /></strong>
          }}
        />
      </p>
      }

    </div>
  )
}

TelegramDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default TelegramDetails
