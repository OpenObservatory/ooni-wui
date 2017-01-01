import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Field, reduxForm } from 'redux-form'

import {
  runNettest
} from '../../../actions/nettest'
import {
  closedRunDeck
} from '../../../actions/dashboard'

import './DeckRunner.scss'

let NettestRunnerOptions = ({
  fields,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        Object.keys(fields)
          // XXX we currently skip file type fields
          .filter((key) => (fields[key].type !== 'file'))
          .map((key) => {
            const field = fields[key]
            return (
              <div key={key} className='form-group'>
                <label>{key}</label>
                <Field
                  className='form-control'
                  name={key}
                  component='input'
                  type={field.type} />
              </div>
            )
          })
      }
    </form>
  )
}

NettestRunnerOptions.propTypes = {
  fields: React.PropTypes.object,
  handleSubmit: React.PropTypes.func
}

NettestRunnerOptions = reduxForm({
  form: 'nettestRunnerOptions'
})(NettestRunnerOptions)

NettestRunnerOptions = connect((state, ownProps) => {
  const { fields } = ownProps
  let initialValues = {}
  Object.keys(fields).forEach((k) => {
    if (fields[k].value) {
      initialValues[k] = fields[k].value
    }
  })
  return {
    onSubmit: (options, dispatch) => {
      runNettest(ownProps.nettestId, options)
        .then(() => {
          dispatch(closedRunDeck())
        })
    },
    initialValues
  }
})(NettestRunnerOptions)

const NettestRunner = ({
  nettest,
  onTestStart,
  onTestRunClose
}) => (
  <div>
    <div className='modal-body'>
      <h2>
        <a onClick={onTestRunClose} className='btn'>
          <i className='fa fa-arrow-left' />
        </a> {nettest.name}
      </h2>
      <p>{nettest.description}</p>
      <NettestRunnerOptions
        nettestId={nettest.id}
        fields={nettest.arguments} />
    </div>
    <div className='modal-footer text-xs-center'>
      <button className='btn btn-primary' onClick={onTestStart}>
        <i className='fa fa-play' /> Run
      </button>
    </div>
  </div>
)

NettestRunner.propTypes = {
  onTestStart: React.PropTypes.func,
  onTestRunClose: React.PropTypes.func,
  nettest: React.PropTypes.object
}

const DeckInfo = ({
  deck,
  nettests,
  onTestRun,
  onDeckStart
}) => (
  <div>
    <div className='modal-body'>
      {
        deck.nettests && deck.nettests.map((nettestId) => {
          return (
            <div key={nettestId} className='text-xs-center'>
              <h2>{nettests[nettestId].name}</h2>
              <p>{nettests[nettestId].description}</p>
              <button className='btn btn-secondary' onClick={() => onTestRun(nettestId)}>
                <i className='fa fa-play' /> Run
              </button>
            </div>
          )
        })
      }
    </div>
    <div className='modal-footer text-xs-center'>
      <button className='btn btn-primary' onClick={onDeckStart}>
        <i className='fa fa-play' /> Run the whole deck!
      </button>
    </div>
  </div>
)

DeckInfo.propTypes = {
  deck: React.PropTypes.object,
  onDeckStart: React.PropTypes.func,
  onTestRun: React.PropTypes.func,
  nettests: React.PropTypes.object
}

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
    className='Modal__Bootstrap modal-dialog'
    onRequestClose={onDeckClose}
    contentLabel={`${deck.name} runner`}
    isOpen={isOpen}>
    <div className='modal-content'>
      <div className='modal-header text-xs-center'>
        <button type='button' className='close' onClick={onDeckClose}>
          <span aria-hidden='true'>&times;</span>
          <span className='sr-only'>Close</span>
        </button>
        <h1 className='modal-title'>{deck.name}</h1>
        <i className={`medium-icon fa ${deck.icon}`} />
      </div>
      {activeNettest
        ? <NettestRunner
          onTestStart={onTestStart}
          onTestRunClose={onTestRunClose}
          nettest={activeNettest} />
        : <DeckInfo
          deck={deck}
          nettests={nettests}
          onTestRun={onTestRun}
          onDeckStart={onDeckStart} />
      }
    </div>
  </Modal>
)

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
}

export default DeckRunner
