import React, { Component } from 'react';
import NoteBox from './NoteBox';
import './App.css';
import { playSound } from './SoundBox';
import PropTypes from 'prop-types';

class BoardSettings extends Component {

  static propTypes = {
    speed: PropTypes.number,
    alterspeed: PropTypes.func,
    eigth: PropTypes.number
  }

  state = {
    speed: this.props.speed,
    rows: this.props.rows,
    cols: this.props.cols
  }

  handleSpeedChange = (event) => {
    this.setState({speed: Number(event.target.value)});
  }

  speedAltered = (event) => {
    let { speed } = this.state;
    let { alterSpeed } = this.props;
    alterSpeed(speed);
  }  

  handlePitchChange = (event) => {
    if(-1 < Number(event.target.value) && Number(event.target.value) <8) {
      let { alterEigth } = this.props;
      alterEigth(event.target.value);
    }
  }

  handleKeyPitchChange = (event) => {
    let key = Number(event.key);
    if( 0 <= key && key <= 7 ) {
      let { alterEigth } = this.props;
      alterEigth(key);
    }
  }

  applyRowChange = (event) => {
    if (event.target.value < 1 || event.target.value > 16) return;
    let { rows } = this.state;
    this.setState({ rows: Number(event.target.value) });
    if(0 < rows && rows < 19) {
      let { alterRows } = this.props;
      alterRows(Number(event.target.value));
    }
  }

  applyColumnChange = (event) => {
    if (event.target.value < 1 || event.target.value > 20) return;
    let { cols } = this.state;
    this.setState({ cols: Number(event.target.value) });
    let { alterCols } = this.props;
    alterCols(Number(event.target.value));
  }

  render() {
    return (
      <div className="MenuContainer">
        <div className="InputContainer">
          <label>Rows:<input type="number" value={this.state.rows} onChange={this.applyRowChange}></input></label>
        </div>
        <div className="InputContainer">
          <label>Columns:<input type="number" value={this.state.cols} onChange={this.applyColumnChange}></input></label>
        </div>
        <div className="InputContainer">
          <label>Pitch:<input type="number" value={this.props.eigth} onChange={this.handlePitchChange} onKeyPress={this.handleKeyPitchChange}></input></label>
        </div>
        <div className="InputContainer">
          <label>Speed:<input value={this.state.speed} onChange={this.handleSpeedChange}></input></label>
          <button onClick={this.speedAltered}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default BoardSettings;
