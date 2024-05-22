import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const P5Canvas = (note) => {
  let canvasRef = useRef(null);
  const [color, setColor] = useState([0, 255, 0]);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 400);
        p.clear();
        p.background(255);
      };

      p.draw = () => {
        if (note) {
          p.fill(color);
          p.ellipse(200, 200, 100, 100);
        }
      };
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

export default P5Canvas;
