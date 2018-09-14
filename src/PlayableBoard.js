import React, { Component } from 'react';
import './App.css';
const Tone = require('tone');

class PlayableBoard extends Component {

  state = {
    c3isActive: "Active",
    d3isActive: "Active",
    e3isActive: "Active",
    f3isActive: "Active",
    g3isActive: "Active",
    a3isActive: "Active",
    b3isActive: "Active",
    c4isActive: "Active"
  }

  updateNoteClass = (noteClass) => {
    this.setState({
        [noteClass+'isActive']: "Active"
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
        <div className={'NoteBox' + ' ' + 'PlayableNoteBox'+this.state.c3isActive} 
            onMouseDown={() => this.notePressed('c3', 'Inactive')}
            onMouseUp={() => this.alterClass('c3', 'Active')}
            onMouseOut={() => this.alterClass('c3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.d3isActive} 
            onMouseDown={() => this.notePressed('d3', 'Inactive')}
            onMouseUp={() => this.alterClass('d3', 'Active')}
            onMouseOut={() => this.alterClass('d3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.e3isActive} 
            onMouseDown={() => this.notePressed('e3', 'Inactive')}
            onMouseUp={() => this.alterClass('e3', 'Active')}
            onMouseOut={() => this.alterClass('e3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.f3isActive} 
            onMouseDown={() => this.notePressed('f3', 'Inactive')}
            onMouseUp={() => this.alterClass('f3', 'Active')}
            onMouseOut={() => this.alterClass('f3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.g3isActive} 
            onMouseDown={() => this.notePressed('g3', 'Inactive')}
            onMouseUp={() => this.alterClass('g3', 'Active')}
            onMouseOut={() => this.alterClass('g3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.a3isActive} 
            onMouseDown={() => this.notePressed('a3', 'Inactive')}
            onMouseUp={() => this.alterClass('a3', 'Active')}
            onMouseOut={() => this.alterClass('a3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.b3isActive} 
            onMouseDown={() => this.notePressed('b3', 'Inactive')}
            onMouseUp={() => this.alterClass('b3', 'Active')}
            onMouseOut={() => this.alterClass('b3', 'Active')}>
        </div>
        <div className={'NoteBox' + ' ' + "PlayableNoteBox"+this.state.c4isActive} 
            onMouseDown={() => this.notePressed('c4', 'Inactive')}
            onMouseUp={() => this.alterClass('c4', 'Active')}
            onMouseOut={() => this.alterClass('c4', 'Active')}>
        </div>
      </div>
    );
  }
}

export default PlayableBoard;