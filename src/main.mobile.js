import React from 'react'
import ReactDOM from 'react-dom'
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
    if (this.state.error !== null) {
      return <div className='container-fluid text-xs-center'>
        <h2>Error in loading the measurement</h2>
        <pre>{this.state.error.toString()}</pre>
      </div>
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
  ReactDOM.render(
    <MeasurementWrapper />,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()
