import React from 'react';
import './StepIndicator.scss';

const StepIndicator = ({currentStep, lastStep, gotoStep}) => {
  return (
    <div className="row">
      <div className="steps-container col-md-4 offset-md-4">
        {
          Array.apply(null, Array(lastStep)).map((_, idx) => {
            let className = "rounded-circle status-circle";
            if ((idx + 1) == currentStep) {
              className += " status-circle-active";
            }
            if (idx >= currentStep) {
              className += " status-circle-disabled";
            }
            return <div key={idx}
                        onClick={gotoStep(idx + 1)}
                        className={className}></div>
          })
        }
      </div>
    </div>
  )
};

StepIndicator.propTypes = {
  currentStep: React.PropTypes.number.isRequired,
  lastStep: React.PropTypes.number.isRequired,
  gotoStep: React.PropTypes.func.isRequired
};

export default StepIndicator;
