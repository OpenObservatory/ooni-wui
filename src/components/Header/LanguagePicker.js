import React from 'react'
import './LanguagePicker.scss'

export default class LanguagePicker extends React.Component {
  static propTypes = {
    options: React.PropTypes.object,
    onClickOption: React.PropTypes.func,
    selectedLocale: React.PropTypes.string,
    inline: React.PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  openClose () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onClickOption (option) {
  }

  buildMenu () {
    let { options, onClickOption, selectedLocale } = this.props
    return options.map((option) => {
      let className = 'language-picker-option'
      if (selectedLocale === option.code) {
        className += ' language-picker-option-selected'
      }
      return (
        <div key={option.code}
          className={className} onClick={() => onClickOption(option)}>
          {option.name}
        </div>
      )
    })
  }

  render () {
    const menu = this.state.isOpen ? <div className='language-picker-menu'>{this.buildMenu()}</div> : null
    let className = 'language-picker'
    if (this.state.isOpen) {
      className += ' language-picker-open'
    }
    if (this.props.inline) {
      className += ' language-picker-inline'
    }

    return (
      <div className={className}>
        <div className='language-picker-control'
          onClick={() => this.openClose()}>
          <i className='icon-btn fa fa-language' />
        </div>
        {menu}
      </div>
    )
  }
}
