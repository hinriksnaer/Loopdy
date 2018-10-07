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
    rows: this.props.rows
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

  handleRowChange = (event) => {
    this.setState({ rows: Number(event.target.value) });
  }

  applyRowChange = (event) => {
    let { rows } = this.state;
    if(0 < rows && rows < 20) {
      let { alterRows } = this.props;
      alterRows(Number(this.state.rows));
    }
  }

  render() {
    return (
      <div className="MenuContainer">
        <div>
            <label>Rows:<input type="number" value={this.state.rows} onChange={this.handleRowChange}></input></label>
            <button onClick={this.applyRowChange}>Confirm</button>
        </div>
        <div>
            <label>Columns:<input type="number" value={this.props.cols} onChange={this.handleColumnChange}></input></label>
        </div>
        <div>
            <label>Pitch:<input type="number" value={this.props.eigth} onChange={this.handlePitchChange} onKeyPress={this.handleKeyPitchChange}></input></label>
        </div>
        <div>
            <label>Speed:<input value={this.state.speed} onChange={this.handleSpeedChange}></input></label>
            <button onClick={this.speedAltered}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default BoardSettings;
