import React from 'react'

export const HttpHeaderFieldManipulationDetails = ({ measurement }) => {
  let anomaly = false
  const tampering = measurement.test_keys.tampering
  Object.keys(tampering).forEach((key) => {
    if (tampering[key] === true) {
      anomaly = true
    }
  })
  return (
    <div>
      {anomaly === true &&
      <div>
        <h2 className='result-danger'><i className='fa fa-times-circle-o' />
        <FormattedMessage
          id='nettests.httpHeaderFieldManipulation.networkTampering'
          defaultMessage='Evidence of possible network tampering'
          />
         </h2>
        <p>
        <FormattedMessage
          id='nettests.httpHeaderFieldManipulation.trafficManipulation'
          defaultMessage='When contacting our control servers we noticed that network traffic was manipulated. This means that there could be a {middleBox} which could be responsible for censorship and/or traffic manipulation.'
            values={{
              middleBox: <strong>
                <FormattedMessage
                  id='nettests.httpHeaderFieldManipulation.middleBox'
                  defaultMessage='“middle box”' />
                </strong>
            }}
        />
        </p>
      </div>
      }

      {anomaly === false &&
      <div>
        <h2 className='result-success'><i className='fa fa-check-circle-o' />
        <FormattedMessage
          id='nettests.httpHeaderFieldManipulation.everythingOk'
          defaultMessage='Everything is OK'
        />
         </h2>
        <p>
        <FormattedMessage
          id='nettests.httpHeaderFieldManipulation.noAnomaly'
          defaultMessage='No network anomaly was detected when communicating to our control servers.'
        />
        </p>
      </div>
      }
    </div>
  )
}

HttpHeaderFieldManipulationDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default HttpHeaderFieldManipulationDetails
