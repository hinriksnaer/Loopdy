import React, { Component } from 'react';
import './App.css';
import LoopBoard from './View/LoopBoard';
import PlayableBoard from './View/PlayableBoard';
import BoardSettings from './View/BoardSettings';
import Share from './View/Share';
import Playback from './View/Playback'
import { appService,  } from './Service/AppService';
import { loopBoardService } from './Service/LoopBoardService';
const uniqid = require('uniqid');

class App extends Component {

  state = {
    speed: 200,
    boardIsLooping: false,
    cols: 12,
    rows: 8,
    eigth: 3,
    playbacks: []
  };

  // im sorry
  componentWillMount() {
    let currentNoteStatus = loopBoardService.initStatus(8, 12);
    let url = new URL(window.location.href);
    let board = url.searchParams.get('board');
    if (board){
      let stateObject = appService.decodeURL(board);
      try {
        this.setState({ 
          currentNoteStatus: stateObject.songArray,
          cols: stateObject.col,
          rows: stateObject.row,
          eigth: stateObject.pitch,
          speed: stateObject.speed
        });
        this.generateNotes(stateObject.pitch, stateObject.row);

      } catch (err) {
        this.setState({ currentNoteStatus: currentNoteStatus[0] });
        this.generateNotes(this.state.eigth, this.state.rows);
      }
    } else {
      this.setState({ currentNoteStatus: currentNoteStatus[0] });
      this.generateNotes(this.state.eigth, this.state.rows);
    }
    let playbackObj = {
      key: uniqid(),
      eigth: this.state.eigth,
      rows: this.state.rows,
      cols: this.state.cols,
      noteStatus: appService.deepCopy2dArray(currentNoteStatus[0]),
      speed: this.state.speed
    };
    this.state.playbacks.push(playbackObj);
    this.setState( { currentPlaybackKey:playbackObj.key } );
  }

  // this does not work because react does not make sense
  alterCurrentPlayback(key, value) {
    let { currentPlaybackKey, playbacks } = this.state;

    let currentPlaybackIndex = appService.getCurrentPlaybackIndex(playbacks, currentPlaybackKey);
    playbacks[currentPlaybackIndex][key] = value;
    this.setState({ playbacks: Array.from(playbacks) });
  }
    
  alterCurrentNoteStatus = (noteStatus) => {
    let { currentNoteStatus } = this.state;
    let newNoteStatus = noteStatus;
    this.setState({ currentNoteStatus: newNoteStatus });
    this.alterCurrentPlayback('noteStatus', newNoteStatus);
  }

  // converts bpm to speed and sets it
  alterSpeed = (speed) => {
    this.setState({ speed });
    this.alterCurrentPlayback('speed', speed);
  }

  alterEigth = (eigth) => {
    let { rows } = this.state;
    let pitch = Number(eigth);
    this.setState({ eigth: pitch });
    this.generateNotes(pitch, rows);
    this.alterCurrentPlayback('eigth', pitch);
  }

  alterRows = (rows) => {
    this.setState({ rows });
    this.generateNotes(this.state.eigth, rows);
    this.alterCurrentPlayback('rows', rows);
  }

  alterCols = (cols) => {
    this.setState({ cols });
    this.alterCurrentPlayback('cols', cols);
  }

  generateNotes = (eigth, rows) => {
    let notes = appService.generateNotes(eigth, rows);
    this.setState({ notes });
  }

  generatePlaybacks() {
    let { playbacks } = this.state;
    let playbackList = [];
    for(let playback of playbacks) {
      playbackList.push(
        this.generatePlayback(
          playback.key,
          playback.notes, 
          playback.rows,
          playback.cols,
          playback.noteStatus,
          playback.speed 
          )
      );
    }
    return playbackList;
  }

  generatePlayback = (key, notes, rows, cols, noteStatus, speed) => {
    return <Playback
      randomval = {key}
      notes={notes}
      cols={cols}
      rows={rows}
      speed={speed}
      noteStatus={noteStatus}
    />
  }

  // changes the currently select playback to edit
  alterCurrentlyPlaying = (obj) => {
    let { rows, cols, eigth, speed, noteStatus, key } = obj;
    let notes = appService.generateNotes(eigth, rows);
    this.setState({
      rows,
      cols,
      eigth,
      speed,
      notes,
      currentPlaybackKey: key,
      currentNoteStatus: noteStatus
    });

  }

  addPlayback = () => {
    let { eigth, rows, cols, speed, playbacks } = this.state;
    let initNoteStatus = loopBoardService.initStatus(rows, cols);
    let newPlayback = {
      key: uniqid(),
      eigth: eigth,
      rows: rows,
      cols: cols,
      noteStatus: appService.deepCopy2dArray(initNoteStatus[0]),
      speed: speed
    };
    playbacks.push(newPlayback);
    this.setState({ playbacks: Array.from(playbacks) });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth, currentNoteStatus, playbacks, currentPlaybackKey } = this.state;
    let keys = Object.keys(playbacks);
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings 
            rows={rows} 
            alterRows={this.alterRows} 
            cols={cols} 
            alterCols={this.alterCols} 
            eigth={eigth} 
            alterEigth={this.alterEigth} 
            speed={speed} 
            alterSpeed={this.alterSpeed}
            />
          <div className="SoundboardContainer">
            <PlayableBoard 
              notes={notes}/>
            <LoopBoard 
              cols={cols} 
              rows={rows} 
              notes={notes} 
              speed={speed} 
              boardIsLooping={boardIsLooping}
              currentNoteStatus={currentNoteStatus}
              alterCurrentNoteStatus={this.alterCurrentNoteStatus}/>
          </div>
          <div className={'PlaybacksContainer'}>
            {playbacks.map((playback, i) => (
              <Playback
                key = {playback.keys}
                notes={appService.generateNotes(playback.eigth, playback.rows)}
                cols={playback.cols}
                rows={playback.rows}
                speed={playback.speed}
                noteStatus={playback.noteStatus}
                editing={playback.key===currentPlaybackKey}
                uniq = {playback.key}
                eigth = {playback.eigth}
                alterCurrentlyPlaying={this.alterCurrentlyPlaying}
              />
            ))}
            <button onClick={this.addPlayback}>+</button>
          </div>
          <Share 
            songArray={currentNoteStatus}
            rows={rows}
            cols={cols}
            pitch={eigth}
            speed={speed}
          />
        </div>
        <div className="InfoText">
          <p>Loopdy 0.2.0 created by Hinrik S. Guðmundsson</p>
        </div>
      </main>
    );
  }
}

export default App;
