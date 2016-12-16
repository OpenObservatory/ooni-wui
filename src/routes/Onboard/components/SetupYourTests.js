import React from 'react';
import Toggle from 'react-toggle';
import Modal from 'react-modal';

const modalStyle = {
  content: {
  },
  overlay: {
  }
};

const SetupYourTests = ({onNextClick, handleDecksChange, decks, handleDeckInfo}) => {
  return (
  <div>

    <div className="row text-xs-center">
      <h1>Setup your tests!</h1>
      <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
      </p>
    </div>

    <div className="row text-xs-center">
      {
        decks.map((deck) => {
          return (
            <div key={deck.id} className="col-md-3">
              <h6>{deck.name}</h6>
              <i className={`medium-icon fa ${deck.icon}`}/>
              <div className="row">
                <div className="col-md-3 offset-md-3" onClick={handleDeckInfo(deck.id)}>
                  <i className="icon-btn fa fa-info-circle" />
                </div>
                <div className="col-md-3">
                  <Toggle
                    icons={{
                      checked: <i style={{
                                    'color': 'rgb(255, 255, 255)',
                                    'font-size': '1.2em',
                                    'position': 'absolute',
                                    'top': '-4px',
                                    'left': '0',
                                  }}
                                  className="fa fa-clock-o" />,
                      unchecked: null
                    }}
                    defaultChecked={deck.enabled}
                    onChange={handleDecksChange(deck.id)}/>
                </div>
              </div>
              <Modal
                className="Modal__Bootstrap modal-dialog"
                onRequestClose={handleDeckInfo(deck.id)}
                contentLabel={`${deck.name} description`}
                isOpen={deck.infoBoxOpen}>
                <div className="modal-content">
                  <div className="modal-header text-xs-center">
                    <button type="button" className="close" onClick={handleDeckInfo(deck.id)}>
                      <span aria-hidden="true">&times;</span>
                      <span className="sr-only">Close</span>
                    </button>
                    <h1 className="modal-title">{deck.name}</h1>
                    <i className={`medium-icon fa ${deck.icon}`}/>
                  </div>
                  <div className="modal-body">
                    <p>{deck.description}</p>
                  </div>
                  <div className="modal-footer text-xs-center">
                    <button className="btn btn-primary" onClick={handleDeckInfo(deck.id)}>
                      Got it!
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )
        })
      }

    </div>

    <div className="row text-xs-center">
      <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball. Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey. Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong porchetta landjaeger strip steak pig bresaola.
      </p>
    </div>

    <div className="row">
      <button onClick={onNextClick} className="btn btn-primary mx-auto"
              style={{'display': 'block'}}>
        Go to my dashboard!
      </button>
    </div>

  </div>
  )
};

SetupYourTests.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  handleDeckInfo: React.PropTypes.func.isRequired,
  handleDecksChange: React.PropTypes.func,
  decks: React.PropTypes.array
};

export default SetupYourTests;
