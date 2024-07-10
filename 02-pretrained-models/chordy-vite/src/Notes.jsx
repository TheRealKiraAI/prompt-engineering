import React, { useEffect, useState } from "react";
import ml5 from "ml5";
import Canvas from "./Canvas";

// pitch variables
let pitch;
let audioContext;
let stream;

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

const identifyScales = (note) => {
  const matchingScales = [];
  for (const [scale, notes] of Object.entries(scales)) {
    if (notes.includes(note)) {
      matchingScales.push(scale);
    }
  }
  return matchingScales;
};

const Notes = () => {
  const [currentChord, setCurrentChord] = useState("");
  const [currentNotes, setCurrentNotes] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const [detectedNote, setDetectedNote] = useState("");
  const [matchedScales, setMatchedScales] = useState([]);

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
        const newNotesArray = [...notesArray, note];
        setNotesArray(newNotesArray);
        setCurrentNotes(newNotesArray);
        if (newNotesArray.length >= 3) {
          // Assuming a chord is at least 3 notes
          const chord = notesToChord(newNotesArray);
          setCurrentChord(chord);
          setNotesArray([]); // Reset notes array after identifying a chord
        }
        setDetectedNote(note);
        setMatchedScales(identifyScales(note)); // Update matched scales
      }
      getPitch(); // continue detecting pitches
    });
  };

  return (
    <div>
      <p>Detected Note: {currentNotes}</p>
      {/* <p>Matched Scales: {matchedScales.join(", ")}</p> */}
      {/* <Canvas note={currentNotes} /> */}
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

export default Notes;
