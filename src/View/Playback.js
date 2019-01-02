import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class Playback extends Component {
  static propTypes = {
    playbackPlayer: PropTypes.object,
    editing: PropTypes.bool,
    alterCurrentPlaybackPlayer: PropTypes.func,
    addPlayingPlayback: PropTypes.func,
    removePlayingPlayback: PropTypes.func,
  };

  componentWillMount() {
    const { playbackPlayer } = this.props;
    this.setState({ isPlaying: playbackPlayer.getIsLooping() });
  }

  handlePlayButton = () => {
    const { addPlayingPlayback, removePlayingPlayback, playbackPlayer } = this.props;
    const { isPlaying } = this.state;

    if (!isPlaying) {
      addPlayingPlayback(playbackPlayer);
    } else {
      playbackPlayer.stopLoop();
      removePlayingPlayback(playbackPlayer);
    }
    this.setState({ isPlaying: !isPlaying });
  }

  handleEditButton = () => {
    let { alterCurrentPlaybackPlayer, playbackPlayer } = this.props;

    alterCurrentPlaybackPlayer(playbackPlayer);
  }

  render() {
    let { isPlaying } = this.state;
    let playText = isPlaying? 'Pause': 'Play';
    return (
      <div className={'PlaybackContainer'}>
        <button onClick={this.handleEditButton}>Edit</button>{!this.props.editing && <button onClick={this.handlePlayButton}>{playText}</button>}
      </div>
    );
  } 
}

export default Playback;
