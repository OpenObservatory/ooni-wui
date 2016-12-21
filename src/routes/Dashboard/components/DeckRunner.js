import React from 'react'
import Modal from 'react-modal';
import './DeckRunner.scss';

const NettestRunner = ({
  nettest,
  onTestStart,
  onTestRunClose
}) => (
  <div>
    <div className="modal-body">
      <button className="btn btn-primary" onClick={onTestRunClose}>back</button>
      <h2>{nettest.name}</h2>
      <p>{nettest.description}</p>
      <form>
        <div className="form-group">
          <label>Header</label>
          <input type="text" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Backend</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
      </form>
    </div>
    <div className="modal-footer text-xs-center">
      <button className="btn btn-primary" onClick={onTestStart}>
        <i className="fa fa-play"/> Run
      </button>
    </div>
  </div>
)

NettestRunner.propTypes = {
  onTestStart: React.PropTypes.func,
  onTestRunClose: React.PropTypes.func,
  nettest: React.PropTypes.object
};

const DeckInfo = ({
  deck,
  nettests,
  onTestRun,
  onDeckStart
}) => (
  <div>
    <div className="modal-body">
      {
        deck.nettests && deck.nettests.map((nettestId) => {
          return (
            <div key={nettestId} className="text-xs-center">
              <h2>{nettests[nettestId].name}</h2>
              <p>{nettests[nettestId].description}</p>
              <button className="btn btn-secondary" onClick={() => onTestRun(nettestId)}>
                <i className="fa fa-play"/> Run
              </button>
            </div>
          )
        })
      }
    </div>
    <div className="modal-footer text-xs-center">
      <button className="btn btn-primary" onClick={onDeckStart}>
        <i className="fa fa-play"/> Run the whole deck!
      </button>
    </div>
  </div>
)

DeckInfo.propTypes = {
  deck: React.PropTypes.object,
  onDeckStart: React.PropTypes.func,
  onTestRun: React.PropTypes.func,
  nettests: React.PropTypes.object
};

export const DeckRunner = ({
  nettests,
  isOpen,
  deck,
  onDeckStart,
  onTestRun,
  onTestRunClose,
  onTestStart,
  onDeckClose,
  activeNettest
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
      {activeNettest ?
        <NettestRunner
            onTestStart={onTestStart}
            onTestRunClose={onTestRunClose}
            nettest={activeNettest}/> :
        <DeckInfo
          deck={deck}
          nettests={nettests}
          onTestRun={onTestRun}
          onDeckStart={onDeckStart} />
      }
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
  activeNettest: React.PropTypes.object,
  nettests: React.PropTypes.object
};

export default DeckRunner
