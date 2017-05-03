import React from 'react'
import { connect } from 'react-redux'

import { getDirection } from '../../store/locale'

import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Notification from '../../components/Notification'

export const CoreLayoutComponent = ({ children, direction }) => (
  <div style={{ height: '100%' }} dir={direction}>
    <div className='wrapper'>
      <Header />
      <Notification />
      <div className='container'>
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
      <div className='push' />
    </div>
    <Footer />
  </div>
)

CoreLayoutComponent.propTypes = {
  children : React.PropTypes.element.isRequired,
  direction: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return ({
    direction: getDirection(state.intl.locale)
  })
}

const CoreLayout = connect(mapStateToProps)(CoreLayoutComponent)
export default CoreLayout
