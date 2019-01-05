import React, { Component } from 'react';
import Playback from './Playback';
import '../App.css';
import PropTypes from 'prop-types';

class Playbacks extends Component {

  static propTypes = {
    playbacks: PropTypes.array,
    addPlayback: PropTypes.func,
    currentPlaybackPlayer: PropTypes.object,
    alterCurrentPlaybackPlayer: PropTypes.func,
    boardIsLooping: PropTypes.bool
  }

  state = {
    playingPlaybacks: []
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.boardIsLooping && this.props.boardIsLooping) {
      this.addPlayingPlayback(this.props.currentPlaybackPlayer);
    } else if (prevProps.boardIsLooping && !this.props.boardIsLooping) {
      this.removePlayingPlayback(this.props.currentPlaybackPlayer);
    }
  }

  // adds playback to be started synced up with one of the currently playing playbacks
  addPlayingPlayback = (playback) => {
    let { playingPlaybacks } = this.state;
    playingPlaybacks.push(playback);
    if (playingPlaybacks.length < 2) {
      this.setState({ playingPlaybacks });
      playback.startLoop();
    } else {
      playingPlaybacks[0].syncStartPlaybackPlayer(playback);
    }
  }

  // removes/turns off a playback that is currently being played
  removePlayingPlayback = (playback) => {
    let { playingPlaybacks } = this.state;
    let index = playingPlaybacks.indexOf(playback);
    playingPlaybacks.splice(index, 1);
    this.setState({ playingPlaybacks });
  }

  render() {
    let { playbacks, currentPlaybackPlayer, addPlayback, alterCurrentPlaybackPlayer } = this.props;
    return (
      <div className={'PlaybacksContainer'}>
        {playbacks.map((playbackPlayer) => (
          <Playback
            playbackPlayer={playbackPlayer}
            editing={playbackPlayer==currentPlaybackPlayer}
            alterCurrentPlaybackPlayer={alterCurrentPlaybackPlayer}
            addPlayingPlayback={this.addPlayingPlayback}
            removePlayingPlayback={this.removePlayingPlayback}
            isPlaying={playbackPlayer.getIsLooping()}
          />
        ))}
        <button onClick={addPlayback}>+</button>
      </div>
    );
  }
}

export default Playbacks;
 