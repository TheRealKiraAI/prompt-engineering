import React, { useEffect, useState } from "react";
import ml5 from "ml5";
import dynamic from "next/dynamic";
import SpotifyViewer from "./spotify-viewer";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});
import styles from "./page.module.css";

// pitch variables
let pitch;
let audioContext;
let stream;

const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Notes = () => {
  const [detectedNote, setDetectedNote] = useState("");
  const notesPlayed = [];

  useEffect(() => {
    const setup = async () => {
      audioContext = new AudioContext();
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
    // get pitch from ml5 library
    pitch.getPitch(function (err, frequency) {
      if (frequency) {
        let midiNum = freqToMidi(frequency);
        const note = scale[midiNum % 12];
        setDetectedNote(note);

        notesPlayed.push(note);
        if (notesPlayed.length > 5) {
          notesPlayed.shift();
        }

        const feedback = analyzePerformance(notesPlayed);
        console.log(feedback);
      }
      getPitch(); // continue detecting pitches
    });
  };

  return (
    <div className={styles.main}>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
      <SpotifyViewer note={detectedNote} />
    </div>
  );
};

// ---------------------------- HELPER FUNCTIONS ----------------------------
/*  
 name: startAudioContext
input: none
 desc: provides user to allow for audio input on the web
*/
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

/*  
 name: freqToMidi
input: f (frequency)
 desc: converts frequency input from audio to a MIDI number
*/
function freqToMidi(f) {
  const mathlog2 = Math.log(f / 440) / Math.log(2);
  const m = Math.round(12 * mathlog2) + 69;
  return m;
}

function analyzePerformance(notes) {
  const targetNotes = ["C", "D", "E", "F", "G"];

  let correctNotes = 0;
  for (let i = 0; i < 5; i++) {
    if (notes.includes(targetNotes[i])) {
      correctNotes++;
    }
  }

  const performanceScore = (correctNotes / 5) * 100;

  if (performanceScore > 80) {
    return "Close! You played almost all the notes correctly!";
  } else {
    return `Performance score: ${performanceScore}%. Keep practicing.`;
  }
}

export default Notes;
