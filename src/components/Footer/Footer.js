import React from 'react'
import './Footer.scss'

export const Footer = () => (
  <div className='footer'>
    <div className='container'>
      <ul className='footer-links'>
        <li>
          <a href='https://ooni.torproject.org/about/'>About OONI</a>
        </li>
        <li>
          <a href='https://ooni.torproject.org/about/data-policy/'>Legal</a>
        </li>
        <li>
          <a href='mailto:contact@openobservatory.org'>Help</a>
        </li>
        <li>
          <a href='https://explorer.ooni.torproject.org/'>Explore data</a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
