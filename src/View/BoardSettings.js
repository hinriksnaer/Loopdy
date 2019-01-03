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
      eigth: playbackPlayer.getEigth()
    });
  }

  handleSpeedChange = (event) => {
    this.setState({speed: Number(event.target.value)});
  }

  speedAltered = () => {
    let { speed } = this.state;
    let { alterSpeed } = this.props;
    let convertedSpeed = 60000/speed;
    alterSpeed(convertedSpeed)
  }  

  handlePitchChange = (newPitch) => {
    if (newPitch < 0 || newPitch > 7) return;
    let { alterEigth } = this.props;
    this.setState({ eigth: newPitch})
    alterEigth(newPitch);
  }

  handleInstrumentChange = (event) => {
    const { playbackPlayer } = this.props;
    playbackPlayer.setInstrument(event.target.value);
  }

  applyRowChange = (newRows) => {
    if (newRows < 1 || newRows > 16) return;
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
    let { rows, cols } = this.state;
    let { playbackPlayer } = this.props;
    let instrument = playbackPlayer.getInstrument();
    return (
      <div className="MenuContainer">
        <div className="InputContainer">
          <select onChange={this.handleInstrumentChange}>
            <option value="basic" selected={'basic' === instrument}>Basic</option>
            <option value="fm" selected={'fm' === instrument}>FM</option>
            <option value="duo" selected={'duo' === instrument}>Duo</option>
            <option value="mono" selected={'mono' === instrument}>Mono (WARNING LOUD)</option>
            <option value="pluck" selected={'pluck' === instrument}>Pluck</option>
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
          <label>Notes per minute:<input value={this.state.speed} onChange={this.handleSpeedChange}></input></label>
          <button onClick={this.speedAltered}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default BoardSettings;
