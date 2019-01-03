import { playSound } from './SoundBox';
import { AppService } from '../Service/AppService';

export default class PlaybackPlayer {

  constructor(eigth, cols, speed, rows, noteStatus) {
    this._eigth = eigth;
    this._rows = rows;
    this._cols = cols;
    this._speed = speed;
    this._noteStatus = noteStatus;
    this._notes = AppService.generateNotes(eigth, rows);
    this._isLooping = false;
    this._currentNote = 0;
    this._playLoop = null;
    this._playersToStart = [];
    this._loopboardToStartFunction = null;
  }

  getNotes() {
    return this._notes;
  }

  getCols() {
    return this._cols;
  }

  setCols(cols) {
    if (cols>this._cols) {
      for (let i = 0; i<this._noteStatus.length; i++) {
        this._noteStatus[i][cols-1] = false;
      }
    } else {
      for (let i = 0; i<this._noteStatus.length; i++) {
        this._noteStatus[i].pop();
      }
    }
    this._cols = cols;
  }

  getRows() {
    return this._rows;
  }

  setRows(rows) {
    let newRow = [];
    if (rows>this._rows) {
      for (let i = 0; i<this._cols; i++) {
        newRow.push(false);
      }
      this._noteStatus.push(newRow);
    } else {
      this._noteStatus.pop();
    }
    this._rows = rows;
    this._notes = AppService.generateNotes(this._eigth, this._rows);
  }

  setSpeed(newSpeed) {
    this._speed = newSpeed;
    if (this._isLooping) {
      this.pauseLoop();
      this.startLoop();
    }
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

  getEigth() {
    return this._eigth;
  }

  setEigth(eigth) {
    this._eigth = eigth;
    this._notes = AppService.generateNotes(eigth, this._rows);
  }

  toggleNote(row, col) {
    this._noteStatus[row][col] = !this._noteStatus[row][col];
  }

  getNoteStatus() {
    return this._noteStatus;
  }

  setNoteStatus(noteStatus) {
    this._noteStatus = noteStatus;
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

  syncStartLoopboard(startFunction) {
    this._loopboardToStartFunction = startFunction;
  }


  async startLoop() {
    if (this._isLooping) return;
    this._isLooping = true;
    this._playLoop = setInterval(() => {

      for (let playbackPlayer of this._playersToStart) {
        playbackPlayer.startLoop();
      }
      
      for (let i = 0; i<this._rows; i++){
        if (this._noteStatus[i][this._currentNote]){
          playSound(this._notes[i]);
        }
      }
      this._currentNote++;
      if(this._currentNote >= this._cols){
        this._currentNote = 0;
      }

      this._playersToStart = [];

      if (this._loopboardToStartFunction) {
        this._loopboardToStartFunction(this._currentNote);
        this._loopboardToStartFunction = null;
      }
    }, this._speed);
  }
}