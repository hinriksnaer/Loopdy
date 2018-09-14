import React, { Component } from 'react';
import './App.css';
const Tone = require('tone');

class App extends Component {

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
  
  addActiveClass = (note, noteClass) => {
    //play sound
    this.playSound(note);
    //alter class to change color
    if(this.state[noteClass+'isActive'] === "Active"){
      this.setState({
        [noteClass+'isActive']: "Inactive"
      })
    } else {
      this.setState({
        [noteClass+'isActive']: "Active"
      })
    }
  }

  playSound = (note) => {
      //create a synth and connect it to the master output (your speakers)
    var synth = new Tone.Synth().toMaster()

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(note, '16n');
  }
  
  render() {
    return (
      <div className="App">
        <div className={"NoteBox"+this.state.c3isActive} onClick={() => this.addActiveClass('c3', 'c3')}></div>
        <div className={"NoteBox"+this.state.d3isActive} onClick={() => this.addActiveClass('d3', 'd3')}></div>
        <div className={"NoteBox"+this.state.e3isActive} onClick={() => this.addActiveClass('e3', 'e3')}></div>
        <div className={"NoteBox"+this.state.f3isActive} onClick={() => this.addActiveClass('f3', 'f3')}></div>
        <div className={"NoteBox"+this.state.g3isActive} onClick={() => this.addActiveClass('g3', 'g3')}></div>
        <div className={"NoteBox"+this.state.a3isActive} onClick={() => this.addActiveClass('a3', 'a3')}></div>
        <div className={"NoteBox"+this.state.b3isActive} onClick={() => this.addActiveClass('b3', 'b3')}></div>
        <div className={"NoteBox"+this.state.c4isActive} onClick={() => this.addActiveClass('c4', 'c4')}></div>
      </div>
    );
  }
}

export default App;
