import React from 'react'
import Toggle from 'react-toggle'
import Modal from 'react-modal'

import './Deck.scss'

const FullControls = ({
  deckId, enabled, running, runningScheduled,
  directorStarted,
  openDeckInfo, onDeckToggled, onDeckRun
}) => {
  let scheduleClassName, runClassName

  if (runningScheduled) {
    scheduleClassName = 'fa fa-circle-o-notch fa-spin'
  } else if (enabled) {
    scheduleClassName = 'icon-btn-on fa fa-clock-o'
  } else if (!enabled) {
    scheduleClassName = 'icon-btn-off fa fa-clock-o'
  }

  if (running) {
    runClassName = 'fa fa-spinner fa-pulse'
  } else {
    runClassName = 'icon-btn fa fa-play'
  }

  if (!directorStarted) {
    scheduleClassName += ' icon-btn-disabled'
    runClassName += ' icon-btn-disabled'
  }

  return (
    <div className='row'>
      <div className='col-md-2 offset-md-3' onClick={openDeckInfo}>
        <i className='icon-btn fa fa-info-circle' />
      </div>
      <div className='col-md-2'>
        {runningScheduled && directorStarted &&
        <i className={scheduleClassName} />
        }
        {!runningScheduled && directorStarted &&
        <i className={scheduleClassName} onClick={() => onDeckToggled(deckId)} />
        }
        {!directorStarted &&
        <i className={scheduleClassName} />
        }
      </div>
      <div className='col-md-2'>
        {!directorStarted &&
        <i className={runClassName} />
        }
        {running && directorStarted &&
        <i className={runClassName} />
        }
        {!running && directorStarted &&
        <i className={runClassName} onClick={() => onDeckRun(deckId)} />
        }
      </div>
    </div>
  )
}
FullControls.propTypes = {
  deckId: React.PropTypes.string,
  enabled: React.PropTypes.bool,
  running: React.PropTypes.bool,
  runningScheduled: React.PropTypes.bool,
  openDeckInfo: React.PropTypes.func,

  directorStarted: React.PropTypes.bool,

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
            'fontSize': '1.2em',
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
  directorStarted,
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
          directorStarted={directorStarted}
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
  directorStarted: React.PropTypes.bool,
  fullControls: React.PropTypes.bool,
  openDeckInfo: React.PropTypes.func,
  closeDeckInfo: React.PropTypes.func,
  infoBoxOpen: React.PropTypes.bool,

  onDeckToggled: React.PropTypes.func,
  onDeckRun: React.PropTypes.func
}

export default Deck
