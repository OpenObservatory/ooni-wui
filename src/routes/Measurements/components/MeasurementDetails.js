import React from 'react'
import JSONTree from 'react-json-tree'

import WebConnectivityDetails from './nettests/WebConnectivity'
import FacebookMessengerDetails from './nettests/FacebookMessenger'
import HttpHeaderFieldManipulationDetails from './nettests/HttpHeaderFieldManipulation'
import HttpInvalidRequestLineDetails from './nettests/HttpInvalidRequestLine'
import WhatsappDetails from './nettests/Whatsapp'

import './MeasurementDetails.scss'

const jsonTreeTheme = {
  base00: '#ffffff',
  base01: '#ffffff',
  base02: '#ffffff',
  base03: '#777777',
  base04: '#ffffff',
  base05: '#ffffff',
  base06: '#ffffff',
  base07: '#ffffff',
  base08: '#777777',
  base09: '#0588CB',
  base0A: '#0588CB',
  base0B: '#4FD156',
  base0C: '#0588CB',
  base0D: '#0588CB',
  base0E: '#0588CB',
  base0F: '#0588CB'
}

const NETTEST_HANDLERS = {
  'web_connectivity': (measurement) => (<WebConnectivityDetails measurement={measurement} />),
  'facebook_messenger': (measurement) => (<FacebookMessengerDetails measurement={measurement} />),
  'http_header_field_manipulation': (measurement) => (<HttpHeaderFieldManipulationDetails measurement={measurement} />),
  'http_invalid_request_line': (measurement) => (<HttpInvalidRequestLineDetails measurement={measurement} />),
  'whatsapp': (measurement) => (<WhatsappDetails measurement={measurement} />)
}

const NETTEST_PRETTY_NAMES = {
  'web_connectivity': 'Web Connectivity',
  'facebook_messenger': 'Facebook Messenger',
  'http_header_field_manipulation': 'HTTP Header Field Manipulation',
  'http_invalid_request_line': 'HTTP Invalid Request Line',
  'whatsapp': 'WhatsApp',
  'ndt': 'NDT Speed Test'
}

export const getNettestDetails = (measurement) => {
  const handler = NETTEST_HANDLERS[measurement.test_name]

  return handler ? handler(measurement) : <div />
}

export const getPrettyNettestName = (measurement) => {
  const name = NETTEST_PRETTY_NAMES[measurement.test_name]

  return name || measurement.test_name
}

export const MeasurementDetails = ({
  measurement
}) => {
  return (
    <div>
      <div>

        <h1 className='text-xs-center'>{getPrettyNettestName(measurement)}</h1>

        <div className='row'>
          <div className='col-md-4 result-item'>
            <span className='result-item-name'>Runtime</span>
            <span className='result-item-value'>{measurement.test_runtime.toFixed(2)}</span>
            <span className='result-item-unit'>s</span>
          </div>

          <div className='col-md-4 result-item'>
            <span className='result-item-name'>Network</span>
            <span className='result-item-value'>{measurement.probe_asn}</span>
          </div>

          <div className='col-md-4 result-item'>
            <span className='result-item-name'>Country</span>
            <span className='result-item-value'>{measurement.probe_cc}</span>
          </div>
        </div>

      </div>

      {measurement.input !== '' &&
      <div className='text-xs-center measurement-input'>
        <span>{measurement.input}</span>
      </div>
      }

      <div className='nettest-details'>
        {getNettestDetails(measurement)}
      </div>

      <h2><i className='ooni icon-measurement' /> Technical measurement data</h2>
      <JSONTree
        theme={jsonTreeTheme}
        hideRoot
        invertTheme={false}
        shouldExpandNode={(keyName, data, level) => {
          const collapsedKeys = ['request', 'response']
          return (collapsedKeys.indexOf(keyName[0]) === -1)
        }}
        data={measurement} />
    </div>
  )
}

MeasurementDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default MeasurementDetails
