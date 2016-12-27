import React from 'react'
import Toggle from 'react-toggle'

const SharingOptions = ({
  onSettingsChange,
  settings
}) => {
  return (
    <div className="row text-xs-center">

      <div className="five-cols">
        <h6>How should we upload your results?</h6>
        <i className="medium-icon fa fa-upload"/>
        <div className="row">
          <select onChange={onSettingsChange('uploadMethod')}>
            <option value="onion">Tor Hidden Service</option>
            <option value="https">HTTPS</option>
            <option value="cloudfront">Cloudfront</option>
          </select>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your network information?</h6>
        <i className="medium-icon fa fa-server"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeNetwork}
            onChange={onSettingsChange('includeNetwork')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your country name?</h6>
        <i className="medium-icon fa fa-globe"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeCountry}
            onChange={onSettingsChange('includeCountry')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we share your results publicly?</h6>
        <i className="medium-icon fa fa-share-square-o"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.shareResults}
            onChange={onSettingsChange('shareResults')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your IP with the results?</h6>
        <i className="medium-icon fa fa-cube"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeIP}
            onChange={onSettingsChange('includeIP')}/>
        </div>
      </div>

    </div>
  )
}

SharingOptions.PropTypes = {
  onSettingsChange: React.PropTypes.func,
  settings: React.PropTypes.object
}

export default SharingOptions
