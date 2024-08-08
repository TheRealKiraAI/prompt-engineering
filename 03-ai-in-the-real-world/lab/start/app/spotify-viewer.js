"use client";

import React, { useEffect, useState } from "react";

const SpotifyViewer = () => {
  // add from here
  const [music, setMusic] = useState([]);
  const genres = [];

  useEffect(() => {
    getData();
  });

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
