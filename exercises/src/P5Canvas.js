import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const P5Canvas = (note, genre) => {
  let canvasRef = useRef(null);
  const [color, setColor] = useState([0, 255, 0]);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight - 550);
        p.clear();
        p.background(54, 69, 79);
        p.stroke(0);
        p.strokeWeight(2);
      };

      p.draw = () => {
        if (note) {
          let xPos = mapNote(note.note);
          p.fill(color);
          p.ellipse(xPos + 75, 200, 100, 100);
        }
      };
    };

    const mapNote = (note) => {
      const canvasWidth = window.innerWidth;
      const spacing = canvasWidth / 8;

      const notePositions = {
        C: 2 * spacing,
        D: 2 * spacing,
        E: 3 * spacing,
        F: 4 * spacing,
        G: 5 * spacing,
        A: 6 * spacing,
        B: 7 * spacing,
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
      if (
        note.note === "C" ||
        note.note == "E" ||
        note.note === "G" ||
        note.note === "B"
      ) {
        setColor([204, 66, 239]);
      } else if (
        note.note === "C#" ||
        note.note == "E#" ||
        note.note === "G#"
      ) {
        setColor([0, 255, 255]);
      } else if (note.note === "D" || note.note == "F" || note.note === "A") {
        setColor([0, 0, 204]);
      } else if (
        note.note === "D#" ||
        note.note == "F#" ||
        note.note === "A#"
      ) {
        setColor([255, 153, 255]);
      }
    }
  }, [note]);

  useEffect(() => {
    if (genre) {
      if (genre.genre === "Chill Vibes") {
        console.log("chill");
      } else {
        console.log("not chill");
      }
    }
  }, [genre]);

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
