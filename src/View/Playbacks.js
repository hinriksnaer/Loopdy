import React, { Component } from 'react';
import Playback from '../View/Playback';
import { AppService } from '../Service/AppService';
import '../App.css';
import PropTypes from 'prop-types';
import { PlaybackPlayer } from '../Service/PlaybackPlayer';

class Playbacks extends Component {

  static propTypes = {
    playbacks: PropTypes.array,
    addPlayback: PropTypes.func,
    currentPlaybackPlayer: PropTypes.object,
    alterCurrentlyPlaying: PropTypes.func,
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
    let { playbacks, currentPlayback, addPlayback, alterCurrentlyPlaying } = this.props;
    return (
      <div className={'PlaybacksContainer'}>
        {playbacks.map((playbackPlayer) => (
          <Playback
            playbackPlayer={playbackPlayer}
            editing={playbackPlayer===currentPlayback}
            alterCurrentlyPlaying={alterCurrentlyPlaying}
            addPlayingPlayback={this.addPlayingPlayback}
            removePlayingPlayback={this.removePlayingPlayback}
          />
        ))}
        <button onClick={addPlayback}>+</button>
      </div>
    );
  }
}

export default Playbacks;
 