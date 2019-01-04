import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class BoardSettings extends Component {

  static propTypes = {
    playbackPlayer: PropTypes.object,
  }

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

  handlePitchChange = (newPitch) => {
    if (newPitch < 0 || newPitch > 7) return;
    let { alterEigth } = this.props;
    this.setState({ eigth: newPitch});
    alterEigth(newPitch);
  }

  handleInstrumentChange = (event) => {
    const { playbackPlayer } = this.props;
    playbackPlayer.setInstrument(event.target.value);
    this.setState({ instrument: event.target.value });
  }

  applyRowChange = (newRows) => {
    if (newRows < 1 || newRows > 12) return;
    this.setState({ rows: Number(newRows) });
    if(0 < newRows && newRows < 19) {
      let { alterRows } = this.props;
      alterRows(Number(newRows));
    }
  }

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
          <select value={instrument} onChange={this.handleInstrumentChange}>
            <option value="basic">Basic</option>
            <option value="fm">FM</option>
            <option value="duo">Duo</option>
            <option value="mono">Mono (WARNING LOUD)</option>
            <option value="pluck">Pluck</option>
          </select>
        </div>
        <div className="InputContainer">
          <label>Rows:<input type="number" value={this.state.rows} disabled={'true'}></input></label>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows-1)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows+1)}>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Columns:<input type="number" value={this.state.cols} disabled={'true'}></input></label>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols-1)}>
            <img src={ require('../img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols+1)}>
            <img src={ require('../img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Pitch:<input type="number" value={this.state.eigth} disabled={'true'}></input></label>
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
