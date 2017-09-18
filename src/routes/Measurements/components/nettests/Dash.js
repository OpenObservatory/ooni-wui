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

const getOptimalQualityForBitrate = (test_keys) => {
  let optimalQuality = minimumBitrateForVideo[0]
  minimumBitrateForVideo.forEach((rate) => {
    // Note: we use SFR rather than HFR because SFR is more common
    if (test_keys.simple.median_bitrate >= rate['sfr_min_bitrate']) {
      optimalQuality = rate
    }
  })
  return optimalQuality
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
          <h2 className='result-warning'><i className='fa fa-exclamation-circle' />
          {' '}
          {/* Key is shared with NDT */}
          <FormattedMessage
            id='nettests.ndt.ErrorInMeasurement'
            defaultMessage='Error in measurement'
            values={{
              errorCode: <code>{measurement.test_keys.failure}</code>
            }}
          /></h2>

          <p><FormattedMessage
            id='nettests.dash.TestError'
            defaultMessage='We were not able to properly run the DASH test: {errorCode}'
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
          <div className='col-xs-12'>
            <p>
              <FormattedMessage
                id='nettests.dash.StreamUpTo'
                defaultMessage='You can stream up to {optimalVideoRate} video without any buffering.'
                values={{
                  optimalVideoRate: <strong>
                    {getOptimalQualityForBitrate(measurement.test_keys).type}
                  </strong>
                }}
              />
            </p>
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
