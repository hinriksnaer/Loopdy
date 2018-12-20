import React, { Component } from 'react';
import './App.css';
import LoopBoard from './View/LoopBoard';
import PlayableBoard from './View/PlayableBoard';
import BoardSettings from './View/BoardSettings';
import Share from './View/Share';
import Playbacks from './View/Playbacks';
import { AppService,  } from './Service/AppService';
import { LoopBoardService } from './Service/LoopBoardService';

class App extends Component {

  state = {
    speed: 200,
    boardIsLooping: false,
    cols: 12,
    rows: 8,
    eigth: 3,
    playbacks: [],
    currentPlaybackIndex: 0,
  };

  // Initializes the loopboard, if the url contains a saved state then it will load, 
  // if the save state is faulty or the url does not contain a save state then it will
  // be initialized in a default state
  componentWillMount() {
    let currentNoteStatus = LoopBoardService.initStatus(8, 12);
    let url = new URL(window.location.href);
    let board = url.searchParams.get('board');
    if (board){
      let stateObject = AppService.decodeURL(board);
      console.log(stateObject);
      try {
        this.setState({ 
          currentNoteStatus: stateObject.songArray,
          cols: stateObject.col,
          rows: stateObject.row,
          eigth: stateObject.pitch,
          speed: stateObject.speed,
          playbacks: stateObject.playbacks,
          currentPlaybackIndex: stateObject.currentPlaybackIndex,
        });
        this.generateNotes(stateObject.pitch, stateObject.row);

      } catch (err) {
        this.setInitialState(currentNoteStatus[0]);
      }
    } else {
      this.setInitialState(currentNoteStatus[0]);
    }
    let playbackObj = {
      index: this.state.currentPlaybackIndex,
      eigth: this.state.eigth,
      rows: this.state.rows,
      cols: this.state.cols,
      noteStatus: AppService.deepCopy2dArray(currentNoteStatus[0]),
      speed: this.state.speed
    };
    this.state.playbacks.push(playbackObj);
  }

  // initializes the loopboard in a default state
  setInitialState = (defaultNoteStatus) => {
    this.setState({ currentNoteStatus: defaultNoteStatus });
    this.generateNotes(this.state.eigth, this.state.rows);
  }

  alterCurrentPlayback = (key, value) => {
    let { currentPlaybackIndex, playbacks } = this.state;

    playbacks[currentPlaybackIndex][key] = value;
    this.setState({ playbacks: Array.from(playbacks) });
  }
    
  alterCurrentNoteStatus = (noteStatus) => {
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
    let notes = AppService.generateNotes(eigth, rows);
    this.setState({ notes });
  }

  // changes the currently select playback to edit
  alterCurrentlyPlaying = (obj) => {
    let { rows, cols, eigth, speed, noteStatus, index } = obj;
    let notes = AppService.generateNotes(eigth, rows);
    this.setState({
      rows,
      cols,
      eigth,
      speed,
      notes,
      currentPlaybackIndex: index,
      currentNoteStatus: noteStatus
    });

  }

  addPlayback = () => {
    let { eigth, rows, cols, speed, playbacks } = this.state;
    let initNoteStatus = LoopBoardService.initStatus(rows, cols);
    let newPlayback = {
      index: playbacks.length,
      eigth: eigth,
      rows: rows,
      cols: cols,
      noteStatus: AppService.deepCopy2dArray(initNoteStatus[0]),
      speed: speed
    };
    playbacks.push(newPlayback);
    this.setState({ playbacks: Array.from(playbacks) });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth, currentNoteStatus, playbacks, currentPlaybackIndex } = this.state;
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
          <Playbacks
            playbacks={playbacks}
            addPlayback={this.addPlayback}
            currentPlaybackIndex={currentPlaybackIndex}
            alterCurrentlyPlaying={this.alterCurrentlyPlaying}
          />
          <Share 
            songArray={currentNoteStatus}
            rows={rows}
            cols={cols}
            pitch={eigth}
            speed={speed}
            playbacks={playbacks}
            currentPlaybackIndex={currentPlaybackIndex}
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
