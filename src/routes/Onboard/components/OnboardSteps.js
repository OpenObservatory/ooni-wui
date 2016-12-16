import React from 'react';

import Welcome from './Welcome';
import UnderstandTheLaws from './UnderstandTheLaws';
import SetupSharing from './SetupSharing';
import SetupYourTests from './SetupYourTests';
import Quiz from './Quiz';

import StepIndicator from './StepIndicator';
import './OnboardSteps.scss';

const OnboardSteps = ({
  currentStep, lastStep, gotoStep, onNextClick, onSkipClick,
  handleSettingsChange, settings,
  handleDecksChange, decks,
  handleDeckInfo,
  handleAnswerQuiz, handleCloseQuiz, handleAnswerChange,
  quizAnswers,
  quizCorrect, quizOpen,
  handleFinalize
}) => {
  return (
    <div className="container">
      <div className="onboard__viewport">
        {currentStep == 0
         && <Welcome onNextClick={onNextClick} onSkipClick={onSkipClick}/>
        }
        {currentStep == 1
         && <UnderstandTheLaws onNextClick={onNextClick}/>
        }
        {currentStep == 2
         && <SetupSharing
              handleSettingsChange={handleSettingsChange}
              settings={settings}
              onNextClick={onNextClick}/>
        }
        {currentStep == 3
         && <SetupYourTests
              handleDeckInfo={handleDeckInfo}
              handleDecksChange={handleDecksChange}
              decks={decks}
              onNextClick={handleFinalize}/>
        }
        <Quiz
          quizAnswers={quizAnswers}
          handleAnswerQuiz={handleAnswerQuiz}
          handleCloseQuiz={handleCloseQuiz}
          handleAnswerChange={handleAnswerChange}
          quizOpen={quizOpen}
          quizCorrect={quizCorrect}
          onNextClick={onNextClick}
        />

        {currentStep > 0
         && <StepIndicator gotoStep={gotoStep} currentStep={currentStep} lastStep={lastStep}/>
        }
      </div>
    </div>
  )
};

OnboardSteps.propTypes = {
  currentStep: React.PropTypes.number,
  currentStatus: React.PropTypes.object,
  lastStep: React.PropTypes.number,
  onNextClick: React.PropTypes.func.isRequired,
  onSkipClick: React.PropTypes.func.isRequired,
  handleSettingsChange: React.PropTypes.func.isRequired,
  handleFinalize: React.PropTypes.func.isRequired,
  settings: React.PropTypes.object.isRequired,
  gotoStep: React.PropTypes.func.isRequired,
  handleDecksChange: React.PropTypes.func.isRequired,
  handleDeckInfo: React.PropTypes.func.isRequired,
  decks: React.PropTypes.array.isRequired,
  quizAnswers: React.PropTypes.object.isRequired,
  handleAnswerQuiz: React.PropTypes.func.isRequired,
  handleCloseQuiz: React.PropTypes.func.isRequired,
  handleAnswerChange: React.PropTypes.func.isRequired,
  quizOpen: React.PropTypes.bool.isRequired,
  quizCorrect: React.PropTypes.bool
};

export default OnboardSteps;
