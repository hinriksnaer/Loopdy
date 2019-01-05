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
    isPlaying: PropTypes.bool
  };

  // state
  // isPlaying: boolean value indicating if the loop is being played or not

  componentWillMount() {
    const { playbackPlayer } = this.props;
    this.setState({ isPlaying: playbackPlayer.getIsLooping() });
  }

  componentDidUpdate(prevProps) {
    const { isPlaying } = this.props;
    if (isPlaying !== prevProps.isPlaying) {
      this.setState({ isPlaying });
    }
  }

  // called when the play button is pressed
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

  // called when the edit button is pressed
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
