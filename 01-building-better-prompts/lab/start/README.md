## Building Better Prompts

#### Objectives

- Review Vercel AI SDK Core, UI, RSC / Introduction to lab
- Tune prompts
- Implement a different streaming interface
- Practice creating React Components
- Make your AI make a decision based on prompts and data it knows / receives

#### Setup

Run `pnpm install` to install required depencendies.

Run the development server: `pnpm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Lab Instructions

<strong>Overview Prompt:</strong> You are a starting your own business of choice and need to create an AI UI to render content for your business. E.g. it could be names for your business, slogans, instagram posts, etc.

<strong>My example:</strong> Mountain bike shop; create names for my business as a mountain bike shop.

1. In `app/actions.js`, take a review of the code that creates a Server Action. Customize your business to fit the prompt. Take a minute to review the code for the default setup using `streamUI` from the Vercel AI SDK. Notice the "use server" at the top of the code.
2. In `app/page.js` create a simple UI Page that calls this Server Action and displays the resulting React Component. To do this, create an HTML `<form>` with just a `Button` from our imported component. (Note: not `<button>` but `Button`.)
3. In the form, create an async `onSubmit` that sets the component state using `setComponent()`. It should await for the `streamComponent` (our Server Action from Step 1.)
4. Update the logic in `app/actions.js` to make a decision based on the information produced. Ex. if the generated business name has the word "bike" in it, update the UI to something new else keep the UI. Make these changes in generate within the streamComponent.
5. ★ Bonus ★ Replace your getName function with an actual API call. Here is a list of free APIs. I suggest using one that does not require a key for the sake of the exercise: https://github.com/public-apis/public-apis
