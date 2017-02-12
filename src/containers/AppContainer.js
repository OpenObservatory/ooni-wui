import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import Modal from 'react-modal'
import { history } from '../store/location'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <IntlProvider locale={navigator.language}>
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes} />
          </div>
        </IntlProvider>
      </Provider>
    )
  }
}

export default AppContainer
