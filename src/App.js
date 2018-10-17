import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
import BoardSettings from './BoardSettings';
import { appService } from './AppService';

class App extends Component {
  
  state = {
    speed: 200,
    boardIsLooping: false,
    cols: 12,
    rows: 8,
    eigth: 3
  };

  componentWillMount() {
    this.generateNotes(this.state.eigth, this.state.rows);
  }

  // converts bpm to speed and sets it
  alterSpeed = (speed) => {
    this.setState({ speed });
  }

  alterEigth = (eigth) => {
    let { rows } = this.state;
    let pitch = Number(eigth);
    this.setState({ eigth: pitch });
    this.generateNotes(pitch, rows);
  }

  alterRows = (rows) => {
    this.setState({ rows });
    this.generateNotes(this.state.eigth, rows);
  }

  alterCols = (cols) => {
    this.setState({ cols });
  }

  generateNotes = (eigth, rows) => {
    let notes = appService.generateNotes(eigth, rows);
    this.setState({ notes });
  }

  render() {
    let { speed, boardIsLooping, cols, rows, notes, eigth } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <BoardSettings rows={rows} alterRows={this.alterRows} cols={cols} alterCols={this.alterCols} eigth={eigth} alterEigth={this.alterEigth} speed={speed} alterSpeed={this.alterSpeed}/>
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
