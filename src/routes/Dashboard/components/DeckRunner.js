import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Modal from 'react-modal'
import { Field, reduxForm } from 'redux-form'

import {
  runNettest
} from '../../../actions/nettest'
import {
  closedRunDeck
} from '../../../actions/dashboard'

import './DeckRunner.scss'

class NettestRunnerOptionsInner extends React.Component {

  constructor (props) {
    super(props)
    this.state = { showAdvanced: false }
  }

  toggleAdvanced () {
    this.setState({ showAdvanced: !this.state.showAdvanced })
  }

  render () {
    let { fields, handleSubmit, simpleOptions } = this.props
    // XXX this a workaround a bug of the ooniprobe API
    if (!Array.isArray(simpleOptions)) {
      simpleOptions = []
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {this.state.showAdvanced
            ? <div>
              {Object.keys(fields)
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
            </div>
            : <div>
              {simpleOptions.map((option) => {
                const key = option.name
                const optType = fields[key].type
                if (optType === 'file') {
                  return
                }
                return (
                  <div key={key} className='form-group'>
                    <label>{key}</label>
                    <Field
                      className='form-control'
                      name={key}
                      component='input'
                      type={optType} />
                  </div>
                )
              })}
            </div>
          }
        </form>
        <button className='btn btn-secondary' onClick={() => this.toggleAdvanced()}>
          {this.state.showAdvanced
           ? <FormattedMessage
              id='dashboard.deckRunner.hideAdvanced'
              defaultMessage='Hide advanced options'
             />
          : <FormattedMessage
              id='dashboard.deckRunner.showAdvanced'
              defaultMessage='Show advanced options'
             />
          }
        </button>
      </div>
    )
  }
}

NettestRunnerOptionsInner.propTypes = {
  fields: React.PropTypes.object,
  simpleOptions: React.PropTypes.array,
  handleSubmit: React.PropTypes.func
}

let NettestRunnerOptions = reduxForm({
  form: 'nettestRunnerOptions'
})(NettestRunnerOptionsInner)

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
      dispatch(runNettest(ownProps.nettestId, options))
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
        simpleOptions={nettest.simple_options}
        fields={nettest.arguments} />
    </div>
    <div className='modal-footer text-xs-center'>
      <button className='btn btn-primary' onClick={onTestStart}>
        <FormattedMessage
          id='dashboard.deckRunner.runButton'
          defaultMessage='{iconRun} Run'
          values: {{
            iconRun: <i className='fa fa-play' />
          }}
        />
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
            <div key={nettestId} className='row text-xs-center' style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <div className='col-xs-9'>
                <h2>{nettests[nettestId].name}</h2>
                <p>{nettests[nettestId].description}</p>
              </div>
              <div className='col-xs-3' style={{ marginTop: '1rem' }}>
                <button className='btn btn-secondary' onClick={() => onTestRun(nettestId)}>
                  Select <i className='fa fa-arrow-right' />
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
    <div className='modal-footer text-xs-center'>
      <button className='btn btn-primary' onClick={onDeckStart}>
        <i className='fa fa-play' /> Run them all!
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
