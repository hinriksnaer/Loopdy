import { playSound } from './SoundBox';

const PlaybackPlayer = function(notes, cols, speed, rows, noteStatus) {

  let _rows = rows;
  let _cols = cols;
  let _notes = notes;
  let _speed = speed;
  let _noteStatus = noteStatus;
  let _isLooping = false;
  let _currentNote = 0;
  let _playLoop = null;
  let _playersToStart = [];
  
  function setCols(cols) {
    _cols = cols;
  }

  function setRows(rows) {
    _rows = rows;
  }

  function setNoteStatus(noteStatus) {
    _noteStatus = noteStatus;
  }

  function setSpeed(newSpeed) {
    _speed = newSpeed;
    if (_isLooping) this.startLoop();
  }

  function getIsLooping() {
    return _isLooping;
  }

  function getCurrentNote() {
    return _currentNote;
  }

  function getSpeed() {
    return _speed;
  }

  function setNotes(notes) {
    _notes = notes;
  }

  function stopLoop() {
    _isLooping = false;
    clearInterval(_playLoop);
  }

  function syncStartPlaybackPlayer(playbackPlayer) {
    _playersToStart.push(playbackPlayer);
  }


  async function startLoop() {
    _isLooping = true;
    _playLoop = setInterval(() => {
      for (let i = 0; i<_rows; i++){
        if (_noteStatus[i][_currentNote]){
          playSound(_notes[i]);
        }
      }
      _currentNote++;
      if(_currentNote >= _cols){
        _currentNote = 0;
      }
      
      for (let playbackPlayer of _playersToStart) {
        playbackPlayer.startLoop();
      }
      _playersToStart = [];
    }, _speed);
  }
  
  return {
    setRows,
    setCols,
    setNotes,
    setSpeed,
    setNoteStatus,
    stopLoop,
    startLoop,
    getCurrentNote,
    getSpeed,
    getIsLooping,
    syncStartPlaybackPlayer
  };
};
    
export { PlaybackPlayer };
