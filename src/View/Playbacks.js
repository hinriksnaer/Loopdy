import React, { Component } from 'react';
import Playback from '../View/Playback';
import { AppService } from '../Service/AppService'
import '../App.css';
import PropTypes from 'prop-types';
import { PlaybackPlayer } from '../Service/PlaybackPlayer';

class Playbacks extends Component {

  static propTypes = {
    playbacks: PropTypes.array,
    addPlayback: PropTypes.func,
    currentPlaybackIndex: PropTypes.number,
    alterCurrentlyPlaying: PropTypes.func
  }

  state = {
    playingPlaybacks: []
  }

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

  removePlayingPlayback = (playback) => {
    let { playingPlaybacks } = this.state;
    let index = playingPlaybacks.indexOf(playback);
    playingPlaybacks.splice(index, 1);
    this.setState({ playingPlaybacks });
  }

  render() {
    let { playbacks, currentPlaybackIndex, addPlayback, alterCurrentlyPlaying } = this.props;
    return (
      <div className={'PlaybacksContainer'}>
        {playbacks.map((playback) => (
          <Playback
            index = {playback.index}
            notes={AppService.generateNotes(playback.eigth, playback.rows)}
            cols={playback.cols}
            rows={playback.rows}
            speed={playback.speed}
            noteStatus={playback.noteStatus}
            editing={playback.index===currentPlaybackIndex}
            eigth = {playback.eigth}
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
