function generateNoteStatusArray(row, cols){
  let noteStatus = [];
  let falseInit = [];
  for (let i = 0; i<cols;i++){
    falseInit.push(false);
  }
  for (let i = 0; i<rows; i++){
    noteStatus.push(falseInit.slice());
  }
  return noteStatus;
}

function generateIsPlaying(cols) {
  let isPlaying = [];
  for (let i = 0; i<cols;i++){
    isPlaying.push(false);
  }
  return isPlaying
}

export { generateNoteStatusArray, generateIsPlaying }