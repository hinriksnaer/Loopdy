import React, { Component } from 'react';
import NoteBox from './NoteBox';
import './App.css';
import { playSound } from './SoundBox';

class LoopBoard extends Component {
  
  state = {
    isPlaying: [false, false, false, false],
    looping: false
  }

  componentWillMount() {
    const { cols, rows } = this.props;
    let noteStatus = [];
    let falseInit = [];
    for (let i = 0; i<cols;i++){
      falseInit.push(false);
    }
    for (let i = 0; i<rows; i++){
      noteStatus.push(falseInit.slice());
    }
    this.setState({ noteStatus })

  }

  // starts the loop if it is not currently active, iterates over the boxes and plays active noteboxes
  startLoop = () => {
    let { cols } = this.props;
    this.setState({ looping: !this.state.looping })
    let newIsLooping = [];
    for (let i = 0; i<cols;i++){
      newIsLooping.push(false);
    }
    if (this.state.looping) {
      let interval = this.state.playLoop;
      clearInterval(interval);
      this.setState({ isPlaying: newIsLooping })
      return;
    }
    let count = 0;
    const notes = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4'];
    let playLoop = setInterval(() => {
    
      let noteStatus = this.state.noteStatus;

      for (let i = 0; i<8; i++){
        if (noteStatus[i][count] == true){
          playSound(notes[i]);
        }
      }
      
      let { cols } = this.props;
      let newIsLooping = [];
      for (let i = 0; i<cols;i++){
        newIsLooping.push(false);
      }
      newIsLooping[count] = true;
      this.setState({ isPlaying: newIsLooping });
      count++;
      if(count >= cols){
        count = 0;
      }
    }, 200);
    this.setState({ playLoop: playLoop })
  }

  // toggles wether or not a notebox is active or not
  alterActiveState = (row, column) => {
    let { noteStatus } = this.state;
    if (noteStatus[row][column] === true){
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