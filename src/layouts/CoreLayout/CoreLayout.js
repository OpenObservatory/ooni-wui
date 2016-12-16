import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header'

export const CoreLayout = ({ children }) => (
  <div>
  <Header />
  <div className='container'>
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
  </div>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
