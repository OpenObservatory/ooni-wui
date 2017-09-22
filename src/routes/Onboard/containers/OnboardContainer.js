import { connect } from 'react-redux'
import { updateIntl } from 'react-intl-redux'

import OnboardSteps from '../components/OnboardSteps'
import {
  skipToEnd,
  gotoStep,
  nextStep,
  settingsChanged,
  deckToggled,
  quizAnswered,
  quizChanged,
  quizClosed,
  finalize,
  lastStep
} from '../../../actions/onboard'

import { fetchStatus } from '../../../actions/status'

import { history } from '../../../store/location'
import { messages } from '../../../store/locale'

const mapStoreToProps = (state) => {
  return ({
    currentStep: state.onboard.currentStep,
    lastStep: lastStep,
    settings: state.onboard.settings,
    decks: state.onboard.decks,
    quizAnswers: state.onboard.quizAnswers,
    quizOpen: state.onboard.quizOpen,
    quizCorrect: state.onboard.quizCorrect,
    selectedLocale: state.intl.locale,
    initializing: state.onboard.initializing
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLocaleChange: (locale) => {
      dispatch(updateIntl({
        locale: locale,
        messages: messages[locale]
      }))
    },
    onNextClick: () => {
      dispatch(nextStep())
    },
    onSkipClick: () => {
      dispatch(skipToEnd())
    },
    gotoStep: (number) => {
      return () => {
        dispatch(gotoStep(number))
      }
    },
    onSettingsChange: (key) => {
      return (event) => {
        let value
        if (key === 'uploadMethod') {
          value = event.target.value
        } else {
          value = false
          if (event.target.checked) {
            value = true
          }
        }
        dispatch(settingsChanged(key, value))
      }
    },
    onDeckToggled: (deckId) => {
      dispatch(deckToggled(deckId))
    },
    onCloseQuiz: () => {
      dispatch(quizClosed())
    },
    onAnswerQuiz: () => {
      dispatch(quizAnswered())
    },
    onAnswerChange: (key) => {
      return (event) => {
        const value = (event.target.value === 'true')
        dispatch(quizChanged(key, value))
      }
    },
    onFinalize: () => {
      dispatch(finalize()).then(() => {
        dispatch(fetchStatus()).then(() => {
          history.push('/')
        })
      })
    }
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(OnboardSteps)
