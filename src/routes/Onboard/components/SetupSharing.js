import React from 'react';
import Toggle from 'react-toggle';

const SetupSharing = ({onNextClick, handleSettingsChange, settings}) => {
  return (
  <div>

    <div className="row text-xs-center">
      <h1>Setup sharing</h1>
      <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
      </p>
    </div>

    <div className="row text-xs-center">

      <div className="five-cols">
        <h6>How should we upload your results?</h6>
        <i className="medium-icon fa fa-upload"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeNetwork}
            onChange={handleSettingsChange('includeNetwork')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your network information?</h6>
        <i className="medium-icon fa fa-server"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeNetwork}
            onChange={handleSettingsChange('includeNetwork')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your country name?</h6>
        <i className="medium-icon fa fa-globe"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeCountry}
            onChange={handleSettingsChange('includeCountry')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we share your results publicly?</h6>
        <i className="medium-icon fa fa-share-square-o"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.shareResults}
            onChange={handleSettingsChange('shareResults')}/>
        </div>
      </div>

      <div className="five-cols">
        <h6>Can we include your IP with the results?</h6>
        <i className="medium-icon fa fa-cube"/>
        <div className="row">
          <Toggle
            defaultChecked={settings.includeIP}
            onChange={handleSettingsChange('includeIP')}/>
        </div>
      </div>

    </div>

    <div className="row text-xs-center">
      <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
      </p>
    </div>

    <div className="row">
      <button onClick={onNextClick} className="btn btn-primary mx-auto"
              style={{'display': 'block'}}>
        I'm all "set" - let's run a test!
      </button>
    </div>

  </div>
  )
};

SetupSharing.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  handleSettingsChange: React.PropTypes.func,
  settings: React.PropTypes.object
};

export default SetupSharing;
