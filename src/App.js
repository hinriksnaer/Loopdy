import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
import BoardSettings from './BoardSettings';
const Tone = require('tone');

class App extends Component {
  
  state = {
    speed: 200,
    boardIsLooping: false,
    cols: 12,
    rows: 8
  }

  // converts bpm to speed and sets it
  alterSpeed = (speed) => {
    this.setState({ speed });
  }

  render() {

    let notes = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4'];
    let { speed, boardIsLooping, cols, rows } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings speed={speed} alterSpeed={this.alterSpeed}/>
          <div className="SoundboardContainer">
            <PlayableBoard notes={notes}/>
            <LoopBoard cols={cols} rows={rows} notes={notes} speed={speed} boardIsLooping={boardIsLooping}/>
          </div>
          <div className="InfoText">
            <p>Loopdy 0.2.0 created by Hinrik S. Guðmundsson</p>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
