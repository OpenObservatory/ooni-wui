import React from 'react'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders the ooni logo', () => {
    const ooniLogo = _wrapper.find('.ooni-logo')
    expect(ooniLogo).to.have.length(1)
  })

})
