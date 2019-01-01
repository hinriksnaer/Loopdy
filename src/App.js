import React, { Component } from 'react';
import './App.css';
import LoopBoard from './View/LoopBoard';
import PlayableBoard from './View/PlayableBoard';
import BoardSettings from './View/BoardSettings';
import Share from './View/Share';
import Playbacks from './View/Playbacks';
import { AppService,  } from './Service/AppService';
import { LoopBoardService } from './Service/LoopBoardService';
import PlaybackPlayer from './Service/PlaybackPlayer';

class App extends Component {

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
      let stateObject = AppService.decodeURL(board);
      try {
        this.setState({ 
          currentNoteStatus: stateObject.songArray,
          cols: stateObject.col,
          rows: stateObject.row,
          eigth: stateObject.pitch,
          speed: stateObject.speed,
          playbacks: stateObject.playbacks,
          currentPlaybackPlayer: stateObject.currentPlaybackPlayer,
        });
        this.generateNotes(stateObject.pitch, stateObject.row);

      } catch (err) {
        this.setInitialState(currentNoteStatus[0]);
      }
    } else {
      this.setInitialState(currentNoteStatus[0]);
    }

    let playbackPlayer = new PlaybackPlayer(this.state.eigth, this.state.cols, this.state.speed, this.state.rows, currentNoteStatus[0]);
    this.setState({ currentPlaybackPlayer: playbackPlayer });
    this.state.playbacks.push(playbackPlayer);
  }

  setBoardIsLooping = (isLooping) => {
    this.setState({ boardIsLooping: isLooping });
  }

  // initializes the loopboard in a default state
  setInitialState = (defaultNoteStatus) => {
    this.setState({ currentNoteStatus: defaultNoteStatus });
    this.generateNotes(this.state.eigth, this.state.rows);
  }

  // Function passed as prop so the notestatus can be altered
  alterCurrentNoteStatus = (noteStatus) => {
    const { currentPlaybackPlayer } = this.state;
    let newNoteStatus = noteStatus;
    this.setState({ currentNoteStatus: newNoteStatus });
    currentPlaybackPlayer.setNoteStatus(newNoteStatus);
  }

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
    this.setState({ rows });
    this.generateNotes(this.state.eigth, rows);
    this.alterCurrentPlayback('rows', rows);
  }

  // alters the amount of cols in the state
  alterCols = (cols) => {
    this.setState({ cols });
    this.alterCurrentPlayback('cols', cols);
  }

  // generates the notes required to play the current pitch (eigth)
  generateNotes = (eigth, rows) => {
    let notes = AppService.generateNotes(eigth, rows);
    this.setState({ notes });
  }

  // changes the currently select playback to edit
  alterCurrentlyPlaying = (obj) => {
    let { rows, cols, eigth, speed, noteStatus, currentPlaybackPlayer} = obj;
    let notes = AppService.generateNotes(eigth, rows);
    this.setState({
      rows,
      cols,
      eigth,
      speed,
      notes,
      currentPlaybackPlayer: currentPlaybackPlayer,
      currentNoteStatus: noteStatus
    });

  }

  // sets the current playbackplayer on the loopboard
  setLoopBoardPlaybackPlayer = (playbackPlayer) => {
    this.setState({ loopBoardPlaybackPlayer: playbackPlayer })
  }

  // adds a new playback that can be edited and played
  addPlayback = () => {
    let { eigth, rows, cols, speed, playbacks } = this.state;
    let initNoteStatus = LoopBoardService.initStatus(rows, cols);
    let playbackPlayer = new PlaybackPlayer(eigth, cols, speed, rows, initNoteStatus)
    playbacks.push(playbackPlayer);
    this.setState({ playbacks: Array.from(playbacks) });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth, currentNoteStatus, playbacks, currentPlaybackPlayer, loopBoardPlaybackPlayer } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings 
            playbackPlayer={currentPlaybackPlayer}
            alterSpeed={this.alterSpeed}
            alterEigth={this.alterEigth}
            />
          <div className="SoundboardContainer">
            <PlayableBoard 
              notes={notes}/>
            <LoopBoard 
              playbackPlayer={currentPlaybackPlayer}
              speed={speed}
              currentNoteStatus={currentNoteStatus}
              alterCurrentNoteStatus={this.alterCurrentNoteStatus}
              setLoopBoardPlaybackPlayer={this.setLoopBoardPlaybackPlayer}
              setBoardIsLooping={this.setBoardIsLooping}/>
          </div>
          <Playbacks
            playbacks={playbacks}
            addPlayback={this.addPlayback}
            currentPlaybackPlayer={currentPlaybackPlayer}
            alterCurrentlyPlaying={this.alterCurrentlyPlaying}
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
        <div className="InfoText">
          <p>Loopdy 0.2.0 created by Hinrik S. Guðmundsson</p>
        </div>
      </main>
    );
  }
}

export default App;
