import React from 'react'
import ReactDOM from 'react-dom'
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
        <h2>Error in loading the measurement</h2>
        <pre>{error.toString()}</pre>
      </div>
    )
}

ErrorMessage.propTypes = {
    error: React.PropTypes.object
}

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

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  try {
    ReactDOM.render(
      <MeasurementWrapper />,
      MOUNT_NODE
    )
  } catch (error) {
    ReactDOM.render(
      <ErrorMessage error={error} />,
      MOUNT_NODE
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
