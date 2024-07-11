"use client";

import styles from "./page.module.css";
import dynamic from "next/dynamic";

const Notes = dynamic(() => import("./notes"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <Notes />
    </main>
  );
}
