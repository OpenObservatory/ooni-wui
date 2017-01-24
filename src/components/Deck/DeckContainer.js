import React from 'react'
import Deck from './Deck'

export default class DeckContainer extends React.Component {
  static propTypes = {
    deck: React.PropTypes.shape({
      description: React.PropTypes.string,
      id: React.PropTypes.string,
      icon: React.PropTypes.string,
      name: React.PropTypes.string,
      enabled: React.PropTypes.bool,
      running: React.PropTypes.bool
    }).isRequired,
    fullControls: React.PropTypes.bool,
    directorStarted: React.PropTypes.bool,
    onDeckToggled: React.PropTypes.func,
    onDeckRun: React.PropTypes.func
  };

  constructor (props) {
    super(props)
    this.state = {
      infoBoxOpen: false
    }
  }

  openDeckInfo () {
    this.setState({ ...this.state, infoBoxOpen: true })
  }

  closeDeckInfo () {
    this.setState({ ...this.state, infoBoxOpen: false })
  }

  render () {
    return (
      <Deck
        deck={this.props.deck}
        directorStarted={this.props.directorStarted}
        infoBoxOpen={this.state.infoBoxOpen}
        // XXX: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        // eslint-disable-next-line
        openDeckInfo={this.openDeckInfo.bind(this)}
        // eslint-disable-next-line
        closeDeckInfo={this.closeDeckInfo.bind(this)}
        onDeckRun={this.props.onDeckRun}
        onDeckToggled={this.props.onDeckToggled}
        fullControls={this.props.fullControls} />
    )
  }
}

