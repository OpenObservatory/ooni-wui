import React from 'react'
import ReactDOM from 'react-dom'
import MeasurementDetails from './routes/Measurements/components/MeasurementDetails'
import './styles/core.scss'
import './styles/mobile.scss'

// ========================================================
// Mobile specific wrapping
// ========================================================
const initialState = window.___INITIAL_STATE__

class MeasurementWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            measurement: null,
            error: null
        }
    }

    componentDidMount() {
        try {
            const measurement = JSON.parse(MeasurementJSON.get())
            this.setState({measurement: measurement})
        } catch (e) {
            this.setState({error: e})
        }
    }

    render() {
        if (!this.state.measurement) {
            return <h2>Loading</h2>
        }
        if (this.state.error !== null) {
            return <div>
                <h2>Error in loading measurement</h2>
                <pre>{this.state.error.toString()}</pre>
            </div>
        }
        return <div className="container">
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
