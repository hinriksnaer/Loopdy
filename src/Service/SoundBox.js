const Tone = require('tone');

// plays a note based on specified note and instrument
async function playSound(note, instrument) {
  
  // create a synth and connect it to the master output (your speakers)
  let synth;

  switch (instrument) {
  case 'fm':
    synth = new Tone.FMSynth().toMaster();
    break;
  case 'duo':
    synth = new Tone.DuoSynth().toMaster();
    break;
  case 'mono':
    synth = new Tone.MonoSynth().toMaster();
    break;
  case 'pluck':
    synth = new Tone.PluckSynth().toMaster();
    break;
  case 'basic':
    synth = new Tone.Synth().toMaster();
    break;
  default:
    synth = new Tone.Synth().toMaster();
  }

  synth.triggerAttackRelease(note, '16n');
}

export{ playSound };
