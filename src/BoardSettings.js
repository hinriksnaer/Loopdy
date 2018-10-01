import React, { Component } from 'react';
import NoteBox from './NoteBox';
import './App.css';
import { playSound } from './SoundBox';

class BoardSettings extends Component {

  state = {
    speed: this.props.speed
  }

  speedAltered = (event) => {
    let { alterSpeed } = this.props;
    this.setState({ speed: event.target.value });
    alterSpeed(event.target.value);
  }  

  render() {
    return (
      <div className="MenuContainer">
        <div>
            <label>Speed:<input type="number" value={this.state.speed} onChange={this.speedAltered}></input></label>
        </div>
      </div>
    );
  }
}

export default BoardSettings;