import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
const Tone = require('tone');

class App extends Component {
  
  render() {
    return (
      <PlayableBoard />
      <LoopBoard />
    );
  }
}

export default App;
