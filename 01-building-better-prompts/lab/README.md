# Lab #1: Prompt Tuning

In this section, students will expand on the fundamentals of exercises utilizing Vercel's SDK Core and building their own ChatGPT. Students will learn how to use Stream components to stream React components from the server to the client with the streamUI function. This is useful for React projects when needing to go beyond raw text and stream components to the client in real-time.

## Topics Covered

- Review Vercel AI SDK Core, UI, RSC / Introduction to lab
- Tune prompts
- Try building dynamic interfaces and stream components
- Make your AI make a decision based on prompts and data it knows / receives

## Running the Exercise

To run the solution:

1. Navigate to the solution directory `cd solution`
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server.

## Instructions

Prompt: You are a starting your own business of choice and need to create an AI UI to render content for your business. E.g. it could be names for your business, slogans, instagram posts, etc.

My example: Mountain bike shop; create names for my business as a mountain bike shop.

### Step 0: Install dependencies & Project Specific Setup

1. Run `npm install` to install dependencies in the `start` directory.
2. Copy your `.env.local` from the exercise and paste it into the `start` directory. You will need your `OPENAI_API_KEY`.

### Step 1: Create a Server Action

The streamUI requires a Server Action, (where you can call the steamUI) as well as a page to call the Server Action. Review the file in `app/actions.js` (or the code below) to see how a streamUI component is created.

```"use server";

import { streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const LoadingComponent = () => <div className="animate-pulse p-4">getting name...</div>;

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
          const name = await getName(business);
          return <NameComponent name={name} business={business} />;
        },
      },
    },
  });

  return result.value;
}
```

### Step 2: Create a Client Component to Render the Form

In the `app/page.js` file, create a client component to render the form. The form should have a submit button that calls the streamComponent function when clicked.

Becuase this is new code, here is an example utilizing some preconfigured components.

```
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
        <Button>Stream Component</Button>
      </form>
      <div>{component}</div>
    </div>
  );
}
```

### Step 3: Modify the Given Prompt

Modify the prompt to generate different types of business names (recall: You are a starting your own business of choice and need to create an AI UI to render content for your business. E.g. it could be names for your business, slogans, instagram posts, etc. My example: Mountain bike shop; create names for my business as a mountain bike shop.)

Run `npm run dev` to test the setup.

### Step 4: Update the Logic to Make a Decision Based on the Information Produced

Update the logic to make a decision based on the information produced. Ex. if the generated name has the word "bike" in it, do something, show a component, log text based on the name. Make these changes in generate within the `streamComponent`.

### ⭐ Bonus - Step 5: Create an API Call ⭐

Replace your getName function with an actual API call. Here is a list of free APIs. I suggest using one that does not require a key for the sake of the exercise: https://github.com/public-apis/public-apis
