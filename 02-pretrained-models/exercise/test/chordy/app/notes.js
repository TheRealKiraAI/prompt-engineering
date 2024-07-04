import React, { useEffect, useState } from "react";
import ml5 from "ml5";
import Canvas from "./canvas";
import styles from "./page.module.css";

// pitch variables
let pitch;
let audioContext;
let stream;

// const scale = ["C", "C#", "D", "D#", "E", "E#", "F", "F#", "G", "G#", "A", "A#", "B"];
const scale = ["C", "C#", "D", "D#", "E", "E#", "F", "F#", "G", "G#", "A", "A#", "B"];
const chordPatterns = {
  "C major": ["C", "E", "G"],
  "F major": ["F", "A", "D"],
  "D major": ["D", "F#", "A"],
  "G major": ["G", "B", "D"],
  "A major": ["A", "C#", "E"],
};

const scales = {
  "C Major": ["C", "D", "E", "F", "G", "A", "B"],
  "G Major": ["G", "A", "B", "C", "D", "E", "F#"],
  "A Major": ["A", "B", "C#", "D", "E", "F#", "G#"],
  "D Major": ["D", "E", "F#", "G", "A", "B", "C#"],
  "E Major": ["E", "F#", "G#", "A", "B", "C#", "D#"],
  "F Major": ["F", "G", "A", "Bb", "C", "D", "E"],
};

const ChordIdentifier = () => {
  const [currentNotes, setCurrentNotes] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const [detectedNote, setDetectedNote] = useState("");

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
        let midiNum = freqToMidi(frequency); // convert to MIDI frequency number
        const note = scale[midiNum % 12]; // map the MIDI number to a note
        const newNotesArray = [...notesArray, note]; // add detected notes to an array
        setNotesArray(newNotesArray);
        setCurrentNotes(newNotesArray);

        // if there are at least 3 detected notes, attempt to identify a chord
        // if (newNotesArray.length >= 3) {
        //   const chord = notesToChord(newNotesArray);
        //   setCurrentChord(chord);
        //   setNotesArray([]); // reset notes array after identifying a chord
        // }
        setDetectedNote(note); // update detected note state
        // setMatchedScales(identifyScales(note)); // identify and update scales that match
      }
      getPitch(); // continue detecting pitches
    });
  };

  return (
    <div class={styles.main}>
      <p>Detected Note: {currentNotes}</p>
      {/* <p>Matched Scales: {matchedScales.join(", ")}</p> */}
      <Canvas note={currentNotes} />
      {/* <Canvas note={detectedNote} /> */}
    </div>
  );
};

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

function notesToChord(notes) {
  let foundChord = "Unknown Chord";
  Object.entries(chordPatterns).forEach(([chord, chordNotes]) => {
    const sortedChordNotes = chordNotes.sort();
    const sortedNotes = notes.sort();
    if (sortedChordNotes.every((note) => sortedNotes.includes(note))) {
      foundChord = chord;
    }
  });
  return foundChord;
}

export default ChordIdentifier;
