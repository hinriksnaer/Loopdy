import React, { Component } from 'react';
import PlaybackPlayer from './Service/PlaybackPlayer';
import BoardSettings from './View/BoardSettings';
import LoopBoard from './View/LoopBoard';
import Playbacks from './View/Playbacks';
import Share from './View/Share';
import './App.css';
import { AppService,  } from './Service/AppService';
import { LoopBoardService } from './Service/LoopBoardService';

class App extends Component {

  // speed: Current speed on the loopboard
  // boardIsLooping: flag indicating weather or not the loopboard is currently playing
  // cols: amount of columns on the loopboard (width)
  // rows: amount of rows on the loopboard (height)
  // eigth: which eigth is being played on the loopboard, higher number indicates higher pitch
  // playbacks: List of all loops
  // currentPlaybackPlayer: playbackPlayer instance for the current loop on the loopboard
  state = {
    speed: 200,
    boardIsLooping: false,
    cols: 12,
    rows: 8,
    eigth: 3,
    playbacks: [],
    currentPlaybackPlayer: null,
  };

  // Initializes the loopboard, if the url contains a saved state then it will load,
  // if the save state is faulty or the url does not contain a save state then it will
  // be initialized in a default state
  componentWillMount() {
    let currentNoteStatus = LoopBoardService.initStatus(8, 12);
    let url = new URL(window.location.href);
    let board = url.searchParams.get('board');
    if (board){
      let playbacksArray = AppService.decodeURL(board);
      let playbacks = [];
      for (let playbackInitObject of playbacksArray) {
        let playbackPlayer = new PlaybackPlayer(
          playbackInitObject.eigth,
          playbackInitObject.cols,
          playbackInitObject.speed,
          playbackInitObject.rows,
          playbackInitObject.noteStatus,
          playbackInitObject.instrument
        );
        playbacks.push(playbackPlayer);
      }

      try {
        this.setState({
          currentNoteStatus: playbacks[0].getNoteStatus(),
          cols: playbacks[0].getCols(),
          rows: playbacks[0].getRows(),
          eigth: playbacks[0].getEigth(),
          speed: playbacks[0].getSpeed(),
          playbacks: playbacks,
          currentPlaybackPlayer: playbacks[0],
          notes: playbacks[0].getNotes()
        });

      } catch (err) {
        this.setInitialState(currentNoteStatus[0]);
      }
    } else {
      this.setInitialState(currentNoteStatus[0]);
    }
  }

  
  // initializes the loopboard in a default state
  setInitialState = (defaultNoteStatus) => {
    this.setState({ currentNoteStatus: defaultNoteStatus });
    let playbackPlayer = new PlaybackPlayer(this.state.eigth, this.state.cols, this.state.speed, this.state.rows, defaultNoteStatus);
    this.setState({ currentPlaybackPlayer: playbackPlayer });
    this.state.playbacks.push(playbackPlayer);
  }

  // passed as prop so the boardIsLooping value can be altered
  setBoardIsLooping = (isLooping) => {
    this.setState({ boardIsLooping: isLooping });
  }

  // passed as prop so the speed value can be altered
  alterSpeed = (speed) => {
    const { currentPlaybackPlayer } = this.state;
    currentPlaybackPlayer.setSpeed(speed);
    this.setState({ speed });
  }

  // alters the eigth and generates the set of notes to play that eigth
  alterEigth = (eigth) => {
    let { currentPlaybackPlayer } = this.state;
    let pitch = Number(eigth);
    this.setState({ eigth: pitch });
    currentPlaybackPlayer.setEigth(pitch);
  }

  // alters the amount of rows in the state
  alterRows = (rows) => {
    const { currentPlaybackPlayer } = this.state;
    this.setState({ rows });
    currentPlaybackPlayer.setRows(rows);
  }

  // alters the amount of cols in the state
  alterCols = (cols) => {
    const { currentPlaybackPlayer } = this.state;
    this.setState({ cols });
    currentPlaybackPlayer.setCols(cols);
  }

  // generates the notes required to play the current pitch (eigth)
  generateNotes = (eigth, rows) => {
    let notes = AppService.generateNotes(eigth, rows);
    this.setState({ notes });
  }

  // changes the currently select playback to edit
  alterCurrentPlaybackPlayer = (playbackPlayer) => {
    this.setState({
      rows: playbackPlayer.getRows(),
      cols: playbackPlayer.getCols(),
      eigth: playbackPlayer.getEigth(),
      speed: playbackPlayer.getSpeed(),
      notes: playbackPlayer.getNotes(),
      currentPlaybackPlayer: playbackPlayer,
      currentNoteStatus: playbackPlayer.getNoteStatus(),
      boardIsLooping: playbackPlayer.getIsLooping()
    });

  }

  // sets the current playbackplayer on the loopboard
  setLoopBoardPlaybackPlayer = (playbackPlayer) => {
    this.setState({ loopBoardPlaybackPlayer: playbackPlayer });
  }

  // adds a new playback that can be edited and played
  addPlayback = () => {
    let { eigth, rows, cols, speed, playbacks } = this.state;
    let initNoteStatus = LoopBoardService.initStatus(rows, cols);
    let playbackPlayer = new PlaybackPlayer(eigth, cols, speed, rows, initNoteStatus[0]);
    playbacks.push(playbackPlayer);
    this.setState({ playbacks: Array.from(playbacks) });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, eigth, currentNoteStatus, playbacks, currentPlaybackPlayer } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings
            playbackPlayer={currentPlaybackPlayer}
            alterSpeed={this.alterSpeed}
            alterEigth={this.alterEigth}
            alterCols={this.alterCols}
            alterRows={this.alterRows}
          />
          <div className="SoundboardContainer">
            <LoopBoard 
              playbackPlayer={currentPlaybackPlayer}
              speed={speed}
              cols={cols}
              rows={rows}
              currentNoteStatus={currentNoteStatus}
              setLoopBoardPlaybackPlayer={this.setLoopBoardPlaybackPlayer}
              setBoardIsLooping={this.setBoardIsLooping}/>
          </div>
          <Playbacks
            playbacks={playbacks}
            addPlayback={this.addPlayback}
            currentPlaybackPlayer={currentPlaybackPlayer}
            alterCurrentPlaybackPlayer={this.alterCurrentPlaybackPlayer}
            boardIsLooping={boardIsLooping}
          />
          <Share 
            songArray={currentNoteStatus}
            rows={rows}
            cols={cols}
            pitch={eigth}
            speed={speed}
            playbacks={playbacks}
            currentPlaybackPlayer={currentPlaybackPlayer}
          />
        </div>
      </main>
    );
  }
}

export default App;
