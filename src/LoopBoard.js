import React, { Component } from 'react';
import './App.css';
const Tone = require('tone');

class LoopBoard extends Component {
  
  state = {
    noteStatus: [
      ['Inactive', 'Inactive', 'Inactive', 'Inactive'],
      ['Inactive', 'Inactive', 'Inactive', 'Inactive'],
      ['Inactive', 'Inactive', 'Inactive', 'Inactive']],
    isPlaying: ['NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying'],
    looping: false
  }

  playSound = (note) => {
      //create a synth and connect it to the master output (your speakers)
    var synth = new Tone.Synth().toMaster()

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(note, '16n');
  }

  startLoop = () => {
    this.setState({ looping: !this.state.looping })
    let newIsLooping = ['NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying'];
    if (this.state.looping) {
      let interval = this.state.playLoop;
      clearInterval(interval);
      this.setState({ isPlaying: newIsLooping })
      return;
    }
    let count = 0;
    let playLoop = setInterval(() => {
      let newIsLooping = ['NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying', 'NoteNotPlaying'];
      newIsLooping[count] = 'NoteIsPlaying';
      this.setState({ isPlaying: newIsLooping });
      let noteStatus = this.state.noteStatus;
      let noteList = [noteStatus[0][count], noteStatus[1][count], noteStatus[2][count]];
      
      if(noteStatus[0][count] == 'Active'){
        this.playSound('f3');
      }
      if(noteStatus[1][count] == 'Active'){
        this.playSound('e3');
      }
      if(noteStatus[2][count] == 'Active'){
        this.playSound('c3');
      }
      count++;
      if(count > 3){
        count = 0;
      }
    }, 150);
    this.setState({ playLoop: playLoop })
  }

  alterActiveState = (row, column) => {
    let { noteStatus } = this.state;
    if (noteStatus[row][column] == 'Active'){
      noteStatus[row][column] = 'Inactive';
      this.setState({ noteStatus });
    } else {
      noteStatus[row][column] = 'Active';
      this.setState({ noteStatus });
    }
  }

  render() {
    let startText = this.state.looping? "Stop":"Start";
    return (
      <div className="LoopBoardContainer">
        <div className='NoteRow'>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[0][0] + ' ' + this.state.isPlaying[0]} onClick={() => this.alterActiveState(0,0)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[0][1] + ' ' + this.state.isPlaying[1]} onClick={() => this.alterActiveState(0,1)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[0][2] + ' ' + this.state.isPlaying[2]} onClick={() => this.alterActiveState(0,2)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[0][3] + ' ' + this.state.isPlaying[3]} onClick={() => this.alterActiveState(0,3)}></div>
        </div>
          <div className='NoteRow'>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[1][0] + ' ' + this.state.isPlaying[0]} onClick={() => this.alterActiveState(1,0)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[1][1] + ' ' + this.state.isPlaying[1]} onClick={() => this.alterActiveState(1,1)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[1][2] + ' ' + this.state.isPlaying[2]} onClick={() => this.alterActiveState(1,2)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[1][3] + ' ' + this.state.isPlaying[3]} onClick={() => this.alterActiveState(1,3)}></div>
        </div>
        <div className='NoteRow'>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[2][0] + ' ' + this.state.isPlaying[0]} onClick={() => this.alterActiveState(2,0)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[2][1] + ' ' + this.state.isPlaying[1]} onClick={() => this.alterActiveState(2,1)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[2][2] + ' ' + this.state.isPlaying[2]} onClick={() => this.alterActiveState(2,2)}></div>
          <div className={'NoteBox '+"PlayableNoteBox"+this.state.noteStatus[2][3] + ' ' + this.state.isPlaying[3]} onClick={() => this.alterActiveState(2,3)}></div>
        </div>
        <button onClick={() => this.startLoop()}>{startText}</button>
      </div>
    );
  }
}

export default LoopBoard;