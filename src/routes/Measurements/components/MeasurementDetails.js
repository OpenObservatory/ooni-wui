import React from 'react'
import JSONTree from 'react-json-tree'

import WebConnectivityDetails from './nettests/WebConnectivity'
import FacebookMessengerDetails from './nettests/FacebookMessenger'
import HttpHeaderFieldManipulationDetails from './nettests/HttpHeaderFieldManipulation'
import HttpInvalidRequestLineDetails from './nettests/HttpInvalidRequestLine'
import WhatsappDetails from './nettests/Whatsapp'
import NdtDetails from './nettests/Ndt'
import VanillaTorDetails from './nettests/VanillaTor'
import TcpConnectDetails from './nettests/TcpConnect'

import './MeasurementDetails.scss'

import { getPrettyNettestName } from '../../../util/nettest'

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
  'whatsapp': (measurement) => (<WhatsappDetails measurement={measurement} />),
  'ndt': (measurement) => (<NdtDetails measurement={measurement} />),
  'vanilla_tor': (measurement) => (<VanillaTorDetails measurement={measurement} />),
  'tcp_connect': (measurement) => (<TcpConnectDetails measurement={measurement} />)
}

export const getNettestDetails = (measurement) => {
  const handler = NETTEST_HANDLERS[measurement.test_name]

  return handler ? handler(measurement) : <div />
}

export const MeasurementDetails = ({
  measurement
}) => {
  return (
    <div>
      <div>

        <h1 className='text-xs-center result-nettest-name'>{getPrettyNettestName(measurement.test_name)}</h1>

        <div className='row text-xs-center'>
          <div className='result-metadata'>
              <span className='col-sm-6 col-xs-12'>
                {measurement.test_runtime.toFixed(2)}s Runtime
              </span>
              <span className='col-sm-6 col-xs-12'>
                Location: {measurement.probe_cc} ({measurement.probe_asn})
              </span>
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

      <div className='technical-data'>
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
    </div>
  )
}

MeasurementDetails.propTypes = {
  measurement: React.PropTypes.object
}

export default MeasurementDetails
