const LoopBoardService = function() {

  // generates notestatus and isPlaying array for default state
  function initStatus(rows, cols) {
    let noteStatus = [];
    let falseInit = [];
    let isPlaying = [];
    for (let i = 0; i<cols;i++){
      falseInit.push(false);
      isPlaying.push(false);
    }
    for (let i = 0; i<rows; i++){
      noteStatus.push(falseInit.slice());
    }
    return [noteStatus, isPlaying];
  }

  return {
    initStatus,
  };
}();

export { LoopBoardService };