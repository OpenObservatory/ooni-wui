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
          Ooniprobe is free and open source software that enables you to examine internet censorship in your network!

          By running this app, you can examine whether and how websites are blocked, and whether censorship and/or surveillance systems are present in your network.

          You can also run this app to measure the speed and performance of your network.

          The data that you can collect through this app can serve as evidence of censorship events.

          Keep in mind though that ooniprobe is an investigatory tool and as such, may pose some risks.
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
