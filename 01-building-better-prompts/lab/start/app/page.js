"use client"; // notice the use client

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { streamComponent } from "./actions";

export default function Page() {
  const [component, setComponent] = useState();

  return (
    // create a form component that utilizes streamComponent and has a Button
    <div>
      <div>{component}</div>
    </div>
  );
}
