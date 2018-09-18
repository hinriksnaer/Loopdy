import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
const Tone = require('tone');

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="SoundboardContainer">
          <PlayableBoard />
          <LoopBoard row={10} cols={10} />
        </div>
        <div className="InfoText">
          <p>Loopdy 0.1.0 created by Hinrik S. Guðmundsson</p>
        </div>
      </div>
    );
  }
}

export default App;
