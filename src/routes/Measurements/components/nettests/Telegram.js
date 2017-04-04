import React from 'react'
import { FormattedMessage } from 'react-intl'

export const TelegramDetails = ({ measurement }) => {
  return (
    <div>
      {measurement.test_keys.telegram_tcp_blocking === false &&
       measurement.test_keys.telegram_http_blocking === false &&
       <div>
         <h2 className='result-success'><i className='fa fa-check-circle-o' />
           <FormattedMessage
             id='nettests.telegram.working'
             defaultMessage='Telegram is working'
          />
         </h2>
       </div>
      }

      {measurement.test_keys.telegram_tcp_blocking === true || measurement.test_keys.telegram_http_blocking === true &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
          <FormattedMessage
            id='nettests.telegram.censorship'
            defaultMessage='Evidence of possible censorship'
          />
        </h2>
      </div>
      }
    </div>
  )
}

TelegramDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default TelegramDetails
