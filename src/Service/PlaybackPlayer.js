import { playSound } from './SoundBox';

export default class PlaybackPlayer {

  constructor(notes, cols, speed, rows, noteStatus) {
    this._rows = rows;
    this._cols = cols;
    this._notes = notes;
    this._speed = speed;
    this._noteStatus = noteStatus;
    this._isLooping = false;
    this._currentNote = 0;
    this._playLoop = null;
    this._playersToStart = [];
  }

  setCols(cols) {
    this._cols = cols;
  }

  setRows(rows) {
    this._rows = rows;
  }

  setNoteStatus(noteStatus) {
    this._noteStatus = noteStatus;
  }

  setSpeed(newSpeed) {
    this._speed = newSpeed;
    if (this._isLooping) this.startLoop();
  }

  getSpeed() {
    return this._speed;
  }

  getIsLooping() {
    return this._isLooping;
  }

  getCurrentNote() {
    return this._currentNote;
  }

  setNotes(notes) {
    this._notes = notes;
  }

  pauseLoop() {
    this._isLooping = false;
    clearInterval(this._playLoop);
  }

  stopLoop() {
    this._isLooping = false;
    this._currentNote = 0;
    clearInterval(this._playLoop);
  }

  syncStartPlaybackPlayer(playbackPlayer) {
    this._playersToStart.push(playbackPlayer);
  }


  async startLoop() {
    this._isLooping = true;
    this._playLoop = setInterval(() => {
      for (let i = 0; i<this._rows; i++){
        if (this._noteStatus[i][this._currentNote]){
          playSound(this._notes[i]);
        }
      }
      this._currentNote++;
      if(this._currentNote >= this._cols){
        this._currentNote = 0;
      }
      
      for (let playbackPlayer of this._playersToStart) {
        playbackPlayer.startLoop();
      }
      this._playersToStart = [];
    }, this._speed);
  }
}