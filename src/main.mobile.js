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
class MeasurementWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      measurement: null,
      error: null
    }
  }

  componentDidMount () {
    try {
      // eslint-disable-next-line no-undef
      const measurement = JSON.parse(MeasurementJSON.get())
      this.setState({ measurement: measurement })
    } catch (e) {
      this.setState({ error: e })
    }
  }

  render () {
    if (!this.state.measurement) {
      return <div className='container-fluid text-xs-center'>
        <h2>Loading</h2>
      </div>
    }
    if (this.state.error !== null) {
      return <div>
        <h2>Error in loading measurement</h2>
        <pre>{this.state.error.toString()}</pre>
      </div>
    }
    return <div className='container-fluid'>
      <MeasurementDetails measurement={this.state.measurement} />
    </div>
  }
}

class MobileContainer extends React.Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    loadLocaleData()

    return (
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={getUserLocale()}
        messages={messages[getUserLocale()]}>
        <MeasurementWrapper />
      </IntlProvider>
    )
  }

}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <MobileContainer />,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()
