"use client";

// import Notes from "./notes";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
const Notes = dynamic(() => import("./notes"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <Notes />
      {/* <Viewer /> */}
    </main>
  );
}
