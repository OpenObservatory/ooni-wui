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
          <h2 className='result-success'><i className='fa fa-check-circle-o' /> 
          
          <FormattedMessage
            id='nettests.vanillaTor.working'
            defaultMessage='Tor is working'
          />

          </h2>
          <p>
          <FormattedMessage
            id='nettests.vanillaTor.working.text'
            defaultMessage='It took {testRuntime}s to bootstrap Tor version {torVersion}'
            values={{
              testRuntime: measurement.test_runtime,
              torVersion: <code>{measurement.test_keys.tor_version}</code>
            }}
          />
          </p>
        </div>
        }

        {measurement.test_keys.success === false &&
        <div>
          <h2 className='result-danger'><i className='fa fa-times-circle-o' />
          <FormattedMessage
            id='nettests.vanillaTor.censorship'
            defaultMessage='Evidence of possible censorship'
            />
           </h2>

          <p>
          <FormattedMessage
            id='nettests.vanillaTor.torVersion.blocked'
            defaultMessage='Tor version {torVersion} appears to be blocked.'
            values={{
              torVersion: <code>{measurement.test_keys.tor_version}</code>
            }}
          />          
          </p>
        </div>
        }

        {this.state.showLog &&
          <div>
            <pre>{measurement.test_keys.tor_log}</pre>
          </div>
        }

        <button className='btn btn-secondary' onClick={() => this.toggleLog()}>
          {this.state.showLog
           ? <FormattedMessage
               id='nettests.vanillaTor.hide'
               defaultMessage='Hide'
             />
           : <FormattedMessage
               id='nettests.vanillaTor.show'
               defaultMessage='Show'
             />
           }
             tor log
        </button>

      </div>
    )
  }
}

VanillaTorDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default VanillaTorDetails
