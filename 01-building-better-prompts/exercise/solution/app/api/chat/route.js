import { openai } from "@ai-sdk/openai"; // openai SDK for LLM
import { streamText } from "ai"; // streams text generations an interactive way from a language model

export const maxDuration = 30;

// defines a POST request handler
// creates a request endpoint at /api/chat
export async function POST(req) {
  const { messages } = await req.json(); // extracts messages from the request body (conversation history with chatbot)

  const result = await streamText({
    model: openai("gpt-4"),
    messages,
    // add more parameters here to customize the streamed response
  });

  return result.toAIStreamResponse(); // returns a streamed response object
}
