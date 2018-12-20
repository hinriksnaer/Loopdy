import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { ShareService } from '../Service/ShareService';

class Share extends Component {
  static propTypes = {
    songArray: PropTypes.array,
    rows: PropTypes.number,
    cols: PropTypes.number,
    pitch: PropTypes.number,
    speed: PropTypes.number,
    playbacks: PropTypes.array,
    currentPlaybackKey: PropTypes.string,
  };

  state = {
    shareLink: ''
  }

  copyLinkToClipboard = () => {
    const shareInput = document.getElementsByClassName('ShareLinkInput');
    shareInput[0].select();
    document.execCommand('copy');
  }

  shareButtonPressed = () => {
    const { songArray, rows, cols, pitch, speed, playbacks, currentPlaybackKey } = this.props;
    console.log(currentPlaybackKey);
    const link = ShareService.generateShareLink(songArray, rows, cols, pitch, speed, playbacks, currentPlaybackKey);
    this.setState({shareLink: link});
  }

  render() {
    const { shareLink } = this.state;
    return (
      <div className={'ShareContainer'}>
        <button onClick={this.shareButtonPressed}>Create share link</button>
        <input className={'ShareLinkInput'} value={shareLink}></input>
        <button onClick={this.copyLinkToClipboard}>Copy share link</button>
      </div>
    );
  } 
}

export default Share;
