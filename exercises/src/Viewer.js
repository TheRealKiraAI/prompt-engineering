import React, { useState, useEffect } from "react";

const Viewer = () => {
  const [music, setMusic] = useState([]);
  const getData = () => {
    var request = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/playlists", request)
      .then((response) => response.json())
      .then((result) => setMusic(result))
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {music.map((i) => (
        <div key={i.id}>
          <p>{i.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Viewer;
