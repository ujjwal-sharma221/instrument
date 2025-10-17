import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { inngest } from "./client";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.0-flash"),
      system: "You are a helpful assistant",
      prompt: "what is 2+2",
    });

    return steps;
  },
);
