import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { updateIntl } from 'react-intl-redux'

import { refresh } from '../../store/location'
import { messages, supportedLanguages } from '../../store/locale'
import { FormattedMessage } from 'react-intl'

import './Header.scss'
import OONILogoImage from './assets/ooni-logo.svg'

export const Header = ({
  selectedLocale,
  onLocaleChange
}) => (
  <div className='header'>
    {/* This is for small viewports */}
    <div className='hidden-sm-up'>
      <div className='row text-xs-center'>
        <img src={OONILogoImage} className='ooni-logo' />
      </div>
      <div className='navigation row'>
        <div className='col-xs-12'>
          <IndexLink to='/' activeClassName='route--active' className='btn btn-primary'>
            <FormattedMessage
              id='header.smallViewports.Dashboard'
              defaultMessage='Dashboard'
            />
          </IndexLink>
          <Link to='/measurements' activeClassName='route--active' className='btn btn-primary'>
            <FormattedMessage
              id='header.smallViewports.Measurements'
              defaultValue='Measurements'
            />
          </Link>
          {/* <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
             <FormattedMessage
               id='header.smallViewports.Settings'
               defaultValue='Settings'
             />
           </Link>
           */}
          <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
            <FormattedMessage
              id='header.smallViewports.Logs'
              defaultValue='Logs'
            />
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
          <FormattedMessage
            id='header.biggerViewports.Dashboard'
            defaultMessage='Dashboard'
          />
        </IndexLink>
        <Link to='/measurements' activeClassName='route--active' className='btn btn-primary'>
          <FormattedMessage
            id='header.biggerViewports.Measurements'
            defaultMessage='Measurements'
          />
        </Link>
        {/* <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
           <FormattedMessage
             id='header.biggerViewports.Settings'
             defaultMessage='Settings'
           />
         </Link>
         */}
        <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
          <FormattedMessage
            id='header.biggerViewPorts.Logs'
            defaultMessage='Logs'
          />
        </Link>
        <div className='refresh-button rounded-circle'>
          <select value={selectedLocale} onChange={(event) => onLocaleChange(event.target.value)}>
            {supportedLanguages.map((locale) => {
              return (
                <option key={locale.code} value={locale.code}>{locale.name}</option>
              )
            })}
          </select>
        </div>
        <div className='refresh-button rounded-circle'>
          <i className='icon-btn fa fa-refresh' onClick={() => refresh()} />
        </div>
      </div>
      <div className='clearfix' />
    </div>
  </div>
)

Header.propTypes = {
  selectedLocale: React.PropTypes.string,
  onLocaleChange: React.PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  onLocaleChange: (locale) => {
    dispatch(updateIntl({
      locale: locale,
      messages: messages[locale]
    }))
  }
})

const mapStateToProps = (state) => {
  return {
    selectedLocale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
