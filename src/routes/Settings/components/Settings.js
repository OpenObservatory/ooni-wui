import React from 'react'
import { FormattedMessage } from 'react-intl'

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
        <h1>
          <FormattedMessage
            id='settings.title'
            defaultMessage='Settings'
          />
        </h1>
      </div>
      <SharingOptions onSettingsChange={onSettingsChange} settings={settings} />
    </div>
  )
}

Settings.propTypes = {
  settings: React.PropTypes.object
}

export default Settings
