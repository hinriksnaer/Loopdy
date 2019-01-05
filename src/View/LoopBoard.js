import React, { Component } from 'react';
import NoteBox from './NoteBox';
import '../App.css';
import PropTypes from 'prop-types';


class LoopBoard extends Component {

  static propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    notes: PropTypes.array,
    speed: PropTypes.number,
    noteStatus: PropTypes.array,
  }

  state = {
    currentNote: 0,
    isPlaying: []
  }

  componentWillMount() {
    const { playbackPlayer } = this.props;
    this.setState({
      isLooping: playbackPlayer.getIsLooping(),
      noteStatus: playbackPlayer.getNoteStatus(),

    });
  }

  componentDidUpdate(prevProps) {
    const { playbackPlayer, speed, currentNoteStatus } = this.props;
    const { playLoop } = this.state;

    if (playbackPlayer !== prevProps.playbackPlayer) {
      const { playLoop } = this.state;
      clearInterval(playLoop);
      if (!playbackPlayer.getIsLooping() && prevProps.playbackPlayer.getIsLooping()) {
        clearInterval(playLoop);
        this.setState({
          isPlaying: [],
          isLooping: playbackPlayer.getIsLooping(),
          currentNote: 0
        });
      }
      if (playbackPlayer.getIsLooping() && !prevProps.playbackPlayer.getIsLooping()) {
        this.setState({ isLooping: true });
      }

      if (playbackPlayer.getIsLooping()) {
        playbackPlayer.syncStartLoopboard(this.playLoopFromPos);
      }
      if (currentNoteStatus !== this.state.noteStatus) {
        this.setState({ noteStatus:currentNoteStatus});
      }
    } else {
      
      // check for speed
      if (speed !== prevProps.speed && playbackPlayer.getIsLooping()) {
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
  
    }


  }

  // starts the loop if it is not currently active, iterates over the boxes and plays active noteboxes
  startLoop = () => {
    let { playbackPlayer, setBoardIsLooping } = this.props;
    const { isLooping } = this.state;
    let newIsLooping = [];

    this.setState({ isLooping: !isLooping });

    // check if the loop is active
    if (isLooping) {
      let { playLoop } = this.state;
      clearInterval(playLoop);
      setBoardIsLooping(false);
      playbackPlayer.stopLoop();
      this.setState({
        isPlaying: newIsLooping,
        currentNote: 0
      });
      return;
    }

    for (let i = 0; i<playbackPlayer.getCols();i++){
      newIsLooping.push(false);
    }
    setBoardIsLooping(true);
    this.playLoop();
  }

  playLoop = () => {
    const { playbackPlayer } = this.props;
    let playLoop = setInterval(() => {
      let { currentNote } = this.state;

      let newIsLooping = [];

      newIsLooping[currentNote] = true;
      this.setState({ isPlaying: newIsLooping });
      currentNote++;
      if(currentNote >= playbackPlayer.getCols()){
        currentNote = 0;
      }
      this.setState({ currentNote });
    }, playbackPlayer.getSpeed());

    this.setState({ playLoop });
  }

  playLoopFromPos = (pos) => {
    const { playbackPlayer } = this.props;
    let playLoop = setInterval(() => {

      let newIsLooping = [];

      newIsLooping[pos] = true;
      this.setState({ isPlaying: newIsLooping });
      pos++;
      if(pos >= playbackPlayer.getCols()){
        pos = 0;
      }
      this.setState({ currentNote: pos });
    }, playbackPlayer.getSpeed());

    this.setState({ playLoop });
  }

  // toggles whether or not a notebox is active or not
  alterActiveState = (row, column) => {
    let { playbackPlayer } = this.props;
    playbackPlayer.toggleNote(row, column);
    this.setState({ noteStatus: playbackPlayer.getNoteStatus() });
  }

  // generates row of noteboxes
  generateNoteBoxRow = (row, noteStatus, isPlaying) => {
    let notes = [];
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
  generateNoteBoxes = ( noteStatus, isPlaying ) => {
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
    const { isLooping, noteStatus, isPlaying } = this.state;
    let startText = isLooping? 'Stop':'Start';
    return (
      <div className="LoopBoardContainer">
        {this.generateNoteBoxes( noteStatus, isPlaying)}
        <button onClick={() => this.startLoop()}>{startText}</button>
      </div>
    );
  }
}

export default LoopBoard;
