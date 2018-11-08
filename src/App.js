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
    playbacks: {}
  };

  // This should take care of checking if there is an url with a previous song to load or initialize the app
  componentWillMount() {
    let currentNoteStatus = loopBoardService.initStatus(8, 12);
    let url = new URL(window.location.href);
    console.log(url);
    let board = url.searchParams.get('board');
    console.log(board);
    if (board){
      let stateObject = appService.decodeURL(board);
      console.log(stateObject);
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
    let notes = appService.generateNotes(this.state.eigth, this.state.rows);
    let playbackObj = {
      eigth: this.state.eigth,
      rows: this.state.rows,
      cols: this.state.cols,
      noteStatus: appService.deepCopy2dArray(currentNoteStatus[0]),
      speed: this.state.speed
    };
    let key = uniqid();
    this.state.playbacks[key] = playbackObj;
    this.setState( { currentPlaybackKey:key } );
  }

  // this does not work because react does not make sense
  alterCurrentPlayback(key, value) {
    let { currentPlaybackKey, playbacks } = this.state;

    let clone = JSON.parse(JSON.stringify(playbacks));
    console.log(value);
    let newObj = {};
    newObj[currentPlaybackKey] = {};
    for (let ke in clone[currentPlaybackKey]) {
      if(ke !== key){
        newObj[currentPlaybackKey][ke] = clone[currentPlaybackKey][ke];
      }
    }
    newObj[currentPlaybackKey][key] = value;

    console.log(newObj);
    console.log('putting it in');
    this.setState({ playbacks: newObj });
    console.log('inserted');
    console.log(newObj);
    console.log(value);
  }
    
  alterCurrentNoteStatus = (noteStatus) => {
    let { currentNoteStatus } = this.state;
    let newNoteStatus = noteStatus;
    this.setState({ currentNoteStatus: newNoteStatus });
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
    for(let key in playbacks) {
      playbackList.push(
        this.generatePlayback(
          key,
          playbacks[key].notes, 
          playbacks[key].rows,
          playbacks[key].cols,
          playbacks[key].noteStatus,
          playbacks[key].speed 
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

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth, currentNoteStatus, playbacks } = this.state;
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
            alterSpeed={this.alterSpeed}/>
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
          {keys.map((item, i) => (
            <Playback
              key = {keys[i]}
              notes={appService.generateNotes(playbacks[item].eigth, playbacks[item].rows)}
              cols={playbacks[item].cols}
              rows={playbacks[item].rows}
              speed={playbacks[item].speed}
              noteStatus={playbacks[item].noteStatus}
            />
          ))}
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
