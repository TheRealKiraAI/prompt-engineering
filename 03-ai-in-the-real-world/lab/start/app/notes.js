import React, { useEffect, useState } from "react";
import ml5 from "ml5";
import dynamic from "next/dynamic";

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

  // update the audio input
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

  // loads ml5 AI pitch detection model
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

  // get pitch from ml5 library
  const getPitch = () => {
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
