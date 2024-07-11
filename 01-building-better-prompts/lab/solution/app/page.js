"use client"; // notice the use client

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { streamComponent } from "./actions";

import styles from "./page.module.css";

export default function Page() {
  const [component, setComponent] = useState();

  return (
    // step 2 & 3: example of a simple form that includes the streamComponent Server Action call and a Button to trigger the call.
    <div className={styles.main}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}
      >
        <Button>Stream Component</Button>
      </form>
      <div>{component}</div>
    </div>
  );
}
