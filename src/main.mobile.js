import React from 'react'
import ReactDOM from 'react-dom'

import {
  IntlProvider
} from 'react-intl'

import {
  messages,
  loadLocaleData,
  getUserLocale,
  defaultLocale
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
      <i className='medium-icon fa fa-exclamation-triangle' aria-hidden="true" />
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
    error: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      measurement: null,
      error: null
    }
  }

  componentDidMount () {
    if (this.props.error !== null) {
      return this.setState({ error: this.props.error})
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
    if (this.state.error !== null) {
      return <ErrorMessage error={this.state.error} />
    }
    if (!this.state.measurement) {
      return <div className='container-fluid text-xs-center'>
        <h2>Loading</h2>
      </div>
    }
    return <div className='container-fluid'>
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

    return (
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={getUserLocale()}
        messages={messages[getUserLocale()]}>
        <MeasurementWrapper error={error}/>
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
render()
