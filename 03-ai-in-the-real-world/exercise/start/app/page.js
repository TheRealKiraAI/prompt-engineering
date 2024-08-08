import Image from "next/image";
import Notes from "./notes";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Chordy Music AI App 🎹</h1>
      <div className={styles.description}>
        <Notes />
      </div>
    </main>
  );
}
