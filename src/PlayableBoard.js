import React, { Component } from 'react';
import './App.css';
import { playSound } from './SoundBox';
import PropTypes from 'prop-types';

class PlayableBoard extends Component {

  static propTypes = {
    notes: PropTypes.array
  }
  
  componentWillMount() {
    const { notes } = this.props;
    let noteStatus = [];
    for (let i = 0; i<notes.length;i++){
      noteStatus.push(false);
    }
    this.setState({ noteStatus });
  }

  activateNote = (notePlacement, note) => {
    let { noteStatus } = this.state;
    noteStatus[notePlacement] = true;
    this.setState({
      noteStatus: noteStatus
    });
    playSound(note);
  }

  deactivateNote = (notePlacement) => {
    let { noteStatus } = this.state;
    noteStatus[notePlacement] = false;
    this.setState({
      noteStatus: noteStatus
    });
  }

  checkNote = (notePlacement) => {
    let { noteStatus } = this.state;
    if (noteStatus[notePlacement] === true) return 'Active';
    else return 'Inactive';
  }

  generatePlayableBoard = () => {
    let { notes } = this.props;
    let board = [];
    for (let i = 0; i < notes.length;i++){
      board.push(
        <div className={'NoteBox' + ' ' + 'PlayableNoteBox'+this.checkNote(notes.length-i-1)} 
          onMouseDown={() => this.activateNote(notes.length-i-1, notes[notes.length-i-1])}
          onMouseUp={() => this.deactivateNote(notes.length-i-1)}
          onMouseOut={() => this.deactivateNote(notes.length-i-1)}>
        </div>
      );
    }
    return board;
  }
  
  render() {
    return (
      <div className="PlayableBoardContainer">
        {this.generatePlayableBoard()}
      </div>
    );
  }
}

export default PlayableBoard;
