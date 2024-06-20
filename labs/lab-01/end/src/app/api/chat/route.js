import { openai } from "@ai-sdk/openai";
import { streamUI } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: "Create names for my business as a mountain bike shop",
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getName: {
        description: "Get names for a business",
        parameters: z.object({ name: z.string() }),
        generate: async function* ({ business }) {
          yield <LoadingComponent />;
          const name = await getName(name);
          return <NameComponent name={name} business={business} />;
        },
      },
    },
  });

  return result.toAIStreamResponse();
}
