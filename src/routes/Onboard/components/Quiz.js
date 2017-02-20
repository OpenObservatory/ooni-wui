import React from 'react'
import { FormattedMessage } from 'react-intl'

import Modal from 'react-modal'
import './Quiz.scss'

const Quiz = ({
  quizAnswers,
  onAnswerQuiz,
  quizOpen,
  onAnswerChange,
  quizCorrect,
  onCloseQuiz,
  onNextClick
}) => {
  return (
    <div>
      <Modal
        className='Modal__Bootstrap modal-dialog'
        onRequestClose={onAnswerQuiz}
        contentLabel='Pop Quiz'
        isOpen={quizOpen}>
        <div className='modal-content'>
          <div className='modal-header text-xs-center'>
            <button type='button' className='close' onClick={onCloseQuiz}>
              <span aria-hidden='true'>&times;</span>
              <span className='sr-only'>Close</span>
            </button>
            <h1 className='modal-title'>Pop quiz</h1>
          </div>
          <div className='modal-body'>
            {(quizCorrect == null) &&
            <div className='questions'>
              <p>
                <FormattedMessage
                  id='onboard.quiz.question1'
                  defaultMessage='Question 1: Anyone monitoring my internet activity (e.g. ISP, government or employer) might be able to see that I am running ooniprobe, even though OONI takes precautions to make this hard?'
                />
              </p>
              <div className='radio'>
                <label>
                  <input type='radio' value
                    onChange={onAnswerChange('question1')}
                    checked={quizAnswers.question1 === true} />
                      <FormattedMessage
                        id='onboard.quiz.true'
                        defaultMessage='True'
                      />
                  </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio'
                    onChange={onAnswerChange('question1')}
                    value={false} checked={quizAnswers.question1 === false} />
                    <FormattedMessage
                      id='onboard.quiz.false'
                      defaultMessage='False'
                    />
                  </label>
              </div>

              <p>
                <FormattedMessage
                  id='onboard.quiz.question2'
                  defaultMessage='Question 2: My measurements will by default get published by OONI and might include personally-identifiable information?'
                />
              </p>
              <div className='radio'>
                <label>
                  <input type='radio'
                    onChange={onAnswerChange('question2')}
                    value
                    checked={quizAnswers.question2 === true} />
                    <FormattedMessage
                      id='onboard.quiz.true'
                      defaultMessage='True'
                    />
                  </label>
              </div>
              <div className='radio'>
                <label>
                  <input type='radio'
                    onChange={onAnswerChange('question2')}
                    value={false} checked={quizAnswers.question2 === false} />
                    <FormattedMessage
                      id='onboard.quiz.false'
                      defaultMessage='True'
                    />
                  </label>
              </div>
            </div>
            }
            {(quizCorrect === true) &&
            <div className='success text-xs-center'>
              <i className='medium-icon fa fa-thumbs-o-up' />
              <h2>
              <FormattedMessage
                id='onboard.quiz.goodJob'
                defaultMessage='Good job!'
              />
              </h2>
            </div>
            }
            {(quizCorrect === false) &&
            <div className='failure text-xs-center'>
              <i className='medium-icon fa fa-book' />
              <h2>
                <FormattedMessage
                  id='onboard.quiz.wrongAnswer'
                  defaultMessage='Wrong answer.'
                />
              </h2>
            </div>
            }
          </div>
          <div className='modal-footer text-xs-center'>
            {(quizCorrect == null) &&
            <button className='btn btn-primary' onClick={onAnswerQuiz}>
              <FormattedMessage
                id='onboard.quiz.howDidIDoButton'
                defaultMessage='How did I do?'
              />
            </button>
            }
            {(quizCorrect === true) &&
            <button className='btn btn-primary' onClick={onNextClick}>
              <FormattedMessage
                id='onboard.quiz.setupSharing'
                defaultMessage='Let\'s setup sharing'
              />
            </button>
            }
            {(quizCorrect === false) &&
            <button className='btn btn-primary' onClick={onCloseQuiz}>
              <FormattedMessage
                id='onboard.quiz.setupSharing'
                defaultMessage='Read the risks again'
              />
            </button>
            }
          </div>
        </div>
      </Modal>
    </div>
  )
}

Quiz.propTypes = {
  quizOpen: React.PropTypes.bool.isRequired,
  quizCorrect: React.PropTypes.bool,
  quizAnswers: React.PropTypes.object.isRequired,
  onAnswerQuiz: React.PropTypes.func.isRequired,
  onAnswerChange: React.PropTypes.func.isRequired,
  onCloseQuiz: React.PropTypes.func.isRequired,
  onNextClick: React.PropTypes.func.isRequired
}

export default Quiz
