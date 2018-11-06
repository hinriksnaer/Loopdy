const loopBoardService = function() {

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

  function alterColumns(noteStatus, cols, prevCols) {
    let newNoteStatus = noteStatus;
    if (cols>prevCols) {
      for (let i = 0; i<newNoteStatus.length; i++) {
        newNoteStatus[i][cols-1] = false;
      }
    } else {
      for (let i = 0; i<newNoteStatus.length; i++) {
        newNoteStatus[i].pop();
      }
    }
    return newNoteStatus;
  }

  function alterRows(noteStatus, cols, rows, prevRows) {
    let newNoteStatus = noteStatus;
    let newRow = [];
    if (rows>prevRows) {
      for (let i = 0; i<cols; i++) {
        newRow.push(false);
      }
      newNoteStatus.push(newRow);
    } else {
      newNoteStatus.pop();
    }
    return newNoteStatus;
  }

  return {
    initStatus,
    alterColumns,
    alterRows
  };
}();
  

export { loopBoardService };