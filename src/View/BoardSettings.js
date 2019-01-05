import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class BoardSettings extends Component {

  static propTypes = {
    playbackPlayer: PropTypes.object,
    alterSpeed: PropTypes.func,
    alterEigth: PropTypes.func,
    alterCols: PropTypes.func,
    alterRows: PropTypes.func
  }

  // states
  // speed: current speed on settings
  // rows: current row on settings 
  // cols: current col on settings
  // eigth: current eigth on settings
  // instrument: current instrument on settings

  componentWillMount() {
    const { playbackPlayer } = this.props;
    let speed = 60000/playbackPlayer.getSpeed();
    this.setState({
      speed,
      rows: playbackPlayer.getRows(),
      cols: playbackPlayer.getCols(),
      eigth: playbackPlayer.getEigth(),
      instrument: playbackPlayer.getInstrument()
    });
  }

  componentDidUpdate(prevProps) {
    const { playbackPlayer } = this.props;
    if (prevProps.playbackPlayer.getRows() !== playbackPlayer.getRows()) {
      this.setState({ rows: playbackPlayer.getRows() });
    }
    if (prevProps.playbackPlayer.getCols() !== playbackPlayer.getCols()) {
      this.setState({ cols: playbackPlayer.getCols() });
    }
    if (prevProps.playbackPlayer.getEigth() !== playbackPlayer.getEigth()) {
      this.setState({ eigth: playbackPlayer.getEigth() });
    }
    if (prevProps.playbackPlayer.getSpeed() !== playbackPlayer.getSpeed()) {
      this.setState({ speed: 60000/playbackPlayer.getSpeed() });
    }
    if (prevProps.playbackPlayer.getInstrument() !== playbackPlayer.getInstrument()) {
      this.setState({ instrument: playbackPlayer.getInstrument() });
    }
  }

  // Called to handle when the speed is changed
  handleSpeedChange = (change) => {
    let { speed } = this.state;
    let { alterSpeed } = this.props;
    let newSpeed = speed+change;
    if (newSpeed <= 1500 && newSpeed >= 25) {
      this.setState({speed: newSpeed});
      let convertedSpeed = 60000/newSpeed;
      alterSpeed(convertedSpeed);
    }
  }

  // called to handle when the pitch is changed
  handlePitchChange = (newPitch) => {
    if (newPitch < 0 || newPitch > 7) return;
    let { alterEigth } = this.props;
    this.setState({ eigth: newPitch});
    alterEigth(newPitch);
  }

  // called to handle when the instrument is changed
  handleInstrumentChange = (event) => {
    const { playbackPlayer } = this.props;
    playbackPlayer.setInstrument(event.target.value);
    this.setState({ instrument: event.target.value });
  }

  // called to handle when the row is changed
  applyRowChange = (newRows) => {
    if (newRows < 1 || newRows > 12) return;
    this.setState({ rows: Number(newRows) });
    if(0 < newRows && newRows < 19) {
      let { alterRows } = this.props;
      alterRows(Number(newRows));
    }
  }

  // called to handle when the col is changed
  applyColumnChange = (newCols) => {
    if (newCols < 1 || newCols > 20) return;
    this.setState({ cols: Number(newCols) });
    let { alterCols } = this.props;
    alterCols(Number(newCols));
  }

  render() {
    let { rows, cols, speed, instrument } = this.state;
    let { playbackPlayer } = this.props;
    return (
      <div className="MenuContainer">
        <div className="InputContainer">
          <label>Synth:
            <select value={instrument} onChange={this.handleInstrumentChange}>
              <option value="basic">Basic</option>
              <option value="fm">FM</option>
              <option value="duo">Duo</option>
              <option value="mono">Mono (WARNING LOUD)</option>
              <option value="pluck">Pluck</option>
            </select>
          </label>
        </div>
        <div className="InputContainer">
          <label>Rows: {this.state.rows}</label>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows-1)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows+1)}>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Columns: {this.state.cols}</label>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols-1)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols+1)}>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Pitch: {this.state.eigth}</label>
          <div className="MenuIconContainer" onClick={() => this.handlePitchChange(playbackPlayer.getEigth()-1)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.handlePitchChange(playbackPlayer.getEigth()+1)}>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Notes per minute: {speed}</label>
          <div className="MenuIconContainer" onClick={() => this.handleSpeedChange(-25)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.handleSpeedChange(25) }>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardSettings;
