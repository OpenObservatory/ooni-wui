import React from 'react'

import SharingOptions from '../../../components/Settings/SharingOptions'

const SetupSharing = ({ onNextClick, onSettingsChange, settings }) => {
  return (
    <div>

      <div className='row text-xs-center'>
        <h1>Setup sharing</h1>
        <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball.
          Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey.
          Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle
          tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong
          porchetta landjaeger strip steak pig bresaola.
      </p>
      </div>

      <SharingOptions onSettingsChange={onSettingsChange} settings={settings} />

      <div className='row text-xs-center'>
        <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball.
          Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey.
          Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle
          tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong
      </p>
      </div>

      <div className='row'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
        I'm all "set" - let's run a test!
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
