import React from 'react'
import Deck from '../../../components/Deck'

const SetupYourTests = ({ onNextClick, onDeckToggled, decks }) => {
  return (
    <div className='container'>

      <div className='row text-xs-center'>
        <div className='col-xs-12'>
          <h1>Setup your tests!</h1>
          <p>
            Your tests are setup to run daily by default.
            If you’d like to turn this off, click the <strong><i className='fa fa-clock-o' /></strong> button!
          </p>
          <p>To learn more about each test, click the <strong><i className='fa fa-info-circle' /></strong> button.</p>
        </div>
      </div>

      <div className='row text-xs-center' style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        {
        decks.map((deck) => {
          return (
            <Deck
              key={deck.id}
              deck={deck}
              onDeckToggled={onDeckToggled}
              fullControls={false} />
          )
        })
      }

      </div>

      <div className='row text-xs-center'>
        <div className='col-xs-12'>
          <p>
            To see the results of your first batch of tests, click <strong>Go to my dashboard!</strong>
          </p>
        </div>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
        Go to my dashboard!
      </button>
      </div>

    </div>
  )
}

SetupYourTests.propTypes = {
  onNextClick: React.PropTypes.func.isRequired,
  onDeckToggled: React.PropTypes.func,
  decks: React.PropTypes.array
}

export default SetupYourTests
