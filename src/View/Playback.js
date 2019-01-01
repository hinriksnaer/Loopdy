import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class Playback extends Component {
  static propTypes = {
    playbackPlayer: PropTypes.object,
    editing: PropTypes.bool,
    alterCurrentlyPlaying: PropTypes.func,
    addPlayingPlayback: PropTypes.func,
    removePlayingPlayback: PropTypes.func,
  };

  handlePlayButton = () => {
    const { addPlayingPlayback, removePlayingPlayback, playbackPlayer } = this.props;
    
    if (!playbackPlayer.getIsLooping()) {
      addPlayingPlayback(playbackPlayer);
    } else {
      playbackPlayer.stopLoop();
      removePlayingPlayback(playbackPlayer);
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
    let { playbackPlayer } = this.props;
    let playText = playbackPlayer.getIsLooping()? 'Pause': 'Play';
    return (
      <div className={'PlaybackContainer'}>
        <button onClick={this.handleEditButton}>Edit</button>{!this.props.editing && <button onClick={this.handlePlayButton}>{playText}</button>}
      </div>
    );
  } 
}

export default Playback;
