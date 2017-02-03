import React from 'react'

export const Footer = () => (
  <div className='footer'>
    <div className='container'>
      <ul className='footer-links'>
        <li>
          <a href='https://ooni.torproject.org/about/' target='_blank'>About OONI</a>
        </li>
        <li>
          <a href='https://ooni.torproject.org/about/data-policy/' target='_blank'>Data policy</a>
        </li>
        <li>
          <a href='mailto:contact@openobservatory.org' target='_blank'>Help</a>
        </li>
        <li>
          <a href='https://explorer.ooni.torproject.org/' target='_blank'>Explore data</a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
