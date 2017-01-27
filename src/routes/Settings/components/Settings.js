import React from 'react'

import SharingOptions from '../../../components/Settings/SharingOptions'

const Settings = ({ settings }) => {
  let onSettingsChange = (val) => (newVal) => {
    console.log('', val, 'changed', newVal)
  }
  if (!settings) {
    // XXX implement me
    settings = {}
  }

  return (
    <div>
      <div className='row text-xs-center'>
        <h1>Settings</h1>
      </div>
      <SharingOptions onSettingsChange={onSettingsChange} settings={settings} />
    </div>
  )
}

Settings.propTypes = {
  settings: React.PropTypes.object
}

export default Settings
