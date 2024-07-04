"use client";

import Notes from "./notes";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <Notes />
      {/* <Viewer /> */}
    </main>
  );
}
