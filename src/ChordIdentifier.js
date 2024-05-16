import "./App.css";
import "./ChordIdentifier.css";
import React, { useEffect, useState } from "react";
import ml5 from "ml5";

// pitch variables
let pitch;
let audioContext;
let stream;

const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// taken from p5.Sound
function freqToMidi(f) {
  const mathlog2 = Math.log(f / 440) / Math.log(2);
  const m = Math.round(12 * mathlog2) + 69;
  return m;
}

const ChordIdentifier = () => {
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    const setup = async () => {
      audioContext = new AudioContext({ sampleRate: 44100 }); // uses higher FFT to detect more frequency data
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      startPitch(stream, audioContext);
    };

    setup();
  }, []);

  const startPitch = (stream, audioContext) => {
    startAudioContext();
    if (audioContext) {
      pitch = ml5.pitchDetection("./model/", audioContext, stream, modelLoaded);
    } else {
      console.log("AudioContext or mic not initialized.");
    }
  };

  const modelLoaded = () => {
    getPitch();
  };

  const getPitch = () => {
    pitch.getPitch(function (err, frequency) {
      if (frequency) {
        console.log(`freq: ${frequency}`);
        let midiNum = freqToMidi(frequency);
        const note = scale[midiNum % 12]; // 12 notes to cover all octaves
        setCurrentNote(note);
        console.log(`note: ${note}`);
      }
      getPitch();
    });
  };

  return (
    <div>
      <h1>Chord Identifier</h1>
      <p>Detected Chord: {currentNote}</p>
    </div>
  );
};

// HELPER FUNCTIONS
function startAudioContext() {
  if (audioContext) {
    // if the AudioContext is already created, resume it
    audioContext.resume();
  } else {
    // create and start the AudioContext
    audioContext = new (window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext)();
  }
}

export default ChordIdentifier;
