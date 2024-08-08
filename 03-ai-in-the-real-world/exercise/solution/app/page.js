import dynamic from "next/dynamic";
import Notes from "./notes";
const SpotifyViewer = dynamic(() => import("./spotify-viewer.js"), {
  ssr: false,
});
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <div className={styles.description}>
        <Notes />
        <SpotifyViewer />
      </div>
    </main>
  );
}
