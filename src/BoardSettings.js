import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

class BoardSettings extends Component {

  static propTypes = {
    speed: PropTypes.number,
    alterspeed: PropTypes.func,
    eigth: PropTypes.number,
    cols: PropTypes.number,
    rows: PropTypes.number
  }

  state = {
    speed: this.props.speed,
    rows: this.props.rows,
    cols: this.props.cols
  }

  handleSpeedChange = (event) => {
    this.setState({speed: Number(event.target.value)});
  }

  speedAltered = () => {
    let { speed } = this.state;
    let { alterSpeed } = this.props;
    alterSpeed(speed);
  }  

  handlePitchChange = (newPitch) => {
    if (newPitch < 0 || newPitch > 7) return;
    let { alterEigth } = this.props;
    alterEigth(newPitch);
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
    let { eigth } = this.props;
    return (
      <div className="MenuContainer">
        <div className="InputContainer">
          <label>Rows:<input type="number" value={this.state.rows}></input></label>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows-1)}>
            <img src={ require('./img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyRowChange(rows+1)}>
            <img src={ require('./img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Columns:<input type="number" value={this.state.cols}></input></label>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols-1)}>
            <img src={ require('./img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.applyColumnChange(cols+1)}>
            <img src={ require('./img/plus.png')}/>
          </div>
        </div>
        <div className="InputContainer">
          <label>Pitch:<input type="number" value={this.props.eigth}></input></label>
          <div className="MenuIconContainer" onClick={() => this.handlePitchChange(eigth-1)}>
            <img src={ require('./img/minus.png')}/>
          </div>
          <div className="MenuIconContainer" onClick={() => this.handlePitchChange(eigth+1)}>
            <img src={ require('./img/plus.png')}/>
          </div>
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
