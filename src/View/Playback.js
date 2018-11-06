import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class Playback extends Component {
  static propTypes = {
    notes: PropTypes.array,
    rows: PropTypes.number,
    cols: PropTypes.number,
    noteStatus: PropTypes.array,
    speed: PropTypes.number,
  };

  state = {
    playing: false
  }

  componentWillMount() {
    let { notes, rows, cols, noteStatus, speed } = this.props;
    this.setState({
      notes, rows, cols, noteStatus, speed
    });
    console.log('playback mounted');
  }

  render() {
    let { playing } = this.state;
    let playText = playing? 'Pause': 'Play';
    return (
      <div className={'PlaybackContainer'}>
        <button>Edit</button><button>{playText}</button>
      </div>
    );
  } 
}

export default Playback;
