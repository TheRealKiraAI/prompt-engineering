import Chat from "./chat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>AI Assistant App 💬</h1>
      <Chat />
    </main>
  );
}
