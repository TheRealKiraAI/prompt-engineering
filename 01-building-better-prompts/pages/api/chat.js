import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    res.status(200).json({ response: `Received message: ${message}` });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
