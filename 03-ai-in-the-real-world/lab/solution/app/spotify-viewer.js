"use client";

import React, { useState, useEffect } from "react";

const SpotifyViewer = () => {
  const [music, setMusic] = useState([]);
  const genres = [];
  const getData = () => {
    var request = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/playlists", request)
      .then((response) => response.json())
      .then((result) => {
        setMusic(result);
        result.forEach((item) => {
          genres.push(item);
        });
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    if (genres.length > 0) {
      Canvas({ genres });
    }
  });

  return (
    <div>
      {music.map((i) => (
        <div key={i.id}>
          <p>Genre: {i.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default SpotifyViewer;
