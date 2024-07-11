"use client";

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
  return <div className={styles.main}></div>;
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
