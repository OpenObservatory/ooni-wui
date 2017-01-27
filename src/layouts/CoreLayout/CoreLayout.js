import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Notification from '../../components/Notification'

export const CoreLayout = ({ children }) => (
  <div style={{height: '100%'}}>
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

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
