import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import OONILogoImage from './assets/ooni-logo.svg'
import { refresh } from '../../store/location'

export const Header = () => (
  <div className='header'>
    {/* This is for small viewports */}
    <div className='hidden-sm-up'>
      <div className='row text-xs-center'>
        <img src={OONILogoImage} className='ooni-logo' />
      </div>
      <div className='navigation row'>
        <div className='col-xs-12'>
          <IndexLink to='/' activeClassName='route--active' className='btn btn-primary'>
            Dashboard
          </IndexLink>
          <Link to='/measurements' activeClassName='route--active' className='btn btn-primary'>
            Measurements
          </Link>
          {/* <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
           Settings
           </Link>
           */}
          <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
            Logs
          </Link>
          <div className='refresh-button rounded-circle'>
            <i className='icon-btn fa fa-refresh' onClick={() => refresh()} />
          </div>
        </div>
        <div className='clearfix' />
      </div>
    </div>
    {/* This is for bigger viewports */}
    <div className='hidden-xs-down'>
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
        {/* <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
         Settings
         </Link>
         */}
        <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
          Logs
        </Link>
        <div className='refresh-button rounded-circle'>
          <i className='icon-btn fa fa-refresh' onClick={() => refresh()} />
        </div>
      </div>
      <div className='clearfix' />
    </div>
  </div>
)

export default Header
