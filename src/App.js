import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
const Tone = require('tone');

class App extends Component {
  
  render() {

    let notes = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4'];

    return (
      <div>
        <div className="SoundboardContainer">
          <PlayableBoard notes={notes}/>
          <LoopBoard cols={12} rows={8} notes={notes}/>
        </div>
        <div className="InfoText">
          <p>Loopdy 0.1.0 created by Hinrik S. Guðmundsson</p>
        </div>
      </div>
    );
  }
}

export default App;
