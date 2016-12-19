import React from 'react'
import Modal from 'react-modal';
import './DeckRunner.scss';

export const DeckRunner = ({
  tests,
  isOpen,
  deck,
  onDeckStart,
  onTestRun,
  onTestRunClose,
  onTestStart,
  onDeckClose,
  activeTest
}) => (
  <Modal
    className="Modal__Bootstrap modal-dialog"
    onRequestClose={onDeckClose}
    contentLabel={`${deck.name} runner`}
    isOpen={isOpen}>
    <div className="modal-content">
      <div className="modal-header text-xs-center">
        <button type="button" className="close" onClick={onDeckClose}>
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Close</span>
        </button>
        <h1 className="modal-title">{deck.name}</h1>
        <i className={`medium-icon fa ${deck.icon}`}/>
      </div>
      <div className="modal-body">
        {
          deck.tests && deck.tests.map((testID) => {
            let actionClassName, onClick;
            if (activeTest.id === testID) {
              actionClassName = 'icon-btn-cancel fa fa-times';
              onClick = onTestRunClose;
            } else {
              actionClassName = 'icon-btn fa fa-play';
              onClick = () => onTestRun(testID);
            }
            return <div key={testID} className="row">
              <div className="test-runner col-md-8">
                <span className="test-name">{tests[testID].name}</span>
                <i className={actionClassName} onClick={onClick}/>
                {activeTest.id == testID
                 && <div className="test-options">
                    {tests[testID].description}
                    <button className="btn btn-primary">Run</button>
                    </div>}
              </div>
            </div>
          })
        }
      </div>
      <div className="modal-footer text-xs-center">
        <button className="btn btn-primary" onClick={onDeckStart}>
          Run the whole deck!
        </button>
      </div>
    </div>
  </Modal>
);

DeckRunner.propTypes = {
  isOpen: React.PropTypes.bool,
  deck: React.PropTypes.object,
  onDeckStart: React.PropTypes.func,
  onDeckClose: React.PropTypes.func,
  onTestRun: React.PropTypes.func,
  onTestStart: React.PropTypes.func,
  onTestRunClose: React.PropTypes.func,
  activeTest: React.PropTypes.object,
  tests: React.PropTypes.object
};

export default DeckRunner
