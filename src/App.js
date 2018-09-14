import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
const Tone = require('tone');

class App extends Component {
  
  render() {
    return (
      <div className="SoundboardContainer">
        <PlayableBoard />
        <LoopBoard />
      </div>
    );
  }
}

export default App;
