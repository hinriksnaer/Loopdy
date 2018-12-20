import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { PlaybackPlayer } from '../Service/PlaybackPlayer';

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
    
    let playbackPlayer = PlaybackPlayer(notes, cols, speed, rows, noteStatus);

    this.setState({
      playbackPlayer
    });
  }

  componentWillReceiveProps(nextProps) {
    let { notes, rows, cols, noteStatus, speed } = nextProps;
    let { playbackPlayer } = this.state;
    if (notes !== this.props.notes) {
      playbackPlayer.setNotes(notes);
    }
    if (rows !== this.props.rows) {
      playbackPlayer.setRows(rows);
    }
    if (cols !== this.props.cols) {
      playbackPlayer.setCols(cols);
    }
    if (noteStatus !== this.props.noteStatus) {
      playbackPlayer.setNoteStatus(noteStatus);
    }
    if (speed !== this.props.speed) {
      playbackPlayer.setSpeed(speed);
    }
  }

  handlePlayButton = () => {
    const { playing, playbackPlayer } = this.state;
    const newPlaying = !playing;
    this.setState({ playing: newPlaying });
    
    if (!playing) {
      playbackPlayer.startLoop();
    } else {
      playbackPlayer.stopLoop();
    }
  }

  handleEditButton = () => {
    let { notes, rows, cols, noteStatus, speed, alterCurrentlyPlaying, eigth, index } = this.props;
    let playbackData = {
      index,
      notes,
      rows,
      cols,
      noteStatus,
      speed,
      eigth,
    }
    alterCurrentlyPlaying(playbackData);
  }

  render() {
    let { playing } = this.state;
    let playText = playing? 'Pause': 'Play';
    return (
      <div className={'PlaybackContainer'}>
        <button onClick={this.handleEditButton}>Edit</button>{!this.props.editing && <button onClick={this.handlePlayButton}>{playText}</button>}
        <p>{this.props.uniq}</p>
      </div>
    );
  } 
}

export default Playback;
