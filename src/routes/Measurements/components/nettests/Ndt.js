import React from 'react'
import { FormattedMessage } from 'react-intl'

import { mlabServerToCountry, mlabServerToName } from '../../../../util/nettest'

export class NdtDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = { advancedEnabled: false }
  }

  toggledAdvanced () {
    this.setState({ advancedEnabled: !this.state.advancedEnabled })
  }

  render () {
    const { measurement } = this.props

    if (measurement.test_keys.failure !== null) {
      return (
        <div>
          <h2 className='result-warning'><i className='fa fa-exclamation-circle' />
          {' '}
          <FormattedMessage
            id='nettests.ndt.ErrorInMeasurement'
            {/* Key is shared with NDT */}
            defaultMessage='Error in measurement'
            values={{
              errorCode: <code>{measurement.test_keys.failure}</code>
            }}
          /></h2>
          <p><FormattedMessage
            id='nettests.ndt.TestError'
            defaultMessage='We were not able to properly run the NDT test: {errorCode}'
            values={{
              errorCode: <code>{measurement.test_keys.failure}</code>
            }}
          /></p>
          <p><FormattedMessage
            id='nettests.ndt.TestError.reason'
            defaultMessage='This usually happens when the port used by NDT is blocked by your ISP'
            values={{
              errorCode: <code>{measurement.test_keys.failure}</code>
            }}
          /></p>
        </div>
      )
    }

    return (
      <div>
        <div className='row'>
          <div className='col-xs-6 result-item'>
            <span className='result-item-name'>
              <FormattedMessage
                id='nettests.ndt.Download'
                defaultMessage='Download'
              />
              <i className='fa fa-arrow-circle-o-down' />
            </span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.download / 1000).toFixed(2)}</span>
            <span className='result-item-unit'>MBps</span>
          </div>
          <div className='col-xs-6 result-item'>
            <span className='result-item-name'>
              <FormattedMessage
                id='nettests.ndt.Upload'
                defaultMessage='Upload'
              />
              <i className='fa fa-arrow-circle-o-up' />
            </span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.upload / 1000).toFixed(2)}</span>
            <span className='result-item-unit'>MBps</span>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 result-item'>
            <span className='result-item-name'>
              <FormattedMessage
                id='nettests.ndt.ping'
                defaultMessage='Ping'
              />
              <i className='fa fa-exchange' />
            </span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.ping).toFixed(1)}</span>
            <span className='result-item-unit'>ms</span>
          </div>
          <div className='col-xs-6 result-item'>
            <span className='result-item-name'>
              <FormattedMessage
                id='nettests.ndt.Server'
                defaultMessage='Server'
              />
              <i className='fa fa-server' />
            </span>
            <span className='result-item-value-big'>{mlabServerToCountry(measurement.test_keys.server_address)}</span>
            <span className='result-item-unit'>{mlabServerToName(measurement.test_keys.server_address)}</span>
          </div>
        </div>

        {this.state.advancedEnabled ||
        <div className='row'>
          <div className='col-xs-6'>
            <button className='btn btn-secondary' onClick={() => this.toggledAdvanced()}>
              <FormattedMessage
                id='nettests.ndt.More'
                defaultMessage='More'
              />
            </button>
          </div>
        </div>
        }
        {this.state.advancedEnabled &&
        <div>

          <div className='row'>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.ndt.PacketLoss'
                  defaultMessage='Packet Loss'
                />
              </span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.packet_loss * 100).toFixed(3)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.net.OutOfOrder'
                  defaultMessage='Out of order'
                />
              </span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.out_of_order * 100).toFixed(1)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.ndt.AveragePing'
                  defaultMessage='Average Ping'
                />
              </span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.avg_rtt).toFixed(0)}
              </span>
              <span className='result-item-unit'>ms</span>
            </div>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.ndt.MaxPing'
                  defaultMessage='Max Ping'
                />
              </span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.max_rtt).toFixed(0)}
              </span>
              <span className='result-item-unit'>ms</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.ndt.Mss'
                  defaultMessage='MSS'
                />
              </span>
              <span className='result-item-value-big'>
                {measurement.test_keys.advanced.mss}
              </span>
            </div>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.ndt.Timeouts'
                  defaultMessage='Timeouts'
                />
              </span>
              <span className='result-item-value-big'>
                {measurement.test_keys.advanced.timeouts}
              </span>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-6'>
              <button className='btn btn-secondary' onClick={() => this.toggledAdvanced()}>
                <FormattedMessage
                  id='nettests.ndt.Less'
                  defaultMessage='Less'
                />
              </button>
            </div>
          </div>

        </div>
        }
      </div>
    )
  }
}

NdtDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default NdtDetails
