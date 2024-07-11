"use server"; // notice the use server

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// a component for text to print to create a "loading" effect
const LoadingComponent = () => <div className="animate-pulse p-4">getting name...</div>;

// step 5: an example function that makes a call to an API to get data
const getName = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!response.ok) {
      throw new Error("network error");
    } else {
      const data = await response.json();
      return data.title;
    }
  } catch (error) {
    console.log("Failed", error);
    return "error";
  }
};

// a component to display the returned name from getName
const NameComponent = (props) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    A possible name for a {props.business} is {props.name}
  </div>
);

// default setup for streamUI from Vercel AI SDK
// step 4: example of using if/else logic to generate dynamic UIs from a data source (in this case an API call)
export async function streamComponent() {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: "create names for my business as a mountain bike shop",
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getName: {
        description: "Get the name for a business",
        parameters: z.object({
          business: z.string(),
        }),
        generate: async function* ({ business }) {
          yield <LoadingComponent />;
          try {
            const name = await getName(business);
            if (name.includes("Bike")) {
              yield <div>Naming {business}...</div>;
              return <div>{name}</div>;
            } else {
              // example to update components based on change in data received (in this case a name)
              yield <div>Searching for new name for {business}...</div>;
              await new Promise((resolve) => setTimeout(resolve, 2000));
              return <NameComponent name={name} business={business} />;
            }
          } catch {
            throw new Error();
          }
        },
      },
    },
  });

  return result.value;
}
