const LZString = require('lz-string');

const AppService = function() {

  // generates and array of notes that fit the height and pitch of the loopboard
  function generateNotes(eigth, rows) {
    eigth = Number(eigth);
    let dur = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    let notes = [];
    let listpos = 0;
    for (let i = 0; i<rows; i++) {
      if (i > 0 && i%7 === 0) {
        eigth += 1;
        listpos += 7;
      }
      notes.push(dur[i-listpos]+eigth.toString());
    }
    return notes;
  }

  // decodes the url into a json string
  function decodeURL(url) {
    let decodedURL = JSON.parse(LZString.decompressFromEncodedURIComponent(url));
    return decodedURL;
  }

  // deep copies a 2d array
  function deepCopy2dArray(array) {
    let newArray = [];
    for (let subArray of array) {
      newArray.push(Array.from(subArray).slice());
    }
    return newArray;
  }

  function getCurrentPlaybackIndex(list, key) {
    for (let i = 0; i< list.length; i++) {
      if (list[i].key === key) {
        return i;
      }
    }
  }

  return {
    generateNotes,
    decodeURL,
    deepCopy2dArray,
    getCurrentPlaybackIndex
  };
}();
  

export { AppService };