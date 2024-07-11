"use client";

import styles from "./page.module.css";
import dynamic from "next/dynamic.js";

const Notes = dynamic(() => import("./notes.js"), {
  ssr: false,
});

const SpotifyViewer = dynamic(() => import("./spotify-viewer.js"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <Notes />
      <SpotifyViewer />
    </main>
  );
}
