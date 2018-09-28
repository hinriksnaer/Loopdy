import React, { Component } from 'react';
import './App.css';
const Tone = require('tone');

class NoteBox extends Component {
  /*
  static propTypes = {
      isPLaying: PropTypes.bool,
      onClick: PropTypes.func
    }
  */

  generateNoteBoxClass = (noteStatus, isPlaying) => {
    let status = "Inactive";
    let playing = "NoteIsPlaying";
    if (noteStatus) {
      status = "Active";
    } 
    if (!isPlaying) {
      playing = "NoteNotPlaying";
    } 
    return 'NoteBox '+"PlayableNoteBox"+status + ' ' + playing;
  }

  render() {
      const { isActive, isPlaying, onClick, x, y } = this.props;
      return (
          <div className={this.generateNoteBoxClass(isActive, isPlaying)} onClick={() => onClick(x,y)}></div>
      )
  } 
}

export default NoteBox;