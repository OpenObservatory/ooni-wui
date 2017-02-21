import React from 'react'
import { FormattedMessage } from 'react-intl'
import Deck from '../../../components/Deck'

const SetupYourTests = ({ onNextClick, onDeckToggled, decks }) => {
  return (
    <div className='container'>

      <div className='row text-xs-center'>
        <div className='col-xs-12'>
          <h1>
            <FormattedMessage
              id='onboard.setupYourTests.title'
              defaultMessage='Setup your tests!'
            />
          </h1>
          <p>
            <FormattedMessage
              id='onboard.setupYourTests.text1'
              defaultMessage={'Your tests are setup to run daily by default.\nIf you’d like to turn this off, click the {iconClock} button!'}
              values={{
                iconClock: <strong><i className='fa fa-clock-o' /></strong>
              }}
            />
          </p>
          <p>
            <FormattedMessage
              id='onboard.setupYourTests.text2'
              defaultMessage='To learn more about each test, click the {iconInfo} button.'
              values={{
                iconInfo: <strong><i className='fa fa-info-circle' /></strong>
              }}
            />
          </p>
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
            <FormattedMessage
              id='onboard.setupYourTests.text3'
              defaultMessage='To see the results of your first batch of tests, click {goToMyDashboard}'
              values={{
                goToMyDashboard: <strong>
                  <FormattedMessage
                    id='onboard.setupYourTests.text3.goToMyDashboard'
                    defaultMessage='Go to my dashboard!'
                  />
                </strong>
              }}
            />
          </p>
        </div>
      </div>

      <div className='row next-step'>
        <button onClick={onNextClick} className='btn btn-primary mx-auto'
          style={{ 'display': 'block' }}>
          <FormattedMessage
            id='onboard.setupYourTests.goToDashboard'
            defaultMessage='Go to my dashboard!'
          />
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
