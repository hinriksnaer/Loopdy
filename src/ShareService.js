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
    return `localhost:3000/${compressed}`;
  }

  return {
    generateShareLink
  };
    
}();
    
  
export { ShareService };