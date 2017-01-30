import React from 'react'

import SharingOptions from '../../../components/Settings/SharingOptions'

const SetupSharing = ({ onNextClick, onSettingsChange, settings }) => {
  return (
    <div className='container'>

      <div className='row text-justify' style={{ marginBottom: '2rem' }}>
        <div className='row text-xs-center'>
          <h1>Setup sharing</h1>
        </div>
        <p>
          All measurements are by default sent to OONI's measurement collector and are automatically
          published on OONI Explorer and OONI's measurement API.
        </p>
      </div>

      <SharingOptions onSettingsChange={onSettingsChange} settings={settings} />

      <div className='row text-justify' style={{ marginTop: '3rem' }}>
        <p>Published data will include your approximate location, the time of the test, and
          the network (ASN) you are connecting from. Other identifying information, such as your
          IP address, is not deliberately collected, but might be included in HTTP headers or other metadata.
        </p>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
        I'm all set!
      </button>
      </div>

    </div>
  )
}

SetupSharing.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  onSettingsChange: React.PropTypes.func,
  settings: React.PropTypes.object
}

export default SetupSharing
