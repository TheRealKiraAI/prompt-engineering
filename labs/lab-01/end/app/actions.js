"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const LoadingComponent = () => (
  <div className="animate-pulse p-4">getting name...</div>
);

// update async code
// todo lab API call
const getName = async (business) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "The Bike Hub";
};

const NameComponent = (props) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    A possible name for a {props.business} is {props.name}
  </div>
);

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
              return <NameComponent name={name} business={business} />;
            } else {
              // example to update components based on change
              yield <div>Searching for new name for {business}...</div>;
              await new Promise((resolve) => setTimeout(resolve, 2000));
              return "Not Bike Hub";
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
