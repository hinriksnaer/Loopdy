import React, { Component } from 'react';
import Playback from '../View/Playback';
import { AppService } from '../Service/AppService'
import '../App.css';
import PropTypes from 'prop-types';

class Playbacks extends Component {

  static propTypes = {
    playbacks: PropTypes.array,
    addPlayback: PropTypes.func,
    currentPlaybackIndex: PropTypes.number,
    alterCurrentlyPlaying: PropTypes.func
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
          />
        ))}
        <button onClick={addPlayback}>+</button>
      </div>
    );
  }
}

export default Playbacks;
