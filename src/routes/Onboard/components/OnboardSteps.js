import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Welcome from './Welcome'
import UnderstandTheLaws from './UnderstandTheLaws'
import SetupSharing from './SetupSharing'
import SetupYourTests from './SetupYourTests'
import Quiz from './Quiz'

import StepIndicator from './StepIndicator'
import './OnboardSteps.scss'

const OnboardSteps = ({
  currentStep, lastStep, gotoStep, onNextClick, onSkipClick,
  onSettingsChange, settings,
  onDeckToggled, decks,
  onAnswerQuiz, onCloseQuiz, onAnswerChange,
  quizAnswers,
  quizCorrect, quizOpen,
  onFinalize
}) => {
  return (
    <div>
      <div className='onboard__viewport'>
        <div className='onboard__steps'>
          <ReactCSSTransitionGroup
            component='div'
            transitionName='onboard__transition'
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
          >
            {currentStep === 0 &&
              <div className='onboard__step'>
                <Welcome onNextClick={onNextClick} onSkipClick={onSkipClick} />
              </div>
            }
            {currentStep === 1 &&
            <div className='onboard__step'>
              <UnderstandTheLaws onNextClick={onNextClick} />
            </div>
            }
            {currentStep === 2 &&
            <div className='onboard__step'>
              <SetupSharing
                settings={settings}
                onSettingsChange={onSettingsChange}
                onNextClick={onNextClick} />
            </div>
            }
            {currentStep === 3 &&
            <div className='onboard__step'>
              <SetupYourTests
                onDeckToggled={onDeckToggled}
                decks={decks}
                onNextClick={onFinalize} />
            </div>
            }
          </ReactCSSTransitionGroup>
        </div>
        <div className='container'>
          {currentStep > 0 && <StepIndicator gotoStep={gotoStep} currentStep={currentStep} lastStep={lastStep} />}
        </div>

        <Quiz
          quizAnswers={quizAnswers}
          quizOpen={quizOpen}
          quizCorrect={quizCorrect}

          onAnswerQuiz={onAnswerQuiz}
          onCloseQuiz={onCloseQuiz}
          onAnswerChange={onAnswerChange}

          onNextClick={onNextClick}
        />

      </div>
    </div>
  )
}

OnboardSteps.propTypes = {
  currentStep: React.PropTypes.number,
  currentStatus: React.PropTypes.object,
  lastStep: React.PropTypes.number,
  onNextClick: React.PropTypes.func.isRequired,
  onSkipClick: React.PropTypes.func.isRequired,
  onSettingsChange: React.PropTypes.func.isRequired,
  onFinalize: React.PropTypes.func.isRequired,
  settings: React.PropTypes.object.isRequired,
  gotoStep: React.PropTypes.func.isRequired,
  onDeckToggled: React.PropTypes.func.isRequired,
  decks: React.PropTypes.array.isRequired,
  quizAnswers: React.PropTypes.object.isRequired,
  onAnswerQuiz: React.PropTypes.func.isRequired,
  onCloseQuiz: React.PropTypes.func.isRequired,
  onAnswerChange: React.PropTypes.func.isRequired,
  quizOpen: React.PropTypes.bool.isRequired,
  quizCorrect: React.PropTypes.bool
}

export default OnboardSteps
