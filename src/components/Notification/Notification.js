import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ToastContainer, ToastMessage } from 'react-toastr'

let ToastMessageFactory = React.createFactory(ToastMessage.animation)

class Notification extends Component {
  propTypes = {
    messages: React.PropTypes.array
  }

  constructor (props) {
    super(props)
    this.addAlert = this.addAlert.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.messages !== nextProps.messages) {
      this.addAlert(nextProps.messages.pop(0))
    }
  }

  render () {
    return (
      <ToastContainer
        toastMessageFactory={ToastMessageFactory} ref='container'
        className='toast-container toast-bottom-right' />
    )
  }

  addAlert (message) {
    this.refs.container[message.type](
      message.message,
      message.title,
      {
        timeOut: 3000,
        extendedTimeOut: 1000,
        showAnimation: 'animated fadeInUp',
        hideAnimation: 'animated fadeOutUp',
        closeButton: true
      }
    )
  }
}

function mapStateToProps (state) {
  return {
    messages: state.notification.messages
  }
}

export default connect(mapStateToProps)(Notification)
