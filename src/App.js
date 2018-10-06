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
    rows: 8,
    eigth: 3,
  }

  componentWillMount() {
    this.generateNotes(this.state.eigth);
  }

  // converts bpm to speed and sets it
  alterSpeed = (speed) => {
    this.setState({ speed });
  }

  alterEigth = (eigth) => {
    this.setState({ eigth });
    this.generateNotes(eigth);
  }

  generateNotes = (eigth) => {
    eigth = Number(eigth);
    let { rows } = this.state;
    let dur = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    let notes = [];
    let listpos = 0;
    for (let i = 0; i<rows; i++) {
      if (i > 0 && i%7 === 0) {
        eigth += 1;
        listpos += 7;
      }
      notes.push(dur[i-listpos]+eigth.toString());
    }
    console.log(notes);
    this.setState({ notes });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings eigth={eigth} alterEigth={this.alterEigth} speed={speed} alterSpeed={this.alterSpeed}/>
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
