"use client";

import React, { useEffect, useState } from "react";
import pitchDetection from "./utils/pitchDetection";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

// import canvas with SSR false to disable server-side rendering
const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

let audioContext;
let pitch;
let stream;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Notes = () => {
  const [detectedNote, setDetectedNote] = useState(""); // add use state to update current note values

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
    startAudioContext(); // uses our helper function for audio input
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
        console.log(`frequency ${frequency}`);
        let midiNum = freqToMidi(frequency);
        const note = scale[midiNum % 12];
        console.log(`note ${note}`);
        setDetectedNote(note);
      }
      getPitch(); // continue detecting pitches
    });
  };

  return (
    <div className={styles.main}>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
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
    // create and start the AudioContext from browser
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
