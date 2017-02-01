import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders the ooni logo', () => {
    const ooniLogo = _wrapper.find('.ooni-logo')
    /* We have two one for normal screens and another for extra small ones */
    expect(ooniLogo).to.have.length(2)
  })
})
