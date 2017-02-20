import React from 'react'
import { FormattedMessage } from 'react-intl'
import './Welcome.scss'
import OONISparkles from '../assets/OONI-sparkles.svg'

const Welcome = ({ onNextClick, onSkipClick }) => {
  return (
    <div className='container'>
      <div className='row text-xs-center welcome'>
        <div className='col-xs-12'>
          <h1>
            <FormattedMessage
              id='onboard.welcome.title'
              defaultMessage='Welcome to ooniprobe!'
            />
          </h1>
          <img src={OONISparkles} className='welcome-logo' />
          <p>
            <FormattedMessage
              id='onboard.welcome.text1'
              defaultMessage='Ooniprobe is a free and open source platform that enables you to examine internet censorship in your network!\nYou can examine how websites are blocked, and whether censorship and/or surveillance systems are present in your network. You can also measure the speed and performance of your network.\nData collected by ooniprobe can serve as evidence of censorship events.\nSince ooniprobe is an investigatory tool, using it may pose some risks.'
            />
          </p>
        </div>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
            <FormattedMessage
              id='onboard.welcome.learnMore'
              defaultMessage='Learn more'
            />
        </button>
      </div>

      <div className='row low-viz'>
        <a onClick={onSkipClick} className='mx-auto text-xs-center skip-to-end'>
          <FormattedMessage
            id='onboard.welcome.alreadyUnderstand'
            defaultMessage='I already understand the risks, take me to my dashboard.'
          />
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
