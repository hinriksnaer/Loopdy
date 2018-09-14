import React, { Component } from 'react';
import './App.css';
const Tone = require('tone');

class PlayableBoard extends Component {

  state = {
    c3isActive: "Inactive",
    d3isActive: "Inactive",
    e3isActive: "Inactive",
    f3isActive: "Inactive",
    g3isActive: "Inactive",
    a3isActive: "Inactive",
    b3isActive: "Inactive",
    c4isActive: "Inactive"
  }

  updateNoteClass = (noteClass) => {
    this.setState({
        [noteClass+'isActive']: "Inactive"
      });
  }

  alterClass = (noteClass, status) => {
    this.setState({
        [noteClass+'isActive']: status
      })
  }

  notePressed = (note, status) => {
    //play sound
    this.playSound(note);
    //alter class to change color
    this.alterClass(note, status);
    
  }

  playSound = (note) => {
      //create a synth and connect it to the master output (your speakers)
    var synth = new Tone.Synth().toMaster()

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(note, '16n');
  }
  
  render() {
    return (
      <div className="PlayableBoardContainer">
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.c4isActive} 
            onMouseDown={() => this.notePressed('c4', 'Active')}
            onMouseUp={() => this.alterClass('c4', 'Inactive')}
            onMouseOut={() => this.alterClass('c4', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.b3isActive} 
            onMouseDown={() => this.notePressed('b3', 'Active')}
            onMouseUp={() => this.alterClass('b3', 'Inactive')}
            onMouseOut={() => this.alterClass('b3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.a3isActive} 
            onMouseDown={() => this.notePressed('a3', 'Active')}
            onMouseUp={() => this.alterClass('a3', 'Inactive')}
            onMouseOut={() => this.alterClass('a3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.g3isActive} 
            onMouseDown={() => this.notePressed('g3', 'Active')}
            onMouseUp={() => this.alterClass('g3', 'Inactive')}
            onMouseOut={() => this.alterClass('g3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.f3isActive} 
            onMouseDown={() => this.notePressed('f3', 'Active')}
            onMouseUp={() => this.alterClass('f3', 'Inactive')}
            onMouseOut={() => this.alterClass('f3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.e3isActive} 
            onMouseDown={() => this.notePressed('e3', 'Active')}
            onMouseUp={() => this.alterClass('e3', 'Inactive')}
            onMouseOut={() => this.alterClass('e3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.d3isActive} 
            onMouseDown={() => this.notePressed('d3', 'Active')}
            onMouseUp={() => this.alterClass('d3', 'Inactive')}
            onMouseOut={() => this.alterClass('d3', 'Inactive')}>
        </div>
        <div className={'NoteBox' + ' ' + 'PlayableNoteBox'+this.state.c3isActive} 
            onMouseDown={() => this.notePressed('c3', 'Active')}
            onMouseUp={() => this.alterClass('c3', 'Inactive')}
            onMouseOut={() => this.alterClass('c3', 'Inactive')}>
        </div>
      </div>
    );
  }
}

export default PlayableBoard;