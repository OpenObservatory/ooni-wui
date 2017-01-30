import React from 'react'

import './Welcome.scss'
import OONISparkles from '../assets/OONI-sparkles.svg'

const Welcome = ({ onNextClick, onSkipClick }) => {
  return (
    <div className='container'>
      <div className='row text-xs-center welcome'>
        <h1>Welcome to ooniprobe!</h1>
        <img src={OONISparkles} className='welcome-logo' />
        <p>
          Ooniprobe is a free and open source platform that enables you to examine internet censorship in your network!
          You can examine how websites are blocked, and whether censorship and/or surveillance systems
          are present in your network. You can also measure the speed and performance of your network.
          Data collected by ooniprobe can serve as evidence of censorship events.
          Since ooniprobe is an investigatory tool, using it may pose some risks.</p>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
            Learn more
        </button>
      </div>

      <div className='row low-viz'>
        <a onClick={onSkipClick} className='mx-auto text-xs-center skip-to-end'>
          I already understand the risks, take me to my dashboard.
        </a>
      </div>

    </div>
  )
}

Welcome.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  onSkipClick: React.PropTypes.func.isRequired
}

export default Welcome
