import React from 'react'
import { FormattedMessage } from 'react-intl'

export class HttpInvalidRequestLineDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = { exchangesEnabled: false }
  }

  toggleExchanges () {
    this.setState({ exchangesEnabled: !this.state.exchangesEnabled })
  }

  render () {
    const { measurement } = this.props

    const getExchangeClassName = (index) => {
      let className = 'row'
      if (measurement.test_keys.received[index] !== measurement.test_keys.sent[index]) {
        className += ' text-danger'
      }
      return className
    }

    return (
      <div>
        {measurement.test_keys.tampering === true &&
        <div>
          <h2 className='result-danger'><i className='fa fa-times-circle-o' />
            <FormattedMessage
              id='nettests.httpInvalidRequestLine.networkTampering'
              defaultMessage='Evidence of possible network tampering'
            />
          </h2>
          <p>
            <FormattedMessage
              id='nettests.httpInvalidRequestLine.trafficManipulation'
              defaultMessage='When contacting our control servers we noticed that network traffic was manipulated. This means that there could be a {middleBox} which could be responsible for censorship and/or traffic manipulation. Click on "Show exchanges" below to see what our server saw and what was sent.'
              values={{
                middleBox: <strong>
                  <FormattedMessage
                    id='nettests.httpInvalidRequestLine.trafficManipulation.middleBox'
                    defaultMessage='“middle box”' />
                </strong>
              }}
          />
          </p>
        </div>
        }
        {measurement.test_keys.tampering === false &&
        <div>
          <h2 className='result-success'><i className='fa fa-check-circle-o' />
            <FormattedMessage
              id='nettests.httpInvalidRequestLine.everythingOk'
              defaultMessage='Everything is OK'
          />
          </h2>

          <p>
            <FormattedMessage
              id='nettests.httpInvalidRequestLine.noAnomaly'
              defaultMessage='No network anomaly was detected when communicating to our control servers. Click on "Show exchanges" below to see what our server saw and what was sent.'
            />
          </p>
        </div>
        }

        {this.state.exchangesEnabled &&
        <div>
          <div className='row text-xs-center' style={{ marginTop: '20px' }}>
            <div className='col-xs-6'>
              <h3>
                <FormattedMessage
                  id='nettests.httpInvalidRequestLine.sent'
                  defaultMessage='I sent'
                />
              </h3>
            </div>
            <div className='col-xs-6'>
              <h3>
                <FormattedMessage
                  id='nettests.httpInvalidRequestLine.received'
                  defaultMessage='I received'
                />
              </h3>
            </div>
          </div>
          {measurement.test_keys.sent.map((sentData, index) => {
            return (
              <div className={getExchangeClassName(index)} key={index}>
                <div className='col-xs-6'>
                  <div className='card card-block'>
                    <p className='card-text wordwrap'>
                      {sentData}
                    </p>
                  </div>
                </div>
                <div className='col-xs-6'>
                  <div className='card card-block'>
                    <p className='card-text wordwrap'>
                      {measurement.test_keys.received[index]}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>}
        <div className='row'>
          <div className='col-xs-6'>
            <button className='btn btn-secondary' onClick={() => this.toggleExchanges()}>
              {this.state.exchangesEnabled
               ? <FormattedMessage
                 id='nettests.httpInvalidRequestLine.hide'
                 defaultMessage='Hide exchanges'
                  />
               : <FormattedMessage
                 id='nettests.httpInvalidRequestLine.show'
                 defaultMessage='Show exchanges'
                  />
              }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

HttpInvalidRequestLineDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default HttpInvalidRequestLineDetails
