import "./App.css";
import "./ChordIdentifier.css";
import React, { useEffect, useState } from "react";
import ml5 from "ml5";

// pitch variables
let pitch;
let audioContext;
let stream;

const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const chordPatterns = {
  "C major": ["C", "E", "G"],
  "F major": ["F", "A", "D"],
  "D major": ["D", "F#", "A"],
  "G major": ["G", "B", "D"],
  "A major": ["A", "C#", "E"],
  // Add more chords as needed
};

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

const ChordIdentifier = () => {
  const [currentChord, setCurrentChord] = useState("");
  const [currentNotes, setCurrentNotes] = useState([]);
  const [notesArray, setNotesArray] = useState([]); // State to hold ongoing notes

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
      }
      getPitch(); // Continue detecting pitches
    });
  };

  return (
    <div>
      <h1>Chord Identifier</h1>
      <p>Detected Chord: {currentChord}</p>
      <p>Current Notes: {currentNotes.join(", ")}</p>
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
