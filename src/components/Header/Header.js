import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { updateIntl } from 'react-intl-redux'

import { refresh } from '../../store/location'
import { messages, supportedLanguages } from '../../store/locale'
import { FormattedMessage } from 'react-intl'

import LanguagePicker from './LanguagePicker'
import './Header.scss'
import OONILogoImage from './assets/ooni-logo.svg'

export const Header = ({
  selectedLocale,
  onLocaleChange
}) => (
  <div className='header'>
    {/* This is for small viewports */}
    <div className='hidden-sm-up header-small'>
      <div className='row text-xs-center'>
        <img src={OONILogoImage} className='ooni-logo' />
      </div>
      <div className='row text-xs-center'>
        <IndexLink to='/' activeClassName='route--active' className='btn btn-primary'>
          <FormattedMessage
            id='header.smallViewports.Dashboard'
            defaultMessage='Dashboard'
          />
        </IndexLink>
      </div>
      <div className='row text-xs-center'>
        <Link to='/measurements' activeClassName='route--active' className='btn btn-primary'>
          <FormattedMessage
            id='header.smallViewports.Measurements'
            defaultMessage='Measurements'
          />
        </Link>
      </div>
      <div className='row text-xs-center'>
        {/* <Link to='/settings' activeClassName='route--active' className='btn btn-primary'>
         <FormattedMessage
           id='header.smallViewports.Settings'
           defaultMessage='Settings'
         />
       </Link>
       */}
      </div>
      <div className='row text-xs-center'>
        <Link to='/logs' activeClassName='route--active' className='btn btn-primary'>
          <FormattedMessage
            id='header.smallViewports.Logs'
            defaultMessage='Logs'
          />
        </Link>
      </div>
      <div className='row text-xs-center'>
        <LanguagePicker
          selectedLocale={selectedLocale}
          inline
          options={supportedLanguages}
          onClickOption={(option) => onLocaleChange(option.code)} />
      </div>
      <div className='row text-xs-center'>
        <div className='refresh-button rounded-circle row'>
          <i className='icon-btn fa fa-refresh' onClick={() => refresh()} />
        </div>
      </div>
      <div className='clearfix' />
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
        <LanguagePicker
          selectedLocale={selectedLocale}
          options={supportedLanguages}
          onClickOption={(option) => onLocaleChange(option.code)} />
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
