import React from 'react'

const MLAB_LOC_TO_COUNTRY = {
  'yyz01': 'CA',
  'yyc01': 'CA',
  'yul01': 'CA',
  'wlg02': 'NZ',
  'wlg01': 'NZ',
  'vie01': 'AT',
  'tun01': 'TN',
  'trn01': 'IT',
  'tpe01': 'TW',
  'tnr01': 'MG',
  'syd02': 'AU',
  'syd01': 'AU',
  'svg01': 'NO',
  'sin01': 'SG',
  'sea05': 'US',
  'sea04': 'US',
  'sea03': 'US',
  'sea02': 'US',
  'sea01': 'US',
  'prg01': 'CZ',
  'par01': 'FR',
  'ord05': 'US',
  'ord04': 'US',
  'ord03': 'US',
  'ord02': 'US',
  'ord01': 'US',
  'nuq06': 'US',
  'nuq05': 'US',
  'nuq04': 'US',
  'nuq03': 'US',
  'nuq02': 'US',
  'nuq01': 'US',
  'nbo01': 'KE',
  'mnl01': 'PH',
  'mil01': 'IT',
  'mia05': 'US',
  'mia04': 'US',
  'mia03': 'US',
  'mia02': 'US',
  'mia01': 'US',
  'mad01': 'ES',
  'los01': 'NG',
  'lju01': 'SI',
  'lhr01': 'GB',
  'lga07': 'US',
  'lga06': 'US',
  'lga05': 'US',
  'lga04': 'US',
  'lga03': 'US',
  'lga02': 'US',
  'lga01': 'US',
  'lca01': 'CY',
  'lba01': 'GB',
  'lax05': 'US',
  'lax04': 'US',
  'lax03': 'US',
  'lax02': 'US',
  'lax01': 'US',
  'jnb01': 'ZA',
  'iad05': 'US',
  'iad04': 'US',
  'iad03': 'US',
  'iad02': 'US',
  'iad01': 'US',
  'hnd01': 'JP',
  'ham01': 'DE',
  'dub01': 'IE',
  'dfw05': 'US',
  'dfw04': 'US',
  'dfw03': 'US',
  'dfw02': 'US',
  'dfw01': 'US',
  'den04': 'US',
  'den03': 'US',
  'den02': 'US',
  'den01': 'US',
  'bog01': 'CO',
  'bkk01': 'TH',
  'beg01': 'RS',
  'atl05': 'US',
  'atl04': 'US',
  'atl03': 'US',
  'atl02': 'US',
  'atl01': 'US',
  'ath03': 'GR',
  'ath02': 'GR',
  'ath01': 'GR',
  'arn01': 'SE',
  'ams02': 'NL',
  'ams01': 'NL',
  'akl01': 'NZ',
  'acc02': 'GH',
  'acc01': 'GH'
}

const mlabServerToCountry = (serverAddress) => {
  return MLAB_LOC_TO_COUNTRY[serverAddress.split('.')[3]]
}

const mlabServerToName = (serverAddress) => {
  return serverAddress.split('.').slice(2, 4).join('.')
}

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

    return (
      <div>
        <div className='row'>
          <div className='col-md-6 result-item'>
            <span className='result-item-name'>Download <i className='fa fa-arrow-circle-o-down' /></span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.download / 1000).toFixed(2)}</span>
            <span className='result-item-unit'>MBps</span>
          </div>
          <div className='col-md-6 result-item'>
            <span className='result-item-name'>Upload <i className='fa fa-arrow-circle-o-up' /></span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.upload / 1000).toFixed(2)}</span>
            <span className='result-item-unit'>MBps</span>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6 result-item'>
            <span className='result-item-name'>Ping <i className='fa fa-exchange' /></span>
            <span className='result-item-value-big'>{(measurement.test_keys.simple.ping).toFixed(1)}</span>
            <span className='result-item-unit'>ms</span>
          </div>
          <div className='col-md-6 result-item'>
            <span className='result-item-name'>Server <i className='fa fa-server' /></span>
            <span className='result-item-value-big'>{mlabServerToCountry(measurement.test_keys.server_address)}</span>
            <span className='result-item-unit'>{mlabServerToName(measurement.test_keys.server_address)}</span>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6'>
            <button className='btn btn-secondary' onClick={() => this.toggledAdvanced()}>
              {this.state.advancedEnabled ? 'Less' : 'More'}
            </button>
          </div>
        </div>
        {this.state.advancedEnabled &&
        <div>

          <div className='row'>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>Packet Loss</span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.packet_loss * 100).toFixed(3)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>Out of order</span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.out_of_order * 100).toFixed(1)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>Average Ping</span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.avg_rtt).toFixed(0)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>Max Ping</span>
              <span className='result-item-value-big'>
                {(measurement.test_keys.advanced.max_rtt).toFixed(0)}
              </span>
              <span className='result-item-unit'>%</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>MSS</span>
              <span className='result-item-value-big'>
                {measurement.test_keys.advanced.mss}
              </span>
            </div>
            <div className='col-md-6 result-item'>
              <span className='result-item-name'>Timeouts</span>
              <span className='result-item-value-big'>
                {measurement.test_keys.advanced.timeouts}
              </span>
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
