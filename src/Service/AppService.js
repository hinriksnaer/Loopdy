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

  return {
    generateNotes,
    decodeURL
  };
}();
  

export { AppService };