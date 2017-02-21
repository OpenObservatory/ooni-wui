import React from 'react'
import { FormattedMessage } from 'react-intl'
import fetch from 'isomorphic-fetch'

import './Logs.scss'

class LogViewer extends React.Component {
  propTypes = {
    logData: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      logData: props.logData,
      sharing: false,
      shareUrl: null
    }
    this.onShare = this.onShare.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ logData: event.target.value })
  }

  onShare () {
    this.setState({ sharing: true })
    fetch('https://api.github.com/gists', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: 'ooniprobe logs ' + new Date(),
        public: false,
        files: {
          'ooniprobe-logs.txt': {
            content: this.state.logData
          }
        }
      })
    }).then(data => data.json())
      .then(json => {
        this.setState({ sharing: false, shareUrl: json.html_url })
      })
      .catch((ex) => {
        this.setState({ sharing: false })
      })
    event.preventDefault()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.logData === this.props.logData) {
      return
    }
    this.setState({ logData: nextProps.logData })
  }

  render () {
    return (
      <div className='log-container'>
        <div className='row'>
          <div className='col-md-12'>
            <textarea className='logarea' value={this.state.logData} onChange={this.handleChange} />
          </div>
        </div>
        {this.state.shareUrl &&
        <div className='row'>
          <div className='col-xs-8'>
            <FormattedMessage
              id='logs.shareUrl'
              defaultMessage='Share URL: {urlHref}'
              values={{
                urlHref: <a href={this.state.shareUrl}>{this.state.shareUrl}</a>
              }}
            />
          </div>
        </div>
        }
        <div className='row'>
          {this.state.sharing
            ? <div className='col-xs-3'>
              <FormattedMessage
                id='logs.uploading'
                defaultMessage='{iconUploading} uploading'
                values={{
                  iconUploading: <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
                }}
                />
            </div>
            : <div className='col-xs-3'>
              <button className='btn btn-secondary' onClick={this.onShare}>
                <FormattedMessage
                  id='logs.shareButton'
                  defaultMessage='{iconShare} share'
                  values={{
                    iconShare: <i className='fa fa-share-square-o' />
                  }}
                />
              </button>
            </div>
          }
        </div>
      </div>
    )
  }

}

const Logs = ({
  olderLogs,
  latestLog,
  loadOlderLogs
}) => {
  return (

    <div>
      <LogViewer logData={latestLog} />
      <div className='row'>
        <div className='col-xs-8'>
          <button className='btn btn-secondary' onClick={loadOlderLogs}>
            <FormattedMessage
              id='logs.loadOlder'
              defaultMessage='load older logs'
            />
          </button>
        </div>
      </div>

      {olderLogs.map(logData => (<LogViewer logData={logData} />))}
    </div>
  )
}

Logs.propTypes = {
  latestLog: React.PropTypes.string,
  olderLogs: React.PropTypes.array,
  loadOlderLogs: React.PropTypes.func
}

export default Logs
