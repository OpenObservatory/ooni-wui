import React from 'react'
import ReactDOM from 'react-dom'

import {
  IntlProvider
} from 'react-intl'

import {
  messages,
  loadLocaleData,
  getUserLocale,
  defaultLocale,
  getDirection
} from './store/locale'

import MeasurementDetails from './routes/Measurements/components/MeasurementDetails'
import './styles/core.mobile.scss'

// ========================================================
// Mobile specific wrapping
// ========================================================

const ErrorMessage = ({
    error
}) => {
  return (
    <div className='container-fluid text-xs-center'>
      <i className='medium-icon fa fa-exclamation-triangle' aria-hidden='true' />
      <h2>Error in loading the measurement</h2>
      <p>{error.toString()}</p>
    </div>
  )
}

ErrorMessage.propTypes = {
  error: React.PropTypes.object
}

class MeasurementWrapper extends React.Component {
  static propTypes = {
    error: React.PropTypes.object,
    direction: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      measurement: null,
      error: null
    }
  }

  componentDidMount () {
    if (this.props.error) {
      this.setState({ error: this.props.error })
      return
    }
    try {
      // eslint-disable-next-line no-undef
      const measurement = JSON.parse(MeasurementJSON.get())
      this.setState({ measurement: measurement })
    } catch (e) {
      this.setState({ error: e })
    }
  }

  render () {
    const { direction } = this.props

    if (this.state.error) {
      return <ErrorMessage error={this.state.error} />
    }
    if (!this.state.measurement) {
      return <div className='container-fluid text-xs-center' dir={direction}>
        <h2>Loading</h2>
      </div>
    }
    return <div className='container-fluid' dir={direction}>
      <MeasurementDetails measurement={this.state.measurement} />
    </div>
  }
}

class MobileContainer extends React.Component {
  static propTypes = {
    error: React.PropTypes.object
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { error } = this.props
    loadLocaleData()
    const locale = getUserLocale()
    const direction = getDirection(locale)

    return (
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={locale}
        messages={messages[locale]}>
        <MeasurementWrapper error={error} direction={direction} />
      </IntlProvider>
    )
  }

}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  try {
    ReactDOM.render(
      <MobileContainer />,
      MOUNT_NODE
    )
  } catch (error) {
    ReactDOM.render(
      <MobileContainer error={error} />,
      MOUNT_NODE
    )
  }
}

// ========================================================
// Go!
// ========================================================

if (!global.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/ar.js',
    'intl/locale-data/jsonp/el.js',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/es.js',
    'intl/locale-data/jsonp/fa.js',
    'intl/locale-data/jsonp/fr.js',
    'intl/locale-data/jsonp/it.js',
    'intl/locale-data/jsonp/hi.js',
    'intl/locale-data/jsonp/ru.js'
  ], function (require) {
    require('intl')
    require('intl/locale-data/jsonp/ar.js')
    require('intl/locale-data/jsonp/el.js')
    require('intl/locale-data/jsonp/en.js')
    require('intl/locale-data/jsonp/es.js')
    require('intl/locale-data/jsonp/fa.js')
    require('intl/locale-data/jsonp/fr.js')
    require('intl/locale-data/jsonp/it.js')
    require('intl/locale-data/jsonp/hi.js')
    require('intl/locale-data/jsonp/ru.js')

    render()
  })
} else {
  render()
}
