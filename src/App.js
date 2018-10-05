import React, { Component } from 'react';
import './App.css';
import LoopBoard from './LoopBoard';
import PlayableBoard from './PlayableBoard';
import BoardSettings from './BoardSettings';
const Tone = require('tone');

class App extends Component { 
  state = {
    speed: 200
  }

  alterSpeed = (speed) => {
    this.setState({ speed });
  }

  render() {

    let notes = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4'];
    let { speed } = this.state;
    return (
      <main>
        <div className="BoardContainer">
          <div className="SoundboardContainer">
            <PlayableBoard notes={notes}/>
            <LoopBoard cols={12} rows={8} notes={notes} speed={speed}/>
          </div>
          <div className="InfoText">
            <p>Loopdy 0.1.0 created by Hinrik S. Guðmundsson</p>
          </div>
        </div>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>{`
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-6855375666493546",
            enable_page_level_ads: true
          });`}
        </script>
      </main>
    );
  }
}

export default App;
