import React from 'react'

export class VanillaTorDetails extends React.Component {

  constructor (props) {
    super(props)
    this.state = { showLog: false }
  }

  toggleLog () {
    this.setState({ showLog: !this.state.showLog })
  }

  render () {
    const { measurement } = this.props

    return (
      <div>
        {measurement.test_keys.success === true &&
        <div>
          <h2 className='result-success'><i className='fa fa-check-circle-o' /> Tor is working</h2>
          <p>It took {measurement.test_runtime}s to bootstrap
            Tor version <code>{measurement.test_keys.tor_version}</code>
          </p>
        </div>
        }

        {measurement.test_keys.success === false &&
        <div>
          <h2 className='result-danger'><i className='fa fa-times-circle-o' /> Evidence of censorship</h2>
          <p>Tor version <code>{measurement.test_keys.tor_version}</code> appears to be blocked.
          </p>
        </div>
        }

        {this.state.showLog &&
          <div>
            <pre>{measurement.test_keys.tor_log}</pre>
          </div>
        }

        <button className='btn btn-secondary' onClick={() => this.toggleLog()}>
          {this.state.showLog ? 'Hide' : 'Show'} tor log
        </button>

      </div>
    )
  }
}

VanillaTorDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default VanillaTorDetails
