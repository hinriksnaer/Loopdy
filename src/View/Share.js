import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { ShareService } from '../Service/ShareService';

class Share extends Component {
  static propTypes = {
    playbacks: PropTypes.array,
  };

  state = {
    shareLink: ''
  }

  // Copies the link in the input to the clipboard
  copyLinkToClipboard = () => {
    const shareInput = document.getElementsByClassName('ShareLinkInput');
    shareInput[0].select();
    document.execCommand('copy');
  }

  // Generates a share link
  shareButtonPressed = () => {
    const { playbacks } = this.props;
    const link = ShareService.generateShareLink(playbacks);
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
