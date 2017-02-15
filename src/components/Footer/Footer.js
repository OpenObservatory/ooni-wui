import React from 'react'
import { FormattedMessage } from 'react-intl'

export const Footer = () => (
  <div className='footer'>
    <div className='container'>
      <ul className='footer-links'>
        <li>
          <a href='https://ooni.torproject.org/about/' target='_blank'>
            <FormattedMessage
              id='footer.AboutOoni'
              defaultMessage='About OONI'
            />
          </a>
        </li>
        <li>
          <a href='https://ooni.torproject.org/about/data-policy/'
            target='_blank'>
            <FormattedMessage
              id='footer.DataPolicy'
              defaultMessage='Data policy'
            />
          </a>
        </li>
        <li>
          <a href='mailto:contact@openobservatory.org' target='_blank'>
            <FormattedMessage
              id='footer.Help'
              defaultMessage='Help'
            />
          </a>
        </li>
        <li>
          <a href='https://explorer.ooni.torproject.org/' target='_blank'>
            <FormattedMessage
              id='footer.ExploreData'
              defaultMessage='Explore data'
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
