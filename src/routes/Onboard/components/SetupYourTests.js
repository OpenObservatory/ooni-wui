import React from 'react'
import Deck from '../../../components/Deck'

const SetupYourTests = ({ onNextClick, onDeckToggled, decks }) => {
  return (
    <div>

      <div className='row text-xs-center'>
        <h1>Setup your tests!</h1>
        <p>
          Your tests are setup to run daily by default.
          If you’d like to turn this off, click the <i className='fa fa-clock-o' /> button!
        </p>
        <p>To learn more about each test, click the <i className='fa fa-info-circle' /> button.</p>
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
        <p>
          To see the results of your first batch of tests, click <strong>Go to my dashboard!</strong>
        </p>
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
