"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { streamComponent } from "./actions";

export default function Page() {
  const [component, setComponent] = useState();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}
      >
        <Button>Streamed Component</Button>
      </form>
      <div>{component}</div>
    </div>
  );
}

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       {/* <h1>Chordy Music AI App 🎹</h1>
//       <Chat /> */}
//     </main>
//   );
// }
