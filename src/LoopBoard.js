import React, { Component } from 'react';
import NoteBox from './NoteBox';
import './App.css';
import { playSound } from './SoundBox';
import PropTypes from 'prop-types';

class LoopBoard extends Component {
  
  static propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    notes: PropTypes.array,
    speed: PropTypes.number
  }

  state = {
    looping: false,
    currentNote: 0
  }

  componentWillMount() {
    const { cols, rows } = this.props;
    let noteStatus = [];
    let falseInit = [];
    let isPlaying = [];
    for (let i = 0; i<cols;i++){
      falseInit.push(false);
      isPlaying.push(false);
    }
    for (let i = 0; i<rows; i++){
      noteStatus.push(falseInit.slice());
    }
    this.setState({ noteStatus, isPlaying })
  }
  
  componentDidUpdate(prevProps) {
    const { speed, notes } = this.props;
    if (speed !== prevProps.speed && this.state.looping) {
      let interval = this.state.playLoop;
      this.setState({ 
        isPlaying: []
      });
      let playLoop = this.playLoop();
      clearInterval(interval);
      this.setState({ playLoop })
    }
  }

  // starts the loop if it is not currently active, iterates over the boxes and plays active noteboxes
  startLoop = () => {
    
    this.setState({ looping: !this.state.looping })
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
    this.setState({ playLoop })
  }

  playLoop = () => {
    const { notes, rows, cols, speed } = this.props;
    let playLoop = setInterval(() => {
      
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
      this.setState({ currentNote })
    }, speed);
    return playLoop;
  }

  // toggles whether or not a notebox is active or not
  alterActiveState = (row, column) => {
    let { noteStatus } = this.state;
    if (noteStatus[row][column]){
      noteStatus[row][column] = false;
      this.setState({ noteStatus });
    } else {
      noteStatus[row][column] = true;
      this.setState({ noteStatus });
    }
  }

  // generates row of noteboxes
  generateNoteBoxRow = (row, noteStatus, isPlaying) => {
    let notes = [];
    const { cols } = this.props;
    for(let i = 0; i<cols; i++) {
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
    for (let i = 0; i<noRows;i++){
      noteRow.push(
      <div className='NoteRow'>
        {this.generateNoteBoxRow(noRows-1-i, noteStatus, isPlaying)}
      </div>);
    }
    return noteRow;
  }


  render() {
    let { rows } = this.props;
    let startText = this.state.looping? "Stop":"Start";
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
