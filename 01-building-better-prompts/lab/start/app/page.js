"use client"; // notice the use client

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { streamComponent } from "./actions";

import styles from "./page.module.css";

export default function Page() {
  const [component, setComponent] = useState();

  return (
    // create a form component that utilizes streamComponent and has a Button
    <div className={styles.main}>
      <div>{component}</div>
    </div>
  );
}
