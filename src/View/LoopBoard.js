import React, { Component } from 'react';
import { loopBoardService } from '../Service/LoopBoardService';
import NoteBox from './NoteBox';
import '../App.css';
import { playSound } from '../Service/SoundBox';
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
    looping: false,
    currentNote: 0
  }

  componentWillMount() {
    this.initStatus();
  }
  
  componentDidUpdate(prevProps) {
    const { speed, rows, cols, alterCurrentNoteStatus, currentNoteStatus } = this.props;
    if (speed !== prevProps.speed && this.state.looping) {
      let interval = this.state.playLoop;
      this.setState({ 
        isPlaying: []
      });
      let playLoop = this.playLoop();
      clearInterval(interval);
      this.setState({ playLoop });
    }
    if (currentNoteStatus !== this.state.noteStatus) {
      this.setState({ noteStatus:currentNoteStatus});
    } else {
      if (rows !== prevProps.rows) {
        let newNoteStatus = loopBoardService.alterRows(this.state.noteStatus, cols, rows, prevProps.rows);
        this.setState({ noteStatus: newNoteStatus });
        alterCurrentNoteStatus(newNoteStatus);
      }
      if (cols !== prevProps.cols) {
        let newNoteStatus = loopBoardService.alterColumns(this.state.noteStatus, cols, prevProps.cols);
        this.setState({ noteStatus: newNoteStatus });
        alterCurrentNoteStatus(newNoteStatus);
      }
    }
  }

  initStatus = () => {
    let { cols, rows, currentNoteStatus, alterCurrentNoteStatus } = this.props;
    let initData = loopBoardService.initStatus(rows, cols);
    this.setState({ isPlaying: initData[1] });
    if(currentNoteStatus){
      this.setState({ noteStatus: currentNoteStatus });
    } else {
      this.setState({ noteStatus: initData[0] });
    }
  }


  // starts the loop if it is not currently active, iterates over the boxes and plays active noteboxes
  startLoop = () => {
    
    this.setState({ looping: !this.state.looping });
    let { cols, speed } = this.props;
    const { notes, rows } = this.props;
    let newIsLooping = [];
    let count = 0;

    // check if the loop is active
    if (this.state.looping) {
      let interval = this.state.playLoop;
      clearInterval(interval);
      this.setState({ 
        isPlaying: newIsLooping,
        currentNote: 0
      });
      return;
    }

    for (let i = 0; i<cols;i++){
      newIsLooping.push(false);
    }

    let playLoop = this.playLoop(speed);
    this.setState({ playLoop });
  }

  playLoop = () => {
    const { notes, cols, speed } = this.props;
    let playLoop = setInterval(() => {
      let rows = this.props.rows;
      let { noteStatus, currentNote } = this.state;
      for (let i = 0; i<rows; i++){
        if (noteStatus[i][currentNote]){
          playSound(this.props.notes[i]);
        }
      }
      
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
    return playLoop;
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
    let startText = this.state.looping? 'Stop':'Start';
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
