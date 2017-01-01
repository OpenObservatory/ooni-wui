import React from 'react'
import Deck from '../../../components/Deck'

const SetupYourTests = ({ onNextClick, onDeckToggled, decks }) => {
  return (
    <div>

      <div className='row text-xs-center'>
        <h1>Setup your tests!</h1>
        <p>
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball.
          Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey.
          Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle
          tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong
      </p>
      </div>

      <div className='row text-xs-center'>
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
        Bacon ipsum dolor amet hamburger bacon jerky salami frankfurter, fatback turducken ball tip cow meatball.
          Porchetta capicola jowl, alcatra short ribs spare ribs venison turducken pork chop tenderloin turkey.
          Fatback andouille meatloaf tri-tip pork filet mignon ground round brisket landjaeger tenderloin shankle
          tongue. Shoulder venison chuck pork loin turducken doner ham hock shankle filet mignon biltong
      </p>
      </div>

      <div className='row'>
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
