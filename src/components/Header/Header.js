import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import OONILogoImage from './assets/ooni-logo.svg'

export const Header = () => (
  <div className='header'>
    <div className='pull-left'>
      <img src={OONILogoImage} className='ooni-logo' />
    </div>
    <div className='navigation pull-right'>
      <IndexLink to='/' activeClassName='route--active' className='btn btn-primary'>
          Dashboard
        </IndexLink>
      <Link to='/measurements' activeClassName='route--active' className='btn btn-primary'>
          Measurements
        </Link>
      <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
          Settings
        </Link>
      <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
          Logs
        </Link>
    </div>
  </div>
)

export default Header
