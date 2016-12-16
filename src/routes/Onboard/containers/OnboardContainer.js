import { connect } from 'react-redux';

import OnboardSteps from '../components/OnboardSteps';
import {
  gotoStep,
  nextStep,
  lastStep,
  settingsChanged,
  decksChanged,
  deckInfoClick,
  quizAnswered,
  quizChanged,
  quizClosed,
  finalize
} from '../modules/onboard';

import {updateStatus} from '../../../modules/status';

import {browserHistory} from 'react-router';

const mapStoreToProps = (state) => {
  return ({
    currentStep: state.onboard.currentStep,
    lastStep: lastStep,
    settings: state.onboard.settings,
    decks: state.onboard.decks,
    quizAnswers: state.onboard.quizAnswers,
    quizOpen: state.onboard.quizOpen,
    quizCorrect: state.onboard.quizCorrect,
    currentStatus: state.status.status
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNextClick: () => {
      dispatch(nextStep());
    },
    onSkipClick: () => {
      dispatch(gotoStep(lastStep));
    },
    gotoStep: (number) => {
      return () => {
        dispatch(gotoStep(number));
      };
    },
    handleSettingsChange: (key) => {
      return (event) => {
        let value = false;
        if (event.target.checked) {
          value = true
        }
        dispatch(settingsChanged(key, value))
      }
    },
    handleDeckInfo: (deck_id) => {
      return () => {
        dispatch(deckInfoClick(deck_id))
      }
    },
    handleDecksChange: (deck_id) => {
      return (event) => {
        let value = false;
        if (event.target.checked) {
          value = true
        }
        dispatch(decksChanged(deck_id, value))
      }
   },
   handleCloseQuiz: () => {
      dispatch(quizClosed());
    },
    handleAnswerQuiz: () => {
      dispatch(quizAnswered());
    },
    handleAnswerChange: (key) => {
      return (event) => {
        const value = (event.target.value == 'true') ? true : false;
        dispatch(quizChanged(key, value));
      }
    },
    handleFinalize: () => {
      dispatch(finalize()).then(() => {
        dispatch(updateStatus({...ownProps.status, initialized: true}))
        browserHistory.push('/');
      });
    }
  }
};

export default connect(mapStoreToProps, mapDispatchToProps)(OnboardSteps)
