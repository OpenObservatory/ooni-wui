import React from 'react';


const UnderstandTheLaws = ({currentStep, onNextClick, onSkipClick}) => {
  return (
    <div>
      <div className="row text-xs-center">
        <h1>Understand the laws</h1>
        <p>
          Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
        </p>
        <i className="large-icon fa fa-gavel"/>
        <p>
          Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
        </p>
      </div>

      <div className="row">
        <button onClick={onNextClick} className="btn btn-primary mx-auto"
                style={{'display': 'block'}}>
          I understand the risk.
        </button>
      </div>

    </div>
  )
};

UnderstandTheLaws.propTypes = {
  currentStep: React.PropTypes.number,
  onNextClick: React.PropTypes.func.isRequired
};

export default UnderstandTheLaws;
