import React, { Component } from 'react';
import Playback from '../View/Playback';
import { AppService } from '../Service/AppService'
import '../App.css';
import PropTypes from 'prop-types';

class Playbacks extends Component {

  static propTypes = {
    playbacks: PropTypes.array,
    addPlayback: PropTypes.func,
    currentPlaybackKey: PropTypes.string,
    alterCurrentlyPlaying: PropTypes.func
  }

  render() {
    let { playbacks, currentPlaybackKey, addPlayback, alterCurrentlyPlaying } = this.props;
    return (
      <div className={'PlaybacksContainer'}>
        {playbacks.map((playback) => (
          <Playback
            key = {playback.keys}
            notes={AppService.generateNotes(playback.eigth, playback.rows)}
            cols={playback.cols}
            rows={playback.rows}
            speed={playback.speed}
            noteStatus={playback.noteStatus}
            editing={playback.key===currentPlaybackKey}
            uniq = {playback.key}
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
