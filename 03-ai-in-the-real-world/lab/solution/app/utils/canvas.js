import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const Canvas = (note, genre) => {
  let canvasRef = useRef(null);

  const [color, setColor] = useState([0, 255, 0]);
  const canvasWidth = 800;
  const canvasHeight = 400;

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.clear();
        p.stroke(0);
        p.strokeWeight(2);
      };

      p.draw = () => {
        p.clear(); // clear canvas each frame
        if (note) {
          let xPos = mapNote(note.note);
          p.fill(color);
          p.ellipse(xPos + 75, canvasHeight / 2, 100, 100); // vertically centered
        }
      };
    };

    const mapNote = (note) => {
      const spacing = canvasWidth / 13;

      const notePositions = {
        C: 0 * spacing,
        "C#": 1 * spacing,
        D: 2 * spacing,
        "D#": 3 * spacing,
        E: 4 * spacing,
        F: 5 * spacing,
        "F#": 6 * spacing,
        G: 7 * spacing,
        "G#": 8 * spacing,
        A: 9 * spacing,
        "A#": 10 * spacing,
        B: 11 * spacing,
      };
      return notePositions[note] || 0;
    };

    const canvas = new p5(sketch, canvasRef.current);

    return () => {
      canvas.remove();
    };
  }, [note, color]); // update if note or color changes

  useEffect(() => {
    if (note) {
      if (note.note === "C" || note.note == "E" || note.note === "G" || note.note === "B") {
        setColor([204, 66, 239]);
      } else if (note.note === "C#" || note.note == "E#" || note.note === "G#") {
        setColor([0, 255, 255]);
      } else if (note.note === "D" || note.note == "F" || note.note === "A") {
        setColor([0, 0, 204]);
      } else if (note.note === "D#" || note.note == "F#" || note.note === "A#") {
        setColor([255, 153, 255]);
      }
    }
  }, [note]);

  return <div ref={canvasRef}></div>;
};

export default Canvas;
