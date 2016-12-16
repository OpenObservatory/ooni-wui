import React from 'react';
import Modal from 'react-modal';
import './Quiz.scss';

const Quiz = ({
  quizAnswers,
  handleAnswerQuiz,
  quizOpen,
  handleAnswerChange,
  quizCorrect,
  handleCloseQuiz,
  onNextClick
}) => {
  return (
    <div>
      <Modal
        className="Modal__Bootstrap modal-dialog"
        onRequestClose={handleAnswerQuiz}
        contentLabel="Pop Quiz"
        isOpen={quizOpen}>
        <div className="modal-content">
          <div className="modal-header text-xs-center">
            <button type="button" className="close" onClick={handleCloseQuiz}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h1 className="modal-title">Pop quiz</h1>
          </div>
          <div className="modal-body">
            {(quizCorrect == null)
            && <div className="questions">
                <p>Question 1: What is the foo bar?</p>
                <div className="radio">
                  <label>
                    <input type="radio" value={true}
                           onChange={handleAnswerChange('question1')}
                           checked={quizAnswers.question1 === true} />
                    True
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           onChange={handleAnswerChange('question1')}
                           value={false} checked={quizAnswers.question1 === false} />
                    False
                  </label>
                </div>

                <p>Question 2: What is the foo bar?</p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           onChange={handleAnswerChange('question2')}
                           value={true} checked={quizAnswers.question2 === true} />
                    True
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           onChange={handleAnswerChange('question2')}
                           value={false} checked={quizAnswers.question2 === false} />
                    False
                  </label>
                </div>
            </div>
            }
            {(quizCorrect == true)
            && <div className="success text-xs-center">
              <i className="medium-icon fa fa-thumbs-o-up" />
              <h2>Good job!</h2>
              <p>You have answered the quiz correctly!</p>
            </div>
            }
            {(quizCorrect == false)
            && <div className="failure text-xs-center">
              <i className="medium-icon fa fa-book" />
              <p>A little bit more reading is required for you to proceed.</p>
            </div>
            }
          </div>
          <div className="modal-footer text-xs-center">
            {(quizCorrect == null)
            && <button className="btn btn-primary" onClick={handleAnswerQuiz}>
              How did I do?
            </button>
            }
            {(quizCorrect == true)
            && <button className="btn btn-primary" onClick={onNextClick}>
              Let's setup sharing!
            </button>
            }
            {(quizCorrect == false)
            && <button className="btn btn-primary" onClick={handleCloseQuiz}>
              Read the risks again
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
  handleAnswerQuiz: React.PropTypes.func.isRequired,
  handleAnswerChange: React.PropTypes.func.isRequired,
  handleCloseQuiz: React.PropTypes.func.isRequired,
  onNextClick: React.PropTypes.func.isRequired
};

export default Quiz;
