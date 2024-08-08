"use client";

import React, { useEffect, useState } from "react";
import pitchDetection from "./utils/pitchDetection";
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
  const [score, setPerformanceScore] = useState("");
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
      pitch = pitchDetection("./model/", audioContext, stream, modelLoaded);
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

        analyzePerformance(notesPlayed);
      }
      getPitch(); // continue detecting pitches
    });
  };

  /*
   STEP 2: Example Solution
  */
  function step2AnalyzePerformance(notes) {
    const targetNotes = ["C", "D", "E", "F", "G"];

    for (let i = 0; i < 5; i++) {
      if (notes.includes(targetNotes[i])) {
        console.log("yay");
      } else console.log("nay");
    }
  }

  /*
   STEP 3: Example Solution
  */
  function step3AnalyzePerformance(notes) {
    const targetNotes = ["C", "D", "E", "F", "G"];

    let correctNotes = 0;
    for (let i = 0; i < 5; i++) {
      if (notes.includes(targetNotes[i])) {
        console.log("yay");
        correctNotes++;
      } else console.log("nay");
    }
    console.log(correctNotes);
  }

  /*
   STEP 4: Example Solution
  */
  function step4AnalyzePerformance(notes) {
    const targetNotes = ["C", "D", "E", "F", "G"];

    let correctNotes = 0;
    for (let i = 0; i < 5; i++) {
      if (notes.includes(targetNotes[i])) {
        console.log("yay");
        correctNotes++;
      } else console.log("nay");
    }
    console.log(correctNotes);
    const performanceScore = (correctNotes / 5) * 100;
  }

  /*
   STEP 5: Example Solution
  */
  function step5AnalyzePerformance(notes) {
    const targetNotes = ["C", "D", "E", "F", "G"];

    let correctNotes = 0;
    for (let i = 0; i < 5; i++) {
      if (notes.includes(targetNotes[i])) {
        console.log("yay");
        correctNotes++;
      } else console.log("nay");
    }
    console.log(correctNotes);
    const performanceScore = (correctNotes / 5) * 100;

    if (performanceScore > 80) {
      return <p>Close! You played almost all the notes correctly!</p>;
    } else {
      return <p>Performance score: {performanceScore}%. Keep practicing.</p>;
    }
  }

  /* 
   STEP 6: Example Solution
   name: analyzePerformance
   input: notes
   desc: calculates the performance score based on the notes played
  */
  function analyzePerformance(notes) {
    const targetNotes = ["C", "D", "E", "F", "G"];

    let correctNotes = 0;
    for (let i = 0; i < 5; i++) {
      if (notes.includes(targetNotes[i])) {
        correctNotes++;
      }
    }

    const performanceScore = (correctNotes / 5) * 100;
    setPerformanceScore(performanceScore);
  }

  /*
   STEP 6: Example component for step 6
   name: PerformanceScore
   input: performanceScore
   desc: conditionally renders a message based on the performance score
   note: final example solution
  */
  const PerformanceScore = ({ performanceScore }) => {
    if (performanceScore > 80) {
      return <p>Close! You played almost all the notes correctly!</p>;
    } else {
      return <p>Performance score: {performanceScore}%. Keep practicing.</p>;
    }
  };

  return (
    <div className={styles.main}>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
      <SpotifyViewer />
      <PerformanceScore performanceScore={score} />
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

export default Notes;
