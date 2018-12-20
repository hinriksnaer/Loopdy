const LZString = require('lz-string');

const ShareService = function() {

  function generateShareLink(songArray, row, col, pitch, speed) {
    let object = {
      songArray,
      row,
      col,
      pitch,
      speed
    };
    let jsonObject = JSON.stringify(object);
    let compressed = LZString.compressToEncodedURIComponent(jsonObject);
    return `loopdy.net/?board=${compressed}`;
  }

  return {
    generateShareLink
  };
    
}();
    
  
export { ShareService };
