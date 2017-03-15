import React from 'react'
import { FormattedMessage } from 'react-intl'

const UnderstandTheLaws = ({ currentStep, onNextClick }) => {
  return (
    <div className='container'>
      <div className='row text-xs-center'>
        <div className='col-xs-12'>
          <h1>
            <FormattedMessage
              id='onboard.understandTheLaws.title'
              defaultMessage='Potential risks'
            />
          </h1>
          <p>
            <FormattedMessage
              id='onboard.understandTheLaws.text1'
              defaultMessage={'Anyone monitoring your internet activity (e.g. ISP, government, employer) can know that you are running ooniprobe (even though OONI tries to make this hard).\n\nWhen testing websites for censorship, you will connect to and download data from provocative or objectionable sites (e.g. pornography) that might be illegal in your country.\n\nOONI’s HTTP invalid request line test might trigger the suspicion of your ISP and could be viewed as a form of “hacking”.'}
            />
          </p>

          <i className='large-icon fa fa-bomb' style={{ marginTop: '1rem', marginBottom: '2rem' }} />

          <p>
            <FormattedMessage
              id='onboard.understandTheLaws.text2'
              defaultMessage={'Unless you configure your settings otherwise, all data collected from your tests will by default be published by OONI and might include some personally- identifiable information (though OONI tries to prevent this from happening). The use of ooniprobe could be viewed as a form of espionage, regardless of the laws in your country. To our knowledge, no ooniprobe user has ever faced consequences from the use of our platform. However, many countries have a lengthy history of targeting and abusing digital rights activists, which could leave ooniprobe users subject to severe civil, criminal, or extra-judicial penalties. {learnMoreHere}. We encourage you to consult with a lawyer prior to installing and running ooniprobe.'}
              values={{
                learnMoreHere: <a href='https://ooni.torproject.org/about/risks' target='_blank'>
                  <FormattedMessage
                    id='onboard.understandTheLaws.text2.learnMoreHere'
                    defaultMessage='Learn more here'
                  />
                </a>
              }}
            />
          </p>
        </div>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
          <FormattedMessage
            id='onboard.understandTheLaws.iUnderstand'
            defaultMessage='I understand the risk.'
          />
        </button>
      </div>

    </div>
  )
}

UnderstandTheLaws.propTypes = {
  currentStep: React.PropTypes.number,
  onNextClick: React.PropTypes.func.isRequired
}

export default UnderstandTheLaws
