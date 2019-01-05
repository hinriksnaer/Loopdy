const LZString = require('lz-string');

const ShareService = function() {

  // generates a link that is used to enter a previous state
  function generateShareLink(playbacks) {

    let playbacksArray = [];

    for (let playbackPlayer of playbacks){
      let playbackInit = {
        eigth: playbackPlayer.getEigth(),
        cols: playbackPlayer.getCols(),
        speed: playbackPlayer.getSpeed(),
        rows: playbackPlayer.getRows(),
        noteStatus: playbackPlayer.getNoteStatus(),
        instrument: playbackPlayer.getInstrument()
      };
      playbacksArray.push(playbackInit);
    }

    let jsonObject = JSON.stringify(playbacksArray);
    let compressed = LZString.compressToEncodedURIComponent(jsonObject);
    return `loopdy.net/?board=${compressed}`;
  }

  return {
    generateShareLink
  };

}();


export { ShareService };
