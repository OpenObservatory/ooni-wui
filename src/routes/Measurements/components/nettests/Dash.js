import React from 'react'
import { FormattedMessage } from 'react-intl'

import { mlabServerToCountry, mlabServerToName } from '../../../../util/nettest'

/*
 * This table is derived from:
 * https://support.google.com/youtube/answer/1722171?hl=en-GB
 */
const minimumBitrateForVideo = [
  {
    'sfr_min_bitrate': 600,
    'hfr_min_bitrate': 1000,
    'type': '240p'
  },
  {
    'sfr_min_bitrate': 1000,
    'hfr_min_bitrate': 1500,
    'type': '360p'
  },
  {
    'sfr_min_bitrate': 2500,
    'hfr_min_bitrate': 4000,
    'type': '480p'
  },
  {
    'sfr_min_bitrate': 5000,
    'hfr_min_bitrate': 7500,
    'type': '720p (HD)'
  },
  {
    'sfr_min_bitrate': 8000,
    'hfr_min_bitrate': 12000,
    'type': '1080p (full HD)'
  },
  {
    'sfr_min_bitrate': 16000,
    'hfr_min_bitrate': 24000,
    'type': '1440p (2k)'
  },
  {
    'sfr_min_bitrate': 35000,
    'hfr_min_bitrate': 53000,
    'type': '2160p (4k)'
  },
]

const getOptimalVideoRate = (test_keys) => {
  let optimalRate = null;
  minimumBitrateForVideo.forEach((rate) => {
    // Make sure we select the lowest speed bucket in case they overlap
    if (optimalRate === null &&
        test_keys.simple.median_bitrate >= rate['sfr_min_bitrate']) {
      optimalRate = rate
    }
  })
  if (optimalRate === null) {
    optimalRate = minimumBitrateForVideo[0]
  }
  return optimalRate
}

export class DashDetails extends React.Component {
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
          <h2 className='result-warning'><i className='fa fa-exclamation-circle' /> Error in measurement</h2>
          <p>We were not able to properly run the DASH test: <code>{measurement.test_keys.failure}</code></p>
        </div>
      )
    }

    return (
      <div>

        <div className='row'>
          <div className='col-xs-12'>
            <p>You can stream up to <strong>{getOptimalVideoRate(measurement.test_keys).type}</strong> video without any buffering.</p>
          </div>
        </div>

        {this.state.advancedEnabled ||
        <div className='row'>
          <div className='col-xs-6'>
            <button className='btn btn-secondary' onClick={() => this.toggledAdvanced()}>
              {/* Note: re-using NDT IDs by purpose */}
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
                  id='nettests.dash.Bitrate'
                  defaultMessage='Median Bitrate'
                />
              </span>
              <span className='result-item-value-big'>{(measurement.test_keys.simple.median_bitrate / 1000).toFixed(2)}</span>
              <span className='result-item-unit'>MBps</span>
            </div>
            <div className='col-xs-6 result-item'>
              <span className='result-item-name'>
                <FormattedMessage
                  id='nettests.dash.playout_delay'
                  defaultMessage='Playout delay'
                />
              </span>
              <span className='result-item-value-big'>{measurement.test_keys.simple.min_playout_delay.toFixed(2)}</span>
              <span className='result-item-unit'>s</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-6'>
              <button className='btn btn-secondary' onClick={() => this.toggledAdvanced()}>
                {/* Note: re-using NDT IDs by purpose */}
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

DashDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default DashDetails
