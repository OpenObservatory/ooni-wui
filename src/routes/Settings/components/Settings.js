import React from 'react'

import SharingOptions from '../../../components/Settings/SharingOptions'

const Settings = ({}) => {
  let onSettingsChange = (val) => (newVal) => {
    console.log("", val, "changed", newVal)
  }
  let settings = {
  }

  return (
    <div>
      <div className="row text-xs-center">
        <h1>Settings</h1>
      </div>
      <SharingOptions onSettingsChange={onSettingsChange} settings={settings}/>
    </div>
  )
}


Settings.propTypes = {
}

export default Settings
