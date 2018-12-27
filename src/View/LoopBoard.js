import React, { Component } from 'react';
import { LoopBoardService } from '../Service/LoopBoardService';
import NoteBox from './NoteBox';
import '../App.css';
import { PlaybackPlayer } from '../Service/PlaybackPlayer';
import PropTypes from 'prop-types';

class LoopBoard extends Component {
  
  static propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    notes: PropTypes.array,
    speed: PropTypes.number,
    noteStatus: PropTypes.array,
    alterCurrentNoteStatus: PropTypes.func
  }

  state = {
    currentNote: 0,
  }

  componentWillMount() {
    this.initStatus();
  }
  
  componentDidUpdate(prevProps) {
    const { speed, rows, cols, alterCurrentNoteStatus, currentNoteStatus, notes } = this.props;
    const { playbackPlayer, playLoop } = this.state;
    if (speed !== prevProps.speed && this.props.boardIsLooping) {
      this.setState({ 
        isPlaying: []
      });
      playbackPlayer.pauseLoop();
      clearInterval(playLoop);
      playbackPlayer.setSpeed(speed);
      playbackPlayer.startLoop();
      this.playLoop();
    } else if (speed !== prevProps.speed) {
      playbackPlayer.setSpeed(speed);
    }
    if (notes !== prevProps.notes) {
      playbackPlayer.setNotes(notes);
    }
    if (currentNoteStatus !== this.state.noteStatus) {
      this.setState({ noteStatus:currentNoteStatus});
      playbackPlayer.setNoteStatus(currentNoteStatus)
    } else {
      if (rows !== prevProps.rows) {
        let newNoteStatus = LoopBoardService.alterRows(this.state.noteStatus, cols, rows, prevProps.rows);
        this.setState({ noteStatus: newNoteStatus });
        alterCurrentNoteStatus(newNoteStatus);
        playbackPlayer.setRows(rows);
        playbackPlayer.setNotes(notes);
      }
      if (cols !== prevProps.cols) {
        let newNoteStatus = LoopBoardService.alterColumns(this.state.noteStatus, cols, prevProps.cols);
        this.setState({ noteStatus: newNoteStatus });
        alterCurrentNoteStatus(newNoteStatus);
        playbackPlayer.setCols(cols);
      }
    }
  }

  initStatus = () => {
    let { cols, rows, notes, currentNoteStatus, speed, setLoopBoardPlaybackPlayer } = this.props;
    let initData = LoopBoardService.initStatus(rows, cols);
    this.setState({ isPlaying: initData[1] });
    if(currentNoteStatus){
      this.setState({ noteStatus: currentNoteStatus });
    } else {
      this.setState({ noteStatus: initData[0] });
    }
    let playbackPlayer = PlaybackPlayer(notes, cols, speed, rows, currentNoteStatus);
    if (playbackPlayer) setLoopBoardPlaybackPlayer(playbackPlayer);
    this.setState({ playbackPlayer })
  }

  // starts the loop if it is not currently active, iterates over the boxes and plays active noteboxes
  startLoop = () => {
    let { cols, speed, setBoardIsLooping, boardIsLooping } = this.props;
    let { playbackPlayer } = this.state;
    let newIsLooping = [];
    setBoardIsLooping(!boardIsLooping);
    
    // check if the loop is active
    if (boardIsLooping) {
      let { playLoop, playbackPlayer } = this.state;
      clearInterval(playLoop);
      playbackPlayer.stopLoop();
      this.setState({ 
        isPlaying: newIsLooping,
        currentNote: 0
      });
      return;
    }
    
    
    for (let i = 0; i<cols;i++){
      newIsLooping.push(false);
    }
    this.playLoop(speed);
  }
  
  playLoop = () => {
    const { speed } = this.props;
    let playLoop = setInterval(() => {
      let { currentNote } = this.state;

      let { cols } = this.props;
      let newIsLooping = [];
      for (let i = 0; i<cols;i++){
        newIsLooping.push(false);
      }
      newIsLooping[currentNote] = true;
      this.setState({ isPlaying: newIsLooping });
      currentNote++;
      if(currentNote >= cols){
        currentNote = 0;
      }
      this.setState({ currentNote });
    }, speed);
    
    this.setState({ playLoop });
  }

  // toggles whether or not a notebox is active or not
  alterActiveState = (row, column) => {
    let { noteStatus } = this.state;
    let { alterCurrentNoteStatus } = this.props;
    if (noteStatus[row][column]){
      noteStatus[row][column] = false;
      this.setState({ noteStatus });
      alterCurrentNoteStatus(noteStatus);
    } else {
      noteStatus[row][column] = true;
      this.setState({ noteStatus });
      alterCurrentNoteStatus(noteStatus);
    }
  }

  // generates row of noteboxes
  generateNoteBoxRow = (row, noteStatus, isPlaying) => {
    let notes = [];
    const { cols } = this.props;
    for(let i = 0; i<noteStatus[0].length; i++) {
      notes.push(
        <NoteBox 
          isActive={noteStatus[row][i]}
          isPlaying={isPlaying[i]}
          onClick={this.alterActiveState}
          x={row}
          y={i}
        />);
    }
    return notes;
  }

  // Generates all noteboxes for board
  generateNoteBoxes = ( noRows, noteStatus, isPlaying ) => {
    const noteRow = [];
    for (let i = 0; i<noteStatus.length;i++){
      noteRow.push(
        <div className='NoteRow'>
          {this.generateNoteBoxRow(noteStatus.length-1-i, noteStatus, isPlaying)}
        </div>);
    }
    return noteRow;
  }

  render() {
    let { rows } = this.props;
    let startText = this.props.boardIsLooping? 'Stop':'Start';
    let noteStatus = this.state.noteStatus;
    let isPlaying = this.state.isPlaying;
    return (
      <div className="LoopBoardContainer">
        {this.generateNoteBoxes( rows, noteStatus, isPlaying)}
        <button onClick={() => this.startLoop()}>{startText}</button>
      </div>
    );
  }
}

export default LoopBoard;
