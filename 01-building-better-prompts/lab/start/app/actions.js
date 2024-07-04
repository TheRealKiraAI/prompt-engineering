"use server"; // notice the use server

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// a component for text to print to create a "loading" effect
const LoadingComponent = () => <div className="animate-pulse p-4">getting name...</div>;

// a function that creates a Promise to represent an event completion or failure
// if successful, it returns a designated name
const getName = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "The Bike Hub"; // step 1: customize your business name!
};

// a component to display the returned name from getName
const NameComponent = (props) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    A possible name for a {props.business} is {props.name}
  </div>
);

// default setup for streamUI from Vercel AI SDK
export async function streamComponent() {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: "create names for my business as a mountain bike shop", // step 1: customize for your business
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getName: {
        description: "Get the name for a business",
        parameters: z.object({
          business: z.string(),
        }),
        generate: async function* ({ business }) {
          // step 2: make a decision based on your getName() information
          yield <LoadingComponent />;
          const name = await getName(business);
          return <NameComponent name={name} business={business} />;
        },
      },
    },
  });

  return result.value;
}
