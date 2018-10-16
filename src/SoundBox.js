const Tone = require('tone');


async function playSound(note) {
  // create a synth and connect it to the master output (your speakers)
  var synth = new Tone.Synth().toMaster();
  // play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(note, '16n');
}

export { playSound };