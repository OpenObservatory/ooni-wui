import React from 'react';

import OONILogoImage from '../../Dashboard/assets/ooni-logo.svg'

const Welcome = ({onNextClick, onSkipClick}) => {
  return (
    <div>
      <div className="row text-xs-center">
        <h1>Welcome to ooniprobe!</h1>
        <h2>OONI's software is an investigatory tool</h2>
        <img src={OONILogoImage} className="ooni-logo"/>
        <p>
          Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
        </p>
      </div>

      <div className="row">
        <button onClick={onNextClick} className="btn btn-primary mx-auto"
                style={{'display': 'block'}}>
            Get started!
        </button>
      </div>

      <div className="row">
        <a onClick={onSkipClick} className="mx-auto text-xs-center" style={{'display': 'block'}}>
          I understand the risks just get me started
        </a>
      </div>

    </div>
  )
};

Welcome.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  onSkipClick: React.PropTypes.func.isRequired
};

export default Welcome;
