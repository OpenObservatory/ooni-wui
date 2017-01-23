import React from 'react'
import Toggle from 'react-toggle'
import Modal from 'react-modal'

import './Deck.scss'

const FullControls = ({ deckId, enabled, running, runningScheduled, openDeckInfo, onDeckToggled, onDeckRun }) => (
  <div className='row'>
    <div className='col-md-2 offset-md-3' onClick={openDeckInfo}>
      <i className='icon-btn fa fa-info-circle' />
    </div>
    <div className='col-md-2'>
      {runningScheduled &&
      <i className='fa fa-circle-o-notch fa-spin' />
      }
      {enabled && !runningScheduled &&
      <i className='icon-btn-on fa fa-clock-o' onClick={() => onDeckToggled(deckId)} />
      }
      {!enabled && !runningScheduled &&
      <i className='icon-btn icon-btn-off fa fa-clock-o' onClick={() => onDeckToggled(deckId)} />
      }
    </div>
    <div className='col-md-2'>
      {running
        ? <i className='fa fa-spinner fa-pulse' />
        : <i className='icon-btn fa fa-play' onClick={() => onDeckRun(deckId)} />
      }
    </div>
  </div>
)
FullControls.propTypes = {
  deckId: React.PropTypes.string,
  enabled: React.PropTypes.bool,
  running: React.PropTypes.bool,
  runningScheduled: React.PropTypes.bool,
  openDeckInfo: React.PropTypes.func,

  onDeckToggled: React.PropTypes.func,
  onDeckRun: React.PropTypes.func
}

const BasicControls = ({ deckId, enabled, openDeckInfo, onDeckToggled }) => (
  <div className='row'>
    <div className='col-md-3 offset-md-3' onClick={openDeckInfo}>
      <i className='icon-btn fa fa-info-circle' />
    </div>
    <div className='col-md-3'>
      <Toggle
        icons={{
          checked: <i style={{
            'color': 'rgb(255, 255, 255)',
            'font-size': '1.2em',
            'position': 'absolute',
            'top': '-4px',
            'left': '0'
          }} className='fa fa-clock-o' />,
          unchecked: null
        }}
        defaultChecked={enabled}
        onChange={() => onDeckToggled(deckId)} />
    </div>
  </div>
)

BasicControls.propTypes = {
  deckId: React.PropTypes.string,
  enabled: React.PropTypes.bool,
  openDeckInfo: React.PropTypes.func,
  onDeckToggled: React.PropTypes.func
}

export const Deck = ({
  deck, fullControls,
  openDeckInfo, closeDeckInfo,
  infoBoxOpen, onDeckToggled,
  onDeckRun
}) => (
  <div>

    <div key={deck.id} className='col-md-3 text-xs-center'>
      <h6>{deck.name}</h6>
      <i className={`medium-icon fa ${deck.icon}`} />
      {fullControls
        ? <FullControls
          deckId={deck.id}
          enabled={deck.enabled}
          running={deck.running}
          runningScheduled={deck.running_scheduled}
          openDeckInfo={openDeckInfo}
          onDeckRun={onDeckRun}
          onDeckToggled={onDeckToggled} />
        : <BasicControls
          deckId={deck.id}
          enabled={deck.enabled}
          openDeckInfo={openDeckInfo}
          onDeckToggled={onDeckToggled} />
      }

      <Modal
        className='Modal__Bootstrap modal-dialog'
        onRequestClose={closeDeckInfo}
        contentLabel={`${deck.name} description`}
        isOpen={infoBoxOpen}>
        <div className='modal-content'>
          <div className='modal-header text-xs-center'>
            <button type='button' className='close' onClick={closeDeckInfo}>
              <span aria-hidden='true'>&times;</span>
              <span className='sr-only'>Close</span>
            </button>
            <h1 className='modal-title'>{deck.name}</h1>
            <i className={`medium-icon fa ${deck.icon}`} />
          </div>
          <div className='modal-body'>
            <p>{deck.description}</p>
          </div>
          <div className='modal-footer text-xs-center'>
            <button className='btn btn-primary' onClick={closeDeckInfo}>
              Got it!
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
)

Deck.propTypes = {
  deck: React.PropTypes.shape({
    description: React.PropTypes.string,
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    name: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    running: React.PropTypes.bool
  }).isRequired,
  fullControls: React.PropTypes.bool,
  openDeckInfo: React.PropTypes.func,
  closeDeckInfo: React.PropTypes.func,
  infoBoxOpen: React.PropTypes.bool,

  onDeckToggled: React.PropTypes.func,
  onDeckRun: React.PropTypes.func
}

export default Deck
